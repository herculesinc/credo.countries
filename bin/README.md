# Countries
A simple country info look-up module written for credo application.

## Install
```
$ npm install --save @credo/countries
```
## API
The module provides information about world countries in the following format:

```javascript
{
    "alpha2": "us",
    "alpha3": "usa",
    "name": { "common": "United States", "official": "United States of America" },
    "tld": [".us"],
    "currencies": ["usd","usn","uss"],
    "languages": ["eng"],
    "callingCode": "1",
    "areaCodes": ["201", "202", "203", "205", "206", "207", "208", "209"],
    "phoneNumberLength": [10]
}
```

Where:

  * `alpha2`: the [ISO 3166-1 alpha 2](http://en.wikipedia.org/wiki/ISO_3166-1_alpha-2) code
  * `alpha3`: the [ISO 3166-1 alpha 3](http://en.wikipedia.org/wiki/ISO_3166-1_alpha-3) code
  * `currencies`: an array of [ISO 4217 currency codes](http://en.wikipedia.org/wiki/ISO_4217) with the primary one first
  * `languages`: an array of [ISO 639-2](http://en.wikipedia.org/wiki/ISO_639-2) codes for languages
  * `callingCode`: the international call prefix for this country
  * `areaCodes`: an array of area codes for this country; only present for countries where the same `callingCode` can belong to 2 or more countries (e.g. US and Canada)
  * `phoneNumberLength`: an array of valid lengths for phone numbers for this country

### Country Lookup
A `find(codeOrName)` function can be used look up a country by code or name:
```javascript
import * as countries from '@credo/countries';

const us = countries.find('us');
assert.equal(us.name.common, 'United States'); // OK
```
The `codeOrName` parameter is case-insensetive and can be any of the following:

  * `alpha2`
  * `alpha3`
  * `common name`
  * `official name`

### Phone Lookup
A `findByPhone(phoneNumber, defaultCountry?)` function can be used to look up a country for a given phone number:

```javascript
import * as countries from '@credo/countries';

const country = countries.findByPhone('12024561111');
assert.equal(us.name.common, 'United States'); // OK
```

The `phoneNumber` parameter must represent a phone number in one of the following ways:

* `+12024561111` - full phone number prefixed with `+` (the E.164 format)
* `12024561111` - full phone number without the `+` prefix
* `2024561111` - phone number without country code

When `+` is omitted, the library will first check if the provided number is a valid phone number for the default country. If it isn't, a search will be made based on the starting digits of the phone number. If `defaultCountry` is not provided `us` value is assumed.

If a country for the provided number could not be found, or if phone number is invalid, `undefined` will be returned.

### Iterating over Countries
A `forEach(callback)` function can be used to iterate over all countries in the list (currenlty 247):

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

const names = countries.map((country) => {
  return country.name.common; 
});
```
When the optional `trimEmpty` parameter is set to _true_ (which is the default), empty values (_null_ or _undefined_) returned by the `callback` function will not be added to the resulting array. This can be used to filter the set of countries:

```javascript
import * as countries from '@credo/countries';

const euroCountries = countries.map((country) => {
  if (country.currencies.indexOf('eur') > -1){
      return country;
  }
});
assert.strictEqual(euroCountries.length, 35); // OK
```

## License
Copyright (c) 2017 Hercules Inc.

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.