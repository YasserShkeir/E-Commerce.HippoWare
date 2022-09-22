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

        if($user_data->data->user_type != 2) echo json_decode([
            'status' => 0,
            'message' => 'Access Denied',
        ]);
        $category = $data["category"];

        $obj->select('`stores`','id', null, "seller_id = ".$user_data->data->id, null, null);// getting store id of user
        $result = $obj->getResult();
        $storeid=$result[0]['id'];
        $where = "store_id = " . $storeid . " and name = '$category'";

        $obj->select('`categories`', '*', null, $where, null, null);// checking if category already exists
        $result = $obj->getResult();
        
        if($result){ // if category exits insert fails
            echo json_encode([
                'status' => 0,
                'message' => 'Category exists',
            ]);
        }
        else{
            $obj->insert('categories',['store_id' => $storeid, 'name' => $category]);
            $result = $obj->getResult();
            echo json_encode($result);
        }
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