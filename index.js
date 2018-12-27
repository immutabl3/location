import UrlPattern from 'url-pattern';
import queryString from 'query-string';

export default function Location(url) {
	const pattern = new UrlPattern(url);
	
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