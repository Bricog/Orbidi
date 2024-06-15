import { capitalizeFirstLetter } from "./scripts/capitalizeFirstLetter";
import { PDFDocument } from "pdf-lib";

export async function exportPDF() {
  const selectedFrames = figma.currentPage.selection;


  // Ordenar los frames seleccionados por nombre
  const sortedFrames = [...selectedFrames].sort((a, b) => {
    if (a.name < b.name) return -1;
    if (a.name > b.name) return 1;
    return 0;
  });

  // Exportar cada frame como PDF
  const pdfBytesArray = await Promise.all(
    sortedFrames.map(async (frame) => {
      return await frame.exportAsync({
        format: "PDF",
        contentsOnly: true,
      });
    })
  );

  // Crear un nuevo PDF vacío para concatenar todos los PDFs
  const mergedPdf = await PDFDocument.create();

  for (const pdfBytes of pdfBytesArray) {
    const pdf = await PDFDocument.load(pdfBytes);
    const pages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
    pages.forEach((page) => {
      mergedPdf.addPage(page);
    });
  }

  const [propuesta, name] = figma.currentPage.name.split(" - ");
  const mergedPdfBytes = await mergedPdf.save();
  figma.ui.postMessage({
    type: "exportedPDF",
    pdfBytes: mergedPdfBytes,
    name: `${figma.root.name} - ${capitalizeFirstLetter(
      propuesta.toLowerCase()
    )} - Estilo ${name.toLowerCase()}`,
  });
}
