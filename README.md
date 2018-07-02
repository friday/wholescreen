[![](https://img.shields.io/npm/v/wholescreen.js.svg)](https://www.npmjs.com/package/wholescreen.js)
[![](https://img.shields.io/travis/friday/wholescreen.svg)](https://travis-ci.org/friday/wholescreen/branches)
[![](https://img.shields.io/bundlephobia/minzip/wholescreen.js.svg)](https://unpkg.com/wholescreen.js/dist/wholescreen.es.js)
[![](https://img.shields.io/github/license/friday/wholescreen.svg)](https://github.com/friday/wholescreen/blob/master/LICENCE)
[![](https://img.shields.io/npm/types/wholescreen.js.svg)](https://www.typescriptlang.org/)

# wholescreen.js
Tiny wrapper (~40 lines of code) for the [Fullscreen API](https://developer.mozilla.org/en/DOM/Using_full-screen_mode). 

* Handles all vendor prefixes for you
* Has a simple [API](#api) that resembles the standard API
* Supports [UMD](https://github.com/umdjs/umd), standalone ES6 modules, require.js and AMD as separate files so you can import it anwhere.
* Comes with TypeScript definitions (since it's written in TypeScript)
* Detects each of the browser properties individually, meaning wider support, and safer for browser changes. All while using less code.
* Probably the smallest Fullscreen API wrapper (but they're all pretty small)

## Installation

```bash
npm install --save wholescreen.js
```

Or

```bash
yarn add wholescreen.js
```

Or you can use the CDN link
```html
<script src="https://unpkg.com/wholescreen.js/dist/wholescreen.min.js"></script>
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

The API was designed to generally use the same names as the standard API (without the word `fullscreen` in everything since it's implied). There is one exception: `fullscreenEnabled` was renamed to `supported`, to avoid the misleading standard name. It also has a couple of useful additions over the standard API.

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

### Browser API

If you need to get the original method and property names for the current browser, these are available as `wholescreen.events` and `wholescreen.props`

## Support

[Browsers support](https://caniuse.com/#feat=fullscreen)

## Alternatives
* [screenfull.js](https://github.com/sindresorhus/screenfull.js) - The first and most well used Fullscreen API wrapper. Uses commonjs module declaration. The wholescreen.js API is very similar to screenfull.js (not by intention). screenfull also support the legacy syntax with an additional optional argument for allowing keyboard input.
* [fscreen](https://github.com/rafrex/fscreen) - Small alternative. Handles all the common prefixes, but not the older Safari ones (you can most likely do without them). Uses es6-module declaration. The API is more verbose than screenfull.js and wholescreen.js
