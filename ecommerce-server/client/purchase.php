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

        if($user_data->data->user_type != 3){
            echo json_encode([
                'status' => 0,
                'message' => 'Access Denied',
            ]);
            die();
        }
        $obj->select('carts','id', null, `client_id = `.$user_data->data->id, null, null);
        $result = $obj->getResult();
        $cart = $result[0]['id'];

        $product = $data['product'];
        $code = $data['code'];
        $date = date('Y-m-d');

        $where = "id = " . $code;

        if($code){
            $obj->select('`discountcodes`','*', null, $where, null, null);
            $result = $obj->getResult();
            $dis_store_id = $result[0]["store_id"];
            $limit = $result[0]["limits"];
            $discount = $result[0]["discount"];

            $where = "id = " . $product;

            $obj->select('`products`','*', null, $where, null, null);
            $result = $obj->getResult();
            $prod_store_id = $result[0]["store_id"];
            $price = $result[0]["price"];

            if($prod_store_id == $dis_store_id && $price >= $limit){
                $obj->update('cart_items',['date' => $date, 'paid' => 1, 'discount' => $discount], 'cart_id = '. $cart . ' and products_id = '.$product);
                $result = $obj->getResult();
                echo json_encode([
                    'discount' => 1,
                    'message' => 1,
                ]);
            }else {
                $obj->update('cart_items',['date' => $date, 'paid' => 1], 'cart_id = '. $cart . ' and products_id = '.$product);
                $result = $obj->getResult();
                echo json_encode([
                    'discount' => 0,
                    'message' => 1,
                ]);
            }
        }else{
            $obj->update('cart_items',['date' => $date, 'paid' => 1], 'cart_id = '. $cart . ' and products_id = '.$product);
            $result = $obj->getResult();
            echo json_encode([
                'discount' => 0,
                'message' => 1,
            ]);
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