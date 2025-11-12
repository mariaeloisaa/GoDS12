import missao from '../assets/missoes.png';
import mapa from '../assets/mapa.png';
import inventario from '../assets/inventario.png';
import camera from '../assets/camera.png';
import { Link } from 'react-router-dom';

export function Menu() {
  return (
    <nav className="menu" aria-label="Menu principal">
      <ul>
        <li>
          {/* Missões */}
          <Link to="missao" aria-label="Ir para Missões">
            <figure>
              <img src={missao} alt="Ícone de Missões" loading="lazy" />
              <figcaption>Missões</figcaption>
            </figure>
          </Link>
        </li>

        <li>
          {/* Inventário */}
          <Link to="/inventario" aria-label="Abrir Inventário">
            <figure>
              <img src={inventario} alt="Ícone de Inventário" loading="lazy" />
              <figcaption>Inventário</figcaption>
            </figure>
          </Link>
        </li>

        <li>
          {/* Mapa */}
          <Link to="/mapa" aria-label="Abrir Mapa">
            <figure>
              <img src={mapa} alt="Ícone de Mapa" loading="lazy" />
              <figcaption>Mapa</figcaption>
            </figure>
          </Link>
        </li>

        <li>
          {/* Camera */}
          <Link to="camera" aria-label="Abrir Câmera">
            <figure>
              <img src={camera} alt="Ícone de Câmera" loading="lazy" />
              <figcaption>Câmera</figcaption>
            </figure>
          </Link>
        </li>
      </ul>
    </nav>
  );
}
