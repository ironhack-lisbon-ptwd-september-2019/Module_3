import React, {Component} from 'react';
import {myProjects} from './Projects';
import {Link} from 'react-router-dom';

class ProjectDetails extends Component {

  render() {
    console.log(this.props);
    const {params} = this.props.match;
    const foundProject = myProjects[params.id];

    return (
        <div>
          <h2>
            {foundProject.name} <span className="projYear" style={{fontSize:"14px"}}>{foundProject.year}</span>
          </h2>
          <h3>Used technologies: {foundProject.technologies}</h3>
          <p>{foundProject.description}</p>
          <Link to='/projects'>Back to Pojects Page</Link>
        </div>
      );
  }

}

export default ProjectDetails;