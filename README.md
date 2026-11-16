# CV Match - SeuCurrculoAjustadoParaATS - Analisador e Otimizador de Currículos para ATS

Projeto desenvolvido como parte do desafio Criando um Gerador de Currículos ATS Friendly com Lovable da DIO (Digital Innovation One), com o objetivo de criar uma aplicação web capaz de analisar currículos em relação a vagas de emprego e sugerir melhorias para aumentar a compatibilidade com sistemas ATS (Applicant Tracking Systems).

## Sobre o Projeto

A aplicação foi idealizada para auxiliar candidatos a adaptar seus currículos às exigências de vagas específicas, identificando pontos fortes, requisitos não evidenciados e oportunidades de melhoria.

## Problema que a Aplicação Resolve

Muitos candidatos enfrentam dificuldades para adaptar seus currículos às diferentes vagas de emprego. Entre os principais problemas estão:

- Dificuldade em identificar quais requisitos da vaga estão contemplados no currículo.
- Desconhecimento sobre palavras-chave utilizadas em sistemas ATS.
- Dificuldade em destacar experiências e competências relevantes.
- Falta de clareza sobre quais informações precisam ser melhoradas.
- Tempo gasto adaptando manualmente o currículo para diferentes oportunidades.

A aplicação busca facilitar esse processo por meio de inteligência artificial, realizando uma comparação entre a descrição da vaga e o currículo apresentado pelo candidato.

A proposta não é simplesmente gerar um novo currículo, mas explicar a compatibilidade identificada, apontar possíveis lacunas e sugerir alterações utilizando somente informações reais fornecidas pelo usuário.


## Mega Prompt Utilizado


```txt

Preview
Source
Criar aplicativo web de análise e otimização de currículo para vagas
Crie um aplicativo web moderno, responsivo e intuitivo cujo objetivo seja ajudar candidatos a adaptar seus currículos para vagas específicas, aumentando a compatibilidade com sistemas ATS (Applicant Tracking Systems).

1. Objetivo do aplicativo
O usuário deve conseguir:

Informar uma vaga de emprego na qual está interessado.
Inserir a descrição da vaga, podendo:
Colar o texto da vaga diretamente; ou
Opcionalmente informar uma URL da vaga.
Inserir seu currículo:
Colando o texto diretamente; ou
Fazendo upload de um arquivo, inicialmente PDF e DOCX.
Solicitar uma análise de compatibilidade entre currículo e vaga.
Receber uma pontuação de compatibilidade.
Visualizar quais requisitos da vaga já estão contemplados no currículo.
Identificar quais requisitos estão ausentes ou pouco evidenciados.
Receber sugestões específicas de alteração.
Gerar uma versão otimizada do currículo para aquela vaga.
Visualizar e baixar o currículo otimizado em um formato profissional e ATS-friendly.
O aplicativo NÃO deve exigir cadastro ou login.

2. Princípio mais importante
O aplicativo deve otimizar o currículo com base nas informações reais fornecidas pelo candidato.

REGRA CRÍTICA
Nunca inventar:

experiências profissionais;
empresas;
cargos;
projetos;
tecnologias;
certificações;
cursos;
formação acadêmica;
resultados;
métricas;
responsabilidades;
competências que o candidato não informou.
A IA pode:

reorganizar informações;
melhorar a redação;
sugerir palavras-chave;
destacar experiências existentes;
melhorar descrições;
adaptar o resumo profissional;
reorganizar competências;
sugerir que determinada informação seja adicionada caso realmente exista.
Quando uma informação importante da vaga não estiver presente no currículo, mostrar algo como:

"Esse requisito aparece na vaga, mas não foi identificado no seu currículo. Se você possuir essa experiência, considere adicioná-la."

Nunca preencher automaticamente essa lacuna inventando uma experiência.

3. Fluxo principal
A página inicial deve apresentar uma interface simples com uma chamada clara:

"Otimize seu currículo para a vaga"
Subtexto:

"Compare seu currículo com uma vaga, descubra o que está faltando e gere uma versão otimizada para ATS."

O fluxo deve ser dividido em etapas.

Etapa 1 - Vaga
Permitir que o usuário informe:

Título da vaga

Campo de texto.

Exemplo:

Desenvolvedor C# Júnior

Descrição da vaga

Textarea grande para colar a descrição completa.

Adicionar também uma opção:

Tenho o link da vaga

Caso o usuário forneça uma URL, preparar a arquitetura para futuramente buscar e extrair automaticamente o conteúdo da página.

Se a extração da URL não puder ser realizada com segurança, solicitar que o usuário cole a descrição da vaga.

4. Etapa 2 - Currículo
Permitir duas opções:

Colar currículo
Textarea grande para o usuário inserir o currículo em texto.

Enviar arquivo
Permitir upload de:

PDF
DOCX
Após o upload:

Extrair o texto do documento.
Mostrar o texto extraído para o usuário.
Permitir que o usuário revise e edite o texto antes da análise.
Limite inicial sugerido:

PDF/DOCX de até 10 MB.
Mostrar mensagens claras para arquivos inválidos ou quando não for possível extrair o texto.

5. Etapa 3 - Análise
Após o usuário fornecer a vaga e o currículo, mostrar o botão:

"Analisar compatibilidade"
A análise deve considerar pelo menos:

Palavras-chave
Identificar:

linguagens;
frameworks;
bibliotecas;
ferramentas;
bancos de dados;
metodologias;
certificações;
conhecimentos técnicos;
soft skills;
termos importantes da vaga.
Experiência
Comparar os requisitos da vaga com as experiências descritas no currículo.

Formação
Verificar compatibilidade entre formação exigida e formação apresentada.

Senioridade
Identificar se o currículo demonstra o nível de experiência esperado.

Responsabilidades
Comparar as responsabilidades descritas na vaga com experiências/projetos presentes no currículo.

Competências
Separar competências técnicas e comportamentais.

6. Resultado da análise
Criar uma página de resultados visualmente clara.

No topo, apresentar:

Compatibilidade com a vaga
Mostrar uma pontuação de 0 a 100.

Exemplo:

78/100

A pontuação deve ser acompanhada de uma explicação curta.

Exemplo:

"Seu currículo apresenta boa compatibilidade técnica com a vaga, mas existem alguns requisitos importantes que não estão claramente evidenciados."

Não apresentar a pontuação como uma previsão garantida de contratação.

Usar termos como:

Compatibilidade estimada
Aderência ao perfil
Correspondência com os requisitos
7. Categorias da análise
Mostrar cards separados:

🟢 Requisitos atendidos
Exibir os requisitos da vaga encontrados no currículo.

Exemplo:

C#
SQL
APIs REST
Git
Desenvolvimento web
🟡 Requisitos parcialmente atendidos
Exemplo:

Docker - mencionado indiretamente, mas sem experiência detalhada.
AWS - conhecimento citado, mas sem projeto ou experiência descrita.
🔴 Requisitos não identificados
Exemplo:

Kubernetes
Terraform
Azure
Deixar claro:

"Não identificado no currículo"

e não:

"Você não possui essa habilidade."

Isso é importante porque a ausência no currículo não significa necessariamente ausência de conhecimento.

8. Análise de palavras-chave ATS
Criar uma seção chamada:

"Palavras-chave da vaga"
Mostrar:

Encontradas no currículo
Lista de palavras-chave relevantes que já aparecem.

Ausentes ou pouco evidenciadas
Lista de termos importantes que não aparecem ou aparecem de forma insuficiente.

Para cada palavra-chave, explicar brevemente onde ela poderia ser incorporada caso o candidato realmente tenha aquela experiência.

Exemplo:

Docker

"A vaga menciona Docker várias vezes. Se você possui experiência com Docker, considere mencioná-lo na seção de competências e em projetos relevantes."

9. Problemas encontrados no currículo
Criar uma seção:

"O que pode ser melhorado"
Identificar problemas como:

resumo profissional genérico;
excesso de informações irrelevantes para a vaga;
ausência de palavras-chave importantes;
experiências descritas de forma muito vaga;
falta de resultados ou impacto quando eles realmente existirem;
competências técnicas pouco organizadas;
estrutura inadequada para ATS;
uso excessivo de elementos visuais;
títulos de seção pouco claros;
informações redundantes;
currículo muito extenso;
informações importantes escondidas;
falta de correspondência entre experiências e requisitos da vaga.
Cada problema deve apresentar:

Problema

Por que isso importa

Como melhorar

10. Sugestões de alteração
Criar uma seção:

"Sugestões para seu currículo"
Mostrar sugestões antes de alterar o currículo.

Cada sugestão deve ter:

trecho atual;
sugestão;
motivo da alteração.
Exemplo:

Resumo profissional
Atual:

"Estudante de tecnologia procurando uma oportunidade."

Sugestão:

"Estudante de Análise e Desenvolvimento de Sistemas com conhecimentos em C#, SQL, APIs REST e desenvolvimento de aplicações web..."

Motivo:

"Maior alinhamento com as competências técnicas encontradas na vaga."

IMPORTANTE:

A sugestão deve usar apenas informações existentes no currículo.

11. Geração do currículo otimizado
Adicionar um botão:

"Gerar currículo otimizado"
Antes de gerar, informar:

"O currículo será adaptado à vaga utilizando somente informações presentes no currículo original. Nenhuma experiência ou competência será inventada."

A IA deve:

reorganizar o conteúdo;
melhorar a redação;
adaptar o resumo profissional;
destacar experiências relevantes;
reorganizar competências;
utilizar palavras-chave relevantes que sejam verdadeiras;
remover ou reduzir informações pouco relevantes;
melhorar descrições de experiências e projetos;
manter a veracidade das informações.
12. Estrutura ATS-friendly
O currículo gerado deve priorizar:

texto simples;
estrutura linear;
títulos de seção claros;
boa hierarquia;
fontes profissionais;
ausência de tabelas complexas;
ausência de caixas de texto;
ausência de elementos que dificultem parsing;
ausência de informações importantes somente em imagens;
datas claramente identificáveis;
títulos profissionais claros;
competências organizadas;
boa legibilidade.
Estrutura padrão sugerida:

Nome e informações de contato
Resumo profissional
Competências técnicas
Experiência profissional
Projetos
Formação acadêmica
Certificações e cursos
Idiomas
A estrutura deve ser adaptável conforme as informações existentes.

Não criar seções vazias.

13. Editor do currículo
Depois da geração, mostrar um editor de currículo.

O usuário deve poder:

editar qualquer texto;
adicionar informações;
remover informações;
reorganizar seções;
alterar títulos;
visualizar o resultado;
restaurar a versão anterior.
Criar dois modos:

Editar
Editor de texto estruturado.

Visualizar
Preview do currículo final.

14. ATS Score após otimização
Depois de gerar o currículo otimizado, permitir uma nova análise.

Mostrar:

Antes

72/100

Depois

89/100

Explicar quais mudanças contribuíram para a melhora.

IMPORTANTE:

A pontuação é uma estimativa baseada na correspondência entre o currículo e a descrição da vaga. Não afirmar que o currículo será necessariamente aprovado por um ATS real.

15. Download
Adicionar botão:

"Baixar currículo"
Formatos:

PDF
DOCX
Priorizar documentos que mantenham uma estrutura simples e compatível com ATS.

O arquivo final deve ser profissional e pronto para envio a processos seletivos.

16. Design da interface
Criar uma interface moderna, profissional e minimalista.

O público principal são pessoas procurando emprego, estágio ou mudança de carreira.

A interface deve transmitir:

profissionalismo;
confiança;
simplicidade;
tecnologia;
clareza.
Evitar uma aparência excessivamente corporativa ou complexa.

Usar bastante espaço em branco, cards discretos e uma hierarquia visual clara.

A aplicação deve funcionar muito bem em:

desktop;
tablet;
celular.
17. Página inicial
A homepage deve ter:

Hero
Título:

"Seu currículo está preparado para esta vaga?"

Subtítulo:

"Compare seu currículo com a descrição da vaga, descubra o que está faltando e gere uma versão otimizada para ATS."

CTA:

"Analisar meu currículo"

Abaixo, mostrar um fluxo visual:

1. Insira a vaga → 2. Envie seu currículo → 3. Descubra sua compatibilidade → 4. Otimize seu currículo

18. Privacidade
Como o aplicativo não terá login, deixar isso claro para o usuário.

Exibir uma mensagem:

"Você não precisa criar uma conta para usar o aplicativo."

Não criar sistema de login, cadastro ou senha.

Projetar o aplicativo para minimizar o armazenamento de currículos e dados pessoais.

Sempre que possível, processar os dados apenas durante a sessão.

Adicionar uma seção de privacidade explicando de forma simples:

quais dados são processados;
se o currículo é armazenado;
por quanto tempo;
como os dados são utilizados.
Não armazenar dados pessoais desnecessariamente.

19. IA
Estruturar a aplicação para utilizar um modelo de IA para:

interpretar a descrição da vaga;
extrair requisitos;
interpretar o currículo;
comparar os dois;
identificar gaps;
sugerir melhorias;
gerar o currículo adaptado.
Separar claramente:

Dados estruturados
Extrair da vaga:

jobTitle
company
seniority
requiredSkills
preferredSkills
education
experienceRequirements
responsibilities
keywords
softSkills
Extrair do currículo:

candidateName
contact
summary
skills
experience
projects
education
certifications
languages
Depois realizar a comparação entre essas estruturas.

20. Arquitetura
Construir o frontend com uma arquitetura organizada e escalável.

Separar:

interface;
componentes;
estado da aplicação;
processamento do currículo;
análise da vaga;
integração com IA;
geração do documento.
Não colocar chaves de API diretamente no frontend.

Caso seja necessário utilizar uma API de IA, criar uma camada backend/serverless segura para realizar as chamadas.

Preparar a arquitetura para que o provedor de IA possa ser alterado futuramente.

21. Tratamento de erros
Implementar estados claros para:

arquivo inválido;
PDF sem texto;
erro de leitura do documento;
descrição da vaga muito curta;
currículo muito curto;
erro da API de IA;
timeout;
limite de tamanho;
falha na geração do documento.
Nunca deixar o usuário preso em uma tela de carregamento sem explicação.

Mostrar estados como:

"Extraindo seu currículo..."

"Analisando os requisitos da vaga..."

"Comparando seu currículo com a vaga..."

"Gerando sugestões..."

"Preparando seu currículo otimizado..."

22. Segurança
Implementar boas práticas de segurança.

Especialmente:

validar arquivos enviados;
limitar tamanho dos arquivos;
não executar conteúdo enviado pelo usuário;
proteger chaves de API;
sanitizar conteúdo;
evitar prompt injection proveniente do texto da vaga ou currículo;
tratar documentos enviados como dados, não como instruções para a IA.
A descrição da vaga e o currículo devem ser considerados conteúdo não confiável.

23. Experiência do usuário
O usuário deve conseguir chegar ao resultado em poucos passos.

Fluxo ideal:

Homepage
   ↓
Inserir vaga
   ↓
Inserir currículo
   ↓
Analisar
   ↓
Dashboard de compatibilidade
   ↓
Sugestões
   ↓
Gerar currículo otimizado
   ↓
Editar
   ↓
Visualizar
   ↓
Baixar PDF/DOCX
Adicionar botão "Voltar" entre as etapas sem perder os dados já inseridos.

Manter os dados durante a sessão mesmo que o usuário navegue entre as etapas.

24. Dashboard de resultado
Criar uma dashboard visual com:

score geral;
requisitos atendidos;
requisitos parcialmente atendidos;
requisitos não identificados;
palavras-chave;
problemas encontrados;
sugestões;
botão para gerar currículo otimizado.
O resultado deve ser fácil de entender mesmo para alguém que não conhece ATS.

25. Diferencial do produto
O aplicativo não deve ser apenas um "gerador de currículo".

O foco é:

"Currículo + vaga → análise de compatibilidade → explicação → otimização direcionada."

O usuário deve entender:

Por que seu currículo combina ou não com a vaga.

E depois conseguir:

Corrigir os problemas e gerar uma versão melhor direcionada àquela vaga.

26. Dados e persistência
Inicialmente, não exigir conta.

Preferir manter o estado no navegador/sessão quando possível.

Não criar banco de dados para currículos por padrão.

A arquitetura deve permitir adicionar futuramente:

histórico de currículos;
múltiplas versões;
contas de usuário;
histórico de vagas;
acompanhamento de candidaturas;
comparação entre versões.
Essas funcionalidades NÃO devem ser implementadas agora.

27. MVP
Priorize primeiro um MVP funcional com:

Obrigatório
Homepage
Inserção da descrição da vaga
Upload de PDF
Upload de DOCX
Colagem de currículo
Extração do texto
Análise com IA
Score de compatibilidade
Requisitos atendidos
Requisitos ausentes/não identificados
Palavras-chave
Sugestões
Geração de currículo otimizado
Editor
Preview
Download em PDF
Não implementar inicialmente
Login
Cadastro
Assinatura
Pagamentos
Dashboard de usuário
Histórico permanente
Sistema social
Aplicação automática para vagas
Envio automático de candidaturas
28. Critérios de qualidade
O resultado deve parecer um produto real, não um protótipo genérico.

Prioridades:

Funcionalidade
Clareza da análise
Qualidade das sugestões da IA
Preservação da veracidade do currículo
Experiência do usuário
Design
Responsividade
Segurança
Comece implementando o MVP completo e funcional.

Use componentes reutilizáveis e uma estrutura de código limpa.

Não adicionar funcionalidades que não foram solicitadas apenas para deixar o aplicativo mais complexo.

```

## Conceito e Funcionamento

O funcionamento da aplicação é dividido em algumas etapas:

1. **Inserção da vaga:** o usuário informa o título, a descrição e o link da oportunidade de emprego.
2. **Envio do currículo:** o usuário pode colar o conteúdo do currículo ou enviar um arquivo PDF ou DOCX.
3. **Extração e interpretação:** o conteúdo do currículo e os requisitos da vaga são organizados para permitir a comparação.
4. **Análise de compatibilidade:** a IA identifica palavras-chave, competências, experiências, formação e outros requisitos relevantes.
5. **Apresentação dos resultados:** o usuário recebe uma pontuação estimada de compatibilidade, requisitos atendidos, parcialmente atendidos e não identificados.
6. **Sugestões de melhoria:** são apresentadas recomendações para melhorar a redação e destacar informações relevantes.
7. **Otimização do currículo:** a aplicação gera uma versão adaptada à vaga, que pode ser revisada e editada pelo usuário.

Um princípio fundamental do projeto é não inventar experiências, conhecimentos, certificações ou qualificações. A IA deve trabalhar exclusivamente com as informações fornecidas pelo candidato.

### Histórico de alterações do prompt

Foi utilizada uma única versão do mega prompt durante a interação com o Lovable.

Não foram enviadas mensagens adicionais solicitando alterações ou refinamentos após o envio inicial. Portanto, não houve uma segunda versão do prompt.



##**Resultado:**
Acesse o app funcional no Lovable: https://seucurrculoajustadoparaats.lovable.app

<img width="1175" height="912" alt="image" src="https://github.com/user-attachments/assets/b12e361d-906a-4302-83be-573787c0f3cc" />

<img width="746" height="477" alt="image" src="https://github.com/user-attachments/assets/4cd0a3d2-e802-4aac-9bc7-adee4c9f3725" />


<img width="628" height="477" alt="image" src="https://github.com/user-attachments/assets/6786c162-1e47-4263-9cf5-9356a45adec3" />


<img width="605" height="478" alt="image" src="https://github.com/user-attachments/assets/ee21977a-9a51-4a47-bad5-ababdfb6f8bc" />


<img width="693" height="476" alt="image" src="https://github.com/user-attachments/assets/a8450857-179d-451e-ae72-1ff88528d0c7" />



