-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jul 06, 2023 at 02:48 PM
-- Server version: 10.4.27-MariaDB
-- PHP Version: 8.2.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `e-com`
--

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `id` int(6) NOT NULL,
  `user_email` varchar(255) NOT NULL,
  `order_detail` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `date` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `orders`
--

INSERT INTO `orders` (`id`, `user_email`, `order_detail`, `date`) VALUES
(1, 'sunita@gmail.com', '[object Object]', '2023-07-06 18:04:56');

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `id` int(6) NOT NULL,
  `name` varchar(255) NOT NULL,
  `short_des` text NOT NULL,
  `price` text NOT NULL,
  `detail` varchar(1000) NOT NULL,
  `tags` text NOT NULL,
  `image` text NOT NULL,
  `user_email` varchar(255) NOT NULL,
  `draft` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`id`, `name`, `short_des`, `price`, `detail`, `tags`, `image`, `user_email`, `draft`) VALUES
(5, 'roof light', 'its multi roof light', '50', 'its multi roof light . use less  elctricity cost effactive . can be used for decoration', 'light decoration', '../uploads/1687885162343-w33tw.jpeg', 'sunita@gmail.com', 0),
(6, 'wall light', 'stylesh wall light', '50', 'its a wall  light . use less  elctricity cost effactive . can be used for decoration', 'light decoration wall', '../uploads/1687885456204-wsk9y.jpeg', 'sunita@gmail.com', 0);

-- --------------------------------------------------------

--
-- Table structure for table `reviews`
--

CREATE TABLE `reviews` (
  `id` int(6) NOT NULL,
  `product_id` varchar(255) NOT NULL,
  `user_email` varchar(255) NOT NULL,
  `headline` text NOT NULL,
  `review` text NOT NULL,
  `rating` tinyint(1) NOT NULL,
  `date` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `reviews`
--

INSERT INTO `reviews` (`id`, `product_id`, `user_email`, `headline`, `review`, `rating`, `date`) VALUES
(1, '5', 'sunita@gmail.com', 'asdfghjkl', 'dfghjk sdfghjkl wertyuio sdfghjkl sdfghjkl sdfghjk ertyui', 4, '2023-07-05 22:30:13');

-- --------------------------------------------------------

--
-- Table structure for table `sellers`
--

CREATE TABLE `sellers` (
  `id` int(11) NOT NULL,
  `name` text NOT NULL,
  `address` text NOT NULL,
  `about` text NOT NULL,
  `number` text NOT NULL,
  `email` varchar(255) NOT NULL,
  `date` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `sellers`
--

INSERT INTO `sellers` (`id`, `name`, `address`, `about`, `number`, `email`, `date`) VALUES
(0, 'aaaaa', 'aaaaaaa', 'aaaaaaaa', '9560912476', 'sunita@gmail.com', '2023-05-10 17:36:57');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(6) NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `number` text NOT NULL,
  `password` varchar(255) NOT NULL,
  `seller` text NOT NULL,
  `date` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `number`, `password`, `seller`, `date`) VALUES
(2, 'tushar', 'yadav@gmail.com', '9560912476', '$2b$10$d6COT6pYPFDF1Qu.w9ger.lpUvvTwhNY/vTKleN3GdnBaWE.LPqoO', 'false', '2023-05-10 00:00:00'),
(3, 'sunita', 'sunita@gmail.com', '9560912476', '$2b$10$.6xtcnb.2I/ObhsUZs1BS.nec4qeYZlBojiwayrAoAFHE3/z2E.rq', 'YES', '2023-05-10 00:00:00');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `reviews`
--
ALTER TABLE `reviews`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `id` int(6) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `id` int(6) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `reviews`
--
ALTER TABLE `reviews`
  MODIFY `id` int(6) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(6) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
