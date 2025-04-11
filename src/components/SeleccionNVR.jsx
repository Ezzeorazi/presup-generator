// components/SeleccionNVR.jsx
import React, { useState, useEffect } from 'react';
import articulos from '../data/articulos.json';

function SeleccionNVR({ onSiguiente, onAnterior, datosPrevios }) {
  const [nvrSeleccionado, setNvrSeleccionado] = useState(datosPrevios?.nvr || null);
  const [modelosNVRFiltrados, setModelosNVRFiltrados] = useState([]);
  const marcaSeleccionadaId = datosPrevios?.marcaCamaras?.id || '';
  const nvrsData = articulos.nvrs;

  useEffect(() => {
    const nvrsFiltrados = nvrsData.filter(nvr => nvr.marca === marcaSeleccionadaId);
    setModelosNVRFiltrados(nvrsFiltrados);
  }, [marcaSeleccionadaId]);

  const handleChange = (event) => {
    const selectedId = event.target.value;
    const nvr = modelosNVRFiltrados.find(nvr => nvr.id === selectedId);
    setNvrSeleccionado(nvr);
  };

  const handleSubmit = () => {
    if (nvrSeleccionado) {
      onSiguiente({ nvr: nvrSeleccionado });
    } else {
      alert('Por favor, selecciona un modelo de NVR.');
    }
  };

  return (
    <div>
      <h2>Paso 3: NVR</h2>
      <div className="mb-3">
        <label htmlFor="nvr" className="form-label">Selecciona un modelo de NVR compatible:</label>
        <select className="form-select" id="nvr" value={nvrSeleccionado?.id || ''} onChange={handleChange}>
          <option value="">Seleccionar</option>
          {modelosNVRFiltrados.map(nvr => (
            <option key={nvr.id} value={nvr.id}>{nvr.modelo} (Canales: {nvr.canales}) - Precio: ${nvr.precio}</option>
          ))}
        </select>
      </div>
      <div className="mt-3">
        <button className="btn btn-secondary" onClick={onAnterior}>Anterior</button>
        <button className="btn btn-primary ms-2" onClick={handleSubmit} disabled={!nvrSeleccionado}>Siguiente</button>
      </div>
    </div>
  );
}

export default SeleccionNVR;