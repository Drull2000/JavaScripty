import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { dirname, resolve } from 'node:path'
import type { IncomingMessage, ServerResponse } from 'node:http'

const dataDirectory = resolve(process.cwd(), 'server', 'data')
const profilePath = resolve(dataDirectory, 'profile.json')
const progressPath = resolve(dataDirectory, 'course-progress.json')

type JsonRecord = Record<string, unknown>

class BadRequestError extends Error {}

async function readJson<T>(path: string, fallback: T): Promise<T> {
  try {
    return JSON.parse(await readFile(path, 'utf8')) as T
  } catch (error: unknown) {
    const code = error instanceof Error && 'code' in error ? error.code : undefined
    if (code !== 'ENOENT') throw error
    return fallback
  }
}

async function writeJson(path: string, value: unknown) {
  await mkdir(dirname(path), { recursive: true })
  await writeFile(path, `${JSON.stringify(value, null, 2)}\n`, 'utf8')
}

async function readBody(request: IncomingMessage): Promise<unknown> {
  let body = ''
  for await (const chunk of request) body += chunk
  if (!body) return null

  try {
    return JSON.parse(body)
  } catch {
    throw new BadRequestError('Тіло запиту має бути коректним JSON')
  }
}

function sendJson(response: ServerResponse, status: number, payload: JsonRecord) {
  response.statusCode = status
  response.setHeader('Content-Type', 'application/json; charset=utf-8')
  response.end(JSON.stringify(payload))
}

function isRecord(value: unknown): value is JsonRecord {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
}

export async function handleApiRequest(request: IncomingMessage, response: ServerResponse): Promise<boolean> {
  const url = new URL(request.url ?? '/', 'http://localhost')

  try {
    if (url.pathname === '/api/update-profile' && request.method === 'POST') {
      const body = await readBody(request)
      if (!isRecord(body) || typeof body.fullName !== 'string' || typeof body.email !== 'string' || !Array.isArray(body.phones) || !Array.isArray(body.languages)) {
        sendJson(response, 400, { error: 'Профіль має містити fullName, email, phones і languages' })
        return true
      }

      await writeJson(profilePath, body)
      sendJson(response, 200, { profile: body })
      return true
    }

    const moduleMatch = url.pathname.match(/^\/api\/courses\/([^/]+)\/modules\/(\d+)$/)
    if (moduleMatch && request.method === 'PATCH') {
      const [, courseId, moduleIndexText] = moduleMatch
      const body = await readBody(request)
      const moduleIndex = Number(moduleIndexText)
      if (!isRecord(body) || typeof body.completed !== 'boolean') {
        sendJson(response, 400, { error: 'Поле completed має бути boolean' })
        return true
      }

      const progress = await readJson<Record<string, boolean[]>>(progressPath, {})
      const courseProgress = progress[courseId] ?? []
      courseProgress[moduleIndex] = body.completed
      progress[courseId] = courseProgress
      await writeJson(progressPath, progress)
      sendJson(response, 200, { courseId, moduleIndex, completed: body.completed })
      return true
    }

    if (url.pathname.startsWith('/api/')) {
      sendJson(response, 404, { error: 'Endpoint не знайдено' })
      return true
    }
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Внутрішня помилка сервера'
    sendJson(response, error instanceof BadRequestError ? 400 : 500, { error: message })
    return true
  }

  return false
}
