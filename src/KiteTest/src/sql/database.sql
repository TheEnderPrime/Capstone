-- phpMyAdmin SQL Dump
-- version 2.11.9.4
-- http://www.phpmyadmin.net
--
-- Host: oniddb
-- Generation Time: Jun 12, 2018 at 03:27 PM
-- Server version: 5.5.58
-- PHP Version: 5.2.6-1+lenny16

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";

--
-- Database: `kokeshs-db`
--

-- --------------------------------------------------------

--
-- Table structure for table `Communities`
--

CREATE TABLE IF NOT EXISTS `Communities` (
  `CommunityId` int(11) NOT NULL AUTO_INCREMENT,
  `Title` varchar(128) NOT NULL,
  `AboutUs` varchar(2000) DEFAULT NULL,
  `ProfilePicture` varchar(256) DEFAULT NULL,
  `AdminId` int(11) NOT NULL,
  `DateAdded` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`CommunityId`),
  KEY `UserCommunitiesFK` (`AdminId`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=15 ;

-- --------------------------------------------------------

--
-- Table structure for table `CommunityModerators`
--

CREATE TABLE IF NOT EXISTS `CommunityModerators` (
  `CommunityModeratorsId` int(11) NOT NULL,
  `CommunityId` int(11) NOT NULL,
  `UserId` int(11) NOT NULL,
  PRIMARY KEY (`CommunityModeratorsId`),
  KEY `UsersFK` (`UserId`),
  KEY `CommunityFK` (`CommunityId`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `CommunityModerators`
--


-- --------------------------------------------------------

--
-- Table structure for table `CommunityPrivacy`
--

CREATE TABLE IF NOT EXISTS `CommunityPrivacy` (
  `CommunityId` int(11) NOT NULL,
  `PrivacySetting` tinyint(1) DEFAULT '0',
  `PrivacySetting2` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`CommunityId`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `CommunityPrivacy`
--


-- --------------------------------------------------------

--
-- Table structure for table `CommunityUsers`
--

CREATE TABLE IF NOT EXISTS `CommunityUsers` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `UsersId` int(11) NOT NULL,
  `CommunityId` int(11) NOT NULL,
  `DateAdded` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `ComUsersFK` (`UsersId`),
  KEY `ComUserCommunityFK` (`CommunityId`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=32 ;

-- --------------------------------------------------------

--
-- Table structure for table `FollowRequest`
--

CREATE TABLE IF NOT EXISTS `FollowRequest` (
  `FollowRequestId` int(11) NOT NULL AUTO_INCREMENT,
  `DateAdded` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `RequestViewed` tinyint(1) DEFAULT '0',
  `UserRequestingId` int(11) NOT NULL,
  `UserRequestedId` int(11) NOT NULL,
  PRIMARY KEY (`FollowRequestId`),
  KEY `UserRequestingingFK` (`UserRequestingId`),
  KEY `UserRequestedFK` (`UserRequestedId`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=16 ;

--
-- Dumping data for table `FollowRequest`
--


-- --------------------------------------------------------

--
-- Table structure for table `photos`
--

CREATE TABLE IF NOT EXISTS `photos` (
  `name` varchar(40) NOT NULL,
  `address` varchar(2083) NOT NULL,
  `date` varchar(10) NOT NULL,
  `type` varchar(2083) NOT NULL,
  `image` blob NOT NULL,
  `up` int(11) NOT NULL,
  `down` int(11) NOT NULL,
  PRIMARY KEY (`name`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `PostEvent`
--

CREATE TABLE IF NOT EXISTS `PostEvent` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `UsersId` int(11) NOT NULL,
  `EventName` varchar(128) NOT NULL,
  `DateAdded` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `Description` varchar(256) DEFAULT NULL,
  `CommunitieID` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `PostEventUsersFK` (`UsersId`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=167 ;

-- --------------------------------------------------------

--
-- Table structure for table `PostReaction`
--

CREATE TABLE IF NOT EXISTS `PostReaction` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `UsersId` int(11) NOT NULL,
  `PostId` int(11) NOT NULL,
  `DateAdded` date NOT NULL,
  `Liked` tinyint(1) DEFAULT NULL,
  `Disliked` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`Id`),
  KEY `PostReactionUsersFK` (`UsersId`),
  KEY `PostReactionPostFK` (`PostId`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=56 ;

-- --------------------------------------------------------

--
-- Table structure for table `PostShare`
--

CREATE TABLE IF NOT EXISTS `PostShare` (
  `UsersId` int(11) NOT NULL,
  `PostId` int(11) NOT NULL,
  `CommunityId` int(11) NOT NULL,
  `DateAdded` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`PostId`),
  KEY `UsersId` (`UsersId`),
  KEY `CommunityId` (`CommunityId`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `PostShare`
--


-- --------------------------------------------------------

--
-- Table structure for table `renUser`
--

CREATE TABLE IF NOT EXISTS `renUser` (
  `userName` varchar(20) NOT NULL,
  `firstName` varchar(20) NOT NULL,
  `lastName` varchar(20) NOT NULL,
  `password` varchar(40) NOT NULL,
  PRIMARY KEY (`userName`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `rockPS`
--

CREATE TABLE IF NOT EXISTS `rockPS` (
  `userName` varchar(20) NOT NULL,
  `password` varchar(40) NOT NULL,
  `firstName` varchar(20) NOT NULL,
  `lastName` varchar(20) NOT NULL,
  `wins` int(20) NOT NULL,
  `losses` int(20) NOT NULL,
  `ties` int(20) NOT NULL,
  PRIMARY KEY (`userName`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `rps`
--

CREATE TABLE IF NOT EXISTS `rps` (
  `userName` varchar(20) NOT NULL,
  `password` varchar(40) NOT NULL,
  `firstName` varchar(20) NOT NULL,
  `lastName` varchar(20) NOT NULL,
  `wins` int(10) NOT NULL,
  `losses` int(10) NOT NULL,
  `ties` int(10) NOT NULL,
  PRIMARY KEY (`userName`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `UserPost`
--

CREATE TABLE IF NOT EXISTS `UserPost` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `UsersId` int(11) NOT NULL,
  `DateAdded` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `PostText` varchar(8192) NOT NULL,
  `EventId` int(11) NOT NULL DEFAULT '0',
  `CommunityId` int(11) DEFAULT '0',
  `PostTitle` varchar(256) DEFAULT NULL,
  `PictureOne` varchar(512) DEFAULT NULL,
  `PictureTwo` varchar(512) DEFAULT NULL,
  `PictureThree` varchar(512) DEFAULT NULL,
  `VideoOne` varchar(512) DEFAULT NULL,
  `VideoTwo` varchar(512) DEFAULT NULL,
  `VideoThree` varchar(512) DEFAULT NULL,
  `Description` varchar(256) DEFAULT NULL,
  `isComment` int(11) DEFAULT '0',
  PRIMARY KEY (`Id`),
  KEY `UsersId` (`UsersId`),
  KEY `EventId` (`EventId`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=147 ;

-- --------------------------------------------------------

--
-- Table structure for table `UserPrivacy`
--

CREATE TABLE IF NOT EXISTS `UserPrivacy` (
  `UsersId` int(11) NOT NULL,
  `PrivacySetting` tinyint(1) DEFAULT '0',
  `PrivacySetting2` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`UsersId`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `UserPrivacy`
--


-- --------------------------------------------------------

--
-- Table structure for table `UserRelationships`
--

CREATE TABLE IF NOT EXISTS `UserRelationships` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `DateAdded` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `UserFollowingId` int(11) NOT NULL,
  `UserFollowedId` int(11) NOT NULL,
  PRIMARY KEY (`Id`),
  KEY `UserFollowingFK` (`UserFollowingId`),
  KEY `UserFollowedFK` (`UserFollowedId`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=36 ;

-- --------------------------------------------------------

--
-- Table structure for table `Users`
--

CREATE TABLE IF NOT EXISTS `Users` (
  `UsersId` int(11) NOT NULL,
  `FirstName` varchar(64) NOT NULL,
  `LastName` varchar(64) NOT NULL,
  `Email` varchar(128) NOT NULL,
  `password` varchar(128) NOT NULL,
  `DateOfBirth` date NOT NULL,
  `ActiveFlag` tinyint(1) DEFAULT '1',
  `EmployerName` varchar(128) DEFAULT NULL,
  `AboutMe` varchar(2000) DEFAULT NULL,
  `HomeCity` varchar(128) DEFAULT NULL,
  `HomeStateOrProvence` varchar(128) DEFAULT NULL,
  `CurrentCity` varchar(128) DEFAULT NULL,
  `CurrentStateOrProvence` varchar(128) DEFAULT NULL,
  `CurrentCountry` varchar(128) DEFAULT NULL,
  `CellPhone` varchar(32) DEFAULT NULL,
  `HomePhone` varchar(32) DEFAULT NULL,
  `ProfilePicture` varchar(256) DEFAULT NULL,
  `DateAdded` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`UsersId`),
  UNIQUE KEY `Email` (`Email`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `wine`
--

CREATE TABLE IF NOT EXISTS `wine` (
  `id` int(11) NOT NULL DEFAULT '0',
  `country` varchar(100) DEFAULT NULL,
  `description` varchar(5000) DEFAULT NULL,
  `designation` varchar(100) DEFAULT NULL,
  `points` decimal(10,2) DEFAULT NULL,
  `price` decimal(10,2) DEFAULT NULL,
  `province` varchar(100) DEFAULT NULL,
  `region_1` varchar(100) DEFAULT NULL,
  `region_2` varchar(100) DEFAULT NULL,
  `variety` varchar(100) DEFAULT NULL,
  `winery` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `Communities`
--
ALTER TABLE `Communities`
  ADD CONSTRAINT `UserCommunitiesFK` FOREIGN KEY (`AdminId`) REFERENCES `Users` (`UsersId`);

--
-- Constraints for table `CommunityModerators`
--
ALTER TABLE `CommunityModerators`
  ADD CONSTRAINT `UsersFK` FOREIGN KEY (`UserId`) REFERENCES `Users` (`UsersId`),
  ADD CONSTRAINT `CommunityFK` FOREIGN KEY (`CommunityId`) REFERENCES `Communities` (`CommunityId`);

--
-- Constraints for table `CommunityPrivacy`
--
ALTER TABLE `CommunityPrivacy`
  ADD CONSTRAINT `CommunityPrivacyFK` FOREIGN KEY (`CommunityId`) REFERENCES `Communities` (`CommunityId`);

--
-- Constraints for table `CommunityUsers`
--
ALTER TABLE `CommunityUsers`
  ADD CONSTRAINT `ComUserCommunityFK` FOREIGN KEY (`CommunityId`) REFERENCES `Communities` (`CommunityId`),
  ADD CONSTRAINT `ComUsersFK` FOREIGN KEY (`UsersId`) REFERENCES `Users` (`UsersId`);

--
-- Constraints for table `FollowRequest`
--
ALTER TABLE `FollowRequest`
  ADD CONSTRAINT `UserRequestedFK` FOREIGN KEY (`UserRequestedId`) REFERENCES `Users` (`UsersId`),
  ADD CONSTRAINT `UserRequestingingFK` FOREIGN KEY (`UserRequestingId`) REFERENCES `Users` (`UsersId`);

--
-- Constraints for table `PostEvent`
--
ALTER TABLE `PostEvent`
  ADD CONSTRAINT `PostEventUsersFK` FOREIGN KEY (`UsersId`) REFERENCES `Users` (`UsersId`);

--
-- Constraints for table `PostReaction`
--
ALTER TABLE `PostReaction`
  ADD CONSTRAINT `PostReactionPostFK` FOREIGN KEY (`PostId`) REFERENCES `UserPost` (`Id`),
  ADD CONSTRAINT `PostReactionUsersFK` FOREIGN KEY (`UsersId`) REFERENCES `Users` (`UsersId`);

--
-- Constraints for table `PostShare`
--
ALTER TABLE `PostShare`
  ADD CONSTRAINT `PostShare_ibfk_1` FOREIGN KEY (`UsersId`) REFERENCES `Users` (`UsersId`),
  ADD CONSTRAINT `PostShare_ibfk_2` FOREIGN KEY (`PostId`) REFERENCES `UserPost` (`Id`),
  ADD CONSTRAINT `PostShare_ibfk_3` FOREIGN KEY (`CommunityId`) REFERENCES `Communities` (`CommunityId`);

--
-- Constraints for table `UserPost`
--
ALTER TABLE `UserPost`
  ADD CONSTRAINT `UserPost_ibfk_1` FOREIGN KEY (`UsersId`) REFERENCES `Users` (`UsersId`),
  ADD CONSTRAINT `UserPost_ibfk_2` FOREIGN KEY (`EventId`) REFERENCES `PostEvent` (`id`);

--
-- Constraints for table `UserPrivacy`
--
ALTER TABLE `UserPrivacy`
  ADD CONSTRAINT `UserPrivacyFK` FOREIGN KEY (`UsersId`) REFERENCES `Users` (`UsersId`);

--
-- Constraints for table `UserRelationships`
--
ALTER TABLE `UserRelationships`
  ADD CONSTRAINT `UserFollowedFK` FOREIGN KEY (`UserFollowedId`) REFERENCES `Users` (`UsersId`),
  ADD CONSTRAINT `UserFollowingFK` FOREIGN KEY (`UserFollowingId`) REFERENCES `Users` (`UsersId`);