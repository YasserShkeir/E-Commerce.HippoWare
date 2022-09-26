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

        //gets cart id
        $obj->select('carts','id', null, `client_id = `.$user_data->data->id, null, null);
        $result = $obj->getResult();
        $cart = $result[0]['id'];

        //fetching data
        $product = $data['product'];
        $size = $data['size'];
        $color = $data['color'];
        $date = date('Y-m-d');

        //adds item to cart items as purchased and delete it from whishlist
        $obj->insert('cart_items',['products_id' => $product, 'cart_id' => $cart, 'quantity' => 1, 'size' => $size, 'date' => $date, 'paid' => 1,'discount' => 0]);
        $result = $obj->getResult();
        echo json_encode($result);
        $obj->delete('whishlist', "client_id = " . $user_data->data->id . " and product_id = ".$product);
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