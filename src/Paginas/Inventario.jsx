import { useEffect, useState } from "react";

export function Inventario() {
  const [figurinhas, setFigurinhas] = useState([]);

  useEffect(() => {
    const armazenado = JSON.parse(localStorage.getItem("inventario")) || [];
    setFigurinhas(armazenado);
  }, []);

  const limparInventario = () => {
    if (!window.confirm("Deseja realmente limpar o inventario?")) return;

    localStorage.removeItem("inventario");
    setFigurinhas([]);
  };

  return (
    <main className="container">
      <section className="inventario">
        <h2>Inventário</h2>

        <button className="limpar-inventario" onClick={limparInventario}>
          Limpar Inventário
        </button>

        {figurinhas.length === 0 ? (
          <p className="vazio">Nenhuma figurinha coletada ainda!</p>
        ) : (
          <div className="grid">
            {figurinhas.map((f) => {
              // Verificar se a figurinha é válida e tem a propriedade 'imagem'
              if (!f || !f.imagem) {
                return null; // Retorna nada se a figurinha não for válida
              }
              return (
                <div key={f.id} className="figurinha">
                  <img src={f.imagem} alt={f.nome} />
                </div>
              );
            })}
          </div>
        )}
      </section>
    </main>
  );
}
