import React, { useState } from "react";
import "./GoalInsertFormModal.css"
//icon
import { BiLock } from "react-icons/bi";
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

  function GoalModifyForm({
    modifyData,
    parentId, setParentId, parentGoalTitle, setParentGoalTitle, title, setTitle, content, setContent, startDatetime, setStartDatetime,
    endDatetime, setEndDatetime, shareStatus, setshareStatus, color, setColor, kind, setKind, 
  progressRate, setProgressRate,
  timeUnit, setTimeUnit, type, setType, count, setCount,
  sun, setSun, mon, setMon, tue, setTue, wed, setWed, thu, setThu, fri, setFri, sat, setSat}){

    console.log("title- Modify", title)
    console.log("modyData", modifyData)

    
    return (
      <>
        <div className="top-wrapper">  
          <div className="modal-date-picker">
          <div className="modal-title">진행기간</div>
          <DateRangePickerCustom 
            defaultStartValue={new Date(modifyData.startDatetime)}
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
          id="title" 
          label="제목" 
          defaultValue={modifyData.title}
          // value={title}
          size="small" 
          variant="outlined"
          style={{width:"100%", marginBottom:"10px"}}
          InputLabelProps={{
            shrink: true,
          }}
          onChange={function(e){
            setTitle(e.target.value)
          }}/>
        <MultilineTextFields 
          defaultValue={modifyData.content}
          // value={content}
          setValue={setContent}/>
      
          <div className="goal-type-radio">
          <FormControl component="fieldset">
            <FormLabel style={{fontSize:"12px"}} component="legend">목표유형</FormLabel>
            <RadioGroup row aria-label="kind" name="row-radio-buttons-group" 
            defaultValue={modifyData.kind}
            // value={kind} 
            onChange={(e)=>{
              setKind(e.target.value)
            }} >
              <FormControlLabel value="regular" control={<Radio />} label="주기성 목표" />
              <FormControlLabel value="deadline" control={<Radio />} label="기한성 목표" />
            </RadioGroup>
          </FormControl>
          </div>
          <PeriodicityInfo 
            modifyData={modifyData}
            kind={modifyData.kind}
            timeUnit={modifyData.periodicityInfo.timeUnit}
            setTimeUnit={setTimeUnit}
            type={modifyData.periodicityInfo.type}
            setType={setType}
            count={modifyData.periodicityInfo.count}
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
            />   
            <div className="parent-title">{parentGoalTitle}</div>
          </div>
          
          <ColorTag
            parentGoalTitle={parentGoalTitle}
            color={color}
            setColor={setColor}
          />
      </>
    )
  }

  function PeriodicityInfo({modifyData, kind, timeUnit, setTimeUnit, type, setType, count, setCount,
    sun, setSun, mon, setMon, tue, setTue, wed, setWed, thu, setThu, fri, setFri, sat, setSat}) {
    const handleChange = (event) => {
      setTimeUnit(event.target.value);
      if(event.target.value === "D" || event.target.value === "M" ){
        setType("count")
      }
    };
  
      if(kind === "regular"){
          return(
            <div className="count-wrapper">
              <select className="timeUnit-select" defaultValue={timeUnit} onChange={handleChange}>
                <option value="D">일</option>
                <option value="W">주</option>
                <option value="M">월</option>
              </select>
                <WeekPeriodSelect 
                modifyData={modifyData}
                  timeUnit={timeUnit}
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
            </div>
          )
      }else{
          return null
      }
  }

  function WeekPeriodSelect({modifyData, timeUnit, type, setType, count, setCount,
    sun, setSun, mon, setMon, tue, setTue, wed, setWed, thu, setThu, fri, setFri, sat, setSat}){
    
    const [none, setNone] = useState(false)

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
    const handleChange = (e)=>{
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
            <FormControlLabel control={<Checkbox sx={checkboxStyle} defaultChecked={YNtoTF(modifyData.periodicityInfo.sunYn)} checked={sun} onChange={sunCheckHandler} size="small" />} label="일" disabled={none}/>
            <FormControlLabel control={<Checkbox sx={checkboxStyle} defaultChecked={YNtoTF(modifyData.periodicityInfo.monYn)} checked={mon} onChange={monCheckHandler} size="small" />} label="월" disabled={none}/>
            <FormControlLabel control={<Checkbox sx={checkboxStyle} defaultChecked={YNtoTF(modifyData.periodicityInfo.tueYn)} checked={tue} onChange={tueCheckHandler} size="small" />} label="화" disabled={none}/>
            <FormControlLabel control={<Checkbox sx={checkboxStyle} defaultChecked={YNtoTF(modifyData.periodicityInfo.wedsYn)} checked={wed} onChange={wedCheckHandler} size="small" />} label="수" disabled={none}/>
            <FormControlLabel control={<Checkbox sx={checkboxStyle} defaultChecked={YNtoTF(modifyData.periodicityInfo.thurYn)} checked={thu} onChange={thuCheckHandler} size="small" />} label="목" disabled={none}/>
            <FormControlLabel control={<Checkbox sx={checkboxStyle} defaultChecked={YNtoTF(modifyData.periodicityInfo.friYn)} checked={fri} onChange={friCheckHandler} size="small" />} label="금" disabled={none}/>
            <FormControlLabel control={<Checkbox sx={checkboxStyle} defaultChecked={YNtoTF(modifyData.periodicityInfo.satYn)} checked={sat} onChange={satCheckHandler} size="small" />} label="토" disabled={none}/>
          </FormGroup>

          <div className="none-count-wrapper">
            <FormControlLabel control={<Checkbox sx={checkboxStyle} size="small"/>} onChange={handleChange} label="요일미지정" />
            <TextField 
              disabled={!none}
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
            label="횟수" 
            size="small" 
            variant="outlined"
            defaultValue={count}
            // value={count}
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

  function MultilineTextFields(props) {
    function setValue(e){
      e.preventDefault();
      props.setValue(e.target.value);
    }
    return (
        <div>
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
            defaultValue={props.defaultValue}
            onChange={setValue}
          />
        </div>
    );
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
            }}></TextField>

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
      return null
    }
  }

  const YNtoTF = (value)=>{
    if(value === "Y"){
        return true
    }else{
        return false
    }
}
  export default GoalModifyForm;