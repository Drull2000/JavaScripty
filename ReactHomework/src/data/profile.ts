export interface UserProfile {
  fullName: string
  email: string
  phones: { value: string }[]
  languages: { value: string; label: string }[]
  specialty: string
  isOnline: boolean
}

export async function getUserProfile(): Promise<UserProfile> {
  const response = await fetch('/api/profile')
  const result: unknown = await response.json()

  if (!response.ok) {
    const message = typeof result === 'object' && result !== null && 'error' in result && typeof result.error === 'string'
      ? result.error
      : 'Не вдалося завантажити профіль'
    throw new Error(message)
  }

  if (typeof result !== 'object' || result === null || !('profile' in result)) {
    throw new Error('Сервер повернув некоректні дані профілю')
  }

  return result.profile as UserProfile
}
