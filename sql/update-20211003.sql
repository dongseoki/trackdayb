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

-- 테이블 trackday.file 구조 내보내기
CREATE TABLE IF NOT EXISTS `file` (
  `file_id` int NOT NULL AUTO_INCREMENT,
  `file_name` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '확장자명을 포함한 이름',
  `extension_name` varchar(8) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '확장자명',
  `path` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '경로명',
  `capacity` int NOT NULL,
  `width` int DEFAULT NULL,
  `height` int DEFAULT NULL,
  `create_datetime` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `modification_datetime` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `deletion_status` enum('Y','N') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'N',
  PRIMARY KEY (`file_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 내보낼 데이터가 선택되어 있지 않습니다.

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;


ALTER TABLE trackday.`member` ADD profile_photo_id INT NULL COMMENT '멤버페이지나 커뮤니티 페이지에서 보일 썸네일 프로필 사진 file id';
ALTER TABLE trackday.`member` CHANGE profile_photo_id profile_photo_id INT NULL COMMENT '멤버페이지나 커뮤니티 페이지에서 보일 썸네일 프로필 사진 file id' AFTER introduction;
ALTER TABLE trackday.`member` ADD background_photo_id INT NULL COMMENT '멤버페이지나 커뮤니티 페이지에서 보일 배경 사진 file id';
ALTER TABLE trackday.`member` CHANGE background_photo_id background_photo_id INT NULL COMMENT '멤버페이지나 커뮤니티 페이지에서 보일 배경 사진 file id' AFTER profile_photo_id;
ALTER TABLE trackday.`member` ADD introduction varchar(255) NULL COMMENT '소개말';
ALTER TABLE trackday.`member` CHANGE introduction introduction varchar(255) NULL COMMENT '소개말' AFTER email_address;


ALTER TABLE trackday.`member` ADD CONSTRAINT member_FK FOREIGN KEY (profile_photo_id) REFERENCES trackday.file(file_id) ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE trackday.`member` ADD CONSTRAINT member_FK_1 FOREIGN KEY (background_photo_id) REFERENCES trackday.file(file_id) ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE trackday.goal ADD share_status enum('Y','N') DEFAULT 'N' NOT NULL COMMENT '공유여부';
ALTER TABLE trackday.goal CHANGE share_status share_status enum('Y','N') DEFAULT 'N' NOT NULL COMMENT '공유여부' AFTER color;
