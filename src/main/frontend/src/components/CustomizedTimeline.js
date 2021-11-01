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
  const [tmpList, setTmpList ] = useState({});
  
  // YYYY-MM-DD 형태로 반환
  function makeYYMMDD(value){
    return value.toISOString().substring(0,10);
}

var groupBy = function(xs, key) {
  return xs.reduce(function(rv, x) {
    (rv[x[key]] = rv[x[key]] || []).push(x);
    return rv;
  }, {});
};


  useEffect(() => {
      const fetchActivityList = async () => {
        try {
          setActivityList(null);
          const result = await axios.get("/timeManage/activityList", {
            params:{
              searchStartDatetime :props.searchStartDatetime,
              searchEndDatetime : props.searchEndDatetime,
              orderColumn: "start_datetime",
              orderType: "asc",
            }
          });

          console.log('result.data.activityList', result.data.activityList)

          // 날짜만 뽑아서 key값으로 추가해두기
          let tmpActivityList = result.data.activityList;
          tmpActivityList.forEach((activity, index)=>{
            activity['writeDate'] = activity['startDatetime'].substring(0, 10)
          })
          // console.log(tmpActivityList)
          
          // writeDate 기준 그룹바이 
          tmpActivityList = groupBy(tmpActivityList, 'writeDate')
          console.log("tmpActivityList", tmpActivityList)
          setTmpList(tmpActivityList)

          // 리스트에 세팅하기
          setActivityList(result.data.activityList);
        }
        catch(err) {
          console.error(err)
        }
      }
      fetchActivityList();
      console.log("tmpList", tmpList)
  }, [props.searchStartDatetime, props.searchEndDatetime]);
  if (!activityList) return null;

  console.log('Object.entries(tmpList)', Object.entries(tmpList))
  
  return (
    <>
    <Timeline position="alternate">
      {Object.entries(tmpList).map((activityPerDay, index) => (
        <TimelineItem key={index}>
          <TimelineOppositeContent
            sx={{ m: 'auto 0' }}
            color="text.secondary"
          >
            {activityPerDay[0]}
          </TimelineOppositeContent>

        <div className="activityPerDay-wrapper">
          {activityPerDay[1].map((activity, index) => (
            <>
            <div key={activity} className="activity-card-wrapper">
              <TimelineSeparator>
                <TimelineConnector />
                  <TimelineDot className="activity-circle" style={{backgroundColor:activity.goalTitleInfo.color}}>
                  </TimelineDot>
                <TimelineConnector />
              </TimelineSeparator>

              <TimelineContent className="time-card" sx={{ py: '12px', px: 2 }}>
                <div className="datetime-wrapper">
                  <Typography>{activity.startDatetime.substring(11,16)}-</Typography>
                  <Typography>{activity.endDatetime.substring(11,16)}</Typography>
                </div>
                <Typography className="activity-title" component="span">{activity.title}</Typography>
                <Typography className="activity-content">{activity.content}</Typography>
              </TimelineContent>
            </div>
          </>

              ))}
</div>
              </TimelineItem>

            
        ))}
    </Timeline>
    </>
  );
}