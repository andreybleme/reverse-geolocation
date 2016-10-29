var Jasmine = require('jasmine');
var _jasmine = new Jasmine();

_jasmine.loadConfigFile('support/jasmine.json');
_jasmine.configureDefaultReporter({
    showColors: true
});

_jasmine.execute(['test.js']);;