import { useState } from "react";
import { Camera } from "../Componentes/Camera";
import Box from "@mui/material/Box";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import "../Style/_galeria.scss";

export function Galeria() {
  // carrega fotos do localstorage
  const [fotos, setFotos] = useState(() => {
    const salvas = localStorage.getItem("fotos");
    return salvas ? JSON.parse(salvas) : [];
  });

  // adiciona foto nova
  const adicionarFoto = (novaFoto) => {
    const novasFotos = [...fotos, novaFoto];
    setFotos(novasFotos);
    localStorage.setItem("fotos", JSON.stringify(novasFotos));
  };

  // apaga todas as fotos
  const limparGaleria = () => {
    if (!confirm("deseja excluir todas as fotos?")) return;
    localStorage.removeItem("fotos");
    setFotos([]);
  };

  return (
    <main
      className="galeria-page"
      role="main"
      aria-label="página da galeria de fotos"
    >
      <Camera onfotoTirada={adicionarFoto} />

      <button
        onClick={limparGaleria}
        aria-label="limpar todas as fotos da galeria"
      >
        limpar galeria
      </button>

      <section aria-labelledby="titulo-galeria">
        <h2 id="titulo-galeria">galeria de fotos</h2>

        {fotos.length === 0 && <p>nenhuma foto salva ainda.</p>}

        <Box sx={{ width: 500, height: 450 }}>
          <ImageList cols={3} rowHeight={164} aria-label="lista de fotos">
            {fotos.map((foto, i) => (
              <ImageListItem key={i}>
                
                <img
                  src={foto}
                  alt={`foto ${i + 1}`}
                  loading="lazy"
                  width="160"
                  height="160"
                />
              </ImageListItem>
            ))}
          </ImageList>
        </Box>
      </section>
    </main>
  );
}
