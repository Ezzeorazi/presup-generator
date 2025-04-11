import React, { useState, useEffect } from 'react';

function OpcionManoDeObra({ onSiguiente, onAnterior, datosPrevios, setDatosPresupuesto }) {
  const [incluirManoDeObra, setIncluirManoDeObra] = useState(datosPrevios?.incluirManoDeObra || false);

  useEffect(() => {
    // Actualiza el estado global cada vez que se cambia la selección
    setDatosPresupuesto((prevDatos) => ({
      ...prevDatos,
      incluirManoDeObra: incluirManoDeObra,
      manoDeObra: incluirManoDeObra ? 100 : 0,
    }));
  }, [incluirManoDeObra, setDatosPresupuesto]);

  const handleChange = (event) => {
    setIncluirManoDeObra(event.target.checked);
  };

  const handleSubmit = () => {
    onSiguiente();
  };

  return (
    <div>
      <h2>Paso 6: Mano de Obra</h2>
      <div className="form-check">
        <input
          type="checkbox"
          className="form-check-input"
          id="incluirManoDeObra"
          checked={incluirManoDeObra}
          onChange={handleChange}
        />
        <label className="form-check-label" htmlFor="incluirManoDeObra">
          ¿Incluir mano de obra en el presupuesto? (Costo: $100)
        </label>
      </div>
      <div className="mt-3">
        <button className="btn btn-secondary" onClick={onAnterior}>Anterior</button>
        <button className="btn btn-primary ms-2" onClick={handleSubmit}>Siguiente</button>
      </div>
    </div>
  );
}

export default OpcionManoDeObra;