ALTER TABLE trackday.`member` MODIFY COLUMN auth varchar(30) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT 'ROLE_USER' NOT NULL COMMENT '권한. 여러 권한일경우 콤마(,)로 연결';
