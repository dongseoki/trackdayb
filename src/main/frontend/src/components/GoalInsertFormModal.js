import React, { useState, useEffect } from "react";
//css
import { makeStyles } from '@material-ui/core/styles';
import axios from "axios";
//icon
import { FaPlus, FaLock } from "react-icons/fa";
//modal
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
//goalInsertForm
import TextField from '@material-ui/core/TextField';
import DateRangePickerCustom from './DateRangePickerCustom';
import randomColor from "randomcolor";
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
// 토글버튼
import ToggleButton from '@mui/material/ToggleButton';

//slider-score
import Slider from '@mui/material/Slider';
import GoalTitleListModal from "./GoalTitleListModal";


function GoalInsertFormModal(){
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [startDatetime, setStartDatetime] = useState(new Date());
    const [endDatetime, setEndDatetime] = useState(new Date());
    const [toggleSelected, setToggleSelected] = useState(false)
    const [shareStatus, setshareStatus] = useState("N");
    const [color, setColor] = useState(randomColor());
    const [kind, setKind] = useState('regular');
    const [progressRate, setProgressRate] = useState("");
    const defaultSearchTime = " 09:00:00";
  
    const useStyles = makeStyles((theme) => ({
      modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      },
      paper: {
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
      },
    }));
  
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
  
    const handleOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };
  
    const handleSubmit = async (evt) => {
      evt.preventDefault();
      const formData = {
        "parentId":"",
        "title": title,
        "kind":kind,
        "content":content,
        "startDatetime": makeYYMMDD(startDatetime) + defaultSearchTime,
        "endDatetime":makeYYMMDD(endDatetime) + defaultSearchTime,
        "progressRate":progressRate,
        "color":color
      }
      console.log('제출', formData)
      try{
        const result = await axios.post("/goalManage/goal2", formData);
        console.log("제출결과", {result})
      }catch(err){
        console.error(err)
      }
    };
  
    return (
      <div>
        <button className="goal-insert-btn" onClick={handleOpen}><FaPlus /></button>
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
              <h2 id="transition-modal-title">목표 리스트</h2>
              <p id="transition-modal-description">활동과 관련된 목표를 선택하세요</p>
              <GoalInsertForm 
                title={title}
                setTitle={setTitle}
                content = {content}
                setContent = {setContent}
                startDatetime = {startDatetime}
                setStartDatetime = {setStartDatetime}
                endDatetime={endDatetime}
                setEndDatetime = {setEndDatetime}
                toggleSelected={toggleSelected}
                setToggleSelected={setToggleSelected}
                shareStatus={shareStatus}
                setshareStatus={setshareStatus}
                color={color}
                setColor = {setColor}
                kind={kind}
                setKind={setKind}
                progressRate={progressRate}
                setProgressRate={setProgressRate}
              />
              <button type="submit" onClick={handleSubmit}>제출</button>
              <button type="button" onClick={handleClose}>CLOSE</button>
            </div>
          </Fade>
        </Modal>
      </div>
    );
  }
  
  function GoalInsertForm({
    title, setTitle, content, setContent, startDatetime, setStartDatetime,
    endDatetime, setEndDatetime, toggleSelected, setToggleSelected, 
  shareStatus, setshareStatus, color, setColor, kind, setKind, progressRate, setProgressRate}){

    return (
      <>
        <div className="top-wrapper">
          <DateRangePickerCustom 
            startDate={startDatetime}
            endDate={endDatetime}
            setStartDate={setStartDatetime} 
            setEndDate={setEndDatetime}/>
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
        <MultilineTextFields 
        value={content}
        setValue={setContent}/>
        <div className="tag-color-preview" style={{backgroundColor:color}}></div>
        <TextField 
          className="textfield-title"
          id="color" 
          label="태그컬러" 
          size="small" 
          variant="outlined"
          value={color}
          InputLabelProps={{
            shrink: true,
          }}
          onChange={function(e){
            setColor(e.target.value)
          }}></TextField>
          <FormControl component="fieldset">
            <FormLabel component="legend">목표유형</FormLabel>
            <RadioGroup row aria-label="kind" name="row-radio-buttons-group" value={kind} 
            onChange={(e)=>{
              setKind(e.target.value)
            }} >
              <FormControlLabel value="regular" control={<Radio />} label="주기성 목표" />
              <FormControlLabel value="deadline" control={<Radio />} label="기한성 목표" />
            </RadioGroup>
          </FormControl>
          <PeriodicityInfo kind={kind}/>
          <label>진행률</label>
          <Slider
            className="slider-score"
            size="small"
            aria-label="progressRate"
            defaultValue={0}
            valueLabelDisplay="auto"
            step={10}
            marks
            min={0}
            max={100}
            onChange={function(e){
              setProgressRate(e.target.value)
            }}
          />
          <GoalTitleListModal />     
      </>
    )
  }
  
  function PeriodicityInfo({kind}) {
      if(kind === "regular"){
          return(<div>매주 매월 어쩌구</div>)
      }else{
          return null
      }
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


  // YYYY-MM-DD 형태로 반환
function makeYYMMDD(value){
    return value.toISOString().substring(0,10);
}
function toggleToString(value){
    if(value){ //공개하겠다
      return "Y"
    }else{
      return "N"
    }
  }

  export default GoalInsertFormModal;