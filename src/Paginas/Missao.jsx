import { useState } from "react";
import { missoes } from '../Dados/dadosMissao';
import { MissaoCard } from '../Componentes/MissaoCard';
import { MissaoModal } from '../Componentes/MissaoModal';

export function Missao() {
  const [missaoSelecionada, setMissaoSelecionada] = useState(null);
  const [missoesConcluidas, setMissoesConcluidas] = useState([]);

  const concluirMissao = (id) => {
    setMissoesConcluidas((prev) => [...prev, id]);
    setMissaoSelecionada(null);
  };

  return (
    <main 
      className="conteiner" 
      role="main" 
      aria-label="Tela de missões do jogo DS12"
    >
      <header aria-label="Cabeçalho das missões">
        <h2 tabIndex="0">Missões</h2>
      </header>

      <section 
        className="missoes-grid" 
        aria-label="Lista de missões disponíveis"
        role="list"
      >
        {/* Mapear perguntas */}
        {missoes.map((m) => (
          <MissaoCard
            key={m.id}
            missao={m}
            onIniciarMissao={setMissaoSelecionada}
            concluida={missoesConcluidas.includes(m.id)}
          />
        ))}
      </section>

      {missaoSelecionada && (
        <MissaoModal
          missao={missaoSelecionada}
          onClose={() => setMissaoSelecionada(null)}
          onConcluir={() => concluirMissao(missaoSelecionada.id)}
        />
      )}
    </main>
  );
}
