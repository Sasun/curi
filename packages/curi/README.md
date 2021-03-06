# curi

[![npm][badge]][npm-link]

[badge]: https://img.shields.io/npm/v/curi.svg
[npm-link]: https://npmjs.com/package/curi

`curi` is a simple route configuration package for creating single page apps. Navigation is powered by [`hickory`](https://github.com/pshrmn/hickory).

[documentation](./docs)

## Installation

```
npm install --save curi
```

### Script

If you wish to use `curi` through a `<script>` tag, there is a version available through unpkg.com.

```html
<script src="https://unpkg.com/curi@0.9.0/dist/curi.js"></script>
<!-- there is also a min script: curi.min.js -->
<script type="text/javascript">
  const createConfig = window.Curi;
</script>
```

The version number above may not always be accurate. To ensure that you are using the most up to date version of the `curi` script build, open https://unpkg.com/curi/dist in your browser and copy the link address for the `curi.js` file. That will provide you with the URI of the most recent release.

**Note:** If you are using the above script, you will have to include the `hickory` script yourself.

### Overview

#### Routes

Each route is described using an object. Each route **must** have a unique `name` and `path`.

A route's `name` must be unique because it is used to register the route for different functionality. For example, link pathnames are generated by specifying the name of the route you want to navigate to.

A route's `path` property is a string that will be parsed by [`path-to-regexp`](https://github.com/pillarjs/path-to-regexp) to create a regular expression that can be used for matching locations.

There are a number of other route properties, which are described in more detail in the [route documentation](./docs/API/route.md)

#### Configs

The default export by `curi` is a function that creates a configuration object. The function takes a `history` instance, the routes, and an optional `options` object as its arguments. You can learn more about it in the [`createConfig` documentation](./docs/API/createConfig.md).

```js
import createConfig from 'curi';
import { Browser } from 'hickory';

const history = Browser();
const routes = [...];
const config = createConfig(history, routes)
```

#### Responses

Whenever navigation happens, the curi config object will generate a new response. This response will have a number of properties that are useful for (re-)rendering the application.

* `location` - The location object used to generate the response.
* `status` - The status code for the response. This defaults to `200`, but can be changed if no routes match or a route issues a redirect.
* `name` - The name of the best matching route.
* `partials` - The name of ancestor routes that matched part of the location's pathname.
* `params` - An object containing the values varsed from the pathname by `path-to-regexp`.
* `body` - This is either the `value` or the result of calling `call` for the (best matched) route. This provides a way to add data to the response that is associated with the route. For instance, with `curi-react` this would generally be the component that should be rendered.

There is also a second, similar response object that is created when a response redirets. That object will have only three properties: `location`, `status`, and `redirectTo` (which is the URI string of the location that should be redirect to).
