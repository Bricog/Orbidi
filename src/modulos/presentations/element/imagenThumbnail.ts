import { loadPage } from "../../../utils/loadPage";

type imagenElementParams = {
  inputPage: string;
  outputPage: string;
  nodeNameToExport: string;
  nodeNameToPlace: string;
};

export async function imagenThumbnail() {
  await imagenElement({
    inputPage: "PROPUESTA 1",
    outputPage: "PRESENTACIÓN",
    nodeNameToExport: "Vista",
    nodeNameToPlace: "IMAGENPROPUESTA1",
  });
  await imagenElement({
    inputPage: "PROPUESTA 2",
    outputPage: "PRESENTACIÓN",
    nodeNameToExport: "Vista",
    nodeNameToPlace: "IMAGENPROPUESTA2",
  });
}

async function imagenElement({
  inputPage,
  outputPage,
  nodeNameToPlace,
  nodeNameToExport,
}: imagenElementParams) {
  const presentationOnePage = await loadPage(inputPage);
  const presentationOneOut = await loadPage(outputPage);

  const nodeToExport = presentationOnePage?.findOne(
    (node) => node.name === nodeNameToExport
  );

  const placesPresentationOne = presentationOneOut?.findAll(
    (n) => n.name === nodeNameToPlace
  );

  const exportNodeAndPlaceInFrame = async (node: SceneNode) => {
    if (node) {
      const exportOptions: ExportSettingsImage = { format: "PNG" };
      const imageBytes = await node.exportAsync(exportOptions);

      const image = figma.createImage(imageBytes);

      placesPresentationOne?.forEach((placePresentationOne) => {
        if (placePresentationOne?.type === "FRAME") {
          placePresentationOne.fills = [
            { type: "IMAGE", imageHash: image.hash, scaleMode: "FILL" },
          ];
        }
      });
    }
  };

  if (nodeToExport) {
    exportNodeAndPlaceInFrame(nodeToExport);
  }
}
