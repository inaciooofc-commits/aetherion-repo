import { Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import ProtectedRoute from "./components/ProtectedRoute";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import CreateCharacter from "./pages/CreateCharacter";
import Dashboard from "./pages/Dashboard";
import Game from "./pages/Game";
import CharacterProfile from "./pages/CharacterProfile";
import Inventory from "./pages/Inventory";
import Equipment from "./pages/Equipment";
import WorldMap from "./pages/WorldMap";
import Battle from "./pages/Battle";
import PvP from "./pages/PvP";
import PvE from "./pages/PvE";
import Family from "./pages/Family";
import Marriage from "./pages/Marriage";
import Bloodline from "./pages/Bloodline";
import Market from "./pages/Market";
import Crafting from "./pages/Crafting";
import Professions from "./pages/Professions";
import Story from "./pages/Story";
import Morality from "./pages/Morality";
import Relics from "./pages/Relics";
import Enchanting from "./pages/Enchanting";
import Ranking from "./pages/Ranking";
import Bestiary from "./pages/Bestiary";
import AssetGallery from "./pages/AssetGallery";
import Admin from "./pages/Admin";
import NotFound from "./pages/NotFound";

function Layout({ children }) {
  const loc = useLocation();
  const publicPage = ["/", "/login", "/register"].includes(loc.pathname);
  if (publicPage) return <>{children}</>;
  return <div className="app-shell"><Sidebar /><main className="content"><Navbar />{children}</main></div>;
}

const P = ({ children }) => <ProtectedRoute>{children}</ProtectedRoute>;

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/criar-personagem" element={<P><CreateCharacter /></P>} />
        <Route path="/dashboard" element={<P><Dashboard /></P>} />
        <Route path="/jogar" element={<P><Game /></P>} />
        <Route path="/personagem" element={<P><CharacterProfile /></P>} />
        <Route path="/inventario" element={<P><Inventory /></P>} />
        <Route path="/equipamentos" element={<P><Equipment /></P>} />
        <Route path="/mapa" element={<P><WorldMap /></P>} />
        <Route path="/batalha" element={<P><Battle /></P>} />
        <Route path="/pvp" element={<P><PvP /></P>} />
        <Route path="/pve" element={<P><PvE /></P>} />
        <Route path="/familia" element={<P><Family /></P>} />
        <Route path="/casamento" element={<P><Marriage /></P>} />
        <Route path="/linhagem" element={<P><Bloodline /></P>} />
        <Route path="/mercado" element={<P><Market /></P>} />
        <Route path="/crafting" element={<P><Crafting /></P>} />
        <Route path="/profissoes" element={<P><Professions /></P>} />
        <Route path="/historia" element={<P><Story /></P>} />
        <Route path="/moralidade" element={<P><Morality /></P>} />
        <Route path="/reliquias" element={<P><Relics /></P>} />
        <Route path="/encantamento" element={<P><Enchanting /></P>} />
        <Route path="/ranking" element={<P><Ranking /></P>} />
        <Route path="/bestiario" element={<P><Bestiary /></P>} />
        <Route path="/galeria-assets" element={<P><AssetGallery /></P>} />
        <Route path="/admin" element={<P><Admin /></P>} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Layout>
  );
}
