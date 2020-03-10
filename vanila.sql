-- phpMyAdmin SQL Dump
-- version 4.9.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Mar 10, 2020 at 02:55 AM
-- Server version: 10.4.8-MariaDB
-- PHP Version: 7.3.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `vanila`
--

-- --------------------------------------------------------

--
-- Table structure for table `admin`
--

CREATE TABLE `admin` (
  `id` int(11) NOT NULL,
  `aname` varchar(255) NOT NULL,
  `apass` varchar(255) NOT NULL,
  `aemail` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `admin`
--

INSERT INTO `admin` (`id`, `aname`, `apass`, `aemail`) VALUES
(1, 'Amzad Hossain Jacky', '1', 'jacky@gmail.com'),
(2, 'Fariha Jahan Rainy', '1', 'rainy@gmail.com');

-- --------------------------------------------------------

--
-- Table structure for table `choosecourse`
--

CREATE TABLE `choosecourse` (
  `ccid` int(11) NOT NULL,
  `ctype` varchar(255) NOT NULL,
  `batch` varchar(255) NOT NULL,
  `payment` varchar(255) NOT NULL,
  `pstatus` varchar(255) NOT NULL,
  `classday` varchar(255) NOT NULL,
  `classtime` time NOT NULL,
  `date` date NOT NULL,
  `userid` int(11) NOT NULL,
  `courseid` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `choosecourse`
--

INSERT INTO `choosecourse` (`ccid`, `ctype`, `batch`, `payment`, `pstatus`, `classday`, `classtime`, `date`, `userid`, `courseid`) VALUES
(2, 'Model Test', 'SSC', '3000', 'yes', 'Sunday & Tuesday\r\n', '13:59:00', '2020-03-07', 1, 1),
(3, 'Regular', 'HSC', '2500', 'yes', 'Monday & Wednesday', '13:59:00', '2020-03-07', 2, 9);

-- --------------------------------------------------------

--
-- Table structure for table `courses`
--

CREATE TABLE `courses` (
  `cid` int(11) NOT NULL,
  `ctype` varchar(255) NOT NULL,
  `batch` varchar(255) NOT NULL,
  `date` date NOT NULL,
  `fees` int(11) NOT NULL,
  `classtime` time NOT NULL,
  `classday` varchar(255) NOT NULL,
  `status` varchar(255) NOT NULL,
  `adminid` int(11) NOT NULL,
  `teacherid` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `courses`
--

INSERT INTO `courses` (`cid`, `ctype`, `batch`, `date`, `fees`, `classtime`, `classday`, `status`, `adminid`, `teacherid`) VALUES
(1, 'Model Test', 'SSC', '2020-03-02', 2000, '13:59:00', 'Sunday & Tuesday', 'yes', 1, 0),
(2, 'Model Test', 'SSC', '2020-03-02', 2000, '13:59:00', 'Sunday & Tuesday', 'yes', 1, 0),
(9, 'Model Test', 'SSC', '2020-03-07', 2200, '13:59:00', 'Sunday & Tuesday', 'yes', 1, 0);

-- --------------------------------------------------------

--
-- Table structure for table `notes`
--

CREATE TABLE `notes` (
  `nid` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `file` varchar(1000) NOT NULL,
  `courseid` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `notes`
--

INSERT INTO `notes` (`nid`, `title`, `file`, `courseid`) VALUES
(1, 'First post', '1583564327356quotes.jpg', 1),
(2, 'asynchronous', '1583564562551Async & Performance.pdf', 2),
(3, 'Third post', '1583564775842nodeinfo.txt', 9);

-- --------------------------------------------------------

--
-- Table structure for table `notice`
--

CREATE TABLE `notice` (
  `noticeid` int(11) NOT NULL,
  `topic` varchar(255) NOT NULL,
  `details` varchar(1000) NOT NULL,
  `date` date NOT NULL,
  `adminid` int(11) NOT NULL,
  `teacherid` int(11) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `notice`
--

INSERT INTO `notice` (`noticeid`, `topic`, `details`, `date`, `adminid`, `teacherid`) VALUES
(6, 'class cancel', 'sickness', '2020-03-06', 1, 0),
(7, 'class cancel', 'class cancel for sickness', '2020-03-07', 2, 0);

-- --------------------------------------------------------

--
-- Table structure for table `results`
--

CREATE TABLE `results` (
  `rid` int(11) NOT NULL,
  `examname` varchar(255) NOT NULL,
  `examtype` varchar(255) NOT NULL,
  `marks` int(11) NOT NULL,
  `stdid` int(11) NOT NULL,
  `courseid` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `results`
--

INSERT INTO `results` (`rid`, `examname`, `examtype`, `marks`, `stdid`, `courseid`) VALUES
(1, 'Quiz 1', 'Quiz', 20, 2, 9);

-- --------------------------------------------------------

--
-- Table structure for table `salary`
--

CREATE TABLE `salary` (
  `salaryid` int(11) NOT NULL,
  `amount` int(11) NOT NULL,
  `teacherid` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `salary`
--

INSERT INTO `salary` (`salaryid`, `amount`, `teacherid`) VALUES
(12, 22000, 1);

-- --------------------------------------------------------

--
-- Table structure for table `studentreg`
--

CREATE TABLE `studentreg` (
  `sid` int(11) NOT NULL,
  `sname` varchar(255) NOT NULL,
  `sinstitution` varchar(255) NOT NULL,
  `semail` varchar(255) NOT NULL,
  `spass` varchar(255) NOT NULL,
  `sphone` int(11) NOT NULL,
  `spname` varchar(255) NOT NULL,
  `spphone` int(11) NOT NULL,
  `spemail` varchar(255) NOT NULL,
  `status` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `studentreg`
--

INSERT INTO `studentreg` (`sid`, `sname`, `sinstitution`, `semail`, `spass`, `sphone`, `spname`, `spphone`, `spemail`, `status`) VALUES
(1, 'Khalid Hasan', 'G.Lab', 'Khalid@gmail.com', '123', 1720089567, 'Kamal Hossain', 1684069494, 'kamal@gmail.com', 'no'),
(2, 'Malek Hasan', 'M.Lab', 'malek@gmail.com', '1234', 1720089599, 'Maleha Chowdhury', 1729924666, 'maleha@gmail.com', 'yes'),
(3, 'Fariha Jahan Rainy', 'S.Lab', 'rainy@gmail.com', '123', 1720089567, 'Rokeya Begum', 1720089509, 'rokeya@gmail.com', 'no');

-- --------------------------------------------------------

--
-- Table structure for table `teacherreg`
--

CREATE TABLE `teacherreg` (
  `tid` int(11) NOT NULL,
  `tname` varchar(255) NOT NULL,
  `temail` varchar(255) NOT NULL,
  `tpass` varchar(255) NOT NULL,
  `tphone` int(11) NOT NULL,
  `tqualification` varchar(1000) NOT NULL,
  `status` varchar(255) NOT NULL,
  `salarystatus` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `teacherreg`
--

INSERT INTO `teacherreg` (`tid`, `tname`, `temail`, `tpass`, `tphone`, `tqualification`, `status`, `salarystatus`) VALUES
(1, 'Jahid hasan', 'jahid@gmail.com', '123', 176829978, 'Bsc. in Software Engineering', 'no', 'yes'),
(3, 'kamal Hossain', 'kamal@gmail.com', '123', 176829978, 'Bsc in software engineering', 'no', 'no'),
(4, 'Shafiq ahsan', 'ahsan@gmail.com', '12345', 176829970, '  Bsc in Engineering', 'yes', 'no'),
(6, 'Tuser Rahman', 'tusar@gmail.com', '123', 176829098, '    Bsc in civil software engineering', '', 'no');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admin`
--
ALTER TABLE `admin`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `choosecourse`
--
ALTER TABLE `choosecourse`
  ADD PRIMARY KEY (`ccid`),
  ADD KEY `userid` (`userid`),
  ADD KEY `courseid` (`courseid`);

--
-- Indexes for table `courses`
--
ALTER TABLE `courses`
  ADD PRIMARY KEY (`cid`),
  ADD KEY `adminid` (`adminid`);

--
-- Indexes for table `notes`
--
ALTER TABLE `notes`
  ADD PRIMARY KEY (`nid`),
  ADD KEY `courseid` (`courseid`);

--
-- Indexes for table `notice`
--
ALTER TABLE `notice`
  ADD PRIMARY KEY (`noticeid`),
  ADD KEY `adminid` (`adminid`);

--
-- Indexes for table `results`
--
ALTER TABLE `results`
  ADD PRIMARY KEY (`rid`);

--
-- Indexes for table `salary`
--
ALTER TABLE `salary`
  ADD PRIMARY KEY (`salaryid`),
  ADD KEY `salary_ibfk_1` (`teacherid`);

--
-- Indexes for table `studentreg`
--
ALTER TABLE `studentreg`
  ADD PRIMARY KEY (`sid`);

--
-- Indexes for table `teacherreg`
--
ALTER TABLE `teacherreg`
  ADD PRIMARY KEY (`tid`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `admin`
--
ALTER TABLE `admin`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `choosecourse`
--
ALTER TABLE `choosecourse`
  MODIFY `ccid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `courses`
--
ALTER TABLE `courses`
  MODIFY `cid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `notes`
--
ALTER TABLE `notes`
  MODIFY `nid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `notice`
--
ALTER TABLE `notice`
  MODIFY `noticeid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `results`
--
ALTER TABLE `results`
  MODIFY `rid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `salary`
--
ALTER TABLE `salary`
  MODIFY `salaryid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `studentreg`
--
ALTER TABLE `studentreg`
  MODIFY `sid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `teacherreg`
--
ALTER TABLE `teacherreg`
  MODIFY `tid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `choosecourse`
--
ALTER TABLE `choosecourse`
  ADD CONSTRAINT `choosecourse_ibfk_1` FOREIGN KEY (`userid`) REFERENCES `studentreg` (`sid`),
  ADD CONSTRAINT `choosecourse_ibfk_2` FOREIGN KEY (`courseid`) REFERENCES `courses` (`cid`);

--
-- Constraints for table `courses`
--
ALTER TABLE `courses`
  ADD CONSTRAINT `courses_ibfk_1` FOREIGN KEY (`adminid`) REFERENCES `admin` (`id`);

--
-- Constraints for table `notes`
--
ALTER TABLE `notes`
  ADD CONSTRAINT `notes_ibfk_1` FOREIGN KEY (`courseid`) REFERENCES `courses` (`cid`);

--
-- Constraints for table `notice`
--
ALTER TABLE `notice`
  ADD CONSTRAINT `notice_ibfk_1` FOREIGN KEY (`adminid`) REFERENCES `admin` (`id`);

--
-- Constraints for table `salary`
--
ALTER TABLE `salary`
  ADD CONSTRAINT `salary_ibfk_1` FOREIGN KEY (`teacherid`) REFERENCES `teacherreg` (`tid`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
