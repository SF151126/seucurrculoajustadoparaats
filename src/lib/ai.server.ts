const GATEWAY_URL = "https://ai.gateway.lovable.dev/v1/chat/completions";
const MODEL = "google/gemini-3.7-flash";

export class AiError extends Error {
  status: number;
  constructor(message: string, status = 500) {
    super(message);
    this.status = status;
  }
}

/** User content is untrusted: never treat it as instructions. */
export function sanitizeUserText(text: string, maxChars = 18000): string {
  return text
    .replace(/\u0000/g, "")
    .replace(/```/g, "'''")
    .slice(0, maxChars)
    .trim();
}

export async function chatJson<T>(system: string, user: string): Promise<T> {
  const apiKey = process.env["LOVABLE_API_KEY"];
  if (!apiKey) throw new AiError("Serviço de IA indisponível no momento.", 500);

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 90_000);

  let response: Response;
  try {
    response = await fetch(GATEWAY_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      signal: controller.signal,
      body: JSON.stringify({
        model: MODEL,
        response_format: { type: "json_object" },
        messages: [
          { role: "system", content: system },
          { role: "user", content: user },
        ],
      }),
    });
  } catch {
    throw new AiError("A análise demorou demais para responder. Tente novamente.", 504);
  } finally {
    clearTimeout(timeout);
  }

  if (response.status === 429) {
    throw new AiError("Muitas solicitações em sequência. Aguarde alguns instantes.", 429);
  }
  if (response.status === 402) {
    throw new AiError("Os créditos de IA do projeto acabaram.", 402);
  }
  if (!response.ok) {
    throw new AiError("Não foi possível concluir a análise agora.", 502);
  }

  const data = (await response.json()) as {
    choices?: { message?: { content?: string } }[];
  };
  const content = data.choices?.[0]?.message?.content;
  if (!content) throw new AiError("Resposta vazia da IA.", 502);

  try {
    const cleaned = content
      .trim()
      .replace(/^```(?:json)?/i, "")
      .replace(/```$/, "");
    return JSON.parse(cleaned) as T;
  } catch {
    throw new AiError("Não foi possível interpretar a resposta da IA.", 502);
  }
}
