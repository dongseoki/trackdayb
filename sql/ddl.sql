-- trackDay_nonconsider_unique_ver1_210713

CREATE TABLE `indicator_classification` (
	`indicator_classification_id`	int	NOT NULL	COMMENT '지표 분류_id(autoincreament)',
	`classification_name`	varchar(30)	NOT NULL	DEFAULT unclassified	COMMENT '분류명',
	`goal_content`	text	NOT NULL	COMMENT '목표 내용',
	`outcome_content`	text	NOT NULL	COMMENT '달성 내용',
	`reflection_content`	text	NOT NULL	COMMENT '반성내용',
	`indicator_score`	int	NOT NULL	DEFAULT 0	COMMENT '지표 점수',
	`modification_datetime`	datetime	NOT NULL	COMMENT '수정 일시',
	`create_datetime`	datetime	NOT NULL	DEFAULT CURRENT_TIMESTAMP	COMMENT '생성 일시',
	`deletion_status`	enum('Y','N'	NOT NULL	COMMENT '삭제여부',
	`timely_indicators_record_id`	int	NULL	COMMENT '시간별_지표들_기록 id(autoincremeant)'
);

CREATE TABLE `timely_indicators_record` (
	`timely_indicators_record_id`	int	NOT NULL	COMMENT '시간별_지표들_기록 id(autoincremeant)',
	`time_unit`	enum('day', 'week', 'month',  'quarter' ,     'year')	NOT NULL	COMMENT '시간 단위',
	`selection_start_date`	date	NOT NULL	COMMENT '선택 날짜.(선택 범위의 시작일)',
	`modification_datetime`	datetime	NOT NULL	COMMENT '수정 일시',
	`create_datetime`	datetime	NOT NULL	DEFAULT CURRENT_TIMESTAMP	COMMENT '생성 일시',
	`deletion_status`	enum('Y','N'	NOT NULL	COMMENT '삭제여부',
	`member_serial_number`	int	NOT NULL	COMMENT '멤버테이블 일련번호(autoincreament)'
);

CREATE TABLE `classification` (
	`classification_id`	int	NOT NULL	COMMENT '분류 id(autoincremeant)',
	`management_type`	enum('time_record'   ,'timely_indicators_record')	NOT NULL	COMMENT '관리 종류',
	`time_unit`	enum('day', 'week', 'month',  'quarter' ,     'year')	NOT NULL	COMMENT '시간 단위',
	`name`	varchar(30)	NOT NULL	COMMENT '분류명(unique)',
	`explanation`	text	NOT NULL	COMMENT '설명',
	`modification_datetime`	datetime	NOT NULL	COMMENT '수정 일시',
	`create_datetime`	datetime	NOT NULL	DEFAULT CURRENT_TIMESTAMP	COMMENT '생성 일시',
	`deletion_status`	enum('Y','N'	NOT NULL	COMMENT '삭제여부',
	`member_serial_number`	int	NOT NULL	COMMENT '멤버테이블 일련번호(autoincreament)'
);

CREATE TABLE `member` (
	`member_serial_number`	int	NOT NULL	COMMENT '멤버테이블 일련번호(autoincreament)',
	`member_id`	varchar(20)	NOT NULL	COMMENT '멤버 아이디',
	`linked_email`	varchar(60)	NOT NULL	COMMENT 'sns 연동 이메일(google, kakao, ...)',
	`이름`	varchar(20)	NOT NULL	COMMENT '이름',
	`phone_number`	varchar(20)	NOT NULL	COMMENT '연락처',
	`email_address`	varchar(60)	NOT NULL	COMMENT '이메일 주소',
	`remark`	text	NOT NULL	COMMENT '비고',
	`fail_count`	int	NOT NULL	DEFAULT 0	COMMENT '로그인 실패 횟수',
	`create_datetime`	datetime	NOT NULL	DEFAULT CURRENT_TIMESTAMP	COMMENT '생성 일시',
	`deletionStatus`	enum('Y', 'N')	NOT NULL	DEFAULT 'N'	COMMENT '삭제여부',
	`activeUserYn`	enum('Y', 'N')	NULL	DEFAULT 'N'	COMMENT '활동 유저 여부',
	`password`	VARCHAR(255)	NULL	COMMENT '패스워드(sns연동X시)',
	`snsLinkYn`	enum('Y', 'N')	NOT NULL	DEFAULT 'N'	COMMENT 'sns연동 여부'
);

CREATE TABLE `reference_favorite_default_setting` (
	`serial_number`	int	NOT NULL	COMMENT '일련번호',
	`management_type`	enum('time_record'   ,'timely_indicators_record')	NOT NULL	COMMENT '관리 종류',
	`time_unit`	enum('day', 'week', 'month',  'quarter' ,     'year')	NOT NULL	COMMENT '시간 단위',
	`reference_favorite_id`	int	NULL	COMMENT '널값허용. 참조 즐겨찾기 id 외래키',
	`create_datetime`	datetime	NOT NULL	DEFAULT CURRENT_TIMESTAMP	COMMENT '생성 일시',
	`update_datetime`	datetime	NOT NULL	DEFAULT CURRENT_TIMESTAMP	COMMENT '수정 일시',
	`member_serial_number`	int	NOT NULL	COMMENT '멤버테이블 일련번호(autoincreament)'
);

CREATE TABLE `reference_favorite` (
	`reference_favorite_id`	int	NOT NULL	COMMENT '참고 즐겨찾기 id(autoincremeant)',
	`management_type`	enum('time_record'   ,'timely_indicators_record')	NOT NULL	COMMENT '관리 종류',
	`time_unit`	enum('day', 'week', 'month',  'quarter' ,     'year')	NOT NULL	COMMENT '시간 단위',
	`name`	varchar(30)	NOT NULL	COMMENT '참고즐겨찾기 명(unique)',
	`content`	text	NOT NULL	COMMENT '내용',
	`modification_datetime`	datetime	NOT NULL	COMMENT '수정 일시',
	`create_datetime`	datetime	NOT NULL	DEFAULT CURRENT_TIMESTAMP	COMMENT '생성 일시',
	`deletion_status`	enum('Y','N'	NOT NULL	COMMENT '삭제여부',
	`member_serial_number`	int	NOT NULL	COMMENT '멤버테이블 일련번호(autoincreament)'
);

CREATE TABLE `time_record` (
	`time_record_id`	int	NOT NULL	COMMENT '시간기록 id(autoincremeant)',
	`selection_date`	date	NOT NULL	COMMENT '선택 날짜.',
	`content`	text	NOT NULL	COMMENT '내용',
	`modification_datetime`	datetime	NOT NULL	COMMENT '수정 일시',
	`create_datetime`	datetime	NOT NULL	DEFAULT CURRENT_TIMESTAMP	COMMENT '생성 일시',
	`deletion_status`	enum('Y','N'	NOT NULL	COMMENT '삭제여부',
	`goal_content`	VARCHAR(255)	NULL,
	`member_serial_number`	int	NOT NULL	COMMENT '멤버테이블 일련번호(autoincreament)'
);

CREATE TABLE `activity_record` (
	`time_activity_record_id`	VARCHAR(255)	NOT NULL	COMMENT '활동 기록 id',
	`start_datetime`	datetime	NOT NULL	COMMENT '시작 시간값.(시분)',
	`end_datetime`	datetime	NOT NULL	COMMENT '종료 시간.(시분) 비고  선택 화면에 다음날짜의 시간까지 선택 가능',
	`classification_name`	varchar(30)	NOT NULL	DEFAULT unclassified	COMMENT '분류',
	`activity_content`	text	NOT NULL	COMMENT '활동 내용',
	`goal_content`	VARCHAR(255)	NULL	COMMENT '목표 내용',
	`outcome_content`	text	NOT NULL	COMMENT '활동내역',
	`reflection_content`	text	NOT NULL	DEFAULT 0	COMMENT '반성내용',
	`activity_score`	int	NULL	DEFAULT 0	COMMENT '활동점수(집중도)',
	`modification_datetime`	datetime	NOT NULL	COMMENT '수정 일시',
	`create_datetime`	datetime	NOT NULL	DEFAULT CURRENT_TIMESTAMP	COMMENT '생성 일시',
	`deletion_status`	enum('Y','N'	NOT NULL	COMMENT '삭제여부',
	`time_record_id`	int	NOT NULL	COMMENT '시간기록 id(autoincremeant)'
);

ALTER TABLE `indicator_classification` ADD CONSTRAINT `PK_INDICATOR_CLASSIFICATION` PRIMARY KEY (
	`indicator_classification_id`
);

ALTER TABLE `timely_indicators_record` ADD CONSTRAINT `PK_TIMELY_INDICATORS_RECORD` PRIMARY KEY (
	`timely_indicators_record_id`
);

ALTER TABLE `classification` ADD CONSTRAINT `PK_CLASSIFICATION` PRIMARY KEY (
	`classification_id`
);

ALTER TABLE `member` ADD CONSTRAINT `PK_MEMBER` PRIMARY KEY (
	`member_serial_number`
);

ALTER TABLE `reference_favorite_default_setting` ADD CONSTRAINT `PK_REFERENCE_FAVORITE_DEFAULT_SETTING` PRIMARY KEY (
	`serial_number`
);

ALTER TABLE `reference_favorite` ADD CONSTRAINT `PK_REFERENCE_FAVORITE` PRIMARY KEY (
	`reference_favorite_id`
);

ALTER TABLE `time_record` ADD CONSTRAINT `PK_TIME_RECORD` PRIMARY KEY (
	`time_record_id`
);

ALTER TABLE `activity_record` ADD CONSTRAINT `PK_ACTIVITY_RECORD` PRIMARY KEY (
	`time_activity_record_id`
);

