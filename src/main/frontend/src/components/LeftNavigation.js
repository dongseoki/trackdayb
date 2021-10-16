import React, { useContext } from "react"
import "./LeftNavigation.css";
import DateRangePickerCustom from './DateRangePickerCustom';
import GoalTitleList from "./GoalTitleList";
import { GoalSearchTitleListContext } from "../context/GoalSearchTitleListContext";

function LeftNavigation(props){
    const [goalSearchTitleList ] = useContext(GoalSearchTitleListContext);
    return (
        <nav className="left-nav">
            <div className="search-dateRange-area">
                <p>조회기간</p>
                <DateRangePickerCustom 
                startDate={props.searchStartDatetime}
                endDate={props.searchEndDatetime}
                setStartDate={props.setSearchStartDatetime} 
                setEndDate={props.setSearchEndDatetime}/>
            </div>
            <div className="search-goalTitle-area">
            <GoalTitleList 
            goalTitleList={goalSearchTitleList}
            searchGoalIdList={props.searchGoalIdList}
            setSearchGoalIdList={props.setSearchGoalIdList}
            />
            </div>
        </nav>
    )
}




export default LeftNavigation;