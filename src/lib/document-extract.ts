export const MAX_FILE_BYTES = 10 * 1024 * 1024;

export class ExtractionError extends Error {}

function assertFile(file: File) {
  if (file.size > MAX_FILE_BYTES) {
    throw new ExtractionError("Arquivo muito grande. O limite é 10 MB.");
  }
  if (file.size === 0) {
    throw new ExtractionError("O arquivo está vazio.");
  }
}

async function extractPdf(file: File): Promise<string> {
  const pdfjs = await import("pdfjs-dist");
  const workerSrc = (await import("pdfjs-dist/build/pdf.worker.min.mjs?url")).default;
  pdfjs.GlobalWorkerOptions.workerSrc = workerSrc;

  const buffer = await file.arrayBuffer();
  const doc = await pdfjs.getDocument({ data: buffer }).promise;
  const pages: string[] = [];
  for (let i = 1; i <= doc.numPages; i++) {
    const page = await doc.getPage(i);
    const content = await page.getTextContent();
    const text = content.items
      .map((item) => ("str" in item ? item.str : ""))
      .join(" ")
      .replace(/\s+\n/g, "\n");
    pages.push(text);
  }
  return pages.join("\n\n").replace(/[ \t]{2,}/g, " ").trim();
}

async function extractDocx(file: File): Promise<string> {
  const mammoth = (await import("mammoth/mammoth.browser")) as unknown as {
    extractRawText: (opts: { arrayBuffer: ArrayBuffer }) => Promise<{ value: string }>;
  };
  const arrayBuffer = await file.arrayBuffer();
  const result = await mammoth.extractRawText({ arrayBuffer });
  return result.value.trim();
}

export async function extractTextFromFile(file: File): Promise<string> {
  assertFile(file);
  const name = file.name.toLowerCase();
  let text = "";

  try {
    if (name.endsWith(".pdf") || file.type === "application/pdf") {
      text = await extractPdf(file);
    } else if (name.endsWith(".docx")) {
      text = await extractDocx(file);
    } else if (name.endsWith(".txt")) {
      text = (await file.text()).trim();
    } else {
      throw new ExtractionError("Formato não suportado. Envie um PDF ou DOCX.");
    }
  } catch (error) {
    if (error instanceof ExtractionError) throw error;
    throw new ExtractionError("Não foi possível ler o arquivo. Tente outro arquivo ou cole o texto.");
  }

  if (text.replace(/\s/g, "").length < 100) {
    throw new ExtractionError(
      "Não encontramos texto suficiente no arquivo (pode ser um PDF digitalizado). Cole o texto do currículo.",
    );
  }
  return text;
}
