import React from "react";
import {Link} from "react-router-dom";

const CountriesList = props => {
  const arrayOfCountryLinks = props.countries.map(el => {
    return (
      <Link
        key={el.cca3}
        className="list-group-item list-group-item-action"
        to={"/" + el.cca3}
      >
        <span role="img">{el.flag}</span> {el.name.common}
      </Link>
    );
  });

  return (
    <React.Fragment>
      {arrayOfCountryLinks}
    </React.Fragment>
  );
};

export default CountriesList;
