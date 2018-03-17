<?php
//Include Connection 
require_once('connection.inc.php');	

class Event{
    public $id = 0;
    public $UsersId = 0;
    public $DateAdded = '';
    public $EventName = '';
    public $Description = '';
    public function __construct($EventID){
        $this->id = $EventID;
    }

    public function gatherEventsInfo(){
        global $conn;
        $result = mysqli_query($conn, "SELECT * FROM UsersPost Where")
        
    }
}
?>