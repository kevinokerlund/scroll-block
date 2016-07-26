var webpack = require('webpack');
var UglifyJsPlugin = webpack.optimize.UglifyJsPlugin;
var path = require('path');
var env = require('yargs').argv.mode;
var libraryName = 'ScrollBlock';

var plugins = [], outputFile;

if (env === 'build') {
	plugins.push(new UglifyJsPlugin({minimize: true}));
	outputFile = 'scroll-block.min.js';
} else {
	outputFile = 'scroll-block.js';
}


module.exports = {
	entry: __dirname + "/src/scroll-block.js",
	devtool: 'source-map',
	output: {
		path: __dirname + '/lib',
		filename: outputFile,
		library: libraryName,
		libraryTarget: 'umd',
		umdNamedDefine: true
	},
	module: {
		loaders: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				loader: "babel-loader"
			},
			{
				test: /\.html$/,
				exclude: /node_modules/,
				loader: "html-loader"
			},
			{
				test: /\.css$/,
				exclude: /node_modules/,
				loader: "style-loader!css-loader"
			}
		]
	},
	resolve: {
		root: path.resolve('./src'),
		extensions: ['', '.js']
	},
	plugins: plugins
};
