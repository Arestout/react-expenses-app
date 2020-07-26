import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import * as types from './types';

export type AppState = {
  isLoading: boolean;
  errorMessage: string;
  expenses: types.Expenses;
  rates: types.Rates;
};

const initialState: AppState = {
  isLoading: false,
  errorMessage: '',
  expenses: [],
  rates: {},
};

const neverReached = (_never: never) => {};

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
        expenses: [...state.expenses, action.payload],
      };
    case types.CLEAR_EXPENSE_BY_DATE:
      return {
        ...state,
        expenses: state.expenses.filter(
          (expense) => expense.date !== action.payload
        ),
      };
    case types.UPDATE_RATES:
      return { ...state, rates: action.payload };
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
