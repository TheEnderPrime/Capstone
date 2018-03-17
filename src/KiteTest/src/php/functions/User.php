<?php
require_once('includes/constants.inc.php');
require_once('includes/connection.inc.php');
require_once('classes/User.php');

if(function_exists($_GET['f'])) {
   $_GET['f']();
}

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
    }

    echo json_encode($returnObj);
}

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
    if(!isset($UserID)){ 
        echo "Please Check to see if you are logged in";
    }
    else{
        $Current_User = new User($UserID); //set up user object with users id
        $Current_User->gatherUserInfo(); //gather info about that user from database
        $numberOfUpdates = 0;
        if(isset($FirstName)){
            $numberOfUpdates = $numberOfUpdates + 1;
            $returned = $Current_User->updateFirstName($FirstName); //set first name of user to be new first name
            echo $returned;
        }if(isset($LastName)){
            $numberOfUpdates = $numberOfUpdates + 1;
            $returned = $Current_User->updateLastName($LastName);
            echo $returned;
        }if(isset($Email)){
            $numberOfUpdates = $numberOfUpdates + 1;
            $returned = $Current_User->updateEmail($Email);
            echo $returned;
        }if(isset($Password)){
            $numberOfUpdates = $numberOfUpdates + 1;
            //TODO not sure yet
            echo 'password';
        }if(isset($DateOfBirth)){
            $numberOfUpdates = $numberOfUpdates + 1;
            $returned = $Current_User->updateDateOfBirth($DateOfBirth);
            echo $returned;
        }if(isset($ActiveFlag)){
            $numberOfUpdates = $numberOfUpdates + 1;
            $returned = $Current_User->updateActiveFlag($ActiveFlag);
            echo $returned;
        }if(isset($EmployerName)){
            $numberOfUpdates = $numberOfUpdates + 1;
            $returned = $Current_User->updateEmployerName($EmployerName);
            echo $returned;
        }if(isset($AboutMe)){
            $numberOfUpdates = $numberOfUpdates + 1;
            $returned = $Current_User->updateAboutMe($AboutMe);
            echo $returned;
        }if(isset($HomeCity)){
            $numberOfUpdates = $numberOfUpdates + 1;
            $returned = $Current_User->updateHomeCity($HomeCity);
            echo $returned;
        }if(isset($HomeStateOrProvence)){
            $numberOfUpdates = $numberOfUpdates + 1;
            $returned = $Current_User->updateHomeStateOrProvence($HomeStateOrProvence);
            echo $returned;
        }if(isset($CurrentCity)){
            $numberOfUpdates = $numberOfUpdates + 1;
            $returned = $Current_User->updateCurrentCity($CurrentCity);
            echo $returned;
        }if(isset($CurrentStateOrProvence)){
            $numberOfUpdates = $numberOfUpdates + 1;
            $returned = $Current_User->updateCurrentStateOrProvence($CurrentStateOrProvence);
            echo $returned;
        }if(isset($CurrentCountry)){
            $numberOfUpdates = $numberOfUpdates + 1;
            $returned = $Current_User->updateCurrentCountry($CurrentCountry);
            echo $returned;
        }if(isset($CellPhone)){
            $numberOfUpdates = $numberOfUpdates + 1;
            $returned = $Current_User->updateCellPhone($CellPhone);
            echo $returned;
        }if(isset($HomePhone)){
            $numberOfUpdates = $numberOfUpdates + 1;
            $returned = $Current_User->updateHomePhone($HomePhone);
            echo $returned;
        }if(isset($ProfilePicture)){
            $numberOfUpdates = $numberOfUpdates + 1;
            $returned = $Current_User->updateProfilePicture($ProfilePicture);
            echo $returned;
        }
        
        if(isset($numberOfUpdates)){
            if(!($numberOfUpdates > 0)){
                echo "User:" . $UserID . " has no updates";
            }
            //TODO DEV
            else{
                echo "User " . $UserID . " has " . $numberOfUpdates . " update";
            }
            //TODO DEV
        }
    }
}
?>