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
        $request_body = file_get_contents('php://input');
        $data = json_decode($request_body, true);

        if($user_data->data->user_type != 1) echo json_encode([
            'status' => 0,
            'message' => 'Access Denied',
        ]);

        $where = "user_type_id = 2 and accepted != -1 and accepted != -2";
        $sortby=null;
        if($data['sortby']){ // gets the sorts needed if any
            if($data['sortby'] == 'name-acs') $sortby = "first_name ASC, last_name ASC";
            else if($data['sortby'] == 'name-desc') $sortby = "first_name DESC, last_name DESC";
            else if($data['sortby'] == 'date-acs') $sortby = "date ACS";
            else if($data['sortby'] == 'date-desc') $sortby = "date DESC";
        }
        if($data['date']){ // date filtering
            $date = explode(' ',$data['date']); 
            $where .= " and date < '$date[1]' and  date > '$date[0]'";
        }
        if($data['search']){ //search filtering
            $where .= " and (first_name LIKE '%".$data['search']."%' or first_name LIKE '%".$data['search']."%')";
        }
        if($data['filter'] != 2){ // filter accoridng to acceptance status
            $where .= " and accepted = ".$data['filter'];
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
?>