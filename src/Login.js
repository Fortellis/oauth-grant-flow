import React, { Component } from 'react';
import './App.css';
import { v4 as uuid } from "uuid";
import { stringify as stringifyQuery } from "query-string";
const config = {
  base_url:'https://api.accounts.fortellis.io/oauth2/aus1ufzl27tS4FQ9X2p7/v1/authorize',
  client_id: '63St7B7UqT3lFztb83gY3Q5NocrvvUVu'
};

const getLoginAppURL = function({
  location = window.location,
  config
}){
  const { protocol, host } = location;
  const { base_url, client_id } = config;
  const query = {
    client_id,
    response_type: "code",
    scope: "openid email profile roles",
    redirect_uri: 'http://localhost:3000',
    state: `${protocol}//${host}`,
    nonce: uuid()
  };
  const queryString = stringifyQuery(query);
  return `${base_url}?${queryString}`;
};

class Login extends Component {
  componentDidMount() {
    window.location = getLoginAppURL({ config });
  }
  render() {
    return (
      <div>Redirecting to login page...</div>
    );
  }
}

export default Login;