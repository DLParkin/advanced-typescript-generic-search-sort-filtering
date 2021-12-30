import React from "react";
import people from "./mock-data/people";
import widgets from "./mock-data/widgets";

function App() {
  return (
    <>
      <h2>Widgets:</h2>
      {widgets.map((widget, index) => {
        return <h3 key={index}>{widget.title}</h3>;
      })}
      <h2>People:</h2>
      {people.map((person, index) => {
        return <h3 key={index}>{`${person.firstName} ${person.lastName}`}</h3>;
      })}
    </>
  );
}

export default App;
