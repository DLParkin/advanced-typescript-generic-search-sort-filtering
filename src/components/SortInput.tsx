import React from "react";

export interface ISorterProps<T> {
  object: T;
  setProperty: (property: keyof T) => void;
}

export function SortInput<T>(props: ISorterProps<T>) {
  const { object, setProperty } = props;
  return (
    <>
      <label htmlFor="sorter" className="mt-3">
        Sort By Me
      </label>
      <select
        id="sorter"
        className="custom-select"
        onChange={(e) => setProperty(e.target.value as any)}
      >
        {Object.keys(object).map((key) => {
          return (
            <option key={key} value={key}>
              {`Sort By ${key}`}
            </option>
          );
        })}
      </select>
    </>
  );
}
