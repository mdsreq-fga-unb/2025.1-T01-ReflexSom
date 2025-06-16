# REQUISITOS FUNCIONAIS
Para um maior detalhamento dos requisitos, [clique aqui para acessar o GitProject](https://github.com/orgs/mdsreq-fga-unb/projects/64/views/2).

- Realizar cadastro do cliente.
- Realizar login do cliente.
- Realizar logoff do cliente.
- Editar os dados pessoais cadastrados do cliente.
- Adicionar equipamentos ao carrinho.
- Remover equipamentos do carrinho.
- Detalhar informações do equipamento.
- Exibir histórico de reservas do cliente.
- Criar orçamento de uma reserva.
- Emitir relatórios de reservas.
- Aprovar reserva solicitada.
- Realizar consulta de equipamentos.
- Consultar agenda de eventos.
- Cancelar reserva já agendada.
- Cadastrar equipamento na lista de equipamentos.
- Remover equipamento da lista de equipamentos.



---
# REQUISITOS NÃO FUNCIONAIS #

## URPS+

| Usabilidade                                                                 | Confiabilidade                                                                                  | Performance                                                                                              | Suportabilidade                                                                                      |
|-----------------------------------------------------------------------------|--------------------------------------------------------------------------------------------------|-----------------------------------------------------------------------------------------------------------|--------------------------------------------------------------------------------------------------------|
| Exibir uma confirmação visual (como mensagem ou alerta na tela) sempre que uma ação for concluída com sucesso, como envio de orçamento ou reserva de equipamento.  | Estar disponível pelo menos 99% do tempo, exceto em manutenções programadas.                    | O site deve carregar completamente em menos de 3 segundos.                            | A arquitetura deve permitir a inclusão de novos módulos sem impactar o funcionamento dos módulos existentes.          |
| A interface deve guiar o usuário por etapas na seleção de equipamentos. | Permitir mais de uma tentativa em caso de falha de envio de propostas.                          | A busca por equipamentos deve responder em menos de 1 segundo com até 1000 itens no catálogo.            | O sistema deve estar documentado com manuais técnicos para desenvolvedores (incluindo estrutura do código e APIs) e com manuais operacionais para os operadores da empresa (incluindo instruções de uso, fluxos das funcionalidades e resolução de erros comuns).       |
|                                                                             | Registrar automaticamente logs de erro e falhas, contendo informações como data e hora, nível de severidade e mensagem de erro descritivo.   | A plataforma deve suportar 50 usuários ativos simultâneos.                  |                                                                                                        |
|                                                                             | Ser possível realizar backup automático periódico de todos os dados (clientes, orçamentos, contratos, equipamentos) a cada 24 horas.          | Relatórios e orçamentos devem ser gerados em tempo real sem bloqueio da interface.                      |                                                                                                        |


## FRAMEWORK SOMMERVILLE

### Requisitos de Produto

| Espaço                                                                                           | Portabilidade                                                                                         |
|--------------------------------------------------------------------------------------------------|--------------------------------------------------------------------------------------------------------|
| O sistema deve suportar, inicialmente, no mínimo 100 GB de armazenamento, com possibilidade de expansão futura. |  A aplicação deve ser compatível com os principais navegadores web modernos (Chrome, Firefox, Safari, Edge). |
| Os arquivos enviados devem ter limite por tipo (ex: 10 MB para imagens, 50 MB para vídeos).       |  O front-end responsivo deve funcionar adequadamente em dispositivos móveis e tablets.    

### Requisitos Organizacionais

| Padrões de Desenvolvimento                                                       | Manutenibilidade                                                                 | Documentação                                                                                 |
|-----------------------------------------------------------------------------------|----------------------------------------------------------------------------------|---------------------------------------------------------------------------------------------|
| O sistema deve ser desenvolvido utilizando Django para o backend e React para o frontend. | O sistema deve ser modular e permitir manutenção com impacto mínimo em outros módulos. | A documentação técnica deve estar atualizada e armazenada em repositório acessível à equipe. |
|                                                                                   | Todo código novo deve incluir testes automatizados e ser aprovado em pull requests. |                                                                                             |


### Requisitos Externos

| Regulatórios / Legais                                                                  | Interoperabilidade                                                                                  | Éticos                                                                                                 |
|----------------------------------------------------------------------------------------|------------------------------------------------------------------------------------------------------|--------------------------------------------------------------------------------------------------------|
| O sistema deve estar em conformidade com a Lei Geral de Proteção de Dados (LGPD).     | A arquitetura do sistema deve permitir integrações futuras via API, como gateways de pagamento ou CRMs externos. | Nenhum dado pessoal do cliente pode ser utilizado para fins de marketing sem consentimento.           |
| Dados pessoais dos clientes devem ser armazenados de forma segura e com consentimento explícito. |                                                                                                      |                                                                                                        |


---
