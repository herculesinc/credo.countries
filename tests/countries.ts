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
