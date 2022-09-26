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

    // getting item details
    $where = "p.store_id = s.id and p.id = ".$data['product'];
        
    $obj->select('`products` as p, stores as s','p.name, p.id, p.color, p.size, p.image, p.price, s.name as store, p.description,p.views', null, $where, null, null);
    $result = $obj->getResult();
    echo json_encode($result);
    $views = (int)$result[0]['views'];
    $obj->update('products', ['views' => $views + 1],"id='".$data['product']."'" );
            

} else {
    echo json_encode([
        'status' => 0,
        'message' => 'Access Denied',
    ]);
}
?>