var Searcher = require('./searcher');

var searcher = new Searcher({
	merchantName: 'Rediff Books',
	merchantUrl: 'http://books.rediff.com'
});

module.exports = searcher;

searcher.getSearchUrl = function(query) {
	return this.merchantUrl + "/book/" + query;
}

searcher.parseHTML = function(window) {
	var self = this;

	window.$('div[id="prod_detail"]').each(function(){
		var item  = window.$(this);

		var title = item.find('#prod_detail2').find('font[id="book-titl"]').text();
		var link = item.find('#prod_detail2').find('a').attr('href');
		var author = item.find('#prod_detail2').find('font[id="book-auth"]').text();
		var price = item.find('#prod_detail2').find('font[id="book-pric"]').text();
		
		self.onItem({
			title: title,
			link: link,
			author: author,
			price: price
		});
	});
}


