export type RequirementStatus = "atendido" | "parcial" | "ausente";

export interface RequirementItem {
  requisito: string;
  status: RequirementStatus;
  evidencia?: string;
  observacao?: string;
}

export interface KeywordItem {
  termo: string;
  presente: boolean;
  comentario?: string;
}

export interface IssueItem {
  problema: string;
  porQueImporta: string;
  comoMelhorar: string;
}

export interface SuggestionItem {
  secao: string;
  atual: string;
  sugestao: string;
  motivo: string;
}

export interface AnalysisResult {
  score: number;
  resumoScore: string;
  vaga: {
    jobTitle?: string;
    company?: string;
    seniority?: string;
  };
  requisitos: RequirementItem[];
  palavrasChave: KeywordItem[];
  problemas: IssueItem[];
  sugestoes: SuggestionItem[];
  destaques?: string[];
}

export interface OptimizedResume {
  markdown: string;
  mudancas: string[];
}

export interface JobInput {
  title: string;
  description: string;
  url?: string;
}
