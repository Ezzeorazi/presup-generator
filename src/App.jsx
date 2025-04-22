import React from 'react';
import { usePresupuesto } from './hooks/usePresupuesto';
import MarcaCamaras from './components/MarcasCamaras.jsx';
import TipoCantidadCamaras from './components/TipoCantidadCamaras.jsx';
import SeleccionNVR from './components/SeleccionNVR.jsx';
import SeleccionSwitch from './components/SeleccionSwitch.jsx';
import SeleccionDisco from './components/SeleccionDisco.jsx';
import OpcionManoDeObra from './components/OpcionManoDeObra.jsx';
import ResultadoPresupuesto from './components/ResultadoPresupuesto.jsx';
import Resumen from './components/Resumen.jsx';
import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';

function App() {
  const {
    pasoActual,
    datosPresupuesto,
    setDatosPresupuesto,
    resultado,
    mostrarResumen,
    avanzarPaso,
    retrocederPaso,
    mostrarResultado,
    generarPDF,
    reiniciarApp,
  } = usePresupuesto();

  return (
    <>
      <Navbar />
      <div className="container-fluid mt-3">
        <div className="row">
          {/* Sección de artículos */}
          <aside className="col-md-3 mb-3">
            <div className="bg-light p-3 rounded shadow-sm">
              <h5 className="text-center">Artículos</h5>
              <ul className="list-group">
                <li className="list-group-item">Cámara 1</li>
                <li className="list-group-item">Cámara 2</li>
                <li className="list-group-item">NVR</li>
                <li className="list-group-item">Switch</li>
                <li className="list-group-item">Disco</li>
              </ul>
            </div>
          </aside>
  
          {/* Contenido principal */}
          <div className="col-md-9">
            <div className="card shadow">
              <div className="card-body">
                {pasoActual === 1 && <MarcaCamaras onSiguiente={avanzarPaso} />}
                {pasoActual === 2 && (
                  <TipoCantidadCamaras
                    onSiguiente={avanzarPaso}
                    onAnterior={retrocederPaso}
                    datosPrevios={datosPresupuesto}
                  />
                )}
                {pasoActual === 3 && (
                  <SeleccionNVR
                    onSiguiente={avanzarPaso}
                    onAnterior={retrocederPaso}
                    datosPrevios={datosPresupuesto}
                  />
                )}
                {pasoActual === 4 && (
                  <SeleccionSwitch
                    onSiguiente={avanzarPaso}
                    onAnterior={retrocederPaso}
                    datosPrevios={datosPresupuesto}
                  />
                )}
                {pasoActual === 5 && (
                  <SeleccionDisco
                    onSiguiente={avanzarPaso}
                    onAnterior={retrocederPaso}
                    datosPrevios={datosPresupuesto}
                  />
                )}
                {pasoActual === 6 && (
                  <OpcionManoDeObra
                    onSiguiente={mostrarResultado}
                    onAnterior={retrocederPaso}
                    datosPrevios={datosPresupuesto}
                    setDatosPresupuesto={setDatosPresupuesto}
                  />
                )}
                {pasoActual === 7 && resultado && (
                  <ResultadoPresupuesto resultado={resultado} onGenerarPDF={generarPDF} />
                )}
              </div>
            </div>
            {mostrarResumen && pasoActual !== 7 ? (
              <Resumen datos={datosPresupuesto} pasoActual={pasoActual} />
            ) : pasoActual !== 7 && (
              <div className="mt-3">
                <h3>Total Acumulado:</h3>
                <p>
                  <strong>
                    ${datosPresupuesto.camaras.reduce((sum, cam) => sum + cam.cantidad * cam.precioUnitario, 0) +
                      (datosPresupuesto.nvr ? datosPresupuesto.nvr.precio : 0) +
                      datosPresupuesto.cantidadSwitches * 69.5 +
                      (datosPresupuesto.disco ? datosPresupuesto.disco.precio : 0)}
                  </strong>
                </p>
              </div>
            )}
            {pasoActual === 7 && (
              <div className="mt-3">
                <button className="btn btn-danger" onClick={reiniciarApp}>Reiniciar</button>
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default App;