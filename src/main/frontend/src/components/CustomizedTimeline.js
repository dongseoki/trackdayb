import React, { useState, useEffect } from "react"
import Timeline from '@material-ui/lab/Timeline';
import TimelineItem from '@material-ui/lab/TimelineItem';
import TimelineSeparator from '@material-ui/lab/TimelineSeparator';
import TimelineConnector from '@material-ui/lab/TimelineConnector';
import TimelineContent from '@material-ui/lab/TimelineContent';
import TimelineOppositeContent from '@material-ui/lab/TimelineOppositeContent';
import TimelineDot from '@material-ui/lab/TimelineDot';
import Typography from '@mui/material/Typography';

import "./CustomizedTimeline.css";

import axios from "axios";


export default function CustomizedTimeline(props) {
  // getActivityListTEST
  // 검색결과(참조데이터:활동내역 리스트)
  const [activityList, setActivityList] = useState([]);
  
  
  // YYYY-MM-DD 형태로 반환
  function makeYYMMDD(value){
    return value.toISOString().substring(0,10);
}


  useEffect(() => {
      const fetchActivityList = async () => {
        try {
          setActivityList(null);
          const result = await axios.get("/timeManage/activityList", {
            params:{
              searchStartDatetime :props.searchStartDatetime,
              searchEndDatetime : props.searchEndDatetime,
            }
          });
          setActivityList(result.data.activityList);
          console.log("액티비티 리스트",result.data.activityList)
        }
        catch(err) {
          console.error(err)
        }
      }
      fetchActivityList();
  }, [props.searchStartDatetime, props.searchEndDatetime]);
  if (!activityList) return null;

  return (
    <>
    <Timeline position="alternate">
      <p>TEST</p>
      {activityList && activityList.map((activity, index) => (
              <TimelineItem key={activity.activityId}>
              <TimelineOppositeContent
                sx={{ m: 'auto 0' }}
                variant="body2"
                color="text.secondary"
              >
                {activity.startDatetime}
              </TimelineOppositeContent>
              <TimelineSeparator>
                <TimelineConnector />
                <TimelineDot style={{backgroundColor:activity.goalTitleInfo.color}}>
                  11
                </TimelineDot>
                <TimelineConnector />
              </TimelineSeparator>

              <TimelineContent className="time-card" sx={{ py: '12px', px: 2 }}>
                <div className="datetime-wrapper">
                  <Typography>{activity.startDatetime.substring(11,16)}-</Typography>
                  <Typography>{activity.endDatetime.substring(11,16)}</Typography>
                </div>
                <Typography variant="h6" component="span">
                  {activity.title}
                </Typography>
                <Typography>{activity.content}</Typography>
              </TimelineContent>

            </TimelineItem>
            
            // <GoalTitleCards key={index}
            //     title={goal.title}></GoalTitleCards>
        ))}

      <TimelineItem>
        <TimelineOppositeContent
          sx={{ m: 'auto 0' }}
          variant="body2"
          color="text.secondary"
        >
          10:00 am
        </TimelineOppositeContent>
        <TimelineSeparator>
          <TimelineConnector />
          <TimelineDot color="primary">
            11
          </TimelineDot>
          <TimelineConnector />
        </TimelineSeparator>
        <TimelineContent sx={{ py: '12px', px: 2 }}>
          <Typography variant="h6" component="span">
            Code
          </Typography>
          <Typography>Because it&apos;s awesome!</Typography>
        </TimelineContent>
      </TimelineItem>
      <TimelineItem>
        <TimelineSeparator>
          <TimelineConnector />
          <TimelineDot color="primary" variant="outlined">
            33
          </TimelineDot>
          <TimelineConnector sx={{ bgcolor: 'secondary.main' }} />
        </TimelineSeparator>
        <TimelineContent sx={{ py: '12px', px: 2 }}>
          <Typography variant="h6" component="span">
            Sleep
          </Typography>
          <Typography>Because you need rest</Typography>
        </TimelineContent>
      </TimelineItem>
      <TimelineItem>
        <TimelineSeparator>
          <TimelineConnector sx={{ bgcolor: 'secondary.main' }} />
          <TimelineDot color="secondary">
            44
          </TimelineDot>
          <TimelineConnector />
        </TimelineSeparator>
        <TimelineContent sx={{ py: '12px', px: 2 }}>
          <Typography variant="h6" component="span">
            Repeat
          </Typography>
          <Typography>Because this is the life you love!</Typography>
        </TimelineContent>
      </TimelineItem>
    </Timeline>
    </>
  );
}