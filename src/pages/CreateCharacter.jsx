import { useState } from "react";
import { races } from "../data/races";
import { families } from "../data/families";
import { apiPost } from "../lib/api";

export default function CreateCharacter() {
  const [form, setForm] = useState({ name:"", race:"valoriano", class_name:"Guerreiro", family:"valmorne", story:"" });
  const [msg, setMsg] = useState("");
  const set = (k,v) => setForm(f => ({...f, [k]: v}));

  async function submit(e) {
    e.preventDefault();
    try {
      await apiPost("/api/create-character", form);
      window.location.href = "/dashboard";
    } catch (err) {
      setMsg(err.message + " Se estiver local sem Supabase, esta tela serve como layout funcional.");
    }
  }

  return <section className="card">
    <h2>Criação de Personagem</h2>
    <form className="form" onSubmit={submit}>
      <input placeholder="Nome do personagem" value={form.name} onChange={e=>set("name", e.target.value)} required />
      <select value={form.race} onChange={e=>set("race", e.target.value)}>{races.map(r=><option key={r.key} value={r.key}>{r.name} — {r.bonus}</option>)}</select>
      <select value={form.class_name} onChange={e=>set("class_name", e.target.value)}>{["Guerreiro","Mago","Arqueiro","Assassino","Paladino","Tecnoferreiro"].map(c=><option key={c}>{c}</option>)}</select>
      <select value={form.family} onChange={e=>set("family", e.target.value)}>{families.map(f=><option key={f.key} value={f.key}>{f.name}</option>)}</select>
      <textarea placeholder="História inicial" value={form.story} onChange={e=>set("story", e.target.value)} />
      {msg && <div className="alert error">{msg}</div>}
      <button className="btn">Criar personagem</button>
    </form>
  </section>;
}
