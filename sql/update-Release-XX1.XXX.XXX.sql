/* 리프래시토큰 컬럼 추가.*/
ALTER TABLE trackday.`member` ADD refresh_token varchar(100) NULL COMMENT '리프래시_토큰_값';
ALTER TABLE trackday.`member` CHANGE refresh_token refresh_token varchar(100) NULL COMMENT '리프래시_토큰_값' AFTER last_login_datetime;

ALTER TABLE trackday.`member` MODIFY COLUMN refresh_token varchar(1000) CHARACTER SET utf8 COLLATE utf8_general_ci NULL COMMENT '리프래시_토큰_값';
