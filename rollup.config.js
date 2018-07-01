import {terser} from 'rollup-plugin-terser';

const pkg = require('./package');
const {name} = pkg;
const amd = {id: name};
const input = '.js/wholescreen.js';
const banner = `/*! ${name} v${pkg.version} | (c) ${new Date().getFullYear()} ${pkg.author} | Licensed under ${pkg.license} */`;
const comments = (node, {type, value}) => type === "comment2" && value.startsWith('!'); // keep banner when minifying

const output = ['amd', 'cjs', 'es', 'umd']
	.map(format => ({amd, banner, format, name, file: `dist/wholescreen${format === 'umd' ? '' : `.${format}`}.js`}));

export default [
	{ input, output },
	{
		input,
		output: {banner, name, file: 'dist/wholescreen.min.js', format: 'umd', sourcemap: true},
		plugins: [terser({output: {comments}})],
	},
];