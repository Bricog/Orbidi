import { cardColors } from "./elements/cardColor";
import { cardFonts } from "./elements/cardFonts";
import { imagenThumbnail } from "./elements/imagenThumbnail";
import { textClient } from "./elements/textClient";
import { textPropuestas } from "./elements/textPropuestas";

export async function presentation() {
  cardColors();
  cardFonts();
  imagenThumbnail();
  textClient();
  textPropuestas();
}
