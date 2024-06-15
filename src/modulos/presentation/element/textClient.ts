import { loadPage } from "../../../utils/loadPage";
import { createText } from "../scripts/createText";

export async function textClient() {
  const currentPage = await loadPage("PRESENTACIÓN");

  const clienteFrames = currentPage?.findAll((n) => {
    return n.name === "CLIENTE";
  });

  clienteFrames?.forEach(async (cliente) => {
    if (cliente.type === "FRAME") {
      cliente.children.forEach((child) => child.remove());
      const clienteName = await createText({
        text: `/ ${figma.root.name.toUpperCase()}`,
        size: 32,
      });
      cliente.appendChild(clienteName);
    }
  });
}
