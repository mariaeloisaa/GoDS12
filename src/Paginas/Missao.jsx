import { useState, useEffect, useRef } from "react";
import { missoes } from "../Dados/dadosMissao";
import { MissaoCard } from "../Componentes/MissaoCard";
import { MissaoModal } from "../Componentes/MissaoModal";
import sucesso from "../assets/correto.jpg";
import erro from "../assets/incorreto.jpg";

export function Missao() {
  const [missaoSelecionada, setMissaoSelecionada] = useState(null);

  const [missoesConcluidas, setMissoesConcluidas] = useState(() => {
    const salvas = localStorage.getItem("missoesConcluidas");
    return salvas ? JSON.parse(salvas) : [];
  });

  const headerRef = useRef(null);

  // salva progresso das missoes no local storage
  useEffect(() => {
    localStorage.setItem("missoesConcluidas", JSON.stringify(missoesConcluidas));
  }, [missoesConcluidas]);

  // salva figurinha baseada no status da missão
  const salvarFigurinha = (status) => {
    const inventario = JSON.parse(localStorage.getItem("inventario")) || [];

    const figurinha = {
      id: Date.now(),
      imagem: status === "sucesso" ? sucesso : erro,
      nome: status === "sucesso" ? "Missão Concluída" : "Missão com Erro"
    };

    inventario.push(figurinha);
    localStorage.setItem("inventario", JSON.stringify(inventario));
  };

  // marca missão como concluída
  const concluirMissao = (id, status) => {
    if (!missoesConcluidas.includes(id)) {
      salvarFigurinha(status);
      setMissoesConcluidas((prev) => [...prev, id]);
    }
    setMissaoSelecionada(null);
  };

  // foco inicial para acessibilidade
  useEffect(() => {
    if (headerRef.current) headerRef.current.focus();
  }, []);

  return (
    <section
      className="conteiner"
      aria-labelledby="titulo-missoes"
      role="region"
    >
      <h2 id="titulo-missoes" ref={headerRef} tabIndex={0}>
        Missões
      </h2>

      <div
        className="missoes-grid"
        role="list"
        aria-label="lista de missões disponíveis"
      >
        {missoes.map((m) => (
          <div key={m.id} role="listitem">
            <MissaoCard
              missao={m}
              onIniciarMissao={setMissaoSelecionada}
              concluida={missoesConcluidas.includes(m.id)}
              aria-label={`missão ${m.titulo}`}
            />
          </div>
        ))}
      </div>

      {missaoSelecionada && (
        <MissaoModal
          missao={missaoSelecionada}
          onClose={() => setMissaoSelecionada(null)}
          onConcluir={(status) => concluirMissao(missaoSelecionada.id, status)}
        />
      )}
    </section>
  );
}
