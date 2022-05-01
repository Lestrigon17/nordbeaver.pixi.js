const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin').CleanWebpackPlugin;
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	mode: 'development',
	devtool: 'inline-source-map',
	entry: {
		App: './App/App.ts'
	},
	output: {
		path: path.resolve(__dirname, 'build'),
		filename: '[name].bundle-[hash].js',
	},
	resolve: {
		extensions: ['.ts', '.tsx', '.js'],
	},
	devServer: {
		static: {
			directory: path.join(__dirname, 'public'),
		},
		liveReload: true,
		compress: true,
		port: 3000,
		hot: false,
	},
	module: {
		rules: [{
			test: /\.tsx?$/,
			exclude: /(node_modules)/,
			loader: 'ts-loader',
		}],
		
	},
	plugins: [
		new CleanWebpackPlugin(),
		new CopyWebpackPlugin({
			patterns: [{
				from: '**/*',
				context: path.resolve(__dirname, 'App', 'Assets'),
				to: './Assets',
			}, ],
		}),
		new HtmlWebpackPlugin({
			template: 'App/index.html',
			filename: 'index.html',
			minify: {
				collapseWhitespace: true,
				removeComments: true,
				removeRedundantAttributes: true,
				useShortDoctype: true,
			},
		}),
	],
};