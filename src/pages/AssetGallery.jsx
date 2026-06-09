import { generatedAssets } from "../data/generatedAssets";

const categories = [...new Set(generatedAssets.map(asset => asset.category))];

export default function AssetGallery() {
  return (
    <section>
      <div className="card">
        <h2>Galeria Visual de Aetherion</h2>
        <p className="muted">Imagens geradas para itens, mapa, personagens, bestiário, deuses e referências visuais do jogo.</p>
      </div>
      {categories.map(category => (
        <div key={category} style={{ marginTop: 18 }}>
          <h3>{category}</h3>
          <div className="asset-gallery-grid">
            {generatedAssets.filter(asset => asset.category === category).map(asset => (
              <article className="card asset-gallery-card" key={asset.path}>
                <img src={asset.path} alt={asset.title} loading="lazy" />
                <strong>{asset.title}</strong>
                <span className="muted small">{asset.category}</span>
              </article>
            ))}
          </div>
        </div>
      ))}
    </section>
  );
}
