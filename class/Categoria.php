<?php
namespace Class;
use Class\Database;
use \PDO;

class Categoria{
    public $nmcategoria;
    public $cdcategoria;

    public static function getCategoria()
    {   
        return (new Database('tb_categoria'))->select()
        ->fetchAll(PDO::FETCH_CLASS, self::class);
    }
}