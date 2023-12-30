import UserActionTypes from "./userTypes";

export const LOGIN = () => {
  return {
    type: UserActionTypes.LOGIN_USER,
  };
};
export const AddTags = (tag) => {
  return {
    type: UserActionTypes.ADD_TAGS,
    payload: tag,
  };
};
export const EMPTY_TAGS = () => {
  return {
    type: UserActionTypes.EMPTY_TAGS,
  };
};
export const AddCatts = (catt) => {
  return {
    type: UserActionTypes.ADD_CATTS,
    payload: catt,
  };
};
export const EMPTY_CATTS = () => {
  return {
    type: UserActionTypes.EMPTY_CATTS,
  };
};
export const addNewSpent = (spent) => {
  return {
    type: UserActionTypes.ADD_SPENT,
    payload: spent,
  };
};
export const deleterecordSpent = (spentID) => {
  return {
    type: UserActionTypes.DEL_SPENT,
    payload: spentID,
  };
};
export const repeatrecordSpent = (spent, edit) => {
  return {
    type: UserActionTypes.REPEAT_SPENT,
    payload: spent,
    edit,
  };
};
export const deleterecordCatt = (cattID) => {
  return {
    type: UserActionTypes.DEL_CATT,
    payload: cattID,
  };
};
export const deleterecordTag = (tagID) => {
  return {
    type: UserActionTypes.DEL_TAG,
    payload: tagID,
  };
};
export const addSearchRecord = (searchValue) => {
  return {
    type: UserActionTypes.ADD_SEARCH,
    payload: searchValue,
  };
};
export const resetSearchRecord = (searchValue) => {
  return {
    type: UserActionTypes.EMPTY_SEARCH,
    payload: searchValue,
  };
};
// export const IpfsHash = () => {
//   return {
//     type: UserActionTypes.IP_FS_HASH,
//     payload: true,
//   };
// };
// export const setJoinDate = (date) => {
//   return {
//     type: UserActionTypes.SET_TIME,
//     payload: date,
//   };
// };
