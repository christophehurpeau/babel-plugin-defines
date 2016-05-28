var fs = require('fs');
var babel = require('babel-core');
var diff = require('diff');
var chalk = require('chalk');

var pluginPath = require.resolve('..');

var output = babel.transformFileSync(__dirname + '/fixtures/actual.js', {
	babelrc: false,
	presets: [],
	plugins: [
		[pluginPath, { "GLOBAL_TEST": 'test', "GLOBAL_1": 1, 'GLOBAL_FALSE': false }],
	],
});
console.log(output.code);

var expected = fs.readFileSync(__dirname + '/fixtures/expected.js', 'utf-8');

function normalizeLines(str) {
	return str.trim();
}

diff.diffLines(normalizeLines(output.code), normalizeLines(expected))
.forEach(function (part) {
	var value = part.value;
	if (part.added) {
		value = chalk.green(part.value);
	} else if (part.removed) {
		value = chalk.red(part.value);
	}
	process.stdout.write(value);
});

console.log();