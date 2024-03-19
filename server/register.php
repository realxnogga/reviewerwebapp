<?php

header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Headers: Content-Type");

$servername = "localhost";
$username = "root";
$password = "";
$dbname = "registration";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

if (isset($_GET['action'])) {
    $action = $_GET['action'];

    switch ($action) {
        case 'putData':

            $registerData = json_decode($_POST['registerData'], true);
            $username = $registerData['username'];
            $password = $registerData['password'];
            $email = $registerData['email'];
            $file = $_FILES['file'];


            $sql = "select*from user where username = '$username' and email = '$email'";
            $result = $conn->query($sql);

            if ($result->num_rows > 0) {
                echo json_encode(['success' => true, 'message' => 'Item already Exist']);
            } else {
                echo json_encode(['success' => false, 'message' => 'Item does not exist']);

                $userImageName = $file['name'];
                $userImageTMP = $file['tmp_name'];
                $userImageDestination = '../src/assets/userProfile/' . $userImageName;
    
                move_uploaded_file($userImageTMP, $userImageDestination);
    
                $sql = "INSERT INTO user (username, password, email, userimage) VALUES ('$username', '$password', '$email', '$userImageName')";
                $conn->query($sql);
            }        
            $conn->close();
            break;

        case 'checkExist':

            $data = json_decode(file_get_contents("php://input"), true);
            $username = $data['username'];
            $password = $data['password'];

            if ($username != '' && $password != '') {
                $sql = "select*from user where username = '$username' and password = '$password'";
                $result = $conn->query($sql);

                if ($result->num_rows > 0) {
                    echo json_encode(['success' => true, 'message' => 'Item already Exist']);
                } else {
                    echo json_encode(['success' => false, 'message' => 'Item does not exist']);
                }
                $conn->close();
            }
            break;
        case 'getData':
            $data = json_decode(file_get_contents("php://input"), true);
            $username = $data['username'];
            $password = $data['password'];

            $sql = "select*from user where username = '$username' and password = '$password'";
            $result = $conn->query($sql);

            $data = [];
            while ($row = $result->fetch_assoc()) {
                $data[] = $row;
            }
            header('Content-Type: application/json');
            echo json_encode($data);
            $conn->close();
            break;


        default:
            # code...
            break;
    }
}
