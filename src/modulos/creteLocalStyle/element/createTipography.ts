import { loadPage } from "../../../utils/loadPage";

export async function createTipography(search: string) {
  const pages = figma.root.children;
  for (const page of pages) {
    const pageCurrent = await loadPage(page.name);
    const namePage = pageCurrent?.name.split(" - ")[0];
    const cuadroTexto = pageCurrent?.findOne((n) => {
      return n.name === search;
    });

    const currentText = await figma.getLocalTextStylesAsync();
    const currentTextMap: { [key: string]: TextStyle } = {};
    currentText.forEach((style) => {
      currentTextMap[style.name] = style;
    });

    if (cuadroTexto?.type === "FRAME") {
      const tipografias = cuadroTexto.children;

      for (const tipografia of tipografias) {
        if (tipografia?.type === "TEXT") {
          await figma.loadFontAsync(tipografia.fontName as FontName);

          const name = `${namePage}/${tipografia.characters}`;

          const tipografiaStyle = currentTextMap[name]
            ? currentTextMap[name]
            : figma.createTextStyle();

          tipografiaStyle.fontName = tipografia.fontName as FontName;
          tipografiaStyle.name = name;
          tipografiaStyle.fontSize = tipografia.fontSize as number;
          tipografiaStyle.letterSpacing =
            tipografia.letterSpacing as LetterSpacing;
          tipografiaStyle.lineHeight = tipografia.lineHeight as LineHeight;
          tipografiaStyle.paragraphIndent = tipografia.paragraphIndent;
          tipografiaStyle.paragraphSpacing = tipografia.paragraphSpacing;
          tipografiaStyle.textCase = tipografia.textCase as TextCase;
          tipografiaStyle.textDecoration =
            tipografia.textDecoration as TextDecoration;
          tipografia.setTextStyleIdAsync(tipografiaStyle.id);
        }
      }
    }
  }
}
