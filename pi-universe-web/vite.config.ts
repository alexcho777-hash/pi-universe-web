import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { viteSingleFile } from 'vite-plugin-singlefile'

// Default: normal multi-file build (for Render).
// "PREVIEW" env: packs everything, including the hero image, into ONE index.html
// so the design can be reviewed locally without any backend or deployment.
export default defineConfig(({ mode }) => {
  const single = mode === 'preview'
  return {
    plugins: single ? [react(), viteSingleFile()] : [react()],
    server: {
      port: 3000,
      open: true,
    },
    build: {
      outDir: single ? 'dist-preview' : 'dist',
      sourcemap: false,
      assetsInlineLimit: single ? 100000000 : 4096,
      chunkSizeWarningLimit: 4000,
    },
  }
})
