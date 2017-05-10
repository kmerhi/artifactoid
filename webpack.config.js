const path = require('path');

module.exports = {
	target: 'node', // in order to ignore built-in modules like path, fs, etc. 
	entry: ['babel-polyfill', './src/cli.js'],
	output: {
		filename: 'artifactoid.js',
		path: path.resolve(__dirname, './bin')
	},
	module: {
		rules: [{
			test: /\.js$/,
			exclude: /(node_modules)/,
			use: {
				loader: 'babel-loader',
				options: {
					presets: ['env']
				}
			}
		}]
	},
	resolve: {
		extensions: ['.jsx', '.json', '.js']
	},
};