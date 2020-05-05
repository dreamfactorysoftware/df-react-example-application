import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import PrivateRoute from './PrivateRoute';
import GroupsPage from './GroupsPage';
import LoginPage from './LoginPage';

export default function App() {
  return (
    <Router>
      <div>
        <Switch>
          <Route path="/login">
            <LoginPage />
          </Route>
      		<PrivateRoute path="/">
            <GroupsPage />
          </PrivateRoute>
        </Switch>
      </div>
    </Router>
  );
}
