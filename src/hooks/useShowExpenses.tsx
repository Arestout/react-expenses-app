import { useSelector } from 'react-redux';
import { createSelector } from 'reselect';

import { RootState } from '../redux/reducer';
import { Expense } from '../redux/types';

export const useShowExpenses = () => {
  const compare = (a: Expense, b: Expense) => {
    if (a.date > b.date) {
      return -1;
    }
    if (a.date < b.date) {
      return 1;
    }
    return 0;
  };

  const selectExpensesByDate = createSelector(
    (state: RootState) => state.expenses,
    (expenses) => expenses.sort(compare)
  );

  const expensesByDate = useSelector(selectExpensesByDate);
  const showExpenses = useSelector((state: RootState) => state.showExpenses);

  return {
    showExpenses,
    expensesByDate,
  };
};
