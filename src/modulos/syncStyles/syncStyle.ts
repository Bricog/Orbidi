import { syncColor } from "./element/syncColor";
import { syncFonts } from "./element/syncFonts";

export async function syncStyle() {
  syncFonts();
  syncColor();
}
