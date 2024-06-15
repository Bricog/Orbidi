import { compareColors } from "../scripts/compareColors";

export async function syncColor() {
  const all = figma.currentPage.findAll();
  const estilos = await figma.getLocalPaintStylesAsync();

  for (let i = 0; i < all.length; i++) {
    const nodo = all[i];
    for (let h = 0; h < estilos.length; h++) {
      const element = estilos[h];

      if (
        nodo.type === "TEXT" ||
        nodo.type === "FRAME" ||
        nodo.type === "RECTANGLE" ||
        nodo.type === "ELLIPSE" ||
        nodo.type === "COMPONENT" ||
        nodo.type === "VECTOR"
      ) {
        if (nodo.fills !== figma.mixed) {
          const color = element.paints[0];
          const relleno = nodo.fills[0];
          const stroke = nodo.strokes[0];
          const [group, name] = element.name.split("/");
          const [page, ids] = figma.currentPage.name.split(" - ");
          if (relleno != undefined) {
            if ("color" in color) {
              const colorStyle = color.color;
              if ("color" in relleno) {
                const colorRelleno = relleno.color;

                if (group == page) {
                  if (
                    compareColors(colorStyle, colorRelleno) &&
                    color.visible == relleno.visible
                  ) {
                    nodo.setFillStyleIdAsync(element.id);
                  }
                }
              }
              if (stroke != undefined) {
                if ("color" in stroke) {
                  const colorStroke = stroke.color;
                  if (group == page) {
                    if (
                      compareColors(colorStyle, colorStroke) &&
                      color.visible == relleno.visible
                    ) {
                      nodo.setStrokeStyleIdAsync(element.id);
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
