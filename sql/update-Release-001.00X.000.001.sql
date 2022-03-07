ALTER TABLE trackday.file CHANGE file_name original_file_name varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '확장자명을 포함한 이름';

ALTER TABLE trackday.file MODIFY COLUMN `path` varchar(1000) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '경로명';
ALTER TABLE trackday.file MODIFY COLUMN original_file_name varchar(1000) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '확장자명을 포함한 이름';

ALTER TABLE trackday.file CHANGE extension_name content_type varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '컨텐츠 타입';
ALTER TABLE trackday.file MODIFY COLUMN content_type varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '컨텐츠 타입';

ALTER TABLE trackday.file ADD uuid varchar(300) NULL;
ALTER TABLE trackday.file CHANGE uuid uuid varchar(300) NULL AFTER original_file_name;
