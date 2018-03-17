<?php
//Include Connection 
require_once('connection.inc.php');	

class Post{
    public id;
    public UsersId;
    public DateAdded;
    public PostText;
    public EventId;
    public CommunityId;
    public PostTitle;
    public PictureOne;
    public PictureTwo;
    public PictureThree;
    public VideoOne;
    public VideoTwo;
    public VideoThree;
    public function __construct($id){
        $this->id = $id;
    }
}
?>