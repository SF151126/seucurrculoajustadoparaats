export type ResumeBlock =
  | { type: "name"; text: string }
  | { type: "section"; text: string }
  | { type: "subsection"; text: string }
  | { type: "bullet"; text: string }
  | { type: "text"; text: string };

const clean = (line: string) => line.replace(/\*\*/g, "").replace(/\*/g, "").trim();

export function parseResumeMarkdown(markdown: string): ResumeBlock[] {
  return markdown
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean)
    .map<ResumeBlock>((line) => {
      if (line.startsWith("### ")) return { type: "subsection", text: clean(line.slice(4)) };
      if (line.startsWith("## ")) return { type: "section", text: clean(line.slice(3)) };
      if (line.startsWith("# ")) return { type: "name", text: clean(line.slice(2)) };
      if (/^[-*•]\s+/.test(line)) return { type: "bullet", text: clean(line.replace(/^[-*•]\s+/, "")) };
      return { type: "text", text: clean(line) };
    });
}

export function resumeFileName(markdown: string, ext: string) {
  const name = parseResumeMarkdown(markdown).find((b) => b.type === "name")?.text ?? "curriculo";
  const slug = name
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-zA-Z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .toLowerCase();
  return `curriculo-${slug || "otimizado"}.${ext}`;
}
