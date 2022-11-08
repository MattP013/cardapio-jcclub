<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="./assets/css/bootstrap.css">
    <link rel="stylesheet" href="./assets/css/style.css">
    <link rel="stylesheet" href="./assets/css/fontawesome/css/all.min.css">
    <link rel="icon" href="./assets/img/logo-jc.jpg">
    <title>JC COFFE</title>
</head>
<body>
<?php
 require __DIR__ .'/vendor/autoload.php';
 use Class\Produto;
 use Class\Categoria;
 $Categoria = new Categoria();
 $categorias = $Categoria::getCategoria();
 $resultCategoria = "";
 foreach($categorias as $categoria)
 {
    $resultCategoria.= '
        <button data-idcategory="'.$categoria->cd_categoria.'" class="btn btn-lg opcao">
        '.
            $categoria->nm_categoria
        .'</button>
    ';
 }
 $Produto = new Produto();
 $produtos = $Produto::getProdutos("ic_ativo = 1");

 $result = "";
 foreach($produtos as $produto)
 {
    $disponivel = '';

    if($produto->ic_ativo == 1)
    {
        $disponivel = 'Disponível';
    }
    else
    {
        $disponivel = 'Indisponível';
    }
    $result .='
                <div data-id="'.$produto->cd_produto.'" data-category="'.$produto->cd_categoria.'" class="card-produto">
                        <div class="foto-produto">
                            <img src="./assets/img/'.$produto->img_produto.'" alt="">
                        </div>
                        <div class="ps-2 w-100">
                            <h6 class="nome-produto">'.
                                $produto->nm_produto
                            .'</h6>

                            <p class="descricao-produto">'.
                                $disponivel
                            .'</p>
                        
                        <div class="acao d-flex justify-content-between align-items-end">
                            <span class="preco">
                                R$ '. number_format($produto->vl_produto, 2, ',', '.').
                             '</span>

                            <button class="adicionar">
                                <i class="fas fa-plus"></i>
                            </button>
                        </div>
                    </div>
                </div>
            ';
 }
?>

    <header class="container-fluid p-0">
        <section class="apresentacao d-flex">
            <div class="jc-logo align-self-end">
                <img src="./assets/img/logo-jc.jpg" class="" alt="">
            </div>
        </section>
        <nav class="d-flex container-filter justify-content-lg-center gap-md-3 gap-1 mt-lg-4 mt-5">
            <button data-idcategory="0" class="btn btn-lg opcao selected">Todos</button>
            <?=$resultCategoria?>
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
        <div class="d-flex flex-wrap justify-content-center gap-lg-4 gap-3 wrapper">
            <?=$result?>
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
                    <p class="sem-produto" >Nenhum produto selecionado</p>
                </div>
                <div class="container container-total d-none ">
                    <h6 class="">Total: R$ <span class="precoTotal">0</span></h6>
                </div>
            </div>
            <div class="modal-footer flex-nowrap justify-content-lg-evenly justify-content-center">
              <button type="button" class="btn continuar-comprando" data-bs-dismiss="modal">Continuar Comprando</button>
              <button type="button" disabled="true" class="btn enviar-whatsapp">Fechar pedido</button>
            </div>
          </div>
        </div>
    </div>

    <div class="to-clone d-none">
        <div class="card-produto">
            <div class="foto-produto">
                <img src="./assets/img/logo-jc.jpg" alt="">
            </div>
            <div class="detalhes ms-2 w-100 position-relative">
            <span class="excluir position-absolute"><i class="fas fa-times"></i></span>
                <h6 class="nome-produto justify-content-between">
                    Pão de Mel   
                </h6>
                <p class="descricao-produto">
                    Disponível
                </p>
                <div class="operacao mt-2 d-flex justify-content-between">
                    <button class="menos" disabled="disabled">-</button>
                    <span class="preco align-self-center">
                        x1 - R$ 7,00
                    </span>
                    <button class="mais" >
                        +
                    </button>
                </div>
            </div>
        </div>
    </div>
</body>

<script src="./assets/js/jquery.js"></script>
<script src="./assets/js/bootstrap.js"></script>
<script src="./assets/js/main.js"></script>
</html> 