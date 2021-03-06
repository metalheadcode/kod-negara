function groupBy(key, array, transformValue) {
  return array.reduce((objectsByKeyValue, obj) => {
    const value = obj[key];
    let val = obj;
    if (typeof transformValue === "function") {
      val = transformValue(val);
    }
    objectsByKeyValue[value] = (objectsByKeyValue[value] || []).concat(val);
    return objectsByKeyValue;
  }, {});
}

const kodNegara = require("./index");
const tinTypes = kodNegara.customArray(
  { value: "{tinType}", name: "{countryNameEn}" },
  {
    filter: (countryData) => countryData.tinType !== "",
  }
);

const finalTinTypes = {};

console.log(
  "tinTypes",
  JSON.stringify(
    kodNegara.utils.groupBy("value", tinTypes, (tinType) => tinType.name),
    null,
    2
  )
);
