import { useState, useEffect, useRef } from "react";
import "../Style/camera.scss";

export function Camera({ onfotoTirada }) {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [foto, setFoto] = useState(null);

  // inicializa a camera
  useEffect(() => {
    iniciarCamera();
  }, []);

  
  const iniciarCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (error) {
      console.error("erro ao acessar a camera", error);
    }
  };

  // captura a imagem atual do video e converte
  const tirarFoto = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;

    const ctx = canvas.getContext("2d");

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    ctx.drawImage(video, 0, 0, video.videoWidth, video.videoHeight);

    const imagem = canvas.toDataURL("image/png");
    setFoto(imagem);

    if (onfotoTirada) {
      onfotoTirada(imagem);
    }
  };

  // reinicia
  const reiniciar = () => {
    setFoto(null);
    iniciarCamera();
  };

  return (
    <section
      className="camera-section"
      aria-labelledby="titulo-camera"
      role="region"
    >
      <h2 id="titulo-camera">captura de imagem</h2>

      <div className="camera-preview" aria-live="polite">
        {!foto ? (
          <video
            ref={videoRef}
            autoPlay
            playsInline
            aria-label="fluxo de vídeo da camera"
          />
        ) : (
          <img src={foto} alt="foto capturada" />
        )}
      </div>

      <div className="camera-buttons" role="group" aria-label="controle de captura">
        {!foto ? (
          <button type="button" onClick={tirarFoto} aria-label="tirar foto">
            tirar foto
          </button>
        ) : (
          <button type="button" onClick={reiniciar} aria-label="tirar nova foto">
            nova foto
          </button>
        )}
      </div>

      <canvas ref={canvasRef} aria-hidden="true" />
    </section>
  );
}
