# Sistema de Restaurante - Squad8

Projeto simples de sistema de restaurante desenvolvido em Node.js, utilizando **Zod** para validação de dados e **readline-sync** para interação no terminal. Permite gerenciar clientes e pedidos de forma prática, com pedidos pré-definidos ou personalizados.

## Funcionalidades

- **Clientes**
  - Cadastrar cliente (ID gerado automaticamente)
  - Listar clientes
- **Pedidos**
  - Pedidos pré-definidos (rápidos, sem cliente)
  - Criar pedidos rápidos
  - Criar pedidos com cliente
    - Pode usar pedido pré-definido ou criar personalizado
  - Listar pedidos pendentes (com cliente, itens, valor e status)
  - Finalizar pedidos (somente pedidos com cliente)
  
## Tecnologias

- Node.js
- readline-sync
- Zod (validação de dados)

## Como rodar

1. Clone este repositório:
```
git clone https://github.com/seu-usuario/nome-do-repositorio.git
```

2. Instale as dependências:
```
npm install
```

3. Rode o  Projeto:
```
node main.js
```

## Estrutura do Menu

-  Menu Principal

    - Cadastrar Cliente

    - Listar Clientes

    - Gerenciar Pedidos

    - Sair

    - Menu Gerenciar Pedidos

    - Listar Pedidos Pré-definidos

    - Criar Pedido Rápido

    - Fazer Novo Pedido (com Cliente)

    - Listar Pedidos Pendentes

    - Finalizar Pedidos

    - Voltar ao Menu Principal

## Observações

- IDs de clientes e pedidos são gerados automaticamente.

- Pedidos pré-definidos não podem ser finalizados.

- Apenas pedidos com cliente podem ser finalizados.

## Equipe

- [Lucas Silva](https://github.com/LucasFelomenoSilva)
- [Jorge Assunção](https://github.com/jorgenet0h)
- [Pablo Henrique](https://github.com/NexosKW)
- [Iago Santos](https://github.com/santosiago725-sudo)
- [Rhuan Pablo](https://github.com/Rhuan-P)
- [Maghaiver Gomes](https://github.com/MaghaiverGomesRamos)
- [Victoria Ingrid](https://github.com/victoriaingrid685-arch)
