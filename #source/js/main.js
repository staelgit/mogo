//@prepros-append script.js

$(document).ready(function(){
	// слайдер
	$('.slider').slick({
		infinite: true,
		arrows:true,
		dots:false,
		slidesToShow: 1,
		slidesToScroll: 1,
		adaptiveHeight: true
	});

	// найсскролл
	$(".accordion-wedo__text").niceScroll({
	});
/*

	// JQ - переход по клику кнопки до его блока
	$('a[data-item]').click(function (e) {
		e.preventDefault();
		let targetSelector = '.' + $(this).attr('data-item');
		$('html, body').animate({
			scrollTop: $(targetSelector).offset().top-56
		}, 1000);
	});
*/
/*

	// JQ - плавающее меню
	$(window).scroll(swimmingMenu);

	swimmingMenu();

	function swimmingMenu () {
		let headerElement = $('.header');
		if ($(this).scrollTop() > 20) {
			if (!headerElement.hasClass('fixed')) {
				headerElement.addClass('fixed')
			}
		} else if (headerElement.hasClass('fixed')) {
			headerElement.removeClass('fixed')
		}
	}
*/
/*

	// JQ - подсветка кнопок в зависимости от того что сейчас на экране
	$(window).on("scroll resize", highlightButtonByCurrentVisibleElement);

	highlightButtonByCurrentVisibleElement();

	function highlightButtonByCurrentVisibleElement() {
		let currentClientHeight = $(this).height();
		let documentScroll = $(this).scrollTop();
		var activeElementId;

		$('.wrapper').children().each(function () {
			let elemTop = $(this).offset().top - documentScroll;
			let elemHeight = $(this).outerHeight();
			let visibleElemPart;

			if (elemTop < currentClientHeight & (elemTop + elemHeight) > 0) {
				if (elemTop < 0) {
					visibleElemPart = (elemTop + elemHeight) / currentClientHeight;
				} else {
					visibleElemPart = (currentClientHeight - elemTop) / currentClientHeight;
				}
				if (visibleElemPart > 0.60) {
					activeElementId = $(this).attr('id');
				}
			}
		});

		$('a[data-item]').each(function () {
			if (!activeElementId) {
				if ($(this).hasClass('active')) {
					$(this).removeClass('active');
				}
			} else if ($(this).attr('data-item') === activeElementId) {
				if ($(this).hasClass('active')) {
				} else {
					$(this).addClass('active');
				}
			} else {
				if ($(this).hasClass('active')) {
					$(this).removeClass('active');
				}
			}
		})
	}
*/
/*

	// JQ - убирание меню при клике на мобильных
	$('.header-menu').click(function () {
		if ($('.header-menu').hasClass('active')) {
			$('a.header-menu__link').click(function () {
				$('body').removeClass('lock');
				$('.header-menu').removeClass('active');
				$('.icon-menu').removeClass('active');
			})
		}
	})

*/

});




// ------------- js -------------------

// JS переход по клику кнопки до его блока

goToElementByButtonClick();

function goToElementByButtonClick(){
	const buttonList = document.querySelectorAll('a[data-item]');
	for (let button of buttonList) {
		if (button.dataset.item) {
			const element = document.querySelector(`.${button.dataset.item}`);
			addListenerToButton(button, element)
		}
	}

	function addListenerToButton(button, element) {
		button.addEventListener('click', function (event) {
			event.preventDefault();
			let offsetTop = element.getBoundingClientRect().top + window.pageYOffset - 56;
			window.scrollTo({
				top: offsetTop,
				left: 0,
				behavior:'smooth',
			});
		});
	}
}


// JS плавающее меню
let lastScroll = window.pageYOffset;
setInterval(controlSwimmingTopMenu, 100);

function controlSwimmingTopMenu (){
	let currentScroll = window.pageYOffset;
	if (currentScroll !== lastScroll) {
		lastScroll = currentScroll;
		const elementHeader = document.querySelector(`.header`);
		if (currentScroll > 20) {
			if (elementHeader.classList.contains('fixed')) {}
				else {elementHeader.classList.add('fixed')}
		}
		else {
			if (elementHeader.classList.contains('fixed')) {
				elementHeader.classList.remove('fixed')
			}
		}
	}
}


// JS кнопки активные в зависимости от раздела
let lastClientHeight = 0;
let lastScroll2 = 0; 
let timeout = 100;

checkChangeScrollOrClientHeight ();

function checkChangeScrollOrClientHeight () {
	let currentClientHeight = document.documentElement.clientHeight;
	let currentScroll = window.pageYOffset;
	if (currentClientHeight !== lastClientHeight || currentScroll !== lastScroll2) {
		lastClientHeight = currentClientHeight;
		lastScroll2 = currentScroll;
		setActiveButton();
	} 
	setTimeout(checkChangeScrollOrClientHeight, timeout);
}

function setActiveButton () {
	const allElements = document.querySelector('.wrapper').children;
	let currentClientHeight = document.documentElement.clientHeight;
	let activeElementId;

	for (let elem of allElements) {
		let elemTop = elem.getBoundingClientRect().top;
		let elemHeight = elem.getBoundingClientRect().height;
		let visibleElemPart;

		if (elemTop < currentClientHeight && (elemTop + elemHeight) > 0) {
			if (elemTop < 0) {
				visibleElemPart = (elemTop + elemHeight) / currentClientHeight;
			} else {
				visibleElemPart = (currentClientHeight - elemTop) / currentClientHeight;
			}
			if (visibleElemPart > 0.60) {
				activeElementId = elem.id;
			}
		}
	}

	const allNavElements = document.querySelectorAll('a[data-item]');
	for (let navElement of allNavElements) {
		if (activeElementId === '' || activeElementId === undefined) {
			if (navElement.classList.contains('active')) {
				navElement.classList.remove('active');
			}
		} else if (navElement.dataset.item.includes(activeElementId)) {
			if (navElement.classList.contains('active')) {
			} else {
				navElement.classList.add('active');
			}
		} else {
			if (navElement.classList.contains('active')) {
				navElement.classList.remove('active');
			}
		}
	}
}



// JS сворачивание меню на мобилках при клике
let lastStatusMenu = document.querySelector('.header__menu').classList.contains('active');

setInterval(checkActiveHeaderMenu, 100);

function checkActiveHeaderMenu() {
	const headerMenu = document.querySelector('.header__menu');
	const headerMenuBody = document.querySelector('.header-menu__body');
	let currentStatusMenu = headerMenu.classList.contains('active');

	if(currentStatusMenu) {
		if (!lastStatusMenu) {
			headerMenuBody.addEventListener('click', handler)
		}
		lastStatusMenu = currentStatusMenu;
	} else {
		if (lastStatusMenu) {
			headerMenuBody.removeEventListener('click', handler)
		}
		lastStatusMenu = currentStatusMenu;
	}

	function handler() {
		if (document.body.classList.contains('lock')) document.body.classList.remove('lock');
		headerMenu.classList.remove('active');
		document.querySelector('.header-menu__icon').classList.remove('active');
	}
}

