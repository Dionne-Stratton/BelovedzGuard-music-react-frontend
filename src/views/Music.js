import React from "react";
import { useRouteMatch, Link } from "react-router-dom";

export default function Music(props) {
  const { search, onChange, theme, filtered } = props;
  const { url } = useRouteMatch();
  // const themeCurrent = props.theme || "all"; // default to 'all' if theme is not provided

  const clearStyle = {
    textDecoration: "none",
  };

  return (
    <div>
      <input
        // onChange is setting the state of the search variable to the value of the input field as the user types to be used in the filter method below
        className="search"
        name="search"
        type="text"
        placeholder="Search"
        onChange={(e) => onChange(e)}
        value={search}
      />
      {/* // create a dropdown menu to filter the items by medium */}
      <select
        className="medium"
        name="theme"
        onChange={(e) => onChange(e)}
        value={theme}
      >
        <option value="all">All</option>
        <option value="digital">Worshipful</option>
        <option value="acrylic">Praise</option>
        <option value="ink">Prophetic</option>
      </select>

      {/* if the items array is empty, display the loading message */}
      {filtered.length === 0 && <p>Loading... Please wait...</p>}
      <div className="music">
        {filtered.map((item) => {
          //we are finding the index of the item in the items array so that we can use it in the Link to the Merch component
          let index = filtered.findIndex((indexed) => indexed._id === item._id);
          return (
            <div style={{ margin: "1%" }} key={item.id}>
              <div className="pic">
                <Link to={`${url}/${index}`} style={clearStyle}>
                  <img src={item.image} alt={item.title} />
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
