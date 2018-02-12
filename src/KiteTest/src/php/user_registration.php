<?php
    // Importing DBConfig.php file.
    include 'DBConfig.php';

    // Creating connection.
    $con = mysqli_connect($HostName,$HostUser,$HostPass,$DatabaseName);

    // Getting the received JSON into $json variable.
    $json = file_get_contents('php://input');

    // decoding the received JSON and store into $obj variable.
    $obj = json_decode($json,true);
    //$id = null;
    // Populate User name from JSON $obj array and store into $name.
    $FirstName = $obj['firstName'];
    $LastName =  $obj['lastName'];
    // Populate User email from JSON $obj array and store into $email.
    $email = $obj['email'];
    // Populate Password from JSON $obj array and store into $password.
    $password =$obj['password'];
    $hash = password_hash($password, PASSWORD_DEFAULT);
    //Checking Email is already exist or not using SQL query.
    //$Sql_Query = "SELECT * FROM 'Users' WHERE 'Email' = '$email' ";
    $Sql_Query = "SELECT * FROM Users WHERE Email = '$email' ";
    //$DOB = $obj['date'];
    $d=mktime(0, 0, 0, 5 , 12, 2015);
    $DOB = date("Y-m-d", $d);
    // Executing SQL Query.
    $checkEmail = mysqli_fetch_array(mysqli_query($con,$Sql_Query));

    if(isset($checkEmail)) {

        $EmailExistMSG = 'Email Already Exist, Please Try Again !!!';

        // Converting the message into JSON format.
        $EmailExistJson = json_encode($EmailExistMSG);

        // Echo the message.
        echo $EmailExistJson; 
    }
    else{
        $id = rand(1, 9999999999);
        $CheckSQL2 = "SELECT * FROM Users WHERE UsersId = $id ";
        $checkId  = mysqli_fetch_array(mysqli_query($con,$CheckSQL2));
        while(isset($checkId)){
            $id = rand(1, 9999999999);
            $CheckSQL2 = "SELECT * FROM Users WHERE UsersId = $id ";
            $checkId = mysqli_fetch_array(mysqli_query($con,$CheckSQL2));
        }
        if(isset($checkId)){
            echo json_encode('omg big problem!!');
        }
        //echo json_encode($DOB);
        $Sql_Query_do = "INSERT INTO Users (UsersId,FirstName,LastName,Email,password,DateOfBirth) VALUES ($id, '$FirstName', '$LastName', '$email', '$hash', $DOB)";
        if(mysqli_query($con,$Sql_Query_do)) {
             //we did good
            echo json_encode("we did good");
        }
        else{
            echo json_encode("Try Again");
        }
    }
    mysqli_close($con);
?>