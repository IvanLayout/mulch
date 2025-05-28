// Ширина окна для ресайза
WW = window.innerWidth || document.clientWidth || document.querySelector('body')[0].clientWidth

// Моб. версия
fakeResize = false
fakeResize2 = true

if (document.body.clientWidth < 375) {
	document.getElementsByTagName('meta')['viewport'].content = 'width=375, user-scalable=no'
}

$(() => {
	$('body').on('click', '.mob-menu-btn', function (e) {
		e.preventDefault()

		if ($('.mob-menu-btn').hasClass('_active')) {
			$('.mob-menu-btn').removeClass('_active')
			$('.header').removeClass('_show')
			$('body').removeClass('_menu-open')
		} else {
			$('.mob-menu-btn').addClass('_active')
			$('.header').addClass('_show')
			$('body').addClass('_menu-open')
		}
	})

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


	if ($('.main-slider').length) {
		new Swiper(".main-slider", {
			loop: true,
			spaceBetween: 0,
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
			spaceBetween: 20,
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
			breakpoints: {
				'320': {
					spaceBetween: 20,
					slidesPerView: 'auto'
				},
				'480': {
					spaceBetween: 20,
					slidesPerView: 'auto'
				},
				'768': {
					spaceBetween: 20,
					slidesPerView: 'auto'
				},
				'1025': {
					spaceBetween: 16,
					slidesPerView: 4,
				},
				'1200': {
					spaceBetween: 16,
					slidesPerView: 4,
				},
				'1400': {
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
				'1025': {
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


	if ($('.products__slider').length) {
		new Swiper('.products__slider', {
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
			breakpoints: {
				'320': {
					spaceBetween: 10,
					slidesPerView: 2
				},
				'480': {
					spaceBetween: 20,
					slidesPerView: 2
				},
				'768': {
					spaceBetween: 20,
					slidesPerView: 3
				},
				'1025': {
					spaceBetween: 20,
					slidesPerView: 4
				},
				'1200': {
					spaceBetween: 16,
					slidesPerView: 4
				},
				'1400': {
					spaceBetween: 20,
					slidesPerView: 6
				}
			},
			on: {
				init: function (swiper) {
					$(swiper.el).find('.product__name, .product__box, .product__info, .product__prices').height('auto')

					setTimeout(function(){
						setHeight( $(swiper.el).find('.product__name') )
						setHeight( $(swiper.el).find('.product__box') )
						setHeight( $(swiper.el).find('.product__info') )
						setHeight( $(swiper.el).find('.product__prices') )
					}, 200)
				},
				resize: function (swiper) {
					$(swiper.el).find('.product__name, .product__box, .product__info, .product__prices').height('auto')

					setTimeout(function(){
						setHeight( $(swiper.el).find('.product__name') )
						setHeight( $(swiper.el).find('.product__box') )
						setHeight( $(swiper.el).find('.product__info') )
						setHeight( $(swiper.el).find('.product__prices') )
					}, 200)
				},
			}
		})
	}

	
	if ($('.product__thumb').length) {
		new Swiper(".product__thumb", {
			loop: true,
			spaceBetween: 0,
			slidesPerView: 1,
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
			pagination: {
				bulletActiveClass: 'slider-dot_active',
				bulletClass: 'slider-dot',
				clickableClass: 'slider-pagination-clickable',
				el: '.slider-pagination',
				clickable: true
			}
		})
	}


	if ($('.product-info__slider').length) {
		new Swiper(".product-info__slider", {
			loop: false,
			spaceBetween: 0,
			slidesPerView: 1,
			watchSlidesProgress: true,
			watchOverflow: true,
			preloadImages: false,
			initialSlide: 1,
			lazy: {
				loadPrevNext: true,
				elementClass: 'lazyload',
				enabled: true,
				loadedClass: 'loaded',
				checkInView: true,
				loadOnTransitionStart: true
			},
			effect: "coverflow",
			coverflowEffect: {
				rotate: 0,
				stretch: 175,
				depth: 0,
				modifier: 1,
				scale: .89,
				slideShadows: false,
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
			breakpoints: {
				'320': {
					coverflowEffect: {
						stretch: 70,
					}
				},
				'480': {
					coverflowEffect: {
						stretch: 90,
					}
				},
				'768': {
					coverflowEffect: {
						stretch: 150,
					}
				},
				'1025': {
					coverflowEffect: {
						stretch: 100,
					}
				},
				'1500': {
					coverflowEffect: {
						stretch: 175,
					},
				}
			},
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


	if ($('.products-small').length){
		productSmallSlider()
	}

	if ($('.wholesale__img').length){
		wholesaleImg()
	}

	if ($('.product-info__line').length){
		productInfoImg()
	}

	if ($('.section-lk__line').length){
		sectionLkImg()
	}
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

	if ($('.products-small').length){
		productSmallSlider()
	}

	if ($('.wholesale__line').length){
		wholesaleImg()
	}

	if ($('.product-info__line').length){
		productInfoImg()
	}

	if ($('.section-lk__line').length){
		sectionLkImg()
	}
});


// 
function productsHeight(context, step) {
	let start    = 0
	let finish   = step
	let products = context.find('.product')

	products.find('.product__bord').height('auto')
	products.find('.product__name').height('auto')

	for (let i = 0; i < products.length; i++) {
		setHeight(products.slice(start, finish).find('.product__bord'))
		setHeight(products.slice(start, finish).find('.product__name'))

		start  = start + step
		finish = finish + step
	}
}


function productSmallSlider(){
	if ( $(window).width() < 1025 && !$('.products-small').hasClass('swiper-initialized') ) {
		$('.products-small').addClass('swiper')
		$('.products-small__items').addClass('swiper-wrapper')
		$('.products-small__item').addClass('swiper-slide')

		productSmallSwiper = new Swiper('.products-small', {
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
			on: {
				init: function (swiper) {
					let posNav = $(swiper.el).find('.products-small__item-thumb').height()

					$(swiper.el).find('.slider-button-prev, .slider-button-next').css('top', posNav/2)

					$(swiper.el).find('.products-small__item-name').height('auto')

					setTimeout(function(){
						setHeight( $(swiper.el).find('.products-small__item-name') )
					}, 200)
				},
				resize: function (swiper) {
					let posNav = $(swiper.el).find('.products-small__item-thumb').height()

					$(swiper.el).find('.slider-button-prev, .slider-button-next').css('top', posNav/2)

					$(swiper.el).find('.products-small__item-name').height('auto')

					setTimeout(function(){
						setHeight( $(swiper.el).find('.prodproducts-small__item-nameuct__name') )
					}, 200)
				}
			}
		})
	}
	else if ($(window).width() > 1024 && $('.products-small').hasClass('swiper-initialized')) {
		if ($('.products-small').length === 1 && $('.products-small').hasClass('swiper-initialized')) {
			productSmallSwiper.destroy(true, true)
		} else if ($('.products-small').length >= 2 && $('.products-small').hasClass('swiper-initialized')) {
			productSmallSwiper.forEach(function (element) {
				element.destroy(true, true)
			})
		}

		$('.products-small').removeClass('swiper')
		$('.products-small__item').removeClass('swiper-wrapper')
		$('.products-small__item').removeClass('swiper-slide')
	}
}

function wholesaleImg(){
	let heigWholesale = $('.wholesale__img').height();

	$('.wholesale__line').height(heigWholesale);
}

function productInfoImg(){
	let heigInfoImg = $('.product-info__slider').height();

	$('.product-info__line').height(heigInfoImg);
}

function sectionLkImg(){
	let heigLkImg = $('.section-lk__thumb').height();

	$('.section-lk__line').height(heigLkImg);
}

