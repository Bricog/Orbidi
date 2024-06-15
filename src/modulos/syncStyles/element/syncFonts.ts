import { loadPage } from "../../../utils/loadPage";

export async function syncFonts() {
  const pages = figma.root.children;
  for (const page of pages) {
    const pageCurrent = await loadPage(page.name);

    const all = pageCurrent?.findAll();
    const estilos = await figma.getLocalTextStylesAsync();

    if (all && estilos) {
      for (let i = 0; i < all.length; i++) {
        const nodo = all[i];
        if (nodo.type === "TEXT" && nodo.fontName) {
          for (let j = 0; j < estilos.length; j++) {
            const style = estilos[j];
            if (
              (nodo.fontName as FontName).family ===
                (style.fontName as FontName).family &&
              (nodo.fontName as FontName).style ===
                (style.fontName as FontName).style &&
              nodo.fontSize === style.fontSize &&
              style.textDecoration === nodo.textDecoration
            ) {
              const [group] = style.name.split("/");
              if (pageCurrent) {
                const [page] = pageCurrent.name.split(" - ");

                if (group == page) {
                  try {
                    await nodo.setTextStyleIdAsync(style.id);
                  } catch (error) {
                    `Failed to set font style for node ${nodo.id}: ${nodo.name}`;
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
