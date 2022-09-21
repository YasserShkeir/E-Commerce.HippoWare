<?php


header('Access-Control-Allow-Origin:*');
header('Access-Control-Allow-Method:POST');
header('Content-Type:application/json');
include '../database/Database.php';
include '../vendor/autoload.php';

use \Firebase\JWT\JWT;
use Firebase\JWT\Key;

$obj = new Database();

if ($_SERVER["REQUEST_METHOD"] == 'POST') {
    try {
        $allheaders = getallheaders();
        $jwt =$allheaders['Authorization'];
        $secret_key = "Hippo";
        $user_data = JWT::decode($jwt, new Key($secret_key, 'HS256'));

        $id = $user_data->data->id;
        $where = "user_type_id = 2";
        $sortby=null;
        if($_POST['sortby']){
            if($_POST['sortby'] == 'name-acs') $sortby = "first_name ASC, last_name ASC";
            else if($_POST['sortby'] == 'name-desc') $sortby = "first_name DESC, last_name DESC";
            else if($_POST['sortby'] == 'date-acs') $sortby = "date ACS";
            else if($_POST['sortby'] == 'date-desc') $sortby = "date DESC";
        }
        if($_POST['date']){
            $date = explode(' ',$_POST['date']); 
            $where .= " and date < '$date[1]' and  date > '$date[1]'";
        }
        if($_POST['search']){ 
            $where .= " first_name LIKE '%".$_POST['search']."%' or first_name LIKE '%".$_POST['search']."%'";
        }
        if($_POST['fiter']){
            $where .= " accepted = ".$_POST['fiter'];
        }
        
        $obj->select('users', '*', null, $where, $sortby, null);
        $result = $obj->getResult();
        echo json_encode($result);
    } catch (Exception $e) {
        echo json_encode([
            'status' => 0,
            'message' => $e->getMessage(),
        ]);
    }
} else {
    echo json_encode([
        'status' => 0,
        'message' => 'Access Denied',
    ]);
}