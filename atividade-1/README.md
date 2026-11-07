# CodeCraft Academy – Gerenciamento de Alunos

Estudo de caso EC01 (escola "DevTech Academy", aqui chamada de CodeCraft Academy): sistema simples para cadastrar, listar, editar e excluir alunos, com relatórios gerados a partir dos dados cadastrados.

## Estrutura

```
├── index.html            # Página inicial (menu Bootstrap)
├── alunos.html           # Formulário, tabela e relatórios
├── js/
│   ├── aluno.js          # Classe Aluno (Exercício 2)
│   └── alunoController.js# Classe AlunoController: CRUD, eventos e relatórios
├── Dockerfile
└── docker-compose.yml
```

## Exercícios

| Exercício | Onde está |
|---|---|
| 1 – Formulário e tabela (CRUD) | `alunos.html` + métodos `salvar`, `editar`, `excluir`, `listar` do `AlunoController`. Dados guardados em memória no array `this.alunos`. |
| 2 – Classe `Aluno` | `js/aluno.js`: atributos `nome`, `idade`, `curso`, `notaFinal`, construtor, `isAprovado()` e `toString()`. |
| 3 – Eventos, funções anônimas e arrow functions | `init()` e `listar()` usam `addEventListener` com `function () {}` nos cliques; `filter`, `map`, `reduce`, `forEach` usam `=>`. Mensagens com `alert()` e `console.log()` ao salvar, editar e excluir. |
| 4 – Relatórios | Métodos `relatorioAprovados` (filter/map), `relatorioMediaNotas` e `relatorioMediaIdades` (reduce), `relatorioOrdemAlfabetica` (map/sort), `relatorioPorCurso` (reduce/forEach). |

> O formulário e a tabela seguem o pedido do Exercício 1 ("formulário HTML sem CSS"). O Bootstrap é usado apenas no menu e no layout da página.

## Como executar com Docker

Dentro da pasta `atividade-1`:

```bash
cd atividade-1
docker compose up -d --build
```

Acesse: http://localhost:8091

Para parar:

```bash
docker compose down
```

O `docker-compose.yml` monta a pasta do projeto como volume, então qualquer alteração nos arquivos aparece ao recarregar a página.
