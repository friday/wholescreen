import {terser} from 'rollup-plugin-terser';
import typescript from 'rollup-plugin-typescript2';

const pkg = require('./package');
const comments = (node, {type, value}) => type === "comment2" && value.startsWith('!'); // keep banner when minifying
const formats = ['amd', 'cjs', 'es', 'umd'];

const buildFile = (name, title = name) => {
	const input = `src/${name}.ts`;
	const banner = `/*! ${title} v${pkg.version} | (c) 2018-${new Date().getFullYear()} ${pkg.author} | Licensed under ${pkg.license} */`;
	return [
		{
			input,
			output: formats.map(format => ({banner, name, format, file: `dist/${name}.${format}.js`})),
			plugins: [typescript()],
		},
		{
			input,
			output: {banner, name, file: `dist/${name}.min.js`, format: 'umd', sourcemap: true},
			plugins: [typescript(), terser({output: {comments}})],
		}
	];
};

export default [
	...buildFile('wholescreen', pkg.name),
	...buildFile('detect', `${pkg.name} - detect.js`)
];
