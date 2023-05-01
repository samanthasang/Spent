import UserActionTypes from "./userTypes";

const INITIAL_STATE = {
  user: {},
  isLogedIn: false,
  walletAddress: "",
  IpfsHash: "",
  JoinDate: "",
};

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case UserActionTypes.REGISTER_USER:
      return {
        ...state,
        walletAddress: action.payload,
      };
    case UserActionTypes.IP_FS_HASH:
      return {
        ...state,
        IpfsHash: action.payload,
      };
    case UserActionTypes.SET_TIME:
      return {
        ...state,
        JoinDate: action.payload,
      };
    default:
      return state;
  }
};

export default userReducer;
