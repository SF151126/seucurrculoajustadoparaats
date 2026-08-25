import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";

export const Route = createFileRoute("/privacidade")({
  head: () => ({
    meta: [
      { title: "Privacidade | CV Match — análise de currículo para ATS" },
      {
        name: "description",
        content:
          "Entenda quais dados são processados na análise do seu currículo, se algo é armazenado, por quanto tempo e como as informações são utilizadas.",
      },
      { property: "og:title", content: "Privacidade — CV Match" },
      {
        property: "og:description",
        content: "Como tratamos o texto da vaga e do seu currículo. Sem conta, sem banco de dados.",
      },
      { property: "og:type", content: "article" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Privacy,
});

const sections = [
  {
    title: "Quais dados são processados",
    body: "Apenas o título e a descrição da vaga que você cola e o texto do seu currículo. Não pedimos e-mail, senha ou qualquer cadastro.",
  },
  {
    title: "Seu currículo é armazenado?",
    body: "Não. Nada é gravado em banco de dados. O arquivo enviado é lido no seu próprio navegador para extrair o texto, e o arquivo em si nunca sai do seu dispositivo.",
  },
  {
    title: "Por quanto tempo os dados ficam disponíveis",
    body: "Os textos ficam apenas na sessão do navegador para você navegar entre as etapas sem perder o que digitou. Ao fechar a aba, tudo é descartado.",
  },
  {
    title: "Como os dados são utilizados",
    body: "O texto da vaga e do currículo são enviados a um modelo de IA somente durante a análise e a geração do currículo otimizado, e usados exclusivamente para produzir o resultado que você vê na tela.",
  },
  {
    title: "Segurança",
    body: "As chaves de acesso à IA ficam apenas no servidor. Arquivos são validados por tipo e tamanho (até 10 MB) e o conteúdo enviado é tratado como dado, nunca como instrução para a IA.",
  },
];

function Privacy() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-16">
      <Link
        to="/"
        className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" />
        Voltar
      </Link>
      <h1 className="mt-6 text-3xl font-bold">Privacidade</h1>
      <p className="mt-3 text-muted-foreground">
        Você não precisa criar uma conta para usar o aplicativo. Projetamos o fluxo para guardar o
        mínimo possível de informação pessoal.
      </p>
      <div className="mt-8 space-y-4">
        {sections.map((section) => (
          <section key={section.title} className="surface-card p-5">
            <h2 className="text-base font-semibold">{section.title}</h2>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{section.body}</p>
          </section>
        ))}
      </div>
    </main>
  );
}
