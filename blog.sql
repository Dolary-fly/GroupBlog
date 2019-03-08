-- phpMyAdmin SQL Dump
-- version 4.7.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: 2018-08-06 05:33:01
-- 服务器版本： 5.7.19
-- PHP Version: 5.6.31

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `blog`
--

-- --------------------------------------------------------

--
-- 表的结构 `blogmsg`
--

DROP TABLE IF EXISTS `blogmsg`;
CREATE TABLE IF NOT EXISTS `blogmsg` (
  `title` varchar(60) NOT NULL,
  `author` varchar(20) NOT NULL,
  `date` date NOT NULL,
  `class` varchar(10) NOT NULL,
  `favor` int(11) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- 转存表中的数据 `blogmsg`
--

INSERT INTO `blogmsg` (`title`, `author`, `date`, `class`, `favor`) VALUES
('ES6中的let命令', 'new', '2018-08-06', 'web', 1),
('CSS3中的transform和transition', 'new', '2018-08-06', 'web', 0),
('ES6中的let命令', 'new2', '2018-08-03', 'web', 0),
('jQuery中的动画积累问题', 'new2', '2018-08-03', 'web', 0),
('Live2D-lao-po-的web页面实现', 'new3', '2018-05-03', '安全', 0),
('当display-flex遇到margin-10', 'new3', '2018-05-03', '安全', 0),
('简单的用fs模块遍历文件夹', 'new3', '2018-05-03', '安全', 0),
('如何搭建一只博客看板娘', 'new2', '2018-08-03', '安全', 0),
('CSS3动画库Animate-css', 'new', '2018-08-06', 'web', 0);

-- --------------------------------------------------------

--
-- 表的结构 `invitationcode`
--

DROP TABLE IF EXISTS `invitationcode`;
CREATE TABLE IF NOT EXISTS `invitationcode` (
  `groupis` char(5) NOT NULL,
  `invicode` char(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- 转存表中的数据 `invitationcode`
--

INSERT INTO `invitationcode` (`groupis`, `invicode`) VALUES
('前端组', 'efty562fr3'),
('安全组', 'e356hgs2tm'),
('网络组', 'bg25gq4ht8'),
('设计组', 'm64kl2ad6j'),
('运营组', 'cd5ha26kiq');

-- --------------------------------------------------------

--
-- 表的结构 `new`
--

DROP TABLE IF EXISTS `new`;
CREATE TABLE IF NOT EXISTS `new` (
  `likeblog` varchar(255) DEFAULT NULL,
  `user` varchar(255) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- 转存表中的数据 `new`
--

INSERT INTO `new` (`likeblog`, `user`) VALUES
('ES6中的let命令', 'unknow');

-- --------------------------------------------------------

--
-- 表的结构 `new2`
--

DROP TABLE IF EXISTS `new2`;
CREATE TABLE IF NOT EXISTS `new2` (
  `likeblog` varchar(255) DEFAULT NULL,
  `user` varchar(255) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- 表的结构 `new3`
--

DROP TABLE IF EXISTS `new3`;
CREATE TABLE IF NOT EXISTS `new3` (
  `likeblog` varchar(255) DEFAULT NULL,
  `user` varchar(255) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- 表的结构 `user`
--

DROP TABLE IF EXISTS `user`;
CREATE TABLE IF NOT EXISTS `user` (
  `username` varchar(255) NOT NULL,
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `password` varchar(255) NOT NULL,
  `invicode` char(10) NOT NULL,
  `headportrait` varchar(255) NOT NULL DEFAULT 'images/headportrait.jpg' COMMENT '头像',
  `groupis` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8;

--
-- 转存表中的数据 `user`
--

INSERT INTO `user` (`username`, `id`, `password`, `invicode`, `headportrait`, `groupis`) VALUES
('dangying', 18, 'd77f1151ba237b36f1ba6a1cb83c6865', 'efty562fr3', 'images/headportrait.jpg', '前端组'),
('origin', 19, 'd77f1151ba237b36f1ba6a1cb83c6865', 'efty562fr3', 'images/headportrait.jpg', '前端组'),
('123456', 20, 'f062662c288005552dc18dce406a8640', 'efty562fr3', 'images/headportrait.jpg', '前端组'),
('new', 25, '12345678', '66666', 'images/headportrait.jpg', 'web');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
