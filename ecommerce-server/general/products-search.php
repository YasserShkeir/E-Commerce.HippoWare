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

    //selects products for a given keyword
    $search = $data['search'];
    $where = "name LIKE '%" . $search . "%'";
        
    $obj->select('`products`','*', null, $where, null, null);
    $result = $obj->getResult();
    echo json_encode($result);

} else {
    echo json_encode([
        'status' => 0,
        'message' => 'Access Denied',
    ]);
}
?>