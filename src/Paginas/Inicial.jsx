import logo from '../assets/logo.png';
import { useNavigate } from 'react-router-dom';

export function Inicial() {
  const navigate = useNavigate();

  return (
    <main className="inicial" role="main" aria-label="Tela inicial do jogo DS12">
      <section aria-label="Logo e título do jogo">
        <img 
          src={logo} 
          className="logo" 
          alt="Logo DS12" 
          aria-hidden="false"
        />
      </section>

      <nav aria-label="Entrar no jogo">
        <button 
        // Ir para a tela principal
          onClick={() => navigate('/dsgo')} 
          className="entrar" 
          aria-label="Entrar no jogo DS12"
        >
          Entrar
        </button>
      </nav>
    </main>
  );
}
