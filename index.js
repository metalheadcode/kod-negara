import supplant from "./utils/supplant";
import groupBy from "./utils/groupBy";
import countriesData from "./countriesData";

/**
 * Returns some module utils
 */
const utils = { groupBy: groupBy };

/**
 * Returns the list with all the countries data
 */
const all = () => {
  return countriesData;
};

const countryArray = () => {
  return countriesData.map(
    (item) => `${item.countryNameEn} (${item.countryCode})`
  );
};

/**
 * Filters the list of countries and returns those matching with the filter criteria
 * @param {String} countryProperty - The property to use in the filter. Must be any of the country properties (countryCode, currencyCode, etc)
 * @param {String} value - The value to use in the filter
 */
const filter = (countryProperty, value) => {
  return countriesData.filter(
    (countryData) => countryData[countryProperty] === value
  );
};

/**
 * Find a country by a property and return the first match
 * @param {String} countryProperty - The property to use in the search. Must be any of the country properties (countryCode, currencyCode, etc)
 * @param {String} value - The value to use in the filter
 */
const findOne = (countryProperty, value) => {
  return countriesData.find(
    (countryData) => countryData[countryProperty] === value
  );
};

/**
 * Returns a collection with fields mapped as requested
 * @param {*} fields - Map of fields and placeholders
 */
const customArray = (
  fields = {
    name: "{countryNameEn} ({countryCode})",
    value: "{countryCode}",
  },
  { sortBy, sortDataBy, filter } = {}
) => {
  const finalCollection = [];

  let data = countriesData;
  if (typeof filter === "function") {
    data = data.filter(filter);
  }

  if (sortDataBy) {
    // ignore upper and lowercase
    const collator = new Intl.Collator([], { sensitivity: "accent" });
    data.sort((a, b) => collator.compare(a[sortDataBy], b[sortDataBy]));
  }

  data.forEach((countryData) => {
    let collectionObject = {};
    for (const field in fields) {
      collectionObject[field] = supplant(fields[field], countryData);
    }
    finalCollection.push(collectionObject);
  });

  if (sortBy && fields[sortBy]) {
    // ignore upper and lowercase
    const collator = new Intl.Collator([], { sensitivity: "accent" });
    finalCollection.sort((a, b) => collator.compare(a[sortBy], b[sortBy]));
  }

  return finalCollection;
};

/**
 * Returns a custom object with the passed key as object key and a value made up with
 * values set in the placeholders of the label variable
 * @param {*} key - Key used to construct the object to return
 * @param {*} label - Placeholder like string, with all the fields that you want to use
 */
const customList = (
  key = "countryCode",
  label = "{countryNameEn} ({countryCode})",
  { filter } = {}
) => {
  const finalObject = {};
  let data = countriesData;
  if (typeof filter === "function") {
    data = data.filter(filter);
  }
  data.forEach((countryData) => {
    const value = supplant(label, countryData);
    finalObject[countryData[key]] = value;
  });

  return finalObject;
};

export default {
  utils,
  countryArray,
  all,
  filter,
  findOne,
  customArray,
  customList,
};
