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

import axiosInstance from "../axiosConfig";
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
          const result = await axios.get("/timeManage/activityList", {
            params:{
              searchStartDatetime :props.searchStartDatetime,
              searchEndDatetime : props.searchEndDatetime,
              orderColumn: "start_datetime",
              orderType: "asc",
            },
          });
          // 리스트에 세팅하기(원본)
          setActivityList(result.data.activityList);

          // 날짜만 뽑아서 key값으로 추가해두기
          let tmpActivityList = result.data.activityList;
          tmpActivityList.forEach((activity, index)=>{
            activity['writeDate'] = activity['startDatetime'].substring(0, 10)
          })
          // writeDate 기준 그룹바이 
          tmpActivityList = groupBy(tmpActivityList, 'writeDate')
          console.log("tmpActivityList", tmpActivityList)
          // 그룹바이 데이터 (실제 랜더링할 때 사용)
          setTmpList(tmpActivityList)
        }
        catch(err) {
          console.error(err)
        }
      }
      fetchActivityList();
  }, [props.searchStartDatetime, props.searchEndDatetime]);

  
  console.log('activityList', activityList)
  console.log('tmpList', tmpList)

  if (activityList.length === 0) {
    return (<div className="null-text">조회기간에 해당하는 활동내역이 없습니다.</div>)
  }

  else{
    return (
      <>
      <Timeline position="alternate">
        {activityList && Object.entries(tmpList).map((activityPerDay, index) => (
          <TimelineItem key={index}>
            <TimelineOppositeContent
              sx={{ m: 'auto 0' }}
              color="text.secondary"
            >
              <div className="date-wrapper">
                <div className="yearMonth-wrapper"><span>{activityPerDay[0].split('-')[0]}-</span><span>{activityPerDay[0].split('-')[1]}</span></div>
                <div className="day-wrapper">{activityPerDay[0].split('-')[2]}</div>
              </div>
            </TimelineOppositeContent>

          <div className="activityPerDay-wrapper">
            {activityPerDay[1].map((activity, index) => (
              <>
                <div key={index} name={activityPerDay[1].length} className="activity-card-wrapper">
                  <TimelineSeparator>
                    <TimelineConnector />
                      <TimelineDot className="activity-circle" style={{backgroundColor:activity.goalTitleInfo.color}}>
                      </TimelineDot>
                    <TimelineConnector />
                  </TimelineSeparator>
                  <TimelineContent sx={{ py: '12px', px: 2 }} className="time-card">
                    <div className="datetime-wrapper">
                      <Typography>{activity.startDatetime.substring(11,16)}-</Typography>
                      <Typography>{activity.endDatetime.substring(11,16)}</Typography>
                    </div>
                    <Typography className="activity-title" component="span">{activity.title}</Typography>
                    <Typography className="activity-content">{activity.content}</Typography>
                  </TimelineContent>
                </div>
              </>
              )
            )}
          </div>
                </TimelineItem>

              
          ))}
      </Timeline>
      </>
    );
  }
}