import React from "react";
import {Link, Redirect} from "react-router-dom";

class CountryDetails extends React.Component {
  render() {
    const cca3 = this.props.match.params.cca3;
    const countries = this.props.countries;

    const country = countries.find(country => country.cca3 === cca3) || {};

    // NOTE We should handle invlid routes being used, right?
    if (Object.keys(country).length === 0) {
      console.log("invalid cca3 passed into the route!");
      return <Redirect to="/"/>;
    }

    const arrayOfBorderCountriesListItems = country.borders.map(cca3 => {
      const countryNameForLink = countries.find(country => country.cca3 === cca3).name.common;
      return (
        <li key={cca3}>
          <Link to={"/" + cca3} onClick={() => this.props.onCountryClick(cca3)}>
            { countryNameForLink }
          </Link>
        </li>
      );
    });

    return (
      <div className="col-7">
        {/* NOTE without handling invalid routes above, we can use conditional rendering to avoid errors */}
        {/* <h1>{ country.name && country.name.common }</h1> */}
        <h1>{country.name.common}</h1>
        <table className="table">
          <thead />
          <tbody>
            <tr>
              <td style={{ width: "30%" }}>Capital</td>
              {/* NOTE without handling invalid routes above, we can use conditional rendering to avoid errors */}
              {/* <td>{ country.capital && country.capital[0] }</td> */}
              <td>{country.capital[0]}</td>
            </tr>
            <tr>
              <td>Area</td>
              <td>
                {country.area} km
                <sup>2</sup>
              </td>
            </tr>
            <tr>
              <td>Borders</td>
              <td>
                <ul>
                  {/* NOTE without handling invalid routes at the top, we can use conditional rendering to avoid errors */}
                  {/* { country.borders && arrayOfBorderCountriesListItems } */}
                  {arrayOfBorderCountriesListItems}
                </ul>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

export default CountryDetails;
