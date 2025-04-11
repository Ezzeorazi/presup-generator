// components/ResultadoPresupuesto.jsx
import React from 'react';

function ResultadoPresupuesto({ resultado, onGenerarPDF }) {
  return (
    <div>
      <h2>Resultado del Presupuesto</h2>
      {resultado && (
        <ul className="list-group">
          {resultado.camaras && resultado.camaras.length > 0 && (
            <li className="list-group-item">
              <strong>Cámaras:</strong>
              <ul>
                {resultado.camaras.map((cam, index) => (
                  <li key={index}>
                    {cam.modelo} ({cam.tipo}) (x{cam.cantidad}) - Precio Unitario: ${cam.precioUnitario.toFixed(2)} - Total: ${(cam.cantidad * cam.precioUnitario).toFixed(2)}
                  </li>
                ))}
              </ul>
            </li>
          )}
          {resultado.nvr && (
            <li className="list-group-item">
              <strong>NVR:</strong> {resultado.nvr.modelo} (Canales: {resultado.nvr.canales}) - Precio: ${resultado.nvr.precio.toFixed(2)}
            </li>
          )}
          {resultado.cantidadSwitches > 0 && (
            <li className="list-group-item">
              <strong>Switches:</strong> Cantidad: {resultado.cantidadSwitches} - Precio Unitario (Estimado): ${resultado.precioSwitchUnitario.toFixed(2)} - Total (Estimado): ${(resultado.cantidadSwitches * resultado.precioSwitchUnitario).toFixed(2)}
            </li>
          )}
          {resultado.disco && (
            <li className="list-group-item">
              <strong>Disco:</strong> {resultado.disco.tipo} {resultado.disco.capacidad} - Precio: ${resultado.disco.precio.toFixed(2)}
            </li>
          )}
          <li className="list-group-item">
            <strong>Mano de Obra:</strong> ${resultado.manoDeObra.toFixed(2)}
          </li>
          <li className="list-group-item active">
            <strong>Presupuesto Total:</strong> ${resultado.total.toFixed(2)}
          </li>
        </ul>
      )}
      <button className="btn btn-success mt-3" onClick={onGenerarPDF}>Generar PDF</button>
    </div>
  );
}

export default ResultadoPresupuesto;