# CodeCraft Labs – Gestão de Funcionários

Estudo de caso EC02: sistema no navegador para cadastrar, listar, editar, excluir e buscar funcionários de uma startup de tecnologia, com relatórios feitos com métodos de array (map, filter, reduce e `new Set()`).

## Estrutura

```
├── index.html                  # Página inicial (menu Bootstrap)
├── funcionarios.html           # Formulário, busca, tabela e relatórios
├── js/
│   ├── funcionario.js          # Classe Funcionario
│   └── funcionarioController.js# Classe FuncionarioController: CRUD, eventos e relatórios
├── Dockerfile
└── docker-compose.yml
```

## Exercícios

| Exercício | Onde está |
|---|---|
| 1 – Cadastro e listagem | `funcionarios.html` + classe `Funcionario` (`js/funcionario.js`) com atributos privados, construtor, getters/setters, `atualizar()` e `toString()`. Funcionários guardados no array `this.funcionarios`. |
| 2 – Excluir e alterar | Botões "Editar" e "Excluir" em cada linha, com `onclick = function () {}`. A edição carrega os dados no formulário e atualiza o objeto pelo método `atualizar()` da classe (que usa os setters). |
| 3 – Funções anônimas e lambda | Cliques com funções anônimas; `buscarPorId`, `buscarPorNome`, `adicionar`, `remover` e `atualizar` escritos como arrow functions. Acima de `buscarPorId` está a versão com função anônima tradicional para comparação. |
| 4 – Relatórios | `relatorioSalarioMaior5000` (filter + map), `relatorioMediaSalarial` (reduce), `relatorioCargosUnicos` (map + `new Set()`), `relatorioNomesMaiusculo` (map). |

## Como executar com Docker

Dentro da pasta `atividade-2`:

```bash
cd atividade-2
docker compose up -d --build
```

Acesse: http://localhost:8092

Para parar:

```bash
docker compose down
```

O `docker-compose.yml` monta a pasta do projeto como volume, então qualquer alteração nos arquivos aparece ao recarregar a página.
