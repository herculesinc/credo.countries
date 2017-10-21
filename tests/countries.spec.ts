// IMPORTS
// ================================================================================================
import * as assert from 'assert';
import * as countries from './../index';

// TESTS
// ================================================================================================
describe("Country find tests", () => {
    it("Should find a country by alpha 2 code", () => {
        var us = countries.find('us');

        assert.notStrictEqual(us, undefined);
        assert.strictEqual(us.name.common, 'United States');
        assert.strictEqual(us.name.official, 'United States of America');
    });

    it("Should find a country by alpha 3 code", () => {
        var us = countries.find('usa');

        assert.notStrictEqual(us, undefined);
        assert.strictEqual(us.name.common, 'United States');
        assert.strictEqual(us.name.official, 'United States of America');
    });

    it("Should find a country by common country name", () => {
        var us = countries.find('United states');

        assert.notStrictEqual(us, undefined);
        assert.strictEqual(us.name.common, 'United States');
        assert.strictEqual(us.name.official, 'United States of America');
    });

    it("Should find a country by official country name", () => {
        var us = countries.find('United States of america');

        assert.notStrictEqual(us, undefined);
        assert.strictEqual(us.name.common, 'United States');
        assert.strictEqual(us.name.official, 'United States of America');
    });
});

describe("Country forEach tests", () => {
    it("Should iterate over all countries", () => {
        var count = 0;
        countries.forEach((country) => {
            count++;
            if (country.alpha2 === 'us'){
                assert.strictEqual(country.name.common, 'United States');
                assert.strictEqual(country.name.official, 'United States of America');
            }
        });
        assert.strictEqual(count, 247);
    });
    
    it("Should correctly pass iteration index", () => {
        var i = 0;
        countries.forEach((country, index) => {
            assert.strictEqual(i, index);
            i++;
        });
    });
});

describe("Country map tests", () => {
    it("Should map country names", () => {
        var names = countries.map((country) => {
           return country.name.common; 
        });
        
        assert.strictEqual(names.length, 247);
        assert.strictEqual(names[0], 'Aruba');
    });
    
    it("Should correctly pass iteration index", () => {
        var i = 0;
        countries.map((country, index) => {
            assert.strictEqual(i, index);
            i++;
        });
    });
    
    it("Should trim empty values by default", () => {
        var euroCountries = countries.map((country) => {
            if (country.currencies.indexOf('eur') > -1){
                return country;
            }
        });
        assert.strictEqual(euroCountries.length, 35);
    });
    
    it("Should preserve empty values when asked", () => {
        var euroCountries = countries.map((country) => {
            if (country.currencies.indexOf('eur') > -1){
                return country;
            }
        }, false);
        assert.strictEqual(euroCountries.length, 247);
    });
});