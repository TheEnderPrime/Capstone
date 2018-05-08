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
 * function for creating a new event takes in a user id, title, and description and 
 * creates new entrie in the database for that event
 */
function createEvent(){
    global $conn;

    $json = file_get_contents('php://input');
    $obj = json_decode($json,true);

    $UserID = $obj['UserID'];
    $Title = $obj['title'];
    $Description = $obj['desc'];

    $return->isValid = 'notValid';
    if(!isset($UserID)){
        $return->error = 'Sorry you are not logged in';
    }
    else
    {
        $sql = "SELECT * FROM PostEvent WHERE UsersId=$UserID AND EventName = '$Title'";
        $result = mysqli_fetch_array(mysqli_query($conn, $sql));
        if(isset($result)){
            $return->error = 'sorry you have event with the same name';
        }
        else{
            $sql = 'INSERT INTO PostEvent (UsersId, EventName, Description) VALUES (?,?,?)';
            $stmt = $conn->prepare($sql);
            $stmt->bind_param('iss', $UserID, $Title, $Description);
            $stmt->execute();
            $temp = 'Event Has Been Created'; 
            $stmt->close();

            $getEventID = "SELECT id FROM PostEvent WHERE UsersId = ? AND EventName = ?";
            if($stmt = $conn->prepare($getEventID))
            {
                $stmt->bind_param('is', $UserID, $Title);
                $stmt->execute();
                $stmt->bind_result($EventID);
                $stmt->fetch();
                $stmt->close();
                if(isset($EventID))
                {
                    $return->isValid = 'valid';
                    $return->EventID = $EventID;
                }
                else
                {
                    $return->error = 'was unable to get id';
                }
            }
            else
            {
                $return->error = 'cannot get id';
            }
        }
    }
    echo json_encode($return);
}


/**
 * get event function that returns the event information, as well as the 
 * post that are related to this event given the event id
 */
function getEvent(){
    global $conn;

    $json = file_get_contents('php://input');
    $obj = json_decode($json,true);

    $EventId = $obj['EventID'];

    $New_Event = new Event($EventId);
    $New_Event->gatherEventsInfo();

    $returned->eventData = $New_Event;

    $returned->isValid = 'valid';
    $result = mysqli_query($conn, "SELECT Id, UsersId, DateAdded, EventId, CommunityId, PostTitle, Description FROM UserPost WHERE EventId = '$EventId'");
    $returned->eventArray = array();
    if(!$result){
        $results->isvalid = "notValid";
        echo json_encode($results);
        exit;
    }
    while ($row = mysqli_fetch_row($result)){
        $tempPost = new SimplePost($row[0]);
        $tempPost->SetDefultSimplePost( $row[0],
                                        $row[1],
                                        "2018-03-11",
                                        $row[3],
                                        $row[4],
                                        $row[5],
                                        $row[6]);
        array_push($returned->eventArray, $tempPost);
    }
    mysqli_free_result($result);
    echo json_encode($returned);
}

/**
 * function for updating a already created event. if takes in information that is sent
 * in and updates those feilds according
 */
function updateEvent(){
    $json = file_get_contents('php://input');
    $obj = json_decode($json,true);

    $EventID = $obj['EventID'];
    $UsersID = $obj['UserID'];
    $time = $obj['Time'];
    $title = $obj['Title'];
    $description = $obj['Description'];

    $Current_Event = new Event($EvetID);
    $Current_Event->gatherEventInfo();
    $numberOfUpdates = 0;
    $returned->isValid = 'valid';
    if(isset($UserID)){
        $numberOfUpdates = $numberOfUpdates + 1;
        $retunred = $Current_Event->updateUserID($UserID);
        $returned->UserID = $retunred;
    }
    if(isset($time)){
        $numberOfUpdates = $numberOfUpdates + 1;
        $retunred = $Current_Event->updateTime($time);
        $returned->Time = $retunred;
    }
    if(isset($title)){
        $numberOfUpdates = $numberOfUpdates + 1;
        $returned = $Current_Event->updateTitle($Title);
        $returned->Title = $retunred;
    }
    if(isset($description)){
        $numberOfUpdates = $numberOfUpdates + 1;
        $returned = $Current_Event->updateDescription($description);
        $returned->Description = $returned;
    }
    echo json_encode($returned);
}
?>