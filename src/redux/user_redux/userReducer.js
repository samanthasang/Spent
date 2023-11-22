import UserActionTypes from "./userTypes";

const INITIAL_STATE = {
  isLogedIn: false,
  tags: [],
  catts: [],
  spent: [],
};

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case UserActionTypes.LOGIN_USER:
      return {
        ...state,
        isLogedIn: !state.isLogedIn,
      };
    case UserActionTypes.ADD_TAGS:
      return {
        ...state,
        tags: action.payload,
      };
    case UserActionTypes.EMPTY_TAGS:
      return {
        ...state,
        tags: [],
      };
    case UserActionTypes.ADD_CATTS:
      return {
        ...state,
        catts: action.payload,
      };
    case UserActionTypes.ADD_SPENT:
      return {
        ...state,
        spent: action.payload,
      };
    case UserActionTypes.EMPTY_CATTS:
      return {
        ...state,
        catts: [],
      };
    default:
      return state;
  }
};

export default userReducer;
