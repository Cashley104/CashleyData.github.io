(function () {
	'use strict';

	var galleries = document.querySelectorAll('[data-extension-gallery]');
	var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

	galleries.forEach(function (gallery) {
		var slides = gallery.querySelectorAll('img');
		var activeIndex = 0;
		var timer = null;

		if (slides.length < 2)
			return;

		function showSlide(index) {
			slides[activeIndex].classList.remove('is-active');
			activeIndex = index;
			slides[activeIndex].classList.add('is-active');
		}

		function startPreview() {
			if (timer || reduceMotion.matches)
				return;

			showSlide(1);
			timer = window.setInterval(function () {
				showSlide(activeIndex === slides.length - 1 ? 1 : activeIndex + 1);
			}, 1800);
		}

		function stopPreview() {
			window.clearInterval(timer);
			timer = null;
			showSlide(0);
		}

		gallery.addEventListener('mouseenter', startPreview);
		gallery.addEventListener('mouseleave', stopPreview);
		gallery.addEventListener('focus', startPreview);
		gallery.addEventListener('blur', stopPreview);
	});
}());
