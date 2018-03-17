<?php
require_once('includes/constants.inc.php');
require_once('includes/connection.inc.php');
require_once('classes/User.php');
$json = file_get_contents('php://input');
$obj = json_decode($json,true);
$Email = $obj['email'];
$Password = $obj['password'];
// get id for this email
$sql = "SELECT UsersId FROM Users WHERE Email = ?";
if($stmt = $conn->prepare($sql)){
    $stmt->bind_param('s', $Email);
    $stmt->execute();
    $stmt->bind_result($id);
    $stmt->fetch();
    $stmt->close();
    if(isset($id)){
        $Current_User = new User($id);
        $returned = $Current_User->checkPassword($Password);
        $returnObj->isValid = $returned;
        $returnObj->id = $id;
        echo json_encode($returnObj);
    }
    else{
        echo json_encode("this email does not exist");
    }
}
else{
     echo json_encode("this email does not exist");
}
?>