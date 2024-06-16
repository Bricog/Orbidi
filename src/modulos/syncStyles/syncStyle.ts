import { syncColor } from "./element/syncColor";
import { syncComponentStyle } from "./element/syncComponetStyle";
import { syncFonts } from "./element/syncFonts";

export async function syncStyle() {
  syncFonts();
  syncColor();
  syncComponentStyle();
}
