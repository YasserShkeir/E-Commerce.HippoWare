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

         //checking if he is a selller
         if($user_data->data->user_type != 3){
            echo json_encode([
                'status' => 0,
                'message' => 'Access Denied',
            ]);
            die();
        } 
        //gets store id
        $obj->select('`stores`','id', null, "seller_id = ".$user_data->data->id, null, null);// getting store id of user
        $result = $obj->getResult();
        $storeid=$result[0]['id'];
        $where = "c.paid = 1 and c.products_id = p.id AND p.store_id = " . $storeid;

        // handling date info
        $start_date = $data['startdate'];
        $end_date = $data['enddate'];
        if($start_date){
            $where .=" and c.date <= '" . $end_date."'"." and c.date >= '" . $start_date."'";
        }
        $where .= " GROUP by p.id";
        
        //gets profit of given period of time
        $obj->select('(SELECT CAST(sum((((p.price - ((100-p.revenue)/100)*p.price)-c.discount)) * c.quantity) as DECIMAL(20,
        2)) as profit, p.id, p.name, p.image,c.date FROM `cart_items` as c, `products` as p  WHERE '.$where.') as a',
        "SUM(profit) as profit",
        null, null,null, null);
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