import React, { Component } from "react";
import Foods from "./components/Foods";
import "./App.css";

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="container">
          <h1 className="title">IronNutrition</h1>
          <Foods />
        </div>
      </div>
    );
  }
}

export default App;
