
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
        case 'putLearningResourceData':

            $data = json_decode($_POST['resourceDataTemp'], true);
            $subject = $data['subject'];
            $type = $data['type'];
            $title = $data['title'];
            $file = $_FILES['resourceDataActualFile'];

            $resourceDataActualFileName = $file['name'];
            $sql = "insert into learningresources (filesubject, filetype, filetitle, actualfile) VALUES ('$subject', '$type', '$title', '$resourceDataActualFileName')";

            $conn->query($sql);

            if ($conn->affected_rows > 0) {
                $resourceDataActualFileTMP = $file['tmp_name'];
                $resourceDataActualFileDestination = '../public/asset/learningresources/' . $resourceDataActualFileName;

                move_uploaded_file($resourceDataActualFileTMP, $resourceDataActualFileDestination);

                echo json_encode(['success' => true, 'message' => 'Learning resource successfully inserted']);
            } else {
                echo json_encode(['success' => false, 'message' => 'Learning resource failed to insert']);
            }

            $conn->close();
            break;

        case 'getLearningResourceData':

            $sql = "select*from learningresources";
            $result = $conn->query($sql);

            $data = [];
            while ($row = $result->fetch_assoc()) {
                $data[] = $row;
            }
            header('Content-Type: application/json');
            echo json_encode($data);

            $conn->close();
            break;
        
            case 'getLearningResourceCount':

                $sql = "SELECT COUNT(*) as total_rows FROM learningresources";
                $result = $conn->query($sql);
                
                if ($result && $result->num_rows > 0) {
                    $row = $result->fetch_assoc();
                    $data = $row['total_rows'];
                    echo json_encode($data);
                }
                $conn->close();
                break;
            
    }
}






?>