module.exports = {
	// outputDir: path.resolve(__dirname, '../lgchm-admin-msa/src/main/resources/static'),
	runtimeCompiler: true,
	transpileDependencies: ['vuetify'],
	configureWebpack: {
		output: {
			filename: '[name].[hash].bundle.js',
		},
		devServer: {
			disableHostCheck: true,
		},
		plugins: [],
	},
}
