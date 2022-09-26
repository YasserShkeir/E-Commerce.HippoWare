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
        

        $storeid=$data["storeid"];
        $where = "p.category_id = c.id and p.store_id = c.store_id and p.store_id = ".$storeid;

        if($data['category']){ // category filtering
            $where .= " and c.name = '". $data['category']."'";
        }
        $where .= " Group by p.id";
        // getting products for a given store
        $obj->select('`products` as p JOIN `stores` as s JOIN `categories` as c',
         'p.id, p.category_id, p.store_id, p.name, p.price
        , p.image, p.description, p.color, p.size, p.views, p.revenue ', null, $where, null, null);
        $result = $obj->getResult();
        echo json_encode($result);

} else {
    echo json_encode([
        'status' => 0,
        'message' => 'Access Denied',
    ]);
}
?>