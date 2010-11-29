// Modules
var request = require('ahr'),	 // Abstract-HTTP-request https://github.com/coolaj86/abstract-http-request 
sys = require('sys'),		// System		
events = require('events'),	// EventEmitter
jsdom = require('jsdom');	// JsDom https://github.com/tmpvar/jsdom

var jQueryPath = 'http://code.jquery.com/jquery-1.4.2.min.js';
var headers = {'content-type':'application/json', 'accept': 'application/json'};

// Export searcher
module.exports = Searcher;

function Searcher(param) {
	if (param.headers) {
		this.headers = param.headers;
	} else {
		this.headers = headers;
	}

	this.merchantName = param.merchantName;
	this.merchantUrl = param.merchantUrl;
	this.id = param.merchantUrl;
}

// Inherit from EventEmitter
Searcher.prototype = new process.EventEmitter;

Searcher.prototype.search = function(query, collector) {
	var self = this;
	var url = self.getSearchUrl(query);

	console.log('Connecting to... ' + url);
	
	request({uri: url, method: 'GET', headers: self.headers, timeout: 10000}, function(err, response, html) {
		if (err) {
			self.onError({error: err, searcher: self});
			self.onComplete({searcher: self});			
		} else {
			console.log('Fetched content from... ' + url);
			// create DOM window from HTML data
			var window = jsdom.jsdom(html).createWindow();
			// load jquery with DOM window and call the parser!
			jsdom.jQueryify(window, 'http://code.jquery.com/jquery-1.4.2.min.js', function() {
				self.parseHTML(window);
				self.onComplete({searcher: self});			
			});
		}
	});
}

Searcher.prototype.getSearchUrl = function(query) {
	throw "getSearchUrl() is unimplemented!";
}

Searcher.prototype.parseHTML = function(window) {
	throw "parseForBook() is unimplemented!";
}

Searcher.prototype.onItem = function(item) {
	this.emit('item', item);
}

Searcher.prototype.onComplete = function(searcher) {
	this.emit('complete', searcher);
}

Searcher.prototype.onError = function(error) {
	this.emit('error', error);
}

Searcher.prototype.toString = function() {
	return this.merchantName + "(" + this.merchantUrl + ")";
}

Searcher.prototype.trim = function(text) {
	return text.trim().replace(/\n/g, "");
}

