import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
    plugins: [react()],
    // this 'server' section configures the development server
    server: {
        // Run the frontend on port 3000 for consistency
        port: 3000,
        proxy: {
            // Any request starting with '/api' will be forwarded to the backend
            '/api': {
                // the target is the Spring Boot backend running on port 8080
                target: 'http://localhost:8080',
                // this setting is needed for the proxy
                changeOrigin: true,
            }
        }
    }
})
