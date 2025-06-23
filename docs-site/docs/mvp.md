# Priorização da lista geral de requisitos

Para apoiar a definição de prioridades no desenvolvimento das funcionalidades do sistema, foi utilizada uma abordagem combinando os métodos **MoSCoW** e **ICE Scoring**.

O método **MoSCoW** classifica os requisitos em quatro níveis de prioridade:

* **Must Have** (essenciais),
* **Should Have** (importantes, mas não críticas),
* **Could Have** (desejáveis, mas opcionais),
* e **Won’t Have** (fora do escopo atual, se aplicável).

Já o método **ICE** (Impacto, Confiança e Facilidade) fornece uma **pontuação numérica** que ajuda a tomar decisões mais objetivas com base na análise quantitativa de:

* **Impacto da funcionalidade no valor do produto**,
* **Confiança na entrega da funcionalidade como planejada**,
* **Facilidade de implementação técnica**.

Combinando essas abordagens, foi possível estabelecer uma ordenação das funcionalidades com base em **critérios técnicos e de negócio**, promovendo maior clareza no planejamento do backlog.


A priorização teve como propósito garantir que o desenvolvimento fosse direcionado às funcionalidades mais críticas, assegurando alinhamento com os objetivos do projeto e a viabilidade técnica do time.
Cada membro do grupo atribuiu notas de 1 a 4 para todos os requisitos, correspondendo às categorias da técnica MoSCoW. A média dessas avaliações foi utilizada para classificar e organizar o backlog de forma estratégica.

[Tabela com priorização da lista de requisitos](https://docs.google.com/spreadsheets/d/1SSCgo9blXFhiqFjJSi09K6nsdQz9eZsQeCzyl_3TFL8/edit?usp=sharing)

# Tabela ICE com Priorização MoSCoW

| Funcionalidade                                         | Impacto | Confiança | Facilidade | ICE Score | Prioridade  |
|--------------------------------------------------------|---------|-----------|------------|-----------|-------------|
| [Realizar cadastro do cliente.](https://github.com/mdsreq-fga-unb/2025.1-T01-ReflexSom/issues/72)                    | 9,5     | 8,5     | 9       | 727       | Must Have   |
| [Realizar login do cliente.](https://github.com/mdsreq-fga-unb/2025.1-T01-ReflexSom/issues/30)                       | 9,33    | 9,33    | 8,33    | 726       | Must Have   |
| [Realizar logoff do cliente.](https://github.com/mdsreq-fga-unb/2025.1-T01-ReflexSom/issues/90)                      | 8,33    | 8,67    | 8,17    | 590       | Must Have   |
| [Editar os dados pessoais cadastrados do cliente.](https://github.com/mdsreq-fga-unb/2025.1-T01-ReflexSom/issues/14) | 8,17    | 8,5     | 7,67    | 532       | Must Have   |
| [Cadastrar equipamento na lista de equipamentos](https://github.com/mdsreq-fga-unb/2025.1-T01-ReflexSom/issues/29)   | 7,83    | 7,33    | 7,33    | 421       | Must Have   |
| [Realizar consulta de equipamentos.](https://github.com/mdsreq-fga-unb/2025.1-T01-ReflexSom/issues/75)               | 7,67    | 8       | 6,33    | 388       | Must Have   |
| [Detalhar informações do equipamento.](https://github.com/mdsreq-fga-unb/2025.1-T01-ReflexSom/issues/98)             | 7,5     | 7,5     | 6,83    | 384       | Should Have |
| [Adicionar equipamentos ao carrinho.](https://github.com/mdsreq-fga-unb/2025.1-T01-ReflexSom/issues/68)              | 7       | 7,67    | 6,83    | 367       | Should Have |
| [Realizar reservas](https://github.com/mdsreq-fga-unb/2025.1-T01-ReflexSom/issues/30)                                | 6,67    | 6,83    | 6,5     | 296       | Should Have |
| [Aprovar reserva solicitada.](https://github.com/mdsreq-fga-unb/2025.1-T01-ReflexSom/issues/19)                      | 6,17    | 6,33    | 5,67    | 221       | Should Have |
| [Criar orçamento de uma reserva.](https://github.com/mdsreq-fga-unb/2025.1-T01-ReflexSom/issues/5)                   | 5,67    | 6,5     | 5,83    | 215       | Could Have  |
| [Exibir histórico de reservas do cliente.](https://github.com/mdsreq-fga-unb/2025.1-T01-ReflexSom/issues/1)          | 5,83    | 5,83    | 5,83    | 198       | Could Have  |
| [Consultar agenda de eventos.](https://github.com/mdsreq-fga-unb/2025.1-T01-ReflexSom/issues/40)                     | 5,33    | 5       | 5,33    | 142       | Could Have  |
| [Cancelar reserva já agendada.](https://github.com/mdsreq-fga-unb/2025.1-T01-ReflexSom/issues/82)                    | 4,33    | 4,83    | 5,17    | 108       | Could Have  |
| [Emitir relatórios de reservas.](https://github.com/mdsreq-fga-unb/2025.1-T01-ReflexSom/issues/12)                   | 4,17    | 4,67    | 5,5     | 107       | Won't Have  |


<!-- | Criar painel de controle de reservas                   | 8       | 8         | 5          | 320       | Should Have | -->
---


# MVP
O Produto Mínimo Viável (MVP) do sistema Reflex Som representa a primeira entrega funcional do sistema, contendo apenas os recursos essenciais para que os clientes consigam acessar a plataforma, gerenciar seus dados, visualizar os equipamentos disponíveis e preparar uma locação. As funcionalidades foram priorizadas com base na técnica MoSCoW e ICE Scoring, considerando as necessidades básicas para uso inicial do sistema.

## Funcionalidades do MVP

- [Realizar cadastro de cliente](https://github.com/mdsreq-fga-unb/2025.1-T01-ReflexSom/issues/9)
- [Realizar login do cliente](https://github.com/mdsreq-fga-unb/2025.1-T01-ReflexSom/issues/6)
- [Realizar logoff do cliente](https://github.com/mdsreq-fga-unb/2025.1-T01-ReflexSom/issues/12)
- [Editar dados pessoais cadastrados do cliente](https://github.com/mdsreq-fga-unb/2025.1-T01-ReflexSom/issues/13)
- [Cadastrar equipamento na lista de equipamentos](https://github.com/mdsreq-fga-unb/2025.1-T01-ReflexSom/issues/26)
- [Realizar consultas de equipamentos](https://github.com/mdsreq-fga-unb/2025.1-T01-ReflexSom/issues/15)
- [Detalhar informações do equipamento](https://github.com/mdsreq-fga-unb/2025.1-T01-ReflexSom/issues/17)
- [Adicionar equipamentos ao carrinho](https://github.com/mdsreq-fga-unb/2025.1-T01-ReflexSom/issues/19)

---












<!-- # CRITÉRIOS DE PRIORIZAÇÃO

## 1. Valor de Negócio
O quanto isso contribui para os objetivos estratégicos (receita, redução de custos, satisfação do cliente)?

- **Escala de 1 a 5**:
  - 1 = Nenhum impacto visível
  - 2 = Baixo impacto
  - 3 = Impacto moderado
  - 4 = Alto impacto
  - 5 = Impacto crítico/transformador


## 2. Risco / Complexidade
Qual o nível de incerteza ou dificuldade técnica?

- **Escala de 1 a 5 (quanto menor, melhor)**:
  - 1 = Muito simples, conhecido
  - 2 = Simples, poucas dependências
  - 3 = Moderado, algum risco
  - 4 = Complexo, tecnologias novas
  - 5 = Muito complexo, risco alto


## 3. Dependências
Isso depende ou bloqueia outras iniciativas?

- **Escala de 1 a 5**:
  - 1 = Independente
  - 2 = Depende de algo menor
  - 3 = Depende de outro time/área
  - 4 = Bloqueia outras entregas importantes
  - 5 = Crítico para uma cadeia de entregas


## 4. Impacto no Usuário Final
Quão perceptível e positiva será essa entrega para o usuário?

- **Escala de 1 a 5**:
  - 1 = Usuário não percebe
  - 2 = Leve melhoria
  - 3 = Boa melhoria de usabilidade
  - 4 = Grande impacto na experiência
  - 5 = Transformação significativa

--- -->