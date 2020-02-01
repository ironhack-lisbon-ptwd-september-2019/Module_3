import React from 'react';
import logo from '../logo.svg'; // importing logo from src folder

export const Header = () => {
  // NOTE the h1 and h3 elements below can be moved into separate Title and Descriptioncomponents,
  // as described in the lecture http://learn.ironhack.com/#/learning_unit/8061
  // its mainly an example to demonstrate composition within react, in the real world I would leave as below
  return (
    <header className="App-header">
      <img src={logo} className="App-logo" alt="logo" />
      <h1 className="App-title">Welcome to React, Ironhacker!</h1>
      <h3>You are ready to take this to the next level!</h3>
    </header>
  );
}

export default Header;
