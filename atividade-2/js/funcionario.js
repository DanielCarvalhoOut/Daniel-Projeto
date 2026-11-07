class Funcionario {

    #id;
    #nome;
    #idade;
    #cargo;
    #salario;

    static #proximoId = 1;

    constructor(nome, idade, cargo, salario) {
        this.#id = Funcionario.#proximoId++;
        this.nome = nome;
        this.idade = idade;
        this.cargo = cargo;
        this.salario = salario;
    }

    get id() {
        return this.#id;
    }

    get nome() {
        return this.#nome;
    }

    set nome(nome) {
        this.#nome = nome.trim();
    }

    get idade() {
        return this.#idade;
    }

    set idade(idade) {
        this.#idade = Number(idade);
    }

    get cargo() {
        return this.#cargo;
    }

    set cargo(cargo) {
        this.#cargo = cargo.trim();
    }

    get salario() {
        return this.#salario;
    }

    set salario(salario) {
        this.#salario = Number(salario);
    }

    atualizar(nome, idade, cargo, salario) {
        this.nome = nome;
        this.idade = idade;
        this.cargo = cargo;
        this.salario = salario;
    }

    salarioFormatado() {
        return this.#salario.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
    }

    toString() {
        return `ID: ${this.#id} | Nome: ${this.#nome} | Idade: ${this.#idade} | ` +
            `Cargo: ${this.#cargo} | Salário: ${this.salarioFormatado()}`;
    }
}
