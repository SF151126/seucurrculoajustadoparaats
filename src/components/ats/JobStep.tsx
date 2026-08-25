import { Link2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export function JobStep({
  title,
  description,
  url,
  showUrl,
  onChange,
  onToggleUrl,
  onNext,
}: {
  title: string;
  description: string;
  url: string;
  showUrl: boolean;
  onChange: (patch: { title?: string; description?: string; url?: string }) => void;
  onToggleUrl: () => void;
  onNext: () => void;
}) {
  const valid = title.trim().length >= 2 && description.trim().length >= 120;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Etapa 1 — A vaga</CardTitle>
        <CardDescription>
          Cole a descrição completa da vaga. Quanto mais detalhada, melhor a análise.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-5">
        <div className="space-y-2">
          <Label htmlFor="job-title">Título da vaga</Label>
          <Input
            id="job-title"
            value={title}
            placeholder="Desenvolvedor C# Júnior"
            onChange={(e) => onChange({ title: e.target.value })}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="job-description">Descrição da vaga</Label>
          <Textarea
            id="job-description"
            value={description}
            placeholder="Cole aqui o texto completo do anúncio da vaga: responsabilidades, requisitos, diferenciais..."
            className="min-h-56"
            onChange={(e) => onChange({ description: e.target.value })}
          />
          <p className="text-xs text-muted-foreground">
            {description.trim().length} caracteres · mínimo de 120 para analisar.
          </p>
        </div>

        <div className="space-y-2">
          <Button type="button" variant="ghost" size="sm" onClick={onToggleUrl}>
            <Link2 className="h-4 w-4" />
            Tenho o link da vaga
          </Button>
          {showUrl && (
            <div className="space-y-2 rounded-lg border border-dashed border-border p-3">
              <Input
                value={url}
                placeholder="https://..."
                onChange={(e) => onChange({ url: e.target.value })}
              />
              <p className="text-xs text-muted-foreground">
                Ainda não conseguimos extrair o conteúdo de links com segurança. Guardamos o link
                como referência — por favor, cole também o texto da vaga acima.
              </p>
            </div>
          )}
        </div>

        <div className="flex justify-end">
          <Button onClick={onNext} disabled={!valid} size="lg">
            Continuar
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
