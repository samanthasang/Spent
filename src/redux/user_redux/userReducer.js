import UserActionTypes from "./userTypes";

const INITIAL_STATE = {
  user: {},
  isLogedIn: false,
  tags: [],
  catts: [],
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
        tags: [...state.tags, action.payload],
      };
    case UserActionTypes.EMPTY_TAGS:
      return {
        ...state,
        tags: [],
      };
    case UserActionTypes.ADD_CATTS:
      return {
        ...state,
        catts: [...state.catts, action.payload],
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
