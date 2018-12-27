const path = require('path');
const webpack = require('webpack');
const pkg = require('./package.json');
const { format } = require('date-fns');
const CompressionPlugin = require('compression-webpack-plugin');

module.exports = {
	entry: './index.js',
	mode: 'production',
	devtool: 'source-map',
	output: {
		library: 'location',
		libraryTarget: 'umd',
		path: path.resolve(process.cwd(), 'dist'),
		filename: 'location.min.js',
	},
	externals: [
		'query-string',
		'url-pattern',
	],
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				loader: 'babel-loader'
			}
		]
	},
	plugins: [
		new webpack.EnvironmentPlugin({
			NODE_ENV: 'production',
		}),
		new webpack.BannerPlugin({
			entryOnly: true,
			banner() {
				const { homepage, author, version, license } = pkg;
				const date = format(new Date(), 'YYYY-MM-DD');
				const year = new Date().getFullYear();
				return (`
@immutabl3/location - v${version} - ${date}
${homepage}
Copyright (c) ${year} ${author.name} License: ${license}
				`);
			},
		}),
		new CompressionPlugin({
			filename({ path, query }) {
				return `${path}.gz${query}`;
			},
		})
	]
};