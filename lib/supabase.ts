
import { createClient } from '@supabase/supabase-js';

const getSupabaseClient = () => {
  const url = (import.meta as any).env?.VITE_SUPABASE_URL || process.env.SUPABASE_URL || (import.meta as any).env?.SUPABASE_URL;
  const key = (import.meta as any).env?.VITE_SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY || (import.meta as any).env?.SUPABASE_ANON_KEY;

  if (!url || !key) {
    // Retornamos um objeto que falha graciosamente em vez de travar no boot
    console.warn("Supabase: Variáveis de ambiente não detectadas.");
    return null;
  }

  return createClient(url, key);
};

let instance: any = null;

// Exportamos um Proxy que inicializa o cliente apenas quando for usado pela primeira vez
export const supabase = new Proxy({} as any, {
  get(target, prop) {
    if (!instance) {
      instance = getSupabaseClient();
    }
    
    if (!instance) {
      // Se não houver instância, retornamos uma função que retorna um erro para evitar quebras
      if (prop === 'channel') {
        return () => ({
          on: () => ({ subscribe: () => {} }),
          subscribe: () => {},
          unsubscribe: () => {}
        });
      }
      if (prop === 'removeChannel') {
        return () => {};
      }
      
      return (...args: any[]) => {
        const chainable = {
          select: () => chainable,
          insert: () => chainable,
          update: () => chainable,
          delete: () => chainable,
          eq: () => chainable,
          order: () => chainable,
          single: () => Promise.resolve({ data: null, error: { message: "Supabase não configurado." } }),
          maybeSingle: () => Promise.resolve({ data: null, error: { message: "Supabase não configurado." } }),
          then: (resolve: any) => resolve({ data: null, error: { message: "Supabase não configurado." } })
        };
        return chainable;
      };
    }

    const value = instance[prop];
    if (typeof value === 'function') {
      return value.bind(instance);
    }
    return value;
  }
});

// Helper para converter base64 em Blob para o Supabase Storage
export const base64ToBlob = (base64: string, contentType: string) => {
  const byteCharacters = atob(base64.split(',')[1]);
  const byteArrays = [];
  for (let offset = 0; offset < byteCharacters.length; offset += 512) {
    const slice = byteCharacters.slice(offset, offset + 512);
    const byteNumbers = new Array(slice.length);
    for (let i = 0; i < slice.length; i++) {
      byteNumbers[i] = slice.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    byteArrays.push(byteArray);
  }
  return new Blob(byteArrays, { type: contentType });
};
