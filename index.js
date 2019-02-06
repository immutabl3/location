import UrlPattern from 'url-pattern';
import queryString from 'query-string';

// handles cases where the url has an optional token e.g. /foo/:bar?/:baz
// url-pattern requires: /foo(/:bar)/:baz
const rOptionalToken = /(\/:[^?/]+\?)/g;
const normalizeUrl = function(url) {
	return url.replace(rOptionalToken, match => (
		`(${match.substr(0, match.length - 1)})`
	));
};

export default function Location(url) {
	const pattern = new UrlPattern(normalizeUrl(url));
	
	let qs = '';

	const location = function(config = {}) {
		const base = pattern.stringify(config);
		return `${base}${qs ? '?' : ''}${qs}`;
	};

	const api = Object.assign(location, {
		get() {
			return url;
		},

		match(path) {
			return pattern.match(path);
		},
		
		query(config) {
			qs = queryString.stringify(config);
			return api;
		},
	});

	return api;
};

export const locations = function(config) {
	if (!config) throw new Error('locations: missing config');

	if (Array.isArray(config)) return config.map(Location);
	
	return Object.entries(config).reduce((memo, [key, value]) => {
		memo[key] = Location(value);
		return memo;
	}, {});
};