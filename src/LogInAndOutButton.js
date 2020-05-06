import React from 'react';
import {
  useHistory,
  useLocation,
} from "react-router-dom";
import {
  Button,
} from 'semantic-ui-react';
import Auth from './Auth';

export default function LogInAndOutButton(props) {
  const history = useHistory();
  const location = useLocation();
  const redirectTo = '/';
  const logIn = () => Auth.signout().then(() => {
  	if (location.pathname !== redirectTo) {
  		history.push(redirectTo);
  	} else if (typeof props.onLogOut === 'function') {
  		props.onLogOut();
  	}
	});

  return Auth.isAuthenticated ? (
  	<Button inverted onClick={logIn}>
      Log out
    </Button>
  ) : (
    <Button as='a' href='/login' inverted>
      Log in
    </Button>
  );
}