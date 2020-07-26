import React from 'react';
import Button from '@material-ui/core/Button';

import TextField from '@material-ui/core/TextField';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      margin: theme.spacing(3),
    },
    input: {
      width: '20ch',
      margin: theme.spacing(3),
    },
    button: {
      padding: '15px 60px',
      marginLeft: '30px',
      margin: theme.spacing(3),
    },
    messages: {
      margin: theme.spacing(4),
    },
  })
);

type Props = {
  inputData: string;
  setInputData: (inputData: string) => void;
  buttonText: string;
};

export const SubmitForm = (props: Props) => {
  const { inputData, setInputData, buttonText } = props;

  const classes = useStyles();

  const onChange = (
    event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const submittedValue = event.currentTarget.value;
    setInputData(submittedValue);
  };

  return (
    <>
      <TextField
        type="text"
        name="inputData"
        value={inputData}
        onChange={onChange}
        className={classes.input}
        label="Command Line"
        variant="outlined"
        InputProps={{
          readOnly: true,
        }}
      />
      <Button
        type="submit"
        className={classes.button}
        variant="contained"
        color="primary"
      >
        {buttonText}
      </Button>
    </>
  );
};
