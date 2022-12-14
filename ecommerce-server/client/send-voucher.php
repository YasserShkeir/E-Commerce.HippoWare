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

        //checking if he is n client
        if($user_data->data->user_type != 3){
            echo json_encode([
                'status' => 0,
                'message' => 'Access Denied',
            ]);
            die();
        } 

        //fething data
        $reciever = $data['username'];
        $message = $data['message'];
        $value = $data['value'];

        // getting reciever id from username
        $obj->select('`users`','id', null, "username = '".$reciever."'", null, null);// getting store id of user
        $result = $obj->getResult();

        if(!$result){ // if user doesn't exist exit
            echo json_encode([
                'status' => 0,
                'message' => 'user does not exist',
            ]);
        }
        else{ // sends voucher
            $recieverid = $result[0]['id'];
            $obj->insert('vouchers',['sender_id' => $user_data->data->id, 'reciever_id' => $recieverid, 'message' => $message, 'value' => $value]);
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