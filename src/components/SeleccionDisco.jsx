// components/SeleccionDisco.jsx
import React, { useState, useEffect } from 'react';
import articulos from '../data/articulos.json';

function SeleccionDisco({ onSiguiente, onAnterior, datosPrevios }) {
  const [discoSeleccionado, setDiscoSeleccionado] = useState(datosPrevios?.disco || null);
  const [modelosDisco, setModelosDisco] = useState([]);

  useEffect(() => {
    setModelosDisco(articulos.discos);
  }, []);

  const handleChange = (event) => {
    const selectedId = event.target.value;
    const disco = modelosDisco.find(disco => disco.id === selectedId);
    setDiscoSeleccionado(disco);
  };

  const handleSubmit = () => {
    if (discoSeleccionado) {
      onSiguiente({ disco: discoSeleccionado });
    } else {
      alert('Por favor, selecciona un disco.');
    }
  };

  return (
    <div>
      <h2>Paso 5: Disco</h2>
      <div className="mb-3">
        <label htmlFor="disco" className="form-label">Selecciona tipo y capacidad del disco:</label>
        <select className="form-select" id="disco" value={discoSeleccionado?.id || ''} onChange={handleChange}>
          <option value="">Seleccionar</option>
          {modelosDisco.map(disco => (
            <option key={disco.id} value={disco.id}>{disco.tipo} - {disco.capacidad} - Precio: ${disco.precio}</option>
          ))}
        </select>
      </div>
      <div className="mt-3">
        <button className="btn btn-secondary" onClick={onAnterior}>Anterior</button>
        <button className="btn btn-primary ms-2" onClick={handleSubmit} disabled={!discoSeleccionado}>Siguiente</button>
      </div>
    </div>
  );
}

export default SeleccionDisco;