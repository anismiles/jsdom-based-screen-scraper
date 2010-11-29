var Searcher = require('./searcher');

var searcher = new Searcher({
	merchantName: 'Landmark On The Net',
	merchantUrl: 'http://www.landmarkonthenet.com'
});

module.exports = searcher;

searcher.getSearchUrl = function(query) {
	return this.merchantUrl + "/product/SearchPaging.aspx" + '?type=0&num=0&code=' + query;
}

searcher.parseHTML = function(window) {
	var self = this;
	
	window.$('.searc_box').each(function() {
		var item  = window.$(this);

		var price = item.find('span[id$="_lblListPrice"]').text();
		var shipping = item.find('span[id$="_lblShippingPeriod"]').text().trim().replace(/\n/g, "");
		var stock = item.find('span[id$="_lblofs"]').text().trim().replace(/\n/g, "");
		var publisher = item.find('span[id$="_lablpblisher"]').text().trim().replace(/\n/g, "");
		var isbn = item.find('span[id$="_lablisbn"]').text().trim().replace(/\n/g, "");
		var author = item.find('a[id$="_authrlnk"]').html().trim().replace(/\n/g, "");

		var title = item.find('a[id$="_lnkttl"]').html().trim().replace(/\n/g, "");
		var link = item.find('a[id$="_authrlnk"]').attr('href');

		self.onItem({
			price: price,
			shipping: shipping,
			stock: stock,
			publisher: publisher,
			isbn: isbn,
			author: author,
			title: title,
			link: link
		});
	});
}


