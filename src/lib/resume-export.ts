import { parseResumeMarkdown, resumeFileName } from "./resume-markdown";

function download(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

export async function downloadPdf(markdown: string) {
  const { jsPDF } = await import("jspdf");
  const doc = new jsPDF({ unit: "pt", format: "a4" });
  const margin = 56;
  const width = doc.internal.pageSize.getWidth() - margin * 2;
  const bottom = doc.internal.pageSize.getHeight() - margin;
  let y = margin;

  const write = (text: string, size: number, style: "normal" | "bold", gap: number, indent = 0) => {
    doc.setFont("helvetica", style);
    doc.setFontSize(size);
    const lines = doc.splitTextToSize(text, width - indent) as string[];
    for (const line of lines) {
      if (y > bottom) {
        doc.addPage();
        y = margin;
      }
      doc.text(line, margin + indent, y);
      y += size * 1.35;
    }
    y += gap;
  };

  for (const block of parseResumeMarkdown(markdown)) {
    switch (block.type) {
      case "name":
        write(block.text, 20, "bold", 4);
        break;
      case "section":
        y += 6;
        write(block.text.toUpperCase(), 12, "bold", 4);
        break;
      case "subsection":
        write(block.text, 11, "bold", 2);
        break;
      case "bullet":
        write(`• ${block.text}`, 10.5, "normal", 1, 10);
        break;
      default:
        write(block.text, 10.5, "normal", 2);
    }
  }

  doc.save(resumeFileName(markdown, "pdf"));
}

export async function downloadDocx(markdown: string) {
  const { Document, Packer, Paragraph, TextRun, HeadingLevel } = await import("docx");

  const children = parseResumeMarkdown(markdown).map((block) => {
    switch (block.type) {
      case "name":
        return new Paragraph({
          heading: HeadingLevel.HEADING_1,
          children: [new TextRun({ text: block.text, bold: true, size: 40 })],
        });
      case "section":
        return new Paragraph({
          heading: HeadingLevel.HEADING_2,
          spacing: { before: 240, after: 80 },
          children: [new TextRun({ text: block.text.toUpperCase(), bold: true, size: 24 })],
        });
      case "subsection":
        return new Paragraph({
          spacing: { before: 120, after: 40 },
          children: [new TextRun({ text: block.text, bold: true, size: 22 })],
        });
      case "bullet":
        return new Paragraph({
          bullet: { level: 0 },
          children: [new TextRun({ text: block.text, size: 21 })],
        });
      default:
        return new Paragraph({
          spacing: { after: 60 },
          children: [new TextRun({ text: block.text, size: 21 })],
        });
    }
  });

  const doc = new Document({
    styles: { default: { document: { run: { font: "Calibri" } } } },
    sections: [{ children }],
  });
  const blob = await Packer.toBlob(doc);
  download(blob, resumeFileName(markdown, "docx"));
}
