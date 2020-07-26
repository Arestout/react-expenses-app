import React from 'react';
import { useShowExpenses } from '../hooks/useShowExpenses';

import {} from '../redux/actions';
import { ExpensesTable } from './ExpensesTable';

export const ListExpenses = () => {
  const { expensesByDate } = useShowExpenses();

  return <ExpensesTable tableData={expensesByDate} />;
};
