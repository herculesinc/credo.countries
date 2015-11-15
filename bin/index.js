'use strict';
// MODULE VARIABLES
// =================================================================================================
var countries = require('./data/countries');
var alpha2Map = new Map();
var alpha3Map = new Map();
for (let i = 0; i < countries.length; i++) {
    let country = countries[i];
    alpha2Map.set(country.alpha2, country);
    alpha3Map.set(country.alpha3, country);
}
// PUBLIC FUNCTIONS
// =================================================================================================
/**
 * Finds a country for the specified contry code (alpha2 or alpha3) or country name (common or official)
 */
function find(codeOrName) {
    codeOrName = codeOrName.toLowerCase();
    if (codeOrName.length === 2) {
        return alpha2Map.get(codeOrName);
    }
    else if (codeOrName.length === 3) {
        return alpha3Map.get(codeOrName);
    }
    for (let i = 0; i < countries.length; i++) {
        let country = countries[i];
        if (country.name.common.toLowerCase() === codeOrName || country.name.official.toLowerCase() === codeOrName) {
            return country;
        }
    }
}
exports.find = find;
/**
 * Iterates over all countries and calls the callback function for each county
 */
function forEach(callback) {
    countries.forEach(callback);
}
exports.forEach = forEach;
/**
 * Maps all countries using provided callback funciton; if trimEmpty = true (default), excludes empty values from returned array
 */
function map(callback, trimEmpty) {
    trimEmpty = typeof trimEmpty === 'boolean' ? trimEmpty : true;
    var retval = [];
    for (let i = 0; i < countries.length; i++) {
        let mapped = callback(countries[i], i);
        if ((mapped !== null && mapped !== undefined) || trimEmpty === false) {
            retval.push(mapped);
        }
    }
    return retval;
}
exports.map = map;
//# sourceMappingURL=index.js.map