<?php
//Development
//require_once('../../functions/includes/constants.inc.php');
//require_once('../functions/includes/constants.inc.php');
if(!@include("../functions/includes/constants.inc.php")) {
	require_once('../../functions/includes/constants.inc.php');
} 
	
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