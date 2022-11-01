// ローディング判定
jQuery(window).on("load", function () {
	jQuery("body").attr("data-loading", "true");
});

//375px 未満は JS で viewport を固定する
(function () {
	const viewport = document.querySelector('meta[name="viewport"]');

	function switchViewport() {
		const value =
			window.outerWidth > 375
				? "width=device-width,initial-scale=1"
				: "width=375";
		if (viewport.getAttribute("content") !== value) {
			viewport.setAttribute("content", value);
		}
	}
	addEventListener("resize", switchViewport, false);
	switchViewport();
})();

//スクロールアニメーション
jQuery.fn.acs = function (options) {
	const elements = this;
	const defaults = {
		screenPos: 1,
		className: "is-animated",
	};
	const setting = jQuery.extend(defaults, options);
	jQuery(window).on("load scroll", function () {
		add_class_in_scrolling();
	});

	function add_class_in_scrolling() {
		const winScroll = jQuery(window).scrollTop();
		const winHeight = jQuery(window).height();
		const scrollPos = winScroll + winHeight * setting.screenPos;

		if (elements.offset().top < scrollPos) {
			elements.addClass(setting.className);
		}
	}
};
jQuery('[class*="u-anm-"], .u-anm-list > *').each(function () {
	jQuery(this).acs();
});
jQuery.fn.anmDelay = function (options) {
	const elements = this;
	const defaults = {
		delay: 0.3,
		property: "transition-delay",
	};
	const setting = jQuery.extend(defaults, options);
	const index = elements.index();
	const time = index * setting.delay + 0.1;
	elements.css(setting.property, time + "s");
};
jQuery(".u-anm-list > *").each(function () {
	jQuery(this).anmDelay();
});

