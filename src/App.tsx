import React, { useState } from "react";
import { SearchInput } from "./components/SearchInput";
import { SortInput } from "./components/SortInput";
import IPerson from "./interfaces/iPerson";
import IProperty from "./interfaces/iSorter";
import IWidget from "./interfaces/iWidget";
import people from "./mock-data/people";
import widgets from "./mock-data/widgets";
import genericSearch from "./utils/genericSearch";
import genericSort from "./utils/genericSort";
import { Widget } from "./components/Renderers/Widget";
import { Person } from "./components/Renderers/Person";
import genericFilter from "./utils/genericFilter";
import { FilterInput } from "./components/FilterInput";
import IFilter from "./interfaces/iFilter";

function App() {
  const [showPeople, setShowPeople] = useState<boolean>(false);

  const [query, setQuery] = useState<string>("");

  const [widgetProperty, setWidgetProperty] = useState<IProperty<IWidget>>({
    property: "title",
    isDescending: true,
  });

  const [widgetFilterProperties, setWidgetFilterProperties] = useState<
    Array<IFilter<IWidget>>
  >([]);

  const [personProperty, setPersonProperty] = useState<IProperty<IPerson>>({
    property: "firstName",
    isDescending: true,
  });

  const [peopleFilterProperties, setPeopleFilterProperties] = useState<
    Array<IFilter<IPerson>>
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
              const propertyMatch = widgetFilterProperties.some(
                (widgetFilterProperty) =>
                  widgetFilterProperty.property === property.property
              );
              const fullMatch = widgetFilterProperties.some(
                (widgetFilterProperty) =>
                  widgetFilterProperty.property === property.property &&
                  widgetFilterProperty.isTruthySelected ===
                    property.isTruthySelected
              );
              if (fullMatch) {
                setWidgetFilterProperties(
                  widgetFilterProperties.filter(
                    (widgetFilterProperty) =>
                      widgetFilterProperty.property !== property.property
                  )
                );
              } else if (propertyMatch) {
                setWidgetFilterProperties([
                  ...widgetFilterProperties.filter(
                    (widgetFilterProperty) =>
                      widgetFilterProperty.property !== property.property
                  ),
                  property,
                ]);
              } else {
                setWidgetFilterProperties([
                  ...widgetFilterProperties,
                  property,
                ]);
              }
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
          {people
            .filter((person) =>
              genericSearch(
                person,
                ["firstName", "lastName", "eyeColor"],
                query,
                false
              )
            )
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
