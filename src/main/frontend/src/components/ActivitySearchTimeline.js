import React, { useContext } from "react"
import Timeline from '@material-ui/lab/Timeline';
import TimelineItem from '@material-ui/lab/TimelineItem';
import TimelineSeparator from '@material-ui/lab/TimelineSeparator';
import TimelineConnector from '@material-ui/lab/TimelineConnector';
import TimelineContent from '@material-ui/lab/TimelineContent';
import TimelineOppositeContent from '@material-ui/lab/TimelineOppositeContent';
import TimelineDot from '@material-ui/lab/TimelineDot';
import Typography from '@mui/material/Typography';
import "./ActivitySearchTimeline.css";
//Context
import { ActivitySearchListContext } from "../context/ActivitySearchListContext";
import { ActivitySearchGroupbyContext } from "../context/ActivitySearchGroupbyContext";

export default function ActivitySearchTimeline() {
  // getActivityListTEST
  // 참조데이터(전체 리스트 -> 파생 그룹바이)
  const [ activitySearchList,  ] = useContext(ActivitySearchListContext)
  const [ activitySearchGroupby,  ] = useContext(ActivitySearchGroupbyContext)
  
  if (activitySearchList.length === 0) {
    return (<div className="null-text">조회기간에 해당하는 활동내역이 없습니다.</div>)
  }

  else{
    return (
      <>
      <Timeline position="alternate">
        { activitySearchList && Object.entries(activitySearchGroupby).map((activityPerDay, index) => (
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
                      {activity.goalTitleInfo.goalId ? <span className="activity-parentGoal" style={{backgroundColor : hexToRgba(activity.goalTitleInfo.color)}}>{activity.goalTitleInfo.title}</span> : null}
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


// hex to rgba
function hexToRgba ( hexType ){ 
  if(!hexType){
    return "rgba(130,143,146, 0.08)";
  }else{
  /* 맨 앞의 "#" 기호를 삭제하기. */ 
  var hex = hexType.trim().replace( "#", "" ); 
  
  /* rgb로 각각 분리해서 배열에 담기. */ 
  var rgb = ( 3 === hex.length ) ? 
  hex.match( /[a-f\d]/gi ) : hex.match( /[a-f\d]{2}/gi );     
  
  rgb.forEach(function (str, x, arr){     
      /* rgb 각각의 헥사값이 한자리일 경우, 두자리로 변경하기. */ 
      if ( str.length === 1 ) str = str + str; 
      
      /* 10진수로 변환하기. */ 
      arr[ x ] = parseInt( str, 16 ); 
  }); 
  
  return "rgba(" + rgb.join(", ") + ", 0.1)"; 
  }
} 