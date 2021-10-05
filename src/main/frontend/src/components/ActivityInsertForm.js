import React, { useEffect, useState } from "react";
//toggle
import ToggleButton from '@mui/material/ToggleButton';
//slider-score
import Slider from '@mui/material/Slider';
import axios from 'axios';
//icon
import { FaLock } from "react-icons/fa";
//css
import { makeStyles } from '@material-ui/core/styles';

//time picker
import TextField from '@material-ui/core/TextField';

import GoalTitleListModal from "./GoalTitleListModal";

function ActivityInsertForm({writeDate}){
    //write Form
    //toggle- 비공개
    const [toggleSelected, setToggleSelected] = useState(false)
    const [shareStatus, setshareStatus] = useState("N");
    const [startDatetime, setStartDatetime] = useState("");
    const [endDatetime, setEndDatetime] = useState("");
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [activityScore, setActivityScore] = useState("")
    const [parentGoalTitle, setParentGoalTitle] = useState("");
    const [parentGoalId, setParentGoalId] = useState("");
    const [parentGoalKind, setParentGoalKind] = useState("");

    const handleSubmit = async (evt) => {
      evt.preventDefault();
      const formData = {
        goalId:parentGoalId,
        title : title,
        startDatetime: writeDate +' '+ startDatetime + ':00',
        endDatetime: writeDate +' '+ endDatetime + ':00',
        content : content,
        activityScore : activityScore,
        shareStatus : shareStatus,
      };    
      console.log("formData", formData)
      try{
        const result = await axios.post("/timeManage/activityTEST", formData);
        console.log({result})
      } catch(err){
        console.error(err)
      }
    };
  
    return(
      <form onSubmit={handleSubmit}>
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
        <ToggleButton
        color="primary"
        value="check"
        selected={toggleSelected}
        onChange={() => {
          setToggleSelected(!toggleSelected);
          setshareStatus(toggleToString(toggleSelected));
        }}
      ><FaLock/>
      </ToggleButton>
        </div>
        <p>목표선택</p>
        <p>{parentGoalTitle}</p>
        <GoalTitleListModal 
          parentGoalTitle={parentGoalTitle}
          setParentGoalTitle={setParentGoalTitle}
          parentGoalId={parentGoalId}
          setParentGoalId={setParentGoalId}
          parentGoalKind = {parentGoalKind}
          setParentGoalKind = {setParentGoalKind}
        />     
        <div className="title-wrapper">
        <TextField 
        className="textfield-title"
          id="title" 
          label="제목" 
          size="small" 
          variant="outlined"
          InputLabelProps={{
            shrink: true,
          }}
          onChange={function(e){
            setTitle(e.target.value)
          }}/>
          </div>
          <div className="content-wrapper">
        <MultilineTextFields 
          value={content}
          setValue={setContent}/>
          </div>
          <div className="activityScore-wrapper">
          <p>몰입도평가</p>
        <Slider
          className="slider-score"
          size="small"
          aria-label="activityScore"
          defaultValue={30}
          valueLabelDisplay="auto"
          step={10}
          marks
          min={0}
          max={100}
          onChange={function(e){
            setActivityScore(e.target.value)
          }}
        />
        {/* <PeriodicityInfo kind={parentGoalKind}/> */}
        </div>
        <input type="submit" value="Submit" />
      </form>
    )
  }


//   function PeriodicityInfo({kind}) {
//     console.log("kidn", kind)
//     if(kind === "deadline"){
//         return(<div>기한성은 진도율 수정가능</div>)
//     }else{
//         return null
//     }
// }

  
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
  
  
function MultilineTextFields(props) {
    function setValue(e){
      e.preventDefault();
      props.setValue(e.target.value);
    }
    return (
        <div>
          <TextField
            className="textfeild-content"
            id="content"
            label="내용"
            multiline
            rows={4}
            InputLabelProps={{
              shrink: true,
            }}
            variant="outlined"
            value={props.value}
            onChange={setValue}
          />
        </div>
    );
  }

  function toggleToString(value){
    if(value){ //공개하겠다
      return "Y"
    }else{
      return "N"
    }
  }
  
  
  export default ActivityInsertForm