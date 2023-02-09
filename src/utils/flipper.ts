export default class Flipper {
	isFlipping = false;
	flipNode: Element;
	frontNode: HTMLElement | null;
	backNode: HTMLElement | null;
	duration = 600;

	constructor(node: Element, currentTime: string, nextTime: string) {
			this.flipNode = node;
			this.frontNode = node.querySelector('.front');
			this.backNode = node.querySelector('.back');
			this.setFrontTime(currentTime);
			this.setBackTime(nextTime);
	}

	setFrontTime(time: string) {
			this.frontNode!.dataset.number = time;
	}

	setBackTime(time: string) {
			this.backNode!.dataset.number = time;
	}

	flipDown(currentTime: string, nextTime: string) {
			if (this.isFlipping) {
					return false;
			}
			this.isFlipping = true;
			this.setFrontTime(currentTime);
			this.setBackTime(nextTime);
			this.flipNode.classList.add('running');
			setTimeout(() => {
					this.flipNode.classList.remove('running');
					this.isFlipping = false;
					this.setFrontTime(nextTime);
			}, this.duration);
	}
}