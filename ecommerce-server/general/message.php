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
        date_default_timezone_set('Asia/Beirut');
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
        $message = $data["message"];

        $obj->select('`stores`','seller_id', null, "id = ".$store, null, null);// getting store id of user
        $result = $obj->getResult();
        $sellerid=$result[0]['seller_id'];

        $obj->select('`chats`','*', null, "seller_id = ".$sellerid . " and client_id = ".$user_data->data->id, null, null);// getting store id of user
        $result = $obj->getResult();
        $chatid=$result[0]['id'];

        $time = date('Y-m-d h:i:s');

        $obj->insert('messages',["chat_id" =>$chatid , 'content' => $message, 'sender_id' => $user_data->data->id, 'timestamp' => `TO_TIMESTAMP('$time', 'YYYY-MM-DD HH24:MI:SS')`]);
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