import readlineSync from "readline-sync"; // Biblioteca para ler entradas do usuário no terminal
import Cliente from './cliente.js';      // Importa a classe Cliente
import Pedido from './pedido.js';        // Importa a classe Pedido

// Criando instâncias das classes
const cliente = new Cliente();
const pedido = new Pedido();

// Função principal que exibe o menu e processa as escolhas
export function iniciarMenu() {
    while (true) { // Loop infinito: continuará até o usuário escolher sair
        // Exibe o menu
        console.log("\n|1 - Cadastrar Cliente =-=|");
        console.log("|2 - Listar Cliente =-=-=-|");
        console.log("|3 - Criar Pedido =-=-=-=-|");
        console.log("|4 - Listar Pedido =-=-=-=|");
        console.log("|5 - Sair =-=-=-=-=-=-=-=-|");

        // Solicita a escolha do usuário
        const resposta = readlineSync.question("Escolha uma opcao: ");

        // Verifica a opção escolhida e chama o método correspondente
        switch (resposta) {
            case "1":
                cliente.cadastrar(); // Chama o método de cadastro do cliente
                break;
            case "2":
                cliente.listar();    // Chama o método para listar clientes
                break;
            case "3":
                pedido.criar();      // Chama o método para criar pedido
                break;
            case "4":
                pedido.listar();     // Chama o método para listar pedidos
                break;
            case "5":
                console.log("\nEncerrando programa..."); // Mensagem de saída
                return; // Sai do loop e encerra a função
            default:
                console.log("\nOpcao invalida!"); // Caso o usuário digite algo errado
        }
    }
}

// Chama a função para iniciar o menu assim que o arquivo for executado
iniciarMenu();""