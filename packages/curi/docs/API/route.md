# route

A route describes a location's `pathname` using the `path` argument. Internally, `curi` will create a `uri` object for every route. 

```js
const home = {
  name: 'Home',
  path: path('')
};
```

### Properties

#### `name`

A unique identifier. This should be a string or a symbol.

#### `path`

An instance of `curi/path`. This describes the pathname segments that the `uri` should match. More information about this argument can be seen in the [`path` documentation](./path.md).

#### `value`

When the route is the best match for the current location, this value will be assigned to the response's `render` property. The `value` property` is preferred over the `call` property.

```js
const contact = {
  name: 'Contact',
  path: path('contact'),
  value: Contact
};
```

#### `call`

This is a function that will be called when the route is the best match for the current location. The value returned by the function will be assigned to the response's `render` property.

This is useful when the value is not available when creating a config. This would most likely happen when you are using asynchronous module loading (probably in tandem with the `preload` route property).

```js
const about = {
  name: 'About',
  path: path('about'),
  call: function() {
    return AsyncStore.get('About');
  }
};
```

#### `children`

An optional array of route objects. Any child routes will be matched relative to their parent route's `path`. This means that if a parent route's path string is `'one'` and a child route's path string is `'two'`, the child will match when the pathname is `one/two`.

**Important Note:** If a route uses the `children` property, you should either create the `path` using the `parentPath` function or use the `{ end: false }` option.

#### `preload`

`preload` will only be called the first time that a `uri` matches. This should only be used for loading resources that are required for the `uri` to display properly. For example, if you are doing code-splitting with Webpack using `require.ensure` or `import()`, you would load them in `preload`.

`preload` must return a `Promise`.

#### `load`

`load` should be used for actual data fetching as well as for triggering redirects. The `load` function will be passed the `Response` object that has been generated for the current location.

Like `preload`, `load` must return a `Promise`.