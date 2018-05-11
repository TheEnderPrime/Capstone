<?php
//Include Connection
require_once('connection.inc.php');	

/**
 * communities class holds the structure of one community
 */
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

    /**
     * gathercommunity info fuction gathers all information of a given community
     * depending on the community id
     */
    public function gatherCommunityInfo(){
        global $conn;
        $result = mysqli_query($conn, "SELECT * FROM Communities WHERE CommunityId = '$this->communityId'");
        if(!$result){
            //error
            exit;
        }
        while($row = mysqli_fetch_row($result)){
            $this->title = $row[1];
            $this->aboutUS = $row[2];
            $this->profilePicture = $row[3];
            $this->adminId = $row[4];
            $this->dateAdded = $row[5];
        }
        mysqli_free_result($result);
    }

    /**
     * function that just returns the admin id
     */
    public function getAdminId(){
        return $this->adminId;
    }

    /**
     * helper function for updateing 
     * this one updates the commmunity title
     */
    public function updateTitle($newTitle){
        global $conn;
        $this->title = $newTitle;
        $sql = "UPDATE Communities SET Title = ? WHERE CommunityId = '$this->communityId'";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param('s', $newTitle);
        $stmt->execute();
        $temp = 'title updated';
        $stmt->close();
        return $temp;
    }

    /**
     * helper function for updating
     * this one updates the about us 
     */
    public function updateAboutUs($newAboutUs){
        global $conn;
        $this->aboutUs = $newAboutUs;
        $sql = "UPDATE Communities SET AboutUs = ? WHERE CommunityId = '$this->communityId'";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param('s', $newAboutUs);
        $stmt->execute();
        $temp = 'about us updated';
        $stmt->close();
        return $temp;
    }

    /**
     * helper function for updating
     * this one updates the profilepicture
     */
    public function updateProfilePicture($newProfilePicture){
        global $conn;
        $this->profilePicture = $newProfilePicture;
        $sql = "UPDATE Communities SET ProfilePicture = ? WHERE CommunityId = '$this->communityId'";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param('s', $newProfilePicture);
        $stmt->execute();
        $temp = 'picture updated';
        $stmt->close();
        return $temp;
    }

    /**
     * helper function for updating
     * this one updates admin id
     *  this is for when a admin gives up the admin contorl?
     */
    public function updateAdminId($newAdminId){
        global $conn;
        $this->adminId = $newAdminId;
        $sql = "UPDATE Communities SET AdminId = ? WHERE CommunityId = '$this->communityId'";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param('i', $newAdminId);
        $stmt->execute();
        $temp = 'admin id updated';
        $stmt->close();
        return $temp;
    }
}
?>
