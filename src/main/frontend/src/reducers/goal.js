// Total & Search // Full & Title
export const initialState = {
    goalTotalFullList : [], // 전체 게시글
    loadGoalTotalFullListLoading : false, // 전체 게시글 로딩 중
    loadGoalTotalFullListDone : false,
    loadGoalTotalFullListError : null,
    goalTotalTitleList : [], // 전체 제목 게시글
    loadGoalTotalTitleListLoading : false, // 전체 제목 로딩 중
    loadGoalTotalTitleListDone : false,
    loadGoalTotalTitleListError : null,
    goalSearchFullList : [], // 조건 검색 게시글
    loadGoalSearchFullListLoading : false, // 조건 게시글 로딩 중
    loadGoalSearchFullListDone : false,
    loadGoalSearchFullListError : null,
    goalSearchTitleList : [], // 조건 검색 게시글 제목
    loadGoalSearchTitleListLoading : false,
    loadGoalSearchTitleListDone : false,
    loadGoalSearchTitleListError : null,
    searchParams : { // 조건 - Full,Title 같은 변수
        searchStartDatetime:'2021-01-01',
        searchEndDatetime:'2021-01-30',
        // searchKind:"deadline",
        // ...(props.orderColumn && { orderColumn: props.orderColumn}), //값이 있을때만 parmas 보냄
        // ...(props.orderColumn && { orderType: props.orderType}), //값이 있을때만 parmas 보냄
        searchGoalIdList: [],
        // gatherGoalYn: props.gatherGoalYn===true ? "Y" : "N", //목표 모아보기변수
    }, // 목표 검색 조건

    goalModalTitleList : [], // 모달창 내부 목표제목리스트
    loadGoalModalTitleListLoading : false,
    loadGoalModalTitleListDone : false,
    modalSearchParams : { // 모달 내부 목표 제목 조건
        searchStartDatetime : '2021-10-01',
        searchEndDatetime :'2021-12-30'
    },
    loadGoalModalTitleListError : null,

    deleteGoalLoading : false, // 목표 삭제
    deleteGoalDone : false,
    deleteGoalError : null,
    addGoalLoading : false, // 목표 추가
    addGoalDone : false,
    addGoalError : null,
    modifyGoalLoading : false, // 목표 수정
    modifyGoalDone : false,
    modifyGoalError : null,
}
// action 은 생략 그때그때 만들어서 사용

// types
export const LOAD_GOALTOTALFULLLIST_REQUEST = 'LOAD_GOALTOTALFULLLIST_REQUEST';
export const LOAD_GOALTOTALFULLLIST_SUCCESS = 'LOAD_GOALTOTALFULLLIST_SUCCESS';
export const LOAD_GOALTOTALFULLLIST_FAILURE = 'LOAD_GOALTOTALFULLLIST_FAILURE';

export const LOAD_GOALTOTALTITLELIST_REQUEST = 'LOAD_GOALTOTALTITLELIST_REQUEST';
export const LOAD_GOALTOTALTITLELIST_SUCCESS = 'LOAD_GOALTOTALTITLELIST_SUCCESS';
export const LOAD_GOALTOTALTITLELIST_FAILURE = 'LOAD_GOALTOTALTITLELIST_FAILURE';

export const LOAD_GOALSEARCHFULLLIST_REQUEST = 'LOAD_GOALSEARCHFULLLIST_REQUEST';
export const LOAD_GOALSEARCHFULLLIST_SUCCESS = 'LOAD_GOALSEARCHFULLLIST_SUCCESS';
export const LOAD_GOALSEARCHFULLLIST_FAILURE = 'LOAD_GOALSEARCHFULLLIST_FAILURE';

export const LOAD_GOALSEARCHTITLELIST_REQUEST = 'LOAD_GOALSEARCHTITLELIST_REQUEST';
export const LOAD_GOALSEARCHTITLELIST_SUCCESS = 'LOAD_GOALSEARCHTITLELIST_SUCCESS';
export const LOAD_GOALSEARCHTITLELIST_FAILURE = 'LOAD_GOALSEARCHTITLELIST_FAILURE';

export const LOAD_GOALMODALTITLELIST_REQUEST = 'LOAD_GOALMODALTITLELIST_REQUEST';
export const LOAD_GOALMODALTITLELIST_SUCCESS = 'LOAD_GOALMODALTITLELIST_SUCCESS';
export const LOAD_GOALMODALTITLELIST_FAILURE = 'LOAD_GOALMODALTITLELIST_FAILURE';

export const DELETE_GOAL_REQUEST = 'DELETE_GOAL_REQUEST';
export const DELETE_GOAL_SUCCESS = 'DELETE_GOAL_SUCCESS';
export const DELETE_GOAL_FAILURE = 'DELETE_GOAL_FAILURE';

export const ADD_GOAL_REQUEST = 'ADD_GOAL_REQUEST';
export const ADD_GOAL_SUCCESS = 'ADD_GOAL_SUCCESS';
export const ADD_GOAL_FAILURE = 'ADD_GOAL_FAILURE';

export const MODIFY_GOAL_REQUEST = 'MODIFY_GOAL_REQUEST';
export const MODIFY_GOAL_SUCCESS = 'MODIFY_GOAL_SUCCESS';
export const MODIFY_GOAL_FAILURE = 'MODIFY_GOAL_FAILURE';


//reducer
const goalReducer = (state=initialState, action) =>{
    switch(action.type) {
        case LOAD_GOALTOTALFULLLIST_REQUEST: // 전체 게시글 로딩 중
            return {
                ...state,
                loadGoalTotalFullListLoading : true, 
                loadGoalTotalFullListDone : false,
                loadGoalTotalFullListError : null,
            }
        case LOAD_GOALTOTALFULLLIST_SUCCESS:
            return {
                ...state,
                loadGoalTotalFullListLoading : false, 
                loadGoalTotalFullListDone : true,
                goalTotalFullList : action.data,
            }
        case LOAD_GOALTOTALFULLLIST_FAILURE:
            return {
                ...state,
                loadGoalTotalFullListLoading : false,
                loadGoalTotalFullListError : action.error,
            }
        case LOAD_GOALTOTALTITLELIST_REQUEST: // 전체 게시글 제목 로딩 중
            return {
                ...state,
                loadGoalTotalTitleListLoading : true, 
                loadGoalTotalTitleListDone : false,
                loadGoalTotalTitleListError : null,
            }
        case LOAD_GOALTOTALTITLELIST_SUCCESS:
            return {
                ...state,
                loadGoalTotalTitleListLoading : false, 
                loadGoalTotalTitleListDone : true,
                goalTotalTitleList : action.data,
            }
        case LOAD_GOALTOTALTITLELIST_FAILURE:
            return {
                ...state,
                loadGoalTotalTitleListLoading : false,
                loadGoalTotalTitleListError : action.error,
            }
        case LOAD_GOALSEARCHFULLLIST_REQUEST: //조건 검색 게시글 로딩 중 (action.data = searchParams)
            console.log('acton.data', action.data)
            return {
                ...state,
                loadGoalSearchFullListLoading : true, 
                loadGoalSearchFullListDone : false,
                loadGoalSearchFullListError : null,
                searchParams : {
                    ...state.searchParams,
                    ...action.data
                }
            }
        case LOAD_GOALSEARCHFULLLIST_SUCCESS:
            return {
                ...state,
                loadGoalSearchFullListLoading : false, 
                loadGoalSearchFullListDone : true,
                goalSearchFullList : action.data,
            }
        case LOAD_GOALSEARCHFULLLIST_FAILURE:
            return {
                ...state,
                loadGoalSearchFullListLoading : false,
                loadGoalSearchFullListError : action.error,
            }
        
        case LOAD_GOALSEARCHTITLELIST_REQUEST: //조건 검색 게시글 제목 로딩 중 (action.data = searchParams)
            console.log('acton.data', action.data)
            return {
                ...state,
                loadGoalSearchTitleListLoading : true, 
                loadGoalSearchTitleListDone : false,
                loadGoalSearchTitleListError : null,
                searchParams : {
                    ...state.searchParams,
                    ...action.data
                }
            }
        case LOAD_GOALSEARCHTITLELIST_SUCCESS:
            return {
                ...state,
                loadGoalSearchTitleListLoading : false, 
                loadGoalSearchTitleListDone : true,
                goalSearchTitleList : action.data,
            }
        case LOAD_GOALSEARCHTITLELIST_FAILURE:
            return {
                ...state,
                loadGoalSearchTitleListLoading : false,
                loadGoalSearchTitleListError : action.error,
            }
        case LOAD_GOALMODALTITLELIST_REQUEST: // 모달창 내부 목표 제목 로딩 중 (action.data = searchParams)
            console.log('acton.data', action.data)
            return {
                ...state,
                loadGoalModalTitleListLoading : true, 
                loadGoalModalTitleListDone : false,
                loadGoalModalTitleListError : null,
                modalSearchParams : action.data
            }
        case LOAD_GOALMODALTITLELIST_SUCCESS:
            return {
                ...state,
                loadGoalModalTitleListLoading : false, 
                loadGoalModalTitleListDone : true,
                goalModalTitleList : action.data,
            }
        case LOAD_GOALMODALTITLELIST_FAILURE:
            return {
                ...state,
                loadGoalModalTitleListLoading : false,
                loadGoalModalTitleListError : action.error,
            }
        case DELETE_GOAL_REQUEST: // 목표 삭제
            return {
                ...state,
                deleteGoalLoading : true,
                deleteGoalDone : false,
                deleteGoalError : null,
            }
        case DELETE_GOAL_SUCCESS: 
            return {
                ...state,
                deleteGoalLoading : false,
                deleteGoalDone : true,
                goalTotalFullList : state.goalTotalFullList.filter((v) => v.goalId !== action.data ),
                goalSearchFullList : state.goalSearchFullList.filter((v) => v.goalId !== action.data ),
                goalSearchTitleList : state.goalSearchTitleList.filter((v) => v.goalId !== action.data ),
            }
        case DELETE_GOAL_FAILURE: 
            return {
                ...state,
                deleteGoalLoading : false,
                deleteGoalError : action.error,
            }
        case ADD_GOAL_REQUEST: // 목표 추가
            return {
                ...state,
                addGoalLoading : true,
                addGoalDone : false,
                addGoalError : null,
            }
        case ADD_GOAL_SUCCESS: 
            return {
                ...state,
                addGoalLoading : false,
                addGoalDone : true,
            }
        case ADD_GOAL_FAILURE: 
            return {
                ...state,
                addGoalLoading : false,
                addGoalError : action.error,
            }
        case MODIFY_GOAL_REQUEST: // 목표 수정
            return {
                ...state,
                modifyGoalLoading : true,
                modifyGoalDone : false,
                modifyGoalError : null,
            }
        case MODIFY_GOAL_SUCCESS: 
            return {
                ...state,
                modifyGoalLoading : false,
                modifyGoalDone : true,
            }
        case MODIFY_GOAL_FAILURE: 
            return {
                ...state,
                modifyGoalLoading : false,
                modifyGoalError : action.error,
            }
        default:
            return state;
    }
}

export default goalReducer;