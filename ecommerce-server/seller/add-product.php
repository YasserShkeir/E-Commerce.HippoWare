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
        
        $category = $data["category"];
        $price = $data["price"];
        $name = $data['name'];
        $description = $data["description"];
        $color = $data['color'];
        $size = $data["size"];
        $revenue = $data["revenue"];

        $obj->select('`stores`','id', null, "seller_id = ".$user_data->data->id, null, null);// getting store id of user
        $result = $obj->getResult();
        $storeid = $result[0]['id'];

        $where = "store_id = " . $storeid . " and name = '$category'";

        $obj->select('`categories`', 'id', null, $where, null, null);// checking if category already exists
        $result = $obj->getResult();
        $catid = $result[0]['id'];

        // image decoding
        define('UPLOAD_DIR', 'images/');
        $img = $data['image'];
        $img = str_replace('data:image/png;base64,', '', $img);
        $img = str_replace(' ', '+', $img);
        $data = base64_decode($img);
        $filee = UPLOAD_DIR . uniqid() . '.png';
        $file = "../".$filee;
        $images_to_save = "/xampp/htdocs/E-Commerce.HippoWare/ecommerce-server/".$filee;

        $insertArr = [
            'category_id' => $catid,
            'store_id' => $storeid,
            'name' => $name,
            'price' =>$price,
            'image' =>	$images_to_save,
            'description' =>$description,
            'color' => $color,
            'size' => $size,
            'views' => 0,
            'revenue' =>$revenue
        ];

        $obj->insert('products',$insertArr );
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