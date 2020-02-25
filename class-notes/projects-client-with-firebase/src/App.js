import React, { Component } from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom';
import firebase from "firebase";

import ProjectList from './components/projects/ProjectList';
import Navbar from './components/navbar/Navbar';
import ProjectDetails from './components/projects/ProjectDetails';
import TaskDetails from './components/tasks/TaskDetails';
import Signup from './components/auth/Signup';
import Login from './components/auth/Login';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedInUser: null,
      jwt: '',
    };
  }

  componentDidMount() {
    firebase.initializeApp({
      apiKey: "AIzaSyBjOkLdHY5MPLgYMeC8_sjDhMmkyMM5JtI",
      authDomain: "test-projects-auth.firebaseapp.com",
      databaseURL: "https://test-projects-auth.firebaseio.com",
      projectId: "test-projects-auth",
      storageBucket: "test-projects-auth.appspot.com",
      messagingSenderId: "432987245362",
      appId: "1:432987245362:web:7eaeee42c2e30af149252b",
    });

    const loggedInUser = JSON.parse(window.sessionStorage.getItem('fbaseUser'));
    const jwt = window.sessionStorage.getItem('fbaseJwt');
    if (loggedInUser && jwt && !this.state.loggedInUser) {
      this.setState({loggedInUser, jwt});
    }
  }

  getJWT(user) {
    user.getIdToken()
    .then(resp => {
      this.setState({jwt: resp});
      // https://developer.mozilla.org/en-US/docs/Web/API/Window/sessionStorage
      window.sessionStorage.setItem('fbaseUser', JSON.stringify(user));
      window.sessionStorage.setItem('fbaseJwt', resp);
    })
    .catch(err => console.log(err));
  }

  createNewFbaseUser = (email, password, callbackNavToProj) => {
    // https://firebase.google.com/docs/reference/js/firebase.auth.Auth#createuserwithemailandpassword
    firebase.auth().createUserWithEmailAndPassword(email, password)
    .then(resp => {
      // console.log(resp);
      this.setState({loggedInUser: resp.user});
      this.getJWT(resp.user);
      callbackNavToProj();
    })
    .catch(err => alert(err));
  }

  loginFbaseUser = (email, password, callbackNavToProj) => {
    // https://firebase.google.com/docs/reference/js/firebase.auth.Auth#signinwithemailandpassword
    firebase.auth().signInWithEmailAndPassword(email, password)
    .then(resp => {
      // console.log(resp);
      this.setState({loggedInUser: resp.user});
      this.getJWT(resp.user);
      callbackNavToProj();
    })
    .catch(err => alert(err));
  }

  logoutFbaseUser = () => {
    // https://firebase.google.com/docs/reference/js/firebase.auth.Auth#sign-out
    firebase.auth().signOut()
    .then(() => {
      // console.log("User has been logged out");
      this.setState({loggedInUser: null, jwt: ''});
      window.sessionStorage.removeItem('fbaseUser');
      window.sessionStorage.removeItem('fbaseJwt');
    })
    .catch(err => alert(err));
  }

  // testLoggedIn = () => {
  //   axios.get("http://localhost:5000/api/loggedin", {headers: {'Authorization': this.state.jwt}})
  //   .then(resp => console.log('loggedin resp', resp))
  //   .catch(err => console.log(err));
  // }

  render() {
    const {loggedInUser, jwt} = this.state;
    const uid = loggedInUser ? loggedInUser.uid : null;
    return (
      <div className="App">
       <Navbar loggedInUser={loggedInUser} logoutFbase={this.logoutFbaseUser} />
        <Switch>
          <Route exact path='/signup' render={(props) => <Signup createNewFbaseUser={this.createNewFbaseUser} {...props} />} />
          <Route exact path='/login' render={(props) => <Login loginFbaseUser={this.loginFbaseUser} {...props} />} />
          <Route exact path="/projects" render={(props) => <ProjectList uid={uid} jwt={jwt} {...props}/>} />
          <Route exact path="/projects/:id" render={(props) => <ProjectDetails uid={uid} {...props}/>} />
          <Route exact path="/projects/:id/tasks/:taskId" component={TaskDetails} />
        </Switch>
      </div>
    );
  }
}

export default App;
