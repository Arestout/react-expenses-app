import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { clearExpenseByDate } from '../redux/actions';
import { DatePicker } from './FormElements/DatePicker';
import { transformDate } from '../utils';
import { SubmitForm } from './FormElements/SubmitForm';
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export const RemoveExpenses = () => {
  const materialDateInput = transformDate();

  const [inputData, setInputData] = useState('');
  const [date, setDate] = useState(materialDateInput);
  const [onSuccessMessage, setOnSuccessMessage] = useState<string>('');
  const [open, setOpen] = React.useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    setInputData(`clear ${date}`);
  }, [date]);

  const handleDateChange = (newDate: string) => {
    setDate(transformDate(newDate));
  };

  const handleAgree = () => {
    setOpen(false);
    dispatch(clearExpenseByDate(date));
    setOnSuccessMessage('Expenses were successfully removed');
  };

  const handleClose = () => {
    setOpen(false);
  };

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setOpen(true);
  };

  return (
    <>
      <form onSubmit={onSubmit}>
        <DatePicker value={date} onChange={handleDateChange} />
        <SubmitForm
          inputData={inputData}
          setInputData={setInputData}
          buttonText="Remove"
        />
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {'Please confirm your removal'}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Are you sure you want to remove your expenses?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={handleAgree} color="primary" autoFocus>
              Confirm
            </Button>
          </DialogActions>
        </Dialog>
      </form>
      {onSuccessMessage && <Alert severity="success">{onSuccessMessage}</Alert>}
    </>
  );
};
