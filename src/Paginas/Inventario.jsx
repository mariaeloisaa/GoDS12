import { useEffect, useState } from "react";

export function Inventario() {
  const [figurinhas, setFigurinhas] = useState([]);

  // carrega inventario do local storage ao iniciar
  useEffect(() => {
    const armazenado = JSON.parse(localStorage.getItem("inventario")) || [];
    setFigurinhas(armazenado);
  }, []);

  // limpa todo o inventario com confirmacao do usuario
  const limparInventario = () => {
    if (!window.confirm("Deseja realmente limpar o inventário?")) return;
    localStorage.removeItem("inventario");
    setFigurinhas([]);
  };

  return (
    <main className="container" aria-labelledby="titulo-inventario">
      <section className="inventario">
        <h2 id="titulo-inventario">Inventário</h2>

        <button
          className="limpar-inventario"
          onClick={limparInventario}
          aria-label="limpar todo o inventário"
        >
          Limpar Inventário
        </button>

        {figurinhas.length === 0 ? (
          <p className="vazio">Nenhuma figurinha coletada ainda.</p>
        ) : (
          <div
            className="grid"
            role="list"
            aria-label="lista de figurinhas coletadas"
          >
            {figurinhas.map((f) => {
              // verifica se a figurinha e valida
              if (!f || !f.imagem) return null;

              return (
                <div
                  key={f.id}
                  className="figurinha"
                  role="listitem"
                  aria-label={`figurinha ${f.nome}`}
                >
                  <img
                    src={f.imagem}
                    alt={f.nome}
                    loading="lazy"
                    decoding="async"
                  />
                </div>
              );
            })}
          </div>
        )}
      </section>
    </main>
  );
}
