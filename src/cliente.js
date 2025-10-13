import { z } from 'zod';
import readlineSync from 'readline-sync';

export const clientes = []; // Array de clientes compartilhado

//Crindo Schema de validação ZOD
const Schema = z.object({
  id: z.number().int(), //Numero tem que ser inteiro
  nome: z.string('O nome deve ser String!'),
  telefone: z
    .string()
    .min(10, 'Numero deve conter ao menos 10 Caracteres! EX: 99992502022')
    .transform((valor) => parseInt(valor, 10)) //Transformando em numero
    .pipe(z.number().int().positive("Telefone deve ser um numero positivo")), // Numero deve ser positivo
});

//Criando classe cliente
export class Cliente {
  //Metodo para cadastro
  cadastrar() {
    try {
      const id = clientes.length + 1; // ID automático
      const nome = readlineSync.question('Qual seu nome: ');
      const telefone = readlineSync.question('Qual seu numero de telefone: ');

      //Unir os dados a validação ZOD
      const validados = Schema.parse({ id, nome, telefone });

      clientes.push(validados);
      console.log(`Cliente cadastrado com sucesso! ID: ${id}`);
    } catch (error) { // Captura erros durante execução
      if (error instanceof z.ZodError) { // Verifica se é erro de validação Zod
        // Cabeçalho de erro de validação
        console.log('\nErro de validação!\n');
        // Itera sobre todos os erros encontrados
        error.issues.forEach((err) => {
          // Exibe caminho do campo e mensagem de erro
          console.log(` - ${err.path.join('.')}: ${err.message}`);
        });
        // Linha em branco para formatação
        console.log('');
      } else {
        // Para outros tipos de erro
        // Exibe erro inesperado
        console.error('Erro inesperado:', error);
      }
    }
  }

  //Metodo para Listagem
  listar() {
    if (clientes.length === 0) {
      console.log('Nenhum cliente cadastrado!');
      return;
    }

    console.log('-----------------LISTA DE CLIENTES----------------');
    clientes.forEach((item) => {
      console.log(`ID: ${item.id} | Nome: ${item.nome} | Telefone: ${item.telefone}`);
    });
  }

  //Metodo para Buscar Clientes por nome
  buscar(nome) {
    const resultado = clientes.filter((e) =>
      e.nome.toLowerCase().includes(nome.toLowerCase())
    );

    if (resultado.length === 0) {
      console.log('Nenhum cliente encontrado!');
      return;
    }

    resultado.forEach((e) => {
      console.log(`ID:${e.id} | Nome: ${e.nome} | Telefone: ${e.telefone}`);
    });
  }

  // Metodo para buscar por ID
  buscarID(id) {
    const porId = clientes.filter((e) => e.id === id);

    if (porId.length === 0) {
      console.log('Nenhum cliente encontrado!');
      return;
    }

    porId.forEach((e) => {
      console.log(`ID:${e.id} | Nome: ${e.nome} | Telefone: ${e.telefone}`);
    });
  }
}