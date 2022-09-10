-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Server version:               8.0.24 - MySQL Community Server - GPL
-- Server OS:                    Linux
-- HeidiSQL Version:             11.3.0.6295
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Dumping database structure for trackday
DROP DATABASE IF EXISTS `trackday`;
CREATE DATABASE IF NOT EXISTS `trackday` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `trackday`;

-- Dumping structure for table trackday.activity
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
) ENGINE=InnoDB AUTO_INCREMENT=41 DEFAULT CHARSET=utf8mb3;

-- Data exporting was unselected.

-- Dumping structure for table trackday.file
DROP TABLE IF EXISTS `file`;
CREATE TABLE IF NOT EXISTS `file` (
  `file_id` int NOT NULL AUTO_INCREMENT,
  `original_file_name` varchar(1000) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '업로드 파일명',
  `store_file_name` varchar(1000) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '저장 파일명',
  `capacity` int NOT NULL,
  `width` int DEFAULT NULL,
  `height` int DEFAULT NULL,
  `create_datetime` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `modification_datetime` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `deletion_status` enum('Y','N') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'N',
  PRIMARY KEY (`file_id`)
) ENGINE=InnoDB AUTO_INCREMENT=29 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Data exporting was unselected.

-- Dumping structure for function trackday.FNC_GOAL_ID_PATH
DROP FUNCTION IF EXISTS `FNC_GOAL_ID_PATH`;
DELIMITER //
CREATE FUNCTION `FNC_GOAL_ID_PATH`(
	`param_goal_id` VARCHAR(50)
) RETURNS varchar(100) CHARSET utf8mb4 COLLATE utf8mb4_unicode_ci
    READS SQL DATA
    SQL SECURITY INVOKER
BEGIN
	DECLARE _goalIdPath VARCHAR(100);

 	SET _goalIdPath = '';
 
 	with recursive cte (goal_id, parent_id, title, LVL) as
	(
	 select     goal_id, parent_id ,title, 0 LVL 
	 from       goal
	 where goal_id = param_goal_id
	 union all
	 select     r.goal_id,
	 			r.parent_id,
	            r.title,
	            cte.LVL +1 LVL
	 from       goal r
	 inner join cte
	         on r.goal_id = cte.parent_id
	)
	select 
	GROUP_CONCAT(goal_id order by LVL DESC SEPARATOR '/') 
	INTO _goalIdPath
	from cte;

	return _goalIdPath;
END//
DELIMITER ;

-- Dumping structure for function trackday.FNC_GOAL_TITLE_PATH
DROP FUNCTION IF EXISTS `FNC_GOAL_TITLE_PATH`;
DELIMITER //
CREATE FUNCTION `FNC_GOAL_TITLE_PATH`(
	`param_goal_id` VARCHAR(50)
) RETURNS varchar(300) CHARSET utf8mb4 COLLATE utf8mb4_unicode_ci
    READS SQL DATA
    SQL SECURITY INVOKER
BEGIN
	DECLARE _goalTitlePath VARCHAR(300);

 	SET _goalTitlePath = '';
 
 	with recursive cte (goal_id, parent_id, title, LVL) as
	(
	 select     goal_id, parent_id ,title, 0 LVL 
	 from       goal
	 where goal_id = param_goal_id
	 union all
	 select     r.goal_id,
	 			r.parent_id,
	            r.title,
	            cte.LVL +1 LVL
	 from       goal r
	 inner join cte
	         on r.goal_id = cte.parent_id
	)
	select 
	GROUP_CONCAT(title order by LVL DESC SEPARATOR '/') 
	INTO _goalTitlePath
	from cte;

	return _goalTitlePath;
END//
DELIMITER ;

-- Dumping structure for table trackday.goal
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
  `share_status` enum('Y','N') NOT NULL DEFAULT 'N' COMMENT '공유여부',
  `create_datetime` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '생성일시',
  `modification_datetime` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '수정일시',
  `deletion_status` enum('Y','N') CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT 'N' COMMENT '삭제여부',
  PRIMARY KEY (`goal_id`),
  KEY `FK_member_TO_goal_1` (`member_serial_number`),
  CONSTRAINT `FK_member_TO_goal_1` FOREIGN KEY (`member_serial_number`) REFERENCES `member` (`member_serial_number`)
) ENGINE=InnoDB AUTO_INCREMENT=101 DEFAULT CHARSET=utf8mb3;

-- Data exporting was unselected.

-- Dumping structure for table trackday.member
DROP TABLE IF EXISTS `member`;
CREATE TABLE IF NOT EXISTS `member` (
  `member_serial_number` int NOT NULL AUTO_INCREMENT COMMENT '멤버테이블 일련번호(autoincreament)',
  `auth` varchar(30) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT 'ROLE_USER' COMMENT '권한. 여러 권한일경우 콤마(,)로 연결',
  `member_id` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '멤버 아이디',
  `name` varchar(20) NOT NULL COMMENT '이름',
  `phone_number` varchar(20) NOT NULL COMMENT '연락처',
  `email_address` varchar(60) NOT NULL COMMENT '이메일 주소',
  `introduction` varchar(255) DEFAULT NULL COMMENT '소개말',
  `profile_photo_id` int DEFAULT NULL COMMENT '멤버페이지나 커뮤니티 페이지에서 보일 썸네일 프로필 사진 file id',
  `background_photo_id` int DEFAULT NULL COMMENT '멤버페이지나 커뮤니티 페이지에서 보일 배경 사진 file id',
  `password` varchar(255) DEFAULT NULL COMMENT '패스워드(sns연동X시)',
  `fail_count` int NOT NULL DEFAULT '0' COMMENT '로그인 실패 횟수',
  `active_user_status` enum('Y','N') DEFAULT 'N' COMMENT '활동 유저 여부',
  `last_login_datetime` datetime DEFAULT NULL COMMENT '최근 로그인 일시',
  `refresh_token` varchar(1000) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '리프래시_토큰_값',
  `withdrawal_datetime` datetime DEFAULT NULL COMMENT '탈퇴일시',
  `remark` text COMMENT '비고',
  `create_datetime` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '생성 일시',
  `modification_datetime` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '수정일시',
  `deletion_status` enum('Y','N') NOT NULL DEFAULT 'N' COMMENT '삭제여부',
  PRIMARY KEY (`member_serial_number`),
  KEY `member_FK` (`profile_photo_id`),
  KEY `member_FK_1` (`background_photo_id`),
  CONSTRAINT `member_FK` FOREIGN KEY (`profile_photo_id`) REFERENCES `file` (`file_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `member_FK_1` FOREIGN KEY (`background_photo_id`) REFERENCES `file` (`file_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=65 DEFAULT CHARSET=utf8mb3;

-- Data exporting was unselected.

-- Dumping structure for table trackday.periodicity_info
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
) ENGINE=InnoDB AUTO_INCREMENT=70 DEFAULT CHARSET=utf8mb3;

-- Data exporting was unselected.

-- Dumping structure for table trackday.sns_link_info
DROP TABLE IF EXISTS `sns_link_info`;
CREATE TABLE IF NOT EXISTS `sns_link_info` (
  `member_serial_number` int NOT NULL COMMENT '멤버테이블 일련번호(autoincreament)',
  `sns_type` enum('G','N','K') COLLATE utf8mb4_unicode_ci NOT NULL COMMENT 'SNS 타입코드 - G:구글, N:네이버, K:카카오',
  `linked_email` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT 'SNS 연동 이메일',
  `modification_datetime` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '수정일시',
  PRIMARY KEY (`member_serial_number`,`sns_type`),
  KEY `FK_member_TO_sns_link_info_1` (`member_serial_number`),
  CONSTRAINT `FK_member_TO_sns_link_info_1` FOREIGN KEY (`member_serial_number`) REFERENCES `member` (`member_serial_number`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

/* activity table 인덱스 설정. */
CREATE INDEX activity_title_IDX USING BTREE ON trackday.activity (title);
CREATE INDEX activity_start_datetime_IDX USING BTREE ON trackday.activity (start_datetime);
CREATE INDEX activity_end_datetime_IDX USING BTREE ON trackday.activity (end_datetime);

/* goal table 인덱스 설정. */
CREATE INDEX goal_title_IDX USING BTREE ON trackday.goal (title);
CREATE INDEX goal_parent_id_IDX USING BTREE ON trackday.goal (parent_id);
CREATE INDEX goal_start_datetime_IDX USING BTREE ON trackday.goal (start_datetime);
CREATE INDEX goal_end_datetime_IDX USING BTREE ON trackday.goal (end_datetime);

/* member table 인덱스 설정. */
CREATE INDEX member_member_id_IDX USING BTREE ON trackday.`member` (member_id);

-- Data exporting was unselected.

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
