import { getStyleName } from "../../../utils/getStyleName";
import { loadPage } from "../../../utils/loadPage";
import { rgbToHex } from "../../../utils/rgbToHex";
import { createFrame } from "../scripts/createFrame";
import { createText } from "../scripts/createText";

export async function cardColors() {
  colorGenerate("PRESENTACIÓN", "COLORPROPUESTA1", "PROPUESTA 1");
  colorGenerate("PRESENTACIÓN", "COLORPROPUESTA2", "PROPUESTA 2");
}

async function colorGenerate(page: string, search: string, category: string) {
  const currentPage = await loadPage(page);
  const styles = await figma.getLocalPaintStylesAsync();
  const colorPropuesta = currentPage?.findAll((n) => n.name == search);

  styles.forEach(async (style) => {
    const { group, name } = getStyleName(style.name);

    if (group == category) {
      if (name === "Primario" || name == "Secundario" || name == "Énfasis") {
        colorPropuesta?.forEach(async (colorFrame) => {
          if (colorFrame?.type === "FRAME") {
            colorFrame.children.forEach((child) => child.remove());
            const colorCard = await createCard(style);
            colorFrame.appendChild(colorCard);
          }
        });
      }
    }
  });

  async function createCard(style: PaintStyle) {
    const card = createFrame();
    const color = style.paints[0];

    if ("color" in color) {
      const colorHex = rgbToHex(color.color);

      const circulo = figma.createEllipse();
      circulo.x = 0;
      circulo.y = 0;
      circulo.resize(140, 140);
      circulo.fills = [color];
      circulo.arcData = {
        startingAngle: 0,
        endingAngle: 2 * Math.PI,
        innerRadius: 0,
      };

      const hexText = await createText({
        text: colorHex,
        size: 24,
        style: "Regular",
      });

      card.appendChild(circulo);
      card.appendChild(hexText);
    }
    return card;
  }
}
