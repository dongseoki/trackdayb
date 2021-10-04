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
  const [dateList, setDateList] = useState(['2021-09-10', '2021-09-12', '2021-09-13']);
  const [resultCode, setResultCode] = useState("");
  
  useEffect(() => {
      let body = {
        searchStartDatetime : props.searchStartDatetime,
        searchEndDatetime : props.searchEndDatetime,
      }
      const fetchActivityList = async () => {
        try {
          setActivityList(null);
          const result = await axios.post("/timeManage/getActivityListTEST", body);
          setActivityList(result.data.activityList);
          setResultCode(result.data.resultCode);
          console.log("resultCode : ", resultCode);
          // let dateArray = []
          // activityList.map((activity, index) => {
          //   dateArray.push(activity.startDatetime)
          // })
          // setDateList(dateArray);
        }
        catch(err) {
          console.error(err)
        }
      }
      fetchActivityList();
  }, [props.searchStartDatetime, props.searchEndDatetime]);
  if (!activityList) return null;

  console.log('dateList', dateList)
  return (
    <>
    
      
    <Timeline position="alternate">
      <p>TEST</p>
      {dateList && dateList.map((d, index) => (
      <TimelineItem key={index}>
              <TimelineOppositeContent
                sx={{ m: 'auto 0' }}
                variant="body2"
                color="text.secondary"
              >
                {d}
              </TimelineOppositeContent>
              <TimelineSeparator>
                <TimelineConnector />
                <TimelineDot color="primary">
                  11
                </TimelineDot>
                <TimelineConnector />
              </TimelineSeparator>
              <div className="activity-wrapper">
                <TimelineContent className="time-card" sx={{ py: '12px', px: 2 }}>
                  <Typography variant="h6" component="span">
                    hello
                  </Typography>
                  <Typography>content</Typography>
                </TimelineContent>

                <TimelineContent sx={{ py: '12px', px: 2 }}>
                  <Typography variant="h6" component="span">
                    hello
                  </Typography>
                  <Typography>content</Typography>
                </TimelineContent>
                
                <TimelineContent sx={{ py: '12px', px: 2 }}>
                  <Typography variant="h6" component="span">
                    hello
                  </Typography>
                  <Typography>content</Typography>
                </TimelineContent>
              </div>
            </TimelineItem>
    ))}
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
                <TimelineDot color="primary">
                  11
                </TimelineDot>
                <TimelineConnector />
              </TimelineSeparator>
              <TimelineContent sx={{ py: '12px', px: 2 }}>
                <Typography variant="h6" component="span">
                  {activity.title}
                </Typography>
                <Typography>{activity.content}</Typography>
              </TimelineContent>
              <div>hello</div>
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