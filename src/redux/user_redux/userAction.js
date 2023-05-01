import UserActionTypes from "./userTypes";

export const UserWalletAddress = (walletAddress) => {
  return {
    type: UserActionTypes.REGISTER_USER,
    payload: walletAddress,
  };
};
export const CheckWalletAddress = () => {
  return {
    type: UserActionTypes.CHECK_WALLET,
    payload: true,
  };
};
export const IpfsHash = () => {
  return {
    type: UserActionTypes.IP_FS_HASH,
    payload: true,
  };
};
export const setJoinDate = (date) => {
  return {
    type: UserActionTypes.SET_TIME,
    payload: date,
  };
};
