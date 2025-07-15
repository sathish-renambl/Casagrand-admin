type Primitive = string | number | boolean | null | undefined;
type JSONObject = { [key: string]: JSONValue };
type JSONArray = JSONValue[];
type JSONValue = Primitive | JSONObject | JSONArray;

export function getUpdatedFields(
  initialData: JSONObject,
  updatedData: JSONObject
): JSONObject {
  const changedKeys: JSONObject = {};
  const allKeys = new Set([...Object.keys(initialData), ...Object.keys(  updatedData)]);

  allKeys.forEach((key) => {
    const val1 = initialData[key];
    const val2 =   updatedData[key];

    if (Array.isArray(val1) && Array.isArray(val2)) {
      if (val1.length !== val2.length) {
        changedKeys[key] = val2;
      } else {
        const arrayChanged = val1.some((item, index) => {
          const otherItem = val2[index];
          if (
            typeof item === "object" &&
            item !== null &&
            !Array.isArray(item) &&
            typeof otherItem === "object" &&
            otherItem !== null &&
            !Array.isArray(otherItem)
          ) {
            return Object.keys(getUpdatedFields(item as JSONObject, otherItem as JSONObject)).length > 0;
          }
          return item !== otherItem;
        });

        if (arrayChanged) {
          changedKeys[key] = val2;
        }
      }
    } else if (
      typeof val1 === "object" &&
      val1 !== null &&
      !Array.isArray(val1) &&
      typeof val2 === "object" &&
      val2 !== null &&
      !Array.isArray(val2)
    ) {
      const nestedChanges = getUpdatedFields(val1 as JSONObject, val2 as JSONObject);
      if (Object.keys(nestedChanges).length > 0) {
        changedKeys[key] = nestedChanges;
      }
    } else if (val1 !== val2) {
      changedKeys[key] = val2;
    }
  });

  return changedKeys;
}