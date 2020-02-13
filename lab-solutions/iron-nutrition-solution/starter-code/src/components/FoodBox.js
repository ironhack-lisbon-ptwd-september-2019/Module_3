import React from "react";

class FoodBox extends React.Component {
  state = {
    quantity: 1
  };

  handleInputChange = event => {
    const { value } = event.target;

    this.setState({
      quantity: Number(value)
    });
  }

  render() {
    const { name, calories, image } = this.props.food;
    // this notation below is vary useful!!
    const copyOfFoodObjectWithUpdatedQuantity = {...this.props.food, quantity: this.state.quantity};

    return (
      <div className="box">
        <article className="media">
          <div className="media-left">
            <figure className="image is-64x64">
              <img src={image} alt="" />
            </figure>
          </div>
          <div className="media-content">
            <div className="content">
              <p>
                <strong>{name}</strong> <br />
                <small>{calories} cal</small>
              </p>
            </div>
          </div>
          <div className="media-right">
            <div className="field has-addons">
              <div className="control">
                <input
                  onChange={this.handleInputChange}
                  className="input"
                  type="number"
                  value={this.state.quantity}
                />
              </div>
              <div className="control">
                <button
                  onClick={() =>
                    this.props.addFood(copyOfFoodObjectWithUpdatedQuantity)
                  }
                  className="button is-info"
                >
                  +
                </button>
              </div>
            </div>
          </div>
        </article>
      </div>
    );
  }
}

export default FoodBox;
