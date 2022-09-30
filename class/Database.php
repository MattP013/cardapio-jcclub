<?php
// $pdo = new PDO('mysql:localhost;dbname=id19587817_db_jccoffe','id19587817_equipejc','YQ6z+prymM&(m*GU');
namespace class;
use \PDO;
use PDOException;

class Database {
    const HOST = 'localhost';
    const NAME = 'id19587817_db_jccoffe';
    const USER = 'id19587817_equipejc';
    const PASS = 'JLPq78feHcN_';

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

    public function execute($query, $params = []){
        try
        {
            $statement = $this->connection->prepare($query);
            $statement->execute($params);
            return $statement;
        }
        catch(PDOException $e)
        {
            die("ERRO " .$e->getMessage());
        }
    }

    public function insert($values)
    {
        $fields = array_keys($values);
        $binds = array_pad([],count($fields), '?');

        $query = 'INSERT INTO '.$this->table.' ('.implode(',',$fields).') values ('.implode(',', $binds).')';
        
        $this->execute($query, array_values($values));

        return $this->connection->lastInsertId();

    }

    public function select($where=null, $order=null, $limit = null, $fields = '*'){

        $where = strlen($where) ? 'WHERE ' .$where : '';
        $order = strlen($order) ? 'ORDER ' .$order : '';
        $limit = strlen($limit) ? 'LIMIT ' .$limit : '';
        $query = 'SELECT '.$fields.'FROM '.$this->table.' '.$where.' '.$order. ' '.$limit;

        return $this->execute($query);
    }
}