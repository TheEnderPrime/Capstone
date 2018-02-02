<?php
 
// Importing DBConfig.php file.
include 'DBConfig.php';
 
// Creating connection.
 $con = mysqli_connect($HostName,$HostUser,$HostPass,$DatabaseName);
 
 // Getting the received JSON into $json variable.
 $json = file_get_contents('php://input');
 
 // decoding the received JSON and store into $obj variable.
 $obj = json_decode($json,true);

$id = null;
 // Populate User name from JSON $obj array and store into $name.
$FirstName = $obj['firstName'];
$LastName = $obj['lastName'];
// Populate User email from JSON $obj array and store into $email.
$Email = $obj['email'];
$DOB = $obj['dateBirth']
// Populate Password from JSON $obj array and store into $password.
$password = $obj['password'];
$hash = password_hash($password, PASSWORD_DEFAULT);
 
 //Checking Email is already exist or not using SQL query.
$CheckSQL1 = "SELECT * FROM Users WHERE Email='$Email'";

    // Executing SQL Query.
$checkEmail = mysqli_fetch_array(mysqli_query($con,$CheckSQL1));
    
if(isset($checkEmail)) {
    
    $EmailExistMSG = 'Email Already Exist, Please Try Again !!!';
    
    // Converting the message into JSON format.
    $EmailExistJson = json_encode($EmailExistMSG);
    
    // Echo the message.
    echo $EmailExistJson ; 
    
}
else{
     $id = rand(1, 9999999999);
     $CheckSQL2 = "SELECT * FROM Users WHERE UsersId='$id'";
     $checkId = mysqli_fetch_array(myysqli_query($con,$CheckSQL2));
     while(isset($checkId) is true){
        $id = rand(1, 9999999999);
        $CheckSQL2 = "SELECT * FROM Users WHERE UsersId='$id'";
        $checkId = mysqli_fetch_array(myysqli_query($con,$CheckSQL2));
}
// Creating SQL query and insert the record into MySQL database table.
$Sql_Query = "INSERT into Users(UserId,FirstName, LastName, Email, password, DateOfBirth) values ('$UsersId', '$FirstName', '$LastName, '$Email', '$hash', '$DateOfBirth')";

 if(mysqli_query($con,$Sql_Query)) {
 
 // If the record inserted successfully then show the message.
$MSG = 'User Registered Successfully' ;
 
// Converting the message into JSON format.
$json = json_encode($MSG);
 
// Echo the message.
 echo $json ;
 
 }
 else {
 echo 'Try Again';
 }
 }
 mysqli_close($con);
?>