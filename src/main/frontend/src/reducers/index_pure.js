// 사가 없이 만들기

const initialState = {
  articles : []
};

// article 관련 액션
export const ADD_ARTICLE = "ADD_ARTICLE";

export const addArticle = article => ({ 
  type: "ADD_ARTICLE",
  payload: article
});

// Reducer
const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_ARTICLE:
      return { ...state, articles: [...state.articles, action.payload] };
    default:
      return state;
  }
};

export default rootReducer;