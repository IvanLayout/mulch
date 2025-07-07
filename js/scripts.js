// Ширина окна для ресайза
WW = window.innerWidth || document.clientWidth || document.querySelector('body')[0].clientWidth

// Моб. версия
fakeResize = false
fakeResize2 = true

if (document.body.clientWidth < 375) {
	document.getElementsByTagName('meta')['viewport'].content = 'width=375, user-scalable=no'
}

$(() => {
	// favorite
	$('body').on('click', '.product-favorite:not(.product-favorite_delete)', function (e) {
		e.preventDefault()

		if ($(this).hasClass('_active')) {
			$(this).removeClass('_active')
		} else {
			$(this).addClass('_active')
		}
	})

	$('body').on('click', '.product-favorite_delete', function (e) {
		e.preventDefault()

		$(this).closest('.product').remove()
	})


	// compare
	$('body').on('click', '.product-compare:not(.product-favorite_delete)', function (e) {
		e.preventDefault()

		if ($(this).hasClass('_active')) {
			$(this).removeClass('_active')
		} else {
			$(this).addClass('_active')
		}
	})

	$('body').on('click', '.product-compare_delete', function (e) {
		e.preventDefault()

		$(this).closest('.swiper-slide').remove()

		productsCompare.update()
	})


	$('body').on('click', '.filter-use__link', function (e) {
		e.preventDefault()

		$(this).closest('.filter-use__item').remove()

		if ($(window).width() < 1024 && $(this).closest('.filter-use').hasClass('swiper-initialized')) {
			filterUseSwiper.update()
		}
	})

	$('body').on('click', '.filter-use__clear', function (e) {
		e.preventDefault()

		$(this).closest('.filter-use').remove()
	})


	//Ползунки
	$priceRange = $("#price_range").ionRangeSlider({
		type     : 'double',
		min      : 0,
		max      : 123000,
		from     : 11,
		to       : 123000,
		step     : 1,
		onChange : function (data) {
			$('.price_range input.ot').val( data.from.toLocaleString('ru-RU') )
			$('.price_range input.do').val( data.to.toLocaleString('ru-RU') )
		}
	}).data("ionRangeSlider")

	$('.price_range .range__input').keyup(function() {
		$priceRange.update({
			from : $('.price_range input.ot').val().replace(/\s/g,''),
			to : $('.price_range input.do').val().replace(/\s/g,'')
		})
	})

	$priceRange2 = $("#price_range2").ionRangeSlider({
		type     : 'double',
		min      : 0,
		max      : 123000,
		from     : 11,
		to       : 123000,
		step     : 1,
		onChange : function (data) {
			$('.price_range2 input.ot').val( data.from.toLocaleString('ru-RU') )
			$('.price_range2 input.do').val( data.to.toLocaleString('ru-RU') )
		}
	}).data("ionRangeSlider")

	$('.price_range2 .range__input').keyup(function() {
		$priceRange2.update({
			from : $('.price_range2 input.ot').val().replace(/\s/g,''),
			to : $('.price_range2 input.do').val().replace(/\s/g,'')
		})
	})

	$('.reset-btn').click(function(){
		if ( $('.price_range').length ) {
			$priceRange.reset()
		}

		if ( $('.price_range2').length ) {
			$priceRange.reset()
		}
	})


	if ($('.main-slider').length) {
		new Swiper(".main-slider", {
			loop: true,
			spaceBetween: 10,
			slidesPerView: 1,
			speed: 800,
			watchSlidesProgress: true,
			watchOverflow: true,
			preloadImages: false,
			lazy: {
				loadPrevNext: true,
				elementClass: 'lazyload',
				enabled: true,
				loadedClass: 'loaded',
				checkInView: true,
				loadOnTransitionStart: true
			},
			navigation: {
				nextEl: '.slider-button-next',
				prevEl: '.slider-button-prev'
			},
			pagination: {
				bulletActiveClass: 'slider-dot_active',
				bulletClass: 'slider-dot',
				clickableClass: 'slider-pagination-clickable',
				el: '.slider-pagination',
				clickable: true
			}
		})
	}


	if ($('.inner-slider').length) {
		innerSlider = new Swiper(".inner-slider", {
			loop: false,
			spaceBetween: 0,
			slidesPerView: 'auto',
			speed: 800,
			watchSlidesProgress: true,
			watchOverflow: true,
			preloadImages: false,
			lazy: {
				loadPrevNext: true,
				elementClass: 'lazyload',
				enabled: true,
				loadedClass: 'loaded',
				checkInView: true,
				loadOnTransitionStart: true
			},
			navigation: {
				nextEl: '.slider-button-next',
				prevEl: '.slider-button-prev'
			},
			pagination: {
				bulletActiveClass: 'slider-dot_active',
				bulletClass: 'slider-dot',
				clickableClass: 'slider-pagination-clickable',
				el: '.slider-pagination',
				clickable: true
			},
			on: {
				slideChange: function (swiper) {
					$(swiper.el).removeClass('_last')

					if ( swiper.slides.length === swiper.activeIndex + 1 ) {
						$(swiper.el).addClass('_last')
					}
				}
			}
		})

		catalogSlider = new Swiper(".catalog-top__slider", {
			loop: false,
			spaceBetween: 0,
			slidesPerView: 'auto',
			speed: 500,
			watchSlidesProgress: true,
			watchOverflow: true,
			preloadImages: false,
			lazy: {
				loadPrevNext: true,
				elementClass: 'lazyload',
				enabled: true,
				loadedClass: 'loaded',
				checkInView: true,
				loadOnTransitionStart: true
			}
		})

		innerSlider.controller.control = catalogSlider
		catalogSlider.controller.control = innerSlider
	}


	if ($('.header__cats').length) {
		new Swiper(".header__cats", {
			loop: false,
			spaceBetween: 15,
			slidesPerView: 'auto',
			watchSlidesProgress: true,
			watchOverflow: true,
			preloadImages: false,
			lazy: {
				loadPrevNext: true,
				elementClass: 'lazyload',
				enabled: true,
				loadedClass: 'loaded',
				checkInView: true,
				loadOnTransitionStart: true
			},
			navigation: {
				nextEl: '.slider-button-next',
				prevEl: '.slider-button-prev'
			},
			breakpoints: {
				'320': {
					spaceBetween: 15,
				},
				'480': {
					spaceBetween: 15,
				},
				'768': {
					spaceBetween: 15,
				},
				'1024': {
					spaceBetween: 20,
				}
			},
			on: {
				init: function (swiper) {
					$(swiper.el).find('.swiper-wrapper').wrap('<div class="swiper-overflow"></div>')
				},
			}
		})
	}


	if ($('.catalog-cats').length) {
		new Swiper(".catalog-cats", {
			loop: false,
			spaceBetween: 15,
			slidesPerView: 'auto',
			watchSlidesProgress: true,
			watchOverflow: true,
			preloadImages: false,
			lazy: {
				loadPrevNext: true,
				elementClass: 'lazyload',
				enabled: true,
				loadedClass: 'loaded',
				checkInView: true,
				loadOnTransitionStart: true
			},
			navigation: {
				nextEl: '.slider-button-next',
				prevEl: '.slider-button-prev'
			},
			breakpoints: {
				'320': {
					spaceBetween: 15,
				},
				'480': {
					spaceBetween: 15,
				},
				'768': {
					spaceBetween: 15,
				},
				'1024': {
					spaceBetween: 20,
				}
			},
			on: {
				init: function (swiper) {
					$(swiper.el).find('.swiper-wrapper').wrap('<div class="swiper-overflow"></div>')
				},
			}
		})
	}


	if ($('.main-stock__slider').length) {
		new Swiper('.main-stock__slider', {
			loop: false,
			watchSlidesProgress: true,
			watchOverflow: true,
			spaceBetween: 20,
			slidesPerView: 'auto',
			preloadImages: false,
			lazy: {
				loadPrevNext: true,
				elementClass: 'lazyload',
				enabled: true,
				loadedClass: 'loaded',
				checkInView: true,
				loadOnTransitionStart: true
			},
			navigation: {
				nextEl: '.slider-button-next',
				prevEl: '.slider-button-prev'
			},
			scrollbar: {
				el: ".swiper-scrollbar",
				hide: false,
      		},
			breakpoints: {
				'320': {
					spaceBetween: 16,
					slidesPerView: 'auto'
				},
				'480': {
					spaceBetween: 16,
					slidesPerView: 'auto'
				},
				'768': {
					spaceBetween: 16,
					slidesPerView: 'auto'
				},
				'1024': {
					spaceBetween: 20,
					slidesPerView: 3,
				}
			},
			on: {
				init: function (swiper) {
					$(swiper.el).find('.swiper-wrapper').wrap('<div class="swiper-overflow"></div>')
				},
				touchMove: function (swiper) {
					$(swiper.el).find('.swiper-scrollbar').removeClass('_hide')
				},
				touchStart: function (swiper) {
					$(swiper.el).find('.swiper-scrollbar').removeClass('_hide')
				},
				touchEnd: function (swiper) {
					$(swiper.el).find('.swiper-scrollbar').addClass('_hide')
				}
			}
		})
	}


	if ($('.major-projects__slider').length) {
		new Swiper('.major-projects__slider', {
			loop: false,
			watchSlidesProgress: true,
			watchOverflow: true,
			spaceBetween: 20,
			slidesPerView: 'auto',
			preloadImages: false,
			lazy: {
				loadPrevNext: true,
				elementClass: 'lazyload',
				enabled: true,
				loadedClass: 'loaded',
				checkInView: true,
				loadOnTransitionStart: true
			},
			navigation: {
				nextEl: '.slider-button-next',
				prevEl: '.slider-button-prev'
			},
			scrollbar: {
				el: ".swiper-scrollbar",
				hide: false,
      		},
			breakpoints: {
				'320': {
					spaceBetween: 12,
					slidesPerView: 'auto'
				},
				'480': {
					spaceBetween: 12,
					slidesPerView: 'auto'
				},
				'768': {
					spaceBetween: 12,
					slidesPerView: 3
				},
				'1024': {
					spaceBetween: 16,
					slidesPerView: 3,
				},
				'1320': {
					spaceBetween: 20,
					slidesPerView: 3,
				}
			},
			on: {
				init: function (swiper) {
					$(swiper.el).find('.swiper-wrapper').wrap('<div class="swiper-overflow"></div>')
				},
				touchMove: function (swiper) {
					$(swiper.el).find('.swiper-scrollbar').removeClass('_hide')
				},
				touchStart: function (swiper) {
					$(swiper.el).find('.swiper-scrollbar').removeClass('_hide')
				},
				touchEnd: function (swiper) {
					$(swiper.el).find('.swiper-scrollbar').addClass('_hide')
				}
			}
		})
	}


	if ($('.inner-reviews__slider').length) {
		new Swiper('.inner-reviews__slider', {
			loop: false,
			watchSlidesProgress: true,
			watchOverflow: true,
			spaceBetween: 20,
			slidesPerView: 'auto',
			preloadImages: false,
			lazy: {
				loadPrevNext: true,
				elementClass: 'lazyload',
				enabled: true,
				loadedClass: 'loaded',
				checkInView: true,
				loadOnTransitionStart: true
			},
			navigation: {
				nextEl: '.slider-button-next',
				prevEl: '.slider-button-prev'
			},
			pagination: {
				el: ".slider-progressbar",
				type: "progressbar",
			},
			scrollbar: {
				el: ".swiper-scrollbar",
				hide: false,
      		},
			breakpoints: {
				'320': {
					spaceBetween: 16,
					slidesPerView: 'auto'
				},
				'480': {
					spaceBetween: 16,
					slidesPerView: 'auto'
				},
				'768': {
					spaceBetween: 16,
					slidesPerView: 'auto'
				},
				'1024': {
					spaceBetween: 16,
					slidesPerView: 2,
				},
				'1320': {
					spaceBetween: 20,
					slidesPerView: 3,
				}
			},
			on: {
				init: function (swiper) {
					$(swiper.el).find('.swiper-wrapper').wrap('<div class="swiper-overflow"></div>')
				},
				touchMove: function (swiper) {
					$(swiper.el).find('.swiper-scrollbar').removeClass('_hide')
				},
				touchStart: function (swiper) {
					$(swiper.el).find('.swiper-scrollbar').removeClass('_hide')
				},
				touchEnd: function (swiper) {
					$(swiper.el).find('.swiper-scrollbar').addClass('_hide')
				}
			}
		})
	}


	if ($('.history__dates').length) {
		historyDates = new Swiper('.history__dates', {
			loop: false,
			watchSlidesProgress: true,
			watchOverflow: true,
			spaceBetween: 20,
			slidesPerView: 'auto',
			preloadImages: false,
			slideToClickedSlide: true,
			lazy: {
				loadPrevNext: true,
				elementClass: 'lazyload',
				enabled: true,
				loadedClass: 'loaded',
				checkInView: true,
				loadOnTransitionStart: true
			},
			navigation: {
				nextEl: '.slider-button-next',
				prevEl: '.slider-button-prev'
			},
			pagination: {
				el: ".slider-progressbar",
				type: "progressbar",
			},
			scrollbar: {
				el: ".swiper-scrollbar",
				hide: false,
      		},
			breakpoints: {
				'320': {
					spaceBetween: 35,
					slidesPerView: 'auto'
				},
				'480': {
					spaceBetween: 35,
					slidesPerView: 'auto'
				},
				'768': {
					spaceBetween: 60,
					slidesPerView: 'auto'
				},
				'1024': {
					spaceBetween: 97,
					slidesPerView: 'auto'
				},
				'1320': {
					spaceBetween: 152,
					slidesPerView: 'auto'
				},
				'1600': {
					spaceBetween: 266,
					slidesPerView: 'auto'
				}
			},
			on: {
				init: function (swiper) {
					$(swiper.el).find('.swiper-wrapper').wrap('<div class="swiper-overflow"></div>')
				},
				touchMove: function (swiper) {
					$(swiper.el).find('.swiper-scrollbar').removeClass('_hide')
				},
				touchStart: function (swiper) {
					$(swiper.el).find('.swiper-scrollbar').removeClass('_hide')
				},
				touchEnd: function (swiper) {
					$(swiper.el).find('.swiper-scrollbar').addClass('_hide')
				}
			}
		})

		new Swiper('.history__slider', {
			spaceBetween: 40,
			slidesPerView: 'auto',
			loop: false,
			speed: 500,
			watchOverflow: true,
			thumbs: {
				swiper: historyDates
			},
			scrollbar: {
				el: ".swiper-scrollbar",
				hide: false,
      		},
		})
	}


	if ($('.main-news__slider').length) {
		new Swiper('.main-news__slider', {
			loop: false,
			watchSlidesProgress: true,
			watchOverflow: true,
			spaceBetween: 16,
			slidesPerView: 'auto',
			preloadImages: false,
			lazy: {
				loadPrevNext: true,
				elementClass: 'lazyload',
				enabled: true,
				loadedClass: 'loaded',
				checkInView: true,
				loadOnTransitionStart: true
			},
			navigation: {
				nextEl: '.slider-button-next',
				prevEl: '.slider-button-prev'
			},
			scrollbar: {
				el: ".swiper-scrollbar",
				hide: false,
      		},
			breakpoints: {
				'320': {
					spaceBetween: 16,
					slidesPerView: 'auto'
				},
				'480': {
					spaceBetween: 16,
					slidesPerView: 'auto'
				},
				'768': {
					spaceBetween: 16,
					slidesPerView: 'auto'
				},
				'1024': {
					spaceBetween: 20,
					slidesPerView: 'auto'
				}
			},
			on: {
				init: function (swiper) {
					$(swiper.el).find('.swiper-wrapper').wrap('<div class="swiper-overflow"></div>')
				},
				touchMove: function (swiper) {
					$(swiper.el).find('.swiper-scrollbar').removeClass('_hide')
				},
				touchStart: function (swiper) {
					$(swiper.el).find('.swiper-scrollbar').removeClass('_hide')
				},
				touchEnd: function (swiper) {
					$(swiper.el).find('.swiper-scrollbar').addClass('_hide')
				}
			}
		})
	}


	
	if ($('.product__thumb').length) {
		new Swiper(".product__thumb", {
			loop: false,
			spaceBetween: 0,
			slidesPerView: 1,
			watchSlidesProgress: true,
			watchOverflow: true,
			preloadImages: false,
			nested: true,
			lazy: {
				loadPrevNext: true,
				elementClass: 'lazyload',
				enabled: true,
				loadedClass: 'loaded',
				checkInView: true,
				loadOnTransitionStart: true
			},
			pagination: {
				bulletActiveClass: 'slider-dot_active',
				bulletClass: 'slider-dot',
				clickableClass: 'slider-pagination-clickable',
				el: '.slider-pagination',
				clickable: true
			}
		})
	}


	if ($('.products__slider').length) {
		new Swiper('.products__slider', {
			loop: false,
			watchSlidesProgress: true,
			watchOverflow: true,
			spaceBetween: 16,
			slidesPerView: 'auto',
			preloadImages: false,
			nested: true,
			lazy: {
				loadPrevNext: true,
				elementClass: 'lazyload',
				enabled: true,
				loadedClass: 'loaded',
				checkInView: true,
				loadOnTransitionStart: true
			},
			navigation: {
				nextEl: '.slider-button-next',
				prevEl: '.slider-button-prev'
			},
			scrollbar: {
				el: ".swiper-scrollbar",
				hide: false,
      		},
			breakpoints: {
				'320': {
					spaceBetween: 16,
					slidesPerView: 'auto'
				},
				'480': {
					spaceBetween: 16,
					slidesPerView: 'auto'
				},
				'768': {
					spaceBetween: 16,
					slidesPerView: 4
				},
				'1024': {
					spaceBetween: 20,
					slidesPerView: 5
				},
				'1320': {
					spaceBetween: 20,
					slidesPerView: 5
				},
				'1400': {
					spaceBetween: 20,
					slidesPerView: 5
				},
				'1760': {
					spaceBetween: 20,
					slidesPerView: 6
				}
			},
			on: {
				init: function (swiper) {
					$(swiper.el).find('.product__name, .product__box, .product__info, .product__prices').height('auto')

					setHeight( $(swiper.el).find('.product__name') )
					setHeight( $(swiper.el).find('.product__box') )
					setHeight( $(swiper.el).find('.product__info') )
					setHeight( $(swiper.el).find('.product__prices') )
				},
				resize: function (swiper) {
					$(swiper.el).find('.product__name, .product__box, .product__info, .product__prices').height('auto')

					// setTimeout(function(){
						setHeight( $(swiper.el).find('.product__name') )
						setHeight( $(swiper.el).find('.product__box') )
						setHeight( $(swiper.el).find('.product__info') )
						setHeight( $(swiper.el).find('.product__prices') )
					// }, 200)
				},
				touchMove: function (swiper) {
					$(swiper.el).find('.swiper-scrollbar').removeClass('_hide')
				},
				touchStart: function (swiper) {
					$(swiper.el).find('.swiper-scrollbar').removeClass('_hide')
				},
				touchEnd: function (swiper) {
					$(swiper.el).find('.swiper-scrollbar').addClass('_hide')
				}
			}
		})
	}

	if ($('.compare-products__slider').length) {
		productsCompare = new Swiper('.compare-products__slider', {
			loop: false,
			watchSlidesProgress: true,
			watchOverflow: true,
			spaceBetween: 16,
			slidesPerView: 'auto',
			preloadImages: false,
			nested: true,
			lazy: {
				loadPrevNext: true,
				elementClass: 'lazyload',
				enabled: true,
				loadedClass: 'loaded',
				checkInView: true,
				loadOnTransitionStart: true
			},
			navigation: {
				nextEl: '.slider-button-next',
				prevEl: '.slider-button-prev'
			},
			scrollbar: {
				el: ".swiper-scrollbar",
				hide: false,
      		},
			breakpoints: {
				'320': {
					spaceBetween: 16,
					slidesPerView: 'auto'
				},
				'480': {
					spaceBetween: 16,
					slidesPerView: 'auto'
				},
				'768': {
					spaceBetween: 16,
					slidesPerView: 3
				},
				'1024': {
					spaceBetween: 20,
					slidesPerView: 4
				},
				'1320': {
					spaceBetween: 20,
					slidesPerView: 4
				},
				'1400': {
					spaceBetween: 20,
					slidesPerView: 4
				},
				'1760': {
					spaceBetween: 20,
					slidesPerView: 5
				}
			},
			on: {
				init: function (swiper) {
					$(swiper.el).find('.product, .product__name, .product__box, .product__info, .product__prices').height('auto')

					setHeight( $(swiper.el).find('.product') )
					setHeight( $(swiper.el).find('.product__name') )
					setHeight( $(swiper.el).find('.product__box') )
					setHeight( $(swiper.el).find('.product__info') )
					setHeight( $(swiper.el).find('.product__prices') )
				},
				resize: function (swiper) {
					$(swiper.el).find('.product, .product__name, .product__box, .product__info, .product__prices').height('auto')

					// setTimeout(function(){
						setHeight( $(swiper.el).find('.product') )
						setHeight( $(swiper.el).find('.product__name') )
						setHeight( $(swiper.el).find('.product__box') )
						setHeight( $(swiper.el).find('.product__info') )
						setHeight( $(swiper.el).find('.product__prices') )
					// }, 200)
				},
				touchMove: function (swiper) {
					$(swiper.el).find('.swiper-scrollbar').removeClass('_hide')
				},
				touchStart: function (swiper) {
					$(swiper.el).find('.swiper-scrollbar').removeClass('_hide')
				},
				touchEnd: function (swiper) {
					$(swiper.el).find('.swiper-scrollbar').addClass('_hide')
				}
			}
		})

		compareFeatureSlider = new Swiper('.compare-section__slider', {
			loop: false,
			watchSlidesProgress: true,
			watchOverflow: true,
			spaceBetween: 16,
			slidesPerView: 'auto',
			preloadImages: false,
			nested: true,
			lazy: {
				loadPrevNext: true,
				elementClass: 'lazyload',
				enabled: true,
				loadedClass: 'loaded',
				checkInView: true,
				loadOnTransitionStart: true
			},
			breakpoints: {
				'320': {
					spaceBetween: 16,
					slidesPerView: 'auto'
				},
				'480': {
					spaceBetween: 16,
					slidesPerView: 'auto'
				},
				'768': {
					spaceBetween: 16,
					slidesPerView: 3
				},
				'1024': {
					spaceBetween: 20,
					slidesPerView: 4
				},
				'1320': {
					spaceBetween: 20,
					slidesPerView: 4
				},
				'1400': {
					spaceBetween: 20,
					slidesPerView: 4
				},
				'1760': {
					spaceBetween: 20,
					slidesPerView: 5
				}
			},
			on: {
				init: function (swiper) {
					compareHeight()
				},
				resize: function (swiper) {
					compareHeight()
				},
			}
		})

		productsCompare.controller.control = compareFeatureSlider;
		compareFeatureSlider.controller.control = productsCompare;
	}

	if ($('.products-small__slider').length) {
		new Swiper('.products-small__slider', {
			loop: false,
			watchSlidesProgress: true,
			watchOverflow: true,
			spaceBetween: 16,
			slidesPerView: 'auto',
			preloadImages: false,
			nested: true,
			lazy: {
				loadPrevNext: true,
				elementClass: 'lazyload',
				enabled: true,
				loadedClass: 'loaded',
				checkInView: true,
				loadOnTransitionStart: true
			},
			navigation: {
				nextEl: '.slider-button-next',
				prevEl: '.slider-button-prev'
			},
			scrollbar: {
				el: ".swiper-scrollbar",
				hide: false,
      		},
			breakpoints: {
				'320': {
					spaceBetween: 16,
					slidesPerView: 'auto'
				},
				'480': {
					spaceBetween: 16,
					slidesPerView: 'auto'
				},
				'768': {
					spaceBetween: 16,
					slidesPerView: 'auto'
				},
				'1024': {
					spaceBetween: 20,
					slidesPerView: 4
				},
				'1320': {
					spaceBetween: 20,
					slidesPerView: 4
				},
				'1400': {
					spaceBetween: 20,
					slidesPerView: 5
				},
				'1760': {
					spaceBetween: 20,
					slidesPerView: 6
				}
			},
			on: {
				init: function (swiper) {
					$(swiper.el).find('.product-small__name, .product-small__box, .product-small__prices').height('auto')

					setHeight( $(swiper.el).find('.product-small__name') )
					setHeight( $(swiper.el).find('.product-small__box') )
					setHeight( $(swiper.el).find('.product-small__prices') )
				},
				resize: function (swiper) {
					$(swiper.el).find('.product-small__name, .product-small__box, .product-small__prices').height('auto')

					setHeight( $(swiper.el).find('.product-small__name') )
					setHeight( $(swiper.el).find('.product-small__box') )
					setHeight( $(swiper.el).find('.product-small__prices') )
				},
				touchMove: function (swiper) {
					$(swiper.el).find('.swiper-scrollbar').removeClass('_hide')
				},
				touchStart: function (swiper) {
					$(swiper.el).find('.swiper-scrollbar').removeClass('_hide')
				},
				touchEnd: function (swiper) {
					$(swiper.el).find('.swiper-scrollbar').addClass('_hide')
				}
			}
		})
	}


	if ($('.revirew-photo__slider').length) {
		new Swiper('.revirew-photo__slider', {
			loop: false,
			watchSlidesProgress: true,
			watchOverflow: true,
			spaceBetween: 10,
			slidesPerView: 'auto',
			preloadImages: false,
			lazy: {
				loadPrevNext: true,
				elementClass: 'lazyload',
				enabled: true,
				loadedClass: 'loaded',
				checkInView: true,
				loadOnTransitionStart: true
			},
			navigation: {
				nextEl: '.slider-button-next',
				prevEl: '.slider-button-prev'
			},
			scrollbar: {
				el: ".swiper-scrollbar",
				hide: false,
      		},
			breakpoints: {
				'320': {
					spaceBetween: 10,
					slidesPerView: 5
				},
				'480': {
					spaceBetween: 10,
					slidesPerView: 7
				},
				'768': {
					spaceBetween: 10,
					slidesPerView: 10
				},
				'1025': {
					spaceBetween: 10,
					slidesPerView: 9
				},
				'1760': {
					spaceBetween: 10,
					slidesPerView: 11
				}
			},
			on: {
				init: function (swiper) {
					$(swiper.el).find('.swiper-wrapper').wrap('<div class="swiper-overflow"></div>')
				},
				touchMove: function (swiper) {
					$(swiper.el).find('.swiper-scrollbar').removeClass('_hide')
				},
				touchStart: function (swiper) {
					$(swiper.el).find('.swiper-scrollbar').removeClass('_hide')
				},
				touchEnd: function (swiper) {
					$(swiper.el).find('.swiper-scrollbar').addClass('_hide')
				}
			}
		})
	}


	if ($('.product-info').length) {
		var galleryThumbs = new Swiper('.product-thumbs', {
			spaceBetween: 9,
			slidesPerView: 8,
			direction: 'vertical',
			loop: false,
			speed: 500,
			watchOverflow: true,
			watchSlidesProgress: true,
			navigation: {
				nextEl: '.slider-button-next',
				prevEl: '.slider-button-prev'
			},
			breakpoints: {
				'768': {
					spaceBetween: 9,
					slidesPerView: 8
				},
				'1025': {
					spaceBetween: 9,
					slidesPerView: 8
				},
				'1200': {
					spaceBetween: 9,
					slidesPerView: 8
				},
				'1440': {
					spaceBetween: 10,
					slidesPerView: 5
				}
			}
		})

		new Swiper('.product-images__slider', {
			spaceBetween: 10,
			loop: false,
			speed: 500,
			watchOverflow: true,
			thumbs: {
				swiper: galleryThumbs
			},
			pagination: {
				bulletActiveClass: 'slider-dot_active',
				bulletClass: 'slider-dot',
				clickableClass: 'slider-pagination-clickable',
				el: '.slider-pagination',
				clickable: true,
			}
		})
	}


	//
	$('body').on('click', '.amount__btn_minus', function (e) {
		e.preventDefault()

		let parent = $(this).closest('.amount')
		let input = parent.find('input')
		let inputVal = parseFloat(input.val())
		let minimum = parseFloat(input.data('minimum'))
		let step = parseFloat(input.data('step'))

		if (inputVal > minimum) {
			input.val(inputVal - step)

			parent.find('.amount__btn_plus').prop("disabled", false)
		}

		if (inputVal-1 == minimum) {
			if ( !parent.hasClass('product__amount') ){
				$(this).prop("disabled", true)
			}
		}

		if (inputVal == minimum) {
			if ( parent.hasClass('product__amount') ){
				$(this).closest('.product').find('.product__added').removeClass('_show')
				$(this).closest('.product').find('.product__bot').removeClass('_hide')
			}
		}
	})
	
	$('body').on('click', '.amount__btn_plus', function (e) {
		e.preventDefault()

		let parent = $(this).closest('.amount')
		let input = parent.find('input')
		let inputVal = parseFloat(input.val())
		let maximum = parseFloat(input.data('maximum'))
		let step = parseFloat(input.data('step'))

		if (inputVal < maximum) {
			input.val(inputVal + step)

			parent.find('.amount__btn_minus').prop("disabled", false)
		}

		if (inputVal+1 == maximum) {
			$(this).prop("disabled", true)
		}
	})

	$('.amount__input').keydown(function () {
		const _self = $(this),
			maximum = parseInt(_self.data('maximum'))

		setTimeout(() => {
			if (_self.val() == '' || _self.val() == 0) _self.val(parseInt(_self.data('minimum')))
			if (_self.val() > maximum) _self.val(maximum)
		})
	})
});


$(window).on('load', () => {
	//
	if ($('.products__grid').length){
		$('.products .products__grid').each(function() {
			productsHeight($(this), parseInt($(this).css('--products_count')))
		})
	}


	if ( $('.sorting__link.active') ) {
		$('.sorting__link.active').each( function() {
			let offset = $(this).offset().left,
				width = $(this).outerWidth()/2;

			let	scroll = (offset + width) - ($(window).width()/2);

			$(this).closest('.sorting').scrollLeft(scroll);
		})
	}


	if ($('.advantages__items').length){
		advantagesSlider()
	}

	if ($('.filter-use_slider').length){
		filterUse()
	}

	if ($('.cooperation__wrap').length){
		cooperationSlider()
	}

	if ($('.approach__wrap').length){
		approachSlider()
	}

	if ($('.founders__item').length){
		foundersTextHeught()
	}


	$('body').on('click', '.approach__open', function (e) {
		e.preventDefault()

		if ( !$(this).hasClass('_active') ) {
			$('.approach-block').remove();
			$('.approach__open').removeClass('_active')

			const $items = $('.approach__item');
			const $clickedItem = $(this).closest('.approach__item');
			const clickedIndex = $items.index($clickedItem);
			const dataFile = $(this).data('file')

			const approachCount = parseInt($(this).parent().css('--approach_count'));
			const blockIndex = Math.floor(clickedIndex / approachCount);
			const insertAfterIndex = (blockIndex + 1) * approachCount - 1;

			let $insertAfter = 0;

			if ( $(window).width() > 767 ) {
				$insertAfter = $items.eq(insertAfterIndex);

				if ($insertAfter.length === 0) {
					$insertAfter = $items.last();
				}
			} else {
				$insertAfter = $items.closest('.approach');
			}

			$(this).addClass('_active')

			$.get(dataFile, function(data) {
				const $bigBlock = $('<div class="approach-block"></div>').html(data);
				$insertAfter.after($bigBlock);

				const approachBlockSlider = new Swiper('.approach-block__slider', {
					loop: false,
					watchSlidesProgress: true,
					watchOverflow: true,
					spaceBetween: 20,
					slidesPerView: 1,
					navigation: {
						nextEl: '.slider-button-next',
						prevEl: '.slider-button-prev'
					},
					on: {
						init: function (swiper) {
							$(swiper.el).find('.swiper-wrapper').wrap('<div class="swiper-overflow"></div>')
						},
					}
				})

				approachBlockSlider.slideTo(clickedIndex, 0)
			});
		} else{
			$('.approach-block').remove();
			$('.approach__open').removeClass('_active')
		}
	});

	$('body').on('click', '.approach-block__close', function (e) {
		e.preventDefault()

		$('.approach-block').remove();
		$('.approach__open').removeClass('_active')
	})


	$('body').on('click', '.founders__open', function (e) {
		e.preventDefault()

		if ($(this).hasClass('_active')) {
			$(this).removeClass('_active')
			$(this).closest('.founders__item').find('.founders__item-wrap').removeClass('_all')
		} else{
			$(this).addClass('_active')
			$(this).closest('.founders__item').find('.founders__item-wrap').addClass('_all')
		}
	})
});


$(window).on('resize', () => {
	let windowW = window.outerWidth

	if (typeof WW !== 'undefined' && WW != windowW) {
		// Перезапись ширины окна
		WW = window.innerWidth || document.clientWidth || document.querySelector('body')[0].clientWidth

		// Моб. версия
		if (!fakeResize) {
			fakeResize = true
			fakeResize2 = false

			document.getElementsByTagName('meta')['viewport'].content = 'width=device-width, initial-scale=1, maximum-scale=1'
		}

		if (!fakeResize2) {
			fakeResize2 = true

			if (windowW < 375) document.getElementsByTagName('meta')['viewport'].content = 'width=375, user-scalable=no'
		} else {
			fakeResize = false
			fakeResize2 = true
		}


		//
		if ($('.products__grid').length){
			$('.products .products__grid').each(function() {
				productsHeight($(this), parseInt($(this).css('--products_count')))
			})
		}
	}

	if ($('.advantages__items').length){
		advantagesSlider()
	}

	if ($('.filter-use_slider').length){
		filterUse()
	}

	if ($('.cooperation__wrap').length){
		cooperationSlider()
	}

	if ($('.approach__wrap').length){
		approachSlider()
	}

	if ($('.founders__item').length){
		foundersTextHeught()
	}
});


// 
function productsHeight(context, step) {
	let start    = 0
	let finish   = step
	let products = context.find('.product')

	products.find('.product__name').height('auto')
	products.find('.product__box').height('auto')
	products.find('.product__info').height('auto')
	products.find('.product__prices').height('auto')

	for (let i = 0; i < products.length; i++) {
		setHeight(products.slice(start, finish).find('.product__name'))
		setHeight(products.slice(start, finish).find('.product__box'))
		setHeight(products.slice(start, finish).find('.product__info'))
		setHeight(products.slice(start, finish).find('.product__prices'))

		start  = start + step
		finish = finish + step
	}
}


function advantagesSlider(){
	if ( $(window).width() < 1024 && !$('.advantages__items').hasClass('swiper-initialized') ) {
		$('.advantages__items').addClass('swiper')
		$('.advantages__items-wrap').addClass('swiper-wrapper')
		$('.advantages__items-flex').addClass('swiper-slide')

		advantagesSwiper = new Swiper('.advantages__items', {
			loop: false,
			watchSlidesProgress: true,
			watchOverflow: true,
			spaceBetween: 20,
			slidesPerView: 'auto',
			preloadImages: false,
			freeMode: true,
			lazy: {
				loadPrevNext: true,
				elementClass: 'lazyload',
				enabled: true,
				loadedClass: 'loaded',
				checkInView: true,
				loadOnTransitionStart: true
			},
			scrollbar: {
				el: ".swiper-scrollbar",
				hide: false,
      		},
			on: {
				touchMove: function (swiper) {
					$(swiper.el).find('.swiper-scrollbar').removeClass('_hide')
				},
				touchStart: function (swiper) {
					$(swiper.el).find('.swiper-scrollbar').removeClass('_hide')
				},
				touchEnd: function (swiper) {
					$(swiper.el).find('.swiper-scrollbar').addClass('_hide')
				}
			}
		})
	}
	else if ($(window).width() > 1023 && $('.advantages__items').hasClass('swiper-initialized')) {
		if ($('.advantages__items').length === 1 && $('.advantages__items').hasClass('swiper-initialized')) {
			advantagesSwiper.destroy(true, true)
		} else if ($('.advantages__items').length >= 2 && $('.advantages__items').hasClass('swiper-initialized')) {
			advantagesSwiper.forEach(function (element) {
				element.destroy(true, true)
			})
		}

		$('.advantages__items').removeClass('swiper')
		$('.advantages__items-wrap').removeClass('swiper-wrapper')
		$('.advantages__items-flex').removeClass('swiper-slide')
	}
}

function filterUse(){
	if ( $(window).width() < 1024 && !$('.filter-use_slider').hasClass('swiper-initialized') ) {
		$('.filter-use_slider').addClass('swiper')
		$('.filter-use_slider .filter-use__flex').addClass('swiper-wrapper').removeClass('_flex')
		$('.filter-use_slider .filter-use__item').addClass('swiper-slide')

		filterUseSwiper = new Swiper('.filter-use_slider', {
			loop: false,
			watchSlidesProgress: true,
			watchOverflow: true,
			spaceBetween: 16,
			slidesPerView: 'auto',
			preloadImages: false,
			freeMode: true,
			lazy: {
				loadPrevNext: true,
				elementClass: 'lazyload',
				enabled: true,
				loadedClass: 'loaded',
				checkInView: true,
				loadOnTransitionStart: true
			},
			scrollbar: {
				el: ".swiper-scrollbar",
				hide: false,
      		},
			on: {
				touchMove: function (swiper) {
					$(swiper.el).find('.swiper-scrollbar').removeClass('_hide')
				},
				touchStart: function (swiper) {
					$(swiper.el).find('.swiper-scrollbar').removeClass('_hide')
				},
				touchEnd: function (swiper) {
					$(swiper.el).find('.swiper-scrollbar').addClass('_hide')
				}
			}
		})
	} else if ($(window).width() > 1023 && $('.filter-use_slider').hasClass('swiper-initialized')) {
		filterUseSwiper.destroy(true, true)

		$('..filter-use_slider').removeClass('swiper')
		$('.filter-use_slider .filter-use__flex').removeClass('swiper-wrapper').addClass('_flex')
		$('.filter-use_slider .filter-use__item').removeClass('swiper-slide')
	}
}


// Выравнивание в сравнении
function compareHeight() {
	$('.compare-feature__item').height('auto')

	let productFeatures = $('.compare-feature__items'),
	featuresSizes = new Object()

	productFeatures.each(function () {
		$(this).find('> *').each(function () {
			if (featuresSizes[$(this).index()]) {
				if ($(this).outerHeight() > featuresSizes[$(this).index()]) {
					featuresSizes[$(this).index()] = $(this).outerHeight()
				}
			} else {
				featuresSizes[$(this).index()] = $(this).outerHeight()
			}
		})
	})

	$.each(featuresSizes, (key, data) => {
		productFeatures.each(function () {
			$(this).find('> *:eq(' + key + ')').innerHeight(data)
		})
	})
}


function cooperationSlider(){
	if ( $(window).width() < 768 && !$('.cooperation__wrap').hasClass('swiper-initialized') ) {
		$('.cooperation__wrap').addClass('swiper')
		$('.cooperation__grid').addClass('swiper-wrapper').removeClass('_flex')
		$('.cooperation__item').addClass('swiper-slide')

		cooperationSwiper = new Swiper('.cooperation__wrap', {
			loop: false,
			watchSlidesProgress: true,
			watchOverflow: true,
			spaceBetween: 16,
			slidesPerView: 'auto',
			preloadImages: false,
			lazy: {
				loadPrevNext: true,
				elementClass: 'lazyload',
				enabled: true,
				loadedClass: 'loaded',
				checkInView: true,
				loadOnTransitionStart: true
			},
			scrollbar: {
				el: ".swiper-scrollbar",
				hide: false,
      		},
			on: {
				touchMove: function (swiper) {
					$(swiper.el).find('.swiper-scrollbar').removeClass('_hide')
				},
				touchStart: function (swiper) {
					$(swiper.el).find('.swiper-scrollbar').removeClass('_hide')
				},
				touchEnd: function (swiper) {
					$(swiper.el).find('.swiper-scrollbar').addClass('_hide')
				}
			}
		})
	} else if ($(window).width() > 767 && $('.cooperation__wrap').hasClass('swiper-initialized')) {
		cooperationSwiper.destroy(true, true)

		$('.cooperation__wrap').removeClass('swiper')
		$('.cooperation__grid').removeClass('swiper-wrapper').addClass('_flex')
		$('.cooperation__item').removeClass('swiper-slide')
	}
}


function approachSlider(){
	if ( $(window).width() < 768 && !$('.approach__wrap').hasClass('swiper-initialized') ) {
		$('.approach__wrap').addClass('swiper')
		$('.approach__grid').addClass('swiper-wrapper').removeClass('_flex')
		$('.approach__item').addClass('swiper-slide')

		approachSwiper = new Swiper('.approach__wrap', {
			loop: false,
			watchSlidesProgress: true,
			watchOverflow: true,
			spaceBetween: 16,
			slidesPerView: 'auto',
			preloadImages: false,
			lazy: {
				loadPrevNext: true,
				elementClass: 'lazyload',
				enabled: true,
				loadedClass: 'loaded',
				checkInView: true,
				loadOnTransitionStart: true
			},
			scrollbar: {
				el: ".swiper-scrollbar",
				hide: false,
      		},
			on: {
				touchMove: function (swiper) {
					$(swiper.el).find('.swiper-scrollbar').removeClass('_hide')
				},
				touchStart: function (swiper) {
					$(swiper.el).find('.swiper-scrollbar').removeClass('_hide')
				},
				touchEnd: function (swiper) {
					$(swiper.el).find('.swiper-scrollbar').addClass('_hide')
				}
			}
		})
	} else if ($(window).width() > 767 && $('.approach__wrap').hasClass('swiper-initialized')) {
		approachSwiper.destroy(true, true)

		$('.approach__wrap').removeClass('swiper')
		$('.approach__grid').removeClass('swiper-wrapper').addClass('_flex')
		$('.approach__item').removeClass('swiper-slide')
	}
}


function foundersTextHeught(){
	$('.founders__item').each(function(){
		if ( !$(this).find('.founders__item-wrap').hasClass('_big') ) {
			let heightFounders = $(this).find('.founders__item-wrap').height()
			let heightText = $(this).find('.founders__item-wrap .text-block').height()

			if ( heightFounders < heightText ) {
				$(this).find('.founders__item-wrap').addClass('_big')
			}
		}
	})
}