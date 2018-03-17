<?php
require_once('includes/constants.inc.php');
require_once('includes/connection.inc.php');
//require_once('classes/Event.php');

if(function_exists($_GET['f'])) {
   $_GET['f']();
}

//create new event
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

// function getPostsForEvent(){
//     global $conn;

//     $json = file_get_contents('php://input');
//     $obj = json_decode($json,true);

//     $EventID = 44;//$obj['EventId'];
//     $lastEntryDate;// = $obj['lastEntryDate'];
//     //echo "in get posts for event";
//     $Current_Event = new Event($EventID); //set up user object with users id
//     $returned = $Current_Event->gatherPostsInfo(); //gather info about that user from database
//     echo $returned;
// }

//gets a already created event
function getEvent(){
}

//updates a already created event
function updateEvent(){

}
?>