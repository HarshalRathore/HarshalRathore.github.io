import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: './',
  build: {
    // Source maps ship so production issues are attributable; Lighthouse
    // best-practices audits their presence (#15).
    sourcemap: true,
  },
})
