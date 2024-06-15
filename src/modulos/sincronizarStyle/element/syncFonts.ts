export async function syncFonts() {
  const all = figma.currentPage.findAll();
  const estilos = await figma.getLocalTextStylesAsync();

  for (let i = 0; i < all.length; i++) {
    const nodo = all[i];
    if (nodo.type === "TEXT") {
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
          const [page] = figma.currentPage.name.split(" - ");

          if (group == page) {
            nodo.setTextStyleIdAsync(style.id);
          }
        }
      }
    }
  }
}
