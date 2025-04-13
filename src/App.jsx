import React, { useState } from 'react';
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
  // Estado para controlar el paso actual del formulario
  const [pasoActual, setPasoActual] = useState(1);
  // Estado para almacenar los datos del presupuesto
  const [datosPresupuesto, setDatosPresupuesto] = useState({
    marcaCamaras: null,
    camaras: [],
    nvr: null,
    cantidadSwitches: 0,
    disco: null,
    incluirManoDeObra: true,
    manoDeObra: 0,
  });
  // Estado para almacenar el resultado final del presupuesto
  const [resultado, setResultado] = useState(null);
  // Estado para controlar la visibilidad del resumen dinámico
  // Se inicializa en true para mostrar el resumen dinámico al inicio
  const [mostrarResumen, setMostrarResumen] = useState(true); // Controla si se muestra el resumen dinámico

  // Funciones para avanzar y retroceder pasos
  // Se utiliza para avanzar al siguiente paso del formulario
  const avanzarPaso = (nuevosDatos = {}) => {
    setDatosPresupuesto((prevDatos) => ({ ...prevDatos, ...nuevosDatos }));
    setPasoActual((prevPaso) => prevPaso + 1);

    // Oculta el resumen después del paso de selección de disco
    if (pasoActual === 5) {
      setMostrarResumen(false);
    }
  };
  // Se utiliza para retroceder al paso anterior del formulario
  const retrocederPaso = () => {
    setPasoActual((prevPaso) => prevPaso - 1);

    // Muestra el resumen si se regresa al paso anterior al disco
    if (pasoActual === 6) {
      setMostrarResumen(true);
    }
  };
  // Se utiliza para mostrar el resultado final del presupuesto
  // Calcula el total de cámaras, NVR, switches, disco y mano de obra
  // y actualiza el estado del resultado
  // Luego avanza al paso 7 para mostrar el resultado
  // Se utiliza para mostrar el resultado final del presupuesto
  const mostrarResultado = () => {
    const totalCamaras = datosPresupuesto.camaras.reduce((sum, cam) => sum + cam.cantidad * cam.precioUnitario, 0);
    const totalNVR = datosPresupuesto.nvr ? datosPresupuesto.nvr.precio : 0;
    const precioSwitchUnitario = 69.50;
    const totalSwitches = datosPresupuesto.cantidadSwitches * precioSwitchUnitario;
    const totalDisco = datosPresupuesto.disco ? datosPresupuesto.disco.precio : 0;
    const totalManoDeObra = datosPresupuesto.incluirManoDeObra ? datosPresupuesto.manoDeObra : 0; // Solo incluir si está seleccionado

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
  // Función para reiniciar la aplicación
  const reiniciarApp = () => {
    setPasoActual(1);
    setDatosPresupuesto({
      marcaCamaras: null,
      camaras: [],
      nvr: null,
      cantidadSwitches: 0,
      disco: null,
      incluirManoDeObra: false,
      manoDeObra: 0,
    });
    setResultado(null);
    setMostrarResumen(true);
  };

  return (
    <>
      <Navbar />
      <div className="main-content">
      <div className="d-flex flex-column justify-content-center align-items-center bg-light mt-3">
          <div className="card shadow w-75 mb-4">
            <div className="card-body">
              {/* Renderizar componentes según el paso actual */}
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
      <Footer />
    </>
  );
}

export default App;