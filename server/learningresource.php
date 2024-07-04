
<?php

require_once "connection/connection.php";

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

if (isset($_GET['action'])) {
    $action = $_GET['action'];

    switch ($action) {
        case 'putLearningResourceData':

            $data = json_decode($_POST['credential'], true);
            $subject = $data['subject'];
            $type = $data['type'];
            $title = $data['title'];

            $file = $_FILES['imagecredential'];
            $resourceImageName = $file['name'];

            $pathInfo = pathinfo($resourceImageName);

            $filename = $pathInfo['filename']; // name of the image
            $extension = $pathInfo['extension']; // jpg, png etc
            $timestamp = date("YmdHis");

            $uniqueResourceImageName = $filename . "_" . $timestamp . "." . $extension;

            $sql = "insert into learningresources (filesubject, filetype, filetitle, actualfile) VALUES ('$subject', '$type', '$title', '$uniqueResourceImageName')";

            $conn->query($sql);

            if ($conn->affected_rows > 0) {
                $resourceDataActualFileTMP = $file['tmp_name'];
                $resourceDataActualFileDestination = '../public/asset/learningresources/' . $uniqueResourceImageName;

                move_uploaded_file($resourceDataActualFileTMP, $resourceDataActualFileDestination);

                echo json_encode(true);
            } else {
                echo json_encode(false);
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