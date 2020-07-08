import * as types from './types';
import { api } from '../api';

export function showLoader(): types.AppActionTypes {
  return {
    type: types.SHOW_LOADER,
  };
}

export function hideLoader(): types.AppActionTypes {
  return {
    type: types.HIDE_LOADER,
  };
}

export function showError(text: string): types.AppActionTypes {
  return {
    type: types.SHOW_ERROR,
    payload: text,
  };
}

export function addNewExpense(text: string): types.AppActionTypes {
  return {
    type: types.ADD_NEW_EXPENSE,
    payload: text,
  };
}

export function clearExpenseByDate(text: string): types.AppActionTypes {
  return {
    type: types.CLEAR_EXPENSE_BY_DATE,
    payload: text,
  };
}

export function listAllExpenses(): types.AppActionTypes {
  return {
    type: types.SHOW_EXPENSES,
  };
}

export function updateCurrencyRates(rates: types.Rates): types.AppActionTypes {
  return {
    type: types.UPDATE_RATES,
    payload: rates,
  };
}

export function showTotalAmount(): types.AppActionTypes {
  return {
    type: types.SHOW_TOTAL_AMOUNT,
  };
}

export const fetchCurrencyRates = (inputData: string) => async (
  dispatch: Function
) => {
  const baseCurrency = inputData.split(' ')[1];
  dispatch(showLoader());
  dispatch(showError(''));
  await api
    .get(baseCurrency)
    .then((result) => {
      if (result.success) {
        return dispatch(updateCurrencyRates(result));
      }
      throw new Error(result.error.type);
    })
    .catch((error) => {
      dispatch(showError(error.message));
      console.log(error);
    });
  dispatch(hideLoader());
  dispatch(showTotalAmount());
};
