<?php
require_once('includes/constants.inc.php');
require_once('includes/connection.inc.php');
require_once('classes/Post.php');

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
    $isComment = $obj['isComment'];//forcomment

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
        $PhotoOne = '-';
    }
    if(!isset($PhotoTwo)){
        $PhotoTwo = '-';
    }
    if(!isset($PhotoThree)){
        $PhotoThree = '-';
    }

    $return->isValid = 'notValid';
    if(!isset($UserID)){
        $return->errorMessage = 'Sorry you are not logged in';
    }
    else{
        $sql = "SELECT * FROM UserPost WHERE EventId=$EventID AND UsersId=$UserID AND PostTitle='$Title'";
        $result = mysqli_fetch_array(mysqli_query($conn, $sql));
        $return->test = $sql;
        //check to see if this user already has a post with $Title name
        if(isset($result)){
            $return->errorMessage = 'Sorry you have a post with the same name.';
        }
        else if(!isset($EventID)){
            $return->errorMessage = 'Sorry you are not in a event, so you cannot create a post, sorry';
        }
        else if(isset($isComment)){
            $sql = 'INSERT INTO UserPost (UsersID, EventId, PostText, isComment) VALUES (?,?,?,?)';//forcomment
            $stmt = $conn->prepare($sql);
            $stmt->bind_param('iisi', $UserID, $EventID, $Story, $isComment);
            $stmt->execute();
            $temp = 'new comment created successfully';
            $stmt->close();
            $return->isValid = 'valid';
            //make sure that only the oppraprete feilds are added
        }
        else{
            //add a new post
            $sql = 'INSERT INTO UserPost (UsersID, PostTitle, Description, PostText, EventId, PictureOne, PictureTwo, PictureThree) VALUES (?,?,?,?,?,?,?,?)';
            $stmt = $conn->prepare($sql);
            $stmt->bind_param('isssisss', $UserID, $Title, $Description, $Story, $EventID, $PhotoOne, $PhotoTwo, $PhotoThree);
            $stmt->execute();
            $temp = 'New records created successfully'; 
            $stmt->close();
            $return->isValid = 'valid';
        }
    }
    echo json_encode($return);
}

/**
 * function that returns a post given the post id
 */
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
    global $conn;

    $json = file_get_contents('php://input');
    $obj = json_decode($json,true);

    $PostID = $obj['PostID'];
    $UsersID = $obj['UserID'];
    $time = $obj['time'];
    $PostText = $obj['PostText'];
    $EventID = $obj['EventID'];
    $CommunityID = $obj['CommunitiyId'];
    $title = $obj['title'];
    $PictureOne = $obj['PhotoOne'];
    $PictureTwo = $obj['PhotoTwo'];
    $PictureThree = $obj['PhotoThree'];
    $VideoOne = $obj['videoone'];
    $VideoTwo = $obj['videotwo'];
    $VideoThree = $obj['videothree'];
    $description = $obj['description'];

    if(!isset($PostID)){
        $returned->isValid = 'notValid';
        $returned->errorMessage = 'sorry you did send a post id';
    }
    else{
        $sql = "SELECT UsersId FROM UserPost WHERE id = ?";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param('i', $PostID);
        $stmt->execute();
        $stmt->bind_result($return);
        $stmt->fetch();
        $stmt->close();
        if(isset($return)){
            if($return != $UsersID){
                $returned->isValid = 'notValid';
                $returned->errorMessage = 'you are not the owner of this post';
            }
            else{   
                $Current_Post = new Post($PostID);
                $Current_Post->gatherPostInfo();
                $numberOfUpdates = 0;
                $returned->isValid = 'valid';
                if(isset($UsersID)){
                    $numberOfUpdates = $numberOfUpdates + 1;
                    $retunred = $Current_Post->updateUserID($UserID);
                    $returned->UsersID = $retunred;
                }
                if(isset($time)){
                    $numberOfUpdates = $numberOfUpdates + 1;
                    $retunred = $Current_Post->updateTime($time);
                    $returned->Time = $retunred;
                }
                if(isset($PostText)){
                    $numberOfUpdates = $numberOfUpdates + 1;
                    $retunred = $Current_Post->updatePostText($PostText);
                    $returned->PostText = $retunred;
                }
                if(isset($EventID)){
                    $numberOfUpdates = $numberOfUpdates + 1;
                    $retunred = $Current_Post->updateEventID($EventID);
                    $returned->EventID = $retunred;
                }
                if(isset($CommunityID)){
                    $numberOfUpdates = $numberOfUpdates + 1;
                    $retunred = $Current_Post->updateCommunityID($CommunityID);
                    $returned->CommunityID = $retunred;
                }
                if(isset($title)){
                    $numberOfUpdates = $numberOfUpdates + 1;
                    $retunred = $Current_Post->updateTitle($title);
                    $returned->Title = $retunred;
                }
                if(isset($PictureOne)){
                    $numberOfUpdates = $numberOfUpdates + 1;
                    $retunred = $Current_Post->updatePictureOne($PictureOne);
                    $returned->PictureOne = $retunred;
                }
                if(isset($PictureTwo)){
                    $numberOfUpdates = $numberOfUpdates + 1;
                    $retunred = $Current_Post->updatePictureTwo($PictureTwo);
                    $returned->PictureTwo = $retunred;
                }
                if(isset($PictureThree)){
                    $numberOfUpdates = $numberOfUpdates + 1;
                    $retunred = $Current_Post->updatePictureThree($PictureThree);
                    $returned->PictureThree = $retunred;
                }
                if(isset($VideoOne)){
                    $numberOfUpdates = $numberOfUpdates + 1;
                    $retunred = $Current_Post->updateVideoOne($VideoOne);
                    $returned->VideoOne = $retunred;
                }
                if(isset($VideoTwo)){
                    $numberOfUpdates = $numberOfUpdates + 1;
                    $retunred = $Current_Post->updateVideoTwo($VideoTwo);
                    $returned->VideoTwo = $retunred;
                }
                if(isset($VideoThree)){
                    $numberOfUpdates = $numberOfUpdates + 1;
                    $retunred = $Current_Post->updateVideoThree($VideoThree);
                    $returned->VideoThree = $retunred;
                }
                if(isset($description)){
                    $numberOfUpdates = $numberOfUpdates + 1;
                    $retunred = $Current_Post->updateDescription($description);
                    $returned->Description = $retunred;
                }
            }
        }
    }
    echo json_encode($returned);
}

/**
 * function like post allows a user to like a post
 * if the user has not like the post yet then the post is liked
 * if the post has already been liked then the like is removed
 */
function LikePost(){
    global $conn;

    $json = file_get_contents('php://input');
    $obj = json_decode($json,true);
    
    //$UserID = 209627410;
    //$UserID = 549848285;
    $UserID = $obj['UserID'];
    $PostID = $obj['PostID'];//93;
    $liked = 1;
    $disliked = 0;
    //have you liked this before?
    $returned->isValid = 'valid';
    $hasLikedSQL = "SELECT UsersId FROM PostReaction WHERE UsersId = ? AND PostId = ? AND Liked = ?";
    if($stmt1 = $conn->prepare($hasLikedSQL)){
        $stmt1->bind_param('iii',$UserID, $PostID, $liked);
        $stmt1->execute();
        $stmt1->bind_result($hasLiked);
        $stmt1->fetch();
        $stmt1->close();
        if(isset($hasLiked)){
            $returned->isValid = 'valid';
            $returned->isNowCurrentlyLiking = 'false';
            //unlike the post!
            echo json_encode($returned);
            $removeLikeSql = "DELETE FROM PostReaction WHERE UsersId = ? AND PostID = ? AND liked = ?";
            $stmt2 = $conn->prepare($removeLikeSql);
            $stmt2->bind_param('iii',$UserID, $PostID, $liked);
            $stmt2->execute();
            $stmt2-close();
            exit;
        }
        else{
            $returned->isValid = 'valid';
            $returned->isNowCurrentlyLiking = 'true';
            $sql = "INSERT INTO PostReaction (UsersId, PostId, Liked, Disliked) VALUES (?, ?, ?, ?)";
            $stmt3 = $conn->prepare($sql);
            $stmt3->bind_param('iiii', $UserID, $PostID, $liked, $disliked);
            $stmt3->execute();
            $stmt3->close();
        }
    }
    else{
        $returned->isValid = 'notValid';
        $returned->errorMessage = 'sorry there is a problem with your userid, your postid';
    }
    echo json_encode($returned);
}

//DisLike this post
// function DisLikePost(){
//     global $conn;

//     $json = file_get_contents('php://input');
//     $obj = json_decode($json,true);
//     $UserID = 209627410;
//     $PostID = 93;
//     $liked = 0;
//     $disliked = 1;

//     //have you disliked this before?
//         //un dislike this post

//     //do you currently like this post?
//         //dislike this post and un like this post

//     $retunred->isValid = 'valid';
//     $sql = "INSERT INTO PostReaction (UsersId, PostId, Liked, Disliked) VALUES (?, ?, ?, ?)";
//     $stmt = $conn->prepare($sql);
//     $stmt->bind_param('iiii', $UserID, $PostID, $liked, $disliked);
//     $stmt->execute();
//     $retunred->ohsnap = 'post disliked';
//     $stmt->close();
//     echo json_encode($retunred);
// }

/**
 * function to find out if you have alread liked this post
 */
function getDoesLike(){
    global $conn;

    $json = file_get_contents('php://input');
    $obj = json_decode($json,true);
    
    //$UserID = 209627410;
    //$UserID = 549848285;
    $UserID = $obj['UserID'];
    $PostID = $obj['PostID'];//93;
    $liked = 1;
    $disliked = 0;
    //have you liked this before?
    $returned->isValid = 'valid';
    $hasLikedSQL = "SELECT UsersId FROM PostReaction WHERE UsersId = ? AND PostId = ? AND Liked = ?";
    if($stmt = $conn->prepare($hasLikedSQL)){
        $stmt->bind_param('iii',$UserID, $PostID, $liked);
        $stmt->execute();
        $stmt->bind_result($hasLiked);
        $stmt->fetch();
        $stmt->close();
        if(isset($hasLiked)){
            $returned->isValid = 'valid';
            $returned->doesLike = 'true';
        }
        else{
            $returned->isValid = 'valid';
            $returned->doesLike = 'false';
        }
    }
    else{
        $returned->isValid = 'notValid';
    }
    echo json_encode($returned);
}
    //checks to see if you currently like this post?

//do you dislike?
// function getDoesDislike(){
//     global $conn;

//     $json = file_get_contents('php://input');
//     $obj = json_decode($json,true);

//     $me = 209627410;
//     $postInQuestion = 93;
//     $disLiked = 1;

//     $returned->isValid = 'valid';
//     $sql ="SELECT UsersId FROM PostReaction WHERE UsersId = ? AND PostId = ? AND Disliked = ?";
//     if($stmt = $conn->prepare($sql)){
//         $stmt->bind_param('iii', $me, $postInQuestion, $disLiked);
//         $stmt->execute();
//         $stmt->bind_result($temp);
//         $stmt->fetch();
//         $stmt->close();
//         if(isset($temp)){
//             $returned->isValid = 'valid';
//             $returned->doesDisLike = 'true';
//         }
//         else{
//             $returned->isValid = 'valid';
//             $returned->doesDisLike = 'false';
//         }
//     }
//     else{
//         $returned->isValid = "inValid";
//     }
//     echo json_encode($returned);
// }
    //checks to see if you currently dislike this post?
function getComments(){
    global $conn;

    $json = file_get_contents('php://input');
    $obj = json_decode($json,true);

    $postID = $obj['PostID'];

    $returned->isValid = 'valid';
    $sql = "SELECT UserPost.PostText, Users.FirstName, Users.LastName, Users.ProfilePicture
    FROM UserPost
    INNER JOIN Users ON UserPost.UsersId = Users.UsersId
    WHERE UserPost.isComment = ?";

    $stmt = $conn->prepare($sql);
    $stmt->bind_param('i', $postID);
    $stmt->execute();
    $stmt->bind_result($PostText, $FirstName, $LastName, $ProfilePicture);
    $stmt->store_result();
    $returned->timeline = array();
    while($stmt->fetch()){
        $temp = array('PostText'=>$PostText, 'FirstName'=>$FirstName, 'LastName'=>$LastName, 'ProfilePicture'=>$ProfilePicture);
        array_push($returned->timeline, $temp);
    }
    $stmt->close();
    echo json_encode($returned);
}
?>