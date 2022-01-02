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
import genericFilter from "./utils/genericFilter";
import { FilterInput } from "./components/FilterInput";

function App() {
  const [showPeople, setShowPeople] = useState<boolean>(false);

  const [query, setQuery] = useState<string>("");

  const [widgetProperty, setWidgetProperty] = useState<IProperty<IWidget>>({
    property: "title",
    isDescending: true,
  });

  const [widgetFilterProperties, setWidgetFilterProperties] = useState<
    Array<keyof IWidget>
  >([]);

  const [personProperty, setPersonProperty] = useState<IProperty<IPerson>>({
    property: "firstName",
    isDescending: true,
  });

  const [peopleFilterProperties, setPeopleFilterProperties] = useState<
    Array<keyof IPerson>
  >([]);

  return (
    <>
      <button onClick={() => setShowPeople(!showPeople)}>
        {showPeople ? "Show Widget" : "Show People"}
      </button>
      <SearchInput setSearchQuery={setQuery} />
      {!showPeople ? (
        <>
          <h2>Widgets:</h2>
          <SortInput
            object={widgets[0]}
            setProperty={(propertyType) => setWidgetProperty(propertyType)}
          />
          <br />
          <FilterInput
            object={widgets[0]}
            properties={widgetFilterProperties}
            onChangeFilter={(property) => {
              widgetFilterProperties.includes(property)
                ? setWidgetFilterProperties(
                    widgetFilterProperties.filter(
                      (widgetFilterProperty) =>
                        widgetFilterProperty !== property
                    )
                  )
                : setWidgetFilterProperties([
                    ...widgetFilterProperties,
                    property,
                  ]);
            }}
          />
          {widgets
            .filter((widget) =>
              genericSearch(widget, ["title", "description"], query, false)
            )
            .filter((widget) => genericFilter(widget, widgetFilterProperties))
            .sort((a, b) => genericSort(a, b, widgetProperty))
            .map((widget, index) => {
              return <Widget key={index} {...widget} />;
            })}
        </>
      ) : (
        <>
          <h2>People:</h2>
          <SortInput
            object={people[0]}
            setProperty={(propertyType) => setPersonProperty(propertyType)}
          />
          <br />
          <FilterInput
            object={people[0]}
            properties={peopleFilterProperties}
            onChangeFilter={(property) => {
              peopleFilterProperties.includes(property)
                ? setPeopleFilterProperties(
                    peopleFilterProperties.filter(
                      (peopleFilterProperty) =>
                        peopleFilterProperty !== property
                    )
                  )
                : setPeopleFilterProperties([
                    ...peopleFilterProperties,
                    property,
                  ]);
            }}
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
            .filter((person) => genericFilter(person, peopleFilterProperties))
            .sort((a, b) => genericSort(a, b, personProperty))
            .map((person, index) => {
              return <Person key={index} {...person} />;
            })}
        </>
      )}
    </>
  );
}

export default App;
