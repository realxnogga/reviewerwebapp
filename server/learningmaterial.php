

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
        case 'putNoteData':

            $data = json_decode($_POST['noteDataTemp'], true);
            $noteUser = $data['noteuser'];
            $noteSubject = $data['noteSubject'];
            $noteTitle = $data['noteTitle'];
            $actualnote = $data['note'];
            $noteDate = $data['notedate'];


            $sql = "insert into note (usernote, notesubject, notetitle, actualnote, notedate) VALUES ('$noteUser', '$noteSubject', '$noteTitle', '$actualnote', '$noteDate')";

            $conn->query($sql);

            if ($conn->affected_rows > 0) {
                echo json_encode(['success' => true, 'message' => 'Note successfully inserted']);
            } else {
                echo json_encode(['success' => false, 'message' => 'Note failed to insert']);
            }


            $conn->close();
            break;

        case 'getNoteData':

            $username = json_decode(file_get_contents("php://input"), true);


            $sql = "select*from note where usernote = '$username'";
            $result = $conn->query($sql);

            $data = [];
            while ($row = $result->fetch_assoc()) {
                $data[] = $row;
            }
            header('Content-Type: application/json');
            echo json_encode($data);

            $conn->close();
            break;

        case 'deleteNoteData':
            $noteID = json_decode(file_get_contents("php://input"), true);

            $sql = "delete from note where noteID = '$noteID'";
            $conn->query($sql);

            if ($conn->affected_rows > 0) {
                echo json_encode(['success' => true, 'message' => 'Note successfully deleted']);
            } else {
                echo json_encode(['success' => false, 'message' => 'Note failed to delete']);
            }

            $conn->close();
            break;

        case 'deleteAllNoteData':
            $noteUser = json_decode(file_get_contents("php://input"), true);

            $sql = "delete from note where usernote = '$noteUser'";
            $conn->query($sql);

            if ($conn->affected_rows > 0) {
                echo json_encode(['success' => true, 'message' => 'All Note successfully deleted']);
            } else {
                echo json_encode(['success' => false, 'message' => 'All Note failed to delete']);
            }

            $conn->close();
            break;
    }
}






?>