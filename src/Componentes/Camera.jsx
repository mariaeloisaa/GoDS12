import { useState, useEffect, useRef } from "react";
import "../Style/camera.scss"
 
export function Camera({ onfotoTirada }) {
    const videoRef = useRef(null);
    const canvasRef = useRef(null);
    const [foto, setFoto] = useState(null);
 
    //Effect (inicializa com a camera ligada)
    useEffect(() => {
        iniciarCamera();
    }, []);
 
    //Inicializar Camera
    const iniciarCamera = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ video: true });
            if (videoRef.current) {
                videoRef.current.srcObject = stream;
            }
        } catch (error) {
            console.error("Erro ao acessar a camera", error);
        }
    };
 
    //tirar foto
    const tirarFoto = () => {
        const video = videoRef.current;
        const canvas = canvasRef.current;
        const foto2d = canvas.getContext("2d"); // corrigido
 
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
 
        foto2d.drawImage(video, 0, 0, video.videoWidth, video.videoHeight);
 
        const imagem = canvas.toDataURL("image/png");
        setFoto(imagem);
 
        if (onfotoTirada) {
            onfotoTirada(imagem); //envia isso para a props caso necessario
        }
    };
 
    const reiniciar = () => {
        setFoto(null);
        iniciarCamera();
    };
 
    return (
        <section className="camera-section">
            <h2>Captura de imagem</h2>
            <div>
                {!foto ? (
                    <video ref={videoRef} autoPlay playsInline aria-label="fluxo de camera" />
                ) : (
                    <img src={foto} alt="foto Tirada" />
                )}
            </div>
            <div className="camera-buttons">
                {!foto ? (
                    <button type="button" onClick={tirarFoto}>Tirar Foto</button>
                ) : (
                    <button type="button" onClick={reiniciar}>Nova Foto</button>
                )}
            </div>
            <canvas ref={canvasRef} style={{ display: "none" }}></canvas>
        </section>
    );
}