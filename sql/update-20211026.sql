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

-- 함수 trackday.FNC_GOAL_ID_PATH 구조 내보내기
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

-- 함수 trackday.FNC_GOAL_TITLE_PATH 구조 내보내기
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

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
