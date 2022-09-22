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
        $request_body = file_get_contents('php://input');
        $data = json_decode($request_body, true);

        $first_name = $data['first_name'];
        $last_name = $data['last_name'];
        $username = $data['username'];
        $email = $data['email'];
        $image = $data['image'];
        $password = hash("sha256",$data['password']);
        $user_type_id = $data['user_type_id'];
        $date = date('Y-m-d');
        $flag = 1;
        $issues = [];

        $accepted = 0;
        if($user_type_id == 3){
            $accepted = 1;
        }

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

        define('UPLOAD_DIR', '../images/');
        $img = $image;
        $img = str_replace('data:image/png;base64,', '', $img);
        $img = str_replace(' ', '+', $img);
        $data = base64_decode($img);
        $file = UPLOAD_DIR . uniqid() . '.png';
        $images_to_save = "/xampp/htdocs/E-Commerce.HippoWare/ecommerce-server/".$file;

        if($flag){
            $obj->insert('users', ['user_type_id' => $user_type_id, 'first_name' => $first_name, 'last_name' => $last_name, 'username' => $username, 'email' => $email, 'password' => $password, 'image' => $images_to_save, 'accepted' => $accepted, 'date' => $date]);
            $result = $obj->getResult();
            $success = file_put_contents($file, $data);
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