### Estratégia Priorizada

- **Abordagem:** Híbrida  
- **Ciclo de vida:** Adaptativo  
- **Processo:** OpenUP

---

### Quadro Comparativo

| CARACTERÍSTICAS                  | OpenUP                                                                                       | DSDM (Dynamic Systems Development Method)                                                  |
|----------------------------------|-----------------------------------------------------------------------------------------------|---------------------------------------------------------------------------------------------|
| **Abordagem Geral**              | Iterativo, Incremental, ágil e centrado em arquitetura.                                      | Iterativa e incremental com foco em entrega no prazo e orçamento fixo                      |
| **Foco em Arquitetura**          | Forte ênfase na definição de arquitetura desde o início. Evolui ao longo do projeto.         | Importante, mas com menos ênfase que o OpenUP                                              |
| **Estrutura de processos**       | Quatro fases: concepção, elaboração, construção e transição.                                 | Estrutura robusta e formal, com fases e princípios bem definidos                           |
| **Flexibilidade de requisitos**  | Suporta mudanças controladas, com refinamento iterativo.                                     | Altamente flexível, priorizando requisitos essenciais                                       |
| **Colaboração com cliente**      | Envolvimento contínuo, especialmente nas fases de entrega e validação.                       | Colaboração intensa e presença constante do cliente no time                                 |
| **Complexidade do processo**     | Enxuto e menos burocrático que o RUP, ideal para equipes menores.                            | Mais complexo que outras ágeis, devido à governança                                        |
| **Qualidade técnica**            | Garantida por arquitetura clara e validações incrementais.                                   | Qualidade por princípios e revisões, menos foco técnico                                     |
| **Práticas de desenvolvimento**  | Processo abrangente, com menos foco em práticas específicas.                                 | Iterações por funcionalidades de negócio; testes e revisões regulares                      |
| **Adaptação ao projeto Reflex Som** | Bom para controle leve com foco técnico.                                                     | Excelente para prazos ajustados, mas com necessidade de entrega real                        |
| **Documentação**                 | Enxuta e suficiente. Usa artefatos mínimos (Visão, Lista de Requisitos, Casos de Uso).       | Documentação essencial e justificada por valor de negócio                                   |
| **Controle de qualidade**        | Foco em testes automatizados, revisões e validação de requisitos.                            | Revisões constantes e envolvimento do cliente garantem qualidade                            |
| **Escalabilidade**               | Indicado para projetos pequenos e médios. Pode ter limitações com equipes grandes.           | Escalável para projetos médios e grandes com governança adequada                            |
| **Suporte a equipes de desenvolvimento** | Diretrizes e papéis bem definidos.                                                       | Papéis, responsabilidades e princípios muito claros                                          |

---

### Justificativa

O **OpenUP** foi escolhido para o projeto *Reflex Som* com base nos seguintes aspectos:

#### Abordagem Iterativa e Incremental  
Permite que o sistema seja desenvolvido em etapas menores, com entregas frequentes e feedback contínuo do cliente.  
Isso é essencial para a Reflex Som, pois o sistema envolve diversos módulos (catálogo, orçamentos, logística, painel administrativo), e cada parte pode ser validada e ajustada conforme o uso real.

#### Foco em Arquitetura  
O sistema proposto exige integração entre várias funcionalidades: controle de disponibilidade, orçamentos, área do cliente e acompanhamento técnico.  
A priorização da definição da arquitetura desde o início garante escalabilidade e fácil manutenção — pontos cruciais para acompanhar o crescimento da empresa e o aumento de demandas.

#### Suporte à Colaboração com o Cliente  
A participação do cliente ao longo do projeto é fundamental para entender detalhes técnicos dos equipamentos e do fluxo de atendimento.  
A definição de papéis e práticas garante a colaboração contínua com o cliente, assegurando que o sistema atenda às expectativas.

#### Adaptação a Projetos Reais  
O OpenUP foi criado justamente para ser leve, flexível e aplicável a equipes pequenas ou médias.  
Ele permite adaptação às condições reais do projeto — por exemplo, se algum módulo for mais urgente (como o catálogo), ele pode ser priorizado nas primeiras iterações.

#### Documentação Essencial  
Embora não seja burocrático, o OpenUP mantém uma documentação mínima necessária, o que é útil para registrar os fluxos internos da empresa, configurações técnicas dos equipamentos e contratos.  
Isso ajuda especialmente no suporte técnico e na evolução futura da plataforma.

