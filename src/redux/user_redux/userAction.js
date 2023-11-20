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
export const AddCatts = (tag) => {
  return {
    type: UserActionTypes.ADD_CATTS,
    payload: tag,
  };
};
export const EMPTY_CATTS = () => {
  return {
    type: UserActionTypes.EMPTY_CATTS,
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
