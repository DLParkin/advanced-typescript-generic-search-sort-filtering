import React, { useState } from "react";
import { SearchInput } from "./components/SearchInput";
import { SortInput } from "./components/SortInput";
import IPerson from "./interfaces/iPerson";
import IProperty from "./interfaces/iProperty";
import IWidget from "./interfaces/iWidget";
import people from "./mock-data/people";
import widgets from "./mock-data/widgets";
import genericSearch from "./utils/genericSearch";
import genericSort from "./utils/genericSort";
import { Widget } from "./components/Renderers/Widget";
import { Person } from "./components/Renderers/Person";

function App() {
  const [query, setQuery] = useState<string>("");
  const [widgetProperty, setWidgetProperty] = useState<IProperty<IWidget>>({
    property: "title",
  });
  const [personProperty, setPersonProperty] = useState<IProperty<IPerson>>({
    property: "firstName",
  });
  return (
    <>
      <SearchInput setSearchQuery={setQuery} />
      <h2>Widgets:</h2>
      <SortInput
        object={widgets[0]}
        setProperty={(property) => setWidgetProperty({ property })}
      />
      {widgets
        .filter((widget) =>
          genericSearch(widget, ["title", "description"], query, false)
        )
        .sort((a, b) => genericSort(a, b, widgetProperty.property))
        .map((widget, index) => {
          return <Widget {...widget} />;
        })}
      <h2>People:</h2>
      <SortInput
        object={people[0]}
        setProperty={(property) => setPersonProperty({ property })}
      />
      {people
        .filter((person) =>
          genericSearch(
            person,
            ["firstName", "lastName", "eyeColor"],
            query,
            false
          )
        )
        .sort((a, b) => genericSort(a, b, personProperty.property))
        .map((person, index) => {
          return <Person {...person} />;
        })}
    </>
  );
}

export default App;
