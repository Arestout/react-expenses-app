import React, { useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import './App.css';

import {
  addNewExpense,
  clearExpenseByDate,
  listAllExpenses,
  fetchCurrencyRates,
  showError,
} from './redux/actions';

import { useShowExpenses } from './hooks/useShowExpenses';
import { useCalculateTotal } from './hooks/useCalculateTotal';
import { hasOwnProperty } from './utils';

export const App = () => {
  const [inputData, setInputData] = useState('');

  const textInput = useRef<HTMLInputElement | null>(null);
  useEffect(() => {
    if (textInput.current) {
      textInput.current.focus();
    }
  }, []);

  const dispatch = useDispatch();

  const { expensesByDate, showExpenses } = useShowExpenses();
  const {
    totalAmount,
    baseCurrency,
    showTotalAmount,
    errorMessage,
    isLoading,
  } = useCalculateTotal();

  const onChange = (event: React.FormEvent<HTMLInputElement>) => {
    const submittedValue = event.currentTarget.value;
    setInputData(submittedValue);
  };

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const inputDataCommand = inputData.split(' ')[0];
    setInputData('');

    const commands = {
      add: addNewExpense(inputData),
      clear: clearExpenseByDate(inputData),
      list: listAllExpenses(),
      total: fetchCurrencyRates(inputData),
    };

    if (hasOwnProperty(commands, inputDataCommand)) {
      dispatch(showError(''));
      dispatch(commands[inputDataCommand]);
    }

    if (!hasOwnProperty(commands, inputDataCommand)) {
      dispatch(showError('Wrong command'));
    }
  };

  return (
    <div className="app">
      <div className="app__content">
        <form onSubmit={onSubmit}>
          <input
            type="text"
            name="inputData"
            value={inputData}
            onChange={onChange}
            ref={textInput}
            className="app__input"
          />
          <button type="submit" className="app__button ">
            Submit
          </button>
        </form>
        {isLoading && <p>Loading...</p>}
        {errorMessage && <p>{errorMessage}</p>}
        {!errorMessage && showExpenses && (
          <div>
            {expensesByDate.map((expense) => (
              <p>
                {`${expense.date} ${expense.amount} ${expense.currency} ${expense.name}`}{' '}
              </p>
            ))}
          </div>
        )}
        {!errorMessage && showTotalAmount && totalAmount && (
          <div>
            <p>{`${totalAmount} ${baseCurrency}`} </p>
          </div>
        )}
      </div>
    </div>
  );
};
