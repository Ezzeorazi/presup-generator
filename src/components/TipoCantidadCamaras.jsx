// components/TipoCantidadCamaras.jsx
import React, { useState, useEffect } from 'react';
import articulos from '../data/articulos.json';

function TipoCantidadCamaras({ onSiguiente, onAnterior, datosPrevios }) {
  const [camarasSeleccionadas, setCamarasSeleccionadas] = useState(datosPrevios?.camaras || []);
  const [nuevoTipo, setNuevoTipo] = useState('');
  const [nuevaCantidad, setNuevaCantidad] = useState(1);
  const [tiposDeCamara, setTiposDeCamara] = useState([]);
  const marcaSeleccionadaId = datosPrevios?.marcaCamaras?.id || '';
  const camarasData = articulos.camaras;
  const cantidades = Array.from({ length: 10 }, (_, i) => i + 1); // Genera un array del 1 al 10

  useEffect(() => {
    const tiposFiltrados = [...new Set(camarasData
      .filter(camara => camara.marca === marcaSeleccionadaId)
      .map(camara => camara.tipo))];
    setTiposDeCamara(tiposFiltrados);
  }, [marcaSeleccionadaId]);

  const agregarCamara = () => {
    if (nuevoTipo && nuevaCantidad > 0) {
      const camaraInfo = camarasData.find(
        camara => camara.marca === marcaSeleccionadaId && camara.tipo === nuevoTipo
      );
      if (camaraInfo) {
        setCamarasSeleccionadas([...camarasSeleccionadas, {
          tipo: nuevoTipo,
          cantidad: parseInt(nuevaCantidad),
          precioUnitario: camaraInfo.precio,
          modelo: camaraInfo.modelo
        }]);
        setNuevoTipo('');
        setNuevaCantidad(1);
      } else {
        alert(`No se encontraron cámaras del tipo "${nuevoTipo}" para la marca seleccionada.`);
      }
    }
  };

  const handleSubmit = () => {
    if (camarasSeleccionadas.length > 0) {
      onSiguiente({ camaras: camarasSeleccionadas });
    } else {
      alert('Por favor, selecciona al menos una cámara.');
    }
  };

  const eliminarCamara = (index) => {
    const nuevasCamaras = [...camarasSeleccionadas];
    nuevasCamaras.splice(index, 1);
    setCamarasSeleccionadas(nuevasCamaras);
  };

  return (
    <div>
      <h2>Paso 2: Tipo y Cantidad de Cámaras</h2>
      <div className="mb-3">
        <label htmlFor="tipo" className="form-label">Tipo de Cámara:</label>
        <select className="form-select" id="tipo" value={nuevoTipo} onChange={(e) => setNuevoTipo(e.target.value)}>
          <option value="">Seleccionar</option>
          {tiposDeCamara.map(tipo => (
            <option key={tipo} value={tipo}>{tipo}</option>
          ))}
        </select>
      </div>
      <div className="mb-3">
        <label htmlFor="cantidad" className="form-label">Cantidad:</label>
        <select className="form-select" id="cantidad" value={nuevaCantidad} onChange={(e) => setNuevaCantidad(parseInt(e.target.value))}>
          {cantidades.map(cantidad => (
            <option key={cantidad} value={cantidad}>{cantidad}</option>
          ))}
        </select>
      </div>
      <button className="btn btn-success mb-3" onClick={agregarCamara} disabled={!nuevoTipo}>Agregar Cámara</button>

      {camarasSeleccionadas.length > 0 && (
        <div>
          <h3>Cámaras Seleccionadas:</h3>
          <ul className="list-group">
            {camarasSeleccionadas.map((cam, index) => (
              <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
                {cam.modelo} ({cam.tipo}) (x{cam.cantidad}) - Precio Unitario: ${cam.precioUnitario}
                <button type="button" className="btn btn-danger btn-sm" onClick={() => eliminarCamara(index)}>Eliminar</button>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="mt-3">
        <button className="btn btn-secondary" onClick={onAnterior}>Anterior</button>
        <button className="btn btn-primary ms-2" onClick={handleSubmit} disabled={camarasSeleccionadas.length === 0}>Siguiente</button>
      </div>
    </div>
  );
}

export default TipoCantidadCamaras;