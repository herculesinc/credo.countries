// MODULE VARIABLES
// =================================================================================================
const countries: Country[] = require('./data/countries');
const alpha2Map = new Map<string, Country>();
const alpha3Map = new Map<string, Country>();
const phoneTree = new Map<string, PhoneNode>();

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

// INTERFACES
// =================================================================================================
export interface Country {
    alpha2          : string;
    alpha3          : string;
    name: {
        common      : string;
        official    : string;
    };
    tld             : string[];
    currencies      : string[];
    languages       : string[];
    callingCode     : string;
    areaCodes       : string[];
    phoneNumberLength: number[];
}

interface PhoneNode {
    children?   : Map<string, PhoneNode>;
    country?    : Country;
}

// PUBLIC FUNCTIONS
// =================================================================================================

/**
 * Gets a country by alpha2 code (lower cose)
 */
export function get(alpha2: string): Country {
    alpha2 = alpha2 ? alpha2.toLowerCase() : undefined;
    return alpha2Map.get(alpha2);
}

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

    for (let country of countries) {
        if (country.name.common.toLowerCase() === codeOrName || country.name.official.toLowerCase() === codeOrName) {
            return country;
        }
    }
}

/**
 * Finds a country for the specified phone number
 */
export function findByPhone(phoneNumber: string, defaultCountry = 'us'): Country {
    
        let path: string;
        if (phoneNumber.startsWith('+')) {
            path = phoneNumber.slice(1);
        }
        else {
            if (defaultCountry) {
                const country = alpha2Map.get(defaultCountry);
                if (!country) throw new TypeError(`Default country '${defaultCountry}' is invalid`);
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

/**
 * Iterates over all countries and calls the callback function for each county
 */
export function forEach(callback: (country: Country, index?: number) => any): void {
    countries.forEach(callback);
}

/**
 * Maps all countries using provided callback funciton; if trimEmpty = true (default), excludes empty values from returned array
 */
export function map<T>(callback: (country: Country, index?: number) => T, trimEmpty = true): T[] {
    trimEmpty = typeof trimEmpty === 'boolean' ? trimEmpty : true;
    const retval: T[] = [];
    for (let i = 0; i < countries.length; i++) {
        let mapped = callback(countries[i], i);
        if ((mapped !== null && mapped !== undefined) || trimEmpty === false) {
            retval.push(mapped);
        }
    }
    return retval;
}

// HELPER FUNCTIONS
// =================================================================================================
function insertPhoneNode(root: Map<string, PhoneNode>, path: string, country: Country) {

    if (path.length === 1) {
        root.set(path, { country });
    }
    else {
        const digit = path[0];
        let branch = root.get(digit);
        if (!branch) {
            branch = { children: new Map<string, PhoneNode>() };
            root.set(digit, branch);
        }

        insertPhoneNode(branch.children, path.slice(1), country);
    }
}

function findPhoneNode(root: Map<string, PhoneNode>, path: string): PhoneNode {

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