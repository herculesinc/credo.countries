// IMPORTS
// ================================================================================================
var assert = require('assert');
var countries = require('./../index');
// TESTS
// ================================================================================================
describe("Country find tests", function () {
    test("Should find a country by alpha 2 code", function () {
        var us = countries.find('us');
        assert.notStrictEqual(us, undefined);
        assert.strictEqual(us.name.common, 'United States');
        assert.strictEqual(us.name.official, 'United States of America');
    });
    test("Should find a country by alpha 3 code", function () {
        var us = countries.find('usa');
        assert.notStrictEqual(us, undefined);
        assert.strictEqual(us.name.common, 'United States');
        assert.strictEqual(us.name.official, 'United States of America');
    });
    test("Should find a country by common country name", function () {
        var us = countries.find('United states');
        assert.notStrictEqual(us, undefined);
        assert.strictEqual(us.name.common, 'United States');
        assert.strictEqual(us.name.official, 'United States of America');
    });
    test("Should find a country by official country name", function () {
        var us = countries.find('United States of america');
        assert.notStrictEqual(us, undefined);
        assert.strictEqual(us.name.common, 'United States');
        assert.strictEqual(us.name.official, 'United States of America');
    });
});
//# sourceMappingURL=countries.js.map