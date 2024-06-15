import { loadPage } from "../../../utils/loadPage";
import { compareColors } from "../scripts/compareColors";

export async function syncColor() {
  const pages = figma.root.children;
  for (const page of pages) {
    const pageCurrent = await loadPage(page.name);
    const all = pageCurrent?.findAll();
    const estilos = await figma.getLocalPaintStylesAsync();

    if (all && estilos) {
      for (let i = 0; i < all.length; i++) {
        const nodo = all[i];
        
        if (
          nodo.type === "TEXT" ||
          nodo.type === "FRAME" ||
          nodo.type === "RECTANGLE" ||
          nodo.type === "ELLIPSE" ||
          nodo.type === "COMPONENT" ||
          nodo.type === "VECTOR"
        ) {
          if (nodo.fills !== figma.mixed) {
            
            const relleno = nodo.fills[0];
            const stroke = nodo.strokes[0];
            if (relleno || stroke) {
              for (let h = 0; h < estilos.length; h++) {
                const element = estilos[h];
                const color = element.paints[0];
                const [group] = element.name.split("/");
                if (pageCurrent) {
                  const [page] = pageCurrent.name.split(" - ");
                  if (group == page) {
                    if (relleno && "color" in color && "color" in relleno) {
                      const colorStyle = color.color;
                      const colorRelleno = relleno.color;
                      if (
                        compareColors(colorStyle, colorRelleno) &&
                        color.visible === relleno.visible
                      ) {
                        try {
                          await nodo.setFillStyleIdAsync(element.id);
                        } catch (error) {
                          console.error(
                            `Failed to set fill style for node ${nodo.id}: ${nodo.name}`
                          );
                        }
                      }
                    }
                    if (stroke && "color" in color && "color" in stroke) {
                      const colorStyle = color.color;
                      const colorStroke = stroke.color;
                      if (compareColors(colorStyle, colorStroke)) {
                        try {
                          await nodo.setStrokeStyleIdAsync(element.id);
                        } catch (error) {
                          console.error(
                            `Failed to set stroke style for node ${nodo.id}: ${nodo.name}`
                          );
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}
