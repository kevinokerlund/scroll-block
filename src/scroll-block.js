import ViewPort from './viewport-lock';

window.Viewport = ViewPort;

class ScrollBlock {
	constructor() {
		this.isOn = false;
		this.ignoredElements = [];
	}

	on() {
		if (!this.isOn) {
			console.log('Turning ScrollBlock on');
			ViewPort.lock();
			this.isOn = true;
		}
		return this;
	}

	off() {
		if (this.isOn) {
			console.log('Turning ScrollBlock off');
			ViewPort.unlock();
			this.isOn = false;
		}
		return this;
	}

	toggle(shouldTurnOn = !this.isOn) {
		(shouldTurnOn) ? this.on() : this.off();
		return this;
	}

	ignore() {
		return this;
	}

	removeIgnored() {
		return this;
	}
}

export default ScrollBlock;
