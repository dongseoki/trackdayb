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
    },
    addActivityLoading : false, // 활동 추가
    addActivityDone : false,
    addActivityError : null,
    deleteActivityLoading : false, // 활동 삭제
    deleteActivityDone : false,
    deleteActivityError : null,
    modifyActivityLoading : false, // 활동 수정
    modifyActivityDone : false,
    modifyActivityError : null,
}
// action 은 생략 그때그때 만들어서 사용

// types
export const LOAD_ACTIVITYSEARCHFULLLIST_REQUEST = 'LOAD_ACTIVITYSEARCHFULLLIST_REQUEST';
export const LOAD_ACTIVITYSEARCHFULLLIST_SUCCESS = 'LOAD_ACTIVITYSEARCHFULLLIST_SUCCESS';
export const LOAD_ACTIVITYSEARCHFULLLIST_FAILURE = 'LOAD_ACTIVITYSEARCHFULLLIST_FAILURE';

export const LOAD_ACTIVITYDAYLIST_REQUEST = 'LOAD_ACTIVITYDAYLIST_REQUEST';
export const LOAD_ACTIVITYDAYLIST_SUCCESS = 'LOAD_ACTIVITYDAYLIST_SUCCESS';
export const LOAD_ACTIVITYDAYLIST_FAILURE = 'LOAD_ACTIVITYDAYLIST_FAILURE';

export const ADD_ACTIVITY_REQUEST = 'ADD_ACTIVITY_REQUEST';
export const ADD_ACTIVITY_SUCCESS = 'ADD_ACTIVITY_SUCCESS';
export const ADD_ACTIVITY_FAILURE = 'ADD_ACTIVITY_FAILURE';

export const DELETE_ACTIVITY_REQUEST = 'DELETE_ACTIVITY_REQUEST';
export const DELETE_ACTIVITY_SUCCESS = 'DELETE_ACTIVITY_SUCCESS';
export const DELETE_ACTIVITY_FAILURE = 'DELETE_ACTIVITY_FAILURE';

export const MODIFY_ACTIVITY_REQUEST = 'MODIFY_ACTIVITY_REQUEST';
export const MODIFY_ACTIVITY_SUCCESS = 'MODIFY_ACTIVITY_SUCCESS';
export const MODIFY_ACTIVITY_FAILURE = 'MODIFY_ACTIVITY_FAILURE';


//reducer
const activityReducer = (state=activityInitialState, action) =>{
    switch(action.type) {
        case LOAD_ACTIVITYSEARCHFULLLIST_REQUEST: // 조건검색 활동 로딩
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
        case ADD_ACTIVITY_REQUEST: // 활동 추가
            return {
                ...state,
                addActivityLoading : true,
                addActivityDone : false,
                addActivityError : null,
            }
        case ADD_ACTIVITY_SUCCESS: 
            return {
                ...state,
                addActivityLoading : false,
                addActivityDone : true,
                activityDayList :[
                    ...state.activityDayList,
                    action.data.data.activityInfo
                ],
                activitySearchFullList: [
                    ...state.activitySearchFullList,
                    action.data.data.activityInfo
                ]
            }
        case ADD_ACTIVITY_FAILURE: 
            console.log('error', action.error)
            return {
                ...state,
                addActivityLoading : false,
                addActivityError : action.error,
            }
        case DELETE_ACTIVITY_REQUEST: // 활동 삭제
            return {
                ...state,
                deleteActivityLoading : true,
                deleteActivityDone : false,
                deleteActivityError : null,
            }
        case DELETE_ACTIVITY_SUCCESS: 
            return {
                ...state,
                deleteActivityLoading : false,
                deleteActivityDone : true,
                activitySearchFullList : state.activitySearchFullList.filter((v) => v.activityId !== action.data ),
                activityDayList : state.activityDayList.filter((v) => v.activityId !== action.data ),
            }
        case DELETE_ACTIVITY_FAILURE: 
            console.log('error', action.error)
            return {
                ...state,
                deleteActivityLoading : false,
                deleteActivityError : action.error,
            }
        case MODIFY_ACTIVITY_REQUEST: // 활동 수정
            return {
                ...state,
                modifyActivityLoading : true,
                modifyActivityDone : false,
                modifyActivityError : null,
            }
        case MODIFY_ACTIVITY_SUCCESS:
            const activitySearchFullList = [...state.activitySearchFullList]
            const idx = state.activitySearchFullList.findIndex((v) => v.activityId === action.data.activityId)
            activitySearchFullList[idx] = action.data

            const activityDayList = [...state.activityDayList]
            const idx_ = state.activityDayList.findIndex((v) => v.activityId === action.data.activityId)
            activityDayList[idx_] = action.data

            return {
                ...state,
                modifyActivityLoading : false,
                modifyActivityDone : true,
                activitySearchFullList,
                activityDayList,                
            }
        case MODIFY_ACTIVITY_FAILURE: 
            console.log("modify_error", action.error)
            return {
                ...state,
                modifyActivityLoading : false,
                modifyActivityError : action.error,
            }
        default : 
            return state;
    }
}

export default activityReducer;