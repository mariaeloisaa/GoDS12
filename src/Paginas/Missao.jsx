import { useState, useEffect, useRef } from "react";
import { missoes } from "../Dados/dadosMissao";
import { MissaoCard } from "../Componentes/MissaoCard";
import { MissaoModal } from "../Componentes/MissaoModal";
import sucesso from "../assets/correto.jpg";
import erro from "../assets/incorreto.jpg"; // Imagens de sucesso e erro

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

  // Função para salvar a figurinha no inventário com base no resultado
  const salvarFigurinha = (missao, status) => {
    const inventario = JSON.parse(localStorage.getItem("inventario")) || [];

    // A figurinha a ser salva será definida com base no status (sucesso ou erro)
    const figurinha = {
      id: Date.now(),  // Criando um ID único com base no timestamp
      imagem: status === "sucesso" ? sucesso : erro,  // Seleciona a imagem correspondente
      nome: status === "sucesso" ? "Missão Concluída com Sucesso" : "Missão Erro",
    };

    // Adiciona a figurinha ao inventário, se não estiver presente
    if (!inventario.some((f) => f.id === figurinha.id)) {
      inventario.push(figurinha);
    }

    localStorage.setItem("inventario", JSON.stringify(inventario));
  };

  const concluirMissao = (id, status) => {
    if (!missoesConcluidas.includes(id)) {
      const missao = missoes.find((m) => m.id === id);
      salvarFigurinha(missao, status); // Salva a figurinha com o status
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
          onConcluir={(status) => concluirMissao(missaoSelecionada.id, status)} // Passando o status aqui
        />
      )}
    </section>
  );
}
