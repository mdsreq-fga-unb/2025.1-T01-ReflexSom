# REQUISITOS FUNCIONAIS
Para um maior detalhamento dos requisitos, [clique aqui para acessar o GitProject](https://github.com/orgs/mdsreq-fga-unb/projects/64/views/2).

- [Realizar cadastro do cliente.](https://github.com/mdsreq-fga-unb/2025.1-T01-ReflexSom/issues/9)
- [Realizar login do cliente.](https://github.com/mdsreq-fga-unb/2025.1-T01-ReflexSom/issues/6)
- [Realizar logoff do cliente.](https://github.com/mdsreq-fga-unb/2025.1-T01-ReflexSom/issues/12)
- [Editar os dados pessoais cadastrados do cliente.](https://github.com/mdsreq-fga-unb/2025.1-T01-ReflexSom/issues/13)
- [Adicionar equipamentos ao carrinho.](https://github.com/mdsreq-fga-unb/2025.1-T01-ReflexSom/issues/19)
- [Remover equipamentos do carrinho.](https://github.com/mdsreq-fga-unb/2025.1-T01-ReflexSom/issues/20)
- [Detalhar informações do equipamento.](https://github.com/mdsreq-fga-unb/2025.1-T01-ReflexSom/issues/17)
- [Exibir histórico de reservas do cliente.](https://github.com/mdsreq-fga-unb/2025.1-T01-ReflexSom/issues/22)
- [Criar orçamento de uma reserva.](https://github.com/mdsreq-fga-unb/2025.1-T01-ReflexSom/issues/24)
- [Emitir relatórios de reservas.]
- [Aprovar reserva solicitada.]
- [Realizar consulta de equipamentos.](https://github.com/mdsreq-fga-unb/2025.1-T01-ReflexSom/issues/29)
- [Consultar agenda de eventos.](https://github.com/mdsreq-fga-unb/2025.1-T01-ReflexSom/issues/30)
- [Cancelar reserva já agendada.](https://github.com/mdsreq-fga-unb/2025.1-T01-ReflexSom/issues/31)
- [Cadastrar equipamento na lista de equipamentos.]
- [Remover equipamento da lista de equipamentos.]



---
# REQUISITOS NÃO FUNCIONAIS #

## URPS+

| Usabilidade |Confiabilidade | Performance | Suportabilidade |
|-----------------------------------------------------------------------------|--------------------------------------------------------------------------------------------------|-----------------------------------------------------------------------------------------------------------|--------------------------------------------------------------------------------------------------------|
| Exibir uma confirmação visual (como mensagem ou alerta na tela) sempre que uma ação for concluída com sucesso, como envio de orçamento ou reserva de equipamento.  | Estar disponível pelo menos 99% do tempo, exceto em manutenções programadas.                    | O site deve carregar completamente em menos de 3 segundos.                            | A arquitetura deve permitir a inclusão de novos módulos sem impactar o funcionamento dos módulos existentes.          |
| A interface deve guiar o usuário por etapas na seleção de equipamentos. | Permitir mais de uma tentativa em caso de falha de envio de propostas.                          | A busca por equipamentos deve responder em menos de 1 segundo com até 1000 itens no catálogo.            |        |
|                                                                             | Registrar automaticamente logs de erro e falhas, contendo informações como data e hora, nível de severidade e mensagem de erro descritivo.   | A plataforma deve suportar 50 usuários ativos simultâneos.                  |                                                                                                        |
|                                                                             | Ser possível realizar backup automático periódico de todos os dados (clientes, orçamentos, contratos, equipamentos) a cada 24 horas.          | Relatórios e orçamentos devem ser gerados em tempo real sem bloqueio da interface.                      |                                                                                                        |


## FRAMEWORK SOMMERVILLE

### Requisitos de Produto

| Espaço                                                                                           | Portabilidade                                                                                         |
|--------------------------------------------------------------------------------------------------|--------------------------------------------------------------------------------------------------------|
| O sistema deve suportar, inicialmente, no mínimo 100 GB de armazenamento, com possibilidade de expansão futura. |  A aplicação deve ser compatível com os principais navegadores web modernos (Chrome, Firefox, Safari, Edge). |
| Os arquivos enviados devem ter limite por tipo (ex: 10 MB para imagens, 50 MB para vídeos).       |

### Requisitos Organizacionais

| Padrões de Desenvolvimento                                                       | Manutenibilidade                                                                 | Documentação                                                                                 |
|-----------------------------------------------------------------------------------|----------------------------------------------------------------------------------|---------------------------------------------------------------------------------------------|
| O sistema deve ser desenvolvido utilizando Django para o backend e React para o frontend. | O sistema deve ser modular e permitir manutenção com impacto mínimo em outros módulos. | A documentação técnica deve estar atualizada e armazenada em repositório acessível à equipe. |
|                                                                                   | Todo código novo deve incluir testes automatizados e ser aprovado em pull requests. |                                                                                             |


### Requisitos Externos

| Regulatórios / Legais | Interoperabilidade | Éticos |
|----------------------------------------------------------------------------------------|------------------------------------------------------------------------------------------------------|--------------------------------------------------------------------------------------------------------|
| Dados pessoais dos clientes devem ser armazenados de forma segura e com consentimento explícito. | A arquitetura do sistema deve permitir integrações futuras via API, como gateways de pagamento ou CRMs externos.  | Nenhum dado pessoal do cliente pode ser utilizado para fins de marketing sem consentimento.           |
|  |                         |        


---
