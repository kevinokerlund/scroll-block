import * as Bars from './scrollbar-detector.js';

const html = document.querySelector('html');

const styleNamesWeUse = [
	'overflow',
	'position',
	'width',
	'top',
	'left'
];

const htmlLockStyles = {
	overflowY: 'auto',
	overflowX: 'auto',
	position: 'fixed',
	width: '100%',
	top: undefined,
	left: undefined
};

let windowScrollPosition = {
	top: null,
	left: null
};

let savedHtmlInlineStyles = {};


function saveScrollPosition() {
	windowScrollPosition.top = window.pageYOffset;
	windowScrollPosition.left = window.pageXOffset;
}


function saveHtmlTagStyles() {
	let styles = {};
	styleNamesWeUse.forEach(styleName => {
		let value = html.style[styleName];
		if (value) {
			styles[styleName] = value
		}
	});
	savedHtmlInlineStyles = styles;
}

function scrollBackToSavedPosition() {
	window.scrollTo(
		windowScrollPosition.left,
		windowScrollPosition.top
	);
}

export function lock() {
	saveScrollPosition();
	saveHtmlTagStyles();

	let htmlScrollBars = Bars.elementHasScrollBars(html);

	let lockStyles = {
		...htmlLockStyles,
		top: -windowScrollPosition.top + 'px',
		left: -windowScrollPosition.left + 'px',
		overflowY: (htmlScrollBars.vertical) ? 'scroll' : 'auto',
		overflowX: (htmlScrollBars.horizontal) ? 'scroll' : 'auto',
	};

	Object.keys(lockStyles).forEach((styleName) => {
		html.style[styleName] = lockStyles[styleName];
	});
}

export function unlock() {
	styleNamesWeUse.forEach(function (styleName) {
		html.style[styleName] = savedHtmlInlineStyles[styleName] || '';
	});

	scrollBackToSavedPosition();
}

export default {
	lock,
	unlock
}
