import { CHECK_LOGIN, SIGN_IN, SIGN_OUT } from '../actions/authAction';

const initialState = {
  signInLoading: false,
  signInResult: false,
  signInError: false,

  signOutLoading: false,
  signOutResult: false,
  signOutError: false,

  checkLoginLoading: false,
  checkLoginResult: false,
  checkLoginError: false,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case SIGN_IN:
      return {
        signInLoading: action.payload.loading,
        signInResult: action.payload.data,
        signInError: action.payload.errorMessage,
      };

    case SIGN_OUT:
      return {
        signOutLoading: action.payload.loading,
        signOutResult: action.payload.data,
        signOutError: action.payload.errorMessage,
      };

    case CHECK_LOGIN:
      return {
        checkLoginLoading: action.payload.loading,
        checkLoginResult: action.payload.data,
        checkLoginError: action.payload.errorMessage,
      };

    default:
      return state;
  }
};

export default authReducer;
