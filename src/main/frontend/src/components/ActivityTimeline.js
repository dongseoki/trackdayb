import React, { useState, useEffect } from "react"
import Timeline from '@material-ui/lab/Timeline';
import TimelineItem from '@material-ui/lab/TimelineItem';
import TimelineSeparator from '@material-ui/lab/TimelineSeparator';
import TimelineConnector from '@material-ui/lab/TimelineConnector';
import TimelineContent from '@material-ui/lab/TimelineContent';
import TimelineOppositeContent from '@material-ui/lab/TimelineOppositeContent';
import TimelineDot from '@material-ui/lab/TimelineDot';
import Typography from '@mui/material/Typography';

import axiosInstance from "../axiosConfig";
import axios from "axios";

import "./ActivityTimeline.css";

export default function ActivityTimeline({writeDate}) {
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
            const result = await axios.get("/timeManage/activityList", {
              params:{
                searchStartDatetime :makeYYMMDD(writeDate),
                searchEndDatetime : makeYYMMDD(writeDate),
                orderColumn: "start_datetime",
                orderType: "asc",
              },
            });
            //리스트에 세팅하기(원본)
            setActivityList(result.data.activityList);
          }
          catch(err) {
            console.error(err)
          }
        }
        fetchActivityList();
    }, [writeDate]);

  if (activityList.length === 0) {
    return (<div className="null-text">조회기간에 해당하는 활동내역이 없습니다.</div>)
  }

  else{
    return (
      <>
      <Timeline className="activity-timeline">
        {activityList && activityList.map((activity, index) => (
            <TimelineItem key={index}>
                <div key={index} className="activity-card-wrapper">
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
            </TimelineItem>
          ))}
      </Timeline>
      </>
    );
  }
}