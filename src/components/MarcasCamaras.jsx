// components/MarcaCamaras.jsx
import React, { useState } from 'react';
import articulos from '../data/articulos.json';

function MarcaCamaras({ onSiguiente }) {
  const [marcaSeleccionada, setMarcaSeleccionada] = useState('');
  const marcas = articulos.marcas;

  const handleSubmit = () => {
    if (marcaSeleccionada) {
      const marca = marcas.find(m => m.id === marcaSeleccionada);
      onSiguiente({ marcaCamaras: marca });
    } else {
      alert('Por favor, selecciona una marca.');
    }
  };

  return (
    <div>
      <h2>Paso 1: Marca de Cámaras</h2>
      <div className="mb-3">
        <label htmlFor="marca" className="form-label">Selecciona la marca:</label>
        <select className="form-select" id="marca" value={marcaSeleccionada} onChange={(e) => setMarcaSeleccionada(e.target.value)}>
          <option value="">Seleccionar</option>
          {marcas.map(marca => (
            <option key={marca.id} value={marca.id}>{marca.nombre}</option>
          ))}
        </select>
      </div>
      <button className="btn btn-primary" onClick={handleSubmit} disabled={!marcaSeleccionada}>Siguiente</button>
    </div>
  );
}

export default MarcaCamaras;