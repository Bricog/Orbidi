import { createLocalStyles } from "./modulos/createLocalStyles/createLocalStyle";
import { exportPDF } from "./modulos/exportPDFs/exportPDF";
import { presentation } from "./modulos/presentations/presentation";
import { syncStyle } from "./modulos/syncStyles/syncStyle";

figma.showUI(__html__, {
  width: 280,
  height: 410,
  title: "Orbidi Presentaciones",
});

figma.ui.onmessage = async (msg: { type: string; count: number }) => {
  // Módulo Generar Presentación
  if (msg.type === "presentation") {
    await presentation();
  }

  // Módulo Exportar PDF
  if (msg.type === "exportPDF") {
    exportPDF();
  }

  // Módulo Crear Local Style
  if (msg.type === "createLocalStyle") {
    createLocalStyles();
  }

  // Módulo sincronizar estilos
  if (msg.type === "syncStyle") {
    syncStyle();
  }
};
