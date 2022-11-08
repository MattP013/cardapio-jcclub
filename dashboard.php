<!DOCTYPE html>
<html lang="pt-br">

<head>
  <meta charset="UTF-8" />
  <title>Administração</title>
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <link rel="stylesheet" href="./assets/css/bootstrap.css" />
  <link rel="stylesheet" href="./assets/css/dashboard.css" />
  <link rel="stylesheet" href="./assets/css/fontawesome/css/all.min.css" />
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
      <tr>
      <th scope="row">'.$produto->cd_produto.'</th>
      <td>'.$produto->nm_produto.'</td>
      <td>'.number_format($produto->vl_produto, 2, ',', '.').'</td>
      <td>1</td>
      <td class="d-flex justify-content-lg-center justify-content-around">
      <i
        class="fas fa-edit mx-lg-2"
        data-id="'.$produto->cd_produto.'"
        data-bs-toggle="modal"
        data-bs-target="#UpdadeProduct"
      ></i>
      <i class="fas fa-times-circle d-md-block d-none"></i>
    </td>
    </tr>';
 }
?>


  <nav class="menu-nav">
    <li class="logo">
      <a href="#" class="nav-option">
        <i class="fas fa-stream"></i>
        <span class="link-text"> Menu </span>
      </a>
    </li>
    <ul class="navbar-nav">
      <li class="nav-item">
        <a href="" class="nav-option">
          <i class="fas fa-arrow-left"></i>
          <span class="link-text">Voltar para o site</span>
        </a>
      </li>

      <li class="nav-item">
        <a href="" class="nav-option">
          <i class="fas fa-user-edit"></i>
          <span class="link-text">Meu Perfil</span>
        </a>
      </li>

      <li class="nav-item">
        <a href="" class="nav-option">
          <i class="fas fa-shopping-bag"></i>
          <span class="link-text">Meus Produtos</span>
        </a>
      </li>

      <li class="nav-item">
        <a href="" class="nav-option">
          <i class="fas fa-user"></i>
          <span class="link-text">Usuários</span>
        </a>
      </li>

      <li class="nav-item">
        <a href="" class="nav-option">
          <i class="fas fa-door-open"></i>
          <span class="link-text">Sair</span>
        </a>
      </li>
    </ul>
  </nav>
  <main class="container shadow mt-5 rounded-2 bg-light">
    <div class="container-fluid ">
      <h1 class="mt-lg-3 mt-3 adiministracao">Meus Produtos</h1>
      <div class="row">
        <div class="col-lg-6">
          <div class="input-group my-4">
            <div class="form-outline">
              <input id="search-input" type="search" class="form-control" placeholder="Pesquisa" />
            </div>
            <button id="search-button" type="button" class="search-btn btn">
              <i class="fas fa-search"></i>
            </button>
          </div>
        </div>
        
        <div class="col-lg-6">
            <div class="d-flex gap-2 my-lg-4">
            <button type="button" class="btn btn-primary w-100" data-bs-toggle="modal"  data-bs-target="#NewProduct">
              Novo Produto <i class="fas fa-cart-plus"></i>
            </button>
            <button class="btn btn-filter btn-primary w-100">
              Filtrar <i class="fas fa-filter"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
    </div>
    <div class="container-fluid filter mt-3"  style="display: none;">
      <div class="row">
          <div class="col-md-3 my-lg-0 my-1">
              <select id="Bycategoria" class="form-select" aria-label="Default select example">
                <option selected value="0">Todos</option>
                <option value="Snacks">Snacks</option>
                <option value="Bebidas">Bebidas</option>
              </select>
            </div>
          <div class="col-md-3  my-lg-0 my-1">
            <button class="btn maior-preco btn-primary w-100">
                Maior Preço <i class="fas fa-sort-amount-up"></i>                 
            </button>
          </div>
          <div class="col-md-3 my-lg-0 my-1">
            <button class="menor-preco btn btn-primary w-100">
              Menor Preço <i class="fas fa-sort-amount-up-alt"></i>
            </button>
          </div>
          <div class="col-md-3 my-lg-0 my-1">
            <button class="btn ordem-alfabetica btn-primary w-100">
              Ordem Alfabética 
              <i class="fas fa-sort-alpha-up albetica"></i>
              <i class="fas fa-sort-alpha-down-alt d-none albetica"></i>
            </button>
          </div>
       
      </div>
    </div>
    <hr />
    <table class="produtos table table-hover table-responsive overflow-scroll">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Produto</th>
          <th scope="col">Preço</th>
          <th scope="col">Qtd</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <?=$result?>
      </tbody>
    </table>
  </main>
  <div class="modal fade" id="UpdadeProduct" tabindex="-1" aria-labelledby="UpdadeProductLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered modal-lg">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="UpdadeProductLabel">Editar Produto</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <div class="container-fuid">
            <form action="" class="row updateProduct">
             
                <div class="col-lg-6 col-12 product-image">
                  <img src="" alt="" class="mb-1" id="product-img" />
                  <div>
                    <div class="input-group mb-3">
                      <input type="file" class="form-control" name="imagem_produto" id="inputGroupFile01">
                    </div>
                  </div>
                  <div class="">
                    <label for="Descricao" class="form-label">Descrição</label>
                    <textarea type="text" id="Descricao" name="descricao_produto" class="form-control"
                      aria-label="Sizing example input" ></textarea>
                  </div>
                </div>
                <div class="col-lg-6 col-12">
                  <div class="mb-3">
                    <label for="Nome" class="form-label">Nome do Produto</label>
                    <input id="Nome" name="nome_produto" type="text" class="form-control"
                      aria-label="Sizing example input" />
                  </div>
                  <div class="mb-3">
                    <label for="Preco" class="form-label">Preço</label>
                    <input type="text" id="Preco" name="valor_produto" class="form-control"
                      aria-label="Sizing example input" />
                  </div>
                  <div class="mb-3 position-relative">
                    <label for="Categoria" class="form-label">Categoria</label>
                    <input autocomplete="off" role="combobox" list="" id="categoria_editar" class="form-control" name="categoria_produto"
                      placeholder="Selecione uma categoria" />

                    <datalist id="categorias_editar" class="" role="listbox">
                      <option value="Geral">
                        Geral
                      </option>
                      <option value="Snacks">Snacks</option>
                      <option value="Bebidas">Bebidas</option>
                    </datalist>
                  </div>
                  <div class="mb-3">
                    <label for="Status" class="form-label">Disponível/Indisponível</label>
                    <select id="Status" class="form-select" aria-label="Default select example">
                      <option value="Ativado">Disponível</option>
                      <option value="Desativado">Indisponível</option>
                    </select>
                  </div>
            </form>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-danger" data-bs-dismiss="modal">
            Exluir
          </button>
          <button type="button" class="btn btn-primary">Salvar</button>
        </div>
      </div>
    </div>
  </div>
</div>

  <div class="modal fade" id="NewProduct" tabindex="-1" aria-labelledby="NewProductLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered modal-lg">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="NewProductLabel">Cadastrar Produto</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <div class="container-fuid">
            <form action="" class="row">
             
                <div class="col-lg-6 col-12 product-image">
                  <img src="./assets/img/noimage.png" alt="" class="mb-1 product-img" id="" />
                  <div>
                    <div class="input-group mb-3">
                      <input type="file" class="form-control" name="imagem_produto" id="inputGroupFile01">
                    </div>
                  </div>
                  <div class="">
                    <label for="Descricao" class="form-label">Descrição</label>
                    <textarea type="text" id="Descricao" name="descricao_produto" class="form-control"
                      aria-label="Sizing example input" ></textarea>
                  </div>
                </div>
                <div class="col-lg-6 col-12">
                  <div class="mb-3">
                    <label for="Nome" class="form-label">Nome do Produto</label>
                    <input id="Nome" name="nome_produto" type="text" class="form-control"
                      aria-label="Sizing example input" />
                  </div>
                  <div class="mb-3">
                    <label for="Preco" class="form-label">Preço</label>
                    <input type="text" id="Preco" name="valor_produto" class="form-control"
                      aria-label="Sizing example input" />
                  </div>
                  <div class="mb-3 position-relative">
                    <label for="Categoria" class="form-label">Categoria</label>
                    <input autocomplete="off" role="combobox" list="" id="categoria_adicionar" class="form-control" name="categoria_produto"
                      placeholder="Selecione uma categoria" />

                    <datalist id="categorias_adicionar" class="" role="listbox">
                      <option value="Geral">Geral</option>
                      <option value="Snacks">Snacks</option>
                      <option value="Bebidas">Bebidas</option>
                    </datalist>
                  </div>
                  <div class="mb-3">
                    <label for="Status" class="form-label">Disponível/Indisponível</label>
                    <select id="Status" class="form-select" aria-label="Default select example">
                      <option value="Disponível">Disponível</option>
                      <option value="Indisponível">Indisponível</option>
                    </select>
                  </div>
            </form>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-danger" data-bs-dismiss="modal">
            Exluir
          </button>
          <button type="button" class="btn btn-primary">Salvar</button>
        </div>
      </div>
    </div>
  </div>
  
</body>

<script src="./assets/js/jquery.js"></script>
<script src="./assets/js/bootstrap.js"></script>
<script src="./assets/js/dashboard.js"></script>

</html>