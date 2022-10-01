<?php
namespace Class;
use Class\Database;
use \PDO;
class Produto{

    public $nmproduto;

    public $cdquantidade;

    public $vlproduto;

    public $icativo;

    public $cdcategoria;

    public $imgproduto;

    public $data;

    public function cadastrar()
    {
        $this->data = date('Y-m-d H:i:s');
        $Data = new Database('tb_produto');
        $this->id = $Data->insert([
            'nm_produto'       => $this->nmproduto,
            'cd_quantidade'    => $this->cdquantidade,
            'vl_produto'       => $this->vlproduto,
            'ic_ativo'         => $this->icativo,
            'cd_categoria'     => $this->cdcategoria,
            'img_produto'     => $this->imgproduto
        ]);

        return true;
    }

    public static function getProdutos($where = null, $order = null, $limit = null)
    {
        return (new Database('tb_produto'))->select($where,$order,$limit)
                                           ->fetchAll(PDO::FETCH_CLASS, self::class);

    }               

  


}