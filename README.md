# babel-plugin-defines

Like defines for UglifyJS, this plugin will replace defined variables by their values

## Usage

### cli

```sh
npm install babel-cli babel-plugin-defines
babel --plugins babel-plugin-defines script.js
```

### .babelrc / gulp options

```js
plugins: [
	['defines', { "GLOBAL_TEST": 'test', "GLOBAL_1": 1, 'GLOBAL_FALSE': false }]
]
```

## Real life example

```js
plugins: [
	['defines', { "BROWSER": true, "SERVER": false }]
]
```

```js
if (global.BROWSER) {
    console.log('browser');
}

if (global.SERVER) {
    console.log('server');
}
```
