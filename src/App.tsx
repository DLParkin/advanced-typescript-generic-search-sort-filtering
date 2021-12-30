import React from "react";
import people from "./mock-data/people";
import widgets from "./mock-data/widgets";
import genericSearch from "./utils/genericSearch";

function App() {
  const query = "";
  return (
    <>
      <h2>Widgets:</h2>
      {widgets
        .filter((widget) =>
          genericSearch(widget, ["title", "description"], query, false)
        )
        .map((widget, index) => {
          return <h3 key={index}>{widget.title}</h3>;
        })}
      <h2>People:</h2>
      {people
        .filter((person) =>
          genericSearch(
            person,
            ["firstName", "lastName", "eyeColor"],
            query,
            false
          )
        )
        .map((person, index) => {
          return (
            <h3 key={index}>{`${person.firstName} ${person.lastName}`}</h3>
          );
        })}
    </>
  );
}

export default App;
