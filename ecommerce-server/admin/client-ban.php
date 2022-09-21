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

        if($user_data->data->user_type != 1) 
        echo json_decode([
            'status' => 0,
            'message' => 'Access Denied',
        ]);

        $id = $_POST['id'];

        $obj->select('users', '*', null, "id='{$id}'", null, null); // gets current ban status
        $datas = $obj->getResult();
        foreach ($datas as $data) {
            if($data['accepted'] == 1){
                $ban = 0;
            }else $ban = 1;
        }
        $obj->update('users', ['accepted' => $ban],"id='{$id}'" );
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