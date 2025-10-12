//Criando classe Pedido
// Atributos - id, cliente, itens, valor, status ..

// Métodos >

// criarPedido(cliente, itens)
// listarPedidos()
// buscarPedidoPorId()
// finalizarPedido()

// Um pedido sempre deve sempre estar ligado a um cliente//Criando classe Pedido
// Atributos - id, cliente, itens, valor, status ..

// Métodos >

// criarPedido(cliente, itens)
// listarPedidos()
// buscarPedidoPorId()
// finalizarPedido()

// Um pedido sempre deve sempre estar ligado a um cliente

import { z } from 'zod';
import readline from 'readline';
import Cliente from './cliente.js';
import Item  from './item.js';


const data = []

const rl = readline.createInterface({
  input: process.stdin, // Define entrada padrão (teclado)
  output: process.stdout, // Define saída padrão (terminal)
})

// Função para Redline async 
function questao (questao){
    return new Promise((resolve) => {
        rl.question(questao, (resposta) => {
            resolve(resposta)
        })
    })
}

//Crindo Schema de validação ZOD
const Schema = z.object ({
    id: z
    .int() //Numero tem que ser inteiro
    ,
    
    cliente: z
    .instanceof(Cliente, 'Cliente inválido') // Verifica se é uma instância da classe Cliente
    ,
     
    itens: z
    .array(z.instanceof(Item, 'Item inválido')) // Verifica se é um array de instâncias da classe Item
    .min(1, 'Deve ter ao menos um item no pedido'), // Deve ter ao menos um item no pedido

    valor: z
    .number()
    .positive("Valor deve ser um numero positivo"), // Numero deve ser positivo

    status: z
    .string()
    .default("Pendente")
})

//Criando classe Pedido
export default class Pedido {
    constructor(id, cliente, itens, valor, status) {
        this.id = id
        this.cliente = cliente
        this.itens = itens
        this.valor = valor
        this.status = status
    }

    // static Metodos
    static criar = criar
    static listar = listar
    static buscar = buscar
    static finalizar = finalizar

}

// Método para criar pedido
export async function criar() {
    try {
        const id = data.length + 1
        // buscar cliente
        const nome = await questao('Digite o nome do cliente: ')
        //mockado
        const clienteEncontrado =  {
            id: 1,
            nome: 'João',
            telefone: '123456789'
        }
        console.log(clienteEncontrado)
        

        if (!clienteEncontrado) {
            console.log('Cliente não encontrado.');
            return;
        }
        const cliente = clienteEncontrado;
        // adicionar itens
        const itens = []
        let adicionarMais = true
        while (adicionarMais) {
            console.log('Cadastro de Itens para o Pedido')
            const ItemNome = await questao('Digite o nome do item: ')
            const itemEncontrado = Item.buscar(ItemNome)
            if (!itemEncontrado) {
                console.log('Item não encontrado.');
                continue
            }
            itens.push(itemEncontrado)
            console.log(`Item ${itemEncontrado.nome} adicionado ao pedido.`);

            const resposta = await questao('Deseja adicionar mais itens? (s/n): ')
            adicionarMais = resposta.toLowerCase() === 's'
        }

        // calcular valor total
        const valorTotal = itens.reduce((total, item) => total + item.valor, 0)

        // Criando uma nova instância de Pedido
        const pedido = new Pedido(id, cliente, itens, valorTotal, "Pendente")

        // Unir os dados a validação ZOD
        const validados = Schema.parse({
            id,
            cliente,
            itens,
            valor: valorTotal,
            status: "Pendente"
        })

        data.push(validados)

    } catch (error) {
        console.log('Erro ao criar pedido:', error.errors);
        rl.close()
    }
        }

// Método para listar pedido
export function listar() {
    console.log('Listagem de Pedidos:');
    data.forEach(pedido => {
        console.log(`ID: ${pedido.id}, Cliente: ${pedido.cliente.nome}, Itens: ${pedido.itens.map(item => item.nome).join(', ')}, Valor: ${pedido.valor}, Status: ${pedido.status}`);
    });
    
}   

// Metodo para buscar pedido por id
export function buscar(id) {
    const pedidoEncontrado = data.find(pedido => pedido.id === id);
    return pedidoEncontrado;
}

// Metodo para finalizar pedido
export function finalizar(id) {
    const pedidoEncontrado = buscar(id);
    if (pedidoEncontrado) {
        pedidoEncontrado.status = "Finalizado";
        console.log(`Pedido ${id} finalizado com sucesso!`);
    } else {
        console.log(`Pedido ${id} nao encontrado.`);
    }
    
}

await criar()

rl.close