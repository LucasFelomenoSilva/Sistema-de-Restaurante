
// Adicionar função para Cadastrar (adicionar novos itens)

// Adicionar função para Listar (mostrar todos os itens)

// Adicionar função para Buscar (encontrar um item)

// Adicionar função para Atualizar ou Deletar itens

import { z } from 'zod';
import readline from 'readline';

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
    nome: z
    .string('O nome deve ser String!'), 
    descricao: z
    .string('A descrição deve ser String!'), 

    valor: z
    .string()
    .min(1, 'Numero deve conter ao menos 1 Caracteres! EX: 1')
    .transform((valor) => parseInt(valor, 10))
    .pipe (
        z
        .number()
        .int()
        .positive("Valor deve ser um numero positivo") // Numero deve ser positivo
    )
})

//Criando classe item
export default class Item {
    //Construtor 
    constructor(id,nome, descricao, valor){
        this.id = id;
        this.nome = nome;
        this.descricao = descricao;
        this.valor = valor;
    }

    //metodo cadastrar
    static cadastrar = cadastrar

    //metodo listar
    static listar = listar

    //metodo buscar
    static buscar = buscar

    //metodo atualizar
    static atualizar = atualizar

    //metodo deletar
    static deletar = deletar
}

//Metodo para cadastro
export async function cadastrar(){
    try {
        console.log('Cadastro de Itens')
        const id = data.length + 1
        const nome = await questao('Digite o nome do item: ')
        const descricao = await questao('Digite a descrição do item: ')
        const valor = await questao('Digite o valor do item: ')

        //Unir os dados a validação ZOD      
        const validados = Schema.parse ({
            id,
            nome,
            descricao,
            valor,
        })

        //instanciando
        const item = new Item(validados.id, validados.nome, validados.descricao, validados.valor)
        data.push(item)



        
        
    } catch (error) {
        console.log('Erro ao cadastrar item:', error.errors);
        rl.close()
    }
}

//Metodo para listar
export function listar(){
    if (data.length === 0){
        console.log("Nenhum item cadastrado!")
        return
    }

    console.log("Lista de Itens:")
    data.forEach((item) => {
        console.log(`ID: ${item.id}, Nome: ${item.nome}, Descrição: ${item.descricao}, Valor: ${item.valor}`);
    })
}

//Metodo para buscar
export async function buscar(){
    const ItemNome = await questao('Digite o nome do item que deseja buscar: ')
    // habilitado busca parcial
    const itemEncontrado = data.find(item => item.nome.toLowerCase().includes(ItemNome.toLowerCase()));

    if (itemEncontrado) {
        console.log(`Item encontrado: ID: ${itemEncontrado.id}, Nome: ${itemEncontrado.nome}, Descrição: ${itemEncontrado.descricao}, Valor: ${itemEncontrado.valor}`);
        return itemEncontrado
    } else {
        console.log('Item nao encontrado.');
        return null
    }
        }

//Metodo para atualizar
export async function atualizar(){
    try {
        const idAtualiza = await questao('Digite o ID do item que deseja atualizar: ')
        const idNum = parseInt(idAtualiza, 10)
        const index = data.findIndex(item => item.id === idNum)

        if (index !== -1) {
            const nome = await questao('Digite o novo nome do item: ')
            const descricao = await questao('Digite a nova descrição do item: ')
            const valor = await questao('Digite o novo valor do item: ')

            data[index].nome = nome
            data[index].descricao = descricao
            data[index].valor = valor

            console.log('Item atualizado com sucesso.');
        } else {
            console.log('Item nao encontrado.');
        }
       
    } catch (error) {
        console.log('Erro ao atualizar item:', error.errors);
        rl.close()
    }
        }

//Metodo para deletar
export async function deletar(){
    try {
        const idDeleta = await questao('Digite o ID do item que deseja deletar: ')
        const idNum = parseInt(idDeleta, 10)
        const index = data.findIndex(item => item.id === idNum)

        if (index !== -1) {
            data.splice(index, 1)
            console.log('Item deletado  com sucesso.');
        } else {
            console.log('Item nao encontrado.');
        }
        
    } catch (error) {
        console.log('Erro ao deletar item:', error.errors);
        rl.close()
    }
        }