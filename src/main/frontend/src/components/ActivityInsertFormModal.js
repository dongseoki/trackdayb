import React, { useState } from "react";
import "./ActivityInsertFormModal.css"
//toggle
import ToggleButton from '@mui/material/ToggleButton';
//slider-score
import Slider from '@mui/material/Slider';
// import axios from 'axios';
import axiosInstance from "../axiosConfig";
//icon
import { FaPlus } from "react-icons/fa";
import { BiLock } from "react-icons/bi";
//css
import { makeStyles } from '@material-ui/core/styles';
//modal
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
//time picker
import TextField from '@material-ui/core/TextField';
import {toast} from "react-toastify";
import GoalTitleListModal from "./GoalTitleListModal";
import { useMediaQuery } from "react-responsive";
import { useDispatch } from 'react-redux';
import { ADD_ACTIVITY_REQUEST } from "../reducers/activity";
import dayjs from "dayjs";

function ActivityInsertFormModal({writeDate, activityList, setActivityList, activitySearchList, setActivitySearchList}){
  const dispatch = useDispatch();

    //write Form
    const [startDatetime, setStartDatetime] = useState("");
    const [endDatetime, setEndDatetime] = useState("");
    const [shareStatus, setshareStatus] = useState(false);
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [activityScore, setActivityScore] = useState(0)
    const [parentGoalTitle, setParentGoalTitle] = useState("");
    const [parentId, setParentId] = useState("");
    const [parentProgressRate, setParentProgressRate] = useState(0);
       
    const InitializeForm = ()=>{
      setStartDatetime("");
      setEndDatetime("");
      setshareStatus(false);
      setTitle("");
      setContent("");
      setActivityScore(0);
      setParentGoalTitle('없음');
      setParentId("");
      setParentProgressRate(0);
    }
    
    // 반응형 화면 BreakPoint
    const isMobileScreen = useMediaQuery({
        query: "(max-width: 440px)",
    });
    
    // 모달 설정
    const useStyles = makeStyles((theme) => ({
      modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      },
      paper: {
        backgroundColor: theme.palette.background.paper,
        borderRadius: "10px",
        boxShadow: theme.shadows[5],
        padding: theme.spacing(1,1,  2, 2),
        width: "470px",
        fontSize: "14px"
      },
      paperMobile: {
        backgroundColor: theme.palette.background.paper,
        borderRadius: "10px",
        boxShadow: theme.shadows[5],
        padding: theme.spacing(1, 1, 2, 2),
        width: "100%",
        fontSize: "14px"
      },
    }));
    
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);

    const handleOpen = () => {
      setOpen(true);
      InitializeForm()
    };

    const handleClose = () => {
      setOpen(false);
      InitializeForm()
    };

    const handleSubmit = async (evt) => {
      evt.preventDefault();
      // 역기간 검사
      const dateRangeValidation = ()=>{
        if(startDatetime > endDatetime){
          return false
        }else return true
      }

      if(!dateRangeValidation()){
        toast.error("올바른 진행기간을 입력하세요.", {
          autoClose : 5000
        })
      }else {
        const formData_activity = {
          goalId:parentId,
          title : title,
          startDatetime: dayjs(writeDate).format("YYYY-MM-DD") +' '+ startDatetime + ':00',
          endDatetime: dayjs(writeDate).format("YYYY-MM-DD") +' '+ endDatetime + ':00',
          content : content,
          activityScore : activityScore,
          shareStatus: shareStatus ? "N":"Y",
        };

        //활동 추가
        dispatch({
          type : ADD_ACTIVITY_REQUEST,
          data : formData_activity
        })
        
        try{
          //목표진행률 업데이트
          if(parentId){
            const formData_goal = {
              goalId : parentId,
              progressRate : parentProgressRate
            }
            const result_goal = await axiosInstance.patch("/goalManage/goal/progress-rate", formData_goal)
          }
          handleClose();
          // 기존 리스트들에 추가 업데이트(시작시간 기준 정렬)
          // function data_sorting(a, b) {
          //   var dateA = new Date(a['startDatetime']).getTime();
          //   var dateB = new Date(b['startDatetime']).getTime();
          //   return dateA > dateB ? 1 : -1;
          // };
          // setActivityList([...activityList, result_activity.data.activityInfo].sort(data_sorting))
          // setActivitySearchList([...activitySearchList, result_activity.data.activityInfo].sort(data_sorting))
        } catch(err){
          console.error(err)
        }
      }
    };
  
    return(
      <div className="insert-form">
        <button className="acitvity-insert-btn" onClick={handleOpen}><FaPlus /></button>
          <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            className={classes.modal}
            open={open}
            onClose={handleClose}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
              timeout: 500,
            }}
          >
          <Fade in={open}>
          
            <div className= {isMobileScreen ? classes.paperMobile : classes.paper}>
              <h3 id="transition-modal-title">활동 추가</h3>
              {/* <div>작성일 : {writeDate}</div> */}
              <form className="activity-form" onSubmit={handleSubmit}>
                <div className="top-wrapper">
                  <div className ="modal-time-picker">
                    <TimePickers 
                      id='starttime'
                      label='시작시간'
                      value={startDatetime}
                      setTime={setStartDatetime}
                    />
                    <p>~</p>
                    <TimePickers 
                      id='endtime'
                      label='종료시간'
                      value={endDatetime}
                      setTime={setEndDatetime}
                    />
                  </div>
                  <div className="modal-share-toggle">
                    <div className="modal-title">비공개</div>
                      <ToggleButton
                      color="primary"
                      value="check"
                      selected={shareStatus}
                      onChange={() => {
                        setshareStatus(!shareStatus);
                      }}
                      >
                        <BiLock className="lock-icon"/>
                      </ToggleButton>
                    </div>
                  </div>
                  <TextField 
                    required
                    id="title" 
                    label="제목" 
                    size="small" 
                    variant="outlined"
                    style={{width:"100%", marginBottom:"10px"}}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    onChange={function(e){
                      setTitle(e.target.value)
                    }}/>
                  <TextField
                    style={{width:"100%", marginBottom:"10px"}}
                    id="content"
                    label="내용"
                    multiline
                    rows={4}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    variant="outlined"
                    value={content}
                    onChange={function(e){
                      setContent(e.target.value)
                    }}
                  />
                <div className="slider-wrapper">
                  <label className="modal-title">몰입도</label>
                  <div className="slider-border">
                    <Slider
                      style={{width:"90%"}}
                      aria-label="activityScore"
                      defaultValue={0}
                      valueLabelDisplay="auto"
                      step={1}
                      marks
                      min={0}
                      max={10}
                      value={parseInt(activityScore)}
                      onChange={function(e){
                        setActivityScore(e.target.value)
                      }}
                    />
                  </div>
                </div>
                <div className="parent-modal-wrapper">
                  <GoalTitleListModal 
                    parentGoalTitle={parentGoalTitle}
                    setParentGoalTitle={setParentGoalTitle}
                    parentId={parentId}
                    setParentId={setParentId}
                    setParentProgressRate={setParentProgressRate}
                    writeDate={writeDate}
                  />
                  <div className="parent-title">{parentGoalTitle}</div>
                </div>

                {/* 관련 목표가 없음이면 목표 진행률 노출 없음 */}
                {parentGoalTitle === '없음' ? null : <div className="slider-wrapper">
                  <label className="modal-title">목표 진행률</label>
                  <div className="slider-border">
                    <Slider
                      style={{width:"90%"}}
                      aria-label="parentProgressRate"
                      defaultValue={0}
                      valueLabelDisplay="auto"
                      step={10}
                      marks
                      min={0}
                      max={100}
                      value={parseInt(parentProgressRate)}
                      onChange={function(e){
                        setParentProgressRate(e.target.value)
                      }}
                    />
                  </div>
                </div>}

                
                <div className="button-wrapper">
                  <button type="submit" className="submitBtn">저장</button>
                  <button type="button" className="cancleBtn" onClick={handleClose}>취소</button>
                </div>
              </form>
            </div>
          </Fade>  
        </Modal>
      </div>
    )
  }
  
function TimePickers(props){
    function setTime(e){
      e.preventDefault();
      props.setTime(e.target.value);
    }
    const useStyles = makeStyles((theme) => ({
      textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: 200,
      },
    }));
    const classes = useStyles();
  
    return (
        <TextField
          required
          id={props.id}
          label={props.label}
          value={props.value}
          type="time"
          onChange={setTime}
          className={classes.textField}
          InputLabelProps={{
            shrink: true,
          }}
          inputProps={{
            step: 300, // 5 min
          }}
        />
    );
  }
  
  
  export default ActivityInsertFormModal