import React from "react";
import IProperty from "../interfaces/iProperty";

export interface ISorterProps<T> {
  object: T;
  setProperty: (propertyType: IProperty<T>) => void;
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
        onChange={(e) => {
          const values = e.target.value.split("-");
          if (values.length === 2) {
            setProperty({
              property: values[0] as any,
              isDescending: values[1] === "true",
            });
          }
        }}
      >
        {Object.keys(object).map((key) => {
          return (
            <>
              <option key={`${key}-true`} value={`${key}-true`}>
                {`Sort By ${key} descending`}
              </option>
              <option key={`${key}-false`} value={`${key}-false`}>
                {`Sort By ${key} ascending`}
              </option>
            </>
          );
        })}
      </select>
    </>
  );
}
