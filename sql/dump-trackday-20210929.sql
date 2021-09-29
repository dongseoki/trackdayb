-- --------------------------------------------------------
-- 호스트:                          127.0.0.1
-- 서버 버전:                        8.0.24 - MySQL Community Server - GPL
-- 서버 OS:                        Linux
-- HeidiSQL 버전:                  11.3.0.6295
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- trackday 데이터베이스 구조 내보내기
CREATE DATABASE IF NOT EXISTS `trackday` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
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
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb3;

-- 테이블 데이터 trackday.activity:~8 rows (대략적) 내보내기
DELETE FROM `activity`;
/*!40000 ALTER TABLE `activity` DISABLE KEYS */;
INSERT INTO `activity` (`activity_id`, `member_serial_number`, `goal_id`, `title`, `start_datetime`, `end_datetime`, `content`, `activity_score`, `share_status`, `create_datetime`, `modification_datetime`, `deletion_status`) VALUES
	(1, 1, NULL, '개발', '2021-09-19 11:30:00', '2021-09-19 12:30:00', '개발', 0, 'N', '2021-09-24 14:27:29', '2021-09-24 14:27:29', 'N'),
	(2, 1, 10, '에세이', '2021-09-19 13:30:00', '2021-09-19 15:30:00', '에세이를 씀.', 7, 'Y', '2021-09-24 14:30:17', '2021-09-24 14:30:17', 'N'),
	(3, 1, 12, '러닝', '2021-09-20 07:30:00', '2021-09-20 08:00:00', '러닝 ...', 10, 'N', '2021-09-24 14:32:13', '2021-09-24 14:32:13', 'N'),
	(4, 1, NULL, '회의', '2021-09-20 09:00:00', '2021-09-20 10:00:00', '회의', 5, 'N', '2021-09-24 14:34:24', '2021-09-24 14:34:24', 'N'),
	(5, 1, 11, 'cnn', '2021-09-20 21:00:00', '2021-09-20 21:30:00', 'cnn 시청', 7, 'N', '2021-09-24 14:35:43', '2021-09-24 14:35:43', 'N'),
	(6, 1, 13, '웨이트', '2021-09-21 06:00:00', '2021-09-21 07:00:00', '상체운동', 6, 'N', '2021-09-24 14:37:11', '2021-09-24 14:37:11', 'N'),
	(7, 1, NULL, '낮잠', '2021-09-21 12:30:00', '2021-09-21 12:30:00', '.', 0, 'N', '2021-09-24 14:38:44', '2021-09-24 14:38:44', 'N'),
	(8, 1, 9, '중국어 책 읽기', '2021-09-21 22:30:00', '2021-09-21 23:30:00', '1장을 읽음.', 8, 'N', '2021-09-24 14:40:40', '2021-09-24 14:40:40', 'N');
/*!40000 ALTER TABLE `activity` ENABLE KEYS */;

-- 테이블 trackday.goal 구조 내보내기
DROP TABLE IF EXISTS `goal`;
CREATE TABLE IF NOT EXISTS `goal` (
  `goal_id` int NOT NULL AUTO_INCREMENT,
  `parent_id` int DEFAULT NULL,
  `member_serial_number` int NOT NULL COMMENT '멤버테이블 일련번호(autoincreament)',
  `title` varchar(50) NOT NULL COMMENT '제목',
  `kind` enum('deadline','regular') NOT NULL DEFAULT 'deadline' COMMENT '주기성, 기한성 목표 구분',
  `content` text CHARACTER SET utf8 COLLATE utf8_general_ci COMMENT '내용',
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
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb3;

-- 테이블 데이터 trackday.goal:~12 rows (대략적) 내보내기
DELETE FROM `goal`;
/*!40000 ALTER TABLE `goal` DISABLE KEYS */;
INSERT INTO `goal` (`goal_id`, `parent_id`, `member_serial_number`, `title`, `kind`, `content`, `start_datetime`, `end_datetime`, `progress_rate`, `color`, `create_datetime`, `modification_datetime`, `deletion_status`) VALUES
	(6, NULL, 1, '더미 영어공부', 'deadline', 'Dummy영어공부 의 content 보라색을 가정', NULL, NULL, NULL, '#800080', '2021-09-24 09:12:00', '2021-09-24 09:12:00', 'N'),
	(7, NULL, 1, '더미 책 읽기', 'regular', '일일 1독', '2021-09-01 00:00:00', '2021-09-30 00:00:00', NULL, '#DC143C', '2021-09-24 09:21:00', '2021-09-24 09:21:00', 'N'),
	(8, NULL, 1, '더미 운동', 'deadline', '더미 임', NULL, NULL, NULL, '#00FF00', '2021-09-24 09:23:00', '2021-09-24 09:23:00', 'N'),
	(9, NULL, 1, '더미 중국어 책 완독', 'deadline', '중국어 한걸음 책을 끝냄', '2021-09-01 00:00:00', '2021-12-31 00:00:00', NULL, '#FFFF00', '2021-09-24 09:26:00', '2021-09-24 09:26:00', 'N'),
	(10, 6, 1, '더미 에세이 쓰기', 'regular', '에세이를 씀.', NULL, NULL, NULL, '', '2021-09-24 09:30:00', '2021-09-24 09:30:00', 'N'),
	(11, 6, 1, '더미 CNN  20분 시청', 'regular', 'cnn을 시청', '2021-09-01 00:00:00', '2021-09-30 00:00:00', NULL, '', '2021-09-24 09:30:00', '2021-09-24 09:30:00', 'N'),
	(12, 8, 1, '더미 러닝 30분', 'regular', '한강에서 뜀.', '2021-09-01 00:00:00', '2021-09-30 00:00:00', NULL, '', '2021-09-24 09:30:00', '2021-09-24 09:30:00', 'N'),
	(13, 8, 1, '더미 웨이트', 'regular', '20분 웨이트', '2021-09-01 00:00:00', '2021-09-30 00:00:00', NULL, '', '2021-09-24 09:30:00', '2021-09-24 09:30:00', 'N');
/*!40000 ALTER TABLE `goal` ENABLE KEYS */;

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
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb3;

-- 테이블 데이터 trackday.member:~0 rows (대략적) 내보내기
DELETE FROM `member`;
/*!40000 ALTER TABLE `member` DISABLE KEYS */;
INSERT INTO `member` (`member_serial_number`, `member_id`, `name`, `phone_number`, `email_address`, `sns_link_status`, `linked_email`, `password`, `fail_count`, `active_user_status`, `last_login_datetime`, `withdrawal_datetime`, `remark`, `create_datetime`, `modification_datetime`, `deletion_status`) VALUES
	(1, 'test', '관리자', '010-0000-0000', 'trackday@gmail.com', 'N', NULL, NULL, 0, 'N', NULL, NULL, NULL, '2021-09-24 06:56:48', '2021-09-24 06:56:48', 'N');
/*!40000 ALTER TABLE `member` ENABLE KEYS */;

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
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb3;

-- 테이블 데이터 trackday.periodicity_info:~0 rows (대략적) 내보내기
DELETE FROM `periodicity_info`;
/*!40000 ALTER TABLE `periodicity_info` DISABLE KEYS */;
INSERT INTO `periodicity_info` (`periodicity_id`, `goal_id`, `time_unit`, `type`, `count`, `sun_yn`, `mon_yn`, `tue_yn`, `weds_yn`, `thur_yn`, `fri_yn`, `sat_yn`, `create_datetime`, `modification_datetime`, `deletion_status`) VALUES
	(2, 7, 'D', 'count', 1, 'N', 'N', 'N', 'N', 'N', 'N', 'N', '2021-09-24 11:39:51', '2021-09-24 11:39:51', 'N'),
	(3, 10, 'W', 'count', 1, 'N', 'N', 'N', 'N', 'N', 'N', 'N', '2021-09-24 11:40:44', '2021-09-24 11:40:44', 'N'),
	(4, 11, 'D', 'count', 1, 'N', 'N', 'N', 'N', 'N', 'N', 'N', '2021-09-24 11:41:29', '2021-09-24 11:41:29', 'N'),
	(5, 12, 'W', 'day', NULL, 'N', 'Y', 'N', 'Y', 'N', 'Y', 'N', '2021-09-24 11:42:15', '2021-09-24 11:42:15', 'N'),
	(6, 13, 'W', 'day', NULL, 'N', 'N', 'Y', 'N', 'Y', 'N', 'N', '2021-09-24 11:43:11', '2021-09-24 11:43:11', 'N');
/*!40000 ALTER TABLE `periodicity_info` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
