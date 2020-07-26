import React from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { makeStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import ListAltIcon from '@material-ui/icons/ListAlt';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import AccountBalanceIcon from '@material-ui/icons/AccountBalance';
import { showError } from '../redux/actions';

const useStyles = makeStyles({
  root: {
    width: 500,
    margin: '0 auto',
  },
});

export function MainNavigation() {
  const [value, setValue] = React.useState('add');

  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();

  return (
    <BottomNavigation
      value={value}
      onChange={(event, newValue) => {
        setValue(newValue);
        history.push(`/${newValue}`);
        dispatch(showError(''));
      }}
      showLabels
      className={classes.root}
    >
      <BottomNavigationAction
        label="Add"
        icon={<MonetizationOnIcon />}
        value="add"
      />{' '}
      <BottomNavigationAction
        label="List"
        icon={<ListAltIcon />}
        value="list"
      />
      <BottomNavigationAction
        label="Remove"
        icon={<DeleteForeverIcon />}
        value="remove"
      />
      <BottomNavigationAction
        label="Calculate"
        icon={<AccountBalanceIcon />}
        value="calculate"
      />
    </BottomNavigation>
  );
}
