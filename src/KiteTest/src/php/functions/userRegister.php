<?php
/**
 * function for registering a new user into the database
 */
require_once('includes/constants.inc.php');
require_once('includes/connection.inc.php');
require_once('classes/User.php');
$json = file_get_contents('php://input');
$obj = json_decode($json,true);
$FirstName = $obj['firstName'];
$LastName =  $obj['lastName'];
$email = $obj['email'];
$password =$obj['password'];
$d=mktime(0, 0, 0, 5 , 12, 2015);
$DOB = date("Y-m-d", $d);
/**
 * randomly sets the id
 */
$id = rand(1, 999999999);
$CheckSQL2 = "SELECT * FROM Users WHERE UsersId = $id ";
$checkId  = mysqli_fetch_array(mysqli_query($conn,$CheckSQL2));
while(isset($checkId)){
    $id = rand(1, 999999999);
    $CheckSQL2 = "SELECT * FROM Users WHERE UsersId = $id ";
    $checkId = mysqli_fetch_array(mysqli_query($conn,$CheckSQL2));
}
if(isset($checkId)){
    echo json_encode('omg big problem!!');
}
$Current_User = new User($id);
$returned = $Current_User->registerUser($id, $FirstName, $LastName, $email, $password, $DOB);
echo json_encode($returned);
?>