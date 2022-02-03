import React, { useState, useRef, useEffect } from "react"
import "./LeftNavigation.css";
import DateRangePicker from './DateRangePicker';
import GoalTitleList from "./GoalTitleList";
//icon
import { BiSearch } from "react-icons/bi";
import Checkbox from '@mui/material/Checkbox';
// import { useMediaQuery } from "react-responsive";

import { useSelector } from 'react-redux';

import { useDispatch } from 'react-redux';
import { LOAD_GOALSEARCHFULLLIST_REQUEST, LOAD_GOALSEARCHTITLELIST_REQUEST } from "../reducers/goal";

import dayjs from 'dayjs';
//checkbox
const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

function LeftNavigation(props){
   const dispatch = useDispatch();

  // 로컬변수들
  const [searchStartDatetime, setSearchStartDatetime] = useState(new Date());
  const [searchEndDatetime, setSearchEndDatetime] = useState(new Date());


  // 목표조회 조건 update Action
  useEffect(()=> {
    dispatch({
      type : LOAD_GOALSEARCHFULLLIST_REQUEST,
      data : {
        searchStartDatetime : dayjs(searchStartDatetime).format("YYYY-MM-DD"),
        searchEndDatetime : dayjs(searchEndDatetime).format("YYYY-MM-DD"),
      }
    })
    dispatch({
      type : LOAD_GOALSEARCHTITLELIST_REQUEST,
      data : {
        searchStartDatetime : dayjs(searchStartDatetime).format("YYYY-MM-DD"),
        searchEndDatetime : dayjs(searchEndDatetime).format("YYYY-MM-DD"),
      }
    })
  }, [searchStartDatetime, searchEndDatetime])


    // 시간관리(time) 탭에서만 작동    
    const currentURI = window.location.pathname;
    const { goalSearchTitleList } = useSelector((state) => state.goal)

    const [searchTerm, setSearchTerm] = useState("") //검색어
    const [searchResults, setSearchResults] = useState([]) //검색결과

    const inputEl = useRef("")
    const getSearchTerm = ()=>{
        setSearchTerm(inputEl.current.value)
        if (inputEl.current.value !== ""){
            const newGoalSearchTitleList = goalSearchTitleList.filter((goal) =>{
                return Object.values(goal)
                .join(" ")
                .toLowerCase()
                .includes(inputEl.current.value.toLowerCase());
            });
            setSearchResults(newGoalSearchTitleList);
        } else{
            setSearchResults(goalSearchTitleList);
        }
    }
    const OthercheckHandler = (e, checked) =>{
        e.stopPropagation() //이벤트 버블링 막기
        props.setOtherIncludedYn(checked);
    }

    // // Mobile 기준 breakpoint
    // const isMiddleScreen = useMediaQuery({
    //     query: "(max-width: 768px)",
    // });
       
    // // LeftNav 접기 State
    // const [foldState, setFoldState] = useState(isMiddleScreen ? true : false);

    
    return (
        <>
        
        <nav className="left-nav">
            <div className="search-dateRange-area">
                <p>조회기간</p>
                <DateRangePicker
                    startDate={searchStartDatetime}
                    setStartDate={setSearchStartDatetime}
                    endDate={searchEndDatetime}
                    setEndDate={setSearchEndDatetime}/>
            </div>
            
            <div className="search-goalTitle-area">
                <p>목표선택</p>
                               
                <div className="search-input-wrapper">
                    <input type="text" placeholder="검색어를 입력하세요" ref={inputEl} value={searchTerm} onChange={getSearchTerm}/>
                    <i className="search-icon"><BiSearch/></i>
                </div>
                <GoalTitleList 
                goalTitleList={searchTerm.length < 1 ? goalSearchTitleList : searchResults}
                // searchGoalIdList={props.searchGoalIdList}
                // setSearchGoalIdList={props.setSearchGoalIdList}
                />
            </div>
            
            {currentURI === "/time" ? <div className="other-include-area">
                <div className="checkbox-wrapper" onClick={(e) => {OthercheckHandler(e, e.target.checked)}}> 
                    <Checkbox {...label} 
                        checked={props.otherIncludedYn}
                    />
                </div>
                <div className="total-check">기타포함</div>
            </div> : null}
            
        </nav>
        
    </>
    )
    
}




export default LeftNavigation;