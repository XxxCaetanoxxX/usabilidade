// Função para adicionar um contato ao banco de dados
function adicionarContatoAoBancoDeDados(contato) {
    const transaction = db.transaction(['contatos'], 'readwrite');
    const objectStore = transaction.objectStore('contatos');

    objectStore.add(contato);
}
function consultarTamanhoAgenda() {
    const tamanho = agenda.tamanhoDaAgenda();
    document.getElementById("resultado").innerHTML = `Tamanho da agenda: ${tamanho} contatos.`;

    // Mostrar a lista de contatos
    mostrarContatos();
}


function mostrarContatos() {
    const listaContatos = document.getElementById("listaContatos");
    listaContatos.innerHTML = ""; // Limpa a lista antes de atualizá-la

    if (agenda.contatos.length === 0) {
        listaContatos.innerHTML = "Nenhum contato na agenda.";
    } else {
        const ul = document.createElement("ul");
        ul.style.listStyle = "none";
        ul.style.padding = "0";

        agenda.contatos.forEach(contato => {
            const li = document.createElement("li");
            li.textContent = `Nome: ${contato.nome}, Email: ${contato.email}, Telefone: ${contato.telefone}`;
            ul.appendChild(li);
        });

        listaContatos.appendChild(ul);
    }

    listaContatos.style.display = "block";
    // Exibir o botão "Fechar lista"
    document.querySelector("button[onclick='fecharListaContatos']").style.display = "block";
}
function fecharListaContatos() {
    const listaContatos = document.getElementById("listaContatos");
    listaContatos.style.display = "none";

    // Ocultar o botão "Fechar lista"
    document.querySelector("button[onclick='fecharListaContatos']").style.display = "none";
}

function mostrarContatos() {
    const listaContatos = document.getElementById("listaContatos");
    listaContatos.innerHTML = ""; // Limpa a lista antes de atualizá-la

    if (agenda.contatos.length === 0) {
        listaContatos.innerHTML = "Nenhum contato na agenda.";
    } else {
        const ul = document.createElement("ul");
        ul.style.listStyle = "none";
        ul.style.padding = "0";

        agenda.contatos.forEach(contato => {
            const li = document.createElement("li");
            li.textContent = `Nome: ${contato.nome}, Email: ${contato.email}, Telefone: ${contato.telefone}`;
            ul.appendChild(li);
        });

        listaContatos.appendChild(ul);
    }

    listaContatos.style.display = "block";
}


// Função para recuperar todos os contatos do banco de dados
function recuperarTodosOsContatos() {
    const transaction = db.transaction(['contatos'], 'readonly');
    const objectStore = transaction.objectStore('contatos');

    const contatos = [];

    objectStore.openCursor().onsuccess = function(event) {
        const cursor = event.target.result;
        if (cursor) {
            contatos.push(cursor.value);
            cursor.continue();
        } else {
            // Todos os contatos foram recuperados, agora você pode exibi-los
            exibirContatos(contatos);
        }
    };
}

// Função para exibir contatos na tela
function exibirContatos(contatos) {
    const resultadoDiv = document.getElementById("resultado");
    resultadoDiv.innerHTML = "";

    contatos.forEach(contato => {
        const div = document.createElement("div");
        div.textContent = `Nome: ${contato.nome}, Email: ${contato.email}, Telefone: ${contato.telefone}`;
        resultadoDiv.appendChild(div);
    });
}
function removerContatoDoBancoDeDados(email) {
    const transaction = db.transaction(['contatos'], 'readwrite');
    const objectStore = transaction.objectStore('contatos');

    const request = objectStore.delete(email);

    request.onsuccess = function (event) {
        console.log("Contato removido com sucesso do banco de dados.");
    };

    request.onerror = function (event) {
        console.error("Erro ao remover o contato do banco de dados.");
    };
}
const sqlite3 = require('sqlite3').verbose();

// Crie uma instância do banco de dados ou abra-o se já existir
const db = new sqlite3.Database('agenda.db');

// Crie uma tabela para armazenar os contatos
db.serialize(() => {
    db.run("CREATE TABLE IF NOT EXISTS contatos (id INTEGER PRIMARY KEY AUTOINCREMENT, nome TEXT, email TEXT, telefone TEXT)");
});

// Função para adicionar um contato ao banco de dados
function adicionarContato(contato) {
    const stmt = db.prepare("INSERT INTO contatos (nome, email, telefone) VALUES (?, ?, ?)");
    stmt.run(contato.nome, contato.email, contato.telefone);
    stmt.finalize();
}

// Função para recuperar todos os contatos do banco de dados
function recuperarTodosOsContatos(callback) {
    db.all("SELECT * FROM contatos", (err, rows) => {
        if (err) {
            throw err;
        }
        callback(rows);
    });
}
// Exemplo de uso
const novoContato = { nome: "João", email: "joao@example.com", telefone: "1234567890" };
adicionarContato(novoContato);

recuperarTodosOsContatos(contatos => {
    console.log("Contatos salvos no banco de dados:");
    console.log(contatos);
});

// Feche o banco de dados quando não estiver mais em uso
db.close();