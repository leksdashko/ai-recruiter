import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import legacy from '@vitejs/plugin-legacy'
import babel from 'vite-plugin-babel'

export default defineConfig({
  plugins: [
    react(),
    legacy({
      targets: ['defaults', 'not IE 11'],
      additionalLegacyPolyfills: ['regenerator-runtime/runtime'],
    }),
    babel({
      babelConfig: {
        babelrc: false,
        configFile: false,
        ignore: [
          'node_modules/react-dom/**'
        ],
        plugins: [
          '@babel/plugin-transform-runtime',
          '@babel/plugin-syntax-jsx'
        ],
      },
    }),
  ],
  build: {
    chunkSizeWarningLimit: 1000,
  },
})
