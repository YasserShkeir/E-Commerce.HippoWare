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

    
}