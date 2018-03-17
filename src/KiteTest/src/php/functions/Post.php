<?php
require_once('includes/constants.inc.php');
require_once('includes/connection.inc.php');

if(function_exists($_GET['f'])) {
   $_GET['f']();
}

//create new post
function createPost(){
    global $conn;

    $json = file_get_contents('php://input');
    $obj = json_decode($json,true);
    
    $UserID = $obj['UserID'];
    $EventID = $obj['EventID'];
    $Title = $obj['title'];
    $Description = $obj['desc'];
    $Story = $obj['story'];
    //$CommunityID = $obj['CommunityID'];
    if(!isset($Title)){
        $Title = ' ';
    }
    if(!isset($Description)){
        $Description = ' ';
    }
    if(!isset($Story)){
        $Story = ' ';
    }


    $return->isValid = 'notValid';
    if(!isset($UserID)){
        $return->error = 'Sorry you are not logged in';
        $return->test = 'no id sent';
    }
    else{
        $sql = "SELECT * FROM UserPost WHERE UsersId=$UserID AND PostTitle = '$Title'";
        $result = mysqli_fetch_array(mysqli_query($conn, $sql));
        $return->test = $sql;
        //check to see if this user already has a post with $Title name
        if(isset($result)){
            $return->error = 'Sorry you have a post with the same name.';
        }
        else if(!isset($EventID)){
            $return->error = 'Sorry you are not in a event, so you cannot create a post, sorry';
        }
        else{
            //INSERT INTO UserPost( UsersID, PostTitle, Description, PostText, EventId ) 
//VALUES ( 118452037,  'title',  'description',  'temp temp', 75 )
            //add a new post
            $sql = 'INSERT INTO UserPost (UsersID, PostTitle, Description, PostText, EventId) VALUES (?,?,?,?,?)';
            $stmt = $conn->prepare($sql);
            $stmt->bind_param('isssi', $UserID, $Title, $Description, $Story, $EventID);
            $stmt->execute();
            $temp = 'New records created successfully'; 
            $stmt->close();
            $return->test = (string)$EventID;
            $return->isValid = 'valid';
            
        }
    }
    echo json_encode($return);
}

// //gets a already created event
// function getPost(){

// }

// //updates a already created event
// function updatePost(){

// }

?>