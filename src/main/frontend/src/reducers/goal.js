// Total & Search // Full & Title
export const initialState = {
    goalTotalFullList : [], // 전체 게시글
    loadGoalTotalFullListLoading : false, // 전체 게시글 로딩 중
    loadGoalTotalFullListDone : false,
    loadGoalTotalFullListError : null,

    goalSearchFullList : [], // 조건 검색 게시글
    loadGoalSearchFullListLoading : false, // 조건 게시글 로딩 중
    loadGoalSearchFullListDone : false,
    loadGoalSearchFullListError : null,

    goalSearchTitleList : [], // 조건 검색 게시글 제목
    loadGoalSearchTitleListLoading : false,
    loadGoalSearchTitleListDone : false,
    loadGoalSearchTitleListError : null,

    // 조건 - Full,Title 같은 변수
    searchParams : { // 
        searchStartDatetime:'2021-01-01',
        searchEndDatetime:'2021-01-30',
        // searchKind:"deadline",
        // ...(props.orderColumn && { orderColumn: props.orderColumn}), //값이 있을때만 parmas 보냄
        // ...(props.orderColumn && { orderType: props.orderType}), //값이 있을때만 parmas 보냄
        // searchGoalIdList:props.searchGoalIdList.toString(),
        // gatherGoalYn: props.gatherGoalYn===true ? "Y" : "N", //목표 모아보기변수
    }, // 목표 검색 조건
    
}
// action 은 생략 그때그때 만들어서 사용

// types
export const LOAD_GOALTOTALFULLLIST_REQUEST = 'LOAD_GOALTOTALFULLLIST_REQUEST';
export const LOAD_GOALTOTALFULLLIST_SUCCESS = 'LOAD_GOALTOTALFULLLIST_SUCCESS';
export const LOAD_GOALTOTALFULLLIST_FAILURE = 'LOAD_GOALTOTALFULLLIST_FAILURE';

export const LOAD_GOALSEARCHFULLLIST_REQUEST = 'LOAD_GOALSEARCHFULLLIST_REQUEST';
export const LOAD_GOALSEARCHFULLLIST_SUCCESS = 'LOAD_GOALSEARCHFULLLIST_SUCCESS';
export const LOAD_GOALSEARCHFULLLIST_FAILURE = 'LOAD_GOALSEARCHFULLLIST_FAILURE';

export const LOAD_GOALSEARCHTITLELIST_REQUEST = 'LOAD_GOALSEARCHTITLELIST_REQUEST';
export const LOAD_GOALSEARCHTITLELIST_SUCCESS = 'LOAD_GOALSEARCHTITLELIST_SUCCESS';
export const LOAD_GOALSEARCHTITLELIST_FAILURE = 'LOAD_GOALSEARCHTITLELIST_FAILURE';

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
        default:
            return state;


    }
}

export default goalReducer;