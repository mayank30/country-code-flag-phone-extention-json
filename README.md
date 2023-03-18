# Country Detail

Purpose to provide SVG Flags, Unicode flag (emojis), Country code, Phone extension

## Install using npm

```bash
npm install country-code-flag-phone-extension-json
```

## Methods & Options

```javascript
const country = require("country-code-flag-phone-extension-json");

// Get all countries.
country.all();


const options  = {
    filter: "", // If pass as string then full text search on db (name, subregion, region, currency)
    filter: [], // if pass as array filter by ISO2 codes 
    keys: [] // define object keys to minify records,
    sortBy: [] // sort by priortiy of mentioned ISO2 code.
    limit: 5 // limit the returned object
}
```


## Usage

### Get all Countries

List all the countries with details object

```javascript
const country = require("country-code-flag-phone-extension-json");

country.all();

// Return all the country with full detailed object
```

### Filter Countries by ISO2 Code

Filter country by country codes

```javascript
const country = require("country-code-flag-phone-extension-json");

country.all({
  filter: ["IN", "US"],
});

// Return only two records filter by India and United States
```

### Filter Countries by plain text search

Quick search in database

```javascript
const country = require("country-code-flag-phone-extension-json");

country.all({
  filter: "india",
});

// Return only one records filter search by india
// It search on name, region, subregion, currency name
```

### Sort by Country

In some case, we want specific country to be on top of the dropdown and followed by all others.

```javascript
const country = require("country-code-flag-phone-extension-json");

country.all({
  sortBy: ["US", "IN"],
});

// Return all countried sort by US, IN and
// all remaining countries ..
```

### Limit the record by Country

Top 5 records

```javascript
const country = require("country-code-flag-phone-extension-json");

country.all({
    limit: 5
})
// Return top 5 countries from DB

country.all({
    limit: 5,
    sortBy: ["US", "IN"]
})
// Return top 5 followed by - US, IN
// and reminaing 3 countries from DB

country.all({
    filter: ["IN", "US", "ZW", "YE", "AD"]
    limit: 5,
    sortBy: ["US", "IN"]
})

// Return  5 records followed by - US, IN
// and reminaing 3 filtered (AD, YE, ZW) countries from DB

```

### Minified the filted object or all countried from DV

```javascript
const country = require("country-code-flag-phone-extension-json");

country.all({
    keys: ["id", "name", "dail_code", "mask", "emoji", "translations.kr"],
    limit: 5
})
// output
/*
{
    "rows": [
        {
            "id": 1,
            "name": "Afghanistan",
            "dail_code": "+93",
            "mask": "+93-##-###-####",
            "emoji": "🇦🇫",
            "translations": {
                "kr": "아프가니스탄"
            }
        },
        {
            "id": 2,
            "name": "Aland Islands",
            "dail_code": "+358",
            "emoji": "🇦🇽",
            "translations": {
                "kr": "올란드 제도"
            }
        },
        {
            "id": 3,
            "name": "Albania",
            "dail_code": "+355",
            "mask": "+355(###)###-###",
            "emoji": "🇦🇱",
            "translations": {
                "kr": "알바니아"
            }
        },
        {
            "id": 4,
            "name": "Algeria",
            "dail_code": "+213",
            "mask": "+213-##-###-####",
            "emoji": "🇩🇿",
            "translations": {
                "kr": "알제리"
            }
        },
        {
            "id": 5,
            "name": "American Samoa",
            "dail_code": "+1684",
            "mask": "+1(684)###-####",
            "emoji": "🇦🇸",
            "translations": {
                "kr": "아메리칸사모아"
            }
        }
    ],
    "count": 5
}
*/

country.all({
    limit: 5,
    sortBy: ["US", "IN"]
})
// Return top 5 followed by - US, IN
// and reminaing 3 countries from DB

country.all({
    filter: ["IN", "US", "ZW", "YE", "AD"]
    limit: 5,
    sortBy: ["US", "IN"]
})

// Return  5 records followed by - US, IN
// and reminaing 3 filtered (AD, YE, ZW) countries from DB

```

## License

MIT
