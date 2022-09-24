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

        if($user_data->data->user_type != 2) echo json_encode([
            'status' => 0,
            'message' => 'Access Denied',
        ]);
        $name = $data["name"];
        $welc_msg = $data["welc_msg"];

        define('UPLOAD_DIR', 'images/');
        $img = $data['image'];
        $img = str_replace('data:image/png;base64,', '', $img);
        $img = str_replace(' ', '+', $img);
        $data = base64_decode($img);
        $filee = UPLOAD_DIR . uniqid() . '.png';
        $file = "../".$filee;
        $images_to_save = "/xampp/htdocs/E-Commerce.HippoWare/ecommerce-server/".$filee;


        $obj->insert('stores',['seller_id' => $user_data->data->id,'name' => $name , 'image' => $images_to_save, 'welc_msg' => $welc_msg]);
        $result = $obj->getResult();
        file_put_contents($file, $data);
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