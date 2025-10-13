import { z } from 'zod';
import readlineSync from 'readline-sync';

export const clientes = []; // Array de clientes compartilhado

// Schema Zod
const Schema = z.object({
  id: z.number().int(),
  nome: z.string('O nome deve ser String!'),
  telefone: z
    .string()
    .min(10, 'Numero deve conter ao menos 10 Caracteres! EX: 99992502022')
    .transform((valor) => parseInt(valor, 10))
    .pipe(z.number().int().positive()),
});

export class Cliente {
  cadastrar() {
    try {
      const id = clientes.length + 1; // ID automático
      const nome = readlineSync.question('Qual seu nome: ');
      const telefone = readlineSync.question('Qual seu numero de telefone: ');

      const validados = Schema.parse({ id, nome, telefone });

      clientes.push(validados);
      console.log(`Cliente cadastrado com sucesso! ID: ${id}`);
    } catch (error) {
      if (error instanceof z.ZodError) {
        console.log('\nErro de validação!\n');
        error.issues.forEach((err) => {
          console.log(` - ${err.path.join('.')}: ${err.message}`);
        });
        console.log('');
      } else {
        console.error('Erro inesperado:', error);
      }
    }
  }

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
