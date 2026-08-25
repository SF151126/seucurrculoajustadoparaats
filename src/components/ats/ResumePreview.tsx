import { parseResumeMarkdown } from "@/lib/resume-markdown";

export function ResumePreview({ markdown }: { markdown: string }) {
  const blocks = parseResumeMarkdown(markdown);

  return (
    <article className="mx-auto w-full max-w-3xl rounded-lg border border-border bg-card p-6 text-card-foreground shadow-soft sm:p-10">
      {blocks.map((block, index) => {
        switch (block.type) {
          case "name":
            return (
              <h2 key={index} className="text-2xl font-bold sm:text-3xl">
                {block.text}
              </h2>
            );
          case "section":
            return (
              <h3
                key={index}
                className="mt-7 border-b border-border pb-1 text-sm font-bold uppercase tracking-widest text-primary"
              >
                {block.text}
              </h3>
            );
          case "subsection":
            return (
              <h4 key={index} className="mt-4 text-base font-semibold">
                {block.text}
              </h4>
            );
          case "bullet":
            return (
              <p key={index} className="mt-1 flex gap-2 text-sm leading-relaxed">
                <span className="text-muted-foreground">•</span>
                <span>{block.text}</span>
              </p>
            );
          default:
            return (
              <p key={index} className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {block.text}
              </p>
            );
        }
      })}
    </article>
  );
}
