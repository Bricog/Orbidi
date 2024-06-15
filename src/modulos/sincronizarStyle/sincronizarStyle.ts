import { syncColor } from "./element/syncColor";
import { syncFonts } from "./element/syncFonts";

export async function sincronizarElementos() {
  syncFonts();
  syncColor();
}
