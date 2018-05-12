<?php
require_once('includes/constants.inc.php');
require_once('includes/connection.inc.php');
require_once('classes/Communities.php');

/**
 * funciton for allowsing a url to call different function within this one file
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
        $Community->CommunityID = $row[0];
        $Community->Title = $row[1];
        $Community->AboutUs = $row[2];
        $Community->ProfilePicture = $row[3];
        $Community->adminID = $row[4];
        $return->isValid = 'valid';
        $return->community = $Community;
    }
    
    echo json_encode($return);
}

/**
 * function create community provides the functionality to create
 * a new community and save it into the database, contains
 * some error checking to see if it has been sent the correct information
 */
function createCommunity(){
    global $conn;

    $json = file_get_contents('php://input');
    $obj = json_decode($json, true);

    $title = $obj['Title'];
    $aboutUs = $obj['AboutUs'];
    $profilePicture = $obj['ProfilePicture'];
    $adminId = $obj['AdminID'];

    $returned->isValid = 'notValid';
    if(!isset($adminId)){
        $returned->error = 'Sorry you there is not admin on set for this community';
    }
    else{
        $sql = "SELECT * FROM Communities WHERE Title='$title'";
        $result = mysqli_fetch_array(mysqli_query($conn, $sql));
        if(isset($result)){
            $returned->error = 'Sorry you there is already a community with this name';
        }
        else{
            $sql2 = 'INSERT INTO Communities (Title, AboutUs, ProfilePicture, AdminId) VALUES (?,?,?,?)';
            $stmt = $conn->prepare($sql2);
            $stmt->bind_param('sssi', $title, $aboutUs, $profilePicture, $adminId);
            $stmt->execute();
            $temp = 'Communitie has been created';
            $stmt->close();

            $getCommuity = "SELECT CommunityId FROM Communities WHERE Title = ?";
            if($stmt2 = $conn->prepare($getCommuity)){
                $stmt2->bind_param('s',$title);
                $stmt2->execute();
                $stmt2->bind_result($CommunityId);
                $stmt2->fetch();
                $stmt2->close();
                if(isset($CommunityId)){
                    $returned->isValid = 'valid';
                    $returned->CommunityID = $CommunityId;
                }
                else{
                    $returned->error = 'was unable to get id';
                }
            }
            else{
                $returned->error = 'cannot get id';
            }
         }
    }
    echo json_encode($returned);
}

/**
 * update community function uses the community object and 
 * the those helper functions to update the given information that is
 * sent to this function by the ui
 */
function updateCommunity(){
    $json = file_get_contents('php://input');
    $obj = json_decode($json,true);

    $communityId = $obj['CommunityID'];
    $title = $obj['Title'];
    $aboutUs = $obj['AboutUs'];
    $profilePicture = $obj['ProfilePicture'];
    $adminId = $obj['AdminID'];
    $myId = $obj['UserID'];

    $returned->isValid = 'valid';
    if(!isset($communityId)){
        $returned->isValid = 'notValid';
        $returned->errorMessage = 'please check to see if you have a community id';
        echo json_encode($returned);
        exit;
    }
    else{
        $Current_Community = new Communities($communityId);
        $Current_Community->gatherCommunityInfo();
        $thisAdminID = $Current_Community->getAdminId();
        if($myId != $thisAdminID){
            $returned->isValid = 'notValid';
            $returned->errorMessage = 'Your id does not equal this communities admin id';
            echo json_encode($returned);
            exit;
        }
        $numberOfUpdates = 0;
        if(isset($title)){
            $numberOfUpdates = $numberOfUpdates + 1;
            $return = $Current_Community->updateTitle($title);
            $returned->title = $return;
        }if(isset($aboutUs)){
            $numberOfUpdates = $numberOfUpdates + 1;
            $return = $Current_Community->updateAboutUs($aboutUs);
            $returned->aboutUs = $return;
        }if(isset($profilePicture)){
            $numberOfUpdates = $numberOfUpdates + 1;
            $return = $Current_Community->updateProfilePicture($profilePicture);
            $returned->profilePicture = $return;
        }if(isset($adminId)){
            $numberOfUpdates = $numberOfUpdates + 1;
            $return = $Current_Community->updateAdminId($adminId);
            $returned->adminId = $return;
        }
    }
    echo json_encode($returned);
}

/**
 * join community function allows for a user to join a community
 * which in a sence allows them to follow the community as well
 * as *TEMP* 
 */
function joinCommunity(){
    global $conn;

    $json = file_get_contents('php://input');
    $obj = json_decode($json,true);

    $UserId = $obj['UserID'];
    $CommunityId = $obj['CommunityID'];
    //are you part of the community
    $returned->isValid = 'valid';
    $isPartOfCommunity = "SELECT UsersId FROM CommunityUsers WHERE UsersId = ? AND CommunityId = ?";
    if($stmt1 = $conn->prepare($isPartOfCommunity)){
        $stmt1->bind_param('ii',$UserId, $CommunityId);
        $stmt1->execute();
        $stmt1->bind_result($hasJoined);
        $stmt1->fetch();
        $stmt1->close();
        if(isset($hasJoined)){
            $returned->isValid = 'valid';
            $returned->isNowPartOfCommunity = 'false';
            echo json_encode($returned);
            $removeJoinCommunity = "DELETE FROM CommunityUsers WHERE UsersId = ? AND CommunityId = ?";
            $stmt2 = $conn->prepare($removeJoinCommunity);
            $stmt2->bind_param('ii',$UserId, $CommunityId);
            $stmt2->execute();
            $stmt2->close();
            exit();
        }
        else{
            $returned->isValid = 'valid';
            $returned->isNowPartOfCommunity = 'true';
            $sql = "INSERT INTO CommunityUsers (UsersId, CommunityId) VALUES (?, ?)";
            $stmt3 = $conn->prepare($sql);
            $stmt3->bind_param('ii', $UserId, $CommunityId);
            $stmt3->execute();
            $stmt3->close();
        }
    }
    else{
        $returned->isValid = 'notValid';
        $returned->errorMessage = 'sorry can not determin if you are part of the commuunity';
    }
    echo json_encode($returned);
}

/**
 * get is part of community returns true of false depending on wether or not you are part
 * of the community;
 */
function getIsPartOfCommunity(){
    global $conn;

    $json = file_get_contents('php://input');
    $obj = json_decode($json,true);

    $UserId = $obj['UserID'];
    $CommunityId = $obj['CommunityID'];

    $returned->isValid = 'valid';
    $isPartOfCommunity = "SELECT UsersId FROM CommunityUsers WHERE UsersId = ? AND CommunityId = ?";
    if($stmt = $conn->prepare($isPartOfCommunity)){
        $stmt->bind_param('ii',$UserId, $CommunityId);
        $stmt->execute();
        $stmt->bind_result($hasJoined);
        $stmt->fetch();
        $stmt->close();
        if(isset($hasJoined))
        {
            $returned->isPart = 'true';
        }else{
            $returned->isPart = 'false';
        }
    }
    else{
        $returned->isValid = 'notValid';
        $returned->errorMessage = 'sorry can not determin if you are part of the commuunity';
    }
    echo json_encode($returned);
}

/**
 * function number of memebers just returns the number of current
 * memebers of a community.
 */
function numberOfMemebers(){
    global $conn;

    $json = file_get_contents('php://input');
    $obj = json_decode($json,true);

    $CommunityId = $obj['CommunityId'];

    $returned->isValid = 'valid';
    
    $sql = "SELECT COUNT(DISTINCT UsersId) FROM CommunityUsers WHERE CommunityId = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param('i', $CommunityId);
    $stmt->execute();
    $stmt->bind_result($numMembers);
    $stmt->fetch();
    $stmt->close();
    if(isset($numMembers)){
        $returned->numberOfMemebers = $numMembers;
    }
    else{
        $returned->isValid = 'notValid';
        $returned->errorMessage = 'cound not find count for this community id';
    }
    echo json_encode($returned);
}

?>