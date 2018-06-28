import {events, props} from './detect';

interface IWholescreen {
	readonly supported: boolean;
	readonly active: boolean;
	readonly element: Node;
	request(element: Node): void;
	exit(): void;
	toggle(element: Node): void;
	on(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
	off(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
}

const wholescreen: IWholescreen = {
	get active() {
		return Boolean(document[props.element]);
	},
	get element() {
		return document[props.element] || null;
	},
	exit: () => document[props.exit](),
	off: (type, listener, options) => events[type] && document.removeEventListener(events[type], listener, options),
	on: (type, listener, options) => events[type] && document.addEventListener(events[type], listener, options),
	request: element => element[props.request](),
	get supported() {
		return Boolean(document[props.supported]);
	},
	toggle: (element, enable = !wholescreen.element) => (enable ? wholescreen.request : wholescreen.exit)(element),
};

export default wholescreen;
