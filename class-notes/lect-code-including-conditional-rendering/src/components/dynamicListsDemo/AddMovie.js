import React, {Component} from 'react';

// NOTE Using ALL CAPS is common when declaring a const variable name,
// especially when using that variable for configuration or default values
const DEFAULT_STATE = {
    title: '',
    director: '',
    hasOscars: false,
    IMDbRating: '',
}

class AddMovie extends Component {
  constructor(props){
      super(props);
      // NOTE we make a copy of the default state object,
      // It saves a few lines of code when we need to reset the state,
      // when handling the form submit later
      this.state = {...DEFAULT_STATE};
  }

  handleChange = (event) => {
    // NOTE we can see with the console.log, that event.target contains
    // the HTML input field which has just been updated
    // console.log(event.target);

    let {name, value, checked} = event.target;
    if(name === "hasOscars") {
        value = checked;
    }
    // why below works: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Object_initializer#Computed_property_names
    this.setState({[name]: value});
  }

  handleFormSubmit = (event) => {
    // NOTE the line below stops the default HTML submit button behavior from happening
    event.preventDefault();

    const newMovie = {...this.state};
    this.props.addTheMovie(newMovie);
    // NOTE the above two lines are optional,  I added it for clarity and readability.
    // The state object currently holds all of the data for the new movie, and nothing more
    // uncommenting the line below uses one line instead of two, and it will work the same
    // this.props.addTheMovie(this.state);

    this.setState({...DEFAULT_STATE});
    // NOTE the line above does the same thing as the 6 lines below. it resets the form to empty fields.
    // this.setState({
    //   title: '',
    //   director: '',
    //   hasOscars: false,
    //   IMDbRating: ''
    // });
  }


  render() {
    // QUESTION why did we use an arrow function for each inputs onChange??
    // NOTE READ THE REACT DOCS!!!! https://reactjs.org/docs/handling-events.html
    // without an arrow function, we would need to bind 'this' manually

    return (
        <form onSubmit={this.handleFormSubmit}>
            <label>Title:</label>
            <input
                type="text"
                name="title"
                value={this.state.title}
                onChange={(e) => this.handleChange(e)}
            />

            <label>Director:</label>
            <input
                type="text"
                name="director"
                value={this.state.director}
                onChange={(e) => this.handleChange(e)}
            />

            <label>Oscar Awarded:</label>
            <input
                type="checkbox"
                name="hasOscars"
                checked={this.state.hasOscars}
                onChange={(e) => this.handleChange(e)}
            />

            <label>IMDb Rating:</label>
            <input
                type="text"
                name="IMDbRating"
                value={this.state.IMDbRating}
                onChange={(e) => this.handleChange(e)}
            />

            <input type="submit" value="Submit" />
        </form>
    );
  }
}

export default AddMovie;
