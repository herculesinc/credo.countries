'use strict';
// MODULE VARIABLES
// =================================================================================================
var countries: Country[] = require('./data/countries');
var alpha2Map = new Map<string, Country>();
var alpha3Map = new Map<string, Country>();

for (let i = 0; i < countries.length; i++) {
    let country = countries[i];
    alpha2Map.set(country.alpha2, country);
    alpha3Map.set(country.alpha3, country);
}

// INTERFACES
// =================================================================================================
export interface Country {
    alpha2: string;
    alpha3: string;
    name: {
        common: string;
        official: string;
    },
    tld: string[],
    currencies: string[],
    callingCodes: string[],
    languages: string[]
}

// PUBLIC FUNCTIONS
// =================================================================================================

/**
 * Finds a country for the specified contry code (alpha2 or alpha3) or country name (common or official)
 */
export function find(codeOrName: string): Country {
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

/**
 * Iterates over all countries and calls the callback function for each county
 */
export function forEach(callback: (country: Country, index?: number) => any): void {
    countries.forEach(callback);
}

/**
 * Maps all countries using provided callback funciton; if trimEmpty = true (default), excludes empty values from returned array
 */
export function map<T>(callback: (country: Country, index?: number) => T, trimEmpty?: boolean): T[] {
    trimEmpty = typeof trimEmpty === 'boolean' ? trimEmpty : true;
    var retval: T[] = [];
    for (let i = 0; i < countries.length; i++) {
        let mapped = callback(countries[i], i);
        if ((mapped !== null && mapped !== undefined) || trimEmpty === false) {
            retval.push(mapped);
        }
    }
    return retval;
}