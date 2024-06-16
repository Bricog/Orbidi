import { loadPage } from "../../../utils/loadPage";

export async function syncComponentStyle() {
  const pages = figma.root.children;
  for (const page of pages) {
    const pageCurrent = await loadPage(page.name);
    if (pageCurrent) {
      const components = pageCurrent.findAll((n) => n.type === "COMPONENT");
      components.forEach(async (component) => {
        if (component.type === "COMPONENT") {
          const instances = await component.getInstancesAsync();
          instances.forEach((instance) => {
            const children = component.findAll((n) => n.type === "TEXT");
            children.forEach((child) => {
              const childInstance = instance.findOne(
                (n) => n.name === child.name
              );
              if (childInstance?.type === "TEXT" && child.type === "TEXT") {
                if (typeof child.fillStyleId === "string") {
                  console.log("Fill update", child.fillStyleId);
                  childInstance.setFillStyleIdAsync(child.fillStyleId);
                }
                if (typeof child.textStyleId === "string") {
                  console.log("Text update", child.textStyleId);
                  childInstance.setTextStyleIdAsync(child.textStyleId);
                }
              }
            });
          });
        }
      });
    }
  }
}
