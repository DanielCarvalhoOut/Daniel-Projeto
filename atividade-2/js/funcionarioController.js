class FuncionarioController {

    constructor() {
        this.funcionarios = [];
        this.idEdicao = null;
        this.init();
    }

    init() {
        const controller = this;

        document.getElementById("btnCadastrar").onclick = function (event) {
            event.preventDefault();
            controller.salvar();
        };

        document.getElementById("btnCancelar").onclick = function () {
            controller.limparFormulario();
            console.log("Edição cancelada.");
        };

        document.getElementById("btnBuscar").onclick = function () {
            const termo = document.getElementById("busca").value;
            controller.listar(controller.buscarPorNome(termo));
        };

        document.getElementById("btnLimparBusca").onclick = function () {
            document.getElementById("busca").value = "";
            controller.listar();
        };

        document.getElementById("btnSalarioMaior5000").onclick = () => this.relatorioSalarioMaior5000();
        document.getElementById("btnMediaSalarial").onclick = () => this.relatorioMediaSalarial();
        document.getElementById("btnCargosUnicos").onclick = () => this.relatorioCargosUnicos();
        document.getElementById("btnNomesMaiusculo").onclick = () => this.relatorioNomesMaiusculo();

        this.listar();
    }

    // função anônima tradicional:
    // buscarPorId(id) {
    //     return this.funcionarios.find(function (funcionario) {
    //         return funcionario.id === id;
    //     });
    // }
    // a mesma busca com arrow function:
    buscarPorId = (id) => this.funcionarios.find((funcionario) => funcionario.id === id);

    buscarPorNome = (termo) => this.funcionarios.filter((funcionario) =>
        funcionario.nome.toLowerCase().includes(termo.trim().toLowerCase()));

    adicionar = (funcionario) => this.funcionarios.push(funcionario);

    remover = (id) => {
        this.funcionarios = this.funcionarios.filter((funcionario) => funcionario.id !== id);
    };

    atualizar = (id, nome, idade, cargo, salario) => {
        const funcionario = this.buscarPorId(id);
        funcionario.atualizar(nome, idade, cargo, salario);
        return funcionario;
    };

    lerFormulario() {
        return {
            nome: document.getElementById("nome").value,
            idade: document.getElementById("idade").value,
            cargo: document.getElementById("cargo").value,
            salario: document.getElementById("salario").value
        };
    }

    salvar() {
        const formulario = document.getElementById("formFuncionario");
        if (!formulario.reportValidity()) {
            return;
        }

        const { nome, idade, cargo, salario } = this.lerFormulario();

        if (this.idEdicao === null) {
            const funcionario = new Funcionario(nome, idade, cargo, salario);
            this.adicionar(funcionario);
            console.log("Funcionário cadastrado:", funcionario.toString());
            alert(`Funcionário ${funcionario.nome} cadastrado com sucesso!`);
        } else {
            const funcionario = this.atualizar(this.idEdicao, nome, idade, cargo, salario);
            console.log("Funcionário editado:", funcionario.toString());
            alert(`Funcionário ${funcionario.nome} atualizado com sucesso!`);
        }

        this.limparFormulario();
        this.listar();
    }

    editar(id) {
        const funcionario = this.buscarPorId(id);

        document.getElementById("nome").value = funcionario.nome;
        document.getElementById("idade").value = funcionario.idade;
        document.getElementById("cargo").value = funcionario.cargo;
        document.getElementById("salario").value = funcionario.salario;

        this.idEdicao = id;
        document.getElementById("tituloFormulario").textContent = `Editar Funcionário (ID ${id})`;
        document.getElementById("btnCadastrar").value = "Salvar alterações";
        document.getElementById("btnCancelar").hidden = false;

        console.log("Editando funcionário:", funcionario.toString());
    }

    excluir(id) {
        const funcionario = this.buscarPorId(id);

        if (!confirm(`Deseja realmente excluir o funcionário ${funcionario.nome}?`)) {
            return;
        }

        this.remover(id);

        if (this.idEdicao === id) {
            this.limparFormulario();
        }

        console.log("Funcionário excluído:", funcionario.toString());
        alert(`Funcionário ${funcionario.nome} excluído com sucesso!`);
        this.listar();
    }

    limparFormulario() {
        document.getElementById("formFuncionario").reset();
        this.idEdicao = null;
        document.getElementById("tituloFormulario").textContent = "Cadastro de Funcionários";
        document.getElementById("btnCadastrar").value = "Cadastrar";
        document.getElementById("btnCancelar").hidden = true;
    }

    listar(lista = this.funcionarios) {
        const tbody = document.getElementById("tabelaFuncionarios");
        tbody.innerHTML = "";

        if (lista.length === 0) {
            const td = tbody.insertRow().insertCell();
            td.colSpan = 6;
            td.textContent = this.funcionarios.length === 0
                ? "Nenhum funcionário cadastrado."
                : "Nenhum funcionário encontrado.";
            return;
        }

        const controller = this;

        lista.forEach((funcionario) => {
            const tr = tbody.insertRow();

            tr.insertCell().textContent = funcionario.id;
            tr.insertCell().textContent = funcionario.nome;
            tr.insertCell().textContent = funcionario.idade;
            tr.insertCell().textContent = funcionario.cargo;
            tr.insertCell().textContent = funcionario.salarioFormatado();

            const btnEditar = document.createElement("input");
            btnEditar.type = "button";
            btnEditar.value = "Editar";
            btnEditar.onclick = function () {
                controller.editar(funcionario.id);
            };

            const btnExcluir = document.createElement("input");
            btnExcluir.type = "button";
            btnExcluir.value = "Excluir";
            btnExcluir.onclick = function () {
                controller.excluir(funcionario.id);
            };

            tr.insertCell().append(btnEditar, " ", btnExcluir);
        });
    }

    exibirRelatorio(titulo, linhas) {
        const div = document.getElementById("resultadoRelatorio");
        div.innerHTML = "";

        const h5 = document.createElement("h5");
        h5.textContent = titulo;
        div.appendChild(h5);

        if (this.funcionarios.length === 0) {
            linhas = ["Nenhum funcionário cadastrado."];
        }

        const ul = document.createElement("ul");
        linhas.forEach((linha) => {
            const li = document.createElement("li");
            li.textContent = linha;
            ul.appendChild(li);
        });
        div.appendChild(ul);
    }

    relatorioSalarioMaior5000() {
        const lista = this.funcionarios
            .filter((funcionario) => funcionario.salario > 5000)
            .map((funcionario) => `${funcionario.nome} (${funcionario.cargo}) - ${funcionario.salarioFormatado()}`);

        this.exibirRelatorio(
            `Funcionários com salário maior que R$ 5000 (${lista.length})`,
            lista.length > 0 ? lista : ["Nenhum funcionário com salário maior que R$ 5000."]
        );
    }

    relatorioMediaSalarial() {
        const total = this.funcionarios.reduce((soma, funcionario) => soma + funcionario.salario, 0);
        const media = this.funcionarios.length > 0 ? total / this.funcionarios.length : 0;

        this.exibirRelatorio("Média salarial", [
            `Média: ${media.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}`
        ]);
    }

    relatorioCargosUnicos() {
        const cargos = [...new Set(this.funcionarios.map((funcionario) => funcionario.cargo))];

        this.exibirRelatorio(`Cargos únicos (${cargos.length})`, cargos);
    }

    relatorioNomesMaiusculo() {
        const nomes = this.funcionarios.map((funcionario) => funcionario.nome.toUpperCase());

        this.exibirRelatorio("Nomes em maiúsculo", nomes);
    }
}

const funcionarioController = new FuncionarioController();
