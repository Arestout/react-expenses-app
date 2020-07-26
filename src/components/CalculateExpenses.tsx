import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { RootState } from '../redux/reducer';

import { fetchCurrencyRates, showError } from '../redux/actions';
import { useCalculateTotal } from '../hooks/useCalculateTotal';
import { CurrencyPicker } from './FormElements/CurrencyPicker';
import { SubmitForm } from './FormElements/SubmitForm';
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';
import CircularProgress from '@material-ui/core/CircularProgress';

function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export const CalculateExpenses = () => {
  const { errorMessage, isLoading } = useSelector((state: RootState) => state);
  const { totalAmount, baseCurrency } = useCalculateTotal();
  const [inputData, setInputData] = useState<string>('');
  const [currency, setBaseCurrency] = useState<string>('');
  const [onSuccessMessage, setOnSuccessMessage] = useState<string>('');

  const dispatch = useDispatch();

  useEffect(() => {
    setInputData(`calculate ${currency} `);
  }, [currency]);

  const handleCurrencyChange = () => (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setBaseCurrency(event.target.value);
    dispatch(showError(''));
    setOnSuccessMessage('');
  };

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch(fetchCurrencyRates(currency));
    if (!errorMessage) {
      setOnSuccessMessage(`${totalAmount} ${baseCurrency}`);
    }
  };

  return (
    <>
      <form onSubmit={onSubmit}>
        <CurrencyPicker onChange={handleCurrencyChange} value={currency} />
        <SubmitForm
          inputData={inputData}
          setInputData={setInputData}
          buttonText="Calculate"
        />
      </form>
      {isLoading && <CircularProgress />}
      {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
      {!errorMessage && !isLoading && onSuccessMessage && (
        <Alert severity="info">{onSuccessMessage}</Alert>
      )}
    </>
  );
};
