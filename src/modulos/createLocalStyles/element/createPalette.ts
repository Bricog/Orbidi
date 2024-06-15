import { loadPage } from "../../../utils/loadPage";

export async function createPalette(search: string) {
    const pages = figma.root.children;
    for (const page of pages) {
      const pageCurrent = await loadPage(page.name);
  
      const namePage = pageCurrent?.name.split(" - ")[0];
      const cuadroColores = pageCurrent?.findOne((n) => {
        return n.name === search;
      });
  
      const currentPalette = await figma.getLocalPaintStylesAsync();
      const currentPaletteMap: { [key: string]: PaintStyle } = {};
      currentPalette.forEach((style) => {
        currentPaletteMap[style.name] = style;
      });
  
      if (
        cuadroColores?.type === "FRAME" ||
        cuadroColores?.type === "COMPONENT"
      ) {
        const colores = cuadroColores.children;
  
        for (const color of colores) {
          if (color?.type === "RECTANGLE") {
            if (Array.isArray(color.fills)) {
              const name = `${namePage}/${color.name}`;
  
              if (currentPaletteMap[name]) {
                currentPaletteMap[name].paints = color.fills;
              } else {
                const createStyle = figma.createPaintStyle();
                createStyle.name = name;
                createStyle.paints = color.fills;
                color.setFillStyleIdAsync(createStyle.id);
              }
            }
          }
        }
      }
    }
  }