<?php

header('Access-Control-Allow-Origin:*');
header('Access-Control-Allow-Method:POST');
include '../database/Database.php';
require '../vendor/autoload.php';

use \Firebase\JWT\JWT;


$obj = new Database();

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $request_body = file_get_contents('php://input');
    $data = json_decode($request_body, true);
    $email = $data['email'];
    $password =hash("sha256",$data['password']);

    $obj->select('users', '*', null, "email='{$email}'", null, null); // selected data for given attribute
    $datas = $obj->getResult();
    foreach ($datas as $data) {
        $id = $data['id'];
        $email = $data['email'];
        $name = $data['first_name'] . " " . $data['last_name'];
        $dbpass = $data['password'];
        $user_type = $data['user_type_id'];
        $status= $data['accepted'];
        if ($dbpass != $password || $status !=1) {
            echo json_encode([
                'status' => 0,
                'message' => 'Invalid Carditional',
            ]);
        }else {
            $payload = [
                'exp' => time() + 1440000, //adds 1 day to exp date
                'data' => [
                    'id' => $id,
                    'name' => $name,
                    'user_type'=> $user_type,
                    'email' => $email,
                ],
            ];
            $secret_key = "Hippo";
            $jwt = JWT::encode($payload, $secret_key, 'HS256');
            echo json_encode([
                'status' => 1,
                'jwt' => $jwt,
                'name' => $name,
                'user_type' => $user_type,
                'message' => 'Login Successfully',
            ]);
        }
    }
} else {
    echo json_encode([
        'status' => 0,
        'message' => 'Access Denied',
    ]);
}
?>