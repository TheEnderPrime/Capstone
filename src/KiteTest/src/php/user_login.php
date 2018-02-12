<?php
    
    // Importing DBConfig.php file.
    include 'DBConfig.php';
    
    // Creating connection.
    $con = mysqli_connect($HostName,$HostUser,$HostPass,$DatabaseName);
    
    // Getting the received JSON into $json variable.
    $json = file_get_contents('php://input');
    
    // decoding the received JSON and store into $obj variable.
    $obj = json_decode($json,true);
    //$check = null;
    // Populate User Email from JSON $obj array and store into $email.
    $Email = $obj['email'];
    
    $Sql_Query1 = "SELECT password FROM Users WHERE Email = '$Email'";
    $HashPass = mysqli_fetch_array(mysqli_query($con,$Sql_Query1));

    $Password = $obj['password'];
    if(password_verify($Password, $HashPass[0]))
    {
        $Sql_Query = "SELECT * FROM Users WHERE Email = '$Email'";

        $check = mysqli_fetch_array(mysqli_query($con,$Sql_Query));
    }
    else{
        
    }
    if(isset($check)){
        $SuccessLoginMsg = 'Data Matched';
        
        //Converting the message into JSON format.
        $SuccessLoginJson = json_encode($SuccessLoginMsg);
        
        //Echo the message.
        echo $SuccessLoginJson ; 
    
    }
    else{
        //If the record inserted successfully then show the message.
        $InvalidMSG = 'Invalid Email or Password Please Try Again' ;
        
        //Converting the message into JSON format.
        $InvalidMSGJSon = json_encode($InvalidMSG);
        
        //Echo the message.
        echo $InvalidMSGJSon ;
    
    }
    mysqli_close($con);
?>