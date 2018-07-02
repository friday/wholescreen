import {terser} from 'rollup-plugin-terser';

const pkg = require('./package');
const comments = (node, {type, value}) => type === "comment2" && value.startsWith('!'); // keep banner when minifying
const formats = ['amd', 'cjs', 'es', 'umd'];

const buildFile = (name, title = name) => {
	const input = `.js/${name}.js`;
	const banner = `/*! ${title} v${pkg.version} | (c) ${new Date().getFullYear()} ${pkg.author} | Licensed under ${pkg.license} */`;
	return [
		{
			input,
			output: formats.map(format => ({banner, name, format, file: `dist/${name}.${format}.js`})),
		},
		{
			input,
			output: {banner, name, file: `dist/${name}.min.js`, format: 'umd', sourcemap: true},
			plugins: [terser({output: {comments}})],
		}
	];
};

export default [
	...buildFile('wholescreen', pkg.name),
	...buildFile('detect', `${pkg.name} - detect.js`)
];
