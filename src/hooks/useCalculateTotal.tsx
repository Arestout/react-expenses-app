import { useSelector } from 'react-redux';

import { RootState } from '../redux/reducer';
import { hasOwnProperty } from '../utils';

export type CalculateTotal = {
  totalAmount: string;
  baseCurrency: string;
};

export const useCalculateTotal = (): CalculateTotal => {
  const { rates, expenses } = useSelector((state: RootState) => state);

  const baseCurrency = rates.base || '';

  const totalAmount =
    expenses.length &&
    rates.rates &&
    expenses
      .map((expense) => {
        if (
          expense.currency !== baseCurrency &&
          hasOwnProperty(rates.rates, expense.currency)
        ) {
          return Number(expense.amount) / Number(rates.rates[expense.currency]);
        }
        return Number(expense.amount);
      })
      .reduce((sum, amount) => sum + amount)
      .toFixed(2);

  return {
    totalAmount,
    baseCurrency,
  };
};
