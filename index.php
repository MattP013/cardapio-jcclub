<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="./assets/css/bootstrap.css">
    <link rel="stylesheet" href="./assets/css/style.css">
    <link rel="stylesheet" href="./assets/css/fontawesome/css/all.min.css">
    <title>JC COFFE</title>
</head>
<body>
<?php

use class\Produto;

 require __DIR__ .'\class\Produto.php';
 $Produto = new Produto();
 $produtos = $Produto::getProdutos();
 echo "<pre>"; print_r($produtos); echo "<pre>"; exit; 
?>
    <header class="container-fluid p-0">
        <section class="apresentacao d-flex" style="background-color: black;">
            <div class="jc-logo align-self-end">
                <img src="./assets/img/logo-jc.jpg" class="" alt="">
            </div>
        </section>
        <nav class="d-flex container-filter justify-content-lg-center gap-md-3 gap-1 mt-lg-4 mt-5">
            <button class=" btn btn-lg opcao selected">Todos</button>
            <button class=" btn btn-lg opcao">Snacks</button>
            <button class=" btn btn-lg opcao">Bebidas</button>
        </nav>
    </header>
    <main class="mt-3 container cardapio">
        <div class="container d-flex mb-2 gap-md-2 gap-0 categoria">
            <h1 class="h2 text-category mb-1 align-self-center">Todos</h1> 
            <button class="btn carrinho align-self-end" 
                    data-bs-toggle="modal" 
                    data-bs-target="#exampleModal"
                    >
                    <img src="./assets/img/cart.svg" alt="">
                    <span class="d-none contador">0</span>
            </button>
        </div>
        <div class="d-flex flex-wrap justify-content-center gap-lg-4 gap-3 wrapper col-12">
            <div data-cid="${c.id}" class="card-produto d-flex">
                <div class="foto-produto">
                    <img src="./assets/img/${c.img}" alt="">
                </div>
                <div class="ps-2 w-100">
                    <h6 class="nome-produto">
                       ${c.nome}
                    </h6>

                    <p class="descricao-produto">
                        ${c.descricao}
                    </p>

                    <div class="acao d-flex justify-content-between align-items-end">
                        <span class="preco">R$ ${Intl.NumberFormat('pt-br', { minimumFractionDigits: 2 }).format(c.preco)}</span>
                        <button data-cid="${c.id}" class="adicionar">
                            <i class="fas fa-plus"></i>
                        </button>
                    </div>
                </div>
            </div>
        </div>
        
    </main>

    <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered modal-lg">
          <div class="modal-content">
            <div class="modal-header">
              <h3 class="modal-title fw-bold" id="exampleModalLabel" style="color: #D7986C;">Carrinho</h3>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <div class="container container-carrinho d-flex flex-column">
                    <p class="text-center" style="font-size: 20px;">Nenhum produto selecionado</p> 
                </div>
                <div class="container container-total d-none ">
                    <h6 class="">Total: R$ <span class="precoTotal">0</span></h6>
                </div>
            </div>
            <div class="modal-footer flex-nowrap justify-content-center">
              <button type="button" disabled="true" class="btn enviar-whatsapp">Fechar pedido</button>
              <button type="button" class="btn continuar-comprando" data-bs-dismiss="modal">Continuar Comprando</button>
            </div>
          </div>
        </div>
    </div>
</body>

<script src="./assets/js/jquery.js"></script>
<script src="./assets/js/bootstrap.js"></script>
<script src="./assets/js/main.js"></script>
</html> 