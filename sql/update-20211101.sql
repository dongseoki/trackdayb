ALTER TABLE trackday.`member` ADD auth varchar(30) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT 'ROLE_USER' NOT NULL COMMENT '권한. 여러 권한일경우 콤마(,)로 연결' AFTER member_serial_number;


UPDATE trackday.`member`
	SET password='$2a$10$yGU6hHyBQjloD6VJK1zmdu5S4.tMVR3EqnQIw7S57eIdgIBUf06CO',
	auth='ROLE_USER'
	WHERE member_serial_number=1;