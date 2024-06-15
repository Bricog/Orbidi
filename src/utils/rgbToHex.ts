export function rgbToHex(rgb: RGB): string {
  const { r, g, b } = rgb;

  const scaleTo255 = (value: number): number => Math.round(value * 255);

  const toHex = (value: number): string => {
    const hex = value.toString(16);
    return hex.length === 1 ? "0" + hex : hex;
  };

  const red = scaleTo255(r);
  const green = scaleTo255(g);
  const blue = scaleTo255(b);

  return `#${toHex(red)}${toHex(green)}${toHex(blue)}`;
}
