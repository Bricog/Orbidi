export function search(currentPage: PageNode, search: string) {
  const elements = currentPage.findAll((n) => {
    return n.name === search;
  });
  
}
