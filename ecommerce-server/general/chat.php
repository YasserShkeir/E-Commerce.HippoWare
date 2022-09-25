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

        if($user_data->data->user_type ==1 ) {
            echo json_encode([
                'status' => 0,
                'message' => 'Access Denied',
            ]);
            die();
        }
        $store = $data["store"];

        $obj->select('`stores`','seller_id', null, "id = ".$store, null, null);// getting store id of seller
        $result = $obj->getResult();
        $sellerid=$result[0]['seller_id'];

        $obj->select('`chats`','*', null, "seller_id = ".$sellerid . " and client_id = ".$user_data->data->id, null, null);// getting store id of user
        $result = $obj->getResult();
        if($result){ $chatid=$result[0]['id'];
        }else {
            $obj->insert('chats',['seller_id' => $sellerid, 'client_id' => $user_data->data->id]);
            $obj->select('`chats`','*', null, "seller_id = ".$sellerid . " and client_id = ".$user_data->data->id, null, null);// getting messages
            $result = $obj->getResult();
            $chatid=$result[0]['id'];
        }
        $obj->select('`messages`','*', null, "chat_id = ".$chatid, null, null);// getting messages
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