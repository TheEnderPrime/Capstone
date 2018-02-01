<?php
 
// Importing DBConfig.php file.
include 'DBConfig.php';
 
// Creating connection.
 $con = mysqli_connect($HostName,$HostUser,$HostPass,$DatabaseName);
 
 // Getting the received JSON into $json variable.
 $json = file_get_contents('php://input');
 
 // decoding the received JSON and store into $obj variable.
 $obj = json_decode($json,true);

 $check = null;
 
// Populate User userNameOrEmail from JSON $obj array and store into $email.
$userNameOrEmail = $obj['userNameOrEmail'];
 
//Applying User Login query with email and password match.
$Sql_Query1 = "select password from UserRegistrationTable where (email = '$userNameOrEmail') or (name = '$userNameOrEmail')";
 
// Executing SQL Query.
$HashPass = mysqli_fetch_array(mysqli_query($con,$Sql_Query1));

// Populate Password from JSON $obj array and store into $password.
$password = $obj['password'];
if(password_verify($password, $HashPass[0])){
    
    //Applying User Login query with email and password match.
    $Sql_Query = "select * from UserRegistrationTable where email = '$userNameOrEmail' or name = '$userNameOrEmail'";
 
    // Executing SQL Query.
    $check = mysqli_fetch_array(mysqli_query($con,$Sql_Query));

}

if(isset($check)){
 
 $SuccessLoginMsg = 'Data Matched';
 
 // Converting the message into JSON format.
$SuccessLoginJson = json_encode($SuccessLoginMsg);
 
// Echo the message.
 echo $SuccessLoginJson ; 
 
 }
 
 else{
 
 // If the record inserted successfully then show the message.
$InvalidMSG = 'Invalid Username/Eamil or Password Please Try Again' ;

// Converting the message into JSON format.
$InvalidMSGJSon = json_encode($InvalidMSG);
 
// Echo the message.
 echo $InvalidMSGJSon ;
 
 }
 
 mysqli_close($con);
?>