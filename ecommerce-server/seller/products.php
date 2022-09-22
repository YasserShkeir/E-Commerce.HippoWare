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

        $where = "u.id = s.seller_id and p.store_id = s.id and p.category_id = c.id and u.id = ".$user_data->data->id;
        if($data['category']){ // category filtering
            $where .= " and c.name = '". $data['category']."'";
        }

        if($data['search']){ //search filtering
            $where .= " and p.name LIKE '%".$data['search']."%'";
        }
        
        $obj->select('`products` as p JOIN `users` as u JOIN `stores` as s JOIN `categories` as c',
         'p.id, p.category_id, p.store_id, p.name, p.price
        , p.image, p.description, p.color, p.size, p.views, p.revenue ', null, $where, null, null);
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