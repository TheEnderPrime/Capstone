<?php
require_once('includes/constants.inc.php');
require_once('includes/connection.inc.php');
//require_once('classes/Communities.php');

/**
 * funciton for allowing a url to call different function within this one file
 */
if(function_exists($_GET['f'])) {
   $_GET['f']();
}

/**
 * GetProfile function takes in the userID and then gathers all of the other 
 * information about a user and creates an user object then encodes it as a 
 * json string and sends it back to the ui
 */
function getCommunity() {
    global $conn;

    $json = file_get_contents('php://input');
    $obj = json_decode($json,true);
    
    $thisCommunityID = $obj["CommunityID"];

    $return->isValid = 'notValid';
    $result = mysqli_query($conn, "SELECT * FROM Communities WHERE CommunityId = '$thisCommunityID'");
    if(!$result){
        echo json_encode($return);
    }
    while($row = mysqli_fetch_row($result)){
        $community->CommunityID = $row[0];
        $community->Title = $row[1];
        $community->AboutUs = $row[2];
        $community->ProfilePicture = $row[3];
        $community->adminID = $row[4];
        $return->isValid = 'valid';
        $return->community = $community;
    }
    
    echo json_encode($return);
}


?>