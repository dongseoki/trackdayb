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

-- 테이블 trackday.sns_link_info 구조 내보내기
DROP TABLE IF EXISTS `sns_link_info`;
CREATE TABLE IF NOT EXISTS `sns_link_info` (
                                               `member_serial_number` int NOT NULL COMMENT '멤버테이블 일련번호(autoincreament)',
                                               `sns_type` enum('G','N','K') COLLATE utf8mb4_unicode_ci NOT NULL COMMENT 'SNS 타입코드 - G:구글, N:네이버, K:카카오',
                                               `linked_email` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT 'SNS 연동 이메일',
                                               `modification_datetime` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '수정일시',
                                               PRIMARY KEY (`member_serial_number`,`sns_type`),
                                               UNIQUE KEY `sns_link_info_UN` (`linked_email`),
                                               KEY `FK_member_TO_sns_link_info_1` (`member_serial_number`),
                                               CONSTRAINT `FK_member_TO_sns_link_info_1` FOREIGN KEY (`member_serial_number`) REFERENCES `member` (`member_serial_number`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 내보낼 데이터가 선택되어 있지 않습니다.

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;


/* 유니크 키 제거*/
ALTER TABLE trackday.sns_link_info DROP KEY sns_link_info_UN;


/* memberId 컬럼 길이 변경*/
ALTER TABLE trackday.`member` MODIFY COLUMN member_id varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '멤버 아이디';

/* member 테이블 사용하지 않는 컬럼 및 키 제거. */
ALTER TABLE trackday.`member` DROP COLUMN sns_link_status;
ALTER TABLE trackday.`member` DROP COLUMN linked_email;



/*  --------------  */
ALTER TABLE trackday.file CHANGE file_name original_file_name varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '확장자명을 포함한 이름';

ALTER TABLE trackday.file MODIFY COLUMN `path` varchar(1000) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '경로명';
ALTER TABLE trackday.file MODIFY COLUMN original_file_name varchar(1000) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '확장자명을 포함한 이름';

ALTER TABLE trackday.file CHANGE extension_name content_type varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '컨텐츠 타입';
ALTER TABLE trackday.file MODIFY COLUMN content_type varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '컨텐츠 타입';

ALTER TABLE trackday.file ADD uuid varchar(300) NULL;
ALTER TABLE trackday.file CHANGE uuid uuid varchar(300) NULL AFTER original_file_name;

/*  ----------------------*/

ALTER TABLE trackday.file DROP COLUMN uuid;
ALTER TABLE trackday.file DROP COLUMN content_type;
ALTER TABLE trackday.file DROP COLUMN `path`;

ALTER TABLE trackday.file ADD store_file_name varchar(1000) NOT NULL COMMENT '저장 파일명';
ALTER TABLE trackday.file CHANGE store_file_name store_file_name varchar(1000) NOT NULL COMMENT '저장 파일명' AFTER original_file_name;
ALTER TABLE trackday.file MODIFY COLUMN original_file_name varchar(1000) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '업로드 파일명';
