export function createFrame() {
  const frame = figma.createFrame();
  frame.x = 0;
  frame.y = 0;
  frame.layoutMode = "VERTICAL";
  frame.primaryAxisAlignItems = "CENTER";
  frame.counterAxisAlignItems = "CENTER";
  frame.itemSpacing = 8;
  frame.paddingBottom = 8;
  frame.paddingLeft = 8;
  frame.paddingRight = 8;
  frame.paddingTop = 8;
  frame.layoutSizingVertical = "HUG";
  frame.layoutSizingHorizontal = "HUG";
  frame.fills = [];

  return frame;
}
