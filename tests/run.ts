import * as countries from './../index';
//console.log(countries.find('us'));

const country = countries.findByPhone('5145085770');
console.log(country);

/*
import * as fs from 'fs';
const countries = require('./../data/countries');

const newCountries = [];

for (let country of countries) {

    newCountries.push({
        alpha2      : country.alpha2,
        alpha3      : country.alpha3,
        name        : country.name,
        tld         : country.tld,
        currencies  : country.currencies,
        languages   : country.languages,
        callingCode : country.callingCode ? country.callingCode.toString() : null,
        areaCodes   : country.areaCodes,
        phoneNumberLength: country.phoneNumberLength
    });
}

fs.writeFileSync('newdata.json', JSON.stringify(newCountries));
*/