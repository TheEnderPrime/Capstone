<?php
require_once('includes/constants.inc.php');
require_once('includes/connection.inc.php');
require_once('classes/SimplePost.php');
require_once('classes/Post.php');
require_once('classes/Event.php');

if(function_exists($_GET['f'])) {
   $_GET['f']();
}

function getMainTimeLine(){
    global $conn;

    $json = file_get_contents('php://input');
    $obj = json_decode($json,true);

    $returned->isValid = 'valid';
    $result = mysqli_query($conn, "SELECT * FROM PostEvent");
    $returned->timeline = array();
    if(!$result){
        $returned->isvalid = "notValid";
        echo json_encode($returned);
        exit;
    }
    while ($row = mysqli_fetch_row($result)){
        $tempEvent = new Event($row[0]);
        $dt = new DateTime($row[3]);
        $tempEvent->SetEvent( $row[0],
                              $row[1],
                              $row[2],
                              $dt->format('Y-m-d'),
                              $row[4]);
        array_push($returned->timeline, $tempEvent);
    }
    mysqli_free_result($result);
    echo json_encode($returned);
}

function getCommunityTimeLine(){
    global $conn;

    $json = file_get_contents('php://input');
    $obj = json_decode($json,true);

    $returned->isValid = 'valid';
    $result = mysqli_query($conn, "SELECT * FROM PostEvent");
    $returned->timeline = array();
    if(!$result){
        $returned->isvalid = "notValid";
        echo json_encode($returned);
        exit;
    }
    while ($row = mysqli_fetch_row($result)){
        $tempEvent = new Event($row[0]);
        $dt = new DateTime($row[3]);
        $tempEvent->SetEvent( $row[0],
                              $row[1],
                              $row[2],
                              $dt->format('Y-m-d'),
                              $row[4]);
        array_push($returned->timeline, $tempEvent);
    }
    mysqli_free_result($result);
    echo json_encode($returned);
}

function getUserTimeLine(){
    global $conn;

    $json = file_get_contents('php://input');
    $obj = json_decode($json,true);

    $UserID = $obj['UserID'];

    $returned->isValid = 'valid';
    $result = mysqli_query($conn, "SELECT * FROM PostEvent Where UsersId = '$UserID'");
    $returned->timeline = array();
    if(!$result){
        $returned->isvalid = "notValid";
        echo json_encode($returned);
        exit;
    }
    while ($row = mysqli_fetch_row($result)){
        $tempEvent = new Event($row[0]);
        $dt = new DateTime($row[3]);
        $tempEvent->SetEvent( $row[0],
                              $row[1],
                              $row[2],
                              $dt->format('Y-m-d'),
                              $row[4]);
        array_push($returned->timeline, $tempEvent);
    }
    mysqli_free_result($result);
    echo json_encode($returned);
}

?>