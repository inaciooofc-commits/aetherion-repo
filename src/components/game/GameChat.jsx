import { useEffect, useState } from "react";
import { supabase, isSupabaseConfigured } from "../../lib/supabase";

export default function GameChat() {
  const [messages, setMessages] = useState([
    { id: "local-1", sender_name: "Sistema", message: "Chat do jogo carregado. Conecte Supabase para chat global." }
  ]);
  const [text, setText] = useState("");
  const [name, setName] = useState("Jogador");

  useEffect(() => {
    let channel;
    async function boot() {
      if (!isSupabaseConfigured) return;
      const { data: userData } = await supabase.auth.getUser();
      const email = userData?.user?.email;
      if (email) setName(email.split("@")[0]);
      const { data } = await supabase
        .from("game_chat_messages")
        .select("id,sender_name,message,created_at")
        .order("created_at", { ascending: false })
        .limit(30);
      if (data?.length) setMessages(data.reverse());
      channel = supabase
        .channel("aetherion-game-chat")
        .on("postgres_changes", { event: "INSERT", schema: "public", table: "game_chat_messages" }, (payload) => {
          setMessages((current) => [...current, payload.new].slice(-40));
        })
        .subscribe();
    }
    boot();
    return () => { if (channel) supabase.removeChannel(channel); };
  }, []);

  async function sendMessage(event) {
    event.preventDefault();
    const message = text.trim();
    if (!message) return;
    setText("");
    if (!isSupabaseConfigured) {
      setMessages((current) => [...current, { id: crypto.randomUUID(), sender_name: name, message }].slice(-40));
      return;
    }
    await supabase.from("game_chat_messages").insert({ sender_name: name, message });
  }

  return (
    <section className="game-chat card">
      <h3>Chat do Reino</h3>
      <div className="game-chat-messages">
        {messages.map((msg) => (
          <p key={msg.id}><strong>{msg.sender_name || "Jogador"}:</strong> {msg.message}</p>
        ))}
      </div>
      <form onSubmit={sendMessage} className="game-chat-form">
        <input value={text} onChange={(e) => setText(e.target.value)} maxLength={220} placeholder="Escreva no chat do jogo..." />
        <button className="btn" type="submit">Enviar</button>
      </form>
    </section>
  );
}
