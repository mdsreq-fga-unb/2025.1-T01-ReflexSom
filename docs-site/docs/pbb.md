# Exercício de construção do backlog usando o Product Backlog Building (PBB)

Utilizamos o Product Backlog Building (PBB) para construir o Product Backlog da HealthNet, uma rede abrangente de clínicas e hospitais distribuídos por diversos estados, que atualmente enfrenta desafios significativos na gestão integrada de seus dados e processos clínicos.


---

## Backlog de Produto


| **N°** | **História de Usuário** | **Épico**  |
| ------ | ----------------------- | ---------- |
| US01      | Como Maria (recepcionista), quero buscar o histórico de um paciente pelo CPF, para agilizar o atendimento na recepção.                                 | **1. Unificar prontuário eletrônico**  |
| US02      | Como Dr. João, quero acessar todo o histórico clínico de um paciente, mesmo que ele tenha passado por outra unidade, para tomar decisões mais seguras. |   |
| US03      | Como Dr. João, quero visualizar exames, laudos e receitas anteriores em um único lugar, para ter contexto clínico completo.                            |   |
| US04      | Como Clara (paciente), quero poder visualizar meu histórico médico pelo portal do paciente, para acompanhar minha saúde.                               |   |
| US05      | Como Roberto (diretor de TI), quero garantir que todos os acessos ao prontuário sejam auditáveis, para manter a conformidade com a LGPD.               |   |
| US06      | Como Rafael (coordenador), quero visualizar a agenda de todos os médicos e especialistas em uma única interface, para evitar conflitos de horários.    | **2. Unificar o sistema de agendamento** |
| US07      | Como Maria, quero agendar múltiplas especialidades para um paciente em sequência, sem ter que reiniciar o processo.                                    |  |
| US08      | Como Clara, quero agendar e reagendar consultas online, para evitar ligações e deslocamentos.                                           |  |
| US09      | Como Clara, quero receber notificações por SMS ou e-mail sobre minhas consultas, para não me esquecer dos compromissos.                               |  |
| US10     | Como Roberto, quero que os dados de agendamento estejam sincronizados em tempo real entre unidades, para garantir consistência.                        |  |
| US11     | Como Dr. João, quero prescrever medicamentos digitalmente, para facilitar e registrar os tratamentos.                                                  | **3. Digitalizar a prescrição médica**        |
| US12     | Como Dr. João, quero receber alertas de interações medicamentosas ao prescrever, para evitar riscos ao paciente.                                       |         |
| US13     | Como Lívia (farmacêutica), quero receber prescrições digitalmente e de forma legível, para minimizar erros na dispensação.                             |         |
| US14     | Como Lívia, quero confirmar que um medicamento foi entregue ao paciente, para manter o controle de estoque e registro.                                 |         |
| US15     | Como Clara, quero receber lembretes das medicações que devo tomar, para seguir corretamente meu tratamento.                                            |         |
| US16     | Como Clara, quero acessar meus resultados de exames no portal, para acompanhar minha evolução.                                                         | **4. Portal do Paciente**               |
| US17     | Como Clara, quero verificar meu histórico de consultas, diagnósticos e receitas anteriores, para me manter informada.                                  |                |
| US18     | Como Clara, quero atualizar meus dados de contato e endereço pelo portal, para garantir que minhas informações estejam corretas.                       |                |
| US19     | Como Clara, quero visualizar a lista de medicamentos em uso, para evitar duplicidade ou erro.                                                          |                |
| US20     | Como Roberto, quero monitorar o desempenho do sistema em tempo real, para evitar interrupções.                                                         | **5. Infraestrutura e Conformidade**    |
| US21     | Como Roberto, quero gerar relatórios de auditoria sobre acessos aos prontuários, para manter a conformidade com normas legais.                         |     |
| US22     | Como Roberto, quero aplicar atualizações sem interromper o serviço nas unidades, para garantir continuidade.                                           |     |
| US23     | Como Roberto, quero contar com suporte técnico automatizado e escalável, para resolver incidentes rapidamente.                                         |     |

---

## Priorização dos PBI's

Após a definição dos PBIs, realizamos a priorização utilizando o método **COORG**, que combina a frequência de uso e o valor de negócio de cada item. Os PBIs mais prioritários foram posicionados no topo do backlog, enquanto os de menor prioridade ficaram na base.

---
### Critérios de Priorização

**Frequência de Uso**
Refere-se à regularidade com que o PBI é utilizado pelos usuários.

Escala de valores:

* **Hora a hora (5):** utilizado várias vezes ao dia.
* **Diário (4):** utilizado ao menos uma vez por dia.
* **Semanal (3):** utilizado uma a três vezes por semana.
* **Mensal (2):** utilizado uma ou poucas vezes ao mês.
* **Trimestral (1):** utilizado, pelo menos, uma vez a cada três meses.


**Valor de Negócio**
Indica o impacto que o PBI gera para o negócio quando é utilizado.

Escala de valores:

* **Alto (3):** essencial e de alto impacto para os objetivos do negócio.
* **Médio (2):** relevante, mas com impacto intermediário.
* **Baixo (1):** útil, mas com impacto limitado no contexto atual.

> **Prioridade final = Frequência de Uso + Valor de Negócio**

---

### Priorização das Histórias de Usuários

#### Unificar Prontuário Eletrônico
- Buscar histórico pelo CPF: 5 + 3 = 8 (**US01**)
- Acessar histórico de outras unidades: 5 + 3 = 8 (**US02**)
- Visualizar exames, laudos e receitas anteriores: 5 + 3 = 8 (**US03**)
- Visualizar histórico médico no portal do paciente: 3 + 2 = 5 (**US04**)
- Garantir auditabilidade dos acessos (LGPD): 2 + 3 = 5 (**US05**)

#### Unificar Sistema de Agendamento
- Visualizar agenda de médicos e especialistas: 4 + 3 = 7 (**US06**)
- Agendar múltiplas especialidades em sequência: 3 + 2 = 5 (**US07**)
- Agendar e reagendar consultas online: 3 + 2 = 5 (**US08**)
- Receber notificações sobre consultas: 3 + 2 = 5 (**US09**)
- Sincronizar dados de agendamento entre unidades: 2 + 2 = 4 (**US10**)

#### Digitalizar a Prescrição Médica
- Prescrever medicamentos digitalmente: 5 + 3 = 8 (**US11**)
- Alertas de interações medicamentosas: 5 + 3 = 8 (**US12**)
- Receber prescrições digitalmente na farmácia: 4 + 3 = 7 (**US13**)
- Confirmar entrega de medicamento ao paciente: 4 + 2 = 6 (**US14**)
- Lembretes de medicação para o paciente: 4 + 2 = 6 (**US15**)

#### Portal do Paciente
- Ver histórico de consultas, diagnósticos e receitas: 3 + 2 = 5 (**US17**)
- Acessar resultados de exames: 3 + 2 = 5 (**US16**)
- Atualizar dados cadastrais: 2 + 2 = 4 (**US18**)

#### Infraestrutura e Conformidade
- Monitorar desempenho do sistema: 3 + 2 = 5 (**US20**)
- Gerar relatórios de auditoria: 2 + 2 = 4 (**US21**)
- Atualizações sem interrupção: 2 + 2 = 4 (**US22**)
- Suporte técnico automatizado e escalável: 2 + 2 = 4 (**US23**)


---

## Critérios de aceitação  

Critérios de aceitação das 23 histórias de usuário priorizadas.

| Nº    | História de Usuário | Critérios de Aceitação |
|-------|----------------------|-------------------------|
| US01  | Como Maria (recepcionista), quero buscar o histórico de um paciente pelo CPF, para agilizar o atendimento na recepção. | - Permitir busca por CPF com retorno em tempo real<br>- Exibir dados clínicos básicos e últimos atendimentos<br>- Garantir que apenas usuários autorizados realizem a busca |
| US02  | Como Dr. João, quero acessar todo o histórico clínico de um paciente, mesmo que ele tenha passado por outra unidade, para tomar decisões mais seguras. | - Unificar histórico entre unidades<br>- Garantir acesso apenas a profissionais autorizados<br>- Exibir linha do tempo dos atendimentos por unidade |
| US03  | Como Dr. João, quero visualizar exames, laudos e receitas anteriores em um único lugar, para ter contexto clínico completo. | - Disponibilizar exames, laudos e receitas em ordem cronológica<br>- Agrupar por tipo e data<br>- Permitir download e visualização em PDF |
| US11  | Como Dr. João, quero prescrever medicamentos digitalmente, para facilitar e registrar os tratamentos. | - Permitir prescrição via sistema com assinatura digital<br>- Integrar com o prontuário eletrônico do paciente<br>- Armazenar prescrições de forma segura e acessível |
| US12  | Como Dr. João, quero receber alertas de interações medicamentosas ao prescrever, para evitar riscos ao paciente. | - Exibir alerta em tempo real ao inserir combinação de medicamentos<br>- Mostrar descrição do risco e alternativa segura<br>- Impedir envio da prescrição até revisão pelo médico |
| US06  | Como Rafael (coordenador), quero visualizar a agenda de todos os médicos e especialistas em uma única interface, para evitar conflitos de horários. | - Exibir agendas integradas em calendário semanal/mensal<br>- Permitir filtros por especialidade ou profissional<br>- Indicar conflitos de horário com alertas visuais |
| US13  | Como Lívia (farmacêutica), quero receber prescrições digitalmente e de forma legível, para minimizar erros na dispensação. | - Integrar farmácia ao módulo de prescrição digital<br>- Exibir prescrições com nome do médico, CRM e assinatura digital<br>- Impedir prescrições incompletas ou ambíguas |
| US04  | Como Clara (paciente), quero poder visualizar meu histórico médico pelo portal do paciente, para acompanhar minha saúde. | - Exibir histórico de forma segura após login autenticado<br>- Listar atendimentos, diagnósticos e prescrições<br>- Permitir exportar dados em PDF |
| US05  | Como Roberto (diretor de TI), quero garantir que todos os acessos ao prontuário sejam auditáveis, para manter a conformidade com a LGPD. | - Registrar data, hora, usuário e motivo do acesso<br>- Armazenar logs por tempo definido em política de conformidade<br>- Disponibilizar relatórios de auditoria sob demanda |
| US07  | Como Maria, quero agendar múltiplas especialidades para um paciente em sequência, sem ter que reiniciar o processo. | - Permitir seleção de múltiplas especialidades no mesmo fluxo<br>- Visualizar horários disponíveis em sequência<br>- Confirmar agendamento conjunto ao final |
| US08  | Como Clara, quero agendar e reagendar consultas online, para evitar ligações e deslocamentos. | - Permitir login e acesso à agenda disponível<br>- Confirmar agendamento com envio de comprovante por e-mail<br>- Possibilitar reagendamento com cancelamento automático do anterior |
| US09  | Como Clara, quero receber notificações por SMS ou e-mail sobre minhas consultas, para não me esquecer dos compromissos. | - Enviar notificações automáticas com antecedência configurável<br>- Permitir opção de canal (SMS, e-mail)<br>- Confirmar envio com registro no histórico do paciente |
| US14  | Como Lívia, quero confirmar que um medicamento foi entregue ao paciente, para manter o controle de estoque e registro. | - Registrar data, hora e responsável pela entrega<br>- Vincular entrega à prescrição específica<br>- Atualizar estoque automaticamente após confirmação |
| US15  | Como Clara, quero receber lembretes das medicações que devo tomar, para seguir corretamente meu tratamento. | - Permitir cadastro de horários de medicação<br>- Enviar lembretes por SMS, e-mail ou notificação push<br>- Permitir confirmação de dose tomada |
| US17  | Como Clara, quero verificar meu histórico de consultas, diagnósticos e receitas anteriores, para me manter informada. | - Listar cronologicamente consultas, diagnósticos e prescrições<br>- Permitir download em formato PDF<br>- Proteger acesso via autenticação segura |
| US16  | Como Clara, quero acessar meus resultados de exames no portal, para acompanhar minha evolução. | - Listar exames com data, tipo e profissional responsável<br>- Permitir download do laudo em PDF<br>- Notificar o paciente quando o exame estiver disponível |
| US10  | Como Roberto, quero que os dados de agendamento estejam sincronizados em tempo real entre unidades, para garantir consistência. | - Atualizar agendamentos em tempo real em todas as unidades<br>- Garantir consistência entre sistemas distribuídos<br>- Registrar falhas de sincronização e gerar alertas |
| US18  | Como Clara, quero atualizar meus dados de contato e endereço pelo portal, para garantir que minhas informações estejam corretas. | - Exibir dados atuais com opção de edição<br>- Validar campos obrigatórios (ex: e-mail, CEP)<br>- Confirmar alterações via e-mail ou SMS |
| US19  | Como Clara, quero visualizar a lista de medicamentos em uso, para evitar duplicidade ou erro. | - Listar medicamentos ativos com posologia e data de início<br>- Indicar se o medicamento foi prescrito digitalmente<br>- Exibir alertas de possíveis interações medicamentosas |
| US20  | Como Roberto, quero monitorar o desempenho do sistema em tempo real, para evitar interrupções. | - Exibir dashboard com métricas de desempenho (tempo de resposta, uptime, etc.)<br>- Gerar alertas em caso de falhas ou lentidão<br>- Registrar histórico de métricas para análise |
| US21  | Como Roberto, quero gerar relatórios de auditoria sobre acessos aos prontuários, para manter a conformidade com normas legais. | - Permitir filtro por período, usuário, paciente ou unidade<br>- Exportar relatórios em PDF ou Excel<br>- Garantir rastreabilidade completa de cada acesso |
| US22  | Como Roberto, quero aplicar atualizações sem interromper o serviço nas unidades, para garantir continuidade. | - Permitir atualizações em modo hot-swap (sem downtime)<br>- Garantir rollback automático em caso de falha<br>- Notificar administradores sobre janelas de manutenção |
| US23  | Como Roberto, quero contar com suporte técnico automatizado e escalável, para resolver incidentes rapidamente. | - Implementar chatbot para suporte inicial<br>- Escalonar automaticamente chamados urgentes para humanos<br>- Integrar sistema de chamados com histórico e SLA |


