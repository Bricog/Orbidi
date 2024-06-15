interface createTextProps {
  text: string ;
  size: number;
  family?: string;
  style?: "Bold" | "Regular";
  fontName?: FontName;
}

export async function createText({
  text,
  size,
  family = "Sen",
  style = "Bold",
  fontName,
}: createTextProps) {
  const texto = figma.createText();
  if (fontName) {
    await figma.loadFontAsync(fontName);
    texto.fontName = fontName;
  } else {
    await figma.loadFontAsync({
      family: family,
      style: style,
    });
    texto.fontName = { family: family, style: style };
  }
  texto.characters = text;
  texto.fontSize = size;
  return texto;
}
