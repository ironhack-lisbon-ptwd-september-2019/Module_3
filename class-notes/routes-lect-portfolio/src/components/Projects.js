import React from 'react';
import {Link} from 'react-router-dom';

// export const myProjects = {
//   "1a": {
//     name: "The Frogger Clone",
//     year: 2017,
//     technologies: "JavaScript, jQuery",
//     description: "The first project game clone."
//   },
//   "2b": {
//     name: "iTravel",
//     year: 2017,
//     technologies: "Mongo DB, ExpressJS, NodeJS, JavaScript, HTML, CSS",
//     description: "Web App that allows logged in users to share their experiences about travel destinations."
//   },
//   "3c": {
//     name: "The Plan",
//     year: 2017,
//     technologies: "Mongo DB, ExpressJS, Angular2, NodeJS, JavaScript, HTML, CSS",
//     description: "Web App that allows logged in users to plan your next activity with your friends or business partners."
//   }
// };

export const Projects = (props) => {
  // NOTE here is an ES6 trick to use the map() on an Object instead of an array! ...well kinda
  // https://dev.to/saigowthamr/how-to-loop-through-object-in-javascript-es6-3d26
  // First we can create an array of the Object's keys:
  // `Object.keys(myProjects)` // returns -> ["1a", "2b", "3c"]
  // From that array, we can call .map()
  // `Object.keys(myProjects).map(key => console.log(key))` will return and print each key:
  // >> 1a
  // >> 2b
  // >> 3c
  const {myProjects} = props;
  const arrayOfMyProjectDivs = Object.keys(myProjects).map(key => {
    const eachProject = myProjects[key];
    return (
      <div key={key}>
        <h3>
          {/* {eachProject.name} */}
          <Link to={`/projects/${key}`}>{eachProject.name}</Link>
        </h3>
        <h4>{eachProject.technologies}</h4>
        <hr />
      </div>
    );
  });

  return (
    <div>
      <h2>Projects:</h2>
      {arrayOfMyProjectDivs}
    </div>
  );
};

export default Projects;