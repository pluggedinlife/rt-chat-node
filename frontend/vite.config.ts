import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue({
      template: {
        compilerOptions: {
          isCustomElement: (tag) => tag.startsWith('V-'),
        },
      },
    }),
  ],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000', // Your backend server URL
        changeOrigin: true, // This ensures that the origin of the request is changed to the target URL
        secure: false, // Set to false if you're using HTTP instead of HTTPS
        ws: true, // If you're using WebSockets (for example with Socket.IO)
      },
    },
  },
});
