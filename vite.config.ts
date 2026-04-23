
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Carrega variáveis do arquivo .env local
  const env = loadEnv(mode, (process as any).cwd(), '');

  // Captura as variáveis: prioriza o que está no arquivo .env, 
  // depois o que está no ambiente do sistema
  const API_KEY = env.API_KEY || (process as any).env.API_KEY;
  const GEMINI_API_KEY = env.VITE_GEMINI_API_KEY || (process as any).env.VITE_GEMINI_API_KEY || env.GEMINI_API_KEY || (process as any).env.GEMINI_API_KEY || API_KEY;
  const SUPABASE_URL = env.VITE_SUPABASE_URL || env.SUPABASE_URL || (process as any).env.VITE_SUPABASE_URL || (process as any).env.SUPABASE_URL;
  const SUPABASE_ANON_KEY = env.VITE_SUPABASE_ANON_KEY || env.SUPABASE_ANON_KEY || (process as any).env.VITE_SUPABASE_ANON_KEY || (process as any).env.SUPABASE_ANON_KEY;

  return {
    plugins: [react()],
    base: '/',
    define: {
      // Substitui as variáveis pelos valores reais durante o build
      'process.env.API_KEY': JSON.stringify(API_KEY),
      'process.env.GEMINI_API_KEY': JSON.stringify(GEMINI_API_KEY),
      'process.env.SUPABASE_URL': JSON.stringify(SUPABASE_URL),
      'process.env.SUPABASE_ANON_KEY': JSON.stringify(SUPABASE_ANON_KEY)
    }
  };
});
