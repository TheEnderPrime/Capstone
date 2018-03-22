<?php
//Include Connection 
require_once('connection.inc.php');	

class SimplePost{
    public $id = 0;
    public $UsersId = 0;
    public $time = "";
    public $EventId = 0;
    public $CommunityId = 0;
    public $title = "";
    public $description = "";
    public function __construct($postId){
        $this->id = $postId;
    }

    public function SetDefultSimplePost( $id, 
                                    $UsersId, 
                                    $time, 
                                    $EventId, 
                                    $CommunityId, 
                                    $title, 
                                    $description)
    {
        $this->id = $id;
        $this->UsersId = $UsersId;
        $this->time = $time;
        $this->EventId = $EventId;
        $this->CommunityId = $CommunityId;
        $this->title = $title;
        $this->description = $description;
    }
    
    public function gatherSimplePostInfo(){
        global $conn;
        $result = mysqli_query($conn, "SELECT Id, UsersId, DateAdded, EventId, CommunityId, PostTitle, Description FROM UserPost WHERE Id = '$this->id'");
        if(!$result){
            echo "cound not run query: ";
            exit;
        }
        while ($row = mysqli_fetch_row($result)){
            $this->UsersId = $row[1];
            $this->time = $row[2];
            $this->EventId = $row[3];
            $this->CommunityId = $row[4];
            $this->title = $row[5];
            $this->description = $row[6];
        }
        mysqli_free_result($result);
    }

    
}

?>