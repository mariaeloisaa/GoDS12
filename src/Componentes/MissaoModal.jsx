import { useState, useEffect, useRef } from "react";
import sucesso from "../assets/correto.jpg";
import erro from "../assets/incorreto.jpg";

export function MissaoModal({ missao, onClose, onConcluir }) {
  const [resposta, setResposta] = useState("");
  const [resultado, setResultado] = useState(null);
  const [status, setStatus] = useState(null);
  const inputRef = useRef(null);

  // coloca foco no campo ao abrir e permite fechar com esc
  useEffect(() => {
    if (inputRef.current) inputRef.current.focus();

    const escClose = (e) => {
      if (e.key === "Escape") onClose();
    };

    document.addEventListener("keydown", escClose);
    return () => document.removeEventListener("keydown", escClose);
  }, [onClose]);

  // salva um item no inventário do localstorage
  const salvarNoInventario = (imagem, nome) => {
    const novoItem = {
      id: Date.now(),
      imagem,
      nome,
    };

    const inventario = JSON.parse(localStorage.getItem("inventario")) || [];
    inventario.push(novoItem);
    localStorage.setItem("inventario", JSON.stringify(inventario));
  };

  // verifica se a resposta da missão está correta
  const verificarResposta = () => {
    if (!resposta.trim()) {
      alert("digite uma resposta antes de enviar");
      return;
    }

    const respostaCorreta = missao.respostaCorreta.trim().toLowerCase();
    const respostaUsuario = resposta.trim().toLowerCase();

    if (respostaUsuario === respostaCorreta) {
      setResultado("resposta correta");
      setStatus("sucesso");

      salvarNoInventario(sucesso, "missão concluída");
      setTimeout(() => onConcluir("sucesso"), 1000);
    } else {
      setResultado("resposta incorreta");
      setStatus("erro");

      salvarNoInventario(erro, "missão incorreta");
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
      {/* título da missão */}
      <header>
        <h2 id="titulo-missao" tabIndex="0">
          {missao.titulo}
        </h2>
      </header>

      {/* descrição da missão */}
      <p id="descricao-missao">{missao.descricao}</p>

      {/* formulário para responder */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          verificarResposta();
        }}
        aria-label="formulário da missão"
      >
        <fieldset>
          <legend className="sr-only">resposta da missão</legend>

          <label htmlFor="resposta" className="sr-only">
            digite sua resposta
          </label>

          <input
            id="resposta"
            className="caixaTexto"
            type="text"
            placeholder="digite sua resposta..."
            value={resposta}
            onChange={(e) => setResposta(e.target.value)}
            ref={inputRef}
            required
            aria-required="true"
            aria-describedby="descricao-missao"
          />

          {/* botões do modal */}
          <div className="modal-botoes">
            <button
              type="submit"
              className="enviar"
              aria-label="enviar resposta da missão"
            >
              enviar
            </button>

            <button
              type="button"
              className="fechar"
              onClick={onClose}
              aria-label="fechar missão"
            >
              fechar
            </button>
          </div>
        </fieldset>
      </form>

      {/* mensagem de resultado */}
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
              alt="missão concluída"
              width="100"
              height="100"
            />
          )}

          {status === "erro" && (
            <img
              src={erro}
              alt="resposta incorreta"
              width="100"
              height="100"
            />
          )}
        </section>
      )}
    </dialog>
  );
}
