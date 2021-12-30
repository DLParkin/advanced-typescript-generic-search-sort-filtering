import React from "react";

export interface ISearchInputProps {
  setSearchQuery: (query: string) => void;
}

export const SearchInput = (props: ISearchInputProps) => {
  const { setSearchQuery } = props;
  return (
    <>
      <label htmlFor="search" className="mt-3">
        Search! Try me!
      </label>
      <input
        id="search"
        className="form-control full-width"
        type="search"
        placeholder="Search..."
        aria-label="Search"
        onChange={(e) => setSearchQuery(e.target.value)}
      />
    </>
  );
};
