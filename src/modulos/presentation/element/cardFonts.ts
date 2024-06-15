import { getStyleName } from "../../../utils/getStyleName";
import { loadPage } from "../../../utils/loadPage";
import { createFrame } from "../scripts/createFrame";
import { createText } from "../scripts/createText";

export async function cardFonts() {
  fontGenerate("PRESENTACIÓN", "TEXTOSPROPUESTA1", "PROPUESTA 1");
  fontGenerate("PRESENTACIÓN", "TEXTOSPROPUESTA2", "PROPUESTA 2");
}

async function fontGenerate(page: string, search: string, category: string) {
  const currentPage = await loadPage(page);
  const styles = await figma.getLocalTextStylesAsync();
  const fontPropuesta = currentPage?.findAll((n) => n.name == search);

  styles.forEach(async (style) => {
    const { group, name } = getStyleName(style.name);

    if (group == category) {
      if (name === "Hero" || name == "Texto") {
        fontPropuesta?.forEach(async (fontFrame) => {
          if (fontFrame?.type === "FRAME") {
            fontFrame.children.forEach((child) => child.remove());
            const fontCard = await createCard(name, style.fontName);
            fontFrame.appendChild(fontCard);
          }
        });
      }
    }
  });
}

async function createCard(name: string, fontName: FontName) {
  const card = createFrame();
  card.name = name;

  if (name == "Hero") {
    const category = await createText({
      text: "Primario",
      size: 24,
      style: "Regular",
    });
    card.appendChild(category);
  } else {
    const category = await createText({
      text: "Secundario",
      size: 24,
      style: "Regular",
    });
    card.appendChild(category);
  }

  const textAa = await createText({
    text: "Aa",
    size: 160,
    fontName: fontName,
  });
  textAa.resize(textAa.width, 160);
  card.appendChild(textAa);

  const typo = await createText({
    text: fontName.family,
    size: 36,
    fontName: fontName,
  });
  card.appendChild(typo);

  return card;
}
