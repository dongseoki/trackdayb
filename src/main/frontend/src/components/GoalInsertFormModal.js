import React, { useState, useContext, useEffect } from "react";
import axiosInstance from "../axiosConfig";
// import axios from "axios";
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
import DateRangePickerForm from './DateRangePickerForm';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import ToggleButton from '@mui/material/ToggleButton';
import Slider from '@mui/material/Slider';
import FormGroup from '@mui/material/FormGroup';
import Checkbox from '@mui/material/Checkbox';
// 전체목표제목리스트
import GoalTitleListModal from "./GoalTitleListModal";
import { GoalTotalTitleListContext } from "../context/GoalTotalTitleListContext";
import { GoalModalSearchTitleListContext } from "../context/GoalModalSearchTitleListContext";
import {toast} from "react-toastify";
import { useMediaQuery } from "react-responsive";
import { ADD_GOAL_REQUEST, LOAD_GOALTOTALFULLLIST_REQUEST, LOAD_GOALSEARCHFULLLIST_REQUEST, LOAD_GOALSEARCHTITLELIST_REQUEST, LOAD_GOALMODALTITLELIST_REQUEST } from "../reducers/goal";
import { useDispatch } from 'react-redux';

import dayjs from 'dayjs';

// react-hook-form
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

// color
import { HexColorPicker, HexColorInput } from "react-colorful";
import { DebouncedPicker } from "./DebouncedPicker";


function GoalInsertFormModal(){

  const initialDate = {
    startDate : new Date(),
    endDate : new Date()
  }

  const [none, setNone ] = useState(false);
  
  const [ parentId, setParentId ] = useState("")
  const [ parentGoalTitle, setParentGoalTitle ] = useState("없음");
  const [ color, setColor ] = useState(randomColor());
  

  const dispatch = useDispatch();

  const schema = yup.object().shape({
    startDatetime : yup.date("올바른 기간을 입력해주세요."),
    endDatetime: yup.date("올바른 기간을 입력해주세요.").min(
      yup.ref("startDatetime"),"올바른 기간을 입력해주세요."),
    
    shareState : yup.bool("공개/비공개 여부를 선택해주세요").required("공개/비공개 여부를 선택해주세요"),

    title : yup.string().max(20, '제목은 20자 이내입니다').required('제목을 입력해 주세요').matches(/^((?!\/).)*$/, '제목에 슬래쉬(/)를 포함할 수 없습니다'),
    content : yup.string().max(200, '내용은 200자 이내입니다').required('내용을 입력해 주세요'),
    
    kind: yup.string("목표 유형을 선택해주세요").required("목표 유형을 선택해주세요"),
    // progressRate: yup.number("진행률을 선택해주세요").required("진행률을 선택해주세요"),

    parentId : yup.string('부모 스트링'),

    color: yup.string('태그컬러를 선택해주세요.').when('parentId', {
      is : (value) => value.length == 0,
      then : yup
            .string('태그컬러를 선택해주세요')
            .test(
              "hex regex",
              '올바른 태그컬러를 입력해주세요',
              value => value.match("^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$")
            )
            .required('태그컬러를 선택해주세요')
    }),

    periodicityInfo: yup.lazy(value => {
      if (value !== undefined) {
        return yup.object().shape({
          count : yup
                .number()
                .when('timeUnit', {
                  is : 'D',
                  then : yup.number().transform((value, originalValue) => {
                    return (originalValue === '' ? undefined : value)
                  })
                  .typeError('Parameter is not a valid numeric value.').required('입력하세요').positive('양수')
                })
                .when('timeUnit', {
                  is : 'M',
                  then : yup.number().transform((value, originalValue) => {
                    return (originalValue === '' ? undefined : value)
                  })
                  .typeError('Parameter is not a valid numeric value.').required('입력하세요').positive('양수')
                })
                .when('timeUnit', {
                  is : 'W',
                  then : yup.number().transform((value, originalValue) => {
                    return (originalValue === '' ? undefined : value)
                  })
                  .typeError('Parameter is not a valid numeric value.')
                  .test(
                    "none test",
                    '횟수를 입력하세요123',
                    (value) => {
                      if(none) {
                        if(value === undefined) return false
                        else return true
                      }else return true
                    }
                  ).positive('양수')
                })
        });
      }
      return yup.mixed().notRequired();
    }),

  })


  const { register, unregister, reset, handleSubmit, getValues, watch, control, setValue, formState: {errors}} = useForm({ 
    resolver : yupResolver(schema),
    defaultValues: {
      title: "",
      content: "",
      kind : 'regular',
      progressRate : 0,
      shareState : false,
      color : color,
      parentId : parentId,
    },
  });
  

  const [error, setError] = useState({ count :' 초기값'})

  // 시작일, 종료일 변경시 내부 모달 목표 타이틀 리스트 업데이트
  useEffect(() =>{
    dispatch({
      type : LOAD_GOALMODALTITLELIST_REQUEST,
      data : {
        searchStartDatetime : dayjs(getValues('startDatetime')).format("YYYY-MM-DD"),
        searchEndDatetime : dayjs(getValues('endDatetime')).format("YYYY-MM-DD")
      }
    })
  },[watch('startDatetime'), watch('endDatetime')])



  const onSubmit = (data) => {
    console.log('error', error.count)
    alert('data')
    data.startDatetime = dayjs(data.startDatetime).format("YYYY-MM-DD")
    data.endDatetime = dayjs(data.endDatetime).format("YYYY-MM-DD")

    if(data.periodicityInfo){
      if(data.periodicityInfo.count == 1) {
        setError({
          count :'ㅗ디ㅣㅐ'
        })

        console.log('error', error.count)
        return false
      }

    }
    console.log("form", data)

    dispatch({
      type : ADD_GOAL_REQUEST,
      data : { formData : data }
    });
  };
  


  // 반응형 화면 BreakPoint
  const isMobileScreen = useMediaQuery({
      query: "(max-width: 440px)",
  });

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
      padding: theme.spacing(1, 1, 2, 2),
      width: "470px",
      fontSize: "14px",
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
    // InitializeForm()
  };

  const handleClose = () => {
    setOpen(false);
    // InitializeForm()
    reset()
  };

  const noneCheckHandler = (e)=>{
    setNone(e.target.checked)
    setValue('periodicityInfo.sunYn', false)
    setValue('periodicityInfo.monYn', false)
    setValue('periodicityInfo.tueYn', false)
    setValue('periodicityInfo.wedsYn', false)
    setValue('periodicityInfo.thurYn', false)
    setValue('periodicityInfo.friYn', false)
    setValue('periodicityInfo.satYn', false)
    setValue('periodicityInfo.type', 'count')
  }

  // const handleFormSubmit = async (evt) => {
  //   evt.preventDefault();
  //   //제목 슬래시 검사
  //   const titleValidation = () => {
  //     var reg = /\//gi
  //     if(reg.test(title)){
  //       setTitle(title.replace(reg, ""))
  //       return false;    
  //     } else {
  //       return true;
  //     }  
  //   }

  //   // 역기간 검사
  //   const dateRangeValidation = ()=>{
  //     let startDateA = new Date(startDatetime).getTime();
  //     let endDateB = new Date(endDatetime).getTime();
  //     if(startDateA > endDateB){
  //       return false
  //     }else return true
  //   }
  //   // 횟수 음수 검사
  //   const countValidation = ()=>{
  //     if(count <= 0){
  //       return false
  //     } else{
  //       return true
  //     }
  //   }
  //   if(!titleValidation()){
  //     toast.error("제목에 슬래시(/)를 포함할 수 없습니다.", {
  //       autoClose : 5000
  //     })
  //   }
  //   else if(!dateRangeValidation()){
  //     toast.error("올바른 진행기간을 입력하세요.", {
  //       autoClose : 5000
  //     })
  //   }else if(count && !countValidation()){
  //     toast.error("올바른 횟수를 입력하세요", {
  //       autoClose : 5000
  //     })
  //   }
  //   else{
  //     const formData = {
  //       "parentId": parentId,
  //       "title": title,
  //       "kind":kind,
  //       "content":content,
  //       "startDatetime": makeYYMMDD(startDatetime),
  //       "endDatetime":makeYYMMDD(endDatetime),
  //       "progressRate":progressRate,
  //       "color":color,
  //       "shareStatus": shareStatus ? "N":"Y",
  //     }
  //     if(kind === "regular"){
  //       formData['periodicityInfo'] = {
  //         "timeUnit":timeUnit,
  //         "type":type,
  //         "count":count,
  //         "sunYn":sun ? "Y":"N",
  //         "monYn":mon ? "Y":"N",
  //         "tueYn":tue ? "Y":"N",
  //         "wedsYn":wed ? "Y":"N",
  //         "thurYn":thu ? "Y":"N",
  //         "friYn":fri ? "Y":"N",
  //         "satYn":sat ? "Y":"N"
  //       }
  //     }
  //     // 순차적 비동기 처리 필요(정렬조건 때문에)
  //     dispatch({
  //       type : ADD_GOAL_REQUEST,
  //       data : { formData : formData }
  //     },);
  //     dispatch({
  //       type : LOAD_GOALTOTALFULLLIST_REQUEST,
  //     })
  //     dispatch({
  //       type : LOAD_GOALSEARCHFULLLIST_REQUEST,
  //     })
  //     dispatch({
  //       type : LOAD_GOALSEARCHTITLELIST_REQUEST,
  //     })
  //     handleClose();
  //     // setUpdateTotalTitle(!updateTotalTitle)
  //     // setUpdateChecker(!updateChecker) // GoalFullList DB에서 새로 데이터 받아오기

  //   }
  // };
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
          <div className= {isMobileScreen ? classes.paperMobile : classes.paper}>
            <h3 id="transition-modal-title">목표 추가</h3>
            <form className="goal-form" onSubmit={handleSubmit(onSubmit)}>
              <div className="top-wrapper"> 
                <div className="modal-date-picker">
                  <div className="modal-title">진행기간</div>
                  <DateRangePickerForm
                    initialDate={initialDate}
                    control={control}
                    watch={watch}
                  />
                  {errors.endDatetime ? errors.endDatetime?.message : ''}
                </div>
                <div className="modal-share-toggle">
                  <Controller
                    name="shareState"
                    control={control}
                    render={({ field }) => (
                      <>
                        <div className="modal-title">{field.value? "비공개":"공개"}</div>
                        <ToggleButton
                          {...field}
                          color="primary"
                          value="check"
                          selected={field.value}
                          onChange={() => field.onChange(!field.value)}
                        >
                          <BiLock className="lock-icon"/>
                        </ToggleButton>
                      </>
                    )}/>
                </div>
              </div>
                <Controller 
                name="title" 
                control={control}
                render={({ field }) => (
                <TextField
                  {...field}
                  id="title" 
                  label="제목" 
                  size="small" 
                  variant="outlined"
                  style={{width:"100%", marginBottom:"10px"}}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  error={!!errors.title}
                  helperText={errors.title ? errors.title?.message : ''}
                />
                )}/>
                <Controller 
                name="content" 
                control={control}
                render={({ field }) => (
                <TextField
                  {...field}
                  id="content" 
                  label="내용" 
                  size="small" 
                  variant="outlined"
                  style={{width:"100%", marginBottom:"10px"}}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  error={!!errors.content}
                  helperText={errors.content ? errors.content?.message : ''}
                />
                )}/>
            <div className="goal-type-radio">
              <Controller
              name="kind"
              control={control}
              render={({field}) => (
                <>
                  <FormControl component="fieldset">
                    <FormLabel style={{fontSize:"12px"}} component="legend">목표유형</FormLabel>
                    <RadioGroup
                     {...field}
                      row 
                      aria-label="kind"
                      value={field.value}
                      onChange={(e) => {
                        field.onChange(e.target.value)
                        if(e.target.value === 'deadline'){
                          unregister('periodicityInfo')
                        }
                      }}
                      >
                      <FormControlLabel value="regular" control={<Radio />} label="주기성 목표" />
                      <FormControlLabel value="deadline" control={<Radio />} label="기한성 목표" />
                    </RadioGroup>
                  </FormControl>
                </>
              )} />
            </div>
            {/* 주기성 목표일 때 */}
            {watch("kind") === "regular" ? 
              <div className="count-wrapper">
                <Controller
                name="periodicityInfo.timeUnit"
                control={control}
                defaultValue="D"
                render={({ field }) => (
                  <select  {...field} className="timeUnit-select" value={field.value} 
                    onChange={(e)=> {
                      field.onChange(e.target.value)
                      setValue('periodicityInfo.count', '')
                      unregister('periodicityInfo.sunYn')
                      unregister('periodicityInfo.monYn')
                      unregister('periodicityInfo.tueYn')
                      unregister('periodicityInfo.wedsYn')
                      unregister('periodicityInfo.thurYn')
                      unregister('periodicityInfo.friYn')
                      unregister('periodicityInfo.satYn')
                      if(e.target.value === 'W') {
                        setValue('periodicityInfo.type', 'day')
                      } else {
                        setValue('periodicityInfo.type', 'count')
                      }
                    }}
                  >
                    <option value="D">일</option>
                    <option value="W">주</option>
                    <option value="M">월</option>
                  </select>
                )}/>


                {/* 요일별 지정일 때(day) */}
                {watch("periodicityInfo.timeUnit") === "W" ? 
                <div className="dayCheckbox-wrapper">
                  <FormGroup row>
                    <Controller name="periodicityInfo.sunYn" control={control} defaultValue={false} 
                      render={({ field }) => (
                        <FormControlLabel 
                        control={
                          <Checkbox 
                            size="small" 
                            checked={field.value} 
                            onChange={(e)=>{
                              setValue('periodicityInfo.type', 'day')
                              field.onChange(e.target.checked)
                            }}
                          />
                          } 
                          label="일" 
                          disabled={none}
                        />
                    )}/>
                    <Controller name="periodicityInfo.monYn" control={control} defaultValue={false} render={({ field }) => (
                      <FormControlLabel control={<Checkbox size="small" checked={field.value} onChange={(e)=>{
                        setValue('periodicityInfo.type', 'day')
                        field.onChange(e.target.checked)
                      }}/>} label="월" disabled={none}/>
                    )}/>
                    <Controller name="periodicityInfo.tueYn" control={control} defaultValue={false} render={({ field }) => (
                      <FormControlLabel control={<Checkbox size="small" checked={field.value} onChange={(e)=>{
                        setValue('periodicityInfo.type', 'day')
                        field.onChange(e.target.checked)
                      }}/>} label="화" disabled={none}/>
                    )}/>
                    <Controller name="periodicityInfo.wedsYn" control={control} defaultValue={false} render={({ field }) => (
                      <FormControlLabel control={<Checkbox size="small" checked={field.value} onChange={(e)=>{
                        setValue('periodicityInfo.type', 'day')
                        field.onChange(e.target.checked)
                      }}/>} label="수" disabled={none}/>
                    )}/>
                    <Controller name="periodicityInfo.thurYn" control={control} defaultValue={false} render={({ field }) => (
                      <FormControlLabel control={<Checkbox size="small" checked={field.value} onChange={(e)=>{
                        setValue('periodicityInfo.type', 'day')
                        field.onChange(e.target.checked)
                      }}/>} label="목" disabled={none}/>
                    )}/>
                    <Controller name="periodicityInfo.friYn" control={control} defaultValue={false} render={({ field }) => (
                      <FormControlLabel control={<Checkbox size="small" checked={field.value} onChange={(e)=>{
                        setValue('periodicityInfo.type', 'day')
                        field.onChange(e.target.checked)
                      }}/>} label="금" disabled={none}/>
                    )}/>
                    <Controller name="periodicityInfo.satYn" control={control} defaultValue={false} render={({ field }) => (
                      <FormControlLabel control={<Checkbox size="small" checked={field.value} onChange={(e)=>{
                        setValue('periodicityInfo.type', 'day')
                        field.onChange(e.target.checked)
                      }}/>} label="토" disabled={none}/>
                    )}/>
                  </FormGroup>

                  <div className="none-count-wrapper">
                    <FormControlLabel control={<Checkbox size="small"/>} onChange={noneCheckHandler} label="요일미지정" />
                    <Controller 
                    name="periodicityInfo.count" 
                    control={control} 
                    defaultValue=""
                    render={({ field }) => (
                      <TextField 
                      {...field}
                      disabled={!none}
                      id="count" 
                      type="number"
                      label="횟수" 
                      size="small" 
                      variant="outlined"
                      style={{width:"200px", height:"30px"}}
                      InputLabelProps={{
                        shrink: true,
                      }}
                      // error={!!errors.periodicityInfo?.count}
                      // helperText={errors.periodicityInfo?.count.message}

                      error={!!error.count}
                      helperText={error.count}
                      />
                    )} />
                  </div>
                </div>
                :
                // 월/일 N회 일때(count)
                <div>
                  <Controller 
                  name="periodicityInfo.count" 
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                  <TextField 
                    {...field}
                    id="count" 
                    type="number"
                    label="횟수" 
                    size="small"   
                    variant="outlined"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    error={!!errors.periodicityInfo?.count}
                    helperText={errors.periodicityInfo?.count.message}
                    />
                  )}/>
                </div>}
              </div>
            : null}
            
            {/* <PeriodicityInfo 
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
            /> */}
            <div className="slider-wrapper">
              <label className="modal-title">진행률</label>
              <div className="slider-border">
                <Controller
                name="progressRate"
                control={control}
                render={({ field }) =>(
                  <Slider
                  style={{width:"90%"}}
                  aria-label="progressRate"
                  valueLabelDisplay="auto"
                  step={10}
                  marks
                  min={0}
                  max={100}
                  value={parseInt(field.value)}
                  onChange={(e) => field.onChange(e.target.value)}
                  />
                )}/>
                
              </div>
            </div>
            <div className="parent-modal-wrapper">
              <GoalTitleListModal 
                control={control}
                setValue={setValue}
                watch={watch}
                parentId={parentId}
                setParentId={setParentId}
                parentGoalTitle={parentGoalTitle}
                setParentGoalTitle={setParentGoalTitle}
                setColor={setColor}
              />   
              <div className="parent-title">{parentGoalTitle}</div>
            </div>

            {parentId ?  null : <DebouncedPicker color={color} onChange={setColor} setValue={setValue} errors={errors}/>}

            <div className="button-wrapper">
              <input type="submit" className="submitBtn" />
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
          {/* <FormControlLabel control={<Checkbox sx={checkboxStyle} size="small"/>} onChange={noneCheckHandler} label="요일미지정" /> */}
          <Checkbox size="small" checked={false} label="요일미지정" />
          <TextField 
            defaultValue={3}
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
          required
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


export default GoalInsertFormModal;