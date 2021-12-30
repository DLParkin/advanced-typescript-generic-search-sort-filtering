export default function genericSearch<T>(
  object: T,
  properties: Array<keyof T>,
  query: string,
  isCaseSensitive: boolean
): boolean {
  if (query === "") {
    return true;
  }

  return properties.some((property) => {
    const value = object[property];

    if (typeof value === "string" || typeof value === "number") {
      if (isCaseSensitive) {
        return value.toString().toLowerCase().includes(query.toLowerCase());
      } else {
        return value.toString().includes(query);
      }
    }

    return false;
  });
}
