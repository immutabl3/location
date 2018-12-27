# location

`location` is a small (`2.55KB` minified, `1.14KB` gzipped), functional wrapper around 
[`url-pattern`](https://www.npmjs.com/package/url-pattern) and [`query-string`](https://www.npmjs.com/package/query-string) 
to make working with urls in SPAs easier and more DRY

## Installation

`$ npm i @immutabl3/location`

## Usage

`location` takes a url, using express-style tokenization and returns 
a function that can be used to format the url:

```js
import location from '@immutabl3/location';

const userLocation = location('/users/:name');

console.log(userLocation.get());
// > '/users/:name'

const url = userLocation({ name: 'me' });
console.log(url);
// > '/users/me'
```

Query strings can be added to the url as well:

```js
const queryiedUserLocation = userLocation.query({ hello: 'world' });
const url = queryiedUserLocation({ name: 'me' });
console.log(url);
// > '/users/me?hello=world'
```

The location also exposes a `match` method for testing the url. This is a direct proxy to 
[`url-pattern`'s match](https://www.npmjs.com/package/url-pattern):

```js
userLocation.match('/users/you'); // { name: 'you' }
```

A `locations` helper function is also available to create multiple named locations. Each 
value will be converted to a `location` instance:

```js
import { locations } from '@immutabl3/location';

const locationsMap = locations({
	home: '/home',
	admin: '/admin/:scope',
	exit: '/logout',
});
```

## Tests

Clone the repo, then:

1. `npm install`
1. `npm test`

## License

The MIT License (MIT)

Copyright (c) 2018 Immutable, LLC

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.  IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.