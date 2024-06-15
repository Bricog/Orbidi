import { presentation } from "./modulos/presentation/presentations";

figma.showUI(__html__, {
  width: 280,
  height: 600,
  title: "Orbidi Presentaciones"
});





figma.ui.onmessage = async (msg: { type: string; count: number }) => {
  // Módulo Generar Presentación
  if (msg.type === "presentation") {
    await presentation()
  }
};
