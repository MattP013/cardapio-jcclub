<?php

namespace class;
use \connection;
class Produto{

    public $nmproduto;

    public $cdquantidade;

    public $vlproduto;

    public $icativo;

    public $cdcategoria;

    public function cadastrar()
    {
        $Data = new Database('tb_produto');
        $Data->insert([
            'nome'       => $this->nmproduto,
            'quantidade' => $this->cdquantidade,
            'valor'      => $this->vlproduto,
            'ativo'      => $this->icativo,
            'categoria'  => $this->cdcategoria
        ]);

    }

    public function insert($values)
    {
        
    }


}