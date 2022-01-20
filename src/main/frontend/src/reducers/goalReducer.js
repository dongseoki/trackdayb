export const goalReducer = (state, action) => {
  switch(action.type) {
    case 'LOAD_GOALDATA_REQUEST':
      return {
        loadGoalDataLoading : true,
        goalData : [],
        loadGoalDataError : null        
      };
    case 'LOAD_GOALDATA_SUCCESS':
      return {
        loadGoalDataLoading : false,
        goalData : action.data,
        loadGoalDataError : null
      };
    case 'LOAD_GOALDATA_FAILURE':
      return {
        loadGoalDataLoading : false,
        goalData : [],
        loadGoalDataError : action.err
      };
    case "SET_INIT_DATA":
      return action.payload;
    case "ADD_GOAL":
      return [...state, action.payload]
    default:
      break;
  }
}