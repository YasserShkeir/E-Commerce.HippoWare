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
    $request_body = file_get_contents('php://input');
    $data = json_decode($request_body, true);
        
    //selecting top selling products
    $obj->select('(SELECT p.id,p.name,p.image,p.description,p.price, COUNT(p.id) as total FROM `products` as p, cart_items as c
     WHERE c.paid = 1 and c.products_id = p.id GROUP By p.id) as a',
    '*', null, null, 'total DESC', '0,4');
    $result = $obj->getResult();
    echo json_encode($result);

} else {
    echo json_encode([
        'status' => 0,
        'message' => 'Access Denied',
    ]);
}
?>