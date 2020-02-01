import React from 'react';
import Card from "./Card";

const numbers = [1, 2, 3, 4, 5, 6];

// export const listItems = numbers.map(num => <li>{num}</li> );
// NOTE the below is the exactly the same as above, except we include curly braces, so we can include console.logs
// export const listItems = numbers.map(num => {
//     console.log("this number is: ", num);
//     console.log("this index is:", index);
//     return <li>}>{num}</li>;
// });

// NOTE this listItems is the same as above, but we need to define a key prop for each list
// read this for more info https://reactjs.org/docs/lists-and-keys.html
// the only important thing to note about keys, is that they have to be unique,
// so we can have map() give us the index of each item in the array to use for this purpose
export const listItems = numbers.map((num, index) => {
  // console.log("this number is: ", num);
  // console.log("this index is:", index);
  return <li key={index}>{num}</li>;
});

const movies = [
  { title: "Jurassic Park", director: "Steven Spielberg" },
  { title: "Sharknado", director: "Anthony C. Ferrante" },
  { title: "Titanic", director: "James Cameron" }
];

export const MoviesList = () => {
  return (
    <ul>
      { movies.map((oneMovie, index) =>
        <Card
          key={index}
          title={oneMovie.title}
          director={oneMovie.director}
        />)
      }
    </ul>
  );
};
