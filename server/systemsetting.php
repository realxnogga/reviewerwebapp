

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
        case 'insertSystemSetting':
            $systemsettinguser = json_decode($_POST['systemsettinguser'], true);

            $sql = "insert into systemsetting (systemsettinguser) VALUES ('$systemsettinguser')";

            $conn->query($sql);

            $conn->close();
            break;

        case 'getSystemSetting':
            $systemsettinguser = json_decode(file_get_contents("php://input"), true);

            $sql = "select*from systemsetting where systemsettinguser = '$systemsettinguser'";
            $result = $conn->query($sql);

            $data = [];
            while ($row = $result->fetch_assoc()) {
                $data[] = $row;
            }
            header('Content-Type: application/json');
            echo json_encode($data);

            $conn->close();
            break;

        case 'editSystemSetting':
                $data = json_decode(file_get_contents("php://input"), true);

                $systemsettinguser = $data['systemsettinguser'];
                $systemname = $data['systemname'];

            
                // $sql = "update `systemsetting` SET `systemsettingname` = '$systemname'  where systemsettinguser = '$systemsettinguser'";

                $sql = "UPDATE `systemsetting` SET `systemsettingname` = '$systemname' WHERE `systemsettinguser` = '$systemsettinguser'";

                 $conn->query($sql);
    
                if ($conn->affected_rows > 0) {
                    echo json_encode(['success' => true, 'message' => 'system name updated successfully']);
                }
                else{
                    echo json_encode(['success' => false, 'message' => 'system name failed to update']);
                }
                $conn->close();
                break;

    }
}






?>