import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import * as types from './types';

export type AppState = {
  isLoading: boolean;
  errorMessage: string;
  expenses: types.Expenses;
  showExpenses: boolean;
  rates: types.Rates;
  showTotalAmount: boolean;
};

const initialState: AppState = {
  isLoading: false,
  errorMessage: '',
  expenses: [],
  showExpenses: false,
  rates: {},
  showTotalAmount: false,
};

const neverReached = (_never: never) => {};

const convertToObject = (inputData: string): types.Expense => {
  const inputDataArray = inputData.split(' ');

  return {
    date: inputDataArray[1],
    amount: inputDataArray[2],
    currency: inputDataArray[3],
    name: inputDataArray[4],
  };
};

export const reducer = (
  state = initialState,
  action: types.AppActionTypes
): AppState => {
  switch (action.type) {
    case types.SHOW_LOADER:
      return { ...state, isLoading: true };
    case types.HIDE_LOADER:
      return { ...state, isLoading: false };
    case types.SHOW_ERROR:
      return { ...state, errorMessage: action.payload };
    case types.ADD_NEW_EXPENSE:
      return {
        ...state,
        showTotalAmount: false,
        showExpenses: false,
        expenses: [...state.expenses, convertToObject(action.payload)],
      };
    case types.CLEAR_EXPENSE_BY_DATE:
      return {
        ...state,
        expenses: state.expenses.filter(
          (expense) => expense.date !== action.payload.split(' ')[1]
        ),
      };
    case types.SHOW_EXPENSES:
      return {
        ...state,
        showExpenses: true,
        showTotalAmount: false,
      };
    case types.UPDATE_RATES:
      return { ...state, rates: action.payload };
    case types.SHOW_TOTAL_AMOUNT:
      return { ...state, showTotalAmount: true, showExpenses: false };
    default:
      neverReached(action);
  }
  return state;
};

const persistConfig = {
  key: 'root',
  storage,
};

export const persistedReducer = persistReducer(persistConfig, reducer);

export type RootState = ReturnType<typeof persistedReducer>;
