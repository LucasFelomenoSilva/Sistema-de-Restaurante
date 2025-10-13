import readlineSync from 'readline-sync'; // Biblioteca para ler entradas do usuário no terminal
import { Cliente, clientes } from './cliente.js'; // Importa a classe Cliente e o array de clientes
import Pedido, { pedidos, pedidosRápidos } from './pedido.js'; // Importa a classe Pedido e os arrays de pedidos

// Criando instância da classe Cliente
const cliente = new Cliente();

// Função principal que exibe o menu e processa as escolhas
export function iniciarMenu() {
  let sair = false;

  // Inicializa pedidos rápidos pré-definidos
  Pedido.inicializarPedidosRapidos();

  while (!sair) { // Loop infinito: continuará até o usuário escolher sair
    // Exibe o menu principal
    console.log('\n=== MENU PRINCIPAL ===');
    console.log('1 - Cadastrar Cliente');
    console.log('2 - Listar Clientes');
    console.log('3 - Gerenciar Pedidos');
    console.log('4 - Sair');

    // Solicita a escolha do usuário
    const opcao = readlineSync.question('Escolha uma opcao: ');

    // Verifica a opção escolhida e chama a função correspondente
    switch (opcao) {
      case '1':
        cliente.cadastrar(); // Chama o método de cadastro do cliente
        break;
      case '2':
        cliente.listar(); // Chama o método para listar clientes
        break;
      case '3':
        menuGerenciarPedidos(); // Abre o menu de gerenciamento de pedidos
        break;
      case '4':
        console.log('Encerrando programa...'); // Mensagem de saída
        sair = true; // Altera a variável para sair do loop
        break;
      default:
        console.log('Opcao invalida!'); // Caso o usuário digite algo errado
    }
  }

  process.exit(0); // Encerra o processo do Node.js
}

// Menu Gerenciar Pedidos
function menuGerenciarPedidos() {
  let voltar = false;

  while (!voltar) {
    console.log('\n=== GERENCIAR PEDIDOS ===');
    console.log('1 - Listar Pedidos Pré-definidos');
    console.log('2 - Criar Pedido Rápido');
    console.log('3 - Fazer Novo Pedido (com Cliente)');
    console.log('4 - Listar Pedidos');
    console.log('5 - Finalizar Pedido');
    console.log('6 - Voltar ao Menu Principal');

    const opcao = readlineSync.question('Escolha uma opcao: ');

    switch (opcao) {
      case '1':
        Pedido.listarRapidos(); // Chama o método para listar pedidos rápidos
        break;
      case '2':
        Pedido.criarRapido(); // Chama o método para criar um pedido rápido
        break;
      case '3':
        // Lógica para criar um pedido associado a um cliente
        if (clientes.length === 0) {
            console.log('Nenhum cliente cadastrado!');
        } else {
            console.log('Clientes disponíveis:');
            clientes.forEach((c) => console.log(`ID: ${c.id} | Nome: ${c.nome}`));
            const id = parseInt(readlineSync.question('Escolha o ID do cliente: '), 10);
            const clienteSelecionado = clientes.find((c) => c.id === id);

            if (!clienteSelecionado) {
                console.log('Cliente não encontrado!');
            } else {
                console.log('Deseja utilizar um pedido pre-definido ou criar um novo?');
                console.log('1 - Usar Pedido Pre-definido');
                console.log('2 - Criar Novo Pedido Personalizado');
                const escolha = readlineSync.question('Escolha uma opcao: ');

                if (escolha === '1') {
                    if (pedidosRápidos.length === 0) {
                        console.log('Nenhum pedido pre-definido disponível!');
                    } else {
                        console.log('Pedidos Pre-definidos:');
                        pedidosRápidos.forEach((p) =>
                            console.log(`ID:${p.id} | Itens: ${p.itens.map(i => i.nome).join(', ')} | Valor:${p.valor}`)
                        );
                        const pid = parseInt(readlineSync.question('Escolha o ID do pedido pré-definido: '), 10);
                        const pedidoEscolhido = pedidosRápidos.find(p => p.id === pid);

                        if (!pedidoEscolhido) {
                            console.log('Pedido pre-definido não encontrado!');
                        } else {
                            const novoPedido = {
                                id: pedidos.length + 1,
                                cliente: clienteSelecionado,
                                itens: pedidoEscolhido.itens,
                                valor: pedidoEscolhido.valor,
                                status: 'Pendente'
                            };
                            pedidos.push(novoPedido);
                            console.log('Pedido criado com sucesso a partir do pre-definido!');
                        }
                    }
                } else if (escolha === '2') {
                    // Chama o método para criar pedido personalizado
                    Pedido.criar(clienteSelecionado);
                } else {
                    console.log('Opção inválida!');
                }
            }
        }
        break;

      case '4':
        Pedido.listarPendentes(); // Chama o método para listar pedidos pendentes
        break;
      case '5':
        if (pedidos.length === 0) {
            console.log('Não há pedidos pendentes para finalizar!');
        } else {
            const id = parseInt(readlineSync.question('Digite o ID do pedido a finalizar: '), 10);
            Pedido.finalizar(id); // Chama o método para finalizar um pedido
        }
        break;
      case '6':
        voltar = true; // Altera a variável para voltar ao menu principal
        break;
      default:
        console.log('Opcao invalida!');
    }
  }
}