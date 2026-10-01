import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  const proxy = {
    '/api': {
      target: env.PROXY || 'http://localhost:8080',
      changeOrigin: true,
    },
  };

  return {
    plugins: [react()],
    server: {
      host: '0.0.0.0',
      port: 3000,
      strictPort: true,
      proxy,
      watch: { usePolling: env.CHOKIDAR_USEPOLLING === 'true' },
    },
    preview: { proxy },
    // Express serves this directory in production.
    build: { outDir: 'build' },
    test: {
      environment: 'jsdom',
      include: ['src/**/*.test.{js,jsx}'],
      setupFiles: ['./src/test/setup.js'],
    },
  };
});
