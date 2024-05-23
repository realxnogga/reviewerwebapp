

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
            $quiztype = $data['quiztype'];
            $quizdatetaken = $data['quizdatetaken'];

            $sql = "insert into quiz (quiztaker, quiztakerid, quizsubject, quizscore, quiztotalitem, quiztype, quizdatetaken) VALUES ('$quiztaker','$quiztakerid', '$quizsubject', '$quizscore', 
            '$quiztotalitem', '$quiztype', '$quizdatetaken')";

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

        case 'updateQuizUser':
            $data = json_decode($_POST['datatobeupdated'], true);
            $userID = $data['userID'];
            $user = $data['user'];

            $sql = "UPDATE `quiz` SET `quiztaker` = '$user' WHERE `quiztakerid` = '$userID'";
            $conn->query($sql);

            $conn->close();
            break;

        case 'deleteQuizData':
            $user = json_decode(file_get_contents("php://input"), true);

            $sql = "delete from quiz where quiztaker = '$user'";
            $conn->query($sql);

            $conn->close();
            break;

        case 'checkUserPerformanceExist':
            $user = json_decode(file_get_contents("php://input"), true);

            $sql = "select*from quiz where quiztaker = '$user'";
            $result = $conn->query($sql);

            if ($result->num_rows > 0) {
                echo json_encode(true);
            } else {
                echo json_encode(false);
            }

            $conn->close();
            break;

            
            case 'getUserPerformance':
                $quiztaker = json_decode($_POST['quiztaker'], true);

                $sql = "select*from quiz where quiztaker = '$quiztaker'";
                $result = $conn->query($sql);
    
                $data = [];
                while ($row = $result->fetch_assoc()) {
                    $data[] = $row;
                }


                $sql1 = "select*from user where username = '$quiztaker'";
                $result1 = $conn->query($sql1);
    
                $data1 = [];
                while ($row1 = $result1->fetch_assoc()) {
                    $data1[] = $row1;
                }       
              

                echo json_encode(['userPerformance' => $data, 'userInfo' => $data1]);
    
                $conn->close();
                break;
        

        default:

            break;
    }
}

?>