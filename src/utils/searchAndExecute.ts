export function searchAndExecute(
  currentPage: PageNode ,
  search: string,
  execute: (sceneNode: SceneNode) => void, 
) {
  const elements = currentPage.findAll((n) => {
    return n.name === search;
  });
  elements.forEach((element) => execute(element));
}
