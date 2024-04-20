<?php

header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Headers: Content-Type");

$servername = "localhost";
$username = "root";
$password = "";
$dbname = "reviewerwebapp";

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
                // concatinate time to image name to grnerate unique image name
                $uniqueImageName =  $userImageName."_".$timestamp = date("YmdHis");


                $userImageTMP = $file['tmp_name'];
                $userImageDestination = '../public/asset/userprofile/' . $uniqueImageName;

                move_uploaded_file($userImageTMP, $userImageDestination);

                $sql = "INSERT INTO user (username, password, email, userimage) VALUES ('$username', '$password', '$email', '$uniqueImageName')";
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
                    $sql = "SELECT ID FROM user WHERE username = '$username' AND password = '$password'";
                    $result = $conn->query($sql);

                    if ($result->num_rows > 0) {
                        $row = $result->fetch_assoc();
                        $userid = $row['ID'];

                        echo json_encode(['success' => true, 'userid' => $userid, 'message' => 'Item already Exist']);
                    }
                } else {
                    echo json_encode(['success' => false, 'message' => 'Item does not exist']);
                }
                $conn->close();
            }
            break;
        case 'getData':
            $data = json_decode(file_get_contents("php://input"), true);
            $userid = $data['userid'];

            $sql = "select*from user where ID = '$userid'";
            $result = $conn->query($sql);

            $data = [];
            while ($row = $result->fetch_assoc()) {
                $data[] = $row;
            }
            header('Content-Type: application/json');
            echo json_encode($data);
            $conn->close();
            break;

        case 'deleteAccout':
            $data = json_decode(file_get_contents("php://input"), true);
            $username = $data['username'];
            $email = $data['email'];
            $userimage = $data['userimage'];

            $sql = "delete from user where username = '$username' and email = '$email'";
            $result = $conn->query($sql);

            if ($conn->affected_rows > 0) {
                echo json_encode(['success' => true, 'message' => 'Account deleted successfully']);

                $userImagePath = "../public/asset/userprofile/" . $userimage;
                if (file_exists($userImagePath)) {
                    unlink($userImagePath);
                }
            } else {
                echo json_encode(['success' => false, 'message' => 'Failed to delete account']);
            }
            $conn->close();
            break;
        case 'editData':

            $editUserData = json_decode($_POST['editUserData'], true);
            $id = $conn->real_escape_string($editUserData['id']);
            $username = $conn->real_escape_string($editUserData['username']);
            $password = $conn->real_escape_string($editUserData['password']);
            $email = $conn->real_escape_string($editUserData['email']);
            $userimagetobereplace = $conn->real_escape_string($editUserData['userimage']);
            $file = $_FILES['editUserfile'];

            $userImageName = $file['name'];
            // concatinate time to image name to grnerate unique image name
            $uniqueImageName =  $userImageName."_".$timestamp = date("YmdHis");

            $userImageTMP = $file['tmp_name'];
            $userImageDestination = '../public/asset/userprofile/' . $uniqueImageName;

            $sql = "UPDATE `user` SET `username` = '$username', `password` = '$password', `email` = '$email', `userimage` = '$uniqueImageName' WHERE `ID` = '$id'";
            $result = $conn->query($sql);

            if ($result === TRUE) {
                echo json_encode(['success' => true, 'message' => 'Item edited successfully']);

                if (is_uploaded_file($userImageTMP)) {
                    $userImageToBeReplacePath = "../public/asset/userprofile/" . $userimagetobereplace;
                    if (file_exists($userImageToBeReplacePath)) {
                        unlink($userImageToBeReplacePath);
                    }
                    move_uploaded_file($userImageTMP, $userImageDestination);
                }
            } else {
                echo json_encode(['success' => false, 'message' => 'Item failed to update']);
            }
            $conn->close();
            break;


        default:
            # code...
            break;
    }
}
