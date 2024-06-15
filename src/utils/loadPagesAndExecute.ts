import { loadPage } from "./loadPage";

// la función LoadPagesAndExecute, lee todas las páginas del root de Figma y ejecuta la función
export async function loadPagesAndExecute(
  execute: (afunction: PageNode) => void
) {
  const pages = figma.root.children.forEach(async (page) => {
    const currentPage = await loadPage(page.name);
    if (currentPage) {
      await execute(currentPage);
    }
  });
}
