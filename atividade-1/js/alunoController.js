class AlunoController {

    constructor() {
        this.alunos = [];
        this.indiceEdicao = null;
        this.init();
    }

    init() {
        const controller = this;

        document.getElementById("btnCadastrar").addEventListener("click", function (event) {
            event.preventDefault();
            controller.salvar();
        });

        document.getElementById("btnCancelar").addEventListener("click", function () {
            controller.limparFormulario();
            console.log("Edição cancelada.");
        });

        document.getElementById("btnAprovados").addEventListener("click", () => this.relatorioAprovados());
        document.getElementById("btnMediaNotas").addEventListener("click", () => this.relatorioMediaNotas());
        document.getElementById("btnMediaIdades").addEventListener("click", () => this.relatorioMediaIdades());
        document.getElementById("btnOrdemAlfabetica").addEventListener("click", () => this.relatorioOrdemAlfabetica());
        document.getElementById("btnPorCurso").addEventListener("click", () => this.relatorioPorCurso());

        this.listar();
    }

    lerFormulario() {
        const nome = document.getElementById("nome").value.trim();
        const idade = parseInt(document.getElementById("idade").value);
        const curso = document.getElementById("curso").value;
        const notaFinal = parseFloat(document.getElementById("notaFinal").value);

        return new Aluno(nome, idade, curso, notaFinal);
    }

    salvar() {
        const formulario = document.getElementById("formAluno");

        if (!formulario.reportValidity()) {
            return;
        }

        const aluno = this.lerFormulario();

        if (this.indiceEdicao === null) {
            this.alunos.push(aluno);
            console.log("Aluno cadastrado:", aluno.toString());
            alert(`Aluno ${aluno.nome} cadastrado com sucesso!`);
        } else {
            this.alunos[this.indiceEdicao] = aluno;
            console.log("Aluno editado:", aluno.toString());
            alert(`Aluno ${aluno.nome} editado com sucesso!`);
        }

        this.limparFormulario();
        this.listar();
    }

    editar(indice) {
        const aluno = this.alunos[indice];

        document.getElementById("nome").value = aluno.nome;
        document.getElementById("idade").value = aluno.idade;
        document.getElementById("curso").value = aluno.curso;
        document.getElementById("notaFinal").value = aluno.notaFinal;

        this.indiceEdicao = indice;
        document.getElementById("tituloFormulario").textContent = "Editar Aluno";
        document.getElementById("btnCadastrar").value = "Salvar alterações";
        document.getElementById("btnCancelar").hidden = false;

        console.log("Editando aluno:", aluno.toString());
    }

    excluir(indice) {
        const aluno = this.alunos[indice];

        if (!confirm(`Deseja realmente excluir o aluno ${aluno.nome}?`)) {
            return;
        }

        this.alunos = this.alunos.filter((a, i) => i !== indice);

        if (this.indiceEdicao === indice) {
            this.limparFormulario();
        } else if (this.indiceEdicao !== null && this.indiceEdicao > indice) {
            this.indiceEdicao--;
        }

        console.log("Aluno excluído:", aluno.toString());
        alert(`Aluno ${aluno.nome} excluído com sucesso!`);
        this.listar();
    }

    limparFormulario() {
        document.getElementById("formAluno").reset();
        this.indiceEdicao = null;
        document.getElementById("tituloFormulario").textContent = "Cadastro de Alunos";
        document.getElementById("btnCadastrar").value = "Cadastrar";
        document.getElementById("btnCancelar").hidden = true;
    }

    listar() {
        const tbody = document.getElementById("tabelaAlunos");
        tbody.innerHTML = "";

        if (this.alunos.length === 0) {
            const tr = tbody.insertRow();
            const td = tr.insertCell();
            td.colSpan = 6;
            td.textContent = "Nenhum aluno cadastrado.";
            return;
        }

        const controller = this;

        this.alunos.forEach((aluno, indice) => {
            const tr = tbody.insertRow();

            tr.insertCell().textContent = aluno.nome;
            tr.insertCell().textContent = aluno.idade;
            tr.insertCell().textContent = aluno.curso;
            tr.insertCell().textContent = aluno.notaFinal.toFixed(1);
            tr.insertCell().textContent = aluno.isAprovado() ? "Aprovado" : "Reprovado";

            const tdAcoes = tr.insertCell();

            const btnEditar = document.createElement("input");
            btnEditar.type = "button";
            btnEditar.value = "Editar";
            btnEditar.addEventListener("click", function () {
                controller.editar(indice);
            });

            const btnExcluir = document.createElement("input");
            btnExcluir.type = "button";
            btnExcluir.value = "Excluir";
            btnExcluir.addEventListener("click", function () {
                controller.excluir(indice);
            });

            tdAcoes.append(btnEditar, " ", btnExcluir);
        });
    }

    exibirRelatorio(titulo, linhas) {
        const div = document.getElementById("resultadoRelatorio");
        div.innerHTML = "";

        const h5 = document.createElement("h5");
        h5.textContent = titulo;
        div.appendChild(h5);

        if (this.alunos.length === 0) {
            const p = document.createElement("p");
            p.textContent = "Nenhum aluno cadastrado.";
            div.appendChild(p);
            return;
        }

        const ul = document.createElement("ul");
        linhas.forEach((linha) => {
            const li = document.createElement("li");
            li.textContent = linha;
            ul.appendChild(li);
        });
        div.appendChild(ul);
    }

    relatorioAprovados() {
        const aprovados = this.alunos
            .filter((aluno) => aluno.isAprovado())
            .map((aluno) => `${aluno.nome} - Nota ${aluno.notaFinal.toFixed(1)}`);

        this.exibirRelatorio(
            `Alunos aprovados (${aprovados.length})`,
            aprovados.length > 0 ? aprovados : ["Nenhum aluno aprovado."]
        );
    }

    relatorioMediaNotas() {
        const soma = this.alunos.reduce((total, aluno) => total + aluno.notaFinal, 0);
        const media = this.alunos.length > 0 ? soma / this.alunos.length : 0;

        this.exibirRelatorio("Média das notas finais", [`Média: ${media.toFixed(2)}`]);
    }

    relatorioMediaIdades() {
        const soma = this.alunos.reduce((total, aluno) => total + aluno.idade, 0);
        const media = this.alunos.length > 0 ? soma / this.alunos.length : 0;

        this.exibirRelatorio("Média das idades", [`Média: ${media.toFixed(1)} anos`]);
    }

    relatorioOrdemAlfabetica() {
        const nomes = this.alunos
            .map((aluno) => aluno.nome)
            .sort((a, b) => a.localeCompare(b, "pt-BR"));

        this.exibirRelatorio("Alunos em ordem alfabética", nomes);
    }

    relatorioPorCurso() {
        const porCurso = this.alunos.reduce((contagem, aluno) => {
            contagem[aluno.curso] = (contagem[aluno.curso] || 0) + 1;
            return contagem;
        }, {});

        const linhas = [];
        Object.keys(porCurso).forEach((curso) => {
            linhas.push(`${curso}: ${porCurso[curso]} aluno(s)`);
        });

        this.exibirRelatorio("Quantidade de alunos por curso", linhas);
    }
}

const alunoController = new AlunoController();
