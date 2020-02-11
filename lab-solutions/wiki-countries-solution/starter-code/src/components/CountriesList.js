import React from "react";
import {Link} from "react-router-dom";

const CountriesList = props => {
  const nonActiveclassName = "list-group-item list-group-item-action";
  const {activeCountry} = props;

  const arrayOfCountryLinks = props.countries.map(el => {
    const className = (activeCountry === el.cca3) ? `${nonActiveclassName} active` : nonActiveclassName;
    return (
      <Link
        key={el.cca3}
        className={`${className} ${el.cca3}`}
        to={"/" + el.cca3}
        onClick={() => props.onCountryClick(el.cca3)}
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
