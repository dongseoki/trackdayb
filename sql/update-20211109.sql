/* activity table 인덱스 설정. */
CREATE INDEX activity_title_IDX USING BTREE ON trackday.activity (title);
CREATE INDEX activity_start_datetime_IDX USING BTREE ON trackday.activity (start_datetime);
CREATE INDEX activity_end_datetime_IDX USING BTREE ON trackday.activity (end_datetime);

/* goal table 인덱스 설정. */
CREATE INDEX goal_title_IDX USING BTREE ON trackday.goal (title);
CREATE INDEX goal_parent_id_IDX USING BTREE ON trackday.goal (parent_id);
CREATE INDEX goal_start_datetime_IDX USING BTREE ON trackday.goal (start_datetime);
CREATE INDEX goal_end_datetime_IDX USING BTREE ON trackday.goal (end_datetime);

/* member table 인덱스 설정. */
CREATE INDEX member_member_id_IDX USING BTREE ON trackday.`member` (member_id);
