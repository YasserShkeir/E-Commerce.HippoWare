<?php
class Database
{
    private $localhost = "localhost";
    private $username = "root";
    private $password = "";
    private $database = "hippo-ware";

    private $mysqli = "";
    private $query;
    private $result = array();
    private $conn = false;

    //connect database using consturcted method
    public function __construct()
    {
        if (!$this->conn) {
            $this->mysqli = new mysqli($this->localhost, $this->username, $this->password, $this->database);
            $this->conn = true;

            if ($this->mysqli->connect_error) {
                array_push($this->result, $this->mysqli_connection_error);
                return false;
            }
        } else {
            return true;
        }
    }

    // insert data
    public function insert($table, $params = array())
    {
        if ($this->tableExist($table)) {
            $table_column = implode(', ', array_keys($params));
            $sql = "INSERT INTO $table ($table_column) VALUES (";
            $values= array_values($params);
            $types = '';
            $args_ref = array();
            if(count($params) > 1){
                for($i = 0; $i< count($params) - 1 ; $i++){
                    $sql .= "?,";
                } 
            }
            $sql .= "?)";
            print $sql;
            $this->query = $this->mysqli->prepare($sql);

            for($i = 0; $i< count($values); $i++){
                $types .= $this->_gettype($values[$i]);
                $args_ref[] = &$values[$i];
            }
            array_unshift($args_ref, $types);
            print_r($args_ref);
            call_user_func_array(array($this->query, 'bind_param'), $args_ref);
            $this->query->execute();
            if ($this->query->errno) {
                array_push($this->result, true);
                return true;
            } else {
                array_push($this->result, false);
                return false;
            }
        } else {
            return false;
        }
    }
    private function _gettype($var) {
	    if (is_string($var)) return 's';
	    if (is_float($var)) return 'd';
	    if (is_int($var)) return 'i';
	    return 'b';
	}

    // get result
    public function getResult()
    {
        $val = $this->result;
        $this->result = array();
        return $val;
    }
}