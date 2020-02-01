import React, {Component} from 'react';
import ImprovedCard from "./ImprovedCard";

class DynamicMoviesList extends Component {
  constructor() {
    super();
    this.state = {
      movies: [
        // NOTE I UPDATED THE MOVIES TO INCLUDE AN ID!! In the lecture there is no id field :)
        // this is the recommended way to fix the bug from the lecture
        { id: 0, title: "The Godfather", director: "Francis Coppola", hasOscars: true, IMDbRating: 9.2 },
        { id: 1, title: "Star Wars", director: "Rian Johnson" , hasOscars: true, IMDbRating: 8.7 },
        { id: 2, title: "The Shawshank Redemption", director: "Frank Darabont", hasOscars: false, IMDbRating: 9.3 }
      ],
      showOscarAwarded: false,
    }
  }

  // NOTE since this function is only one line, we could just call setState() directly
  // when the Hide button is clicked below, try to implement for "fun"
  // NOTE whenever the hide button is clicked, which calls this function,
  // we toggle the value of showOscarAwarded from true to false, or vice versa
  toggleMovies = () => {
    this.setState({showOscarAwarded: !this.state.showOscarAwarded});
  }

  // NOTE this handler is an exmple of lifting up the state!!
  // we pass this function to the child component, ImprovedCard, where it is actually executed
  // by doing this, ImprovedCard can change the state which lives inside its parent component (in this file)
  deleteMovieHandler = (movieIndex) => {
    // NOTE as part of the bug fix. we want to delete the movie from the ORIGNAL array of movies, located in the state. not the filtered movies list!
    const moviesCopy = [...this.state.movies];
    // NOTE before we modify the state, we make a copy of the array we need (above)
    // then we can delete the appropriate movie (below) see this for docs about splice https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/splice#Remove_1_element_from_index_3
    moviesCopy.splice(movieIndex, 1);
    // NOTE after we remove the deleted movie, from the copy of the movies list,
    // we set the new list of movies, back into the state (below)
    this.setState({movies: moviesCopy});
  }

  render() {
    const {showOscarAwarded, movies} = this.state;
    console.log(movies);

    // NOTE this filters the movies, so the page only shows movies that have won an oscar (when showOscarAwarded === true)
    // or to only show the movies which have NOT won an oscar (when showOscarAwarded === false)
    // NOTE to read about filtering arrays in js: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter
    const filteredMovies = movies.filter(theMovie => theMovie.hasOscars === showOscarAwarded);

    return (
      <div>
        <hr />
        <button onClick={() => this.toggleMovies() }>
          {/* NOTE another example of a ternary operator below.
            if showOscarAwarded === true, display "click to hide..." OR, if showOscarAwarded === false, display "click to show..." */}
          {showOscarAwarded ? 'Click to Hide Oscar Awarded Movies' : 'Click to Show Oscar Awarded Movies'}
        </button>
        {
            filteredMovies.map((oneMovie) => {
                return (<ImprovedCard
                    // NOTE the value for key is not important, it just needs to be unique
                    key={oneMovie.id}
                    // NOTE this special syntax below saves a few lines of code!
                    // without it, we need need to pass a separate prop for the title, director, hasOscars, & IMDbRating!
                    {...oneMovie}
                    // NOTE by setting the id field inside of the this.state.movies, it makes things easier :)
                    clickToDelete={() => this.deleteMovieHandler(oneMovie.id)}
                />);
            })
        }
      </div>
    );
  }
}

export default DynamicMoviesList;
