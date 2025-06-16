# Exercício de Construção de User Story Mapping (USM)

## Contexto

A **ComunEventos** é uma startup fictícia que visa criar uma plataforma digital para facilitar a organização e participação em eventos comunitários. Observando problemas como:

* Fragmentação de ferramentas
* Baixa integração
* Custo elevado de soluções especializadas
* Dificuldade de engajamento

A proposta é oferecer uma solução unificada e acessível, com foco em **organização, comunicação, gestão e colaboração**.

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
| At02 | Descobrir e se inscrever no evento  | Participante              |
| At03 | Contratar fornecedores              | Fornecedor Local          |
| At04 | Captar patrocinadores               | Patrocinador              |
| At05 | Recrutar voluntários                | Voluntário                |
| At06 | Promover o evento                   | Organizador               |
| At07 | Comunicar-se com o público          | Organizador, Participante |
| At08 | Avaliar evento e gerar aprendizados | Todos os usuários         |

---

## Backbone (Épicos Principais por Atividade)

| ID   | Descrição                | Atividade Relacionada |
| ---- | ------------------------ | --------------------- |
| Bb01 | Configurar evento        | At01                  |
| Bb02 | Efetivar inscrições      | At02                  |
| Bb03 | Gerenciar fornecedores   | At03                  |
| Bb04 | Coordenar patrocínios    | At04                  |
| Bb05 | Recrutar voluntários     | At05                  |
| Bb06 | Promover & comunicar     | At06, At07            |
| Bb07 | Avaliar & gerar insights | At08                  |

---

## MVP – Histórias de Usuário por Backbone

| ID   | Descrição                                        | Backbone |
| ---- | ------------------------------------------------ | -------- |
| Ta01 | Definir título, local e data do evento           | Bb01     |
| Ta02 | Escolher categorias e tipo de evento             | Bb01     |
| Ta03 | Cadastrar formulário de inscrição                | Bb02     |
| Ta04 | Visualizar inscrições confirmadas                | Bb02     |
| Ta05 | Cadastrar fornecedores e negociar serviços       | Bb03     |
| Ta06 | Gerar contrato eletrônico com fornecedores       | Bb03     |
| Ta07 | Enviar proposta de patrocínio                    | Bb04     |
| Ta08 | Cadastrar patrocinador e contrapartidas          | Bb04     |
| Ta09 | Disponibilizar formulário para voluntários       | Bb05     |
| Ta10 | Gerenciar escala de voluntários                  | Bb05     |
| Ta11 | Compartilhar evento nas redes sociais            | Bb06     |
| Ta12 | Agendar e disparar e-mails para inscritos        | Bb06     |
| Ta13 | Coletar feedback dos participantes               | Bb07     |
| Ta14 | Avaliar desempenho de fornecedores e voluntários | Bb07     |

---

## Backlog Futuro

| ID   | Descrição                                      | Backbone |
| ---- | ---------------------------------------------- | -------- |
| Ta15 | Gerar relatório de impacto do evento           | Bb07     |
| Ta16 | Cadastrar múltiplos eventos em um mesmo painel | Bb01     |
| Ta17 | Criar painel de estatísticas dos eventos       | Bb07     |
| Ta18 | Permitir pagamentos online integrados          | Bb02     |
| Ta19 | Notificar por WhatsApp                         | Bb06     |
| Ta20 | Gamificar atividades voluntárias               | Bb05     |

---

## Tarefas em Histórias de Usuário

### **Backbone: Bb01 – Configurar Evento**

**Definir título, local e data do evento**

* Deve ser possível preencher e salvar o nome, a data, o horário e o local do evento no painel de criação.
* Os dados salvos devem ser associados ao evento e permitir edição posterior.

**Escolher categorias e tipo de evento**

* O organizador deve poder selecionar o tipo (ex: cultural, esportivo, beneficente) e categorias relacionadas.
* As categorias selecionadas devem ser armazenadas para futura filtragem na busca por eventos.

---

### **Backbone: Bb02 – Efetivar Inscrições**

**Cadastrar formulário de inscrição**

* O organizador deve poder criar um formulário com campos personalizados (nome, e-mail, preferências etc.).
* O formulário deve ser vinculado ao evento e acessível publicamente para inscrições.

**Visualizar inscrições confirmadas**

* O organizador deve poder acessar uma lista com os inscritos e seus dados.
* A lista deve poder ser exportada e atualizada em tempo real.

---

### **Backbone: Bb03 – Gerenciar Fornecedores**

**Cadastrar fornecedores e negociar serviços**

* Deve ser possível adicionar fornecedores com dados de contato e serviços oferecidos.
* O sistema deve permitir registrar o status das negociações e salvar observações.

**Gerar contrato eletrônico com fornecedores**

* O organizador deve poder gerar um contrato padrão para o fornecedor com os dados do evento.
* O fornecedor deve poder assinar digitalmente e o contrato deve ser salvo e vinculado ao evento.

---

### **Backbone: Bb04 – Coordenar Patrocínios**

**Enviar proposta de patrocínio**

* O organizador deve poder gerar um documento de proposta a partir de um modelo.
* A proposta deve poder ser enviada por e-mail diretamente pelo sistema.

**Cadastrar patrocinador e contrapartidas**

* Ao aceitar a proposta, o patrocinador é registrado no sistema com logotipo e valor investido.
* Contrapartidas (ex: exibição de marca, brindes) devem ser listadas e vinculadas ao patrocinador.

---

### **Backbone: Bb05 – Recrutar Voluntários**

**Disponibilizar formulário para voluntários**

* Publicação de formulário com campos específicos.
* Confirmação automática após inscrição.

**Gerenciar escala de voluntários**

* Criação de escala de tarefas e horários.
* Alocação automática ou manual com notificações.

---

### **Backbone: Bb06 – Promover e Comunicar**

**Compartilhar evento nas redes sociais**

* Geração de links de divulgação e prévias com imagem e descrição.
* Botão de compartilhamento para WhatsApp, Instagram e Facebook.

**Agendar e disparar e-mails para inscritos**

* Configuração de mensagens automáticas com base em datas do evento.
* Envio automático conforme agenda.

---

### **Backbone: Bb07 – Avaliar e Gerar Insights**

**Coletar feedback dos participantes**

* Envio de formulário de avaliação com campos personalizáveis.
* Armazenamento das respostas para análise.

**Avaliar desempenho de fornecedores e voluntários**

* Avaliação por critérios definidos (pontualidade, qualidade etc.).
* Registro das avaliações vinculadas ao evento.

---
