import { useState } from 'react';

export const usePresupuesto = () => {
  const [pasoActual, setPasoActual] = useState(1);
  const [datosPresupuesto, setDatosPresupuesto] = useState({
    marcaCamaras: null,
    camaras: [],
    nvr: null,
    cantidadSwitches: 0,
    disco: null,
    incluirManoDeObra: true,
    manoDeObra: 0,
  });
  const [resultado, setResultado] = useState(null);
  const [mostrarResumen, setMostrarResumen] = useState(true);

  const avanzarPaso = (nuevosDatos = {}) => {
    setDatosPresupuesto((prevDatos) => ({ ...prevDatos, ...nuevosDatos }));
    setPasoActual((prevPaso) => prevPaso + 1);

    if (pasoActual === 5) {
      setMostrarResumen(false);
    }
  };

  const retrocederPaso = () => {
    setPasoActual((prevPaso) => prevPaso - 1);

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
    const totalManoDeObra = datosPresupuesto.incluirManoDeObra ? datosPresupuesto.manoDeObra : 0;

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
  };

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

  return {
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
  };
};