<?php
require_once('includes/constants.inc.php');
require_once('includes/connection.inc.php');
require_once('classes/User.php');

/**
 * funciton for allowing a url to call different function within this one file
 */
if(function_exists($_GET['f'])) {
   $_GET['f']();
}

/**
 * GetProfile function takes in the userID and then gathers all of the other 
 * information about a user and creates an user object then encodes it as a 
 * json string and sends it back to the ui
 */
function getProfile() {
    $json = file_get_contents('php://input');
    $obj = json_decode($json,true);
    $UserID = $obj['UserID'];
    if(isset($UserID)){
        $Current_User = new User($UserID); //set up user object with users id
        $Current_User->gatherUserInfo(); //gather info about that user from database
        $returnObj->isValid = 'valid';
        $returnObj->firstName = $Current_User->getFirstName();
        $returnObj->lastName = $Current_User->getLastName();
        $returnObj->email = $Current_User->getEmail();
        $returnObj->dateOfBirth = $Current_User->getDateOfBirth();
        $returnObj->activeFlag = $Current_User->getActiveFlag();
        $returnObj->employerName = $Current_User->getEmployerName();
        $returnObj->aboutMe = $Current_User->getAboutMe();
        $returnObj->homeCity = $Current_User->getHomeCity();
        $returnObj->homeStateOrProvence = $Current_User->getHomeStateOrProvence();
        $returnObj->currentCity = $Current_User->getCurrentCity();
        $returnObj->currentStateOrProvence = $Current_User->getCurrentStateOrProvence();
        $returnObj->currentCountry = $Current_User->getCurrentCountry();
        $returnObj->cellPhone = $Current_User->getCellPhone();
        $returnObj->homePhone = $Current_User->getHomePhone();
        $returnObj->profilePicture = $Current_User->getProfilePicture();
    } else{
        $returnObj->isValid = 'inValid';
        $returnObj->errorMessage = 'can not get profile you do not have a userID set, try logging back in';
    }

    echo json_encode($returnObj);
}

/**
 * sendFollowRequest function used to send a request between the me obj and the trytofollow obj
 */
function sendFollowRequest(){
    $json = file_get_contents('php://input');
    $obj = json_decode($json,true);

    $me = 29770083;
    $tryToFollow = 31782703;

    $Current_User = new User($me);
    $Current_User->gatherUserInfo();
    $Current_User->sendFollowRequest($tryToFollow);
}

/**
 * removeFollowRequest function used to remove a current follow request between the me obj
 * and the trytofollow obj
 */
function removeFollowRequest(){
    $json = file_get_contents('php://input');
    $obj = json_decode($json,true);

    $me = 29770083;
    $tryToRemoveFollow = 31782703;

    $Current_User = new User($me);
    $Current_User->gatherUserInfo();
    $Current_User->removeFollowRequest($tryToRemoveFollow);
}

/**
 * getFollowRequests function is used to get all current follow requests for the me obj
 */
function getFollowRequests(){
    $json = file_get_contents('php://input');
    $obj = json_decode($json,true);

    $me = 29770083;

    $Current_User = new User($me);
    $Current_User->gatherUserInfo();
    $returned = $Current_User->getFollowRequests();
    echo $returned;
}

/**
 * addFollower function is used to add a follower connection between to user
 */
function addFollower(){
    $json = file_get_contents('php://input');
    $obj = json_decode($josn,true);

    $me = $obj['me'];
    $tryToFollow = $obj['tryToFollow'];
    $return->isValid = 'notValid';

    $Current_User = new User($me);
    $Current_User->gatherUserInfo();
    $Current_User->addFollower($tryToFollow);
    $return->isValid = 'valid';
    echo json_encode($return);
}

/**
 * removeFollower function is used to remove the connection between two users that 
 * are following each other
 */
function removeFollower(){
    $json = file_get_contents('php://input');
    $obj = json_decode($json,true);

    $me = $obj['me'];
    $tryToRemoveFollow = ['tryToRemoveFollow'];

    $return->isValid = 'notValid';
    $Current_User = new User($me);
    $Current_User->gatherUserInfo();
    $Current_User->removeFollower($tryToRemoveFollow);
    $return->isValid = 'valid';
    echo json_encode($return);
}

function getIsFollowing(){
    $json = file_get_contents('php://input');
    $obj = json_decode($json,true);

    $me = 9991034;//$obj['me'];
    $tryToFollow = 29770083;//['tryToFollow'];
    $return->isValid = 'notValid';
    $Current_User = new User($me);
    $Current_User->gatherUserInfo();
    $temp = $Current_User->checkIsFollow($tryToFollow);
    $return->isFollowing = $temp;
    $return->isValid = 'valid';
    echo json_encode($return);
}

/**
 * getFollow returns all of this users followers
 */
function getFollow(){
    $json = file_get_contents('php://input');
    $obj = json_decode($json,true);

    $me = $obj['me'];

    $return->isValid = 'notValid';
    $Current_User = new User($me);
    $Current_User->gatherUserInfo();
    $Current_User->getFollow();
    $return->isValid = 'valid';
    echo json_encode($return);
}

/**
 * updateProfile function takes in a josn encoded string, it then decodes the string and then
 * for all elements in the obj that have the same name as each one of the potental porfile elements
 * if the information is set in the obj then it updates that one thing.
 */
function updateProfile() {
    $json = file_get_contents('php://input');
    $obj = json_decode($json,true);
    //will be getting this from json string during call
    $UserID = $obj['UserID'];
    $FirstName = $obj['FirstName'];
    $LastName = $obj['LastName'];
    $Email = $obj['email'];
    $Password = $obj['Password'];
    $DateOfBirth = $obj['DateOfBirth'];
    $ActiveFlag = $obj['ActiveFlag'];
    $EmployerName = $obj['EmployerName'];
    $AboutMe = $obj['AboutMe'];
    $HomeCity = $obj['HomeCity'];
    $HomeStateOrProvence = $obj['HomeStateOrProvence'];
    $CurrentCity = $obj['CurrentCity'];
    $CurrentStateOrProvence = $obj['CurrentStateOrProvence'];
    $CurrentCountry = $obj['CurrentCountry'];
    $CellPhone = $obj['CellPhone'];
    $HomePhone = $obj['HomePhone'];
    $ProfilePicture = $obj['ProfilePicture'];
    $numberOfUpdates;
    $returned->isValid = 'valid';
    if(!isset($UserID)){ 
       $returned->isValid = 'notValid';
       $returned->errorMessage = 'Please Check to see if you are logged in';
        
    }
    else{
       $Current_User = new User($UserID); //set up user object with users id
       $Current_User->gatherUserInfo(); //gather info about that user from database
       $numberOfUpdates = 0;
       if(isset($FirstName)){
           $numberOfUpdates = $numberOfUpdates + 1;
           $return = $Current_User->updateFirstName($FirstName); //set first name of user to be new first name
           $returned->firstname = $return;
       }if(isset($LastName)){
           $numberOfUpdates = $numberOfUpdates + 1;
           $return = $Current_User->updateLastName($LastName);
           $returned->lastName = $return;
       }if(isset($Email)){
           $numberOfUpdates = $numberOfUpdates + 1;
           $return = $Current_User->updateEmail($Email);
           $returned->email =$return;
       }//if(isset($Password)){
           //$numberOfUpdates = $numberOfUpdates + 1;
           //TODO not sure yet
           //echo 'password';
       //}
       if(isset($DateOfBirth)){
           $numberOfUpdates = $numberOfUpdates + 1;
           $return = $Current_User->updateDateOfBirth($DateOfBirth);
           $returned->DateOfBirth = $return;
       }if(isset($ActiveFlag)){
           $numberOfUpdates = $numberOfUpdates + 1;
           $return = $Current_User->updateActiveFlag($ActiveFlag);
           $returned->ActiveFlag = $return;
       }if(isset($EmployerName)){
           $numberOfUpdates = $numberOfUpdates + 1;
           $return = $Current_User->updateEmployerName($EmployerName);
           $returned->EmployerName = $return;
       }if(isset($AboutMe)){
           $numberOfUpdates = $numberOfUpdates + 1;
           $return = $Current_User->updateAboutMe($AboutMe);
           $returned->AboutMe = $return;
       }if(isset($HomeCity)){
           $numberOfUpdates = $numberOfUpdates + 1;
           $return = $Current_User->updateHomeCity($HomeCity);
           $returned->HomeCity = $return;
       }if(isset($HomeStateOrProvence)){
           $numberOfUpdates = $numberOfUpdates + 1;
           $return = $Current_User->updateHomeStateOrProvence($HomeStateOrProvence);
           $returned->HomeStateOrProvence = $return;
       }if(isset($CurrentCity)){
           $numberOfUpdates = $numberOfUpdates + 1;
           $return = $Current_User->updateCurrentCity($CurrentCity);
           $returned->CurrentCity = $return;
       }if(isset($CurrentStateOrProvence)){
           $numberOfUpdates = $numberOfUpdates + 1;
           $return = $Current_User->updateCurrentStateOrProvence($CurrentStateOrProvence);
           $returned->CurrentStateOrProvence = $return;
       }if(isset($CurrentCountry)){
           $numberOfUpdates = $numberOfUpdates + 1;
           $return = $Current_User->updateCurrentCountry($CurrentCountry);
           $returned->CurrentCountry = $return;
       }if(isset($CellPhone)){
           $numberOfUpdates = $numberOfUpdates + 1;
           $return = $Current_User->updateCellPhone($CellPhone);
           $returned->CellPhone = $return;
       }if(isset($HomePhone)){
           $numberOfUpdates = $numberOfUpdates + 1;
           $return = $Current_User->updateHomePhone($HomePhone);
           $returned->HomePhone = $return;
       }if(isset($ProfilePicture)){
           $numberOfUpdates = $numberOfUpdates + 1;
           $return = $Current_User->updateProfilePicture($ProfilePicture);
           $returned->ProfilePicture = $return;
       }
       echo json_encode($returned);
    }
}
?>