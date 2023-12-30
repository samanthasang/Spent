import UserActionTypes from "./userTypes";
import {
  checkAndDeleteRecord,
  editRecord,
  editTagAndCatt,
  searchDate,
} from "./userUtils";

const INITIAL_STATE = {
  isLogedIn: false,
  tags: [],
  catts: [],
  spent: [],
  repeat: [],
  search: [],
  edit: true,
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
        tags: editTagAndCatt(state.tags, action.payload),
        edit: false,
      };
    case UserActionTypes.EMPTY_TAGS:
      return {
        ...state,
        tags: [],
      };
    case UserActionTypes.ADD_CATTS:
      return {
        ...state,
        catts: editTagAndCatt(state.catts, action.payload),
        edit: false,
      };
    case UserActionTypes.ADD_SPENT:
      return {
        ...state,
        spent: editRecord(state.spent, action.payload),
        edit: false,
      };
    case UserActionTypes.REPEAT_SPENT:
      return {
        ...state,
        repeat: action.payload.spent,
        edit: action.payload.edit,
      };
    case UserActionTypes.DEL_SPENT:
      return {
        ...state,
        spent: checkAndDeleteRecord(state.spent, action.payload),
      };
    case UserActionTypes.DEL_CATT:
      return {
        ...state,
        catts: checkAndDeleteRecord(state.catts, action.payload),
      };
    case UserActionTypes.DEL_TAG:
      return {
        ...state,
        tags: checkAndDeleteRecord(state.tags, action.payload),
      };
    case UserActionTypes.ADD_SEARCH:
      return {
        ...state,
        search: searchDate(state.spent, action.payload[0], action.payload[1]),
      };
    case UserActionTypes.EMPTY_CATTS:
      return {
        ...state,
        catts: [],
      };
    case UserActionTypes.EMPTY_SEARCH:
      return {
        ...state,
        search: [],
      };
    default:
      return state;
  }
};

export default userReducer;
