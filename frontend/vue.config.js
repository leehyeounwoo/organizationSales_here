const TerserPlugin = require('terser-webpack-plugin')
module.exports = {
	// outputDir: path.resolve(__dirname, '../lgchm-admin-msa/src/main/resources/static'),
	runtimeCompiler: true,
	transpileDependencies: ['vuetify'],
	configureWebpack: {
		output: {
			filename: '[name].[hash].bundle.js',
		},
		optimization: {
			concatenateModules: true,
			minimize: true,
			minimizer: [
				new TerserPlugin({
					terserOptions: {
						ecma: undefined,
						warnings: false,
						parse: {},
						compress: { drop_console: true },
						mangle: true, // Note `mangle.properties` is `false` by default.
						module: false,
						output: { comments: false },
						toplevel: false,
						nameCache: null,
						ie8: false,
						keep_classnames: undefined,
						keep_fnames: false,
						safari10: false,
					},
				}),
			],
		},
		devServer: {
			disableHostCheck: true,
		},
		plugins: [],
	},
}
