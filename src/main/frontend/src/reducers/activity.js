// Full + Search
export const activityInitialState = {
    activitySearchFullList : [], //전체 활동 리스트
    loadActivitySearchFullListLoading : false,
    loadActivitySearchFullListDone : false,
    loadActivitySearchFullListError : null,
    searchParams : { // 조건
        searchStartDatetime:'2021-01-01',
        searchEndDatetime:'2021-01-30',
        // searchKind:"deadline",
        // ...(props.orderColumn && { orderColumn: props.orderColumn}), //값이 있을때만 parmas 보냄
        // ...(props.orderColumn && { orderType: props.orderType}), //값이 있을때만 parmas 보냄
        searchGoalIdList: [],
        // gatherGoalYn: props.gatherGoalYn===true ? "Y" : "N", //목표 모아보기변수
    }, // 목표 검색 조건
    activityDayList : [], // 하루 활동 리스트
    loadActivityDayListLoading : false,
    loadActivityDayListDone : false,
    loadActivityDayError : null,
    daySearchParams : {
        searchStartDatetime : '2022-02-16',
        searchEndDatetime : '2022-02-16',
        orderColumn : 'start_datetime',
        orderType : 'asc'
    }
}
// action 은 생략 그때그때 만들어서 사용

// types
export const LOAD_ACTIVITYSEARCHFULLLIST_REQUEST = 'LOAD_ACTIVITYSEARCHFULLLIST_REQUEST';
export const LOAD_ACTIVITYSEARCHFULLLIST_SUCCESS = 'LOAD_ACTIVITYSEARCHFULLLIST_SUCCESS';
export const LOAD_ACTIVITYSEARCHFULLLIST_FAILURE = 'LOAD_ACTIVITYSEARCHFULLLIST_FAILURE';

export const LOAD_ACTIVITYDAYLIST_REQUEST = 'LOAD_ACTIVITYDAYLIST_REQUEST';
export const LOAD_ACTIVITYDAYLIST_SUCCESS = 'LOAD_ACTIVITYDAYLIST_SUCCESS';
export const LOAD_ACTIVITYDAYLIST_FAILURE = 'LOAD_ACTIVITYDAYLIST_FAILURE';



//reducer
const activityReducer = (state=activityInitialState, action) =>{
    switch(action.type) {
        case LOAD_ACTIVITYSEARCHFULLLIST_REQUEST: // 조건검색 활동 로딩
            console.log('요청데이터', action.data)    
            return {
                ...state,
                loadActivitySearchFullListLoading : true, 
                loadActivitySearchFullListDone : false,
                loadActivitySearchFullListError : null,
                searchParams : {
                    ...state.searchParams,
                    ...action.data
                }
            }
        case LOAD_ACTIVITYSEARCHFULLLIST_SUCCESS:
            console.log('응답데이터', action.data) 
            return {
                ...state,
                loadActivitySearchFullListLoading : false, 
                loadActivitySearchFullListDone : true,
                activitySearchFullList : action.data,
            }
        case LOAD_ACTIVITYSEARCHFULLLIST_FAILURE:
            console.log('error', action.error)
            return {
                ...state,
                loadActivitySearchFullListLoading : false,
                loadActivitySearchFullListError : action.error,
            }

        case LOAD_ACTIVITYDAYLIST_REQUEST: // 작성일 하루 활동 리스트 로딩
            console.log('요청데이터', action.data)    
            return {
                ...state,
                loadActivityDayListLoading : true, 
                loadActivityDayListDone : false,
                loadActivityDayListError : null,
                daySearchParams : {
                    ...state.daySearchParams,
                    ...action.data
                }
            }
        case LOAD_ACTIVITYDAYLIST_SUCCESS:
            console.log('응답데이터', action.data) 
            return {
                ...state,
                loadActivityDayListLoading : false, 
                loadActivityDayListDone : true,
                activityDayList : action.data,
            }
        case LOAD_ACTIVITYDAYLIST_FAILURE:
            console.log('error', action.error)
            return {
                ...state,
                loadActivityDayListLoading : false,
                loadActivityDayListError : action.error,
            }
        default : 
            return state;
    }
}

export default activityReducer;