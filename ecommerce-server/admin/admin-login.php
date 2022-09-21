<?php

header('Access-Control-Allow-Origin:*');
header('Access-Control-Allow-Method:POST');
include '../database/Database.php';
require '../vendor/autoload.php';

use \Firebase\JWT\JWT;


$obj = new Database();

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $email = $_POST['email'];
    $password =$_POST['password'];

    $obj->select('users', '*', null, "email='{$email}'", null, null);
    $datas = $obj->getResult();
    foreach ($datas as $data) {
        $id = $data['id'];
        $email = $data['email'];
        $name = $data['first_name'] . " " . $data['last_name'];
        $dbpass = $data['password'];
        // $password=$data['password'];
        if ($dbpass != $password) {
            echo json_encode([
                'status' => 0,
                'message' => 'Invalid Carditional',
            ]);
        } else {
            $payload = [
                'exp' => time() + 1440000, //10 mint
                'data' => [
                    'id' => $id,
                    'name' => $name,
                    'email' => $email,
                ],
            ];
            $secret_key = "Hippo";
            $jwt = JWT::encode($payload, $secret_key, 'HS256');
            echo json_encode([
                'status' => 1,
                'jwt' => $jwt,
                'name' => $name,
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