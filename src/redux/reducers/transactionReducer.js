import { GET_TRANSACTION } from 'redux/actions/transactionAction';

const initialState = {
  getTransactionLoading: false,
  getTransactionResult: false,
  getTransactionError: false,

  signOutLoading: false,
  signOutResult: false,
  signOutError: false,

  checkLoginLoading: false,
  checkLoginResult: false,
  checkLoginError: false,
};

const transactionReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_TRANSACTION:
      return {
        getTransactionLoading: action.payload.loading,
        getTransactionResult: action.payload.data,
        getTransactionError: action.payload.errorMessage,
      };

    default:
      return state;
  }
};

export default transactionReducer;
