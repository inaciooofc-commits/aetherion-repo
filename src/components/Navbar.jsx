import { signOut } from "../lib/auth";
import { isSupabaseConfigured } from "../lib/supabase";

export default function Navbar() {
  async function logout() {
    await signOut();
    window.location.href = "/";
  }

  return (
    <header className="topbar">
      <div className="brand">
        <img src="/assets/icons/aetherion_mark.svg" alt="Aetherion" />
        <span>Aetherion</span>
      </div>
      <div className="muted small">
        {isSupabaseConfigured ? "Supabase conectado" : "Configure o .env para ativar Supabase"}
      </div>
      <button className="btn secondary" onClick={logout}>Sair</button>
    </header>
  );
}
