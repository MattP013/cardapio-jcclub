<?php
// $pdo = new PDO('mysql:localhost;dbname=id19587817_db_jccoffe','id19587817_equipejc','YQ6z+prymM&(m*GU');
namespace class;
use \PDO;
use PDOException;

class Database {
    const HOST = 'localhost';
    const NAME = 'id19587817_db_jccoffe';
    const USER = 'id19587817_equipejc';
    const PASS = 'YQ6z+prymM&(m*GU';

    private $table;

    private $connection;

    public function __construct($table = null){
        $this->$table = $table;
        $this->setConnection();

    }

    private function setConnection(){
        try{
            $this->connection = new PDO('mysql:host='.self::HOST.';dbname='.self::NAME,self::USER,self::PASS);
            $this->connection->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        }catch(PDOException $e)
        {
            die("ERRO " .$e->getMessage());
        }
    }
}