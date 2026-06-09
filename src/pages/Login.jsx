import { useState } from "react";
import { Link } from "react-router-dom";
import { supabase, isSupabaseConfigured } from "../lib/supabase";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");

  async function submit(e) {
    e.preventDefault();
    if (!isSupabaseConfigured) {
      setMsg("Supabase ainda não está configurado. Você pode navegar no MVP técnico, mas login real exige .env.");
      window.location.href = "/dashboard";
      return;
    }
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) return setMsg(error.message);
    window.location.href = "/dashboard";
  }

  return <main style={{padding: 24, display:"grid", placeItems:"center", minHeight:"100vh"}}>
    <form className="card form" onSubmit={submit}>
      <h2>Entrar em Aetherion</h2>
      <input placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} />
      <input placeholder="Senha" type="password" value={password} onChange={e=>setPassword(e.target.value)} />
      {msg && <div className="alert">{msg}</div>}
      <button className="btn">Entrar</button>
      <Link className="muted" to="/register">Criar conta</Link>
    </form>
  </main>;
}
