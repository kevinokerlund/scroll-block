export default function getScrollBarData() {
	let active = false;
	let size = 0;

	let outerDiv = document.createElement('div');
	outerDiv.style.height = '200px';
	outerDiv.style.width = '200px';
	outerDiv.style.position = 'fixed';
	outerDiv.style.top = '-100%';
	outerDiv.style.left = '-100%';
	outerDiv.style.overflow = 'scroll';

	// outerDiv.style.top = '0px';
	// outerDiv.style.left = '0px';
	// outerDiv.backgroundColor = 'lightyellow';

	let appendElement = (function () {
		var body = document.querySelector('body');
		return (body) ? body : document.querySelector('html');
	})();

	appendElement.appendChild(outerDiv);

	if (outerDiv.clientWidth < outerDiv.offsetWidth) {
		active = true;
		size = outerDiv.offsetWidth - outerDiv.clientWidth;
	}

	appendElement.removeChild(outerDiv);

	return {
		active,
		size
	}
}

export function elementHasScrollBars(element) {
	let overflowY = window.getComputedStyle(element)['overflow-y'];
	let overflowX = window.getComputedStyle(element)['overflow-x'];
	return {
		horizontal: (overflowX === 'scroll' || overflowX === 'auto') && element.scrollWidth > element.clientWidth,
		vertical: (overflowY === 'scroll' || overflowY === 'auto') && element.scrollHeight > element.clientHeight,
	};
}
