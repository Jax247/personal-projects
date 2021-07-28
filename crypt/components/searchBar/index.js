import React from "react";


// NTS: when importing props this way make sure its an object
const SearchBar = ({ ...rest }) => {
  return (
    <div className="coin-search">
      <input className="coin-input" {...rest} />
    </div>
  );
};

export default SearchBar;
