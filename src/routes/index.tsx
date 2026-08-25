import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { ArrowRight, ShieldCheck, Sparkles } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Stepper } from "@/components/ats/Stepper";
import { JobStep } from "@/components/ats/JobStep";
import { ResumeStep } from "@/components/ats/ResumeStep";
import { AnalysisDashboard } from "@/components/ats/AnalysisDashboard";
import { ResumeEditor } from "@/components/ats/ResumeEditor";
import { analyzeResume, optimizeResume } from "@/lib/resume.functions";
import type { AnalysisResult } from "@/lib/resume-types";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Analisador de Currículo para ATS | Otimize para cada vaga" },
      {
        name: "description",
        content:
          "Compare seu currículo com a descrição da vaga, veja sua compatibilidade estimada, descubra requisitos ausentes e gere uma versão otimizada para ATS. Sem cadastro.",
      },
      { property: "og:title", content: "Analisador de Currículo para ATS" },
      {
        property: "og:description",
        content:
          "Análise de compatibilidade entre currículo e vaga, sugestões e currículo otimizado em PDF ou DOCX.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Home,
});

type Stage = "hero" | "job" | "resume" | "analysis" | "optimized";

const STORAGE_KEY = "ats-flow-state";

interface FlowState {
  jobTitle: string;
  jobDescription: string;
  jobUrl: string;
  resumeText: string;
}

const emptyState: FlowState = { jobTitle: "", jobDescription: "", jobUrl: "", resumeText: "" };

function Home() {
  const [stage, setStage] = useState<Stage>("hero");
  const [form, setForm] = useState<FlowState>(emptyState);
  const [showUrl, setShowUrl] = useState(false);
  const [analysis, setAnalysis] = useState<AnalysisResult | null>(null);
  const [status, setStatus] = useState<string | null>(null);
  const [busy, setBusy] = useState<"analyze" | "optimize" | "reanalyze" | null>(null);
  const [optimized, setOptimized] = useState<{ markdown: string; changes: string[] } | null>(null);
  const [draft, setDraft] = useState("");
  const [scoreAfter, setScoreAfter] = useState<number | undefined>(undefined);
  const flowRef = useRef<HTMLDivElement>(null);

  const analyze = useServerFn(analyzeResume);
  const optimize = useServerFn(optimizeResume);

  useEffect(() => {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    if (raw) {
      try {
        setForm({ ...emptyState, ...(JSON.parse(raw) as FlowState) });
      } catch {
        /* ignore */
      }
    }
  }, []);

  useEffect(() => {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(form));
  }, [form]);

  const goto = (next: Stage) => {
    setStage(next);
    requestAnimationFrame(() => flowRef.current?.scrollIntoView({ behavior: "smooth" }));
  };

  const runAnalysis = async (resumeText: string, mode: "analyze" | "reanalyze") => {
    setBusy(mode);
    setStatus("Analisando os requisitos da vaga...");
    const timer = setTimeout(
      () => setStatus("Comparando seu currículo com a vaga e gerando sugestões..."),
      3500,
    );
    try {
      const result = await analyze({
        data: {
          jobTitle: form.jobTitle,
          jobDescription: form.jobDescription,
          resumeText,
        },
      });
      if (mode === "analyze") {
        setAnalysis(result);
        goto("analysis");
      } else {
        setScoreAfter(result.score);
        toast.success("Nova compatibilidade estimada calculada.");
      }
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Falha na análise. Tente novamente.");
    } finally {
      clearTimeout(timer);
      setStatus(null);
      setBusy(null);
    }
  };

  const runOptimization = async () => {
    setBusy("optimize");
    setStatus("Preparando seu currículo otimizado...");
    try {
      const result = await optimize({
        data: {
          jobTitle: form.jobTitle,
          jobDescription: form.jobDescription,
          resumeText: form.resumeText,
        },
      });
      setOptimized({ markdown: result.markdown, changes: result.mudancas ?? [] });
      setDraft(result.markdown);
      setScoreAfter(undefined);
      goto("optimized");
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Falha ao gerar o currículo. Tente novamente.",
      );
    } finally {
      setStatus(null);
      setBusy(null);
    }
  };

  const stepIndex = { hero: 0, job: 0, resume: 1, analysis: 2, optimized: 3 }[stage];

  return (
    <main className="min-h-screen">
      <header className="border-b border-border">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
          <span className="flex items-center gap-2 font-semibold">
            <Sparkles className="h-5 w-5 text-primary" />
            CV Match
          </span>
          <Link
            to="/privacidade"
            className="text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            Privacidade
          </Link>
        </div>
      </header>

      <section className="hero-glow">
        <div className="mx-auto max-w-4xl px-4 py-16 text-center sm:py-24">
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-xs font-medium text-muted-foreground">
            <ShieldCheck className="h-3.5 w-3.5 text-success" />
            Sem cadastro, sem login
          </span>
          <h1 className="mt-6 text-4xl font-bold sm:text-5xl">
            Seu currículo está preparado para <span className="text-gradient">esta vaga?</span>
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-base text-muted-foreground sm:text-lg">
            Compare seu currículo com a descrição da vaga, descubra o que está faltando e gere uma
            versão otimizada para ATS.
          </p>
          <Button size="lg" className="mt-8" onClick={() => goto("job")}>
            Analisar meu currículo
            <ArrowRight className="h-4 w-4" />
          </Button>

          <ol className="mx-auto mt-12 grid max-w-3xl gap-3 sm:grid-cols-4">
            {[
              "Insira a vaga",
              "Envie seu currículo",
              "Descubra sua compatibilidade",
              "Otimize seu currículo",
            ].map((label, i) => (
              <li key={label} className="surface-card p-4 text-left">
                <span className="text-xs font-semibold text-primary">0{i + 1}</span>
                <p className="mt-1 text-sm font-medium">{label}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section ref={flowRef} className="mx-auto max-w-6xl scroll-mt-6 px-4 pb-24">
        <div className="mb-6">
          <Stepper current={stepIndex} />
        </div>

        {(stage === "hero" || stage === "job") && (
          <JobStep
            title={form.jobTitle}
            description={form.jobDescription}
            url={form.jobUrl}
            showUrl={showUrl}
            onToggleUrl={() => setShowUrl((v) => !v)}
            onChange={(patch) =>
              setForm((prev) => ({
                ...prev,
                ...(patch.title !== undefined ? { jobTitle: patch.title } : {}),
                ...(patch.description !== undefined ? { jobDescription: patch.description } : {}),
                ...(patch.url !== undefined ? { jobUrl: patch.url } : {}),
              }))
            }
            onNext={() => goto("resume")}
          />
        )}

        {stage === "resume" && (
          <ResumeStep
            resumeText={form.resumeText}
            onChange={(resumeText) => setForm((prev) => ({ ...prev, resumeText }))}
            onBack={() => goto("job")}
            analyzing={busy === "analyze"}
            statusMessage={busy === "analyze" ? status : null}
            onAnalyze={() => void runAnalysis(form.resumeText, "analyze")}
          />
        )}

        {stage === "analysis" && analysis && (
          <div className="space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <Button variant="ghost" onClick={() => goto("resume")}>
                Voltar
              </Button>
              <p className="text-xs text-muted-foreground">
                O currículo será adaptado usando somente informações do currículo original. Nenhuma
                experiência ou competência será inventada.
              </p>
            </div>
            <AnalysisDashboard
              analysis={analysis}
              optimizing={busy === "optimize"}
              onOptimize={() => void runOptimization()}
            />
            {busy === "optimize" && status && (
              <p className="text-center text-sm text-muted-foreground">{status}</p>
            )}
          </div>
        )}

        {stage === "optimized" && optimized && analysis && (
          <div className="space-y-4">
            <Button variant="ghost" onClick={() => goto("analysis")}>
              Voltar para a análise
            </Button>
            <ResumeEditor
              markdown={draft}
              onChange={setDraft}
              onRestore={() => setDraft(optimized.markdown)}
              canRestore={draft !== optimized.markdown}
              changes={optimized.changes}
              scoreBefore={analysis.score}
              scoreAfter={scoreAfter}
              reanalyzing={busy === "reanalyze"}
              onReanalyze={() => void runAnalysis(draft, "reanalyze")}
            />
          </div>
        )}
      </section>

      <footer className="border-t border-border">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-8 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>Você não precisa criar uma conta para usar o aplicativo.</p>
          <Link to="/privacidade" className="hover:text-foreground">
            Como tratamos seus dados
          </Link>
        </div>
      </footer>
    </main>
  );
}
