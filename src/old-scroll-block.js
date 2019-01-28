import * as Utils from './utilities.js';
import * as ViewPort from './viewport-lock.js'

let _globallyBlocked = false;
let _globallyIgnored = [];

function isInIgnoredElement(targetEl) {
	return _globallyIgnored.some(el => el.contains(targetEl));
}

function preventDefault(e) {
	if (!isInIgnoredElement(e.target)) {
		e.preventDefault();
	}
}

let currentTarget = null;
let cachedVerticalPosition = 0;
let cachedHorizontalPosition = 0;

function mouseDown(e) {
	if (isInIgnoredElement(e.target)) {
		return false;
	}
	currentTarget = e.target;
	cachedVerticalPosition = currentTarget.scrollTop;
	cachedHorizontalPosition = currentTarget.scrollLeft;

	currentTarget.addEventListener('mouseup', mouseUp);
	currentTarget.addEventListener('scroll', scrollBarDrag)
}

function mouseUp() {
	scrollBarDrag();
	currentTarget.removeEventListener('mouseup', mouseUp);
	currentTarget.removeEventListener('scroll', scrollBarDrag);
}

function scrollBarDrag() {
	currentTarget.scrollTop = cachedVerticalPosition;
	currentTarget.scrollLeft = cachedHorizontalPosition;
}

function turnBlockingOn() {
	ViewPort.lock();

	Utils.addEvent(window, 'wheel', preventDefault);
	Utils.addEvent(window, 'mousedown', mouseDown);
	_globallyBlocked = true;
}

function turnBlockingOff() {
	ViewPort.unlock();

	Utils.removeEvent(window, 'wheel', preventDefault);
	Utils.removeEvent(window, 'mousedown', mouseDown);
	_globallyBlocked = false;
}

class ScrollBlock {
	constructor() {
		// this.blocked = false;
		// this.ignoredElements = [];
	}

	static get isBlocked() {
		return _globallyBlocked;
	}

	static get ignoredElements() {
		return _globallyIgnored;
	}

	static on() {
		if (!_globallyBlocked) {
			turnBlockingOn();
		}
	}

	static off() {
		if (_globallyBlocked) {
			turnBlockingOff();
		}
	}

	static toggle(shouldTurnOn = !_globallyBlocked) {
		if (shouldTurnOn) {
			this.on();
		}
		else {
			this.off();
		}
	}

	static ignore(selectorOrElement) {
		if (selectorOrElement && selectorOrElement.tagName) {
			_globallyIgnored.push(selectorOrElement);
		}
		else {
			_globallyIgnored = _globallyIgnored.concat(
				Array
					.from(document.querySelectorAll(selectorOrElement))
					.filter(el => !_globallyIgnored.includes(el))
			);
		}
	}

	static removeIgnored(selectorOrElement) {
		if (selectorOrElement && selectorOrElement.tagName) {
			_globallyIgnored = _globallyIgnored.filter(el => el !== selectorOrElement);
		}
		else {
			let elements = Array.from(document.querySelectorAll(selectorOrElement));
			_globallyIgnored = _globallyIgnored.filter(el => !elements.includes(el));
		}
	}
}

export default ScrollBlock;
