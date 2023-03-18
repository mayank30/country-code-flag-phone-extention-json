const codes = require("./country-dial-code.json");
const full = require("./full-country.json");
const phone_mask = require("./phoneMasks.json");
var fs = require("fs");

const newdb = [];
const flatObj = {};

full.forEach((f) => {
  const cc = codes.find((x) => x.code == f.iso2);
  let d = null;
  d = {
    ...f,
    dail_code: cc?.dial_code || `+${f.phone_code}`,
    mask: cc ? phone_mask[cc.code] : "",
    phone_mask: cc ? transform(phone_mask[cc.code], cc.dial_code) : "",
  };
  flatObj[d.iso2] = {
    ...d,
  };
  newdb.push(d);
  if (!cc) {
    console.log(cc, { name: f.name, iso2: f.iso2, phone_code: f.phone_code });
  }
});

// codes.forEach((d) => {
//   const f = db.find((x) => x.code == d.code);
//   const c = capital.find((x) => x.Iso2 == d.code);
//   d = {
//     name: d.name,
//     dial_code: d.dial_code,
//     iso2: d.code,
//     iso3: c?.Iso3,
//     emoji: c?.Unicode || f.emoji,
//     currency: c?.Currency || "",
//     capital: c?.Capital || "",
//     continent: c?.Continent || "",
//     image: f.image,
//     mask: phone_mask[d.code],
//     phone_mask: transform(phone_mask[d.code], d.dial_code),
//   };
//   flatObj[d.iso2] = {
//     ...d,
//   };
//   newdb.push(d);
// });

fs.writeFile("../dist/index.json", JSON.stringify(newdb), function (err) {
  if (err) throw err;
});

fs.writeFile("../dist/flat.json", JSON.stringify(flatObj), function (err) {
  if (err) throw err;
});
function transform(p, code) {
  if (p) {
    if (p.indexOf("+1(") > 0) {
      p = p.replaceAll("(", "").replaceAll(")", "");
    }
    return p?.replaceAll(code + "-", "").replaceAll(code, "");
  }
  return "";
}
