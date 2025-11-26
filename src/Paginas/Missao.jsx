import { useState, useEffect, useRef } from "react";
import { missoes } from "../Dados/dadosMissao";
import { MissaoCard } from "../Componentes/MissaoCard";
import { MissaoModal } from "../Componentes/MissaoModal";
import { figurinhas } from "../Dados/dadosInventario";

export function Missao() {
  const [missaoSelecionada, setMissaoSelecionada] = useState(null);

  const [missoesConcluidas, setMissoesConcluidas] = useState(() => {
    const salvas = localStorage.getItem("missoesConcluidas");
    return salvas ? JSON.parse(salvas) : [];
  });

  const headerRef = useRef(null);

  useEffect(() => {
    localStorage.setItem("missoesConcluidas", JSON.stringify(missoesConcluidas));
  }, [missoesConcluidas]);

  const salvarFigurinha = (missao) => {
  const inventario = JSON.parse(localStorage.getItem("inventario")) || [];

  // pega a figurinha correspondente à missão concluída
  const figurinha = figurinhas.find((f) => f.id === missao.id);

  if (!inventario.some((f) => f.id === figurinha.id)) {
    inventario.push(figurinha);
  }

  localStorage.setItem("inventario", JSON.stringify(inventario));
};
  const concluirMissao = (id) => {
    if (!missoesConcluidas.includes(id)) {
      const missao = missoes.find((m) => m.id === id);
      salvarFigurinha(missao);
      setMissoesConcluidas((prev) => [...prev, id]);
    }

    setMissaoSelecionada(null);
  };

  useEffect(() => {
    if (headerRef.current) headerRef.current.focus();
  }, []);

  return (
    <section className="conteiner">
      <h2 ref={headerRef} tabIndex={0}>Missões</h2>

      <div className="missoes-grid">
        {missoes.map((m) => (
          <div key={m.id}>
            <MissaoCard
              missao={m}
              onIniciarMissao={setMissaoSelecionada}
              concluida={missoesConcluidas.includes(m.id)}
            />
          </div>
        ))}
      </div>

      {missaoSelecionada && (
        <MissaoModal
          missao={missaoSelecionada}
          onClose={() => setMissaoSelecionada(null)}
          onConcluir={() => concluirMissao(missaoSelecionada.id)}
        />
      )}
    </section>
  );
}
