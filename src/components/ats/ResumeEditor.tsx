import { useState } from "react";
import { Download, Eye, FileText, Pencil, RotateCcw, RefreshCw } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ResumePreview } from "./ResumePreview";
import { ScoreGauge } from "./ScoreGauge";
import { downloadDocx, downloadPdf } from "@/lib/resume-export";

export function ResumeEditor({
  markdown,
  onChange,
  onRestore,
  canRestore,
  changes,
  scoreBefore,
  scoreAfter,
  onReanalyze,
  reanalyzing,
}: {
  markdown: string;
  onChange: (value: string) => void;
  onRestore: () => void;
  canRestore: boolean;
  changes: string[];
  scoreBefore: number;
  scoreAfter?: number;
  onReanalyze: () => void;
  reanalyzing: boolean;
}) {
  const [exporting, setExporting] = useState<"pdf" | "docx" | null>(null);

  const handleDownload = async (kind: "pdf" | "docx") => {
    setExporting(kind);
    try {
      if (kind === "pdf") await downloadPdf(markdown);
      else await downloadDocx(markdown);
    } catch {
      toast.error("Não foi possível gerar o arquivo. Tente novamente.");
    } finally {
      setExporting(null);
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="flex flex-col gap-6 pt-6 md:flex-row md:items-center">
          <div className="flex items-center justify-center gap-8">
            <div className="text-center">
              <ScoreGauge score={scoreBefore} label="Antes" size="sm" />
            </div>
            <div className="text-center">
              {scoreAfter === undefined ? (
                <div className="flex h-[104px] w-[104px] items-center justify-center rounded-full border border-dashed border-border text-xs text-muted-foreground">
                  Depois
                </div>
              ) : (
                <ScoreGauge score={scoreAfter} label="Depois" size="sm" />
              )}
            </div>
          </div>
          <div className="flex-1 space-y-3">
            <div>
              <h2 className="text-lg font-semibold">Currículo otimizado</h2>
              <p className="text-sm text-muted-foreground">
                Gerado apenas com informações do seu currículo original. Nada foi inventado.
              </p>
            </div>
            {changes.length > 0 && (
              <ul className="space-y-1 text-sm text-muted-foreground">
                {changes.slice(0, 6).map((c, i) => (
                  <li key={i} className="flex gap-2">
                    <span className="text-primary">•</span>
                    <span>{c}</span>
                  </li>
                ))}
              </ul>
            )}
            <div className="flex flex-wrap gap-2">
              <Button variant="outline" onClick={onReanalyze} disabled={reanalyzing}>
                <RefreshCw className="h-4 w-4" />
                {reanalyzing ? "Reanalisando..." : "Reanalisar compatibilidade"}
              </Button>
              <Button onClick={() => handleDownload("pdf")} disabled={exporting !== null}>
                <Download className="h-4 w-4" />
                {exporting === "pdf" ? "Gerando..." : "Baixar PDF"}
              </Button>
              <Button
                variant="secondary"
                onClick={() => handleDownload("docx")}
                disabled={exporting !== null}
              >
                <FileText className="h-4 w-4" />
                {exporting === "docx" ? "Gerando..." : "Baixar DOCX"}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="preview">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <TabsList>
            <TabsTrigger value="preview">
              <Eye className="mr-2 h-4 w-4" />
              Visualizar
            </TabsTrigger>
            <TabsTrigger value="edit">
              <Pencil className="mr-2 h-4 w-4" />
              Editar
            </TabsTrigger>
          </TabsList>
          <Button variant="ghost" size="sm" onClick={onRestore} disabled={!canRestore}>
            <RotateCcw className="h-4 w-4" />
            Restaurar versão gerada
          </Button>
        </div>

        <TabsContent value="preview" className="mt-4">
          <ResumePreview markdown={markdown} />
        </TabsContent>
        <TabsContent value="edit" className="mt-4 space-y-2">
          <p className="text-xs text-muted-foreground">
            Use <code>#</code> para o nome, <code>##</code> para seções, <code>###</code> para
            cargos e <code>-</code> para tópicos. Edite livremente para adicionar, remover ou
            reorganizar informações.
          </p>
          <Textarea
            value={markdown}
            onChange={(e) => onChange(e.target.value)}
            className="min-h-[560px] font-mono text-sm"
            spellCheck={false}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}
