import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Relative base so emitted asset URLs work on GitHub Pages project sites
// (https://<user>.github.io/<repo>/) without a hard-coded repo name.
export default defineConfig({
  plugins: [react()],
  base: './',
})