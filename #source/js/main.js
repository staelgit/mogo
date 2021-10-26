
//@prepros-append forms.js
//@prepros-append script.js


// слайдер

$(document).ready(function(){
	$('.slider').slick({
		infinite: true,
		arrows:true,
		dots:false,
		slidesToShow: 1,
		slidesToScroll: 1,
		adaptiveHeight: true
	});
});

// найсскролл
$(".accordion-wedo__text").niceScroll({
    
});

// переход по клику кнопки до его блока
goToElementByButtonClick();
function goToElementByButtonClick(){
	const aboutButton = document.querySelectorAll('.header-menu__link')[0];
	const serviceButton = document.querySelectorAll('.header-menu__link')[1];
	const workButton = document.querySelectorAll('.header-menu__link')[2];
	const blogButton = document.querySelectorAll('.header-menu__link')[3];
	const contactButton = document.querySelectorAll('.header-menu__link')[4];
	const aboutElement = document.querySelector(`.intro`);
	const serviceElement = document.querySelector(`.services`);
	const workElement = document.querySelector(`.works`);
	const blogElement = document.querySelector(`.blog`);
	const contactElement = document.querySelector(`.footer`);

	addListenerToButton(aboutButton, aboutElement);
	addListenerToButton(serviceButton, serviceElement);
	addListenerToButton(workButton, workElement);
	addListenerToButton(blogButton, blogElement);
	addListenerToButton(contactButton, contactElement);

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
	};
};




// плавающее меню
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
};

//кнопки активные в зависимости от раздела

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
	for (let elem of allElements) {
		let elemTop = elem.getBoundingClientRect().top;
		let elemHeight = elem.getBoundingClientRect().height;
		let visibleElemPart;
		var activeElementId;
		if (elemTop < currentClientHeight & (elemTop + elemHeight) > 0) {
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
	const allNavElements = document.querySelectorAll('.header-menu__link');
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


//сворачивание меню на мобилках при клике

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
