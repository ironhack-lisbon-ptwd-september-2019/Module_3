import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

import AddProject from './AddProject'; // <== !!!

class ProjectList extends Component {
  constructor(){
      super();
      this.state = { listOfProjects: [] };
  }

  getAllProjects = () =>{
    axios.get(`http://localhost:5000/api/projects`)
    .then(responseFromApi => {
      this.setState({
        listOfProjects: responseFromApi.data
      })
    });
  }

  componentDidMount() {
    this.getAllProjects();
  }

  render() {
    const arrayOfProjectDivs = this.state.listOfProjects.map( project => {
      return (
        <div key={project._id}>
          <Link to={`/projects/${project._id}`}>
            <h3>{project.title}</h3>
          </Link>
          {/*  added <ul> so the tasks can be displayed:   */}
          <ul>
            { project.tasks.map((task, index) => <li key={index}>{task.title}</li>) }
          </ul>
          {/* <p style={{maxWidth: '400px'}} >{project.description} </p> */}
        </div>
      );
    });

    return (
      <div>
        <div style={{width: '60%', float:"left"}}>
          {arrayOfProjectDivs}
        </div>
        <div style={{width: '40%', float:"right"}}>
            <AddProject getData={() => this.getAllProjects()}/> {/* <== !!! */}
        </div>
      </div>
    );
  }
}

export default ProjectList;
