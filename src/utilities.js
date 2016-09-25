import './polyfills/array-includes.js';

export function addEvent(element, eventName, callback) {
	element.addEventListener(eventName, callback);
}

export function removeEvent(element, eventName, callback) {
	element.removeEventListener(eventName, callback);
}

export function addClass(element, ...classes) {
	let currentClassNames = element.className.trim().split(/\s+/);
	element.className = currentClassNames
		.concat(
			classes.filter(className => !currentClassNames.includes(className.trim()))
		)
		.join(' ')
		.trim();
}

export function removeClass(element, ...classes) {
	element.className = element.className
		.trim()
		.split(/\s+/)
		.filter(className => !classes.includes(className.trim()))
		.join(' ')
		.trim();
}
