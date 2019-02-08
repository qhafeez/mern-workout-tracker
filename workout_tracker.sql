-- phpMyAdmin SQL Dump
-- version 4.8.3
-- https://www.phpmyadmin.net/
--
-- Host: localhost:8889
-- Generation Time: Feb 07, 2019 at 10:45 PM
-- Server version: 5.7.23
-- PHP Version: 7.2.8

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";

--
-- Database: `Workout_Tracker`
--

-- --------------------------------------------------------

--
-- Table structure for table `exercisesPerWorkout`
--

CREATE TABLE `exercisesPerWorkout` (
  `exerciseId` int(11) NOT NULL,
  `workoutId` int(11) NOT NULL,
  `exerciseName` varchar(255) NOT NULL,
  `weight` int(11) NOT NULL,
  `completed` tinyint(1) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `exercisesPerWorkout`
--

INSERT INTO `exercisesPerWorkout` (`exerciseId`, `workoutId`, `exerciseName`, `weight`, `completed`) VALUES
(104, 23, 'Pull Up', 120, 0),
(105, 24, 'Bicep Curl', 20, 0),
(106, 24, 'Pull Up', 12, 0),
(107, 24, 'Face Pull', 123132, 0),
(108, 24, 'Bench Press', 123, 0),
(109, 25, 'Bench Press', 987, 0),
(110, 25, 'Incline Bench Press', 12325, 0),
(111, 26, 'Bench Press', 13, 0),
(112, 27, 'Bench Press', 234, 0),
(113, 27, 'Bicep Curl', 20, 0),
(114, 27, 'Hip Thrust', 654, 0),
(115, 27, 'Bicep Curl', 55, 0),
(116, 27, 'Split Squat', 20, 0),
(117, 27, 'Tricep Extension', 85, 0),
(118, 28, 'Bench Press', 100, 0),
(119, 28, 'Squat', 200, 0),
(120, 28, 'Overhead Press', 123, 0),
(121, 28, 'Face Pull', 45, 0),
(122, 28, 'Hip Thrust', 100, 0),
(123, 28, 'Pull Up', 0, 0),
(124, 28, 'RDL', 100, 0),
(125, 28, 'Row', 65, 0),
(126, 29, 'Bench Press', 350, 0),
(127, 30, 'Bench Press', 100, 0),
(128, 30, 'Lat Pulldown', 100, 0);

-- --------------------------------------------------------

--
-- Table structure for table `sets`
--

CREATE TABLE `sets` (
  `setId` int(11) NOT NULL,
  `exerciseId` int(11) NOT NULL,
  `reps` int(11) DEFAULT NULL,
  `maxReps` int(11) NOT NULL,
  `completed` tinyint(1) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `sets`
--

INSERT INTO `sets` (`setId`, `exerciseId`, `reps`, `maxReps`, `completed`) VALUES
(268, 104, 1, 8, 0),
(269, 104, 1, 8, 0),
(270, 104, 1, 8, 0),
(271, 104, 1, 8, 0),
(272, 104, 1, 8, 0),
(273, 105, -1, 10, 0),
(274, 105, -8, 10, 0),
(275, 105, 1, 10, 0),
(276, 106, -5, 7, 0),
(277, 106, -11, 7, 0),
(278, 106, -1, 7, 0),
(279, 107, -3, 1, 0),
(280, 108, 6, 6, 0),
(281, 108, 6, 6, 0),
(282, 108, -1, 6, 0),
(283, 109, 1, 6, 0),
(284, 109, 1, 6, 0),
(285, 109, 6, 6, 0),
(286, 110, 2, 2, 0),
(287, 111, NULL, 10, 0),
(288, 111, NULL, 10, 0),
(289, 111, NULL, 10, 0),
(290, 111, 10, 10, 1),
(291, 112, 1, 1, 1),
(292, 113, 6, 8, 1),
(293, 113, 5, 8, 1),
(294, 113, 5, 8, 1),
(295, 114, 1, 1, 1),
(296, 114, 1, 1, 1),
(297, 114, 1, 1, 1),
(298, 115, 3, 5, 1),
(299, 115, 4, 5, 1),
(300, 115, 3, 5, 1),
(301, 115, 4, 5, 1),
(302, 115, 3, 5, 1),
(303, 116, 9, 10, 1),
(304, 116, 10, 10, 1),
(305, 116, 6, 10, 1),
(306, 117, 3, 3, 1),
(307, 117, 3, 3, 1),
(308, 117, 3, 3, 1),
(309, 117, 3, 3, 1),
(310, 117, 1, 3, 1),
(311, 118, 9, 12, 1),
(312, 118, 6, 12, 1),
(313, 119, 4, 4, 1),
(314, 119, 4, 4, 1),
(315, 119, 4, 4, 1),
(316, 120, 7, 7, 1),
(317, 120, 5, 7, 1),
(318, 120, 4, 7, 1),
(319, 120, 6, 7, 1),
(320, 121, 3, 3, 1),
(321, 121, 3, 3, 1),
(322, 121, 3, 3, 1),
(323, 122, 4, 4, 1),
(324, 122, 4, 4, 1),
(325, 123, 3, 3, 1),
(326, 123, 3, 3, 1),
(327, 123, 2, 3, 1),
(328, 123, 1, 3, 1),
(329, 124, 1, 1, 1),
(330, 124, 1, 1, 1),
(331, 124, 1, 1, 1),
(332, 125, 3, 3, 1),
(333, 125, 3, 3, 1),
(334, 126, 3, 3, 1),
(335, 126, 3, 3, 1),
(336, 126, 3, 3, 1),
(337, 127, 6, 6, 1),
(338, 127, 5, 6, 1),
(339, 127, 5, 6, 1),
(340, 128, 10, 11, 1),
(341, 128, 10, 11, 1);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `userId` int(11) NOT NULL,
  `displayName` varchar(255) NOT NULL,
  `googleId` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`userId`, `displayName`, `googleId`) VALUES
(1, 'qasim', 'pollos'),
(2, 'rick', 'pollos'),
(3, 'Bhagwan Q', '109191263766951550764');

-- --------------------------------------------------------

--
-- Table structure for table `workouts`
--

CREATE TABLE `workouts` (
  `workoutId` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  `workoutDate` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `notes` varchar(10000) DEFAULT NULL,
  `completed` tinyint(1) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `workouts`
--

INSERT INTO `workouts` (`workoutId`, `userId`, `workoutDate`, `notes`, `completed`) VALUES
(1, 1, '2018-10-04 19:34:30', NULL, 1),
(23, 3, '2019-01-18 18:07:13', NULL, 1),
(24, 3, '2019-01-18 18:26:39', NULL, 1),
(25, 3, '2019-01-18 20:12:55', NULL, 1),
(26, 3, '2019-01-18 20:33:49', NULL, 1),
(27, 3, '2019-01-18 20:39:07', 'asdf;alfjas;lfksajflsdfja;lsd;klj/. fdlk;asfsaf;lsafjsal;k.  sdlfkjas;f\n\n\ndfjklasfjlk;sa\n\n\nsdfjklasjf;lkas\n\njaskldfj;sadfj;\n\nsjadkfljas;lkdfj', 1),
(28, 3, '2019-01-31 02:52:18', NULL, 1),
(29, 3, '2019-01-31 03:34:03', 'Set was easy, move up in weight next time.', 1),
(30, 3, '2019-02-04 19:13:02', 'Easy, up the weight next time.', 1);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `exercisesPerWorkout`
--
ALTER TABLE `exercisesPerWorkout`
  ADD PRIMARY KEY (`exerciseId`),
  ADD KEY `workoutId` (`workoutId`);

--
-- Indexes for table `sets`
--
ALTER TABLE `sets`
  ADD PRIMARY KEY (`setId`),
  ADD KEY `exerciseId` (`exerciseId`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`userId`);

--
-- Indexes for table `workouts`
--
ALTER TABLE `workouts`
  ADD PRIMARY KEY (`workoutId`),
  ADD KEY `userId` (`userId`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `exercisesPerWorkout`
--
ALTER TABLE `exercisesPerWorkout`
  MODIFY `exerciseId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=129;

--
-- AUTO_INCREMENT for table `sets`
--
ALTER TABLE `sets`
  MODIFY `setId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=342;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `userId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `workouts`
--
ALTER TABLE `workouts`
  MODIFY `workoutId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `exercisesPerWorkout`
--
ALTER TABLE `exercisesPerWorkout`
  ADD CONSTRAINT `exercisesperworkout_ibfk_1` FOREIGN KEY (`workoutId`) REFERENCES `workouts` (`workoutId`) ON DELETE CASCADE;

--
-- Constraints for table `sets`
--
ALTER TABLE `sets`
  ADD CONSTRAINT `sets_ibfk_1` FOREIGN KEY (`exerciseId`) REFERENCES `exercisesPerWorkout` (`exerciseId`) ON DELETE CASCADE;

--
-- Constraints for table `workouts`
--
ALTER TABLE `workouts`
  ADD CONSTRAINT `workouts_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`userId`) ON DELETE CASCADE;
