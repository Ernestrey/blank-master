const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	context: path.resolve(__dirname, 'src'),
	entry: './app.js',
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: '[name].[contenthash].js',
		clean: true,
	},
	mode: 'development',
	watch: true,
	devServer: {
		static: './',
		hot: true,
		port: 3000
	},
	target: 'web',
	"plugins": [
		new HtmlWebpackPlugin({
			title: 'Тест',
			template: path.resolve(__dirname, './src/index.html'),
			filename: 'index.html',
		})
	],
	module: {
		rules: [
			/** Babel **/
            {
                test: /\.m?js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
                // npm install babel-loader @babel/core @babel/preset-env -D
            },
            /** CSS */
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader'],
                // npm i style-loader css-loader -D
            },
            /** SCSS/SAAS */
            {
                test: /\.s[ac]ss$/i,
                use: [
                    // Creates `style` nodes from JS strings
                    "style-loader",
                    // Translates CSS into CommonJS
                    "css-loader",
                    // Compiles Sass to CSS
                    "sass-loader",
                ],
                // npm i style-loader css-loader sass sass-loader -D
            },
            /** Картинки */
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: 'asset/resource',
            },
            /** Шрифты */
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/i,
                type: 'asset/resource',
            },
            /** Файлы CSV */
            {
                test: /\.(csv|tsv)$/i,
                use: ['csv-loader'],
                // npm i csv-loader -D
            },
            /** Файлы XML */
            {
                test: /\.xml$/i,
                use: ['xml-loader'],
                // npm i xml-loader -D 
            },

			// {
			// 	exclude: [/node_modules\/(?!(swiper|dom7)\/).*/, /\.test\.js(x)?$/],
			// 	test: /\.js$/,
			// 	use: [{ loader: 'babel-loader' }],
			// },
			// {
			// 	test: /\.(sass|scss)$/,
			// 	include: path.resolve(__dirname, 'src/scss'),
			// 	use: [
			// 		{
			// 			loader: MiniCssExtractPlugin.loader,
			// 			options: {},
			// 		},
			// 		{
			// 			loader: 'css-loader',
			// 			options: {
			// 				sourceMap: true,
			// 				url: false,
			// 			},
			// 		},
			// 		{
			// 			loader: 'postcss-loader',
			// 			options: {
			// 				ident: 'postcss',
			// 				sourceMap: true,
			// 				plugins: () => [
			// 					require('cssnano')({
			// 						preset: [
			// 							'default',
			// 							{
			// 								discardComments: {
			// 									removeAll: true,
			// 								},
			// 							},
			// 						],
			// 					}),
			// 					autoprefixer({
			// 						overrideBrowserslist: ['last 4 versions'],
			// 						cascade: false,
			// 					}),
			// 				],
			// 			},
			// 		},
			// 		{
			// 			loader: 'sass-loader',
			// 			options: {
			// 				sourceMap: true,
			// 				sassOptions: {
			// 					importer: globImporter,
			// 				},
			// 			},
			// 		},
			// 	],
			// },

			// {
			// 	test: /\.svg$/,
			// 	use: {
			// 		loader: 'resolve-url-loader',
			// 		loader: 'svg-url-loader',
			// 	},
			// },
			// {
			// 	test: /\.(jpe?g|png|gif)$/,
			// 	loader: 'url-loader',
			// },
			// {
			// 	test: /\.(scss|sass)$/,
			// 	include: path.resolve(__dirname, 'src/scss'),
			// 	use: [
			// 		MiniCssExtractPlugin.loader,
			// 		'css-loader',
			// 		{
			// 			loader: 'sass-loader',
			// 			options: {
			// 				sourceMap: true,

			// 				sassOptions: {
			// 					importer: globImporter(),
			// 				},
			// 			},
			// 		},
			// 	],
			// },
			// {
			// 	test: /\.pug$/,
			// 	loader: 'pug-loader',
			// },
			// {
			// 	test: /\.(woff|woff2|eot|ttf|svg)(\?.*$|$)/,
			// 	use: [
			// 		{
			// 			loader: 'file-loader',
			// 			options: {
			// 				name: 'fonts/[name].[ext]',
			// 				publicPath: '../',
			// 			},
			// 		},
			// 	],
			// 	include: [path.resolve(__dirname, 'node_modules'), path.resolve(__dirname, 'src/fonts')],
			// },
		],
	},
}