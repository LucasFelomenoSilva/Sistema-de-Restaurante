//Criando classe Pedido
// Atributos - id, cliente, itens, valor, status ..
// Um pedido sempre deve sempre estar ligado a um cliente

import { z } from 'zod';
import readlineSync from 'readline-sync';

export const pedidos = [];       // pedidos com cliente e status
export const pedidosRápidos = []; 

//Crindo Schema de validação ZOD
const ItemSchema = z.object({
  nome: z.string(),
  valor: z.number().positive("Valor deve ser um numero positivo"), // Numero deve ser positivo
});

const PedidoSchema = z.object({
  id: z.number().int(), //Numero tem que ser inteiro
  cliente: z.object({
    id: z.number(),
    nome: z.string(),
    telefone: z.number(),
  }),
  itens: z.array(ItemSchema).min(1, 'Deve ter ao menos um item no pedido'), // Deve ter ao menos um item no pedido
  valor: z.number().positive("Valor deve ser um numero positivo"), // Numero deve ser positivo
  status: z.string().default('Pendente'),
});

const PedidoRapidoSchema = z.object({
  id: z.number().int(),
  itens: z.array(ItemSchema).min(1),
  valor: z.number().positive(),
});

//Criando classe Pedido
export default class Pedido {
  constructor(id, cliente, itens, valor, status) {
    this.id = id;
    this.cliente = cliente;
    this.itens = itens;
    this.valor = valor;
    this.status = status;
  }

  // Inicializa pedidos rápidos pré-definidos
  static inicializarPedidosRapidos() {
    if (pedidosRápidos.length > 0) return;

    pedidosRápidos.push(
      PedidoRapidoSchema.parse({
        id: pedidosRápidos.length + 1,
        itens: [{ nome: 'Pizza', valor: 35 }, { nome: 'Refrigerante', valor: 8 }],
        valor: 43,
      }),
      PedidoRapidoSchema.parse({
        id: pedidosRápidos.length + 2,
        itens: [{ nome: 'Hamburguer', valor: 25 }],
        valor: 25,
      })
    );
  }

  // Método para criar pedido com cliente
  // criarPedido(cliente, itens)
  static criar(clienteSelecionado) {
    if (!clienteSelecionado) {
      console.log('Nenhum cliente selecionado!');
      return;
    }
    
    // adicionar itens
    const itens = [];
    let adicionarMais = true;
    while (adicionarMais) {
      const nomeItem = readlineSync.question('Digite o nome do item: ');
      const valorItem = parseFloat(readlineSync.question('Digite o valor do item: '));
      itens.push({ nome: nomeItem, valor: valorItem });

      const resp = readlineSync.question('Adicionar mais itens? (s/n): ');
      adicionarMais = resp.toLowerCase() === 's';
    }

    // calcular valor total
    const valorTotal = itens.reduce((total, item) => total + item.valor, 0);

    // Unir os dados a validação ZOD
    const pedidoValido = PedidoSchema.parse({
      id: pedidos.length + 1,
      cliente: clienteSelecionado,
      itens,
      valor: valorTotal,
      status: 'Pendente',
    });

    pedidos.push(pedidoValido);
    console.log('Pedido criado com sucesso!');
  }

  // Método para criar pedido rápido (sem cliente)
  static criarRapido() {
    const itens = [];
    let adicionarMais = true;
    while (adicionarMais) {
      const nomeItem = readlineSync.question('Digite o nome do item: ');
      const valorItem = parseFloat(readlineSync.question('Digite o valor do item: '));
      itens.push({ nome: nomeItem, valor: valorItem });

      const resp = readlineSync.question('Adicionar mais itens? (s/n): ');
      adicionarMais = resp.toLowerCase() === 's';
    }

    const valorTotal = itens.reduce((total, item) => total + item.valor, 0);

    const pedidoValido = PedidoRapidoSchema.parse({
      id: pedidosRápidos.length + 1,
      itens,
      valor: valorTotal,
    });

    pedidosRápidos.push(pedidoValido);
    console.log('Pedido rápido criado com sucesso!');
  }

  // Método para listar pedidos pendentes
  // listarPedidos()
  static listarPendentes() {
    if (pedidos.length === 0) {
      console.log('Nenhum pedido pendente!');
      return;
    }

    console.log('-----------------PEDIDOS PENDENTES----------------');
    pedidos.forEach((p) => {
      console.log(
        `ID:${p.id} | Cliente: ${p.cliente.nome} | Itens: ${p.itens.map((i) => i.nome).join(', ')} | Valor: R$${p.valor} | Status: ${p.status}`
      );
    });
  }

  // Método para listar pedidos rápidos
  static listarRapidos() {
    if (pedidosRápidos.length === 0) {
      console.log('Nenhum pedido rápido cadastrado!');
      return;
    }

    console.log('-----------------PEDIDOS RÁPIDOS----------------');
    pedidosRápidos.forEach((p) => {
      console.log(`ID: ${p.id} | Itens: ${p.itens.map((i) => i.nome).join(', ')} | Valor: R$${p.valor}`);
    });
  }

  // Metodo para finalizar pedido
  // finalizarPedido()
  // buscarPedidoPorId()
  static finalizar(id) {
    const pedido = pedidos.find((p) => p.id === id); // buscarPedidoPorId()
    if (!pedido) {
      console.log('Pedido não encontrado!');
      return;
    }

    if (pedido.status === 'Finalizado') {
      console.log(`Pedido ${id} já está finalizado!`);
      return;
    }

    pedido.status = 'Finalizado';
    console.log(`Pedido ${id} finalizado com sucesso!`);
  }
}