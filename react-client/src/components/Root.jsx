import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import RouteProps from 'react-route-props';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';

import NavHeader from './NavHeader.jsx';
import App from './App.jsx';
import AddProject from './AddProject.jsx';
import Developer from './Developer.jsx';
import Project from './Project.jsx';
import UploadForm from './UploadForm.jsx';

class Root extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      session_id: '',
      username: '',
      name: '',
      projects: [],
      userId: null
    };

    this.checkSignIn = this.checkSignIn.bind(this);
    this.getProjects = this.getProjects.bind(this);
  }

  checkSignIn() {
    axios.get('/checkSession')
      .then((response) => {
        this.setState({
          session_id: response.data.session_id,
          username: response.data.git_username,
          name: response.data.name,
          userId: response.data.id
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  getProjects() {
    console.log('checking for projects...');
    axios.get('/projects')
      .then((response) => {
        this.setState({
          projects: response.data
        });})
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
              projects={this.state.projects}
              checkSignIn={this.checkSignIn}
              getProjects={this.getProjects}
            />

            {/* <Route
              path="/uploadproject"
              component={UploadForm}
            /> */}

            <RouteProps
              path="/create"
              sessionId={this.state.session_id}
              username={this.state.username}
              name={this.state.name}
              userId={this.state.userId}

              render={() => (
                this.state.username ? (
                  // <Redirect to="/uploadproject"/>
                  <UploadForm />
                ) : (
                  <AddProject />
                )
              )}
            />

            <Route path="/project" component={Project} />
            <Route path="/:username" component={Developer} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default Root;
