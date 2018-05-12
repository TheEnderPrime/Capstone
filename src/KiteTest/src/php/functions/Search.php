<?php
require_once('includes/constants.inc.php');
require_once('includes/connection.inc.php');

/**
 * funciton for allowing a url to call different function within this one file
 */
if(function_exists($_GET['f'])) {
   $_GET['f']();
}

/**
 * function that takes in a search string and uses that to search the users table
 * the fealds that are currently being searched for are first name and last name
 * for this search the entire search string has to be contained in one of the two 
 * columns for the user to be returned
 */
function searchForUser(){
    global $conn;

    $json = file_get_contents('php://input');
    $obj = json_decode($json,true);

    $searchString = $obj['searchString'];

    $returned->isValid = 'valid';

    $sql= "SELECT UsersId, FirstName, LastName, DateAdded, AboutMe, ProfilePicture FROM Users WHERE ((FirstName Like '%$searchString%') OR (LastName Like '%$searchString%')) AND ActiveFlag = 1";
    $stmt = $conn->prepare($sql);
    $stmt->execute();
    $stmt->bind_result($UsersId, $FirstName, $LastName, $DateAdded, $AboutMe, $ProfilePicture);
    $stmt->store_result();
    $returned->timeline = array();
    while($stmt->fetch()){
        $dt = new DateTime($DateAdded);
        $tempDate = $dt->format('l F jS Y');
        $temp = array('UsersId'=>$UsersId, 'FirstName'=>$FirstName, 'LastName'=>$LastName, 'time'=>$tempDate, 'AboutMe'=>$AboutMe, 'ProfilePicture'=>$ProfilePicture);
        array_push($returned->timeline, $temp);
    }
    $stmt->close();
    echo json_encode($returned);
}

/**
 * Function that takes in a search string and then looks at the communities table in the title column then
 * returns any community that has a title that contains the search string
 */
function searchForCommunity(){
    global $conn;

    $json = file_get_contents('php://input');
    $obj = json_decode($json, true);

    $searchString = $obj['searchString'];

    $returned->isValid = 'valid';

    $sql = "SELECT Title, CommunityId, ProfilePicture, DateAdded FROM Communities WHERE (Title Like '%$searchString%')";
    $stmt = $conn->prepare($sql);
    $stmt->execute();
    $stmt->bind_result($Title, $CommunityId, $ProfilePicture, $DateAdded);
    $stmt->store_result();
    $returned->timeline = array();
    while($stmt->fetch()){
        $dt = new DateTime($DateAdded);
        $tempDate = $dt->format('l F jS Y');
        $temp = array('Title'=>$Title, 'CommunityId'=>$CommunityId, 'ProfilePicture'=>$ProfilePicture, 'time'=>$tempDate);
        array_push($returned->timeline, $temp);
    }
    $stmt->close();
    echo json_encode($returned);
}

/**
 * function that takes in a search string and looks at the post event table and
 * if the event name contains the search string then it returns the event
 */
function searchForEvent(){
    global $conn;

    $json = file_get_contents('php://input');
    $obj = json_decode($json, true);

    $searchString = $obj['searchString'];

    $returned->isValid = 'valid';

    $sql = "SELECT PostEvent.id, PostEvent.UsersId, PostEvent.EventName, PostEvent.DateAdded, PostEvent.Description, Users.FirstName, Users.LastName, Users.ProfilePicture, 
    (SELECT P.PictureOne FROM UserPost AS P JOIN PostEvent AS E ON E.Id = P.EventId WHERE P.EventId = PostEvent.id LIMIT 0, 1) AS postPicture 
    FROM PostEvent
    INNER JOIN Users ON PostEvent.UsersId = Users.UsersId 
    WHERE (PostEvent.EventName Like '%$searchString%') AND Users.ActiveFlag = 1";
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