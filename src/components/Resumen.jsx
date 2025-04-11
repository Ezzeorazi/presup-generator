import React from 'react';

function Resumen({ datos }) {
  return (
    <div className="mt-4">
      <h3>Resumen del Presupuesto</h3>
      <ul className="list-group">
        {datos.marcaCamaras && (
          <li className="list-group-item">
            <strong>Marca de Cámaras:</strong> {datos.marcaCamaras.nombre}
          </li>
        )}
        {datos.camaras.length > 0 && (
          <li className="list-group-item">
            <strong>Cámaras Seleccionadas:</strong>
            <ul>
              {datos.camaras.map((cam, index) => (
                <li key={index}>
                  {cam.modelo} ({cam.tipo}) (x{cam.cantidad}) - Precio Unitario: ${cam.precioUnitario.toFixed(2)}
                </li>
              ))}
            </ul>
          </li>
        )}
        {datos.nvr && (
          <li className="list-group-item">
            <strong>NVR Seleccionado:</strong> {datos.nvr.modelo} - Precio: ${datos.nvr.precio.toFixed(2)}
          </li>
        )}
        {datos.cantidadSwitches > 0 && (
          <li className="list-group-item">
            <strong>Switches:</strong> Cantidad: {datos.cantidadSwitches}
          </li>
        )}
        {datos.disco && (
          <li className="list-group-item">
            <strong>Disco Seleccionado:</strong> {datos.disco.tipo} {datos.disco.capacidad} - Precio: ${datos.disco.precio.toFixed(2)}
          </li>
        )}
        <li className="list-group-item">
          <strong>Mano de Obra:</strong> {datos.incluirManoDeObra ? `$${datos.manoDeObra.toFixed(2)}` : 'No incluida'}
        </li>
      </ul>
    </div>
  );
}

export default Resumen;