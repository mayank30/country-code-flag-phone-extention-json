const country = require("./index");

console.log(
  JSON.stringify(
    country.all({
      limit: 5,
      keys: ["id", "name", "dail_code", "mask", "emoji", "translations.kr"]    })
  )
);
