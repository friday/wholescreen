const prefix = ['', 'webkit', 'moz', 'ms', 'MS'];
const fullscreen = ['fullscreen', 'Fullscreen', 'FullScreen'];

function combine(parts: string[][]): string[] {
	return parts.reduce(
		(a, b) =>
			[].concat.apply(
				[],
				a.map(str1 => b.map(str2 => `${str1}${str2}`)),
			),
		[''],
	);
}

function getProp(props: string[][], path?: string): string {
	if (typeof document !== 'object') {
		return '';
	}
	const container = path ? document[path] : document;
	return combine(props).find(prop => Boolean(container && prop && prop in container)) || '';
}

const props = {
	element: getProp([prefix, fullscreen, ['Element']]),
	exit: getProp([prefix, ['Exit', 'exit', 'Cancel', 'cancel'], fullscreen]),
	request: getProp([prefix, ['request', 'Request'], fullscreen], 'body'),
	supported: getProp([prefix, fullscreen, ['Enabled']]),
};

const events = {
	change: getProp([['on'], prefix, fullscreen, ['change', 'Change']]).slice(2),
	error: getProp([['on'], prefix, fullscreen, ['error', 'Error']]).slice(2),
};

export {events, props};
