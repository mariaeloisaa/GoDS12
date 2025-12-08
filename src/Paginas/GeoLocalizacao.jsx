import { useState, useRef, useEffect } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-routing-machine";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import "../Style/_geoLocalizacao.scss";

export function Geolocalizacao() {
  const mapRef = useRef(null);
  const rotaRef = useRef(null);

  // salva valores do formulário
  const [form, setForm] = useState({
    lat1: "",
    lng1: "",
    lat2: "",
    lng2: "",
  });

  const [erros, setErros] = useState({});

  // valida campos obrigatórios
  function validarCampos() {
    let temp = {};

    if (!form.lat1) temp.lat1 = "informe a latitude de origem";
    if (!form.lng1) temp.lng1 = "informe a longitude de origem";
    if (!form.lat2) temp.lat2 = "informe a latitude de destino";
    if (!form.lng2) temp.lng2 = "informe a longitude de destino";

    setErros(temp);
    return Object.keys(temp).length === 0;
  }

  // pega a localização atual para origem
  function pegarLocalizacaoOrigem() {
    navigator.geolocation.getCurrentPosition((pos) => {
      setForm({
        ...form,
        lat1: pos.coords.latitude.toFixed(6),
        lng1: pos.coords.longitude.toFixed(6),
      });
    });
  }

  // pega a localização atual para destino
  function pegarLocalizacaoDestino() {
    navigator.geolocation.getCurrentPosition((pos) => {
      setForm({
        ...form,
        lat2: pos.coords.latitude.toFixed(6),
        lng2: pos.coords.longitude.toFixed(6),
      });
    });
  }

  // gera rota no mapa
  function gerarRota(e) {
    e.preventDefault();
    if (!validarCampos()) return;

    const p1 = L.latLng(parseFloat(form.lat1), parseFloat(form.lng1));
    const p2 = L.latLng(parseFloat(form.lat2), parseFloat(form.lng2));

    if (rotaRef.current) rotaRef.current.remove();

    rotaRef.current = L.Routing.control({
      waypoints: [p1, p2],
      show: false,
      addWaypoints: false,
      draggableWaypoints: false,
      lineOptions: { addWaypoints: false },
    }).addTo(mapRef.current);

    mapRef.current.setView(p1, 15);
  }

  // inicia o mapa
  useEffect(() => {
    if (mapRef.current) return;

    const mapa = L.map("mapa").setView([-23.55, -46.63], 13);
    mapRef.current = mapa;

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
    }).addTo(mapa);
  }, []);

  return (
    <main
      className="container"
      role="main"
      aria-label="página de geolocalização"
    >
      <form
        className="form-box"
        onSubmit={gerarRota}
        aria-label="formulário para gerar rota"
      >
        <div className="header-box">
          <h2 className="title" id="titulo-rota">
            gerar rota
          </h2>

          <button
            type="button"
            className="voltar"
            onClick={() => (window.location.href = "/dsgo")}
            aria-label="voltar para página anterior"
          >
            voltar
          </button>
        </div>

        {/* origem */}
        <fieldset className="fieldset">
          <legend className="legend">origem</legend>

          <div className="input-group">
            <label htmlFor="lat1">latitude</label>
            <input
              id="lat1"
              type="number"
              name="lat1"
              step="any"
              value={form.lat1}
              onChange={(e) => setForm({ ...form, lat1: e.target.value })}
              className="input"
              aria-required="true"
            />
            {erros.lat1 && <p className="erro">{erros.lat1}</p>}
          </div>

          <div className="input-group">
            <label htmlFor="lng1">longitude</label>
            <input
              id="lng1"
              type="number"
              name="lng1"
              step="any"
              value={form.lng1}
              onChange={(e) => setForm({ ...form, lng1: e.target.value })}
              className="input"
              aria-required="true"
            />
            {erros.lng1 && <p className="erro">{erros.lng1}</p>}
          </div>

          <button
            type="button"
            className="btn btn-blue"
            onClick={pegarLocalizacaoOrigem}
            aria-label="usar minha localização atual como origem"
          >
            usar minha localização
          </button>
        </fieldset>

        {/* destino */}
        <fieldset className="fieldset">
          <legend className="legend">destino</legend>

          <div className="input-group">
            <label htmlFor="lat2">latitude</label>
            <input
              id="lat2"
              type="number"
              name="lat2"
              step="any"
              value={form.lat2}
              onChange={(e) => setForm({ ...form, lat2: e.target.value })}
              className="input"
              aria-required="true"
            />
            {erros.lat2 && <p className="erro">{erros.lat2}</p>}
          </div>

          <div className="input-group">
            <label htmlFor="lng2">longitude</label>
            <input
              id="lng2"
              type="number"
              name="lng2"
              step="any"
              value={form.lng2}
              onChange={(e) => setForm({ ...form, lng2: e.target.value })}
              className="input"
              aria-required="true"
            />
            {erros.lng2 && <p className="erro">{erros.lng2}</p>}
          </div>

          <button
            type="button"
            className="btn btn-blue"
            onClick={pegarLocalizacaoDestino}
            aria-label="usar minha localização atual como destino"
          >
            usar minha localização
          </button>
        </fieldset>

        <button
          type="submit"
          className="btn btn-green"
          aria-label="gerar rota entre os pontos"
        >
          gerar rota
        </button>
      </form>

      <div
        id="mapa"
        className="mapa"
        role="region"
        aria-label="mapa mostrando a rota"
      ></div>
    </main>
  );
}
