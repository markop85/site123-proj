<?php
    require_once 'dbConn.php';
    
    $servername = "localhost";
    $username = "root";
    $password = "root";
    $dbname = "photographer_db";
    
    foreach($_POST as $key => $value) {
        $$key = $value;
    };
    $db = new db($servername,$username,$password,$dbname);
    $insert =null;
    if($id == null) {
        $insert = $db->query('INSERT INTO forms (full_name,email,phone,url,all_data) VALUES (?,?,?,?,?)',$name.' '.$lastName,$email,$phone,$siteName,json_encode($_POST));
    }else{
        $mysqli = mysqli_connect("localhost", "root", "root", "photographer_db");
        $allData = json_encode($_POST);
        $insert =mysqli_query($mysqli,"UPDATE forms SET full_name = '$name.' '.$lastName', email= '$email', phone= '$phone',url= '$siteName', all_data ='$allData' WHERE id='$id'");
    }
    
    if($insert){
        $msg = "fullName: ".$name.' '.$lastName.", email: ".$email.", phone: ".$phone.", siteName:".$siteName;
        echo json_encode(['code'=>200, 'msg'=>$msg]);
        exit;
    }
    echo json_encode(['code'=>404]);
    


