import pdfParse from "pdf-parse"

export async function extractPdfText(filePath) {
  const dataBuffer = fs.readFileSync(filePath);
  const pdfData = await pdfParse(dataBuffer);
  return pdfData.text;
}



