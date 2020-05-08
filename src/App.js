import React from 'react';
import 'semantic-ui-css/semantic.min.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import ContactPage from './ContactPage';
import ContactsPage from './ContactsPage';
import GroupsPage from './GroupsPage';
import LoginPage from './LoginPage';
import RegisterPage from './RegisterPage';
import HomePage from './HomePage';
import NoMatchPage from './NoMatchPage';

export default function App() {
  return (
    <Router>
      <div>
        <Switch>
          <Route exact path='/'>
          	<HomePage />
          </Route>
          <Route path='/login'>
            <LoginPage />
          </Route>
          <Route path='/register'>
            <RegisterPage />
          </Route>
          <PrivateRoute path='/contact/:id'>
            <ContactPage />
          </PrivateRoute>
      		<PrivateRoute path='/contact'>
            <ContactsPage />
          </PrivateRoute>
      		<PrivateRoute path='/groups'>
            <GroupsPage />
          </PrivateRoute>
          <Route path="*">
            <NoMatchPage />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}
