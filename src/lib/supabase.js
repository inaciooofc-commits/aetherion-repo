import { createClient } from '@supabase/supabase-js';

const url = import.meta.env.VITE_SUPABASE_URL;
const anon = import.meta.env.VITE_SUPABASE_ANON_KEY;
export const supabase = url && anon ? createClient(url, anon) : null;

export const ADMIN_EMAIL = import.meta.env.VITE_ADMIN_EMAIL || 'inaciooofc@gmail.com';
export function isAdminEmail(email) { return String(email || '').toLowerCase() === ADMIN_EMAIL.toLowerCase(); }
