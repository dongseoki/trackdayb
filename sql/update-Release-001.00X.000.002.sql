ALTER TABLE trackday.file DROP COLUMN uuid;
ALTER TABLE trackday.file DROP COLUMN content_type;
ALTER TABLE trackday.file DROP COLUMN `path`;

ALTER TABLE trackday.file ADD store_file_name varchar(1000) NOT NULL COMMENT '저장 파일명';
ALTER TABLE trackday.file CHANGE store_file_name store_file_name varchar(1000) NOT NULL COMMENT '저장 파일명' AFTER original_file_name;
ALTER TABLE trackday.file MODIFY COLUMN original_file_name varchar(1000) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '업로드 파일명';
