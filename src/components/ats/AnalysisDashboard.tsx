import { AlertTriangle, CheckCircle2, CircleDashed, Lightbulb, Sparkles } from "lucide-react";
import type { AnalysisResult, RequirementStatus } from "@/lib/resume-types";
import { ScoreGauge } from "./ScoreGauge";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const groups: {
  status: RequirementStatus;
  title: string;
  icon: typeof CheckCircle2;
  className: string;
}[] = [
  {
    status: "atendido",
    title: "Requisitos atendidos",
    icon: CheckCircle2,
    className: "text-success",
  },
  {
    status: "parcial",
    title: "Parcialmente atendidos",
    icon: AlertTriangle,
    className: "text-warning",
  },
  {
    status: "ausente",
    title: "Não identificados",
    icon: CircleDashed,
    className: "text-danger",
  },
];

export function AnalysisDashboard({
  analysis,
  onOptimize,
  optimizing,
}: {
  analysis: AnalysisResult;
  onOptimize: () => void;
  optimizing: boolean;
}) {
  const found = analysis.palavrasChave?.filter((k) => k.presente) ?? [];
  const missing = analysis.palavrasChave?.filter((k) => !k.presente) ?? [];

  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="flex flex-col items-center gap-6 pt-6 sm:flex-row sm:items-center sm:pt-6">
          <ScoreGauge score={analysis.score} />
          <div className="flex-1 space-y-3 text-center sm:text-left">
            <div>
              <h2 className="text-xl font-semibold">Compatibilidade com a vaga</h2>
              {(analysis.vaga?.jobTitle || analysis.vaga?.seniority) && (
                <p className="text-sm text-muted-foreground">
                  {[analysis.vaga?.jobTitle, analysis.vaga?.company, analysis.vaga?.seniority]
                    .filter(Boolean)
                    .join(" · ")}
                </p>
              )}
            </div>
            <p className="text-sm leading-relaxed text-muted-foreground">{analysis.resumoScore}</p>
            <p className="text-xs text-muted-foreground">
              Estimativa de aderência ao perfil da vaga. Não é uma previsão de aprovação em um ATS
              real nem garantia de contratação.
            </p>
            <Button onClick={onOptimize} disabled={optimizing} size="lg">
              <Sparkles className="h-4 w-4" />
              {optimizing ? "Gerando currículo..." : "Gerar currículo otimizado"}
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-4 md:grid-cols-3">
        {groups.map(({ status, title, icon: Icon, className }) => {
          const items = analysis.requisitos?.filter((r) => r.status === status) ?? [];
          return (
            <Card key={status}>
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-base">
                  <Icon className={`h-5 w-5 ${className}`} />
                  {title}
                  <span className="ml-auto text-sm font-normal text-muted-foreground">
                    {items.length}
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {items.length === 0 && (
                  <p className="text-sm text-muted-foreground">Nada nesta categoria.</p>
                )}
                {items.map((item) => (
                  <div key={item.requisito} className="rounded-lg bg-muted/60 p-3">
                    <p className="text-sm font-medium">{item.requisito}</p>
                    {(item.evidencia || item.observacao) && (
                      <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                        {status === "atendido" ? item.evidencia : item.observacao || item.evidencia}
                      </p>
                    )}
                  </div>
                ))}
              </CardContent>
            </Card>
          );
        })}
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Palavras-chave da vaga</CardTitle>
        </CardHeader>
        <CardContent className="space-y-5">
          <div>
            <p className="mb-2 text-sm font-medium text-success">Encontradas no currículo</p>
            <div className="flex flex-wrap gap-2">
              {found.length === 0 && (
                <span className="text-sm text-muted-foreground">Nenhuma identificada.</span>
              )}
              {found.map((k) => (
                <Badge key={k.termo} variant="secondary">
                  {k.termo}
                </Badge>
              ))}
            </div>
          </div>
          <div>
            <p className="mb-2 text-sm font-medium text-danger">Ausentes ou pouco evidenciadas</p>
            <div className="space-y-2">
              {missing.length === 0 && (
                <span className="text-sm text-muted-foreground">
                  Todas as palavras-chave relevantes aparecem no currículo.
                </span>
              )}
              {missing.map((k) => (
                <div key={k.termo} className="rounded-lg border border-border p-3">
                  <p className="text-sm font-medium">{k.termo}</p>
                  {k.comentario && (
                    <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                      {k.comentario}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <AlertTriangle className="h-5 w-5 text-warning" />O que pode ser melhorado
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {(analysis.problemas ?? []).map((issue, i) => (
              <div key={i} className="rounded-lg bg-muted/60 p-3">
                <p className="text-sm font-semibold">{issue.problema}</p>
                <p className="mt-1 text-xs text-muted-foreground">
                  <span className="font-medium text-foreground">Por que importa: </span>
                  {issue.porQueImporta}
                </p>
                <p className="mt-1 text-xs text-muted-foreground">
                  <span className="font-medium text-foreground">Como melhorar: </span>
                  {issue.comoMelhorar}
                </p>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <Lightbulb className="h-5 w-5 text-primary" />
              Sugestões para seu currículo
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {(analysis.sugestoes ?? []).map((s, i) => (
              <div key={i} className="rounded-lg border border-border p-3">
                <p className="text-sm font-semibold">{s.secao}</p>
                {s.atual && (
                  <p className="mt-2 text-xs text-muted-foreground">
                    <span className="font-medium text-foreground">Atual: </span>
                    {s.atual}
                  </p>
                )}
                <p className="mt-1 text-xs text-muted-foreground">
                  <span className="font-medium text-foreground">Sugestão: </span>
                  {s.sugestao}
                </p>
                <p className="mt-1 text-xs text-muted-foreground">
                  <span className="font-medium text-foreground">Motivo: </span>
                  {s.motivo}
                </p>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
