import logo from '../assets/logo.png';
import { useNavigate } from 'react-router-dom';

export function Inicial() {
    const navigate =useNavigate();

  return (
    <main className="inicial">
      <img src={logo} className="logo" alt="Logo DS12"  />
     
      <button onClick={() => navigate('/dsgo')} className='entrar'>
        Entrar
      </button>
    </main>
  );
}
