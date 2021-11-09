import React, { useState, useContext } from "react";
//css
import { makeStyles } from '@material-ui/core/styles';
import "./GoalInsertFormModal.css";
// import axios from "axios";
import axiosInstance from "../axiosConfig";
//icon
import { BiEdit } from "react-icons/bi";
import { BiLock } from "react-icons/bi";
//modal
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
// import GoalModifyForm from "./GoalModifyForm";

//goalModifyForm
import TextField from '@material-ui/core/TextField';
import DateRangePickerCustom from './DateRangePickerCustom';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
//color picker
import { HexColorPicker } from "react-colorful";

// 토글버튼
import ToggleButton from '@mui/material/ToggleButton';

//slider-score
import Slider from '@mui/material/Slider';
import GoalTitleListModal from "./GoalTitleListModal";

import FormGroup from '@mui/material/FormGroup';
import Checkbox from '@mui/material/Checkbox';

import { GoalTotalTitleListContext } from "../context/GoalTotalTitleListContext";
import { GoalFullListContext } from "../context/GoalFullListContext";
import { GoalModalSearchTitleListContext } from "../context/GoalModalSearchTitleListContext";

function GoalModifyFormModal({modifyData, targetIndex, orderColumn, orderType}){
  const [ goalTotalTitleList, ] = useContext(GoalTotalTitleListContext);
  const [ goalFullList, setGoalFullList ] = useContext(GoalFullListContext);
  const [ , , startDatetime, setStartDatetime,endDatetime, setEndDatetime] = useContext(GoalModalSearchTitleListContext);

  const YNtoTF = (value)=>{
      if(value === "Y"){
          return true
      }else{
          return false
      }
  }
  // 부모 목표의 제목 찾기
  const pIdtoTitle= (pId)=>{
      if(pId){
          let targetIndex = goalTotalTitleList.findIndex((element) =>{
              if(element.goalId === pId){
                  return true
              }
          })
          return goalTotalTitleList[targetIndex]["title"]
      }else{
          return "없음"
      }
  }
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
  const [none, setNone] = useState(false) //내부생성(요일미지정)
  const [progressRate, setProgressRate] = useState(0);
  const [ parentId, setParentId ] = useState("");
  const [ parentGoalTitle, setParentGoalTitle ] = useState("");
  const [color, setColor] = useState("");

  const defaultSearchTime = " 09:00:00";

  const ModifySettingForm = ()=>{
    setStartDatetime(new Date(modifyData.startDatetime));
    setEndDatetime(new Date(modifyData.endDatetime));
    setshareStatus(!YNtoTF(modifyData.shareStatus));
    setTitle(modifyData.title);
    setContent(modifyData.content);
    setKind(modifyData.kind);
    //주기정보
    setTimeUnit(modifyData.periodicityInfo.timeUnit);
    setType(modifyData.periodicityInfo.type);
    setCount(modifyData.periodicityInfo.count);
    setSun(YNtoTF(modifyData.periodicityInfo.sunYn))
    setMon(YNtoTF(modifyData.periodicityInfo.monYn))
    setTue(YNtoTF(modifyData.periodicityInfo.tueYn))
    setWed(YNtoTF(modifyData.periodicityInfo.wedsYn))
    setThu(YNtoTF(modifyData.periodicityInfo.thurYn))
    setFri(YNtoTF(modifyData.periodicityInfo.friYn))
    setSat(YNtoTF(modifyData.periodicityInfo.satYn))
    setProgressRate(parseInt(modifyData.progressRate));
    setParentId(modifyData.parentId)
    setParentGoalTitle(pIdtoTitle(modifyData.parentId));
    setColor(modifyData.color);
    if(modifyData.periodicityInfo.timeUnit === "W" && modifyData.periodicityInfo.type ==="day"){
      setNone(true);
    }
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
    setOpen(true);
    ModifySettingForm();
    console.log('modifyData', modifyData)
    console.log("orderColumn", orderColumn)
console.log("orderType", orderType)
  };

  const handleClose = () => {
    setOpen(false);
  };


  const handleFormSubmit = async (evt) =>{
    evt.preventDefault();
    //제목 슬래시 검사
    const titleValidation = () => {
      var reg = /\//gi
      if(reg.test(title)){
        setTitle(title.replace(reg, ""))
        return false;    
      } else {
        return true;
      }  
    }
    if(!titleValidation()){
      alert("제목에 슬래시(/)를 포함할 수 없습니다.")
    }else{
      const formData = {
        "goalId" : modifyData.goalId,
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
      try{
        const result = await axiosInstance.patch("/goalManage/goal", formData);
        handleClose();
        // 기존 리스트들에 추가 업데이트(정렬 기준 반영)
        function data_sorting(a, b) {
          console.log('orderColumn', orderColumn)
          if(orderColumn === 'progress_rate') {
            orderColumn = 'progressRate'
            console.log('orderColumn2', orderColumn)
            console.log('a.orderColumn', typeof parseInt(a[orderColumn]))

            if (orderType === "asc") return parseInt(a[orderColumn]) > parseInt(b[orderColumn]) ? 1 : -1
            else return parseInt(a[orderColumn]) < parseInt(b[orderColumn]) ? 1 : -1

          }else{          
            if(orderColumn === 'modification_datetime') orderColumn = 'modificationDatetime'
            else if(orderColumn === 'start_datetime') orderColumn = 'startDatetime'
            else if(orderColumn === 'end_datetime') orderColumn = 'endDatetime'


            var dateA = new Date(a[orderColumn]).getTime();
            var dateB = new Date(b[orderColumn]).getTime();
            if (orderType === "asc") return dateA > dateB ? 1 : -1
            else return dateA < dateB ? 1 : -1
          }
        };

        // 수정한 데이터 반영
        let tempArray = [...goalFullList];
        tempArray[targetIndex] = result.data.goalInfo;
        setGoalFullList(tempArray.sort(data_sorting));

        // LeftNav에도 수정 반영되어야함
        // setGoalSearchTitleList([...goalSearchTitleList, result.data.goalInfo]);

      }catch(err){
        console.error(err)
      }
    }
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
            <h3 id="transition-modal-title">목표 수정</h3>
            <form onSubmit={handleFormSubmit}>
            <div className="top-wrapper">  
              <div className="modal-date-picker">
                <div className="modal-title">진행기간</div>
                <DateRangePickerCustom 
                  startDate={startDatetime}
                  endDate={endDatetime}
                  setStartDate={setStartDatetime} 
                  setEndDate={setEndDatetime}
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
              <div className="goal-type-radio">
                <FormControl component="fieldset">
                  <FormLabel style={{fontSize:"12px"}} component="legend">목표유형</FormLabel>
                  <RadioGroup row aria-label="kind" name="row-radio-buttons-group" 
                  value={kind} 
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
                none={none} setNone={setNone}
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
                  goalId = {modifyData.goalId}
                  parentId={parentId}
                  setParentId={setParentId}
                  parentGoalTitle={parentGoalTitle}
                  setParentGoalTitle={setParentGoalTitle}
                  setColor={setColor}
                />   
                <div className="parent-title">{parentGoalTitle}</div>
              </div>
              {parentId ?  null : <ColorTag color={color} setColor={setColor} />}
              
              <div className="button-wrapper">
                <button type="submit" className="submitBtn">수정</button>
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
  sun, setSun, mon, setMon, tue, setTue, wed, setWed, thu, setThu, fri, setFri, sat, setSat, none, setNone}) {
  // const [none, setNone] = useState(false)
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
    setCount("")
  }
  const monCheckHandler=(e)=>{
    setMon(e.target.checked)
    setType("day")
    setCount("")
  }
  const tueCheckHandler=(e)=>{
    setTue(e.target.checked)
    setType("day")
    setCount("")
  }
  const wedCheckHandler=(e)=>{
    setWed(e.target.checked)
    setType("day")
    setCount("")
  }
  const thuCheckHandler=(e)=>{
    setThu(e.target.checked)
    setType("day")
    setCount("")
  }
  const friCheckHandler=(e)=>{
    setFri(e.target.checked)
    setType("day")
    setCount("")
  }
  const satCheckHandler=(e)=>{
    setSat(e.target.checked)
    setType("day")
    setCount("")
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
      setCount("")
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
          <FormControlLabel control={<Checkbox sx={checkboxStyle} size="small"/>} checked={none} onChange={noneCheckHandler} label="요일미지정" />
          <TextField 
            disabled={!none}
            type="number"
            id="count" 
            label="횟수" 
            size="small" 
            variant="outlined"
            value={count}
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

function ColorTag({color, setColor}){
  const [pickerShow, setPickerShow] = useState(false)
  const pickerHandler = (e)=>{
    e.preventDefault();
    setPickerShow(!pickerShow)
  }
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
}
  // YYYY-MM-DD 형태로 반환
  function makeYYMMDD(value){
    return value.toISOString().substring(0,10);
}
export default GoalModifyFormModal;