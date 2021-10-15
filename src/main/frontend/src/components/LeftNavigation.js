import React, { useContext, useEffect } from "react"
import "./LeftNavigation.css";
import DateRangePickerCustom from './DateRangePickerCustom';
import GoalTitleList from "./GoalTitleList";
import { GoalSearchTitleListContext } from "../context/GoalSearchTitleListContext";

function LeftNavigation(props){
    const [goalSearchTitleList, setGoalSearchTitleList ] = useContext(GoalSearchTitleListContext);
    return (
        <nav className="left-nav">
            <div className="search-date-range">
                <p>조회기간</p>
                <DateRangePickerCustom 
                startDate={props.searchStartDatetime}
                endDate={props.searchEndDatetime}
                setStartDate={props.setSearchStartDatetime} 
                setEndDate={props.setSearchEndDatetime}/>
            </div>
            <GoalTitleList 
            goalTitleList={goalSearchTitleList}
            searchGoalIdList={props.searchGoalIdList}
            setSearchGoalIdList={props.setSearchGoalIdList}
            />
        </nav>
    )
}




export default LeftNavigation;