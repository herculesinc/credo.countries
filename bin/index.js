"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// MODULE VARIABLES
// =================================================================================================
const countries = require('./data/countries');
const alpha2Map = new Map();
const alpha3Map = new Map();
const phoneTree = new Map();
for (let country of countries) {
    alpha2Map.set(country.alpha2, country);
    alpha3Map.set(country.alpha3, country);
    if (country.callingCode) {
        if (country.areaCodes) {
            for (let areaCode of country.areaCodes) {
                insertPhoneNode(phoneTree, country.callingCode + areaCode, country);
            }
        }
        else {
            insertPhoneNode(phoneTree, country.callingCode, country);
        }
    }
}
const NUMBER_REGEX = /^[0-9]+$/;
// PUBLIC FUNCTIONS
// =================================================================================================
/**
 * Gets a country by alpha2 code (lower cose)
 */
function get(alpha2) {
    alpha2 = alpha2 ? alpha2.toLowerCase() : undefined;
    return alpha2Map.get(alpha2);
}
exports.get = get;
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
    for (let country of countries) {
        if (country.name.common.toLowerCase() === codeOrName || country.name.official.toLowerCase() === codeOrName) {
            return country;
        }
    }
}
exports.find = find;
/**
 * Finds a country for the specified phone number
 */
function findByPhone(phoneNumber, defaultCountry = 'us') {
    let path;
    if (phoneNumber.startsWith('+')) {
        path = phoneNumber.slice(1);
    }
    else {
        if (defaultCountry) {
            const country = alpha2Map.get(defaultCountry);
            if (!country)
                throw new TypeError(`Default country '${defaultCountry}' is invalid`);
            for (let phoneLength of country.phoneNumberLength) {
                if (phoneNumber.length === phoneLength) {
                    path = country.callingCode + phoneNumber;
                    break;
                }
            }
        }
        if (!path) {
            path = phoneNumber;
        }
    }
    if (!NUMBER_REGEX.test(path))
        return undefined;
    let node = findPhoneNode(phoneTree, path);
    if (node) {
        const country = node.country;
        for (let phoneLength of country.phoneNumberLength) {
            if (path.length === (phoneLength + country.callingCode.length)) {
                return country;
            }
        }
    }
}
exports.findByPhone = findByPhone;
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
function map(callback, trimEmpty = true) {
    trimEmpty = typeof trimEmpty === 'boolean' ? trimEmpty : true;
    const retval = [];
    for (let i = 0; i < countries.length; i++) {
        let mapped = callback(countries[i], i);
        if ((mapped !== null && mapped !== undefined) || trimEmpty === false) {
            retval.push(mapped);
        }
    }
    return retval;
}
exports.map = map;
// HELPER FUNCTIONS
// =================================================================================================
function insertPhoneNode(root, path, country) {
    if (path.length === 1) {
        root.set(path, { country });
    }
    else {
        const digit = path[0];
        let branch = root.get(digit);
        if (!branch) {
            branch = { children: new Map() };
            root.set(digit, branch);
        }
        insertPhoneNode(branch.children, path.slice(1), country);
    }
}
function findPhoneNode(root, path) {
    const digit = path[0];
    const node = root.get(digit);
    if (path.length === 1) {
        return node;
    }
    else {
        if (node) {
            if (node.children) {
                return findPhoneNode(node.children, path.slice(1));
            }
            else if (node.country) {
                return node;
            }
        }
    }
}
//# sourceMappingURL=index.js.map