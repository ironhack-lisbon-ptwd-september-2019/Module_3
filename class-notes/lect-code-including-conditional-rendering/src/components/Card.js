import React from 'react';

// NOTE WARNING be sure only one of the three options are uncommented!!!!

///////// OPTION 1
const card = (props) => {
  // NOTE the below line shows how to destructure the props
  // the same syntax can be used inside a class based component (using this.props of course)
  const {title, director} = props;

  return (
    <div>
      <h2>{title}</h2>
      <p>Director: {director}</p>
    </div>
  );
};

export default card;


/////////// OPTION 2
// const card = ({title, director}) => {
//   // NOTE this is exactly the same as the above code
//   // the only difference, is how we destructure the props on the line below
//   return (
//     <div>
//       <h2>{title}</h2>
//       <p>Director: {director}</p>
//     </div>
//   );
// };
//
// export default card;


///////// OPTION 3
// const card = (props) => {
// // NOTE this is also the same as both above examples
// // this example does not destructure the props
//   return (
//     <div>
//       <h2>{props.title}</h2>
//       <p>Director: {props.director}</p>
//     </div>
//   );
// };
//
// export default card;
