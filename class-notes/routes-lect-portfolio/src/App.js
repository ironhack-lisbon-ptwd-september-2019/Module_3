import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import './App.css';
import Home from './components/Home';
import About from './components/About';
import Navbar from './components/Navbar';
import Projects from './components/Projects';
import ProjectDetails from './components/ProjectDetails';

const projects = {
  "1a": {
    name: "The Frogger Clone",
    year: 2017,
    technologies: "JavaScript, jQuery",
    description: "The first project game clone."
  },
  "2b": {
    name: "iTravel",
    year: 2017,
    technologies: "Mongo DB, ExpressJS, NodeJS, JavaScript, HTML, CSS",
    description: "Web App that allows logged in users to share their experiences about travel destinations."
  },
  "3c": {
    name: "The Plan",
    year: 2017,
    technologies: "Mongo DB, ExpressJS, Angular2, NodeJS, JavaScript, HTML, CSS",
    description: "Web App that allows logged in users to plan your next activity with your friends or business partners."
  }
};

class App extends Component {
  render() {
    return (
      <div className="App">
        <Navbar />
        <Switch>
          <Route exact path='/' component={Home}/>
          <Route path='/about' component={About}/>
          {/* <Route exact path='/projects' component={Projects}/> */}
          <Route 
            exact path='/projects' 
            render={(props) => <Projects {...props} myProjects={projects} />}
          />
          {/* <Route path="/projects/:id" component={ProjectDetails} /> */}
          <Route 
            path="/projects/:id" 
            render={(props) => <ProjectDetails {...props} myProjects={projects} />} 
          />
        </Switch>
      </div>
    );
  }
}

export default App;