# Exercício de construção de um caso de uso do estudo de caso HopeBridge

<iframe width="768" height="432" src="https://miro.com/app/live-embed/uXjVIhik4zs=/?embedMode=view_only_without_ui&moveToViewport=-547,-253,1092,505&embedId=162891833483" frameborder="0" scrolling="no" allow="fullscreen; clipboard-read; clipboard-write" allowfullscreen></iframe>

---

# Especificação casos de uso

## Caso de uso 1: **anunciar oportunidades profissionais**

Aluno: André Gustavo

### 1. Breve Descrição

Este caso de uso descreve o processo pelo qual um empregador parceiro acessa a plataforma HopeBridge para anunciar vagas de emprego ou programas de capacitação profissional voltados aos refugiados palestinos. O objetivo é permitir que oportunidades econômicas sejam registradas no sistema e posteriormente recomendadas aos usuários com perfis compatíveis.


### 2. Fluxo Básico de Eventos

**Ator Primário:** Empregador Parceiro

1) O caso de uso inicia quando o empregador parceiro acessa a plataforma HopeBridge com credenciais válidas.

2) O sistema autentica o empregador e apresenta o painel de administração.

3) O empregador seleciona a opção “Anunciar Oportunidade Profissional”.

4) O sistema exibe um formulário com os seguintes campos:

* Tipo de oportunidade (emprego, capacitação ou projeto comunitário);

* Descrição da vaga/curso;

* Localização;

* Pré-requisitos;

* Horário e duração;

* Quantidade de vagas;

* Contato para entrevista ou matrícula.


5) O empregador preenche o formulário e submete os dados.

6) O sistema valida os dados e registra a oportunidade na base de dados.

7) O sistema disponibiliza a vaga na plataforma, vinculando-a a perfis de usuários compatíveis.

8) O sistema apresenta uma confirmação ao empregador sobre o sucesso do anúncio.


### 3. Fluxos Alternativos

#### 3.1 Preenchimento de Dados

##### 3.1.1 A1 – Inclusão de anexos opcionais

* O empregador pode anexar documentos ou imagens complementares à descrição da vaga.
* O sistema armazena os anexos junto ao anúncio.

##### 3.1.2 A2 – Reutilização de anúncios anteriores

* O empregador pode optar por reutilizar uma oportunidade já cadastrada anteriormente.
* O sistema carrega os dados do anúncio anterior, permitindo edição antes da publicação.


### 4. Fluxos de Exceção

#### 4.1 FE1 – Dados inválidos no formulário

* O sistema detecta dados inconsistentes ou ausentes (ex.: campos obrigatórios não preenchidos).
* O sistema destaca os campos com erro e solicita correção ao empregador.
* O fluxo retorna ao passo 5 do Fluxo Básico.

#### 4.2 FE2 – Falha na comunicação com o servidor

* Caso a conexão com o servidor falhe na hora de enviar o formulário, o sistema salva os dados localmente (modo offline).
* O empregador é notificado de que a submissão será concluída automaticamente quando a conexão for restabelecida.


### 5. Pré-Condições

5.1 O empregador já está registrado e autenticado na plataforma.

5.2 O empregador possui permissões válidas para anunciar oportunidades.


### 6. Pós-Condições

6.1 A nova oportunidade profissional está registrada no sistema e disponível para consulta por usuários compatíveis.

6.2 O empregador pode visualizar, editar ou remover o anúncio posteriormente.


### 7. Pontos de Extensão

7.1 Notificações automáticas

* Local: Após o passo 7 do Fluxo Básico
* Definição: O sistema pode notificar refugiados com perfis compatíveis via notificações push ou mensagens internas.


### 8. Requisitos Especiais

8.1 A plataforma deve oferecer suporte multilíngue (mínimo: árabe e inglês) para o preenchimento do formulário.

8.2 O sistema deve garantir que os dados dos anúncios sejam armazenados de forma segura e conforme normas de proteção de dados.

8.3 O sistema deve funcionar em modo offline, permitindo a criação e posterior envio do anúncio sem conexão ativa.


### 9. Informações Adicionais

* Este caso de uso contribui diretamente para o objetivo específico 3 ("Criar oportunidades econômicas") e o objetivo do aplicativo de “Criar Conexões de Trabalho e Capacitação”.
* Diagramas auxiliares recomendados:

  * Diagrama de Atividades para mostrar o processo passo a passo.
  * Diagrama de Caso de Uso com a associação entre Empregador e "Anunciar Oportunidade Profissional".

---

## Caso de uso 2: **Agendar Consultas Médicas**

Aluno: Davi Mesquita

### 1.1 Breve Descrição  
Este caso de uso permite que um refugiado agende uma consulta médica por meio da plataforma HopeBridge, com base em sua localização e nas especialidades disponíveis.

### 1.2 Atores  
- Refugiado

---

## 2. Fluxo de Eventos

### 2.1 Fluxo Principal  
1. O usuário acessa a opção "Agendar Consulta Médica" no menu de serviços.  
2. O sistema solicita a localização atual do usuário.  
3. O usuário informa sua localização ou permite acesso via GPS.  
4. O sistema exibe uma lista de unidades de saúde próximas e suas especialidades.  
5. O usuário seleciona uma unidade de saúde.  
6. O sistema apresenta os horários disponíveis para agendamento.  
7. O usuário seleciona um horário e confirma o agendamento.  
8. O sistema valida a disponibilidade e confirma a consulta.  
9. O sistema exibe uma mensagem de sucesso.  
10. O caso de uso é encerrado.

### 2.2 Fluxos de Exceção  
- **[FE01] Falha na geolocalização:** Se o GPS estiver indisponível, o usuário pode inserir a localização manualmente (retorna ao passo 3).  
- **[FE02] Horário indisponível:** Se o horário escolhido estiver ocupado, o sistema informa o usuário e permite selecionar outro.  
- **[FE03] Erro de conexão:** O sistema informa o usuário e permite tentar novamente mais tarde.

---

## 3. Requisitos Especiais  
- O agendamento deve ser acessível via dispositivos móveis.  
- A interface deve estar disponível em vários idiomas.  
- A funcionalidade deve ser compatível com conexões de baixa velocidade.

---

## 4. Regras de Negócio  
- **[RN01] Validação de disponibilidade:** O sistema deve garantir que o horário escolhido esteja realmente disponível no momento da confirmação.  
- **[RN02] Cadastro completo:** O usuário só poderá agendar se tiver preenchido as informações básicas de saúde no perfil.

---

## 5. Precondições  
- O refugiado deve estar autenticado na plataforma.  
- O perfil do usuário deve conter dados mínimos exigidos (ex: idade, sexo, histórico clínico relevante).

---

## 6. Pós-condições  
- O agendamento será registrado no histórico do usuário.  
- A unidade de saúde selecionada será notificada do agendamento.  
- O usuário poderá visualizar, alterar ou cancelar a consulta posteriormente.

---


## Caso de uso 3: Organizar Entrevistas

Aluna: Clara

### 1. Breve Descrição

Este caso de uso descreve o processo pelo qual um **empregador parceiro** utiliza a plataforma **HopeBridge** para **organizar entrevistas com refugiados** que se candidataram a oportunidades de emprego ou capacitação. A funcionalidade permite o agendamento, envio de convites, confirmação de presença e registro do cronograma, promovendo o contato direto entre empregadores e candidatos.


### 2. Fluxo Básico de Eventos

**Ator Primário:** Empregador Parceiro

1) O caso de uso inicia quando o empregador acessa a plataforma com credenciais válidas.

2) O sistema autentica o empregador e exibe o painel de controle.

3) O empregador acessa a lista de oportunidades anunciadas.

4) O empregador seleciona uma oportunidade e visualiza a lista de candidatos interessados.

5) O empregador seleciona um ou mais candidatos para agendar entrevistas.

6) O sistema exibe um formulário de agendamento com os seguintes campos:

   * Data e horário da entrevista;
   * Local (presencial) ou link (remoto);
   * Tipo de entrevista (individual ou em grupo);
   * Observações adicionais (ex: documentos a apresentar).

7) O empregador preenche os dados e confirma o agendamento.

8) O sistema registra a entrevista e envia notificações aos refugiados selecionados.

9) Os refugiados confirmam presença ou solicitam reagendamento.

10) O sistema atualiza o status da entrevista com base nas respostas recebidas.

11) O empregador visualiza o cronograma atualizado.


### 3. Fluxos Alternativos

#### 3.1 Agendamento

##### 3.1.1 A1 – Entrevista em grupo

* O empregador seleciona vários candidatos para uma mesma sessão de entrevista.
* O sistema permite configurar um único agendamento coletivo.

##### 3.1.2 A2 – Entrevista remota

* O empregador opta por realizar a entrevista online.
* O sistema permite inserir o link da videoconferência e instruções de acesso.



### 4. Fluxos de Exceção

#### 4.1 FE1 – Refugiado não confirma presença

* Se o candidato não responder até o prazo, o sistema envia lembretes.
* Caso não haja confirmação, o empregador é notificado e pode reagendar ou cancelar a entrevista.

#### 4.2 FE2 – Conflito de horários

* Se o sistema detectar sobreposição com outro compromisso do candidato, sugere horários alternativos.
* O empregador pode ajustar a agenda ou selecionar outro candidato.


### 5. Pré-Condições

5.1 O empregador está registrado e autenticado na plataforma.
5.2 Existe pelo menos uma oportunidade publicada com candidatos interessados.


### 6. Pós-Condições

6.1 A entrevista está registrada no sistema com status atualizado (confirmada ou pendente).
6.2 Os participantes foram notificados.
6.3 O empregador tem acesso ao cronograma de entrevistas.


### 7. Pontos de Extensão

#### 7.1 Feedback pós-entrevista

**Local:** Após a realização da entrevista
**Descrição:** O sistema pode permitir ao empregador registrar um breve feedback sobre o desempenho do candidato, auxiliando futuras análises.


### 8. Requisitos Especiais

8.1 Interface multilíngue (árabe, inglês e outros idiomas conforme necessário).
8.2 Suporte a entrevistas online com campos para links externos.
8.3 Funcionalidade offline para visualização prévia dos agendamentos.
8.4 Envio de lembretes automáticos aos candidatos com pelo menos 24 horas de antecedência.


### 9. Informações Adicionais

* Este caso de uso apoia diretamente os objetivos de criar conexões de trabalho e capacitação e promover a autonomia e dignidade dos refugiados.
* Diagramas recomendados:

  * Diagrama de Caso de Uso (empregador → organizar entrevistas);
  * Diagrama de Sequência (interações entre empregador, refugiado e sistema);
  * Diagrama de Atividades (para detalhamento do processo de agendamento e confirmação).

---

## Caso de uso 4: **Acessar lista personalizada de serviços na região**

Aluno: Mateus de Castro Santos

### 1. Breve Descrição

Este caso de uso permite que o refugiado acesse uma lista de serviços em sua região para o seu bem-estar, incluindo abrigos, assistência médica, além de um detalhamento a respeito desses serviços, como horário de funcionamento, disponibilidade do serviço e capacidade de atendimento.


### 2. Fluxo Básico de Eventos

**Ator Primário:** Refugiado

1) O refugiado acessa a aba "Serviços disponíveis".

2) O sistema solicita acesso à localização atual.

3) O refugiado permite acesso à localização.

4) O sistema consulta a base de dados e filtra os serviços disponíveis na região especificada.

5) O sistema apresenta a lista de serviços.

6) O refugiado seleciona o serviço.

7) O sistema exibe os detalhes completos do serviço selecionado.

8) O caso de uso é encerrado.


### 3. Fluxos Alternativos

#### 3.1 Localização não autorizada

* O usuário não permite acesso à localização.
* O sistema exibe um campo para entrada manual da cidade/bairro.
* O usuário informa a localização desejada.
* O sistema segue para o passo 4 do Fluxo Básico.

#### 3.2 Falta de vagas

* O usuário seleciona um serviço que está sem vagas.
* O sistema exibe uma mensagem informando indisponibilidade.
* O usuário tem a opção de entrar em uma fila de espera.
* O sistema registra a solicitação e exibe confirmação.


### 4. Fluxos de Exceção

#### 4.1 FE1 – Serviços não encontrados

* O sistema não encontra serviços disponíveis na região informada.
* O sistema exibe a mensagem: "Não há serviços disponíveis na região no momento".
* O fluxo retorna ao passo 2 do Fluxo Básico.


### 5. Pré-Condições

5.1 O usuário (refugiado) deve ter acesso ao sistema (web ou aplicativo).

5.2 O sistema deve estar conectado à internet para realizar a busca por serviços.

5.3 A base de dados de serviços deve estar atualizada e acessível.


### 6. Pós-Condições

6.1 O refugiado terá acesso às informações detalhadas dos serviços disponíveis em sua região.

6.2 Caso deseje, poderá entrar na fila de espera de um serviço indisponível.

6.3 O sistema poderá armazenar as preferências ou localização informada para facilitar futuros acessos.


### 7. Requisitos Especiais

7.1 O sistema deve estar disponível em múltiplos idiomas, incluindo o idioma nativo do refugiado.


---