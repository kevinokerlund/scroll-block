import './polyfills/array-includes.js';

export function addEvent(element, eventName, callback) {
	element.addEventListener(eventName, callback);
}

export function removeEvent(element, eventName, callback) {
	element.removeEventListener(eventName, callback);
}

export function addClass(element, ...classes) {
	var currentClasses = element.className.trim().split(/\s+/);
	element.className = currentClasses
		.concat(
			classes.filter(cls => !currentClasses.includes(cls.trim()))
		)
		.join(' ')
		.trim();
}

export function removeClass(element, ...classes) {
	element.className = element.className.trim().split(/\s+/)
		.filter(cls => !classes.includes(cls.trim()))
		.join(' ')
		.trim();
}
