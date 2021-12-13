UPDATE goal as g1
INNER JOIN goal as g2
on g1.goal_id =g2.goal_id 
SET g1.start_datetime = DATE_FORMAT(g2.start_datetime, '%Y-%m-%d 00:00:00');

UPDATE goal as g1
INNER JOIN goal as g2
on g1.goal_id =g2.goal_id 
SET g1.end_datetime = DATE_FORMAT(g2.end_datetime , '%Y-%m-%d 23:59:59')