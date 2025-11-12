import { useState } from "react";
import { Camera } from "../Componentes/Camera";
import { ImageList, ImageListItem } from "@mui/material";


export function Galeria(){
    const[fotos, setFotos] = useState(()=>{
        const salvas = localStorage.getItem("fotos");
        return salvas? JSON.parse(salvas):[]
    });

    const adicionarFoto = (novaFoto)=>{
        const novasFotos =[...fotos, novaFoto];
        setFotos(novasFotos);
        localStorage.setItem("fotos", JSON.stringify(novasFotos))
    };

    const limparGaleria=()=>{
        if (!confirm("Deseja excluir todas suas fotos?"))return; 
            localStorage.removeItem("fotos");
            setFotos([]);    
    };

    return(
        <main>
            <Camera onFotoTirada={adicionarFoto}/>
            <button onClick={limparGaleria}>Limpar Galeria</button>

            <section>
                <h2>Galeria de Fotos</h2>
                {fotos.lenght === 0 && <p>Ainda não existem fotos na galeria</p>}
                <ImageList sx={{ width: 500, height: 450 }} cols={3} rowHeight={164}>
                    {fotos.map((f,i) => (
                        <ImageListItem key={i}>
                            <img
                                src={f}
                                alt={`Foto ${i+1}`}
                                loading="lazy"
                            />
                        </ImageListItem>
                    ))}
                </ImageList>
            </section>
        </main>
    )

}