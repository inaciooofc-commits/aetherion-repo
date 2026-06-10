import AdminPanel from "../components/AdminPanel";
import AdminDatabaseManager from "../components/AdminDatabaseManager";

export default function Admin() {
  return (
    <section className="admin-page-grid">
      <div className="card">
        <h2>Painel Admin</h2>
        <p>Email administrador principal: <strong>inaciooofc@gmail.com</strong>. A senha fica somente no Supabase Auth, nunca em arquivo do frontend.</p>
        <AdminPanel />
      </div>
      <AdminDatabaseManager />
    </section>
  );
}
