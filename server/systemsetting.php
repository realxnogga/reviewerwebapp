
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
        case 'putSystemSettingData':

            $data = json_decode($_POST['systemSettingDataTemp'], true);

            $username = $data['username'];
            $password = $data['password'];

            $sql = "SELECT ID FROM user WHERE username = '$username' AND password = '$password'";
            $result = $conn->query($sql);

            if ($result->num_rows > 0) {
                $row = $result->fetch_assoc();
                $userid = $row['ID'];

                $sql = "insert into systemsetting (systemsettinguserID, systemsettinguser) VALUES ('$userid','$username')";
                $conn->query($sql);
            }
            $conn->close();
            break;

        case 'editSystemSettingName':

            $data = json_decode($_POST['systemSettingDataTemp'], true);
            $systemsettinguser = $data['systemsettinguser'];
            $systemsettingname = $data['systemsettingname'];

            $sql = "UPDATE `systemsetting` SET `systemsettingname` = '$systemsettingname' WHERE `systemsettinguser` = '$systemsettinguser'";
            $result = $conn->query($sql);

            if ($conn->affected_rows > 0) {
                echo json_encode(['success' => true, 'message' => 'system name updated successfully']);
            } else {
                echo json_encode(['success' => false, 'message' => 'system name failed to update']);
            }

            $conn->close();
            break;

        case 'deleteSystemSetting':

            $systemsettinguser = json_decode(file_get_contents("php://input"), true);
 
            $sql = "delete from systemsetting where systemsettinguser = '$systemsettinguser'";
            $conn->query($sql);

            $conn->close();
            break;
        
            case 'updateSystemSettingUser':   
                $data = json_decode($_POST['datatobeupdated'], true);

                $systemsettinguserID = $data['userID'];
                $systemsettinguser = $data['user'];
     
                $sql = "UPDATE `systemsetting` SET `systemsettinguser` = '$systemsettinguser' WHERE `systemsettinguserID` = '$systemsettinguserID'";
                $conn->query($sql);
    
                $conn->close();
            break;

            case 'getSystemSettingName':   

                $systemsettinguser = json_decode(file_get_contents("php://input"), true);
     
                $sql = "SELECT systemsettingname FROM systemsetting WHERE systemsettinguser = '$systemsettinguser'";
                $result = $conn->query($sql);

                    if ($result->num_rows > 0) {
                        $row = $result->fetch_assoc();
                        $systemsettingname = $row['systemsettingname'];

                        echo json_encode($systemsettingname);
                    }
                $conn->close();
            break;


            
         
    }
}


?>
