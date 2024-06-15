import { cardColors } from "./element/cardColor";
import { cardFonts } from "./element/cardFonts";
import { imagenThumbnail } from "./element/imagenThumbnail";
import { textClient } from "./element/textClient";
import { textPropuestas } from "./element/textPropuestas";

export async function presentation() {
  cardColors();
  cardFonts();
  imagenThumbnail();
  textClient();
  textPropuestas();
}
