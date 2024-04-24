

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

            $userID = $data['userID'];
            $noteUser = $data['noteuser'];
            $noteSubject = $data['noteSubject'];
            $noteTitle = $data['noteTitle'];
            $actualnote = $data['note'];
            $noteDate = $data['notedate'];


            $sql = "insert into note (userID, usernote, notesubject, notetitle, actualnote, notedate) VALUES ('$userID','$noteUser', '$noteSubject', '$noteTitle', '$actualnote', '$noteDate')";

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


        case 'updateNoteUser':

            $data = json_decode($_POST['datatobeupdated'], true);
            $userID = $data['userID'];
            $user = $data['user'];

            $sql = "UPDATE `note` SET `usernote` = '$user' WHERE `userID` = '$userID'";
            $conn->query($sql);


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

        case 'insertFlashcardData':
            $data = json_decode($_POST['flashcardDataTemp'], true);
            $userID = $data['userID'];
            $flashcardUser = $data['flashcardUser'];
            $flashcardSubject = $data['flashcardSubject'];
            $flashcardTitle = $data['flashcardTitle'];


            $sql = "insert into flashcard (userID, flashcarduser, flashcardsubject, flashcardtitle) VALUES ('$userID', '$flashcardUser', '$flashcardSubject', '$flashcardTitle')";

            $conn->query($sql);

            if ($conn->affected_rows > 0) {
                echo json_encode(['success' => true, 'message' => 'All Note successfully deleted']);
            } else {
                echo json_encode(['success' => false, 'message' => 'All Note failed to delete']);
            }

            $conn->close();
            break;

        case 'getFlashcardData':
            $flashcarduser = json_decode(file_get_contents("php://input"), true);

            $sql = "select*from flashcard where flashcarduser = '$flashcarduser'";

            $result = $conn->query($sql);

            $data = [];
            while ($row = $result->fetch_assoc()) {
                $data[] = $row;
            }
            header('Content-Type: application/json');
            echo json_encode($data);

            $conn->close();
            break;

        case 'insertFlashcardItemData':

            $data = json_decode($_POST['flashcardItemTemp'], true);

            $userID = $data['userID'];
            $flashcardItemID = $data['flashcardItemID'];
            $flashcardItemUser = $data['flashcardItemUser'];
            $flashcardItemFront = $data['flashcardItemFront'];
            $flashcardItemBack = $data['flashcardItemBack'];


            $sql = "insert into flashcarditem  (flashcarditemID, userID, flashcarditemuser, flashcarditemfront, flashcarditemback) VALUES ('$flashcardItemID', '$userID', '$flashcardItemUser', '$flashcardItemFront', '$flashcardItemBack')";

            $conn->query($sql);

            if ($conn->affected_rows > 0) {
                echo json_encode(['success' => true, 'message' => 'All Note successfully deleted']);
            } else {
                echo json_encode(['success' => false, 'message' => 'All Note failed to delete']);
            }

            $conn->close();
            break;

        case 'getFlashcardItemData':

            $flashcardID = json_decode(file_get_contents("php://input"), true);

            $sql = "select*from flashcarditem where flashcarditemID = '$flashcardID'";

            $result = $conn->query($sql);

            $data = [];
            while ($row = $result->fetch_assoc()) {
                $data[] = $row;
            }
            header('Content-Type: application/json');
            echo json_encode($data);

            $conn->close();
            break;




        case 'updateFlashcardUser':
            $data = json_decode($_POST['datatobeupdated'], true);
            $userID = $data['userID'];
            $user = $data['user'];

            $sql = "UPDATE `flashcard` SET `flashcarduser` = '$user' WHERE `userID` = '$userID'";

            $conn->query($sql);

            $conn->close();
            break;


        case 'updateFlashcardItemUser':
            $data = json_decode($_POST['datatobeupdated'], true);
            $userID = $data['userID'];
            $user = $data['user'];


            $sql = "UPDATE `flashcarditem` SET `flashcarditemuser` = '$user' WHERE `userID` = '$userID'";
            $conn->query($sql);

            $conn->close();
            break;


        case 'deleteFlashcardItemData':

            $flashcardID = json_decode(file_get_contents("php://input"), true);

            $sql = "delete from flashcard where flashcardID = '$flashcardID'";

            $conn->query($sql);

            if ($conn->affected_rows > 0) {
                echo json_encode(['success' => true, 'message' => 'All Note successfully deleted']);
            } else {
                echo json_encode(['success' => false, 'message' => 'All Note failed to delete']);
            }

            $conn->close();
            break;


        case 'deleteFlashcardItemById':

            $flashcarditemID = json_decode(file_get_contents("php://input"), true);

            $sql = "delete from flashcarditem where flashcarditemID = '$flashcarditemID'";

            $conn->query($sql);

            if ($conn->affected_rows > 0) {
                echo json_encode(['success' => true, 'message' => 'All Note successfully deleted']);
            } else {
                echo json_encode(['success' => false, 'message' => 'All Note failed to delete']);
            }

            $conn->close();
            break;


        case 'deleteAllFlashcardItem':

            $flashcarditemuser = json_decode(file_get_contents("php://input"), true);

            $sql = "delete from flashcarditem where flashcarditemuser = '$flashcarditemuser'";

            $conn->query($sql);

            if ($conn->affected_rows > 0) {
                echo json_encode(['success' => true, 'message' => 'All Note successfully deleted']);
            } else {
                echo json_encode(['success' => false, 'message' => 'All Note failed to delete']);
            }

            $conn->close();
            break;

        case 'deleteAllFlashcardData':

            $flashcarduser = json_decode(file_get_contents("php://input"), true);

            $sql = "delete from flashcard where flashcarduser = '$flashcarduser'";

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