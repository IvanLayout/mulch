$(() => {
	// Observer API
	const boxes = document.querySelectorAll('.lazyload')

	function scrollTracking(entries) {
		for (const entry of entries) {
			if (entry.intersectionRatio > 0 && entry.target.getAttribute('data-src') && !entry.target.classList.contains('loaded')) {
				entry.target.classList.add('loaded')

				entry.target.src = entry.target.getAttribute('data-src')
			}

			if (entry.intersectionRatio > 0 && entry.target.getAttribute('data-srcset') && !entry.target.classList.contains('loaded')) {
				entry.target.srcset = entry.target.getAttribute('data-srcset')

				entry.target.classList.add('loaded')
			}
		}
	}

	const observer = new IntersectionObserver(scrollTracking, {
		threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0]
	})

	boxes.forEach(element => observer.observe(element))
	

	// Установка ширины стандартного скроллбара
	$(':root').css('--scroll_width', widthScroll() + 'px')


	// Мини всплывающие окна
	$('.mini-modal__btn').click(function (e) {
		e.preventDefault()

		const parent = $(this).closest('.mini-modal')

		if ($(this).hasClass('_active')) {
			$(this).removeClass('_active')
			$('.mini-modal__modal').removeClass('_active')

			$('body').removeClass('_lock-mini')

			if (is_touch_device()) $('body').css('cursor', 'default')
		} else {
			$('.mini-modal__btn').removeClass('_active')
			$(this).addClass('_active')

			$('.mini-modal__modal').removeClass('_active')
			parent.find('.mini-modal__modal').addClass('_active')

			if( $(this).hasClass('mini-modal__btn_look') ) {
				$('body').addClass('_lock-mini')
			}
			

			if (is_touch_device()) $('body').css('cursor', 'pointer')
		}
	})

	// Закрываем всплывашку при клике за её пределами
	$(document).click((e) => {
		if ( !e.target.closest('.mini-modal') ) {
			$('.mini-modal__modal, .mini-modal__btn').removeClass('_active')
			$('body').removeClass('_lock-mini')

			if (is_touch_device()) $('body').css('cursor', 'default')
		}

		if ( !e.target.closest('.header-catalog') && !e.target.closest('.open-catalog') ) {
			$('.open-catalog').removeClass('_active')
			$('.header-catalog__block').removeClass('_show')
			$('.overlay-catalog').removeClass('_show')
		}
	})

	$('body').on('click', '.mini-overlay, [data-mini-close]', function(e) {
		e.preventDefault()

		$('.mini-modal__modal, .mini-modal__btn').removeClass('_active')
		$('body').removeClass('_lock-mini')

		if (is_touch_device()) $('body').css('cursor', 'default')
	})


	// Плавная прокрутка к якорю
	$('.scroll-btn').click(function(e) {
		e.preventDefault()

		let href = $(this).data('anchor'),
		addOffset = $('.header').innerHeight()

		if ($(this).closest('.header__menu')){
			$('.mob-menu-btn').removeClass('_active')
			$('.header__menu').removeClass('_show')
			$('body').removeClass('_menu-open')
		}

		$('html, body').stop().animate({ scrollTop: $(href).offset().top }, 1000)
	})


	// Табы
	var locationHash = window.location.hash

	$('body').on('click', '.tabs__button_js', function(e) {
		e.preventDefault()

		if( !$(this).hasClass('_active') ) {
			let parent = $(this).closest('.tabs-container')
			let activeTab = $(this).data('content')
			let level = $(this).data('level')

			parent.find('.tabs:first').find('.tabs__button_js').removeClass('_active')
			parent.find('.tab-content.' + level).removeClass('_active')

			$(this).addClass('_active')
			$(activeTab).addClass('_active')
		}
	})

	if( locationHash && $('.tabs-container').length ) {
		let activeTab = $('.tabs__button_js[data-content="'+ locationHash +'"]')
		let parent = activeTab.closest('.tabs-container')
		let level = activeTab.data('level')

		parent.find('.tabs:first').find('.tabs__button_js').removeClass('_active')
		parent.find('.tab-content.' + level).removeClass('_active')

		activeTab.addClass('_active')
		$(locationHash).addClass('_active')

		$('html, body').stop().animate({
			scrollTop: $(locationHash).offset().top - 120
		}, 1000)
	}


	// Маска ввода
	$('input[type=tel]').each(function(){
		let datamask = $(this).data('mask');

		$(this).inputmask(`${datamask}`, {
			showMaskOnHover: false
		})
	})

	// Кастомный select
	$('select').niceSelect()


	// Fancybox
	Fancybox.defaults.autoFocus = false
	Fancybox.defaults.dragToClose = false
	Fancybox.defaults.placeFocusBack = false

	Fancybox.defaults.template = {
		closeButton: '<svg viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1 1L16 16" stroke-linecap="round"/><path d="M16 1L1 16" stroke-linecap="round"/></svg>',
	}

	// Всплывающие окна
	$('body').on('click', '.modal-btn', function (e) {
		e.preventDefault()

		Fancybox.close()

		Fancybox.show([{
			src: $(this).data('content'),
			type: 'inline'
		}])
	})

	$('body').on('click', '.modal-close', function (e) {
		e.preventDefault()

		Fancybox.close()
	})


	// Увеличение картинки
	Fancybox.bind('.fancy-img', {
		Image: {
			zoom: false,
		},
		Thumbs: {
			autoStart: false,
		}
	})


	// Выбор файла
	$('.file-selection input[type=file]').change(function(){
		var val = $(this).val()

		var parent = $(this).closest('.file-selection')

		parent.find('.file-selection__path-name').text(val)

		parent.find('.file-selection__path').addClass('_active')

		if(parent.find('.file-selection__path-name').text() == '') {
			let defoultText = parent.find('.file-selection__path-name').data('text')
			
			parent.find('.file-selection__path-name').html(defoultText)

			parent.find('.file-selection__path').removeClass('_active')
		}
	})


	$('body').on('click', '.radio__choice', function () {
		if ($(this).attr('id') === 'legal-entity') {
			$(this).closest('.form').addClass('_legal-entity')
		} else {
			$(this).closest('.form').removeClass('_legal-entity')
		}
	})


	$('body').on('click', '.accordion__open', function (e) {
		e.preventDefault()

		if ($(this).closest('.accordion__item').hasClass('_active')) {
			$(this).closest('.accordion__item').removeClass('_active')
		} else {
			$(this).closest('.accordion__item').addClass('_active')
		}
	})

	$('body').on('click', '.open-filter', function (e) {
		e.preventDefault()

		if ($('.filter').hasClass('_show')) {
			$('.filter').removeClass('_show')
		} else {
			$('.filter').addClass('_show')
		}
	})


	$('body').on('click', '.open-catalog', function (e) {
		e.preventDefault()

		if ($(this).hasClass('_active')) {
			$(this).removeClass('_active')
			$('.header-catalog__block').removeClass('_show')
			$('.overlay-catalog').removeClass('_show')
		} else {
			$(this).addClass('_active')
			$('.header-catalog__block').addClass('_show')
			$('.overlay-catalog').addClass('_show')
		}
	})

	$('body').on('click', '.header-submenu__sub-item a._sub', function (e) {
		e.preventDefault()

		if ($(this).hasClass('_active')) {
			$(this).removeClass('_active')
		} else {
			$(this).addClass('_active')
		}
	})

	$('body').on('click', '.header-submenu__sub-more', function (e) {
		e.preventDefault()

		if ($(this).hasClass('_active')) {
			$(this).removeClass('_active')

			$(this).closest('.header-submenu__sub').find('._hide').removeClass('_show')
		} else {
			$(this).addClass('_active')

			$(this).closest('.header-submenu__sub').find('._hide').addClass('_show')
		}
	})

	// Наведение на пункты меню
	if ( $(window).width() > 1023 ) {
		$('body').on('mouseover', '.header-menu__item', function (e) {
			e.preventDefault()
	
			if (!$(this).hasClass('_active-pc')) {
				$(this).closest('.header-menu').find('.header-menu__item').removeClass('_active-pc')
	
				$(this).addClass('_active-pc')
			}
		})
	}

	$('body').on('click', '.product__btn', function (e) {
		e.preventDefault()
		
		$(this).closest('.product__bot').addClass('_hide')
		$(this).closest('.product').find('.product__added').addClass('_show')
	})
})

// Вспомогательные функции
const widthScroll = () => {
	let div = document.createElement('div')

	div.style.overflowY = 'scroll'
	div.style.width = '50px'
	div.style.height = '50px'
	div.style.visibility = 'hidden'

	document.body.appendChild(div)

	let scrollWidth = div.offsetWidth - div.clientWidth
	document.body.removeChild(div)

	return scrollWidth
}

function setHeight(className){
    let maxheight = 0

    className.each(function() {
		let elHeight = $(this).outerHeight()

        if( elHeight > maxheight ) {
			maxheight = elHeight
        }
    })

    className.outerHeight( maxheight )
}

const is_touch_device = () => !!('ontouchstart' in window)