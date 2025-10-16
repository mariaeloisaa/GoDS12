import { useState, useEffect, useRef } from "react";
import sucesso from "../assets/correto.jpg";
import erro from "../assets/incorreto.jpg";

export function MissaoModal({ missao, onClose, onConcluir }) {
  const [resposta, setResposta] = useState("");
  const [resultado, setResultado] = useState(null);
  const [status, setStatus] = useState(null);
  const inputRef = useRef(null);

  useEffect(() => {
    // Foco inicial no campo de resposta
    if (inputRef.current) inputRef.current.focus();

    // Fecha com ESC
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);


  // Verificar Resposta
  const verificarResposta = () => {
    if (!resposta.trim()) {
      alert("Por favor, digite uma resposta antes de enviar!");
      return;
    }

    if (
      resposta.trim().toLowerCase() ===
      missao.respostaCorreta.trim().toLowerCase()
    ) {
      setResultado("Resposta correta! Parabéns!");
      setStatus("sucesso");
      setTimeout(() => onConcluir(missao.id), 1000);
    } else {
      setResultado("Resposta incorreta. Tente novamente!");
      setStatus("erro");
    }
  };

  return (
    <dialog
      open
      className="modal"
      role="dialog"
      aria-modal="true"
      aria-labelledby="titulo-missao"
      aria-describedby="descricao-missao"
    >
      <header>
        <h2 className="titulo" id="titulo-missao" tabIndex="0">
          {missao.titulo}
        </h2>
      </header>

      <p id="descricao-missao">{missao.descricao}</p>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          verificarResposta();
        }}
        aria-label="Formulário de resposta da missão"
      >
        <fieldset>
          <legend className="sr-only">Responder missão</legend>

          <label htmlFor="resposta" className="sr-only">
            Digite sua resposta
          </label>
          <input
            className="caixaTexto"
            id="resposta"
            type="text"
            placeholder="Digite sua resposta..."
            value={resposta}
            onChange={(e) => setResposta(e.target.value)}
            required
            ref={inputRef}
            aria-required="true"
            aria-describedby="descricao-missao"
          />

          <div className="modal-botoes">
            <button
              type="submit"
              className="enviar"
              aria-label="Enviar resposta da missão"
            >
              Enviar
            </button>

            <button
              type="button"
              className="fechar"
              onClick={onClose}
              aria-label="Fechar janela da missão"
            >
              Fechar
            </button>
          </div>
        </fieldset>
      </form>

      {resultado && (
        <section
          className="resultado"
          role="alert"
          aria-live="assertive"
          tabIndex="0"
        >
          <p>{resultado}</p>
          {status === "sucesso" && (
            <img
              src={sucesso}
              alt="Missão concluída com sucesso"
              width="100"
              height="100"
            />
          )}
          {status === "erro" && (
            <img
              src={erro}
              alt="Resposta incorreta, tente novamente"
              width="100"
              height="100"
            />
          )}
        </section>
      )}
    </dialog>
  );
}
