import { loadPage } from "../../../utils/loadPage";
import { createText } from "../scripts/createText";

export async function textPropuestas() {
  introducirTexto("PRESENTACIÓN", "NOMBREPROPUESTA1", "PROPUESTA 1");
  introducirTexto("PRESENTACIÓN", "NOMBREPROPUESTA2", "PROPUESTA 2");
}

export async function introducirTexto(
  page: string,
  search: string,
  category: string
) {
  const currentPage = await loadPage(page);

  const propuestas = currentPage?.findAll((n) => {
    return n.name === search;
  });

  const rootsPage = figma.root.children;

  propuestas?.forEach((propuesta) => {
    rootsPage.forEach(async (root) => {
      if (propuesta?.type === "FRAME") {
        propuesta.children.forEach((child) => child.remove());

        const [group, name] = root.name.split(" - ");

        if (group === category) {
          const propuestaName = await createText({
            text: name.toUpperCase(),
            size: 32,
          });
          propuesta.appendChild(propuestaName);
        }
      }
    });
  });
}
