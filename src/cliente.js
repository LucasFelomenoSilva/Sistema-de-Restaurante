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
    .string()// Deve ser string
    .regex(
        // Validação por Regex
        /^[0-9]{2}$/, ('O ID deve conter 2 numeros!') // O ID deve conter 2 numeros
    )
    .transform((valor) => parseInt(valor,10))//Transformando em numero
    . pipe (
    z
    .number()
    .int() //Numero tem que ser inteiro
    ,
    ),
    nome: z
    .string('O nome deve ser String!'), 

    telefone: z
    .string()
    .min(10, 'Numero deve conter ao menos 10 Caracteres! EX: 99992502022')
    .transform((valor) => parseInt(valor, 10))
    .pipe (
        z
        .number()
        .int()
        .positive("Idade deve ser um numero positivo") // Numero deve ser positivo
    )
})

//Criando classe cliente
export class Cliente {
    //Construtor 
    constructor(id, nome, telefone){
        this.id = id;
        this.nome = nome;
        this.telefone = telefone;
    }

    //Metodo para cadastro
    async cadastrar(){
        try {
            const id = await questao("Qual seu id:")

            const nome = await questao("Qual seu nome:")

            const telefone = await questao("Qual seu numero de telefone:")
             //Unir os dados a validação ZOD      
             const validados = Schema.parse ({
                id,
                nome,
                telefone,
        })

        data.push(validados)

        rl.close()
        } 
        catch (error){
            // Captura erros durante execução
            if (error instanceof z.ZodError){
            // Verifica se é erro de validação Zod
            // Cabeçalho de erro de validação
            console.log("\n Erro de validação!\n");
            // Itera sobre todos os erros encontrados
            error.issues.forEach((err) => {
                // Exibe caminho do campo e mensagem de erro
                console.log(` - ${err.path.join(".")}: ${err.message}`)
            });
            // Linha em branco para formatação
            console.log('');
            }
            else {
                // Para outros tipos de erro
                // Exibe erro inesperado
                console.error("Erro inesperado:", error)
            }
        }
    }

    //Metodo para Listagem
    listar(){
        if (data.length === 0){
            console.log("Nenhum estudante cadastrado!")
            return
        }

        console.log('-----------------LISTA DE CLIENTES----------------')
        for ( let item of data) {
            console.log(`
            ID: ${item.id} 
            Nome: ${item.nome}  
            Telefone: ${item.telefone}        
                `)
        }
    }

    //Metodo para Buscar Clientes
    buscar(nome) {
        const resultado = data.filter(e => e.nome.toLowerCase().includes(nome.toLowerCase()))
        
        if (resultado.length === 0){
            console.log('Nenhum cliente encontrado!')
            return
        }

        resultado.forEach(e => {
            console.log("-------------------------------------")
            console.log(`- 
                ID:${e.id}
                NOME: ${e.nome}
                TELEFONE: ${e.telefone}`)
        })
    }

    // Metodo para buscar ID
    buscarID(id){
        const porId = data.filter(e => e.id === id)

        if (porId.length === 0){
            console.log('Nenhum cliente encontrado!')
            return
        }

        porId.forEach(e => {
            console.log("-------------------------------------")
            console.log(`- 
                ID:${e.id}
                NOME: ${e.nome}
                TELEFONE: ${e.telefone}`)
        })
    }
}

const cliente = new Cliente ()

await cliente.cadastrar()
// cliente.listar()
cliente.buscarID(20)