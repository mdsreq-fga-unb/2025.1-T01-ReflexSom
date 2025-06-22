# Exercício de Construção de User Story Mapping (USM)

## Contexto

A **ComunEventos** é uma startup fictícia que visa criar uma plataforma digital para facilitar a organização e participação em eventos comunitários. Observando problemas como:

* Fragmentação de ferramentas
* Baixa integração
* Custo elevado de soluções especializadas
* Dificuldade de engajamento

A proposta é oferecer uma solução unificada e acessível, com foco em **organização, comunicação, gestão e colaboração**.


<iframe width="100%" height="600" src="https://miro.com/app/board/uXjVInpxAh0=/?share_link_id=75548130607" frameborder="0" scrolling="no" allow="fullscreen; clipboard-read; clipboard-write" allowfullscreen></iframe>

---

## Resumo do Produto

### a) O quê?

A **plataforma ComunEventos** é um sistema online para **organizar, promover, participar e colaborar** em eventos comunitários.

**Funcionalidades principais:**

* Gestão de inscrições
* Comunicação com participantes
* Integração de patrocinadores e voluntários
* Contratação de fornecedores
* Acompanhamento de feedback

### b) Por quê?

Porque a organização de eventos comunitários é hoje **fragmentada e ineficiente**, dependendo de ferramentas desconectadas. A ComunEventos propõe:

* Integração em um só lugar
* Redução de custos
* Facilidade de engajamento
* Fortalecimento do impacto social

### c) Quem?

**Personas identificadas:**

* Organizador do Evento
* Participante
* Fornecedor Local
* Patrocinador
* Voluntário

---

## Identificação dos Atores (Personas)

| Persona      | Descrição                                       | Necessidades                                                             |
| ------------ | ----------------------------------------------- | ------------------------------------------------------------------------ |
| Organizador  | Planeja e executa os eventos                    | Promoção, gestão de inscrições, comunicação e relatórios                 |
| Participante | Interessado nos eventos                         | Informações claras, inscrição simples, notificações e interação          |
| Fornecedor   | Presta serviços (alimentação, som, espaço etc.) | Comunicação clara, contrato, cronograma, pagamento e feedback pós-evento |
| Patrocinador | Financia o evento por exposição da marca        | Visibilidade, relatórios de retorno e resultados                         |
| Voluntário   | Ajuda nas atividades do evento                  | Tarefas claras, capacitação, reconhecimento e boa comunicação            |

---

## Atividades (Etapas da Jornada do Usuário)

| ID   | Descrição                           | Usuário(s) Envolvido(s)   |
| ---- | ----------------------------------- | ------------------------- |
| At01 | Criar e configurar evento           | Organizador               |
| At02 | Promover o evento                   | Organizador               |
| At03 | Contratar fornecedores              | Organizador, Fornecedor   |
| At04 | Captar patrocinadores               | Organizador, Patrocinador |
| At05 | Descobrir e se inscrever no evento  | Participante              |
| At06 | Recrutar voluntários                | Organizador, Voluntário   |
| At07 | Avaliar evento e gerar aprendizados | Organizador, Participante, Voluntário, Patrocinador, Fornecedor |

---

## Backbone (Épicos Principais por Atividade)

| ID   | Descrição                                 | Atividade Relacionada |
| ---- | ------------------------------------------ | --------------------- |
| Bb01 | Planejar os detalhes do evento             | At01                  |
| Bb02 | Divulgar o evento nos canais adequados     | At02                  |
| Bb03 | Formalizar parcerias com fornecedores      | At03                  |
| Bb04 | Negociar e registrar apoio financeiro      | At04                  |
| Bb05 | Efetivar inscrições                        | At05                  |
| Bb06 | Engajar voluntários nas atividades         | At06                  |
| Bb07 | Medir o sucesso e aprendizado do evento    | At07                  |

---

## MVP – Histórias de Usuário por Backbone

| ID   | Descrição                                        | Backbone |
| ---- | ------------------------------------------------ | -------- |
| Ta01 | Definir título, local e data do evento           | Bb01     |
| Ta02 | Escolher categorias e tipo de evento             | Bb01     |
| Ta03 | Compartilhar evento nas redes sociais            | Bb02     |
| Ta04 | Cadastrar fornecedores e negociar serviços       | Bb03     |
| Ta05 | Gerar contrato eletrônico com fornecedores       | Bb03     |
| Ta06 | Enviar proposta de patrocínio                    | Bb04     |
| Ta07 | Cadastrar patrocinador e contrapartidas          | Bb04     |
| Ta08 | Cadastrar formulário de inscrição                | Bb05     |
| Ta09 | Visualizar inscrições confirmadas                | Bb05     |
| Ta10 | Disponibilizar formulário para voluntários       | Bb06     |
| Ta11 | Gerenciar escala de voluntários                  | Bb06     |
| Ta12 | Coletar feedback dos participantes               | Bb07     |
| Ta13 | Avaliar desempenho dos envolvidos                | Bb07     |

---

## Backlog Futuro

| ID   | Descrição                                      | Backbone |
| ---- | ---------------------------------------------- | -------- |
| Ta14 | Cadastrar múltiplos eventos em um mesmo painel | Bb01     |
| Ta15 | Permitir pagamentos online integrados          | Bb05     |
| Ta16 | Gamificar atividades voluntárias               | Bb06     |
| Ta17 | Gerar relatório de impacto do evento           | Bb07     |
| Ta18 | Criar painel de estatísticas dos eventos       | Bb07     |

---

## Tarefas em Histórias de Usuário

### **Backbone: Bb01 – Planejar os detalhes do evento**

**Definir título, local e data do evento**

* Deve ser possível preencher e salvar o nome, a data, o horário e o local do evento no painel de criação.
* Os dados salvos devem ser associados ao evento e permitir edição posterior.

**Escolher categorias e tipo de evento**

* O organizador deve poder selecionar o tipo (ex: cultural, esportivo, beneficente) e categorias relacionadas.
* As categorias selecionadas devem ser armazenadas para futura filtragem na busca por eventos.

**Cadastrar múltiplos eventos em um mesmo painel**

* O organizador pode criar e gerenciar vários eventos simultaneamente em um único painel de controle.

---

### **Backbone: Bb02 – Divulgar o evento nos canais adequados**

**Compartilhar evento nas redes sociais**

* Geração de links de divulgação e prévias com imagem e descrição.
* Botão de compartilhamento para WhatsApp, Instagram e Facebook.

---

### **Backbone: Bb03 – Formalizar parcerias com fornecedores**

**Cadastrar fornecedores e negociar serviços**

* Deve ser possível adicionar fornecedores com dados de contato e serviços oferecidos.
* O sistema deve permitir registrar o status das negociações e salvar observações.

**Gerar contrato eletrônico com fornecedores**

* O organizador deve poder gerar um contrato padrão para o fornecedor com os dados do evento.
* O fornecedor deve poder assinar digitalmente e o contrato deve ser salvo e vinculado ao evento.

---

### **Backbone: Bb04 – Negociar e registrar apoio financeiro**

**Enviar proposta de patrocínio**

* O organizador deve poder gerar um documento de proposta a partir de um modelo.
* A proposta deve poder ser enviada por e-mail diretamente pelo sistema.

**Cadastrar patrocinador e contrapartidas**

* Ao aceitar a proposta, o patrocinador é registrado no sistema com logotipo e valor investido.
* Contrapartidas (ex: exibição de marca, brindes) devem ser listadas e vinculadas ao patrocinador.

---

### **Backbone: Bb05 – Efetivar inscrições**

**Cadastrar formulário de inscrição**

* O organizador deve poder criar um formulário com campos personalizados (nome, e-mail, preferências etc.).
* O formulário deve ser vinculado ao evento e acessível publicamente para inscrições.

**Visualizar inscrições confirmadas**

* O organizador deve poder acessar uma lista com os inscritos e seus dados.
* A lista deve poder ser exportada e atualizada em tempo real.

**Permitir pagamentos online integrados**

* O participante pode realizar o pagamento da inscrição diretamente pela plataforma, de forma segura e integrada.

---

### **Backbone: Bb06 – Engajar voluntários nas atividades**

**Disponibilizar formulário para voluntários**

* Publicação de formulário com campos específicos.
* Confirmação automática após inscrição.

**Gerenciar escala de voluntários**

* Criação de escala de tarefas e horários.
* Alocação automática ou manual com notificações.

**Gamificar atividades voluntárias**

* Implementar sistema de pontos, medalhas ou recompensas para engajamento dos voluntários.

---

### **Backbone: Bb07 – Medir o sucesso e aprendizado do evento**

**Coletar feedback dos participantes**

* Envio de formulário de avaliação com campos personalizáveis.
* Armazenamento das respostas para análise.

**Avaliar desempenho dos envolvidos**

* Avaliação por critérios definidos (pontualidade, qualidade etc.) para fornecedores, voluntários e demais participantes.
* Registro das avaliações vinculadas ao evento.

**Gerar relatório de impacto do evento**

* Geração automática de relatório com dados quantitativos e qualitativos do evento.

**Criar painel de estatísticas dos eventos**

* Visualização de métricas e indicadores de sucesso dos eventos realizados.

---
