import base44 from "@base44/vite-plugin"
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  logLevel: 'error', // Suppress warnings, only show errors
<<<<<<< HEAD
  base: '/life-journey/', 
=======
>>>>>>> 322079237411ef966ab008bd1fc49ac4e2c0c3e6
  plugins: [
    base44({
      // Support for legacy code that imports the base44 SDK with @/integrations, @/entities, etc.
      // can be removed if the code has been updated to use the new SDK imports from @base44/sdk
      legacySDKImports: process.env.BASE44_LEGACY_SDK_IMPORTS === 'true',
      hmrNotifier: true,
      navigationNotifier: true,
      visualEditAgent: true
    }),
    react(),
<<<<<<< HEAD
  ],
  css: {
    postcss: './postcss.config.js'  // Explicit
  }
=======
  ]
>>>>>>> 322079237411ef966ab008bd1fc49ac4e2c0c3e6
});