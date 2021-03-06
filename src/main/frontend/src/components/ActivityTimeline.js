import React, { useState } from "react"
import Timeline from '@material-ui/lab/Timeline';
import TimelineItem from '@material-ui/lab/TimelineItem';
import TimelineSeparator from '@material-ui/lab/TimelineSeparator';
import TimelineConnector from '@material-ui/lab/TimelineConnector';
import TimelineContent from '@material-ui/lab/TimelineContent';
import TimelineDot from '@material-ui/lab/TimelineDot';
import Typography from '@mui/material/Typography';
//icon
import { RiDeleteBinLine } from "react-icons/ri";
import { BiLock } from "react-icons/bi";

// 삭제버튼
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';

import "./ActivityTimeline.css";
import ActivityInsertFormModal from "../components/ActivityInsertFormModal";
import ActivityModifyFormModal from "../components/ActivityModifyFormModal";

import { useDispatch, useSelector } from "react-redux";
import { DELETE_ACTIVITY_REQUEST, LOAD_ACTIVITYDAYLIST_REQUEST } from "../reducers/activity";


import sortArray from 'sort-array';


export default function ActivityTimeline({writeDate}) {
  const dispatch = useDispatch();
    // 오늘의 활동내역 리스트
    const { activityDayList } = useSelector((state) => state.activity);

    sortArray(activityDayList, {
      by : 'startDatetime',
      order : 'asc'
    })
    
  if (activityDayList.length === 0) {
    return (
      <>
      <div className="writeForm">
        <ActivityInsertFormModal 
          writeDate={writeDate}
          // activityList = {activityList}
          // setActivityList = {setActivityList}
          // activitySearchList={activitySearchList}
          // setActivitySearchList = {setActivitySearchList}
        />
      </div>

      <div className="null-text">조회기간에 해당하는 활동내역이 없습니다.</div>
      </>
    )
  }

  else{
    return (
      <>
      <div className="writeForm">
        <ActivityInsertFormModal 
          writeDate={writeDate}
          // activityList = {activityList}
          // setActivityList = {setActivityList}
          // activitySearchList={activitySearchList}
          // setActivitySearchList = {setActivitySearchList}
        />
      </div>
      
      <div className="cards">
        <Timeline className="activity-timeline">
          {activityDayList && activityDayList.map((activity, index) => (
              <TimelineItem key={index}>
                  <div key={index} className="activity-card-wrapper">
                      <TimelineSeparator>
                          <TimelineConnector />
                          <TimelineDot className="activity-circle" style={{backgroundColor:activity.goalTitleInfo.color}}>
                          </TimelineDot>
                          <TimelineConnector />
                      </TimelineSeparator>
                      <TimelineContent sx={{ py: '12px', px: 2 }} className="time-card">
                        <div className="card-top-wrapper">
                          <div className="datetime-wrapper">
                            <Typography>{activity.startDatetime.substring(11,16)}-</Typography>
                            <Typography>{activity.endDatetime.substring(11,16)}</Typography>
                          </div>
                          <div className="card-button-wrapper">
                            {(activity.shareStatus==="N") ? (<BiLock className="lock-icon" title="비공개"/>) : null}
                            <ActivityModifyFormModal 
                              writeDate = {writeDate}
                              modifyData = {activityDayList.find(v => v.activityId == activity.activityId)}
                              targetIndex={index}
                              // activityList = {activityList}
                              // setActivityList = {setActivityList}
                            />
                            <DeleteModal 
                              activityId = {activity.activityId}
                              // activityList = {activityList}
                              // setActivityList = {setActivityList}
                              // activitySearchList={activitySearchList}
                              // setActivitySearchList = {setActivitySearchList}
                            />
                          </div>
                        </div>
                      
                        
                        <Typography className="activity-title" component="span">{activity.title}</Typography>
                        <Typography className="activity-content">{activity.content}</Typography>
                        {activity.goalTitleInfo.goalId ? <span className="activity-parentGoal" style={{backgroundColor : hexToRgba(activity.goalTitleInfo.color)}}>{activity.goalTitleInfo.title}</span> : null}
                      </TimelineContent>
                  </div>
              </TimelineItem>
            ))}
        </Timeline>
      </div>
      
      </>
    );
  }
}


// 삭제 버튼 모달
function DeleteModal({activityId, activityList, setActivityList, activitySearchList, setActivitySearchList}) {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const deleteHandler = async ()=>{
    try{
      dispatch({
        type : DELETE_ACTIVITY_REQUEST,
        data : {
          activityId: activityId
        }
      })
      // const result= await axiosInstance.delete("/timeManage/activity", {
      //   params:{
      //     activityId: activityId
      //   }
      // })
      handleClose()
      // setActivityList(activityList.filter(activity => activity.activityId !== activityId))
      // setActivitySearchList(activitySearchList.filter(activity => activity.activityId !== activityId))
    }catch(err){
      console.error(err)
    }
  }

  return (
    <>
      <button className="deleteBtn" variant="outlined" onClick={handleClickOpen}>
        <RiDeleteBinLine style={{verticalAlign:"middle"}} title="삭제"/>
      </button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"정말 삭제하시겠습니까?"}
        </DialogTitle>
        <DialogActions>
          <Button onClick={handleClose}>취소</Button>
          <Button onClick={deleteHandler} autoFocus>
            삭제
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
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