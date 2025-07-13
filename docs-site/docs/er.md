##Atividades e Técnicas de Engenharia de Requisitos##

###Elicitação e Descoberta###
***Entrevista / Grupo Focal***: Serão conduzidas entrevistas com os principais stakeholders, incluindo o dono da empresa, técnicos de som, operadores de eventos e clientes recorrentes. O objetivo é entender como é feito o processo atual de orçamento, consulta de equipamentos e agendamento técnico. Esses dados permitirão identificar pontos de dor e necessidades reais para alimentar os requisitos do sistema.

***Brainstorming***: Reuniões internas com a equipe multidisciplinar (devs, design, analista de requisitos, especialista em dados) foram realizadas para levantar ideias iniciais de funcionalidades, interface e soluções.

###Análise e Consenso###
***Análise de Objetivo de Domínio***: Essa técnica tem como objetivo identificar os principais objetivos de negócio e como o sistema pode apoiar diretamente na sua realização. No caso da Reflex Som, o domínio envolve não só a locação de equipamentos, mas também a gestão técnica e logística de eventos. Por isso, é essencial entender como a plataforma pode contribuir para esses processos centrais da empresa.

<!-- ***Análise de Risco/Viabilidade***: Essa técnica será usada para avaliar os riscos técnicos, operacionais e financeiros relacionados à implementação de cada funcionalidade. O foco aqui é identificar o que pode dar errado, quanto custaria corrigir e se a equipe tem capacidade para implementar determinada funcionalidade com qualidade dentro do prazo. -->

***Negociação***: Durante a priorização de funcionalidades, será realizada uma negociação com o cliente para alinhar expectativas, limitar escopo do MVP e distribuir entregas entre as iterações, considerando custo-benefício e complexidade técnica.

###Declaração de Requisitos###
***Casos de Uso***: Os requisitos elicitados serão organizados na forma de casos de uso (ex: "Emitir orçamento automático", "Consultar disponibilidade de equipamento", "Agendar técnico").

<!-- ***User Story Mapping (USM)***: A técnica será usada para mapear a jornada do usuário (cliente da Reflex Som) desde a entrada na plataforma até o recebimento do orçamento, destacando funcionalidades essenciais e opcionais em cada etapa. -->

<!-- ***Especificação de Requisitos***: ... -->



###Representação de Requisitos###
<!-- ***Prototipagem***: As telas do sistema serão prototipadas no Figma, com interações básicas que simulem o uso real da aplicação. O protótipo será apresentado ao cliente para validação antes do desenvolvimento. -->

***Diagrama (UML)***: Utilizaremos o diagrama de atividade para representar visualmente como será o fluxo do sistema e a interação dos usuários com os módulos.


###Verificação e Validação de Requisitos###
<!-- ***Checklist de Validação e Verificação***: Após o levantamento dos requisitos, será utilizado um checklist para garantir que todos os critérios de qualidade foram atendidos (consistência, viabilidade, rastreabilidade, completude etc.). -->

***Definition of Ready (DoR) e Definition of Done (DoD)***: Para cada funcionalidade, será definido o que é necessário para começá-la (DoR) e para considerá-la como concluída (DoD), garantindo que todas as entregas estejam completas e funcionais.

<!-- ***Revisão por Pares e Walkthrough***: As histórias e funcionalidades serão revisadas em conjunto pela equipe técnica antes da implementação (walkthrough) e revisadas após implementação para garantir aderência ao escopo. -->

###Organização e Atualização de Requisitos###
<!-- ***Product Backlog Building (PBB)***: Os requisitos coletados serão organizados em um backlog priorizado, estruturado por valor de negócio e dependências técnicas. Essa organização facilitará o planejamento incremental do projeto. -->

***MoSCoW***: A equipe aplicará a técnica de priorização MoSCoW (Must, Should, Could, Won’t) para separar funcionalidades obrigatórias e opcionais, especialmente úteis na definição do escopo do MVP.

***ICE Scoring***: A equipe utilizará o método de priorização ICE (Impacto, Confiança e Facilidade) para atribuir uma pontuação numérica às funcionalidades, auxiliando na tomada de decisões mais objetivas. A análise considera o impacto da funcionalidade no valor do produto, o grau de confiança na entrega conforme planejado e a facilidade de implementação técnica, permitindo uma priorização baseada em critérios quantitativos e alinhada à realidade da equipe.

***Mapa de Rastreabilidade***: Será criado um mapa relacionando os requisitos com os objetivos de negócio e funcionalidades entregues, o que ajudará na auditoria e evolução futura da solução.

---


##Engenharia de Requisitos e o OpenUP##

| **Fases do Processo** | **Atividades ER**         | **Prática**    | **Técnica**   | **Resultado Esperado**  |
| ---------- | ------------------ | ---------------- | ------------| -----------------|
| **Iniciação**   | Elicitação e Descoberta   | Coleta com stakeholders    |  Entrevista / Grupo Focal  | Lista de necessidades  |
|   | Elicitação e Descoberta   |  Sessões com equipe multidisciplinar  | Brainstorming  | [Lista de Requisitos RFs](requisitos.md)  |
|   | Análise e Consenso   | Estudo dos objetivos do negócio    | Análise de Objetivo de Domínio  | Visão de Produto     |
| **Elaboração**  | Análise e Consenso | Definição de MVP | Negociação | [MVP](mvp.md) |
|   | Declaração de Requisitos  |    | Casos de Uso  |  [Casos de Uso](diagramas.md)  |
|   | Representação de Requisitos | UML  | Diagrama (UML)  | [Diagrama de atividade](diagramas.md) |
|   | Verificação e Validação   | Revisão técnica e validação  |  DoR; DoD | [DoR/DoD](dordod.md)
|   | Organização e Atualização | Relacionamento entre requisitos e objetivos  | Mapa de Rastreabilidade | [Mapa de relações entre os Requisitos](mapRast.md)
|   | Organização e Atualização | Priorização da Lista de Requisitos  |  MoSCoW e ICE Scoring | [Lista de requisitos priorizada](mvp.md)
| **Construção**  | Verificação e Validação de Requisitos | Revisão técnica e validação | DoR; DoD  | [DoR/DoD](dordod.md)
| **Transição** |  |  |  |

<!-- |   | Verificação e Validação   | Revisão técnica e validação  |  Checklist  | Resultados do Checklist  
|   | Verificação e Validação   | Revisão técnica e validação  |  Walkthrough  |  Resultados do Walkthrough          -->

