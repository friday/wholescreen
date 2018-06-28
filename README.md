[![NPM](https://img.shields.io/npm/v/wholescreen.js.svg)](https://www.npmjs.com/package/wholescreen.js)
![travis](https://img.shields.io/travis/friday/wholescreen.svg)
![size](https://img.shields.io/bundlephobia/minzip/wholescreen.js.svg)
![license](https://img.shields.io/github/license/friday/wholescreen.svg)
![types](https://img.shields.io/npm/types/wholescreen.js.svg)

# wholescreen.js
Tiny wrapper (~40 lines of code) for the [Fullscreen API](https://developer.mozilla.org/en/DOM/Using_full-screen_mode). 

* Handles vendor prefixes for you
* Supports ES6 modules, require.js and AMD
* Comes with TypeScript definitions (since it's written in TypeScript)
* Has a simple [API](#api) that resembles the standard API
* Probably the smallest existing Fullscreen API wrapper that supports all vendor prefixes (but they're all pretty small)

## Installation

```bash
npm install --save wholescreen.js
```

Or

```bash
yarn add wholescreen.js
```

## Usage example
```js
import wholescreen from 'wholescreen.js';

const element = document.querySelector('.some-element');

// Check for support
if (wholescreen.supported) {
	// listen to changes
	wholescreen.on('change', () => {
		// Log change based on `wholescreen.active`
		console.log(`Fullscreen ${wholescreen.active ? 'enabled' : 'disabled'}`)
	});

	// Activate fullscreen mode on button click
	// You should only request fullscreen from events like this, or browsers will deny the request.
	document.querySelector('.button').addEventListener('click', () => {
		// If you pass an element as the second argument the element will fullscreen instead of the window
		wholescreen.request();
	});
}
```

## API

The API is generally using the same names as the standard API. For example `requestFullscreen` -> `wholescreen.request()` and `exitFullscreen` -> `wholescreen.exit()`. However `fullscreenEnabled` has  been renamed to `supported` since the standard name is misleading.

### Getters

| Property    | type      | Description 	|
|-------------|-----------|---------------|
| `supported` | `boolean` | Check [device / browser support](https://caniuse.com/#feat=fullscreen) and if the window has permission to use fullscreen (requires special parameter for iframes) |
| `active`    | `boolean` | Check if an element is currently fullscreened 	|
| `element`   | `Node`    | The dom node (element) currently fullscreened (or `null` if none) 	|

### Methods

| Method      | arguments                     | Description 	|
|-------------|-------------------------------|---------------|
| `request()` | `element`                     | Activate fullscreen for the element, or the window if the `element` argument is missing  	|
| `toggle()`  | `element`, `enable`           | Toggle fullscreen for the element. Will toggle based on the optional `enable` argument if present, otherwise it will reverse `active`. If another element is fullscreened, it will restore it first |
| `exit()`    | -                             | Exit fullscreen |
| `on()`      | `type`, `listener`, `options` | Listen for wholescreen events. Works exactly like [addEventListener](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener), except it (only) supports custom wholescreen event types `change` and `error` |
| `off()`     | `type`, `listener`, `options` | Remove wholescreen event listener. Works exactly like [removeEventListener](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/removeEventListener), except it (only) supports custom wholescreen event types `change` and `error` |

## Support

[Browsers support](https://caniuse.com/#feat=fullscreen)

## Alternatives
* [screenfull.js](https://github.com/sindresorhus/screenfull.js) - The first and most well used Fullscreen API wrapper. Supports commonjs. The wholescreen.js API is very similar to screenfull.js (not by intention).
* [fscreen](https://github.com/rafrex/fscreen) - Small, written as a es6-module. Doesn't support some older prefixes (but you most likely can do without them). The API is a lot more verbose than screenfull.js and wholescreen.js
