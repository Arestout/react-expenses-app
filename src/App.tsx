import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import './App.css';

import { AddExpense } from './components/AddExpense';
import { RemoveExpenses } from './components/RemoveExpenses';
import { ListExpenses } from './components/ListExpenses';
import { CalculateExpenses } from './components/CalculateExpenses';
import { MainNavigation } from './components/MainNavigation';

export const App = () => {
  return (
    <div className="app">
      <MainNavigation />
      <div className="app__content">
        <Switch>
          <Route path="/add" component={AddExpense} />
          <Route path="/list" component={ListExpenses} />
          <Route path="/remove" component={RemoveExpenses} />
          <Route path="/calculate" component={CalculateExpenses} />
          <Redirect to="/add" />
        </Switch>
      </div>
    </div>
  );
};
