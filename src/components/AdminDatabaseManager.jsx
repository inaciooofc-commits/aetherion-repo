import { useEffect, useState } from "react";
import { supabase, isSupabaseConfigured } from "../lib/supabase";
import { getAdminState } from "../lib/admin";

const TABLES = ["profiles", "characters", "items", "inventory", "equipment", "map_regions", "territories", "mobs", "market_listings", "game_chat_messages", "admin_logs"];

export default function AdminDatabaseManager() {
  const [state, setState] = useState({ loading: true, isAdmin: false, rows: [] });

  useEffect(() => {
    let active = true;
    async function load() {
      const admin = await getAdminState();
      if (!admin.isAdmin) return setState({ loading: false, isAdmin: false, rows: [], email: admin.email });
      if (!isSupabaseConfigured) {
        return setState({ loading: false, isAdmin: true, email: admin.email, rows: TABLES.map((table) => ({ table, status: "offline", count: "local" })) });
      }
      const rows = [];
      for (const table of TABLES) {
        try {
          const { count, error } = await supabase.from(table).select("*", { count: "exact", head: true });
          rows.push({ table, count: error ? "erro" : count, status: error ? error.message : "OK" });
        } catch (err) {
          rows.push({ table, count: "erro", status: err.message });
        }
      }
      if (active) setState({ loading: false, isAdmin: true, email: admin.email, rows });
    }
    load();
    return () => { active = false; };
  }, []);

  if (state.loading) return <div className="card">Verificando acesso admin...</div>;
  if (!state.isAdmin) return <div className="card danger"><h3>Acesso negado</h3><p>Este painel é liberado apenas para administradores.</p></div>;

  return (
    <section className="card">
      <h3>Gerenciamento do Banco de Dados</h3>
      <p>Admin ativo: <strong>{state.email}</strong>. Este painel mostra saúde das tabelas e evita SQL livre no frontend.</p>
      <div className="table-like">
        {state.rows.map((row) => (
          <div className="stat-row" key={row.table}>
            <span>{row.table}</span>
            <strong>{row.count}</strong>
            <small>{row.status}</small>
          </div>
        ))}
      </div>
      <p className="muted">Para alterações sensíveis, use Functions/Edge Functions com service_role apenas no Cloudflare.</p>
    </section>
  );
}
