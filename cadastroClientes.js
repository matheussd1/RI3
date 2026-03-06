class Telefone {
    constructor(ddd, numero) {
        this.ddd = ddd;
        this.numero = numero;
    }
}

class Endereco {
    constructor(estado, cidade, rua, numero) {
        this.estado = estado;
        this.cidade = cidade;
        this.rua = rua;
        this.numero = numero;
    }
}

class Cliente {
    #cpf; // atributo priv.

    constructor(nome, cpf, endereco) {
        this.nome = nome;
        this.#cpf = cpf;
        this.endereco = endereco;
        this.telefones = new Set();
    }

    get cpf() { return this.#cpf; } // metodo de acesso get para atributo privado

    // metodos lower e upper
    getNomeUpperCase() { return this.nome.toUpperCase(); }
    getNomeLowerCase() { return this.nome.toLowerCase(); }
}

class Empresa {
    #cnpj; // atributo priv.

    constructor(razaoSocial, nomeFantasia, cnpj, endereco) {
        this.razaoSocial = razaoSocial;
        this.nomeFantasia = nomeFantasia;
        this.#cnpj = cnpj;
        this.endereco = endereco;
        this.clientes = new Set();
        this.telefones = new Set();
    }

    get cnpj() { return this.#cnpj; } // metodo de acesso get para cnpj privado

    // metodo descricao
    detalhe() {
        let desc = `Razão Social: ${this.razaoSocial}\n`;
        desc += `Nome fantasia: ${this.nomeFantasia}\n`;
        desc += `-------------------------------------------\n`;

        this.clientes.forEach(cliente => {
            desc += `Nome: ${cliente.nome}\n`;
            desc += `Estado: ${cliente.endereco.estado} cidade: ${cliente.endereco.cidade} `;
            desc += `rua: ${cliente.endereco.rua} numero: ${cliente.endereco.numero}\n`;

            cliente.telefones.forEach(tel => {
                desc += `ddd: ${tel.ddd} numero: ${tel.numero}\n`;
            });
            desc += `\n`;
        });
        return desc;
    }
}

// testes

// empresa
const enderecoEmpresa = new Endereco("SP", "São José dos Campos", "Av. Cassiano Ricardo", 500);
const minhaEmpresa = new Empresa("Matheusempresa LTDA", "Mercado Online", "12.345.678/0001-99", enderecoEmpresa);
minhaEmpresa.telefones.add(new Telefone("12", "111112222"));
minhaEmpresa.telefones.add(new Telefone("12", "999998888"));

// clientes
const dadosClientes = [
    { nome: "Matheus", cpf: "111", rua: "Av Andrômeda", num: 67, tel: "111" },
    { nome: "Amanda", cpf: "222", rua: "Av Andrômeda", num: 412, tel: "222" },
    { nome: "Joao", cpf: "333", rua: "Av São João", num: 789, tel: "333" },
    { nome: "Gerson", cpf: "444", rua: "Av Andromeda", num: 452, tel: "444" },
    { nome: "Luis", cpf: "555", rua: "Rua Paraibuna", num: 123, tel: "555" }
];


//Easter egg: feels like we only go backwards - Tame Impala

dadosClientes.forEach(dado => {
    const endereco = new Endereco("SP", "São José dos Campos", dado.rua, dado.num);
    const cliente = new Cliente(dado.nome, dado.cpf, endereco);

    // telefones clientes
    cliente.telefones.add(new Telefone("12", dado.tel));
    cliente.telefones.add(new Telefone("12", dado.tel + dado.tel));

    minhaEmpresa.clientes.add(cliente); //coloca o cliente na empresa
});

// descricao
console.log(minhaEmpresa.detalhe());