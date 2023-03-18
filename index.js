"use strict";
const country = require("./dist/index.json");
const flat = require("./dist/flat.json");
function country_search_name(c, search) {
  return c.filter(
    (x) =>
      x.name.includes(search.toLowerCase()) ||
      x.currency_name.toLowerCase().includes(search.toLowerCase()) ||
      x.region.toLowerCase().includes(search.toLowerCase()) ||
      x.subregion.toLowerCase().includes(search.toLowerCase())
  );
}

function extract(c, keys = []) {
  let output = c;
  if (keys.length > 0) {
    output = c.map((obj) => {
      return keys.reduce((acc, curr) => {
        if (curr.includes(".")) {
          // handle nested field
          const [parentKey, childKey] = curr.split(".");
          acc[parentKey] = acc[parentKey] || {};
          acc[parentKey][childKey] = obj[parentKey][childKey];
        } else {
          // handle regular field
          acc[curr] = obj[curr];
        }
        return acc;
      }, {});
    });
  }
  return output;
}
module.exports = {
  all: (
    options = {
      filter: null,
      sortBy: [],
      keys: [],
      limit: -1,
    }
  ) => {
    const {
      sortBy = [],
      filter = null,
      limit = country.length,
      keys = [],
    } = options;
    let countries = country;
    if (sortBy && sortBy.length > 0) {
      const validCode = [];
      const topCountries = [];
      sortBy.forEach((c) => {
        if (flat[c]) {
          topCountries.push(flat[c]);
          validCode.push(c);
        }
      });
      const all_filter_by_code = country.filter(
        (x) => !validCode.includes(x.iso2)
      );
      countries = [...topCountries, ...all_filter_by_code];
    }
    if (filter && typeof filter == "object" && filter.length > 0) {
      countries = countries.filter((x) => filter.includes(x.iso2));
    } else if (filter && typeof filter == "string" && filter.length > 0) {
      countries = country_search_name(countries, filter);
    }
    let records = countries;
    if (limit > 0) {
      records = records.splice(0, limit);
    }
    records = extract(records, keys);
    return { rows: records, count: records.length };
  },
};
