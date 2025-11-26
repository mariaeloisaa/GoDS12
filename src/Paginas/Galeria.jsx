import { useState } from "react";
import { Camera } from "../Componentes/Camera";
import Box from "@mui/material/Box";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import "../Style/_galeria.scss"
 
export function Galeria() {
  const [fotos, setFotos] = useState(() => {
    const salvas = localStorage.getItem("fotos");
    return salvas ? JSON.parse(salvas) : [];
  });
 
  const adicionarFoto = (novaFoto) => {
    const novasFotos = [...fotos, novaFoto];
    setFotos(novasFotos);
    localStorage.setItem("fotos", JSON.stringify(novasFotos)); // 🔠 corrigido
  };
 
  const limparGaleria = () => {
    if (!confirm("Deseja excluir todas as fotos?")) return;
    localStorage.removeItem("fotos");
    setFotos([]);
  };
 
  return (
    <main className="galeria-page">
      <Camera onfotoTirada={adicionarFoto} />
      <button onClick={limparGaleria}>Limpar Galeria</button>
 
      <section>
        <h2>Galeria de Fotos</h2>
        {fotos.length === 0 && <p>Ainda não há fotos.</p>}
 
        <Box sx={{ width: 500, height: 450 }}>
          <ImageList cols={3} rowHeight={164}>
            {fotos.map((foto, i) => (
              <ImageListItem key={i}>
                <img src={foto} alt={`Foto ${i + 1}`} loading="lazy" />
              </ImageListItem>
            ))}
          </ImageList>
        </Box>
      </section>
    </main>
  );
}