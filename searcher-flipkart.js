var Searcher = require('./searcher');

var searcher = new Searcher({
	merchantName: 'Flipkart',
	merchantUrl: 'http://www.flipkart.com'
});

module.exports = searcher;

searcher.getSearchUrl = function(query) {
	return this.merchantUrl + "/search-book" + '?query=' + query;
}

searcher.parseHTML = function(window) {
	var self = this;

	window.$('.search_result_item').each(function(){
		var item  = window.$(this);

		var title = item.find('.search_result_title').text().trim().replace(/\n/g, "");
		var link = self.merchantUrl + item.find('.search_result_title').find("a").attr('href');
		var price = item.find('.search_results_list_price').text().trim().replace(/\n/g, "");

		self.onItem({
			title: title,
			link: link,
			price: price
		});
	});
}


