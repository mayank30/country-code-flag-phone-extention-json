const codes = require("./country-dial-code.json");
const full = require("./full-country.json");
const phone_mask = require("./phoneMasks.json");
var fs = require("fs");
const {name, version} = require("../package.json");
const image_path = `https://cdn.jsdelivr.net/npm/${name}@${version}/dist/images/`;
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
    flag: cc ? `${image_path}${cc.code}.svg`: ''
  };
  flatObj[d.iso2] = {
    ...d,
  };
  newdb.push(d);
  if (!cc) {
    console.log(cc, { name: f.name, iso2: f.iso2, phone_code: f.phone_code });
  }
});

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
