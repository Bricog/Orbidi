import { loadPage } from "./loadPage";

export async function loadPageSearchAndExecute(
  search: string,
  execute: (sceneNode: SceneNode) => void
) {
  const pages = figma.root.children.forEach(async (page) => {
    const currentPage = await loadPage(page.name);
    if (currentPage) {
      const elements = currentPage.findAll((n) => {
        return n.name === search;
      });
      elements.forEach((element) => execute(element));
    }
  });
}
