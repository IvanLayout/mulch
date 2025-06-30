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
		min      : 11,
		max      : 123000,
		from     : 80000,
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

	$priceRange = $("#price_range2").ionRangeSlider({
		type     : 'double',
		min      : 11,
		max      : 123000,
		from     : 80000,
		to       : 123000,
		step     : 1,
		onChange : function (data) {
			$('.price_range2 input.ot').val( data.from.toLocaleString('ru-RU') )
			$('.price_range2 input.do').val( data.to.toLocaleString('ru-RU') )
		}
	}).data("ionRangeSlider")

	$('.price_range2 .range__input').keyup(function() {
		$priceRange.update({
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
			spaceBetween: 16,
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
			}
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
			scrollbar: {
				el: ".swiper-scrollbar",
				hide: false,
      		},
			breakpoints: {
				'320': {
					spaceBetween: 10,
					slidesPerView: 'auto'
				},
				'480': {
					spaceBetween: 10,
					slidesPerView: 'auto'
				},
				'768': {
					spaceBetween: 10,
					slidesPerView: 'auto'
				},
				'1025': {
					spaceBetween: 10,
					slidesPerView: 11
				}
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
			$(this).prop("disabled", true)
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

			let $insertAfter = $items.eq(insertAfterIndex);

			if ($insertAfter.length === 0) {
				$insertAfter = $items.last();
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
		})
	}
	else if ($(window).width() > 1023 && $('.filter-use_slider').hasClass('swiper-initialized')) {
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
		})
	}
	else if ($(window).width() > 767 && $('.cooperation__wrap').hasClass('swiper-initialized')) {
		cooperationSwiper.destroy(true, true)

		$('.cooperation__wrap').removeClass('swiper')
		$('.cooperation__grid').removeClass('swiper-wrapper').addClass('_flex')
		$('.cooperation__item').removeClass('swiper-slide')
	}
}