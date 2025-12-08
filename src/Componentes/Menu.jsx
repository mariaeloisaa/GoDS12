import missao from "../assets/missoes.png";
import mapa from "../assets/mapa.png";
import inventario from "../assets/inventario.png";
import camera from "../assets/camera.png";
import { Link } from "react-router-dom";

export function Menu() {
  return (
    <nav className="menu" aria-label="menu principal">
      <ul role="list">
        <li>
          {/* link para a pagina de missoes */}
          <Link to="missao" aria-label="ir para missoes">
            <figure>
              <img
                src={missao}
                alt="ícone de missoes"
                loading="lazy"
                decoding="async"
              />
              <figcaption>missões</figcaption>
            </figure>
          </Link>
        </li>

        <li>
          {/* link para inventario */}
          <Link to="inventario" aria-label="abrir inventario">
            <figure>
              <img
                src={inventario}
                alt="ícone do inventario"
                loading="lazy"
                decoding="async"
              />
              <figcaption>inventário</figcaption>
            </figure>
          </Link>
        </li>

        <li>
          {/* link para mapa */}
          <Link to="geoLocalizacao" aria-label="abrir mapa">
            <figure>
              <img
                src={mapa}
                alt="ícone de mapa"
                loading="lazy"
                decoding="async"
              />
              <figcaption>mapa</figcaption>
            </figure>
          </Link>
        </li>

        <li>
          {/* link para camera */}
          <Link to="camera" aria-label="abrir camera">
            <figure>
              <img
                src={camera}
                alt="ícone de camera"
                loading="lazy"
                decoding="async"
              />
              <figcaption>câmera</figcaption>
            </figure>
          </Link>
        </li>
      </ul>
    </nav>
  );
}
