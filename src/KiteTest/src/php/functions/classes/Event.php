<?php
//Include Connection 
require_once('connection.inc.php');	

class Event{
    public $id = 0;
    public $UsersId = 0;
    public $time = '';
    public $title = '';
    public $description = '';
    public function __construct($EventID){
        $this->id = $EventID;
    }


public function updateUserID($UserID){
    global $conn;
    $this->UsersId = $UserID;
    $sql = "UPDATE PostEvent SET UserID = ? WHERE id = '$this->id'";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param('s', $UserID);
    $stmt->execute();
    $temp = 'User id updated';
    $stmt->close();
    return $temp;
}
public function updateTime($time){
    global $conn;
    $this->time = $time;
    $sql = "UPDATE PostEvent SET time = ? WHERE id = '$this->id'";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param('s', $time);
    $stmt->execute();
    $temp = 'time updated';
    $stmt->close();
    return $temp;
}
public function updateTitle($Title){
    global $conn;
    $this->title = $Title;
    $sql = "UPDATE PostEvent SET title = ? WHERE id = '$this->id'";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param('s', $Title);
    $stmt->execute();
    $temp = 'title updated';
    $stmt->close();
    return $temp;
}
public function updateDescription($description){
    global $conn;
    $this->description = $description;
    $sql = "UPDATE PostEvent SET description = ? WHERE id = '$this->id'";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param('s', $Title);
    $stmt->execute();
    $temp = 'description updated';
    $stmt->close();
    return $temp;
}

public function SetDefultPost( $id, 
                               $UsersId, 
                               $time, 
                               $title,
                               $description){
        $this->id = $id;
        $this->UsersId = $UsersId;
        $this->time = $time;
        $this->title = $title;
        $this->description = $description;
}


    public function SetEvent( $id, 
                                   $UsersId, 
                                   $title,
                                   $time, 
                                   $description)
    {
        $this->id = $id;
        $this->UsersId = $UsersId;
        $this->time = $time;
        $this->title = $title;
        $this->description = $description;
    }

    public function gatherEventsInfo(){
        global $conn;
        $result = mysqli_query($conn, "SELECT * FROM PostEvent WHERE id = '$this->id'");
        if(!$result){
            $results->isvalid = "notValid";
            echo json_encode($results);
            exit;
        }
        while ($row = mysqli_fetch_row($result)){
            $this->UsersId = $row[1];
            $this->title = $row[2];
            $this->time = $row[3];
            $this->description = $row[4];
        }
        mysqli_free_result($result);
    }
}
?>