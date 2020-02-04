import React from 'react';

const oscarsEl = <p>Got the Oscar Award! 😉 </p>;
const noOscarsEl = <p>Great movie but no Oscars! 😔 </p>;

// NOTE this function does exactly the same thing as the ternary operator on line 36
// it also does the same thing as uncommenting both lines 42 & 43, for the conditional rendering example
// uncomment line 39 to use this function
const displayOscarsText = (hasOscars) => {
  if (hasOscars) {
    return oscarsEl;
  } else {
    return noOscarsEl;
  }
}

class ImprovedCard extends React.Component {
  render() {
    // NOTE awardText cannot use a ternary operator or conditional rendering because it has three possible outcomes
    let awardText;
    if (this.props.hasOscars) {
      if (this.props.IMDbRating >= 9) {
        awardText = <p> WOW! Oscar Award and IMDb rating {this.props.IMDbRating}! </p>;
      } else if (this.props.IMDbRating >= 7) {
        awardText = <p> Got the Oscar Award and has IMDb rating {this.props.IMDbRating}, not bad at all! </p>;
      }
    } else {
      awardText = <p> Great movie but no Oscars! Has IMDb rating {this.props.IMDbRating}. </p>;
    }
    return (
      <div  className="movies-list-item">
        <h2>{this.props.title}</h2>
        <p>Director: {this.props.director}</p>

        {/* NOTE below shows a ternary operator. Personally I would use it for this example instead of conditional rendering*/}
        {/* {this.props.hasOscars ? oscarsEl : noOscarsEl} */}

        {/* NOTE below shows an example of a function todo the exact same thing as above, and also same as the conditional rendering below */}
        {/* {displayOscarsText(this.props.hasOscars)} */}

        {/* NOTE the two lines below are examples of conditional rendering. these next two lines accomplish the same thing as line 36*/}
        {/* { this.props.hasOscars && oscarsEl }
        { !this.props.hasOscars && noOscarsEl } */}

        {awardText}

        <button onClick={this.props.clickToDelete}>Delete!</button>
      </div>
    );
  }

};

export default ImprovedCard;
