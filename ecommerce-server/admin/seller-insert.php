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

        $image = $data['image'];
        $fname = $data['first_name'];
        $lname = $data['last_name'];
        $username = $data['username'];
        $email = $data['email'];
        $password = hash("sha256",$data['password']);
        $date = date('Y-m-d');
        $flag = 1;
        $issues = [];

        $obj->select('users', '*', null, "email='{$email}'", null, null);
        $result = $obj->getResult();
        if($result){
            $flag=0;
            $issues[] = "dup email";
        }
        $obj->select('users', '*', null, "username='{$username}'", null, null);
        $result = $obj->getResult();
        if($result){
            $flag=0;
            $issues[] = "dup username";
        }

        define('UPLOAD_DIR', 'images/');
        $img = $image;
        $img = str_replace('data:image/png;base64,', '', $img);
        $img = str_replace(' ', '+', $img);
        $data = base64_decode($img);
        $filee = UPLOAD_DIR . uniqid() . '.png';
        $file = "../".$filee;
        $images_to_save = "/xampp/htdocs/E-Commerce.HippoWare/ecommerce-server/".$filee;
        
        if($flag){
            $obj->insert('users', ['user_type_id' => 2, 'first_name' => $fname, 'last_name' => $lname, 'username' => $username, 'email' => $email, 'password' => $password, 'image' => $images_to_save, 'accepted' => 1, 'date' => $date]);
            $result = $obj->getResult();
            file_put_contents($file, $data);
            echo json_encode($result);
        }else {
            echo json_encode($issues);
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