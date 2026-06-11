// Supabase client (mock para local)
// Em produção, use: import { createClient } from '@supabase/supabase-js';

const ADMIN_EMAIL = 'inaciooofc@gmail.com';

export function isAdminEmail(email) {
  return String(email || '').toLowerCase() === String(ADMIN_EMAIL).toLowerCase();
}

export function getAdminEmail() {
  return ADMIN_EMAIL;
}

// Mock do cliente Supabase para desenvolvimento local
export const supabaseClient = {
  auth: {
    signInWithPassword: async (email, password) => ({
      data: { user: { email, id: 'local-user' } },
      error: null
    }),
    signOut: async () => ({ error: null })
  },
  from: (table) => ({
    select: () => ({
      eq: () => ({
        single: async () => ({ data: {}, error: null })
      }),
      async: () => ({ data: [], error: null })
    }),
    insert: async (data) => ({ data, error: null }),
    update: async (data) => ({ data, error: null }),
    delete: async () => ({ data: {}, error: null })
  })
};
