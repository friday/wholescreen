const prefix = ['', 'webkit', 'moz', 'ms', 'MS'];
const fullscreen = ['fullscreen', 'Fullscreen', 'FullScreen'];

function combine(parts: string[][]): string[] {
	return parts.reduce((a, b) => [].concat.apply([], a.map(str1 => b.map(str2 => `${str1}${str2}`))), ['']);
}

function getProp(container: Node, props: string[][]): string {
	return combine(props).find(prop => Boolean(container && prop && prop in container)) || '';
}

const props = {
	element: getProp(document, [prefix, fullscreen, ['Element']]),
	exit: getProp(document, [prefix, ['Exit', 'exit', 'Cancel', 'cancel'], fullscreen]),
	request: getProp(document.body, [prefix, ['request', 'Request'], fullscreen]),
	supported: getProp(document, [prefix, fullscreen, ['Enabled']]),
};

const events = {
	change: getProp(document, [['on'], prefix, fullscreen, ['change', 'Change']]).slice(2),
	error: getProp(document, [['on'], prefix, fullscreen, ['error', 'Error']]).slice(2),
};

export {events, props};
