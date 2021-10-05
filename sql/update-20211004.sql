ALTER TABLE trackday.`member` ADD auth varchar(30) NOT NULL COMMENT '권한. 여러 권한일경우 콤마(,)로 연결';
ALTER TABLE trackday.`member` CHANGE auth auth varchar(30) NOT NULL COMMENT '권한. 여러 권한일경우 콤마(,)로 연결' AFTER member_serial_number;
