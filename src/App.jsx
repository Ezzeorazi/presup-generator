import React, { useState } from 'react';
import MarcaCamaras from './components/MarcasCamaras.jsx';
import TipoCantidadCamaras from './components/TipoCantidadCamaras.jsx';
import SeleccionNVR from './components/SeleccionNVR.jsx';
import SeleccionSwitch from './components/SeleccionSwitch.jsx';
import SeleccionDisco from './components/SeleccionDisco.jsx';
import OpcionManoDeObra from './components/OpcionManoDeObra.jsx';
import ResultadoPresupuesto from './components/ResultadoPresupuesto.jsx';
import Resumen from './components/Resumen.jsx';

function App() {
  const [pasoActual, setPasoActual] = useState(1);
  const [datosPresupuesto, setDatosPresupuesto] = useState({
    marcaCamaras: null,
    camaras: [],
    nvr: null,
    cantidadSwitches: 0,
    disco: null,
    incluirManoDeObra: true,
    manoDeObra: 100,
  });
  const [resultado, setResultado] = useState(null);
  const [mostrarResumen, setMostrarResumen] = useState(true); // Controla si se muestra el resumen dinámico

  const avanzarPaso = (nuevosDatos = {}) => {
    setDatosPresupuesto((prevDatos) => ({ ...prevDatos, ...nuevosDatos }));
    setPasoActual((prevPaso) => prevPaso + 1);

    // Oculta el resumen después del paso de selección de disco
    if (pasoActual === 5) {
      setMostrarResumen(false);
    }
  };

  const retrocederPaso = () => {
    setPasoActual((prevPaso) => prevPaso - 1);

    // Muestra el resumen si se regresa al paso anterior al disco
    if (pasoActual === 6) {
      setMostrarResumen(true);
    }
  };

  const mostrarResultado = () => {
    const totalCamaras = datosPresupuesto.camaras.reduce((sum, cam) => sum + cam.cantidad * cam.precioUnitario, 0);
    const totalNVR = datosPresupuesto.nvr ? datosPresupuesto.nvr.precio : 0;
    const precioSwitchUnitario = 69.50;
    const totalSwitches = datosPresupuesto.cantidadSwitches * precioSwitchUnitario;
    const totalDisco = datosPresupuesto.disco ? datosPresupuesto.disco.precio : 0;
    const totalManoDeObra = datosPresupuesto.manoDeObra;
    const presupuestoTotal = totalCamaras + totalNVR + totalSwitches + totalDisco + totalManoDeObra;

    setResultado({
      camaras: datosPresupuesto.camaras.map((cam) => ({
        ...cam,
        precioTotal: cam.cantidad * cam.precioUnitario,
      })),
      nvr: datosPresupuesto.nvr
        ? { ...datosPresupuesto.nvr, precioTotal: datosPresupuesto.nvr.precio }
        : null,
      cantidadSwitches: datosPresupuesto.cantidadSwitches,
      precioSwitchUnitario,
      totalSwitches,
      disco: datosPresupuesto.disco
        ? { ...datosPresupuesto.disco, precioTotal: datosPresupuesto.disco.precio }
        : null,
      manoDeObra: totalManoDeObra,
      total: presupuestoTotal,
    });
    setPasoActual(7);
  };

  const generarPDF = () => {
    console.log('Generando PDF con:', resultado);
    // Implementar lógica para generar el PDF
  };

  const reiniciarApp = () => {
    setPasoActual(1);
    setDatosPresupuesto({
      marcaCamaras: null,
      camaras: [],
      nvr: null,
      cantidadSwitches: 0,
      disco: null,
      incluirManoDeObra: true,
      manoDeObra: 100,
    });
    setResultado(null);
    setMostrarResumen(true);
  };

  return (
    <div className="d-flex flex-column justify-content-center align-items-center vh-100 bg-light">
      <div className="card shadow w-75 mb-4">
        <div className="card-body">
          <h1 className="text-center mb-4">Presupuesto de Videovigilancia</h1>
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
      {/* Mostrar resumen dinámico o total acumulado */}
      {mostrarResumen ? (
        <Resumen datos={datosPresupuesto} />
      ) : (
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
  );
}

export default App;