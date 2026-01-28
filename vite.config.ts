
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  define: {
    // Gemini SDK가 요구하는 process.env.API_KEY 환경 변수를 브라우저에 주입
    'process.env.API_KEY': JSON.stringify(process.env.API_KEY)
  }
});
