import React from 'react';
import './App.css';
import Header from "./components/Header";
import {listItems, MoviesList} from "./components/ListDemo";
import DynamicMoviesList from './components/dynamicListsDemo/DynamicMoviesList';

function App() {
  return (
    <div className="App">
      <Header />
      {/* NOTE the first example diplayed a basic list of numbers,
        I think we do not need to show it anymore */}
      {/* <ul>{listItems}</ul> */}
      <MoviesList />
      <DynamicMoviesList />
    </div>
  );
}

export default App;
