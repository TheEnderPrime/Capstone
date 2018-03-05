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
    public $activeFlag = "";
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

	public function checkPassword($lPassword){
        $returned = $this->setPassword();
        if($returned == "pass"){
            if(password_verify($lPassword, $this->password)){
                return "password matches";
            }
            else{
                return "Please check your password or email.";
            }
        }
        else{
            return $returned;
        }
    }

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
	
	//FUNCTIONS U: USER ACCOUNT	
	//Method D1: Register User
	public function registerUser($lUserID, $lFirstName, $lLastName, $lEmail, $lPassword, $lDateOfBirth) {
        global $conn;
		//Create a hash password using the password_default and the password entend from this function
        $hash = password_hash($lPassword, PASSWORD_DEFAULT);
        $sql = 'INSERT INTO Users (UsersId,FirstName,LastName,Email,password) VALUES (?,?,?,?,?)';
        $stmt = $conn->prepare($sql);
        $stmt->bind_param('issss', $lUserID, $lFirstName, $lLastName, $lEmail, $hash);
        $stmt->execute();
        $temp = 'New records created successfully'; 
        return $temp;
		$stmt->close();
	}	
}
?>