var Runner = require('./runner');

var runner = new Runner(function(param){
	console.log(param.searcher.toString() + "  Error: " + param.error);
}, data, done);

var items = [];
function data(item) {
	items.push(item);
}

function done() {
	console.log(items.length);
}

runner.search(escape("Vikram Seth"));
