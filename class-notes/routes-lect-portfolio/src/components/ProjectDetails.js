import React from 'react';
// import {myProjects} from './Projects';
import {Link} from 'react-router-dom';

const ProjectDetails = (props) => {
  console.log(props);
  // return null;
  const {match, myProjects} = props;
  const foundProject = myProjects[match.params.id];

    return (
        <div>
          <h2>
            {foundProject.name} <span style={{fontSize:"14px"}}>{foundProject.year}</span>
          </h2>
          <h3>Used technologies: {foundProject.technologies}</h3>
          <p>{foundProject.description}</p>
          <Link to='/projects'>Back to Pojects Page</Link>
        </div>
      );
}

export default ProjectDetails;