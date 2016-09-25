var webpack = require('webpack');

module.exports = {
	entry: __dirname + "/src/scroll-block.js",
	devtool: 'source-map',
	output: {
		path: './lib',
		filename: 'scroll-block.js',
		library: 'ScrollBlock',
		libraryTarget: 'umd',
		umdNamedDefine: true
	},
	module: {
		loaders: [
			{
				loader: "babel",
				test: /\.js$/,
				exclude: /node_modules/,
				query: {
					presets: ['es2015'],
					plugins: [
						'babel-plugin-add-module-exports',
						'transform-object-rest-spread'
					]
				}
			},
			{
				loader: "html-loader",
				test: /\.html$/,
				exclude: /node_modules/
			},
			{
				loader: "style-loader!css-loader",
				test: /\.css$/,
				exclude: /node_modules/
			}
		]
	},
	plugins: [
		new webpack.optimize.UglifyJsPlugin({
			compress: {
				warnings: false,
			},
			output: {
				comments: false,
			},
		}),
	]
};
