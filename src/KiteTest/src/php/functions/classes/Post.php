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
}
?>