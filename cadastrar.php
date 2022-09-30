<?php 
    use class\Produto;
    if (!isset($_POST['nome_produto'])) {
        $produto = new Produto();
        $produto->nmproduto    = $_POST['nome_produto'];
        $produto->cdquantidade = $_POST['quantidade'];
        $produto->vlproduto    = $_POST['valor_produto'];
        $produto->cdcategoria  = $_POST['id_categoria'];
        $produto->imgproduto  = $_POST['imagem_produto'];
        $produto->icativo      = $_POST['ativo'];
        $produto->cadastrar();

        header('location: index.php?status=success');
        exit;
    }

    // include __DIR__.'/index.php';

?>