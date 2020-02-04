import React, {Component} from 'react';
import ImprovedCard from "./ImprovedCard";
import AddMovie from "./AddMovie";

class DynamicMoviesList extends Component {
  constructor() {
    super();
    this.state = {
      movies: [
        {title: "The Godfather", director: "Francis Coppola", hasOscars: true, IMDbRating: 9.2},
        {title: "Star Wars", director: "Rian Johnson" , hasOscars: true, IMDbRating: 8.7},
        {title: "The Shawshank Redemption", director: "Frank Darabont", hasOscars: false, IMDbRating: 9.3}
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

    // by removing the filteredMovies variable, and using conditional rendering inside of ImprovedCard.js
    // now we can go back to the original code from the lecture, and just use the movies index!
    moviesCopy.splice(movieIndex, 1);

    // NOTE after we remove the deleted movie, from the copy of the movies list,
    // we set the new list of movies, back into the state (below)
    this.setState({movies: moviesCopy});
  }

  addMovieHandler = (theMovie) => {
    const moviesCopy = [...this.state.movies];
    moviesCopy.push(theMovie);
    this.setState({movies: moviesCopy});
  }

  render() {
    const {showOscarAwarded, movies} = this.state;
    console.log(movies);

    return (
      <div>
        <hr />
        <AddMovie addTheMovie={this.addMovieHandler} />
        <hr />
        <button onClick={() => this.toggleMovies() }>
          {/* NOTE another example of a ternary operator below.
            if showOscarAwarded === true, display "click to hide..." OR, if showOscarAwarded === false, display "click to show..." */}
          {showOscarAwarded ? 'Click to Hide Oscar Awarded Movies' : 'Click to Show Oscar Awarded Movies'}
        </button>
        {
            movies.map((oneMovie, index) => {
                return (<ImprovedCard
                    // NOTE the value for key is not important, it just needs to be unique
                    key={index}
                    // NOTE this special syntax below saves a few lines of code!
                    // without it, we need need to pass a separate prop for the title, director, hasOscars, & IMDbRating!
                    {...oneMovie}
                    showOscarMovies={this.state.showOscarAwarded}
                    // NOTE by setting the id field inside of the this.state.movies, it makes things easier :)
                    clickToDelete={() => this.deleteMovieHandler(index)}
                />);
            })
        }
      </div>
    );
  }
}

export default DynamicMoviesList;
