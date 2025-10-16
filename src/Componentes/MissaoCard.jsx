export function MissaoCard({ missao, onIniciarMissao, concluida }) {
  return (
    <article 
      className="missao-card" 
      role="listitem" 
      aria-label={`Missão: ${missao.titulo}`}
    >
      {/* Missão */}
      <header>
        <h3 id={missao.id} tabIndex="0">{missao.titulo}</h3>
      </header>

      <p aria-describedby={missao.id}>{missao.missao}</p>

      <button
        onClick={() => onIniciarMissao(missao)}
        disabled={concluida}
        aria-label={concluida ? "Missão já concluída" : `Iniciar missão: ${missao.titulo}`} 
      >
        {/* Verficar se missão esstá concluida */}
        {concluida ? "Missão concluída" : "Iniciar Missão"}
      </button>
    </article>
  );
}
