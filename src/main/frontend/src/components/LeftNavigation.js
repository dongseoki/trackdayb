import React, { useState, useRef } from "react"
import "./LeftNavigation.css";
import DateRangePicker from './DateRangePicker';
import GoalTitleList from "./GoalTitleList";
//icon
import { BiSearch } from "react-icons/bi";
import Checkbox from '@mui/material/Checkbox';

import { useSelector } from 'react-redux';

//checkbox
const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

function LeftNavigation(props){
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

    return (
        <>
        <nav className="left-nav">
            <div className="search-dateRange-area">
                <p>조회기간</p>
                <DateRangePicker
                    startDate={props.searchStartDatetime}
                    setStartDate={props.setSearchStartDatetime}
                    endDate={props.searchEndDatetime}
                    setEndDate={props.setSearchEndDatetime}/>
            </div>
            
            <div className="search-goalTitle-area">
                <p>목표선택</p>
                               
                <div className="search-input-wrapper">
                    <input type="text" placeholder="검색어를 입력하세요" ref={inputEl} value={searchTerm} onChange={getSearchTerm}/>
                    <i className="search-icon"><BiSearch/></i>
                </div>
                <GoalTitleList 
                    goalTitleList={searchTerm.length < 1 ? goalSearchTitleList : searchResults}
                    searchGoalIdList={props.searchGoalIdList}
                    setSearchGoalIdList={props.setSearchGoalIdList}
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