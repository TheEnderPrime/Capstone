<?php
//Include Connection
require_once('connection.inc.php');	

class Communities{
    public $communityId = 0;
    public $title = '';
    public $aboutUs = '';
    public $profilePicture = '';
    public $adminId = 0;
    public $dateAdded = '';
    public function __construct($commID){
        $this->communityId = $commID;
    }
}
    // public function gatherCommunityInfo(){
    //     global $conn;
    //     $result = mysqli_query($conn, "SELECT * FROM Communities WHERE CommunityId = '$this->communityId'");
    //     if(!$result){
    //         //error
    //         exit;
    //     }
    //     while($row = mysqli_fetch_row($result)){
    //         $this->title = $row[1];
    //         $this->aboutUS = $row[2];
    //         $this->profilePicture = $row[3];
    //         $this->adminId = $row[4];
    //         $this->dateAdded = $row[5];
    //     }
    //     mysqli_free_result($result);
    // }

    // public updateAboutUs($newAboutUs){
    //     global $conn;
    //     $this->aboutUs = $newAboutUs;
    //     //$sql = 
    //     //$stmt =
    //     //$stmt->bind_param()
    //     //$stmt->execute();
    //     //$temp = 'about us updated'
    //     //$stmt->close();
    //     return $temp;
    // }

    // public updateProfilePicture($newProfilePicture){
    //     global $conn;
    //     $this->profilePicture = $newProfilePicture;
    //     //$sql = 
    //     //$stmt =
    //     //$stmt->bind_param()
    //     //$stmt->execute();
    //     //$temp = 'about us updated'
    //     //$stmt->close();
    //     return $temp;
    // }

    // public updateAdminId($newAdminId){
    //     global $conn;
    //     $this->adminId = $newAdminId;
    //     //$sql = 
    //     //$stmt =
    //     //$stmt->bind_param()
    //     //$stmt->execute();
    //     //$temp = 'about us updated'
    //     //$stmt->close();
    //     return $temp;
    // }
?>
