var searchers =[
		require('./searcher-flipkart'), 
		require('./searcher-landmarkonthenet'),
		require('./searcher-rediff')
];

var count = 0;

// Export searcher
module.exports = Runner;

function Runner(error, data, done) {
	
	for (var i=0; i<searchers.length; i++){
		console.log('Registering searcher: ' + searchers[i].toString());
		searchers[i].on('item', function(item){
			data (item);
		});

		searchers[i].on('error', function(param){
			//console.log(param.searcher.toString() + "  Error: " + param.error);
			error(param);
		});
		
		searchers[i].on('complete', function(param){
			console.log("Finished .. " + param.searcher.toString());
			count++;
			if (count == searchers.length) {
				count = 0;
				done();		
			}
		});
	}
}

Runner.prototype.search = function (query) {
	for (var i=0; i<searchers.length; i++){
		searchers[i].search(query);	
	}
}
