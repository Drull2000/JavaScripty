import react from '@vitejs/plugin-react'
import { defineConfig, type Plugin } from 'vite'
import { handleApiRequest } from './server/api.js'

const apiPlugin = (): Plugin => ({
  name: 'student-api',
  configureServer(server) {
    server.middlewares.use(async (request, response, next) => {
      if (!(await handleApiRequest(request, response))) next()
    })
  },
  configurePreviewServer(server) {
    server.middlewares.use(async (request, response, next) => {
      if (!(await handleApiRequest(request, response))) next()
    })
  },
})

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), apiPlugin()],
})
