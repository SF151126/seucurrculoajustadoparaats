import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { runAnalysis, runOptimization } from "./resume-prompts.server";
import { AiError } from "./ai.server";

const inputSchema = z.object({
  jobTitle: z.string().trim().min(2, "Informe o título da vaga.").max(200),
  jobDescription: z
    .string()
    .trim()
    .min(120, "A descrição da vaga está muito curta. Cole o texto completo da vaga.")
    .max(30000),
  resumeText: z
    .string()
    .trim()
    .min(200, "O currículo está muito curto. Cole o conteúdo completo.")
    .max(30000),
});

function toMessage(error: unknown) {
  if (error instanceof AiError) return error.message;
  return "Não foi possível concluir a operação. Tente novamente.";
}

export const analyzeResume = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => inputSchema.parse(data))
  .handler(async ({ data }) => {
    try {
      return await runAnalysis(data);
    } catch (error) {
      throw new Error(toMessage(error));
    }
  });

export const optimizeResume = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => inputSchema.parse(data))
  .handler(async ({ data }) => {
    try {
      return await runOptimization(data);
    } catch (error) {
      throw new Error(toMessage(error));
    }
  });
