import React from "react";
import FoodBox from "./FoodBox";
import AddFoodForm from "./AddFoodForm";
import Search from "./Search";
import foods from "../foods.json";

// NOTE when importing data from another file,
// it can be helpful to keep some fake data commented out
// so you do not forget what it looks like!
// this.state.food is an array of objects, each object looks like this:
// {
//   "name": "Pizza",
//   "calories": 400,
//   "image": "https://i.imgur.com/eTmWoAN.png",
//   "quantity": 0
// }

class Foods extends React.Component {
  state = {
    displayAddForm: false,
    foods,
    filtered: foods,
    today: []
  };

  handleClick = () => {
    this.setState({
      displayAddForm: !this.state.displayAddForm
    });
  };

  filterFood = input => {
    const filtered = this.state.foods.filter(el =>
      el.name.toLowerCase().includes(input.toLowerCase())
    );
    this.setState({ filtered });
  };

  pushFood = food => {
    // const foods = this.state.foods.slice();
    const foods = [...this.state.foods];
    // using unshift like below just pushes the new food into the array, but into the first position!
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/unshift#Examples
    foods.unshift(food);
    this.setState({ foods, filtered: foods, displayAddForm: false });
  };

  addFood = food => {
    // NOTE we can also use slice() to copy an array!
    let today = this.state.today.slice();
    let found = today.find(el => el.name === food.name);

    food.calories *= food.quantity;

    if (found) {
      found.quantity += food.quantity;
      found.calories += food.calories;
    } else {
      today.push(food);
    }

    this.setState({
      today
    });
  };

  render() {
    const {filtered, today, displayAddForm} = this.state;

    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce#Examples
    const totalCalories = today.reduce(
      (acc, val) => acc + val.calories,
      0
    );

    const arrayOfFoodComponents = filtered.map((el, i) => (
      <FoodBox key={i} food={el} addFood={this.addFood} />
    ));

    const arrayOfListItemsShowingFoodEatenToday = today.map((el, i) => {
      return (
        <li key={i}>
          {el.quantity} {el.name} = {el.calories} cal
        </li>
      );
    })

    return (
      <div>
        <Search filterFood={this.filterFood} />
        <button className="button" onClick={this.handleClick}>
          Add Food
        </button>
        {/* NOTE the below is a VERY common use case of conditional rendering! */}
        {displayAddForm && <AddFoodForm pushFood={this.pushFood} />}
        <div>
          <div style={{ width: "70%", float: "left" }}>
            {arrayOfFoodComponents}
          </div>
          <div style={{ width: "30%", float: "right" }}>
            <h2>Today's food</h2>
            <ul>
              {arrayOfListItemsShowingFoodEatenToday}
              <p>Total: {totalCalories} calories</p>
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

export default Foods;
