import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import ScrollToTop from './common/ScrollToTop';
import PrivateRoute from './common/PrivateRoute';
import Contact from './contact/Contact';
import ContactList from './contacts/ContactList';
import NewContact from './new-contact/NewContact';
import Group from './group/Group';
import GroupList from './groups/GroupList';
import Login from './login/Login';
import Register from './register/Register';
import HomePage from './home/Home';
import NoMatch from './NoMatch';

import 'semantic-ui-css/semantic.min.css';
import './App.css';


export default function App() {
  return (
    <Router>
      <ScrollToTop />
      <Switch>
        <Route exact path='/'>
        	<HomePage />
        </Route>
        <Route path='/login'>
          <Login />
        </Route>
        <Route path='/register'>
          <Register />
        </Route>
        <PrivateRoute path='/contact/:id'>
          <Contact />
        </PrivateRoute>
    		<PrivateRoute path='/contact'>
          <ContactList />
        </PrivateRoute>
        <PrivateRoute path='/new-contact'>
          <NewContact />
        </PrivateRoute>
        <PrivateRoute path='/group/:id'>
          <Group />
        </PrivateRoute>
    		<PrivateRoute path='/group'>
          <GroupList />
        </PrivateRoute>
        <Route path='*'>
          <NoMatch />
        </Route>
      </Switch>
    </Router>
  );
}
