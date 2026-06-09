import { useState } from "react";
import { Link } from "react-router-dom";
import { supabase, isSupabaseConfigured } from "../lib/supabase";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nickname, setNickname] = useState("");
  const [msg, setMsg] = useState("");

  async function submit(e) {
    e.preventDefault();
    if (!isSupabaseConfigured) {
      setMsg("Configure Supabase para cadastro real. Redirecionando para criação visual de personagem.");
      window.location.href = "/criar-personagem";
      return;
    }
    const { data, error } = await supabase.auth.signUp({ email, password, options: { data: { nickname } } });
    if (error) return setMsg(error.message);
    await supabase.from("profiles").insert({ id: data.user.id, nickname });
    window.location.href = "/criar-personagem";
  }

  return <main style={{padding: 24, display:"grid", placeItems:"center", minHeight:"100vh"}}>
    <form className="card form" onSubmit={submit}>
      <h2>Criar Conta</h2>
      <input placeholder="Nick" value={nickname} onChange={e=>setNickname(e.target.value)} />
      <input placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} />
      <input placeholder="Senha" type="password" value={password} onChange={e=>setPassword(e.target.value)} />
      {msg && <div className="alert">{msg}</div>}
      <button className="btn">Criar e despertar</button>
      <Link className="muted" to="/login">Já tenho conta</Link>
    </form>
  </main>;
}
