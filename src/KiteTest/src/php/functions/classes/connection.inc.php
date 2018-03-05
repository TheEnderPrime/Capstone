<?php

//HOST
$host		= "oniddb.cws.oregonstate.edu";
$user_name	= "kokeshs-db";
$password 	= "yHmn86AtlpAiMclr";
$dbname 	= "kokeshs-db";

//Live 
global $conn; 
//CONNECTION
//Database Connection 
$conn = mysqli_connect($host, $user_name, $password , $dbname);
//Check connection
if (mysqli_connect_errno()) {
  echo "Failed to connect to MySQL: " . mysqli_connect_error();
}
?> 