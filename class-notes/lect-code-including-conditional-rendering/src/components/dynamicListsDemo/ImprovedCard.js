import React from 'react';

const oscarsEl = <p>Got the Oscar Award! 😉 </p>;
const noOscarsEl = <p>Great movie but no Oscars! 😔 </p>;

// NOTE this function does exactly the same thing as the ternary operator on line 35
// it also does the same thing as uncommenting both lines 41 & 42, for the conditional rendering example
// uncomment line 38 to use this function
const displayOscarsText = (hasOscars) => {
  if (hasOscars) {
    return oscarsEl;
  } else {
    return noOscarsEl;
  }
}

const ImprovedCard = (props) => {
  // NOTE awardText cannot use a ternary operator or conditional rendering because it has three possible outcomes
  let awardText;
  if (props.hasOscars) {
    if (props.IMDbRating >= 9) {
      awardText = <p> WOW! Oscar Award and IMDb rating {props.IMDbRating}! </p>;
    } else if (props.IMDbRating >= 7) {
      awardText = <p> Got the Oscar Award and has IMDb rating {props.IMDbRating}, not bad at all! </p>;
    }
  } else {
    awardText = <p> Great movie but no Oscars! Has IMDb rating {props.IMDbRating}. </p>;
  }
  return (
    <div  className="movies-list-item">
      <h2>{props.title}</h2>
      <p>Director: {props.director}</p>

      {/* NOTE below shows a ternary operator. Personally I would use it for this example instead of conditional rendering*/}
      {/* {props.hasOscars ? oscarsEl : noOscarsEl} */}

      {/* NOTE below shows an example of a function todo the exact same thing as above, and also same as the conditional rendering below */}
      {/* {displayOscarsText(props.hasOscars)} */}

      {/* NOTE the two lines below are examples of conditional rendering. these next two lines accomplish the same thing as line 35*/}
      {/* { props.hasOscars && oscarsEl }
      { !props.hasOscars && noOscarsEl } */}

      {awardText}

      <button onClick={props.clickToDelete}>Delete!</button>
    </div>
  );
};

export default ImprovedCard;
