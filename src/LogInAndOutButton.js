import React from "react";
import {
  useHistory,
} from "react-router-dom";
import {
  Button,
} from 'semantic-ui-react';
import Auth from './Auth';

export default function LogInAndOutButton() {
  let history = useHistory();

  return Auth.isAuthenticated ? (
  	<Button inverted={true} onClick={() => {
      Auth.signout(() => history.push("/"));
    }}>
      Log out
    </Button>
  ) : (
    <Button as='a' href='/login' inverted={true}>
      Log in
    </Button>
  );
}