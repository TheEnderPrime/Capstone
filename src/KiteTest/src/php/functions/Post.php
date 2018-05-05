<?php
require_once('includes/constants.inc.php');
require_once('includes/connection.inc.php');
require_once('classes/Post.php');
require_once('classes/SimplePost.php');

/**
 * funciton for allowing a url to call different function within this one file
 */
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
    $Title = $obj['Title'];
    $Description = $obj['Desc'];
    $Story = $obj['Story'];
    $PhotoOne = $obj['PhotoOne'];
    $PhotoTwo = $obj['PhotoTwo'];
    $PhotoThree = $obj['PhotoThree'];
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
    if(!isset($PhotoOne)){
        $PhotoOne = ' ';
    }
    if(!isset($PhotoTwo)){
        $PhotoTwo = ' ';
    }
    if(!isset($PhotoThree)){
        $PhotoThree = ' ';
    }

    $return->isValid = 'notValid';
    if(!isset($UserID)){
        $return->error = 'Sorry you are not logged in';
        $return->test = 'no id sent';
    }
    else{
        $sql = "SELECT * FROM UserPost WHERE EventId=$EventID AND UsersId=$UserID AND PostTitle='$Title'";
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
            $sql = 'INSERT INTO UserPost (UsersID, PostTitle, Description, PostText, EventId, PictureOne, PictureTwo, PictureThree) VALUES (?,?,?,?,?,?,?,?)';
            $stmt = $conn->prepare($sql);
            $stmt->bind_param('isssisss', $UserID, $Title, $Description, $Story, $EventID, $PhotoOne, $PhotoTwo, $PhotoThree);
            $stmt->execute();
            $temp = 'New records created successfully'; 
            $stmt->close();
            $return->test = (string)$EventID;
            $return->isValid = 'valid';
            
        }
    }
    echo json_encode($return);
}

function getPost(){
    $json = file_get_contents('php://input');
    $obj = json_decode($json,true);

    $UserID = $obj['UserID'];
    $PostID = $obj['PostID'];

    $returned->isValid = 'valid';

    $This_Post = new Post($PostID);
    $This_Post->gatherPostInfo();
    $returned->post = $This_Post;
    echo json_encode($returned);
}

//updates a already created event
function updatePost(){
    $PostID = $obj['PostID'];
    $UsersID = $obj['UserID'];
    $time = $obj['time'];
    $PostText = $obj['PostText'];
    $EventID = $obj['EventID'];
    $CommunityID = $obj['CommunitiyId'];
    $title = $obj['title'];
    $PictureOne = $obj['pictureone'];
    $PictureTwo = $obj['picturetwo'];
    $PictureThree = $obj['picturethree'];
    $VideoOne = $obj['videoone'];
    $VideoTwo = $obj['videotwo'];
    $VideoThree = $obj['videothree'];
    $description = $obj['description'];

    $Current_Post = new Post($PostID);
    $Current_Post->gatherPostInfo();
    $numberOfUpdates = 0;

    if(isset($UsersID)){
        $numberOfUpdates = $numberOfUpdates + 1;
        $retunred = $Current_Post->updateUserID($UserID);
        echo $returned;
    }
    if(isset($time)){
        $numberOfUpdates = $numberOfUpdates + 1;
        $retunred = $Current_Post->updateTime($time);
        echo $retunred;
    }
    if(isset($PostText)){
        $numberOfUpdates = $numberOfUpdates + 1;
        $retunred = $Current_Post->updatePostText($PostText);
        echo $retunred;
    }
    if(isset($EventID)){
        $numberOfUpdates = $numberOfUpdates + 1;
        $retunred = $Current_Post->updateEventID($EventID);
        echo $retunred;
    }
    if(isset($CommunityID)){
        $numberOfUpdates = $numberOfUpdates + 1;
        $retunred = $Current_Post->updateCommunityID($CommunityID);
        echo $returned;
    }
    if(isset($title)){
        $numberOfUpdates = $numberOfUpdates + 1;
        $retunred = $Current_Post->updateTitle($title);
        echo $returned;
    }
    if(isset($PictureOne)){
        $numberOfUpdates = $numberOfUpdates + 1;
        $retunred = $Current_Post->updatePictureOne($PictureOne);
        echo $returned;
    }
    if(isset($PictureTwo)){
        $numberOfUpdates = $numberOfUpdates + 1;
        $retunred = $Current_Post->updatePictureTwo($PictureTwo);
        echo $returned;
    }
    if(isset($PictureThree)){
        $numberOfUpdates = $numberOfUpdates + 1;
        $retunred = $Current_Post->updatePictureThree($PictureThree);
        echo $returned;
    }
    if(isset($VideoOne)){
        $numberOfUpdates = $numberOfUpdates + 1;
        $retunred = $Current_Post->updateVideoOne($VideoOne);
        echo $returned;
    }
    if(isset($VideoTwo)){
        $numberOfUpdates = $numberOfUpdates + 1;
        $retunred = $Current_Post->updateVideoTwo($VideoTwo);
        echo $returned;
    }
    if(isset($VideoThree)){
        $numberOfUpdates = $numberOfUpdates + 1;
        $retunred = $Current_Post->updateVideoThree($VideoThree);
        echo $returned;
    }
    if(isset($description)){
        $numberOfUpdates = $numberOfUpdates + 1;
        $retunred = $Current_Post->updateDescription($description);
        echo $returned;
    }
}

//Like this post
function LikePost(){
    global $conn;

    $json = file_get_contents('php://input');
    $obj = json_decode($json,true);
    
    $UserID = 118452037;
    $PostID = 11;
    $liked = 1;
    $disliked = 0;

    //have you liked this before?

        //un like this post

    //do you currently dislike this?
        //like this post and un dislike this post

    //else like the post!
    $retunred->isValid = 'valid';
    $sql = "INSERT INTO PostReaction (UsersId, PostId, Liked, Disliked) VALUES (?, ?, ?, ?)";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param('iiii', $UserID, $PostID, $liked, $disliked);
    $stmt->execute();
    $retunred->ohsnap = 'post liked';
    $stmt->close();
    echo json_encode($retunred);
}

//DisLike this post
function DisLikePost(){
    global $conn;

    $json = file_get_contents('php://input');
    $obj = json_decode($json,true);
    
    $UserID = 118452037;
    $PostID = 11;
    $liked = 0;
    $disliked = 1;

    //have you disliked this before?
        //un dislike this post

    //do you currently like this post?
        //dislike this post and un like this post

    $retunred->isValid = 'valid';
    $sql = "INSERT INTO PostReaction (UsersId, PostId, Liked, Disliked) VALUES (?, ?, ?, ?)";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param('iiii', $UserID, $PostID, $liked, $disliked);
    $stmt->execute();
    $retunred->ohsnap = 'post disliked';
    $stmt->close();
    echo json_encode($retunred);
}

//do you like?
function getDoesLike(){
    global $conn;

    $json = file_get_contents('php://input');
    $obj = json_decode($json,true);

    $me = 118452037;
    $postInQuestion = 11;
    $liked = 1;

    $retunred->isValid = 'valid';
    $sql ="SELECT * FROM PostReaction WHERE UsersId = ? AND PostId = ? AND Liked = ?";
    if($stmt = $conn->prepare($sql)){
        $stmt->bind_param('iii', $me, $postInQuestion, $liked);
        $stmt->execute();
        $stmt->bind_result($temp);
        $stmt->fetch();
        $stmt->close();
        if(isset($temp)){
            $retunred->isValid = 'valid';
        }
        else{
            $retunred->isValid = 'inValid';
        }
    }
    else{
        $retunred->isValid = 'inValid';
    }
    echo json_encode($retunred);
}
    //checks to see if you currently like this post?

// //do you dislike?
// function getDoesDislike(){
//     global $conn;

//     $json = file_get_contents('php://input');
//     $obj = json_decode($json,true);

//     $me = 118452037;
//     $postInQuestion = 11;
//     $disLiked = 1;

//     $retunred->isValid = 'valid';
//     $sql ="SELECT * FROM PostReaction WHERE UsersId = ? AND PostId = ? AND Disliked = ?";
//     if($stmt = $conn->prepare($sql)){
//     $stmt->bind_param('iii', $me, $postInQuestion, $disLiked);
//     $stmt->execute();
//     $stmt->bind_result($temp);
//     $stmt->fetch();
//     $stmt->close();
//         if(!isset($temp)){
//             $retunred->isValid = "inValid";
//         }
//     }
//     else{
//         $retunred->isValid = "inValid";
//     }
//     echo json_encode($retunred);
// }
    //checks to see if you currently dislike this post?

?>