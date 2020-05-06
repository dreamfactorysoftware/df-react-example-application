import React from 'react';
import 'semantic-ui-css/semantic.min.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import ContactsPage from './ContactsPage';
import GroupsPage from './GroupsPage';
import LoginPage from './LoginPage';
import RegisterPage from './RegisterPage';
import HomePage from './HomePage';

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
      		<PrivateRoute path='/contacts'>
            <ContactsPage />
          </PrivateRoute>
      		<PrivateRoute path='/groups'>
            <GroupsPage />
          </PrivateRoute>
        </Switch>
      </div>
    </Router>
  );
}
