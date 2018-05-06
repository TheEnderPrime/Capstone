<?php
//Include Connection 
require_once('connection.inc.php');	
require_once('SimplePost.php');

class Post{
    public $id = 0;
    public $UsersId = 0;
    public $time = "";
    public $PostText = "";
    public $EventId = 0;
    public $CommunityId = 0;
    public $title = "";
    public $PictureOne = null;
    public $PictureTwo = null;
    public $PictureThree = null;
    public $VideoOne = null;
    public $VideoTwo = null;
    public $VideoThree = null;
    public $description = "";
    public function __construct($postId){
        $this->id = $postId;
    }

    public function SetDefultPost( $id, 
                                    $UsersId, 
                                    $time, 
                                    $PostText, 
                                    $EventId, 
                                    $CommunityId, 
                                    $title, 
                                    $PictureOne,
                                    $PictureTwo,
                                    $PictureThree,
                                    $VideoOne,
                                    $VideoTwo,
                                    $VideoThree,
                                    $description)
    {
        $this->id = $id;
        $this->UsersId = $UsersId;
        $this->time = $time;
        $this->PostText = $PostText;
        $this->EventId = $EventId;
        $this->CommunityId = $CommunityId;
        $this->title = $title;
        $this->PictureOne = $PictureOne;
        $this->PictureTwo = $PictureTwo;
        $this->PictureThree = $PictureThree;
        $this->VideoOne = $VideoOne;
        $this->VideoTwo = $VideoTwo;
        $this->VideoThree = $VideoThree;
        $this->description = $description;
    }

    public function getPostForEvent(){
        $Temp = new SimplePost($this->id);
        $Temp->SetDefultSimplePost($this->id, 
                                   $this->UsersId, 
                                   $this->time, 
                                   $this->EventId, 
                                   $this->CommunityId, 
                                   $this->title, 
                                   $this->description);
        return $Temp;
    }

    public function gatherPostInfo(){
        global $conn;
        $result = mysqli_query($conn, "SELECT * FROM UserPost WHERE Id = '$this->id'");
        if(!$result){
            echo "cound not run query: ";
            exit;
        }
        while ($row = mysqli_fetch_row($result)){
            $this->UsersId = $row[1];
            $this->time = $row[2];
            $this->PostText = $row[3];
            $this->EventId = $row[4];
            $this->CommunityId = $row[5];
            $this->title = $row[6];
            $this->PictureOne = $row[7];
            $this->PictureTwo = $row[8];
            $this->PictureThree = $row[9];
            $this->VideoOne = $row[10];
            $this->VideoTwo = $row[11];
            $this->VideoThree = $row[12];
            $this->description = $row[13];
        }
        mysqli_free_result($result);
    }

    Public Function updateUserID($UserID){
        global $conn;
        $this->UsersId = $UserID;
        $sql = "UPDATE UserPost SET UserID = ? WHERE id = '$this->id'";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param('i', $UserID);
        $stmt->execute();
        $temp = 'User id updated';
        $stmt->close();
        return $temp;
    }
    Public Function updateTime($time){
        global $conn;
        $this->time = $time;
        $sql = "UPDATE UserPost SET time = ? WHERE id = '$this->id'";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param('s', $time);
        $stmt->execute();
        $temp = 'time updated';
        $stmt->close();
        return $temp;
    }
    Public Function updatePostText($PostText){
        global $conn;
        $this->PostText = $PostText;
        $sql = "UPDATE UserPost SET PostText = ? WHERE id = '$this->id'";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param('s', $PostText);
        $stmt->execute();
        $temp = 'post text updated';
        $stmt->close();
        return $temp;
    }
    Public Function updateEventID($EventID){
        global $conn;
        $this->EventId = $EventID;
        $sql = "UPDATE UserPost SET EventId = ? WHERE id = '$this->id'";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param('i', $EventID);
        $stmt->execute();
        $temp = 'event id changed';
        $stmt->close();
        return $temp;
    }
    Public Function updateCommunityID($CommunityID){
        global $conn;
        $this->CommunityId = $CommunityID;
        $sql = "UPDATE UserPost SET CommunityId = ? WHERE id = '$this->id'";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param('i', $CommunityID);
        $stmt->execute();
        $temp = 'community id changed';
        $stmt->close();
        return $temp;
    }
    Public Function updateTitle($title){
        global $conn;
        $this->title = $title;
        $sql = "UPDATE UserPost SET title = ? WHERE id = '$this->id'";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param('s', $title);
        $stmt->execute();
        $temp = 'title updated';
        $stmt->close();
        return $temp;
    }
    // Public Function updatePictureOne($PictureOne){

    // }
    // Public Function updatePictureTwo($PictureTwo){

    // }
    // Public Function updatePictureThree($PictureThree){

    // }
    // Public Function updateVideoOne($VideoOne){

    // }
    // Public Function updateVideoTwo($VideoTwo){

    // }
    // Public Function updateVideoThree($VideoThree){

    // }
    Public Function updateDescription($description){
        global $conn;
        $this->description = $description;
        $sql = "UPDATE UserPost SET description = ? WHERE id = '$this->id'";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param('s', $description);
        $stmt->execute();
        $temp = 'description updated';
        $stmt->close();
        return $temp;
    }

}
?>