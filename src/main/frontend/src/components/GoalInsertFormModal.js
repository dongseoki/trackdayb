import React, { useState, useContext } from "react";
import axios from "axios";
//css
import { makeStyles } from '@material-ui/core/styles';
import "./GoalInsertFormModal.css"
//icon
import { FaPlus } from "react-icons/fa";
import { BiLock } from "react-icons/bi";
//modal
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import randomColor from "randomcolor";
//goalInsertForm
import TextField from '@material-ui/core/TextField';
import DateRangePickerCustom from './DateRangePickerCustom';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import ToggleButton from '@mui/material/ToggleButton';
import Slider from '@mui/material/Slider';
import FormGroup from '@mui/material/FormGroup';
import Checkbox from '@mui/material/Checkbox';
import { HexColorPicker } from "react-colorful";
// 전체목표제목리스트
import GoalTitleListModal from "./GoalTitleListModal";
import { GoalTotalTitleListContext } from "../context/GoalTotalTitleListContext";
import { GoalModalSearchTitleListContext } from "../context/GoalModalSearchTitleListContext";

function GoalInsertFormModal({goalFullList, setGoalFullList, goalSearchTitleList, setGoalSearchTitleList}){
  const [ , , updateTotalTitle, setUpdateTotalTitle ] = useContext(GoalTotalTitleListContext);
  const [ , , startDatetime, setStartDatetime,endDatetime, setEndDatetime] = useContext(GoalModalSearchTitleListContext);

  // const [startDatetime, setStartDatetime] = useState(new Date());
  // const [endDatetime, setEndDatetime] = useState(new Date());
  const [shareStatus, setshareStatus] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [kind, setKind] = useState('regular');
  //주기정보
  const [timeUnit, setTimeUnit] = useState('D');
  const [type, setType] = useState('count');
  const [count, setCount] = useState('');
  const [sun, setSun] = useState(false)
  const [mon, setMon] = useState(false)
  const [tue, setTue] = useState(false)
  const [wed, setWed] = useState(false)
  const [thu, setThu] = useState(false)
  const [fri, setFri] = useState(false)
  const [sat, setSat] = useState(false)
  const [progressRate, setProgressRate] = useState("");
  
  const [ parentId, setParentId ] = useState("")
  const [ parentGoalTitle, setParentGoalTitle ] = useState("없음");
  const [color, setColor] = useState(randomColor());
  const defaultSearchTime = " 09:00:00";
  
  const InitializeForm = ()=>{
    setStartDatetime(new Date());
    setEndDatetime(new Date());
    setshareStatus(false);
    setTitle("");
    setContent("");
    setKind('regular');
    //주기정보
    setTimeUnit('D');
    setType('count');
    setCount('');
    setSun(false)
    setMon(false)
    setTue(false)
    setWed(false)
    setThu(false)
    setFri(false)
    setSat(false)
    setProgressRate("");
    setParentId("")
    setParentGoalTitle("없음");
    setColor(randomColor());
  }

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
      padding: theme.spacing(1, 3, 2),
      width: "470px",
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

  const handleFormSubmit = async (evt) => {
    evt.preventDefault();

    const formData = {
      "parentId": parentId,
      "title": title,
      "kind":kind,
      "content":content,
      "startDatetime": makeYYMMDD(startDatetime) + defaultSearchTime,
      "endDatetime":makeYYMMDD(endDatetime) + defaultSearchTime,
      "progressRate":progressRate,
      "color":color,
      "shareStatus": shareStatus ? "N":"Y",
    }
    if(kind === "regular"){
      formData['periodicityInfo'] = {
        "timeUnit":timeUnit,
        "type":type,
        "count":count,
        "sunYn":sun ? "Y":"N",
        "monYn":mon ? "Y":"N",
        "tueYn":tue ? "Y":"N",
        "wedsYn":wed ? "Y":"N",
        "thurYn":thu ? "Y":"N",
        "friYn":fri ? "Y":"N",
        "satYn":sat ? "Y":"N"
      }
    }
    console.log('제출', formData)
    try{
      const result = await axios.post("/goalManage/goal", formData);
      console.log("제출결과", {result})
      handleClose();
      setGoalFullList([...goalFullList, result.data.goalInfo]);
      setGoalSearchTitleList([...goalSearchTitleList, result.data.goalInfo]);
      setUpdateTotalTitle(!updateTotalTitle)
    }catch(err){
      console.error(err)
    }
  };
  
  return (
    <div className="insert-form">
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
            <h3 id="transition-modal-title">목표 추가</h3>
            <form onSubmit={handleFormSubmit}>
            <div className="top-wrapper">  
              <div className="modal-date-picker">
                <div className="modal-title">진행기간</div>
                <DateRangePickerCustom 
                  startDate={startDatetime}
                  endDate={endDatetime}
                  setStartDate={setStartDatetime} 
                  setEndDate={setEndDatetime}/>
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
              value={title}
              size="small" 
              variant="outlined"
              style={{width:"100%", marginBottom:"10px"}}
              InputLabelProps={{
                shrink: true,
              }}
              onChange={function(e){
                setTitle(e.target.value)
              }}
            />
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
            <div className="goal-type-radio">
              <FormControl component="fieldset">
                <FormLabel style={{fontSize:"12px"}} component="legend">목표유형</FormLabel>
                <RadioGroup row aria-label="kind" name="row-radio-buttons-group" value={kind} 
                onChange={(e)=>{
                  setKind(e.target.value)
                }} >
                  <FormControlLabel value="regular" control={<Radio />} label="주기성 목표" />
                  <FormControlLabel value="deadline" control={<Radio />} label="기한성 목표" />
                </RadioGroup>
              </FormControl>
            </div>
            <PeriodicityInfo 
              kind={kind}
              timeUnit={timeUnit}
              setTimeUnit={setTimeUnit}
              type={type}
              setType={setType}
              count={count}
              setCount={setCount}
              sun={sun} setSun={setSun}
              mon={mon} setMon={setMon}
              tue={tue} setTue={setTue}
              wed={wed} setWed={setWed}
              thu={thu} setThu={setThu}
              fri={fri} setFri={setFri}
              sat={sat} setSat={setSat} 
            />
            <div className="slider-wrapper">
              <label className="modal-title">진행률</label>
              <div className="slider-border">
                <Slider
                  style={{width:"90%"}}
                  aria-label="progressRate"
                  defaultValue={0}
                  valueLabelDisplay="auto"
                  step={10}
                  marks
                  min={0}
                  max={100}
                  value={parseInt(progressRate)}
                  onChange={function(e){
                    setProgressRate(e.target.value)
                  }}
                />
              </div>
            </div>
            <div className="parent-modal-wrapper">
              <GoalTitleListModal 
                parentId={parentId}
                setParentId={setParentId}
                parentGoalTitle={parentGoalTitle}
                setParentGoalTitle={setParentGoalTitle}
                setColor={setColor}
              />   
              <div className="parent-title">{parentGoalTitle}</div>
            </div>
            <ColorTag
              parentGoalTitle={parentGoalTitle}
              color={color}
              setColor={setColor}
            />
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
  
function PeriodicityInfo({kind, timeUnit, setTimeUnit, type, setType, count, setCount,
  sun, setSun, mon, setMon, tue, setTue, wed, setWed, thu, setThu, fri, setFri, sat, setSat}) {
  
  const [none, setNone] = useState(false)
  const timeUnitChangeHandler = (event) => {
    setTimeUnit(event.target.value);
    setCount("")
    if(event.target.value === "D" || event.target.value === "M" ){
      setType("count")
      setSun(false)
      setMon(false)
      setTue(false)
      setWed(false)
      setThu(false)
      setFri(false)
      setSat(false)
      setNone(false)
    }
  };
  
  if(kind === "regular"){
    return(
      <div className="count-wrapper">
        <select className="timeUnit-select" value={timeUnit} onChange={timeUnitChangeHandler}>
          <option value="D">일</option>
          <option value="W">주</option>
          <option value="M">월</option>
        </select>
        <WeekPeriodSelect 
          timeUnit={timeUnit}
          type={type}
          setType={setType}
          count={count}
          setCount={setCount}
          none={none} setNone={setNone}
          sun={sun} setSun={setSun}
          mon={mon} setMon={setMon}
          tue={tue} setTue={setTue}
          wed={wed} setWed={setWed}
          thu={thu} setThu={setThu}
          fri={fri} setFri={setFri}
          sat={sat} setSat={setSat} 
        />
      </div>
    )
  }else{
      return null
  }
}

function WeekPeriodSelect({timeUnit, type, setType, count, setCount, none, setNone,
  sun, setSun, mon, setMon, tue, setTue, wed, setWed, thu, setThu, fri, setFri, sat, setSat}){
  
  

  const sunCheckHandler=(e)=>{
    setSun(e.target.checked)
    setType("day")
  }
  const monCheckHandler=(e)=>{
    setMon(e.target.checked)
    setType("day")
  }
  const tueCheckHandler=(e)=>{
    setTue(e.target.checked)
    setType("day")
  }
  const wedCheckHandler=(e)=>{
    setWed(e.target.checked)
    setType("day")
  }
  const thuCheckHandler=(e)=>{
    setThu(e.target.checked)
    setType("day")
  }
  const friCheckHandler=(e)=>{
    setFri(e.target.checked)
    setType("day")
  }
  const satCheckHandler=(e)=>{
    setSat(e.target.checked)
    setType("day")
  }
  const noneCheckHandler = (e)=>{
    setNone(e.target.checked)
    if(e.target.checked){
      setSun(false)
      setMon(false)
      setTue(false)
      setWed(false)
      setThu(false)
      setFri(false)
      setSat(false)
      setType("count")
    }else{
      setType("day")
    }
  }
  const checkboxStyle={
    padding:"0 3px",
  }
  if(timeUnit === "W"){
    return(
      <div className="dayCheckbox-wrapper">
        <FormGroup row>
          <FormControlLabel control={<Checkbox sx={checkboxStyle} checked={sun} onChange={sunCheckHandler} size="small" />} label="일" disabled={none}/>
          <FormControlLabel control={<Checkbox sx={checkboxStyle} checked={mon} onChange={monCheckHandler} size="small" />} label="월" disabled={none}/>
          <FormControlLabel control={<Checkbox sx={checkboxStyle} checked={tue} onChange={tueCheckHandler} size="small" />} label="화" disabled={none}/>
          <FormControlLabel control={<Checkbox sx={checkboxStyle} checked={wed} onChange={wedCheckHandler} size="small" />} label="수" disabled={none}/>
          <FormControlLabel control={<Checkbox sx={checkboxStyle} checked={thu} onChange={thuCheckHandler} size="small" />} label="목" disabled={none}/>
          <FormControlLabel control={<Checkbox sx={checkboxStyle} checked={fri} onChange={friCheckHandler} size="small" />} label="금" disabled={none}/>
          <FormControlLabel control={<Checkbox sx={checkboxStyle} checked={sat} onChange={satCheckHandler} size="small" />} label="토" disabled={none}/>
        </FormGroup>

        <div className="none-count-wrapper">
          <FormControlLabel control={<Checkbox sx={checkboxStyle} size="small"/>} onChange={noneCheckHandler} label="요일미지정" />
          <TextField 
            disabled={!none}
            type="number"
            id="count" 
            label="횟수" 
            size="small" 
            variant="outlined"
            style={{width:"200px", height:"30px"}}
            InputLabelProps={{
              shrink: true,
            }}
            onChange={function(e){
              setCount(e.target.value)
            }}/>
        </div>
      </div>
    )
  } else{
    return(
      <div>
        <TextField 
          id="count" 
          type="number"
          label="횟수" 
          size="small" 
          variant="outlined"
          value={count}
          InputLabelProps={{
            shrink: true,
          }}
          onChange={function(e){
            setCount(e.target.value)
          }}/>
      </div>
    )
  }
}

function ColorTag({parentGoalTitle, color, setColor}){
  const [pickerShow, setPickerShow] = useState(false)
  const pickerHandler = ()=>{
    setPickerShow(!pickerShow)
  }
  if(parentGoalTitle === "없음"){
    return (
      <>
      <div className="color-picker-area">
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
          }}/>
          <div className="color-tag-wrapper">
            <button className="color-picker-btn" onClick={pickerHandler}>🎨</button>
            {pickerShow ? (<div className="color-picker small">
              <HexColorPicker  color={color} onChange={setColor} />
            </div>) : null}
          </div>
      </div>
      </>
    )
  } else{
    setColor("")
    return null
  }
}
  // YYYY-MM-DD 형태로 반환
function makeYYMMDD(value){
    return value.toISOString().substring(0,10);
}

export default GoalInsertFormModal;