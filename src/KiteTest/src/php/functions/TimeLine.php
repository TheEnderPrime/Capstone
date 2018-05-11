<?php
require_once('includes/constants.inc.php');
require_once('includes/connection.inc.php');
require_once('classes/SimplePost.php');
require_once('classes/Post.php');
require_once('classes/Event.php');

/**
 * funciton for allowing a url to call different function within this one file
 */
if(function_exists($_GET['f'])) {
   $_GET['f']();
}


/**
 * getMainTimeLine function returns the list of all events and the user that created the event along with
 * there photo and name so that in the timeline page the user will beable to see all the events with the
 * person who created them
 */
function getMainTimeLine(){
    global $conn;

    $json = file_get_contents('php://input');
    $obj = json_decode($json,true);

    $returned->isValid = 'valid';

    $sql = "SELECT PostEvent.id, PostEvent.UsersId, PostEvent.EventName, PostEvent.DateAdded, PostEvent.Description, Users.FirstName, Users.LastName, Users.ProfilePicture,
    (SELECT P.PictureOne FROM UserPost AS P JOIN PostEvent AS E ON E.Id = P.EventId WHERE P.EventId = PostEvent.id LIMIT 0, 1) AS postPicture 
    FROM PostEvent
    INNER JOIN Users ON PostEvent.UsersId = Users.UsersId
    WHERE Users.ActiveFlag = 1";

    $stmt = $conn->prepare($sql);
    $stmt->execute();
    $stmt->bind_result($id, $UsersID, $EventName, $DateAdded, $Description, $FirstName, $LastName, $ProfilePicture, $postPicture);
    $stmt->store_result();
    $returned->timeline = array();
    while($stmt->fetch()){
        $dt = new DateTime($DateAdded);
        $tempDate = $dt->format('Y-m-d');
        $temp = array('id'=>$id, 'UsersId'=>$UsersID, 'title'=>$EventName, 'time'=>$tempDate, 'description'=>$Description, 'FirstName'=>$FirstName, 'LastName'=>$LastName, 'ProfilePicture'=>$ProfilePicture, 'PostImage'=>$postPicture);
        array_push($returned->timeline, $temp);
    }
    $stmt->close();
    echo json_encode($returned);
}

/**
 * getCommunityTimeLine returns the list of events that are related to a certen community
 */
function getCommunityTimeLine(){
    global $conn;

    $json = file_get_contents('php://input');
    $obj = json_decode($json,true);

    $returned->isValid = 'valid';
    $result = mysqli_query($conn, "SELECT * FROM Communities");
    $returned->timeline = array();
    
    if(!$result){
        $returned->isValid = "notValid";
        echo json_encode($returned);
        exit;
    }
    while ($row = mysqli_fetch_row($result)){
        $something = NULL;
        $something->CommunityID = $row[0];
        $something->Title = $row[1];
        $something->AboutUs = $row[2];
        $something->ProfilePicture = $row[3];
        $something->adminID = $row[4];
        array_push($returned->timeline, $something);
    }
    mysqli_free_result($result);
    echo json_encode($returned);
}
/**
 * Function that returns a list of events that are connected with that communities id
 */
function getCommunityEventsTimeLine(){
    global $conn;

    $json = file_get_contents('php://input');
    $obj = json_decode($json,true);

    $CommunityID = $obj['CommunityID'];

    $returned->isValid = 'valid';
    $result = mysqli_query($conn, "SELECT * FROM PostEvent WHERE CommunitieID = '$CommunityID'");
    $returned->timeline = array();
    if(!$result){
        $returned->isValid = "notValid";
        echo json_encode($returned);
        exit;
    }
    while ($row = mysqli_fetch_row($result)){
        $tempEvent = new Event($row[0]);
        $dt = new DateTime($row[3]);
        $tempEvent->SetEvent( $row[0],
                              $row[1],
                              $row[2],
                              $dt->format('Y-m-d'),
                              $row[4]);
        array_push($returned->timeline, $tempEvent);
    }
    mysqli_free_result($result);
    echo json_encode($returned);
}

/**
 * getUserTimeLine function returnes a list of event that were created by just this user.
 */
function getUserTimeLine(){
    global $conn;

    $json = file_get_contents('php://input');
    $obj = json_decode($json,true);

    $UserID = $obj['UserID'];

    $returned->isValid = 'valid';
    $result = mysqli_query($conn, "SELECT * FROM PostEvent Where UsersId = '$UserID'");
    $returned->timeline = array();
    if(!$result){
        $returned->isValid = "notValid";
        echo json_encode($returned);
        exit;
    }
    while ($row = mysqli_fetch_row($result)){
        $tempEvent = new Event($row[0]);
        $dt = new DateTime($row[3]);
        $tempEvent->SetEvent( $row[0],
                              $row[1],
                              $row[2],
                              $dt->format('Y-m-d'),
                              $row[4]);
        array_push($returned->timeline, $tempEvent);
    }
    mysqli_free_result($result);
    echo json_encode($returned);
}

function getFollowersEventsTimeLine(){
    global $conn;

    $json = file_get_contents('php://input');
    $obj = json_decode($json,true);

    $returned->isValid = 'valid';
    $UserID = $obj['UserID'];

    $sql = "SELECT PostEvent.id, PostEvent.UsersId, PostEvent.EventName, PostEvent.DateAdded, PostEvent.Description, Users.FirstName, Users.LastName, Users.ProfilePicture,
    (SELECT P.PictureOne FROM UserPost AS P JOIN PostEvent AS E ON E.Id = P.EventId WHERE P.EventId = PostEvent.id LIMIT 0, 1) AS postPicture 
    FROM PostEvent
    INNER JOIN Users ON PostEvent.UsersId = Users.UsersId
    INNER JOIN UserRelationships ON PostEvent.UsersId = UserRelationships.UserFollowedId
    WHERE Users.ActiveFlag = 1 AND $UserID = UserRelationships.UserFollowingId";

    $stmt = $conn->prepare($sql);
    $stmt->execute();
    $stmt->bind_result($id, $UsersID, $EventName, $DateAdded, $Description, $FirstName, $LastName, $ProfilePicture, $postPicture);
    $stmt->store_result();
    $returned->timeline = array();
    while($stmt->fetch()){
        $dt = new DateTime($DateAdded);
        $tempDate = $dt->format('Y-m-d');
        $temp = array('id'=>$id, 'UsersId'=>$UsersID, 'title'=>$EventName, 'time'=>$tempDate, 'description'=>$Description, 'FirstName'=>$FirstName, 'LastName'=>$LastName, 'ProfilePicture'=>$ProfilePicture, 'PostImage'=>$postPicture);
        array_push($returned->timeline, $temp);
    }
    $stmt->close();
    echo json_encode($returned);
}


?>