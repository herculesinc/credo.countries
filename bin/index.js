// MODULE VARIABLES
// =================================================================================================
var countries = require('./data/countries');
var alpha2Map = new Map();
var alpha3Map = new Map();
for (var i = 0; i < countries.length; i++) {
    var country = countries[i];
    alpha2Map.set(country.alpha2, country);
    alpha3Map.set(country.alpha3, country);
}
// PUBLIC FUNCTIONS
// =================================================================================================
function find(codeOrName) {
    codeOrName = codeOrName.toLowerCase();
    if (codeOrName.length === 2) {
        return alpha2Map.get(codeOrName);
    }
    else if (codeOrName.length === 3) {
        return alpha3Map.get(codeOrName);
    }
    for (var i = 0; i < countries.length; i++) {
        var country = countries[i];
        if (country.name.common.toLowerCase() === codeOrName || country.name.official.toLowerCase() === codeOrName) {
            return country;
        }
    }
}
exports.find = find;
function forEach(callback) {
    countries.forEach(callback);
}
exports.forEach = forEach;
function map(callback, trimEmpty) {
    if (trimEmpty === void 0) { trimEmpty = true; }
    var retval = [];
    for (var i = 0; i < countries.length; i++) {
        var mapped = callback(countries[i], i);
        if ((mapped !== null && mapped !== undefined) || trimEmpty === false) {
            retval.push(mapped);
        }
    }
    return retval;
}
exports.map = map;
//# sourceMappingURL=index.js.map