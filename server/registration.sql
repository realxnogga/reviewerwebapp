-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 10, 2024 at 06:53 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `registration`
--

-- --------------------------------------------------------

--
-- Table structure for table `learningresources`
--

CREATE TABLE `learningresources` (
  `fileID` int(11) NOT NULL,
  `filesubject` text NOT NULL,
  `filetype` text NOT NULL,
  `filetitle` varchar(225) NOT NULL,
  `actualfile` varchar(225) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `learningresources`
--

INSERT INTO `learningresources` (`fileID`, `filesubject`, `filetype`, `filetitle`, `actualfile`) VALUES
(1, 'english', 'pdf', 'vid1', '2024-04-10 12 23 51.mp4'),
(2, 'mathematics', 'pdf', 'pdf', 'Larios_Engaging-Activity-2-ITEP-311.docx.pdf'),
(3, 'communicationskills', 'pdf', 'photo', 'write_improve_logo.jpg'),
(4, 'english', 'pdf', 'wawa', 'fb_image3.jpg'),
(7, 'filipino', 'image', 'photo123', 'fb_image3.jpg'),
(8, 'english', 'image', 'myphoto', 'fb_image2.jpg');

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `ID` int(11) NOT NULL,
  `username` varchar(225) NOT NULL,
  `password` varchar(225) NOT NULL,
  `email` varchar(225) NOT NULL,
  `userimage` varchar(225) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`ID`, `username`, `password`, `email`, `userimage`) VALUES
(19, 'sugar ray leonard', 'sugar123', 'warren@gmail.com', 'fb_image2.jpg'),
(20, 'nigga', 'nigga123', 'nigga@gmail.com', 'fb_image6.jpg');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `learningresources`
--
ALTER TABLE `learningresources`
  ADD PRIMARY KEY (`fileID`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`ID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `learningresources`
--
ALTER TABLE `learningresources`
  MODIFY `fileID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
