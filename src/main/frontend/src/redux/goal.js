export const initialState = {
    goalFullList : [],
    loadGoalFullListLoading : false, //게시글 로딩 중
    loadGoalFullListDone : false,
    loadGoalFullListError : null,
}
// action 은 생략 그때그때 만들어서 사용

// types
export const LOAD_GOALFULLLIST_REQUEST = 'LOAD_GOALFULLLIST_REQUEST';
export const LOAD_GOALFULLLIST_SUCCESS = 'LOAD_GOALFULLLIST_SUCCESS';
export const LOAD_GOALFULLLIST_FAILURE = 'LOAD_GOALFULLLIST_FAILURE';

//reducer
const goalReducer = (state=initialState, action) =>{
    switch(action.type) {
        case LOAD_GOALFULLLIST_REQUEST:
            return {
                ...state,
                loadGoalFullListLoading : true, //게시글 로딩 중
                loadGoalFullListDone : false,
                loadGoalFullListError : null,
            }
        case LOAD_GOALFULLLIST_SUCCESS:
            return {
                ...state,
                loadGoalFullListLoading : false, //게시글 로딩 중
                loadGoalFullListDone : true,
                goalFullList : action.data,
            }
        case LOAD_GOALFULLLIST_FAILURE:
            return {
                ...state,
                loadGoalFullListLoading : false, //게시글 로딩 중
                loadGoalFullListError : action.error,
            }
        default:
            return state;


    }
}

export default goalReducer;