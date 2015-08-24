# babel-plugin-defines

Like defines for UglifyJS, this plugin will replace defined variables by their values

## Usage

### cli

```sh
npm install babel babel-plugin-defines
babel --plugins babel-plugin-defines script.js
```

### .babelrc / gulp options

```js
plugins: ['defines'],
extra: {
    defines: {
        SERVER: true,
        BROWSER: false,
    }
}
```

## Code example

```js
if (global.BROWSER) {
    console.log('browser');
}

if (global.SERVER) {
    console.log('server');
}
```
