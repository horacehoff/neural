import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react-swc'
import swc from 'unplugin-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), swc.vite()],
  build: {
    cssMinify: "lightningcss"
  },
  css: {
    transformer: "lightningcss"
  }
})
