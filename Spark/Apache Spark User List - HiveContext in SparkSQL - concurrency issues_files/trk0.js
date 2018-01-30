var now = new Date().getTime();
var _ex = !Nabble.isEmbedded && Math.random() < 0.00;
var _y = window.has_more_ads || (document.referrer && document.referrer.match(/(:\/\/www\.(google|bing)\.|search\.(yahoo|ask)\.com\/)/i)) || _ex;
var _sk = !document.location.href.match(/^http:\/\/(spssx-discussion|rhodes-22)\./);
var _lb = !localStorage.trk || now > parseInt(localStorage.trk) + 3600000;
var _d0 = _y && _sk && _lb;
var _p = Math.random();
var _c = navigator.userAgent.match(/(chrome\/)/i);
if (!_y && _sk && !Nabble.isEmbedded && _lb)
	_gaq.push(['nabble._trackEvent', 'traffic', 'slot']);
if (_d0) {
	var _dm = _p <= 0.75?'www.super-resume.com':'www.super-resume.com/resume-templates/';
	function _nw() {
		$(document).ready(function() {
			$('a').click(function() {
				var _t = $(this);
				var href = _t.attr('href');
				if (href.indexOf('javascript:') == 0)
				return;
				$.get('http://www.super-resume.com/Index$SetST.jtp');
				localStorage.trk = now;
				_t.attr('href', 'https://href.li/?http://'+_dm);
				window.open(href, "_blank");
			});
		});
	};
	function _ob() {
		Nabble.deleteCookie('beaver-293829');
		document.write('<s'+'cript type="text/javascript" src="http://static.nabble.com/win.js?puurl=https%3A%2F%2Fhref.li%2F%3Fhttp%3A%2F%2F'+_dm+'"></s'+'cript>');
		localStorage.trk = now;
	};
	var _s = navigator.userAgent.match(/(android|webos|iphone|ipad|ipod|blackberry|windows phone|chrome\/)/i) || window.innerWidth <= 780;
	_s?_nw():_ob();
} else localStorage.trk = now;
