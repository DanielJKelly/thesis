import React from 'react';
import PropTypes from 'prop-types';
import RouteProps from 'react-route-props';
import axios from 'axios';

import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import NavHeader from './NavHeader.jsx';
import App from './App.jsx';
import AddProject from './AddProject.jsx';

class Root extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      session_id: '',
      username: '',
      name: '',
      projects: []
    };
  }

  componentDidMount() {
    this.checkSignIn();
    this.getProjects();
  }

  checkSignIn() {
    axios.get('/checkSession')
      .then((response) => {
        this.setState({
          session_id: response.data.session_id,
          username: response.data.git_username,
          name: response.data.name
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  getProjects() {
    axios.get('/projects')
      .then((response) => {
        this.setState({
          projects: response.data
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    return (
      <Router>
        <div>
          <NavHeader
            sessionId={this.state.session_id}
            username={this.state.username}
            name={this.state.name}
          />
          <Switch>
            <RouteProps
              exact
              path="/"
              component={App}
              sessionId={this.state.session_id}
              username={this.state.username}
              name={this.state.name}
            />
            <RouteProps
              path="/create"
              component={AddProject}
              sessionId={this.state.session_id}
              username={this.state.username}
              name={this.state.name}
            />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default Root;
