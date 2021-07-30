-- MySQL dump 10.13  Distrib 8.0.24, for Win64 (x86_64)
--
-- Host: localhost    Database: trackday
-- ------------------------------------------------------
-- Server version	8.0.24

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `activity_record`
--

DROP TABLE IF EXISTS `activity_record`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `activity_record` (
  `time_activity_record_id` int NOT NULL AUTO_INCREMENT COMMENT '활동 기록 id',
  `start_datetime` datetime NOT NULL COMMENT '시작 시간값.(시분)',
  `end_datetime` datetime NOT NULL COMMENT '종료 시간.(시분) 비고  선택 화면에 다음날짜의 시간까지 선택 가능',
  `classification_name` varchar(30) NOT NULL COMMENT '분류',
  `activity_content` text CHARACTER SET utf8 COLLATE utf8_general_ci COMMENT '활동 내용',
  `goal_content` text COMMENT '목표 내용',
  `outcome_content` text CHARACTER SET utf8 COLLATE utf8_general_ci COMMENT '활동내역',
  `reflection_content` text CHARACTER SET utf8 COLLATE utf8_general_ci COMMENT '반성내용',
  `activity_score` int DEFAULT '0' COMMENT '활동점수(집중도)',
  `modification_datetime` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '수정 일시',
  `create_datetime` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '생성 일시',
  `deletion_status` enum('Y','N') CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT 'N' COMMENT '삭제여부',
  `time_record_id` int NOT NULL COMMENT '시간기록 id(autoincremeant)',
  PRIMARY KEY (`time_activity_record_id`),
  KEY `activity_record_FK` (`time_record_id`),
  CONSTRAINT `activity_record_FK` FOREIGN KEY (`time_record_id`) REFERENCES `time_record` (`time_record_id`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `classification`
--

DROP TABLE IF EXISTS `classification`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `classification` (
  `classification_id` int NOT NULL COMMENT '분류 id(autoincremeant)',
  `management_type` enum('time_record','timely_indicators_record') NOT NULL COMMENT '관리 종류',
  `time_unit` enum('day','week','month','quarter','year') NOT NULL COMMENT '시간 단위',
  `name` varchar(30) NOT NULL COMMENT '분류명(unique)',
  `explanation` text NOT NULL COMMENT '설명',
  `modification_datetime` datetime NOT NULL COMMENT '수정 일시',
  `create_datetime` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '생성 일시',
  `deletion_status` enum('Y','N') NOT NULL COMMENT '삭제여부',
  `member_serial_number` int NOT NULL COMMENT '멤버테이블 일련번호(autoincreament)',
  PRIMARY KEY (`classification_id`),
  KEY `FK_member_TO_classification_1` (`member_serial_number`),
  CONSTRAINT `FK_member_TO_classification_1` FOREIGN KEY (`member_serial_number`) REFERENCES `member` (`member_serial_number`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `indicator_classification`
--

DROP TABLE IF EXISTS `indicator_classification`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `indicator_classification` (
  `indicator_classification_id` int NOT NULL COMMENT '지표 분류_id(autoincreament)',
  `classification_name` varchar(30) NOT NULL COMMENT '분류명',
  `goal_content` text NOT NULL COMMENT '목표 내용',
  `outcome_content` text NOT NULL COMMENT '달성 내용',
  `reflection_content` text NOT NULL COMMENT '반성내용',
  `indicator_score` int NOT NULL DEFAULT '0' COMMENT '지표 점수',
  `modification_datetime` datetime NOT NULL COMMENT '수정 일시',
  `create_datetime` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '생성 일시',
  `deletion_status` enum('Y','N') NOT NULL COMMENT '삭제여부',
  `timely_indicators_record_id` int DEFAULT NULL COMMENT '시간별_지표들_기록 id(autoincremeant)',
  PRIMARY KEY (`indicator_classification_id`),
  KEY `FK_timely_indicators_record_TO_indicator_classification_1` (`timely_indicators_record_id`),
  CONSTRAINT `FK_timely_indicators_record_TO_indicator_classification_1` FOREIGN KEY (`timely_indicators_record_id`) REFERENCES `timely_indicators_record` (`timely_indicators_record_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `member`
--

DROP TABLE IF EXISTS `member`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `member` (
  `member_serial_number` int NOT NULL COMMENT '멤버테이블 일련번호(autoincreament)',
  `member_id` varchar(20) NOT NULL COMMENT '멤버 아이디',
  `linked_email` varchar(60) NOT NULL COMMENT 'sns 연동 이메일(google, kakao, ...)',
  `이름` varchar(20) NOT NULL COMMENT '이름',
  `phone_number` varchar(20) NOT NULL COMMENT '연락처',
  `email_address` varchar(60) NOT NULL COMMENT '이메일 주소',
  `remark` text NOT NULL COMMENT '비고',
  `fail_count` int NOT NULL DEFAULT '0' COMMENT '로그인 실패 횟수',
  `create_datetime` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '생성 일시',
  `deletionStatus` enum('Y','N') NOT NULL DEFAULT 'N' COMMENT '삭제여부',
  `activeUserYn` enum('Y','N') DEFAULT 'N' COMMENT '활동 유저 여부',
  `password` varchar(255) DEFAULT NULL COMMENT '패스워드(sns연동X시)',
  `snsLinkYn` enum('Y','N') NOT NULL DEFAULT 'N' COMMENT 'sns연동 여부',
  PRIMARY KEY (`member_serial_number`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `reference_favorite`
--

DROP TABLE IF EXISTS `reference_favorite`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `reference_favorite` (
  `reference_favorite_id` int NOT NULL COMMENT '참고 즐겨찾기 id(autoincremeant)',
  `management_type` enum('time_record','timely_indicators_record') NOT NULL COMMENT '관리 종류',
  `time_unit` enum('day','week','month','quarter','year') NOT NULL COMMENT '시간 단위',
  `name` varchar(30) NOT NULL COMMENT '참고즐겨찾기 명(unique)',
  `content` text NOT NULL COMMENT '내용',
  `modification_datetime` datetime NOT NULL COMMENT '수정 일시',
  `create_datetime` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '생성 일시',
  `deletion_status` enum('Y','N') NOT NULL COMMENT '삭제여부',
  `member_serial_number` int NOT NULL COMMENT '멤버테이블 일련번호(autoincreament)',
  PRIMARY KEY (`reference_favorite_id`),
  KEY `FK_member_TO_reference_favorite_1` (`member_serial_number`),
  CONSTRAINT `FK_member_TO_reference_favorite_1` FOREIGN KEY (`member_serial_number`) REFERENCES `member` (`member_serial_number`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `reference_favorite_default_setting`
--

DROP TABLE IF EXISTS `reference_favorite_default_setting`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `reference_favorite_default_setting` (
  `serial_number` int NOT NULL COMMENT '일련번호',
  `management_type` enum('time_record','timely_indicators_record') NOT NULL COMMENT '관리 종류',
  `time_unit` enum('day','week','month','quarter','year') NOT NULL COMMENT '시간 단위',
  `reference_favorite_id` int DEFAULT NULL COMMENT '널값허용. 참조 즐겨찾기 id 외래키',
  `create_datetime` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '생성 일시',
  `update_datetime` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '수정 일시',
  `member_serial_number` int NOT NULL COMMENT '멤버테이블 일련번호(autoincreament)',
  PRIMARY KEY (`serial_number`),
  KEY `FK_member_TO_reference_favorite_default_setting_1` (`member_serial_number`),
  CONSTRAINT `FK_member_TO_reference_favorite_default_setting_1` FOREIGN KEY (`member_serial_number`) REFERENCES `member` (`member_serial_number`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `time_record`
--

DROP TABLE IF EXISTS `time_record`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `time_record` (
  `time_record_id` int NOT NULL AUTO_INCREMENT COMMENT '시간기록 id(autoincremeant)',
  `selection_date` date NOT NULL COMMENT '선택 날짜.',
  `modification_datetime` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '수정 일시',
  `create_datetime` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '생성 일시',
  `deletion_status` enum('Y','N') CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT 'N' COMMENT '삭제여부',
  `member_serial_number` int NOT NULL COMMENT '멤버테이블 일련번호(autoincreament)',
  PRIMARY KEY (`time_record_id`),
  KEY `FK_member_TO_time_record_1` (`member_serial_number`),
  CONSTRAINT `FK_member_TO_time_record_1` FOREIGN KEY (`member_serial_number`) REFERENCES `member` (`member_serial_number`)
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `timely_indicators_record`
--

DROP TABLE IF EXISTS `timely_indicators_record`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `timely_indicators_record` (
  `timely_indicators_record_id` int NOT NULL COMMENT '시간별_지표들_기록 id(autoincremeant)',
  `time_unit` enum('day','week','month','quarter','year') NOT NULL COMMENT '시간 단위',
  `selection_start_date` date NOT NULL COMMENT '선택 날짜.(선택 범위의 시작일)',
  `modification_datetime` datetime NOT NULL COMMENT '수정 일시',
  `create_datetime` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '생성 일시',
  `deletion_status` enum('Y','N') NOT NULL COMMENT '삭제여부',
  `member_serial_number` int NOT NULL COMMENT '멤버테이블 일련번호(autoincreament)',
  PRIMARY KEY (`timely_indicators_record_id`),
  KEY `FK_member_TO_timely_indicators_record_1` (`member_serial_number`),
  CONSTRAINT `FK_member_TO_timely_indicators_record_1` FOREIGN KEY (`member_serial_number`) REFERENCES `member` (`member_serial_number`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `untitled3`
--

DROP TABLE IF EXISTS `untitled3`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `untitled3` (
  `page_help_id` int NOT NULL COMMENT '페이지 도움말 id(autointrement)',
  `page_url` varchar(50) NOT NULL COMMENT '페이지 url',
  `help_title` varchar(50) NOT NULL COMMENT '페이지 제목',
  `page_help_message` text COMMENT '페이지 메세지',
  PRIMARY KEY (`page_help_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping routines for database 'trackday'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-07-21 21:26:43
