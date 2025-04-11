import React, { useState } from 'react';

function SeleccionSwitch({ onSiguiente, onAnterior, datosPrevios }) {
  const [cantidadSwitches, setCantidadSwitches] = useState(datosPrevios?.cantidadSwitches || 0);
  const cantidades = Array.from({ length: 10 }, (_, i) => i + 1); // Genera un array del 1 al 10

  const handleChangeCantidad = (event) => {
    setCantidadSwitches(parseInt(event.target.value));
  };

  const handleSubmit = () => {
    onSiguiente({ cantidadSwitches });
  };

  return (
    <div>
      <h2>Paso 4: Switch</h2>
      <div className="mb-3">
        <label htmlFor="cantidadSwitches" className="form-label">Cantidad de Switches necesarios:</label>
        <select
          className="form-select"
          id="cantidadSwitches"
          value={cantidadSwitches}
          onChange={handleChangeCantidad}
        >
          {cantidades.map(cantidad => (
            <option key={cantidad} value={cantidad}>{cantidad}</option>
          ))}
        </select>
      </div>

      {cantidadSwitches > 0 && (
        <div>
          <h3>Switches Seleccionados:</h3>
          <ul className="list-group">
            <li className="list-group-item">
              Switches seleccionados: {cantidadSwitches}
            </li>
          </ul>
        </div>
      )}

      <div className="mt-3">
        <button className="btn btn-secondary" onClick={onAnterior}>Anterior</button>
        <button className="btn btn-primary ms-2" onClick={handleSubmit}>Siguiente</button>
      </div>
    </div>
  );
}

export default SeleccionSwitch;