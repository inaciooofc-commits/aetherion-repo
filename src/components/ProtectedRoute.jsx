import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getSession } from "../lib/auth";
import { isSupabaseConfigured } from "../lib/supabase";

export default function ProtectedRoute({ children }) {
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    let active = true;
    getSession().then(({ session }) => {
      if (!active) return;
      if (!isSupabaseConfigured) return setStatus("offline-ok");
      setStatus(session ? "ok" : "no");
    });
    return () => { active = false; };
  }, []);

  if (status === "loading") return <div className="card">Carregando sessão...</div>;
  if (status === "no") return <Navigate to="/login" replace />;
  return children;
}
