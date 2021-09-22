DROP TABLE IF EXISTS `activity_record`;
DROP TABLE IF EXISTS `classification`;
DROP TABLE IF EXISTS `indicator_classification`;
DROP TABLE IF EXISTS `reference_favorite`;
DROP TABLE IF EXISTS `reference_favorite_default_setting`;
DROP TABLE IF EXISTS `time_record`;
DROP TABLE IF EXISTS `timely_indicators_record`;
DROP TABLE IF EXISTS `untitled3`;
DROP TABLE IF EXISTS `member`;

-- --------------------------------------------------------
-- 호스트:                          127.0.0.1
-- 서버 버전:                        8.0.24 - MySQL Community Server - GPL
-- 서버 OS:                        Win64
-- HeidiSQL 버전:                  11.3.0.6295
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- trackday 데이터베이스 구조 내보내기
CREATE DATABASE IF NOT EXISTS `trackday` /*!40100 DEFAULT CHARACTER SET utf8 */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `trackday`;

-- 테이블 trackday.activity 구조 내보내기
DROP TABLE IF EXISTS `activity`;
CREATE TABLE IF NOT EXISTS `activity` (
  `activity_id` int NOT NULL AUTO_INCREMENT COMMENT '활동 기록 id',
  `member_serial_number` int NOT NULL COMMENT '멤버테이블 일련번호(autoincreament)',
  `goal_id` int DEFAULT NULL,
  `title` varchar(50) NOT NULL COMMENT '제목',
  `start_datetime` datetime NOT NULL COMMENT '시작 시간값.(시분)',
  `end_datetime` datetime NOT NULL COMMENT '종료 시간.(시분) 비고 선택 화면에 다음날짜의 시간까지 선택 가능',
  `content` text COMMENT '활동 내용',
  `activity_score` int DEFAULT '0' COMMENT '활동점수(집중도)',
  `share_status` enum('Y','N') NOT NULL DEFAULT 'N' COMMENT '공유여부',
  `create_datetime` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '생성 일시',
  `modification_datetime` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '수정 일시',
  `deletion_status` enum('Y','N') NOT NULL DEFAULT 'N' COMMENT '삭제여부',
  PRIMARY KEY (`activity_id`),
  KEY `FK_member_TO_activity_1` (`member_serial_number`),
  KEY `FK_goal_TO_activity_1` (`goal_id`),
  CONSTRAINT `FK_goal_TO_activity_1` FOREIGN KEY (`goal_id`) REFERENCES `goal` (`goal_id`),
  CONSTRAINT `FK_member_TO_activity_1` FOREIGN KEY (`member_serial_number`) REFERENCES `member` (`member_serial_number`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

-- 내보낼 데이터가 선택되어 있지 않습니다.

-- 테이블 trackday.goal 구조 내보내기
DROP TABLE IF EXISTS `goal`;
CREATE TABLE IF NOT EXISTS `goal` (
  `goal_id` int NOT NULL AUTO_INCREMENT,
  `parent_id` int DEFAULT NULL,
  `member_serial_number` int NOT NULL COMMENT '멤버테이블 일련번호(autoincreament)',
  `title` varchar(50) NOT NULL COMMENT '제목',
  `kind` enum('deadline','regular') NOT NULL DEFAULT 'deadline' COMMENT '주기성, 기한성 목표 구분',
  `content` text NOT NULL COMMENT '내용',
  `start_datetime` datetime DEFAULT NULL COMMENT '시작일',
  `end_datetime` datetime DEFAULT NULL COMMENT '종료일',
  `progress_rate` int DEFAULT NULL COMMENT '진행율(주기성 목표의 경우 null 가능)',
  `color` varchar(10) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '컬러정보(최상위 목표 이외 null또는 빈값)',
  `create_datetime` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '생성일시',
  `modification_datetime` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '수정일시',
  `deletion_status` enum('Y','N') CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT 'N' COMMENT '삭제여부',
  PRIMARY KEY (`goal_id`),
  KEY `FK_member_TO_goal_1` (`member_serial_number`),
  CONSTRAINT `FK_member_TO_goal_1` FOREIGN KEY (`member_serial_number`) REFERENCES `member` (`member_serial_number`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

-- 내보낼 데이터가 선택되어 있지 않습니다.

-- 테이블 trackday.member 구조 내보내기
DROP TABLE IF EXISTS `member`;
CREATE TABLE IF NOT EXISTS `member` (
  `member_serial_number` int NOT NULL AUTO_INCREMENT COMMENT '멤버테이블 일련번호(autoincreament)',
  `member_id` varchar(20) NOT NULL COMMENT '멤버 아이디',
  `name` varchar(20) NOT NULL COMMENT '이름',
  `phone_number` varchar(20) NOT NULL COMMENT '연락처',
  `email_address` varchar(60) NOT NULL COMMENT '이메일 주소',
  `sns_link_status` enum('Y','N') NOT NULL DEFAULT 'N' COMMENT 'sns연동 여부',
  `linked_email` varchar(60) DEFAULT NULL COMMENT 'sns 연동 이메일(google, kakao, ...)',
  `password` varchar(255) DEFAULT NULL COMMENT '패스워드(sns연동X시)',
  `fail_count` int NOT NULL DEFAULT '0' COMMENT '로그인 실패 횟수',
  `active_user_status` enum('Y','N') DEFAULT 'N' COMMENT '활동 유저 여부',
  `last_login_datetime` datetime DEFAULT NULL COMMENT '최근 로그인 일시',
  `withdrawal_datetime` datetime DEFAULT NULL COMMENT '탈퇴일시',
  `remark` text COMMENT '비고',
  `create_datetime` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '생성 일시',
  `modification_datetime` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '수정일시',
  `deletion_status` enum('Y','N') NOT NULL DEFAULT 'N' COMMENT '삭제여부',
  PRIMARY KEY (`member_serial_number`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

-- 내보낼 데이터가 선택되어 있지 않습니다.

-- 테이블 trackday.periodicity_info 구조 내보내기
DROP TABLE IF EXISTS `periodicity_info`;
CREATE TABLE IF NOT EXISTS `periodicity_info` (
  `periodicity_id` int NOT NULL AUTO_INCREMENT,
  `goal_id` int NOT NULL,
  `time_unit` enum('D','W','M','Y') NOT NULL COMMENT '일, 주, 월, 년 택1',
  `type` enum('count','day') NOT NULL COMMENT '횟수 또는 요일 택 1',
  `count` int DEFAULT NULL COMMENT '횟수',
  `sun_yn` enum('Y','N') DEFAULT 'N' COMMENT '일요일 체크 여부',
  `mon_yn` enum('Y','N') DEFAULT 'N' COMMENT '월요일 체크 여부',
  `tue_yn` enum('Y','N') DEFAULT 'N' COMMENT '화요일 체크 여부',
  `weds_yn` enum('Y','N') DEFAULT 'N' COMMENT '수요일 체크 여부',
  `thur_yn` enum('Y','N') DEFAULT 'N' COMMENT '목요일 체크 여부',
  `fri_yn` enum('Y','N') DEFAULT 'N' COMMENT '금요일 체크 여부',
  `sat_yn` enum('Y','N') DEFAULT 'N' COMMENT '토요일 체크 여부',
  `create_datetime` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '생성일시',
  `modification_datetime` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '수정일시',
  `deletion_status` enum('Y','N') NOT NULL DEFAULT 'N' COMMENT '삭제여부',
  PRIMARY KEY (`periodicity_id`),
  KEY `FK_goal_TO_periodicity_Info_1` (`goal_id`),
  CONSTRAINT `FK_goal_TO_periodicity_Info_1` FOREIGN KEY (`goal_id`) REFERENCES `goal` (`goal_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

-- 내보낼 데이터가 선택되어 있지 않습니다.

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
