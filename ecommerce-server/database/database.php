<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, GET, OPTIONS, PUT, DELETE');
header('Access-Control-Allow-Headers: Origin, Content-Type, Accept, Authorization, X-Request-With');
require '../vendor/autoload.php';
ini_set('memory_limit', '44M');

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
            //mysqli_report(MYSQLI_REPORT_ALL);
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
            $this->query = $this->mysqli->prepare($sql);

            for($i = 0; $i< count($values); $i++){
                $types .= $this->_gettype($values[$i]);
                $args_ref[] = &$values[$i];
            }
            array_unshift($args_ref, $types);
            call_user_func_array(array($this->query, 'bind_param'), $args_ref);
            $this->query->execute();
            
            if (!$this->query->errno) {
                array_push($this->result, true);
                return true;
            } else {
                array_push($this->result, false);
                return false;
            }
    }

    // get data
    public function select($table, $row = "*", $join = null, $where = null, $order = null, $limit = null)
    {
            $sql = "SELECT $row FROM $table";
            if ($join != null) {
                $sql .= " JOIN $join";
            }
            if ($where != null) {
                $sql .= " WHERE $where";
            }
            if ($order != null) {
                $sql .= " ORDER BY $order";
            }
            if ($limit != null) {
                $sql .= " LIMIT $limit";
            }
            $query = $this->mysqli->query($sql);
            if ($query) {
                $this->result = $query->fetch_all(MYSQLI_ASSOC);
                return true;
            } else {
                return false;
            }
        }

    // update data
    public function update($table, $params = array(), $where = null)
    {
            $arg = array();
            foreach ($params as $key => $val) {
                $arg[] = "$key = '{$val}'";
            }
            $sql = "UPDATE $table SET " . implode(', ', $arg);
            if($where != null){
                $sql .=" WHERE $where";
            }
            if ($this->mysqli->query($sql)) {
                array_push($this->result, true);
                return true;
            } else {
                array_push($this->result, false);
                return false;
            }
    }
    // delete data
    public function delete($table, $where = null)
    {
            $sql = "DELETE FROM $table";
            if ($where != null) {
                $sql .= " WHERE $where";
                // print $sql;
            }
            if ($this->mysqli->query($sql)) {
                array_push($this->result, true);
                return true;
            } else {
                array_push($this->result, false);
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

    // close the connection
    public function __destruct()
    {
        if ($this->conn) {
            if ($this->mysqli->close()) {
                $this->conn = false;
                return true;
            }
        } else {
            return false;
        }
    }
}
?>