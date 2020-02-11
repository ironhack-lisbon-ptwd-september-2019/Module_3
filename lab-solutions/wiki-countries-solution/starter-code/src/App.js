import React, {Component} from "react";
import {Route, Switch} from "react-router-dom";
import Navbar from "./components/Navbar";
import CountriesList from "./components/CountriesList";
import CountryDetails from "./components/CountryDetails";
import axios from "axios";
import "./App.css";
// import countries from "./countries.json";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      countries: [],
      activeCCA3: '',
    };
    this.onCountryClick = this.onCountryClick.bind(this);
  }

  componentDidMount() {
    console.log("did mount");
    axios
      .get("https://countries.tech-savvy.tech/countries")
      .then(response => {
        // console.log("api response");
        this.setState({ countries: response.data });
      })
      .catch(err => console.log(err));
  }

  // for learning purposes
  componentDidUpdate(prevProps, prevState) {
    console.log(prevProps, prevState);
    if (this.state.activeCCA3 !== prevState.activeCCA3) {
      // console.log('new country clicked!', this.state.activeCCA3, prevState.activeCCA3);
      const newCountryElement = document.getElementsByClassName(this.state.activeCCA3)[0];
      newCountryElement.scrollIntoView();
    }
    console.log("update");
  }

  onCountryClick(clickedCCA3) {
    this.setState({activeCCA3: clickedCCA3});
  }

  render() {
    // console.log("render");

    const {countries} = this.state;
    console.log(countries);
    if (!countries.length) {
        return <div className="py-5 text-center">Loading</div>;
    }

    return (
      <div className="App">
        <div>
          <Navbar />
          <div className="container">
            <div className="row">
              <div
                className="col-5"
                style={{maxHeight: "90vh", overflow: "scroll"}}
              >
                <div className="list-group">
                  <CountriesList 
                    countries={countries} 
                    onCountryClick={this.onCountryClick} 
                    activeCountry={this.state.activeCCA3}
                  />
                </div>
              </div>
              <Switch>
                <Route
                  exact
                  path="/:cca3"
                  render={props => (
                    <CountryDetails
                      {...props}
                      onCountryClick={this.onCountryClick}
                      countries={countries}
                    />
                  )}
                />
              </Switch>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
