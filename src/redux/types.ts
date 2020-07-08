export type Expense = {
  date: string;
  amount: string;
  currency: string;
  name: string;
};

export type Expenses = Expense[];

export interface Rates {
  base?: 'string';
  rates?: any;
}

export const SHOW_LOADER = 'SHOW_LOADER';
export type ShowLoaderAction = {
  type: typeof SHOW_LOADER;
};

export const HIDE_LOADER = 'HIDE_LOADER';
export type HideLoaderAction = {
  type: typeof HIDE_LOADER;
};

export const SHOW_ERROR = 'SHOW_ERROR';
export type ShowErrorAction = {
  type: typeof SHOW_ERROR;
  payload: string;
};

export const ADD_NEW_EXPENSE = 'ADD_NEW_EXPENSE';
export type AddNewExpense = {
  type: typeof ADD_NEW_EXPENSE;
  payload: string;
};

export const CLEAR_EXPENSE_BY_DATE = 'CLEAR_EXPENSE_BY_DATE';
export type clearExpenseByDate = {
  type: typeof CLEAR_EXPENSE_BY_DATE;
  payload: string;
};

export const SHOW_EXPENSES = 'SHOW_EXPENSES';
export type listAllExpenses = {
  type: typeof SHOW_EXPENSES;
};

export const UPDATE_RATES = 'UPDATE_RATES';
export type updateCurrencyRates = {
  type: typeof UPDATE_RATES;
  payload: Rates;
};

export const SHOW_TOTAL_AMOUNT = 'SHOW_TOTAL_AMOUNT';
export type showTotalAmount = {
  type: typeof SHOW_TOTAL_AMOUNT;
};

export type AppActionTypes =
  | ShowLoaderAction
  | HideLoaderAction
  | ShowErrorAction
  | AddNewExpense
  | clearExpenseByDate
  | listAllExpenses
  | updateCurrencyRates
  | showTotalAmount;
