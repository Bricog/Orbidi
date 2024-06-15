import { createPalette } from "./element/createPalette";
import { createTipography } from "./element/createTipography";

export async function createLocalStyles() {
  await createPalette("COLORES");
  await createTipography("TIPOGRAFIAS");
}
