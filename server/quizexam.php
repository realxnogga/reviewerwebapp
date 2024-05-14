

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
        case 'putquizdata':
            $data = json_decode($_POST['quizdatatemp'], true);

            $quiztaker = $data['quiztaker'];
            $quiztakerid = $data['quiztakerid'];
            $quizsubject = $data['quizsubject'];
            $quizscore = $data['quizscore'];
            $quiztotalitem = $data['quiztotalitem'];
            $quizdatetaken = $data['quizdatetaken'];

            $sql = "insert into quiz (quiztaker, quiztakerid, quizsubject, quizscore, quiztotalitem, quizdatetaken) VALUES ('$quiztaker','$quiztakerid', '$quizsubject', '$quizscore', '$quiztotalitem', '$quizdatetaken')";
            $conn->query($sql);

            if ($conn->affected_rows > 0) {
                echo json_encode(['success' => true, 'message' => 'quiz successfully inserted']);
            } else {
                echo json_encode(['success' => false, 'message' => 'quiz failed to insert']);
            }

            $conn->close();
            break;

            case 'getquizdata':
                $quiztaker = json_decode($_POST['quiztaker'], true);
    
             
    
                $sql = "select*from quiz where quiztaker = '$quiztaker'";
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

?>