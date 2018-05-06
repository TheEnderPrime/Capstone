<?php
//Include Connection 
require_once('connection.inc.php');	

class User{
    public $usersID = 0;
    public $firstName = "";
    public $lastName = "";
    public $email = "";
    public $password = "";
    public $dateOfBirth = "";
    public $activeFlag = 1;
    public $employerName = "";
    public $aboutMe = "";
    public $homeCity = "";
    public $homeStateOrProvence = "";
    public $currentCity = "";
    public $currentStateOrProvence = "";
    public $currentCountry = "";
    public $cellPhone = 0;
    public $homePhone = 0;
    public $profilePicture = "";
    public $dateAdded = "";
    public function __construct($userID){
        $this->usersID = $userID;
    }

    //sets this users password to equal the password that is saved in
    //the datebase
	private function setPassword(){
        global $conn;
        $sql = "SELECT password FROM Users WHERE UsersId = ?";
        if($stmt = $conn->prepare($sql)){
            $stmt->bind_param('i', $this->usersID);
            $stmt->execute();
            $stmt->bind_result($pass);
            $stmt->fetch();
            $stmt->close();
            if(isset($pass)){
                $this->password = $pass;
                return "pass";
            }
            else{
                return "this email does not exist";
            }
        }
        else{
            return "ERROR(incode): 1";
        }
    }

    //uses the userid that has been set, to set this users information from
    //what is in the database  
    public function gatherUserInfo(){
        global $conn;
        $result = mysqli_query($conn, "SELECT * FROM Users WHERE UsersId = '$this->usersID'");
        if(!$result){
            echo "cound not run query: ";
            exit;
        }
        while ($row = mysqli_fetch_row($result)){
            $this->firstName = $row[1];
            $this->lastName = $row[2];
            $this->email = $row[3];
            $this->password = $row[4];
            $this->dateOfBirth = $row[5];
            $this->activeFlag = $row[6];
            $this->employerName = $row[7];
            $this->aboutMe = $row[8];
            $this->homeCity = $row[9];
            $this->homeStateOrProvence = $row[10];
            $this->currentCity = $row[11];
            $this->currentStateOrProvence = $row[12];
            $this->currentCountry = $row[13];
            $this->cellPhone = $row[14];
            $this->homePhone = $row[15];
            $this->profilePicture = $row[16];
            $this->dateAdded = $row[17];
        }
        mysqli_free_result($result);
    }

    //DEV just a function to look at stuff
    public function getTEST(){
        return $this->firstName;
    }

    //
    public function updateFirstName($newFirstName){
        global $conn;
        $this->firstName = $newFirstName;
        $sql = "UPDATE Users SET FirstName = ? WHERE UsersId = '$this->usersID'";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param('s', $newFirstName);
        $stmt->execute();
        $temp = 'First Name Updated'; 
		$stmt->close();
        return $temp;
    }

    //
    public function updateLastName($newLastName){
        global $conn;
        $this->lastname = $newLastName;
        $sql = "UPDATE Users SET LastName = ? WHERE UsersId = '$this->usersID'";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param('s', $newLastName);
        $stmt->execute();
        $temp = 'Last Name Updated';
        $stmt->close();
        return $temp;
    }
    //
    public function updateEmail($newEmail){
        global $conn;
        $this->email = $newEmail;
        $sql = "UPDATE Users SET Email = ? WHERE UsersId = '$this->usersID'";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param('s', $newEmail);
        $stmt->execute();
        $temp = 'Email Updated';
        $stmt->close();
        return $temp;
    }
    // //
    // // public function updatePassword($newPassword){
    // //     // global $conn;
    // //     // $this->password = $newEmail;
    // //     // TODO not sure yet
    // // }
    // //
    public function updateDateOfBirth($newDateOfBirth){
        global $conn;
        $this->dateOfBirth = $newDateOfBirth;
        $sql = "UPDATE Users SET DateOfBirth = ? WHERE UsersId = '$this->usersID'";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param('s', $newDateOfBirth);
        $stmt->execute();
        $temp = 'Date of Birth Updated';
        $stmt->close();
        return $temp;
    }
    //
    public function updateActiveFlag($newActiveFlag){
        global $conn;
        $this->activeFlag = $newActiveFlag;
        $sql = "UPDATE Users SET ActiveFlag = ? WHERE UsersId = '$this->usersID'";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param('i', $newActiveFlag);
        $stmt->execute();
        $temp = 'Active Flag Updated';
        $stmt->close();
        return $temp;
    }
    //
    public function updateEmployerName($newEmployerName){
        global $conn;
        $this->employerName = $newEmployerName;
        $sql = "UPDATE Users SET EmployerName = ? WHERE UsersId = '$this->usersID'";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param('s', $newEmployerName);
        $stmt->execute();
        $temp = 'Employer Name Updated';
        $stmt->close();
        return $temp;
    }
    //
    public function updateAboutMe($newAboutMe){
        global $conn;
        $this->aboutMe = $newAboutMe;
        $sql = "UPDATE Users SET AboutMe = ? WHERE UsersId = '$this->usersID'";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param('s', $newAboutMe);
        $stmt->execute();
        $temp = 'About Me Updated';
        $stmt->close();
        return $temp;
    }
    //
    public function updateHomeCity($newHomeCity){
        global $conn;
        $this->homeCity = $newHomeCity;
        $sql = "UPDATE Users SET HomeCity = ? WHERE UsersId = '$this->usersID'";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param('s', $newHomeCity);
        $stmt->execute();
        $temp = 'Home City Updated';
        $stmt->close();
        return $temp;
    }
    //
    public function updateHomeStateOrProvence($newHomeStateOrProvence){
        global $conn;
        $this->homeStateOrProvence = $newHomeStateOrProvence;
        $sql = "UPDATE Users SET HomeStateOrProvence = ? WHERE UsersId = '$this->usersID'";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param('s', $newHomeStateOrProvence);
        $stmt->execute();
        $temp = 'Home State Or Provence Updated';
        $stmt->close();
        return $temp;
    }
    //
    public function updateCurrentCity($newCurrentCity){
        global $conn;
        $this->currentCity = $newCurrentCity;
        $sql = "UPDATE Users SET CurrentCity = ? WHERE UsersId = '$this->usersID'";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param('s', $newCurrentCity);
        $stmt->execute();
        $temp = 'Current City Updated';
        $stmt->close();
        return $temp;
    }
    //
    public function updateCurrentStateOrProvence($newCurrentStateOrProvence){
        global $conn;
        $this->currentStateOrProvence = $newCurrentStateOrProvence;
        $sql = "UPDATE Users SET CurrentStateOrProvence = ? WHERE UsersId = '$this->usersID'";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param('s', $newCurrentStateOrProvence);
        $stmt->execute();
        $temp = 'Current State or Provence Updated';
        $stmt->close();
        return $temp;
    }
    //
    public function updateCurrentCountry($newCurrentCountry){
        global $conn;
        $this->currentCountry = $newCurrentCountry;
        $sql = "UPDATE Users SET CurrentCountry = ? WHERE UsersId = '$this->usersID'";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param('s', $newCurrentCountry);
        $stmt->execute();
        $temp = 'Current Country Updated';
        $stmt->close();
        return $temp;
    }
    //
    public function updateCellPhone($newCellPhone){
        global $conn;
        $this->cellPhone = $newCellPhone;
        $sql = "UPDATE Users SET CellPhone = ? WHERE UsersId = '$this->usersID'";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param('s', $newCellPhone);
        $stmt->execute();
        $temp = 'Cell Phone Updated';
        $stmt->close();
        return $temp;
    }
    //
    public function updateHomePhone($newHomePhone){
        global $conn;
        $this->homePhone = $newHomePhone;
        $sql = "UPDATE Users SET HomePhone = ? WHERE UsersId = '$this->usersID'";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param('s', $newHomePhone);
        $stmt->execute();
        $temp = 'Home Phone Updated';
        $stmt->close();
        return $temp;
    }
    //
    public function updateProfilePicture($newProfilePicture){
        global $conn;
        $this->profilePicture = $newProfilePicture;
        $sql = "UPDATE Users SET ProfilePicture = ? WHERE UsersId = '$this->usersID'";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param('s', $newProfilePicture);
        $stmt->execute();
        $temp = 'Profile Picture Updated';
        $stmt->close();
        return $temp;
    }



    //checks to see if the password sent to this function equals the
    //hashed password that is in the database
	public function checkPassword($lPassword){
        $returned = $this->setPassword();
        if($returned == "pass"){
            if(password_verify($lPassword, $this->password)){
                return "Data Matched";
            }
            else{
                return "Please check your password or email.";
            }
        }
        else{
            return $returned;
        }
    }
	
	public function registerUser($lUserID, $lFirstName, $lLastName, $lEmail, $lPassword, $lDateOfBirth) {
        global $conn;
		//Create a hash password using the password_default and the password entend from this function
        $hash = password_hash($lPassword, PASSWORD_DEFAULT);
        $sql = 'INSERT INTO Users (UsersId,FirstName,LastName,Email,password) VALUES (?,?,?,?,?)';
        $stmt = $conn->prepare($sql);
        $stmt->bind_param('issss', $lUserID, $lFirstName, $lLastName, $lEmail, $hash);
        $stmt->execute();
        $temp = 'New records created successfully'; 
		$stmt->close();
        return $temp;
	}

    //public getteres
    public function getFirstName(){
        return $this->firstName;
    }
    public function getLastName(){
        return $this->lastName;
    }
    public function getEmail(){
        return $this->email;
    }
    public function getPassword(){
        return $this->password;
    }
    public function getDateOfBirth(){
        return $this->dateOfBirth;
    }
    public function getActiveFlag(){
        return $this->activeFlag;
    }
    public function getEmployerName(){
        return $this->employerName;
    }
    public function getAboutMe(){
        return $this->aboutMe;
    }
    public function getHomeCity(){
        return $this->homeCity;
    }
    public function getHomeStateOrProvence(){
        return $this->homeStateOrProvence;
    }
    public function getCurrentCity(){
        return $this->currentCity;
    }
    public function getCurrentStateOrProvence(){
        return $this->currentStateOrProvence;
    }
    public function getCurrentCountry(){
        return $this->currentCountry;
    }
    public function getCellPhone(){
        return $this->cellPhone;
    }
    public function getHomePhone(){
        return $this->homePhone;
    }
    public function getProfilePicture(){
        return $this->profilePicture;
    }

    public function sendFollowRequest($tryToFollow){
        global $conn;
        $sql = "INSERT INTO FollowRequest (UserRequestingId, UserRequestedId) VALUES (?, ?)";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param('ii', $this->usersID, $tryToFollow);
        $stmt->execute();
        $stmt->close();
    }

    public function addFollower($tryToFollow){
        global $conn;
        $sql = "INSERT INTO UserRelationships (UserFollowingId, UserFollowedId) VALUE (?,?)";
        $stmt = $conn->prepare($sql);
        $stmt->bid_param('ii', $this->usersID, $tryToFollow);
        $stmt->execute();
        $stmt->close();
        $this->removeFollowRequest($tryToFollow);
    }

    public function removeFollowRequest($tryToRemoveFollow){
        global $conn;
        $sql = "DELETE FROM FollowRequest WHERE UserRequestingId = ? AND UserRequestedId = ?";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param('ii', $this->usersID, $tryToRemoveFollow);
        $stmt->execute();
        $stmt->close();
    }

    // public function removeFollower($tryToRemoveFollow){
    //     global $coon;
    //     $sql = ""
    // }

    public function getFollowRequests(){
        global $conn;
        $sql = "SELECT UserRequestedId FROM  FollowRequest WHERE UserRequestingId = ?";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param('i', $this->usersID);
        $stmt->execute();
        $stmt->bind_result($tempids);
        $stmt->store_result();
        $returned->listOfFollowRequests = array();
        while ($stmt->fetch()){
            $tempID = $tempids;
            $tempIDAndName = array();
            $sql2 = "SELECT FirstName FROM Users WHERE UsersId = ?";
            if($stmt2 = $conn->prepare($sql2)){
                $stmt2->bind_param('i', $tempID);
                $stmt2->execute();
                $stmt2->bind_result($tempname);
                $stmt2->fetch();
                $stmt2->close();
                if(isset($tempname)){
                    array_push($tempIDAndName, $tempname);
                }
                else{
                    echo "this email does not exist";
                }
            }
            else{
                echo "ERROR(incode): 1";
            }
            array_push($tempIDAndName, $tempID);

            array_push($returned->listOfFollowRequests, $tempIDAndName);
        }
        $stmt->close();

        $returned->myID = $this->usersID;
        return json_encode($returned);
    }


}
?>