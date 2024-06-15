// La función LoadPage busca una página de Figma y la "carga"
export async function loadPage(search: string) {
    
  // Busca la página que incluya el nombre del argumento
  const currentPage = figma.root.children.find((page) =>
    page.name.includes(search)
  );

  // Si la búsqueda es exitosa carga la página, en caso contrario nos devuelve "Undefined"
  await currentPage?.loadAsync();
  return currentPage;
}
