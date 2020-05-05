import React from "react";
import {
  useHistory,
} from "react-router-dom";
import Auth from './Auth';

export default function AuthButton() {
  let history = useHistory();

  return Auth.isAuthenticated ? (
    <p>
      Welcome!{" "}
      <button
        onClick={() => {
          Auth.signout(() => history.push("/"));
        }}
      >
        Sign out
      </button>
    </p>
  ) : (
    <p>You are not logged in.</p>
  );
}