<?php

require_once 'dbConn.php';

$servername = "localhost";
$username = "root";
$password = "root";
$dbname = "photographer_db";
$id = $_POST["id"];
$db = new db($servername,$username,$password,$dbname);

$user = $db->query("SELECT all_data FROM forms WHERE id='$id'")->fetchArray();

if($user) {
    echo json_encode(['code'=>200, 'user'=>$user, 'id'=>$id ]);
    exit;
}
    echo json_encode(['code'=>404]);
