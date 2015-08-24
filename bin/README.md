# Countries
A simple country info look-up module written for credo application.

## Install
```
$ npm install --save @credo/countries
```
## API
The module provides the information about countries in the following format:

```javascript
    {
        "alpha2": "us",
        "alpha3": "usa",
        "name": { "common": "United States", "official": "United States of America" },
        "tld": [".us"],
        "currencies": ["usd","usn","uss"],
        "callingCodes": ["1"],
        "languages": ["eng"]
    }
```

Where:

  * `alpha2` The [ISO 3166-1 alpha 2](http://en.wikipedia.org/wiki/ISO_3166-1_alpha-2) code
  * `alpha3` The [ISO 3166-1 alpha 3](http://en.wikipedia.org/wiki/ISO_3166-1_alpha-3) code
  * `currencies` An array of [ISO 4217 currency codes](http://en.wikipedia.org/wiki/ISO_4217) with the primary one first
  * `languages` An array of [ISO 639-2](http://en.wikipedia.org/wiki/ISO_639-2) codes for languages (may not be complete)
  * `CallingCodes` An array of the international call prefixes for this country

### Country Lookup
A `find(codeOrName)` function can be used look up a country by code or name:
```javascript
import * as countries from '@credo/countries';
var us = countries.find('us');
assert.equal(us.name.common, 'United States'); // OK
```
The `codeOrName` parameter is case-insensetive and can be any of the following:

  * `alpha2`
  * `alpha3`
  * `common name`
  * `official name`

### Iterating over Countries
A `forEach(callback)` function can be used to iterate over all countries in the list (currenlty 248):
```javascript
import * as countries from '@credo/countries';
countries.forEach((country) => {
  console.log(country.name.common);
});
```

### Transforming Countries
A `map(callback, trimEmpty?)` function can be used to map country objects to other objects:
```javascript
import * as countries from '@credo/countries';
var names = countries.map((country) => {
  return country.name.common; 
});
```
When the optional `trimEmpty` parameter is set to _true_ (which is the default), empty values (_null_ or _undefined_) returned by the `callback` function will not be added to the resulting array. This can be used to filter the set of countries:
```javascript
import * as countries from '@credo/countries';
var euroCountries = countries.map((country) => {
  if (country.currencies.indexOf('eur') > -1){
      return country;
  }
});
assert.strictEqual(euroCountries.length, 35); // OK
```