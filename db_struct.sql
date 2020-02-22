-- phpMyAdmin SQL Dump
-- version 4.8.4
-- https://www.phpmyadmin.net/
--
-- Host: bz6vytitzbg4lhpjc30i-mysql.services.clever-cloud.com:3306
-- Generation Time: Feb 22, 2020 at 07:35 PM
-- Server version: 8.0.13-3
-- PHP Version: 7.2.26

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `bz6vytitzbg4lhpjc30i`
--

-- --------------------------------------------------------

--
-- Table structure for table `rule`
--

CREATE TABLE `rule` (
  `id` int(11) NOT NULL,
  `rule` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `rule`
--

INSERT INTO `rule` (`id`, `rule`) VALUES
(1, '{pressure} < 80 or {volume} < 100'),
(2, '{temperature} > 50');

-- --------------------------------------------------------

--
-- Table structure for table `sample`
--

CREATE TABLE `sample` (
  `id` int(11) NOT NULL,
  `type` varchar(255) NOT NULL,
  `value` float NOT NULL,
  `created` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `sample`
--

INSERT INTO `sample` (`id`, `type`, `value`, `created`) VALUES
(1, 'temperature', 21.3, '2020-02-20 00:00:00'),
(2, 'pressure', 56.3, '2020-02-20 00:00:00'),
(3, 'volume', 20.1, '2020-02-20 00:00:00'),
(4, 'temperature', 21.3, '2020-02-19 00:00:00'),
(5, 'pressure', 56.3, '2020-02-19 00:00:00'),
(6, 'volume', 20.1, '2020-02-19 00:00:00'),
(8, 'volume', 51, '2020-02-21 03:00:00'),
(9, 'temperature', 53, '2020-02-21 08:00:00'),
(13, 'pressure', 22, '2020-02-21 04:00:00'),
(14, 'temperature', 56.3, '2020-02-21 09:54:24'),
(16, 'volume', 99.2, '2020-02-21 10:09:11'),
(17, 'pressure', 10, '2020-02-21 10:12:07'),
(18, 'pressure', 7.3, '2020-02-22 20:52:49'),
(19, 'pressure', 7.4, '2020-02-22 20:53:49'),
(20, 'pressure', 7.5, '2020-02-22 20:54:49'),
(21, 'pressure', 7.6, '2020-02-22 20:55:49'),
(22, 'pressure', 7.7, '2020-02-22 20:56:49'),
(23, 'pressure', 7.8, '2020-02-22 20:57:49'),
(24, 'pressure', 7.9, '2020-02-22 20:58:49'),
(25, 'pressure', 8, '2020-02-22 20:59:49'),
(26, 'pressure', 8.1, '2020-02-22 21:00:49'),
(27, 'pressure', 8.2, '2020-02-22 20:51:49'),
(28, 'pressure', 8.3, '2020-02-22 20:50:49');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `rule`
--
ALTER TABLE `rule`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `sample`
--
ALTER TABLE `sample`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `rule`
--
ALTER TABLE `rule`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `sample`
--
ALTER TABLE `sample`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=29;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
