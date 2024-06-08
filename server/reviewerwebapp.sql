-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 08, 2024 at 01:05 PM
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
-- Database: `reviewerwebapp`
--

-- --------------------------------------------------------

--
-- Table structure for table `flashcard`
--

CREATE TABLE `flashcard` (
  `flashcardID` int(11) NOT NULL,
  `userID` int(11) NOT NULL,
  `flashcarduser` varchar(225) NOT NULL,
  `flashcardsubject` text NOT NULL,
  `flashcardtitle` varchar(225) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `flashcarditem`
--

CREATE TABLE `flashcarditem` (
  `flashcarditemmainID` int(11) NOT NULL,
  `flashcarditemID` int(11) NOT NULL,
  `userID` int(11) NOT NULL,
  `flashcarditemuser` varchar(225) NOT NULL,
  `flashcarditemfront` varchar(225) NOT NULL,
  `flashcarditemback` varchar(225) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

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
(18, 'filipino', 'image', 'Coke', 'drink.jpg');

-- --------------------------------------------------------

--
-- Table structure for table `note`
--

CREATE TABLE `note` (
  `noteID` int(11) NOT NULL,
  `userID` int(11) NOT NULL,
  `usernote` varchar(225) NOT NULL,
  `notesubject` text NOT NULL,
  `notetitle` varchar(225) NOT NULL,
  `actualnote` varchar(225) NOT NULL,
  `notedate` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `quiz`
--

CREATE TABLE `quiz` (
  `quizID` int(11) NOT NULL,
  `quiztaker` varchar(225) NOT NULL,
  `quiztakerid` int(11) NOT NULL,
  `quizsubject` text NOT NULL,
  `quizscore` int(11) NOT NULL,
  `quiztotalitem` int(11) NOT NULL,
  `quiztype` text NOT NULL,
  `quizdatetaken` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `systemsetting`
--

CREATE TABLE `systemsetting` (
  `systemsettingID` int(11) NOT NULL,
  `systemsettinguserID` int(11) NOT NULL,
  `systemsettinguser` varchar(225) NOT NULL,
  `systemsettingname` varchar(225) NOT NULL DEFAULT 'Reviewer App'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `systemsetting`
--

INSERT INTO `systemsetting` (`systemsettingID`, `systemsettinguserID`, `systemsettinguser`, `systemsettingname`) VALUES
(1, 1, 'warren', 'Reviewer App');

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
(1, 'warren', 'warren123', 'warren@gmail.com', 'drink.jpg_20240608125822');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `flashcard`
--
ALTER TABLE `flashcard`
  ADD PRIMARY KEY (`flashcardID`);

--
-- Indexes for table `flashcarditem`
--
ALTER TABLE `flashcarditem`
  ADD PRIMARY KEY (`flashcarditemmainID`);

--
-- Indexes for table `learningresources`
--
ALTER TABLE `learningresources`
  ADD PRIMARY KEY (`fileID`);

--
-- Indexes for table `note`
--
ALTER TABLE `note`
  ADD PRIMARY KEY (`noteID`);

--
-- Indexes for table `quiz`
--
ALTER TABLE `quiz`
  ADD PRIMARY KEY (`quizID`);

--
-- Indexes for table `systemsetting`
--
ALTER TABLE `systemsetting`
  ADD PRIMARY KEY (`systemsettingID`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`ID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `flashcard`
--
ALTER TABLE `flashcard`
  MODIFY `flashcardID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `flashcarditem`
--
ALTER TABLE `flashcarditem`
  MODIFY `flashcarditemmainID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `learningresources`
--
ALTER TABLE `learningresources`
  MODIFY `fileID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT for table `note`
--
ALTER TABLE `note`
  MODIFY `noteID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `quiz`
--
ALTER TABLE `quiz`
  MODIFY `quizID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `systemsetting`
--
ALTER TABLE `systemsetting`
  MODIFY `systemsettingID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
