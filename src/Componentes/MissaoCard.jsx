export function MissaoCard({ missao, onIniciarMissao, concluida }) {
  return (
    <article 
      className="missao-card"
      role="listitem"
      aria-label={`missão: ${missao.titulo}`}
    >
      {/* mostra o título da missão */}
      <header>
        <h3 id={`titulo-${missao.id}`} tabIndex="0">
          {missao.titulo}
        </h3>
      </header>

      {/* mostra o texto da missão */}
      <p aria-describedby={`titulo-${missao.id}`}>
        {missao.missao}
      </p>

      {/* botão para iniciar missão */}
      <button
        onClick={() => onIniciarMissao(missao)}
        disabled={concluida}
        aria-label={
          concluida
            ? "missão já concluída"
            : `iniciar missão: ${missao.titulo}`
        }
      >
        {concluida ? "missão concluída" : "iniciar missão"}
      </button>
    </article>
  );
}
