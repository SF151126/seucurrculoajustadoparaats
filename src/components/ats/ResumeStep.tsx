import { useRef, useState } from "react";
import { FileUp, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { ExtractionError, extractTextFromFile } from "@/lib/document-extract";

export function ResumeStep({
  resumeText,
  onChange,
  onBack,
  onAnalyze,
  analyzing,
  statusMessage,
}: {
  resumeText: string;
  onChange: (value: string) => void;
  onBack: () => void;
  onAnalyze: () => void;
  analyzing: boolean;
  statusMessage: string | null;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [extracting, setExtracting] = useState(false);

  const handleFile = async (file?: File | null) => {
    if (!file) return;
    setExtracting(true);
    try {
      const text = await extractTextFromFile(file);
      onChange(text);
      toast.success("Texto extraído. Revise antes de analisar.");
    } catch (error) {
      toast.error(
        error instanceof ExtractionError
          ? error.message
          : "Não foi possível ler o arquivo. Cole o texto do currículo.",
      );
    } finally {
      setExtracting(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  };

  const valid = resumeText.trim().length >= 200;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Etapa 2 — Seu currículo</CardTitle>
        <CardDescription>
          Envie um PDF ou DOCX (até 10 MB) ou cole o texto. Você pode revisar e editar antes de
          analisar.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-5">
        <div
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => {
            e.preventDefault();
            void handleFile(e.dataTransfer.files?.[0]);
          }}
          className="flex flex-col items-center justify-center gap-3 rounded-xl border border-dashed border-border bg-muted/40 p-8 text-center"
        >
          {extracting ? (
            <>
              <Loader2 className="h-6 w-6 animate-spin text-primary" />
              <p className="text-sm text-muted-foreground">Extraindo seu currículo...</p>
            </>
          ) : (
            <>
              <FileUp className="h-6 w-6 text-primary" />
              <p className="text-sm text-muted-foreground">
                Arraste seu arquivo aqui ou selecione no computador
              </p>
              <Button variant="outline" onClick={() => inputRef.current?.click()}>
                Escolher arquivo (PDF ou DOCX)
              </Button>
            </>
          )}
          <input
            ref={inputRef}
            type="file"
            accept=".pdf,.docx,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
            className="hidden"
            onChange={(e) => void handleFile(e.target.files?.[0])}
          />
        </div>

        <div className="space-y-2">
          <Textarea
            value={resumeText}
            onChange={(e) => onChange(e.target.value)}
            placeholder="Ou cole aqui o texto do seu currículo: contato, resumo, experiências, formação, competências..."
            className="min-h-72"
          />
          <p className="text-xs text-muted-foreground">
            {resumeText.trim().length} caracteres · mínimo de 200 para analisar.
          </p>
        </div>

        {statusMessage && (
          <div className="flex items-center gap-2 rounded-lg bg-secondary p-3 text-sm text-secondary-foreground">
            <Loader2 className="h-4 w-4 animate-spin" />
            {statusMessage}
          </div>
        )}

        <div className="flex flex-wrap justify-between gap-3">
          <Button variant="ghost" onClick={onBack}>
            Voltar
          </Button>
          <Button onClick={onAnalyze} disabled={!valid || analyzing} size="lg">
            {analyzing ? "Analisando..." : "Analisar compatibilidade"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
