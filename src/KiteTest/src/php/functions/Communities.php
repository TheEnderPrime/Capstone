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

// function createCommunity(){
//     global $conn;

//     $json = file_get_contents('php://input');
//     $obj = json_decode($json, true);

//     $title = $obj['Title'];
//     $aboutUs = $obj['AboutUs'];
//     $profilePicture = $obj['ProfilePicture'];
//     $adminId = $obj['AdminID'];

//     $returned->isValid = 'notValid';
//     if(!isset($adminId)){
//         $returned->error = 'Sorry you there is not admin on set for this community';
//     }
//     else{
//         $sql = "SELECT * FROM Communities WHERE Title='$title'";
//         $result = mysqli_fetch_array(mysqli_query($conn, $sql));
//         if(isset($result)){
//             $returned->error = 'Sorry you there is already a community with this name';
//         }
//         else{
//             $sql2 = 'INSERT INTO Communities (Title, AboutUs, ProfilePicture, AdminId) VALUES (?,?,?,?)';
//             $stmt = $conn->prepare($sql2);
//             $stmt->bind_param('sssi', $title, $aboutUs, $profilePicture, $adminId);
//             $stmt->execute();
//             $temp = 'Communitie has been created';
//             $stmt->close();

//             $getCommuity = "SELECT CommunityId FROM Communities WHERE Title = ?";
//             if($stmt2 = $conn->prepare($getCommuity)){
//                 $stmt2->bind_param('s',$title);
//                 $stmt2->execute();
//                 $stmt2->bind_result($CommunityId);
//                 $stmt2->fetch();
//                 $stmt2->close();
//                 if(isset($CommunityId)){
//                     $returned->isValid = 'valid';
//                     $returned->CommunityID = $CommunityId;
//                 }
//                 else{
//                     $returned->error = 'was unable to get id';
//                 }
//             }
//             else{
//                 $returned->error = 'cannot get id';
//             }
//          }
//     }
//     echo json_encode($returned);
// }

// function UpdateCommunity(){
//     $json = file_get_contents('php://input');
//     $obj = json_decode($json,true);

//     $communityId = $obj['CommunityID'];
//     $title = $obj['Title'];
//     $aboutUs = $obj['AboutUs'];
//     $profilePicture = $obj['ProfilePicture'];
//     $adminId = $obj['AdminID'];

//     $returned->isValid = 'valid';
//     if(!isset($communityId)){
//         $returned->isValid = 'notValid';
//         $returned->errorMessage = 'please check to see if you have a community id';
//     }
//     else{
//         $Current_Community = new Communities($communityId);
//         $Current_Community->gatherUserInfo();
//         $numberOfUpdates = 0;
//         if(isset($title)){
//             $numberOfUpdates = $numberOfUpdates + 1;
//             $return = $Current_Community->updateAboutUs($aboutUs);
//             $returned->aboutUs = $return;
//         }
//         if(isset($profilePicture)){
//             $numberOfUpdates = $numberOfUpdates + 1;
//             $return = $Current_Community->updateProfilePicture($profilePicture);
//             $returned->profilePicture = $return
//         }
//         if(isset($adminId)){
//             $numberOfUpdates = $numberOfUpdates + 1;
//             $return = $Current_Community->updateAdminId($adminId);
//             $returned->adminId = $return;
//         }
//         echo json_encode($returned);
//     }
// }

?>