<?php
require_once('includes/constants.inc.php');
require_once('includes/connection.inc.php');

/**
 * funciton for allowing a url to call different function within this one file
 */
if(function_exists($_GET['f'])) {
   $_GET['f']();
}

function searchForUser(){
    global $conn;

    $json = file_get_contents('php://input');
    $obj = json_decode($json,true);

    $searchString = $obj['searchString'];

    $returned->isValid = 'valid';

    $sql= "SELECT UsersId, FirstName, LastName, ProfilePicture FROM Users WHERE (FirstName Like '%$searchString%') OR (LastName Like '%$searchString%')";
    $stmt = $conn->prepare($sql);
    $stmt->execute();
    $stmt->bind_result($UsersId, $FirstName, $LastName, $ProfilePicture);
    $stmt->store_result();
    $returned->timeline = array();
    while($stmt->fetch()){
        $temp = array('UsersId'=>$UsersID, 'FirstName'=>$FirstName, 'LastName'=>$LastName, 'ProfilePicture'=>$ProfilePicture);
        array_push($returned->timeline, $temp);
    }
    $stmt->close();
    echo json_encode($returned);
}

function searchForCommunity(){
    global $conn;

    $json = file_get_contents('php://input');
    $obj = json_decode($json, true);

    $searchString = $obj['searchString'];

    $returned->isValid = 'valid';

    $sql = "SELECT Title, CommunityId, ProfilePicture FROM Communities WHERE (Title Like '%$searchString%')";
    $stmt = $conn->prepare($sql);
    $stmt->execute();
    $stmt->bind_result($Title, $CommunityId, $ProfilePicture);
    $stmt->store_result();
    $returned->timeline = array();
    while($stmt->fetch()){
        $temp = array('Title'=>$Title, 'CommunityId'=>$CommunityId, 'ProfilePicture'=>$ProfilePicture);
        array_push($returned->timeline, $temp);
    }
    $stmt->close();
    echo json_encode($returned);
}

function searchForEvent(){
    global $conn;

    $json = file_get_contents('php://input');
    $obj = json_decode($json, true);

    $searchString = $obj['searchString'];

    $returned->isValid = 'valid';

    $sql = "SELECT PostEvent.id, PostEvent.UsersId, PostEvent.EventName, PostEvent.DateAdded, PostEvent.Description, Users.FirstName, Users.LastName, Users.ProfilePicture 
    FROM PostEvent
    INNER JOIN Users ON PostEvent.UsersId = Users.UsersId 
    WHERE (PostEvent.EventName Like '%$searchString%')";
    $stmt = $conn->prepare($sql);
    $stmt->execute();
    $stmt->bind_result($id, $UsersID, $EventName, $DateAdded, $Description, $FirstName, $LastName, $ProfilePicture);
    $stmt->store_result();
    $returned->timeline = array();
    while($stmt->fetch()){
        $dt = new DateTime($DateAdded);
        $tempDate = $dt->format('Y-m-d');
        $temp = array('id'=>$id, 'UsersId'=>$UsersID, 'title'=>$EventName, 'time'=>$tempDate, 'description'=>$Description, 'FirstName'=>$FirstName, 'LastName'=>$LastName, 'ProfilePicture'=>$ProfilePicture);
        array_push($returned->timeline, $temp);
    }
    $stmt->close();
    echo json_encode($returned);
    }
?>