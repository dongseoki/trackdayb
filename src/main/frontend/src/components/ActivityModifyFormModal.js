import React, { useState, useContext } from "react";
import "./ActivityInsertFormModal.css"
//toggle
import ToggleButton from '@mui/material/ToggleButton';
//slider-score
import Slider from '@mui/material/Slider';
import axios from 'axios';
//icon
import { BiEdit } from "react-icons/bi";
import { FaLock } from "react-icons/fa";
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

import GoalTitleListModal from "./GoalTitleListModal";
import { ActivitySearchListContext } from "../context/ActivitySearchListContext";
import { ActivitySearchGroupbyContext } from "../context/ActivitySearchGroupbyContext";

function ActivityModifyFormModal({modifyData, targetIndex}){
    
    const [ activitySearchList, setActivitySearchList ] = useContext(ActivitySearchListContext);
    const [ activitySearchGroupby, setActivitySearchGroupby] = useContext(ActivitySearchGroupbyContext);
    // const [ , , startDatetime, setStartDatetime,endDatetime, setEndDatetime] = useContext(GoalModalSearchTitleListContext);

    const YNtoTF = (value)=>{
        if(value === "Y"){
            return true
        }else{
            return false
        }
    }

    // 초기화 폼
    const [startDatetime, setStartDatetime] = useState("");
    const [endDatetime, setEndDatetime] = useState("");
    const [shareStatus, setshareStatus] = useState(false);
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [activityScore, setActivityScore] = useState(0)
    const [parentGoalTitle, setParentGoalTitle] = useState("");
    const [parentId, setParentId] = useState("");
    const [parentProgressRate, setParentProgressRate] = useState(0);

    const ModifySettingForm = () =>{
        setStartDatetime(modifyData.startDatetime.substring(11,16))
        setEndDatetime(modifyData.endDatetime.substring(11,16))
        setshareStatus(!YNtoTF(modifyData.shareStatus));
        setTitle(modifyData.title);
        setContent(modifyData.content);
        setActivityScore(modifyData.activityScore);
        setParentGoalTitle(modifyData.goalTitleInfo.title);
        setParentId(modifyData.goalId);
        setParentProgressRate(modifyData.goalTitleInfo.parentProgressRate)
    }

    const useStyles = makeStyles((theme) => ({
        modal: {
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        },
        paper: {
          backgroundColor: theme.palette.background.paper,
          // border: '2px solid #000',
          borderRadius: "10px",
          boxShadow: theme.shadows[5],
          padding: theme.spacing(1, 3, 2),
        },
    }));

    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => {
        console.log('modify', modifyData)
        setOpen(true);
        ModifySettingForm();
    };
    
    const handleClose = () => {
        setOpen(false);
    };

    const handleFormSubmit = async (evt) =>{
        evt.preventDefault();
        console.log("제출버튼")
    }
    return ( 
    <div>
    <button className="modifyBtn" variant="outlined" onClick={handleOpen}>
      <BiEdit style={{verticalAlign:"middle"}} title="수정"/>
    </button>
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
        <div className={classes.paper}>
          <h3 id="transition-modal-title">활동 수정</h3>
          <form onSubmit={handleFormSubmit}>
                <div className="top-wrapper">
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
                    value={title}
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
);
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
  

export default ActivityModifyFormModal