import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Имя репозитория
const repoName = 'TaskLite'

export default defineConfig({
  plugins: [react()],
  base: `/${repoName}/`,
})