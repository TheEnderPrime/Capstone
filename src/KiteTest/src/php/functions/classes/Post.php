<?php
//Include Connection 
require_once('connection.inc.php');	
require_once('SimplePost.php');

/**
 * post class holds the structure of a post
 */
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
    public $isComment = null;//forcomment
    public function __construct($postId){
        $this->id = $postId;
    }
    /**
     * set default post is used to set all values of a post
     */
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
    /**
     * get post for event constructs a simple post
     * which is a sub set of post and returns that
     */
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
    /**
     * gather post info get all information for a given post
     * depending on what this post id
     */
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
            $this->isComment = $row[14]; //forcomment
        }
        mysqli_free_result($result);
    }
    /**
     * helper function for updating
     * this one is used to update user id
     */
    Public Function updateUserID($UserID){
        global $conn;
        $this->UsersId = $UserID;
        $sql = "UPDATE UserPost SET UsersID = ? WHERE id = '$this->id'";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param('i', $UserID);
        $stmt->execute();
        $temp = 'User id updated';
        $stmt->close();
        return $temp;
    }
    /**
     * helper function for updating
     * this one is used to update time
     */
    Public Function updateTime($time){
        global $conn;
        $this->time = $time;
        $sql = "UPDATE UserPost SET DateAdded = ? WHERE id = '$this->id'";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param('s', $time);
        $stmt->execute();
        $temp = 'time updated';
        $stmt->close();
        return $temp;
    }
    /**
     * helper function for updating
     * this one is used to update post text
     */
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
    /**
     * helper function for updating
     * this one is used to update event id
     */
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
    /**
    * helper function for updating
    * this one is used to update community id
    */
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
    /**
    * helper function for updating
    * this one is used to update title
    */
    Public Function updateTitle($title){
        global $conn;
        $this->title = $title;
        $sql = "UPDATE UserPost SET PostTitle = ? WHERE id = '$this->id'";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param('s', $title);
        $stmt->execute();
        $temp = 'title updated';
        $stmt->close();
        return $temp;
    }    
    /**
    * helper function for updating
    * this one is used to update picutre one
    */
    Public Function updatePictureOne($PictureOne){
        global $conn;
        $this->PictureOne = $PictureOne;
        $sql = "UPDATE UserPost SET PictureOne = ? WHERE id = '$this->id'";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param('s', $PictureOne);
        $stmt->execute();
        $temp = 'photo one updated';
        $stmt->close();
        return $temp;
    }    
    /**
    * helper function for updating
    * this one is used to update picutre two
    */
    Public Function updatePictureTwo($PictureTwo){
        global $conn;
        $this->PictureTwo = $PictureTwo;
        $sql = "UPDATE UserPost SET PictureTwo = ? WHERE id = '$this->id'";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param('s', $PictureTwo);
        $stmt->execute();
        $temp = 'photo two updated';
        $stmt->close();
        return $temp;
    }    
    /**
    * helper function for updating
    * this one is used to update picturethree
    */
    Public Function updatePictureThree($PictureThree){
        global $conn;
        $this->PictureThree = $PictureThree;
        $sql = "UPDATE UserPost SET PictureThree = ? WHERE id = '$this->id'";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param('s', $PictureThree);
        $stmt->execute();
        $temp = 'photo three updated';
        $stmt->close();
        return $temp;
    }
    /**
     * place holder for video
     */
    Public Function updateVideoOne($VideoOne){

    }
    /**
     * place holder for video
     */
    Public Function updateVideoTwo($VideoTwo){

    }
    /**
     * place holder for video
     */
    Public Function updateVideoThree($VideoThree){

    }
    /**
     * helper function for updating
     * this one is used to update description
     */
    Public Function updateDescription($description){
        global $conn;
        $this->description = $description;
        $sql = "UPDATE UserPost SET Description = ? WHERE id = '$this->id'";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param('s', $description);
        $stmt->execute();
        $temp = 'description updated';
        $stmt->close();
        return $temp;
    }
}
?>