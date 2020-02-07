const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');

module.exports = {
	mode: 'production',
	entry: './src/index.js',
	output: {
		path: path.resolve(__dirname, './dist'),
		filename: 'index_bundle.js'
	},
	plugins: [
		new CleanWebpackPlugin(),
		new HtmlWebpackPlugin({
			template: 'src/index.html'
		}),
		new HtmlWebpackPlugin({
			template: 'src/blog/index.html',
			filename: "blog/index.html"
		}),
		new CopyPlugin([
			{from: 'src/img/', to: 'img/'}
		])
	],
	module: {
		rules: [
			{
				test: /\.css$/i,
				use: ['style-loader', 'css-loader?modules']
			}
		]
	},
	optimization: {
		runtimeChunk: "single",
		splitChunks: {
			cacheGroups: {
				vendors: {
					test: /node_modules/,
					name: 'vendors',
					chunks: "all"
				}
			}
		}
	}
};
