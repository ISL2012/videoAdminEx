/**
 * @description cli配置
 */

const path = require('path')
const {
	publicPath,
	assetsDir,
	outputDir,
	lintOnSave,
	transpileDependencies,
	title,
	abbreviation,
	devPort,
	providePlugin,
	build7z,
	donation,
} = require('./src/config/settings')

const { version, author } = require('./package.json')
const Webpack = require('webpack')
const WebpackBar = require('webpackbar')
const FileManagerPlugin = require('filemanager-webpack-plugin')
const dayjs = require('dayjs')
const date = dayjs().format('YYYY_M_D')
const time = dayjs().format('YYYY-M-D HH:mm:ss')
const productionGzipExtensions = ['html', 'js', 'css', 'svg']
const CompressionPlugin = require('compression-webpack-plugin')

process.env.VUE_APP_TITLE = title || 'admin'
process.env.VUE_APP_AUTHOR = author || 'chuzhixin 1204505056@qq.com'
process.env.VUE_APP_UPDATE_TIME = time
process.env.VUE_APP_VERSION = version

const resolve = dir => path.join(__dirname, dir)
const mockServer = () => {
	if (process.env.NODE_ENV === 'development') return require('./mock/mockServer.js')
	else return ''
}

module.exports = {
	publicPath,
	assetsDir,
	outputDir,
	lintOnSave,
	transpileDependencies,
	devServer: {
		hot: true,
		port: devPort,
		open: true,
		noInfo: false,
		overlay: {
			warnings: true,
			errors: true,
		},
		after: mockServer(),
	},
	configureWebpack() {
		return {
			resolve: {
				alias: {
					'@': resolve('src'),
				},
			},
			plugins: [
				new Webpack.ProvidePlugin(providePlugin),
				new WebpackBar({
					name: title,
				}),
				new CompressionPlugin({
					test: /\.js$|\.html$|\.css/, // 匹配文件名
					threshold: 4096, // 对超过4kb的数据进行压缩
					deleteOriginalAssets: false, // 是否删除原文件
				}),
			],
		}
	},
	chainWebpack(config) {
		config.plugins.delete('preload')
		config.plugins.delete('prefetch')
		config.module.rule('svg').exclude.add(resolve('src/remixIcon')).add(resolve('src/colorfulIcon')).end()

		config.module
			.rule('remixIcon')
			.test(/\.svg$/)
			.include.add(resolve('src/remixIcon'))
			.end()
			.use('svg-sprite-loader')
			.loader('svg-sprite-loader')
			.options({ symbolId: 'remix-icon-[name]' })
			.end()

		config.module
			.rule('colorfulIcon')
			.test(/\.svg$/)
			.include.add(resolve('src/colorfulIcon'))
			.end()
			.use('svg-sprite-loader')
			.loader('svg-sprite-loader')
			.options({ symbolId: 'colorful-icon-[name]' })
			.end()

		/*  config.when(process.env.NODE_ENV === "development", (config) => {
      config.devtool("source-map");
    }); */
		config.when(process.env.NODE_ENV !== 'development', config => {
			config.performance.set('hints', false)
			config.devtool('none')
			config.optimization.splitChunks({
				chunks: 'all',
				cacheGroups: {
					libs: {
						name: 'chunk-libs',
						test: /[\\/]node_modules[\\/]/,
						priority: 10,
						chunks: 'initial',
					},
					elementUI: {
						name: 'chunk-elementUI',
						priority: 20,
						test: /[\\/]node_modules[\\/]_?element-ui(.*)/,
					},
					fortawesome: {
						name: 'chunk-fortawesome',
						priority: 20,
						test: /[\\/]node_modules[\\/]_?@fortawesome(.*)/,
					},
				},
			})
			config
				.plugin('banner')
				.use(Webpack.BannerPlugin, [`${time}`])
				.end()
		})

		if (build7z) {
			config.when(process.env.NODE_ENV === 'production', config => {
				config
					.plugin('fileManager')
					.use(FileManagerPlugin, [
						{
							onEnd: {
								delete: [`./${outputDir}/video`, `./${outputDir}/data`],
								archive: [
									{
										source: `./${outputDir}`,
										destination: `./${outputDir}/${abbreviation}_${outputDir}_${date}.7z`,
									},
								],
							},
						},
					])
					.end()
			})
		}
	},
	runtimeCompiler: true,
	productionSourceMap: false,
	css: {
		requireModuleExtension: true,
		sourceMap: true,
		loaderOptions: {
			scss: {
				/*sass-loader 8.0语法 */
				//prependData: '@import "~@/styles/variables.scss";',

				/*sass-loader 9.0写法，感谢github用户 shaonialife*/
				additionalData(content, loaderContext) {
					const { resourcePath, rootContext } = loaderContext
					const relativePath = path.relative(rootContext, resourcePath)
					if (relativePath.replace(/\\/g, '/') !== 'src/styles/variables.scss') {
						return '@import "~@/styles/variables.scss";' + content
					}
					return content
				},
			},
			postcss: {
				plugins: [
					require('autoprefixer')({
						overrideBrowserslist: ['last 10 versions', 'not ie < 11'],
					}),
				],
			},
		},
	},
}
