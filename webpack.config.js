/**
 * path 是 nodejs 中的一个基本包，用来处理路径
 */
const path = require('path');

/**
 * 引入安装的 html-webpack-plugin 组件
 * 引入 webpack
 */
const HTMLPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

/**
 * extract-text-webpack-plugin: 帮助我们将非 js 文件单独打包成一个静态资源文件
 */
const ExtractPlugin = require('extract-text-webpack-plugin');

/**
 * 设置变量 isDev 来判断是否为开发环境，
 * 我们在启动脚本的时候设置的环境变量全部是存在 process.env 对象里面的，
 * 所以可以设置很多的变量然后通过 process.env 读到变量。
 */
const isDev = process.env.NODE_ENV === 'development';

const config = {
    /**
     * 在全局中加一个 target: 'web'，
     * 因为我们开发的是前端的项目，是跑在浏览器里面的，
     * 所以我们 webpack 的编译目标是 web 平台。
     */
    target: 'web',
    /**
     * 以 js 文件声明入口,
     * __dirname 代表文件所在的目录的地址，
     * path.join 就是将路径 __dirname 和路径 'src/index.js' 拼接起来形成一个绝对路径，
     * 以保证我们绝对能够访问到我们想要访问的文件
     */
    entry: path.join(__dirname, 'src/index.js'),
    /**
     * 出口：把文件输出，
     * 输出文件：filename: 'bundle.js',
     * 输出路径：path: path.join(__dirname, dist),
     * 输入一个文件，webpack 会将文件以及它里面所依赖的 vue、app 等都打包成一个完整的 bundle.js，
     * 并且打包出来的是能够在浏览器直接运行的 js 代码。
     */
    output: {
        filename: 'bundle.[hash:8].js',
        path: path.join(__dirname, "dist"),
    },
    /**
     * 因为 webpack 原生是只支持 js 类型的，并且只支持 ES5 的语法，
     * 所以我们在使用超出它理解范围的语法时，要使用一些帮它处理超出语法的工具，
     */
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            },
            /**
             * 对于 .jsx 的文件使用 babel-loader 进行操作
             */
            {
                test: /\.jsx$/,
                loader: 'babel-loader'
            },
            /**
             * 加载 css , 配置 loader,
             * css-loader 只是帮我们处理了 css 文件，
             * 在前端项目运行时 css 是要作为一个外部文件处理的，
             * 或者是把样式写到 html 内容里面作为一个 style 标签，然后将样式列出来，
             * 所以对于 css 我们有不同的处理方式，需要我们使用不同的声明方式，
             * 由此我们需要换一个模式，使用可以接受数组的 use
             * 
             * css-loader：从 css 文件中将内容读出来，
             * style-loader：将读出的内容写到 html 里面，
             * 这样我们写好的 css 最终会在 ts 中以一段 js 代码出现，js 代码的作用就是帮我们把 css 写到 html 中去
             * 
             * 我们用的 stylus，所以这里可以去掉
             */
            // {
            //     test: /\.css$/,
            //     use: [
            //         'style-loader',
            //         'css-loader'
            //     ]
            // },
            /**
             * css 预处理器：stylus
             * 使用模块化的方式去写 css 代码，原生的 css 的功能比较小；
             * 我们使用的预处理器也是可以通过 webpack 来处理打包的；
             * stylus-loader: 是专门处理 stylus 文件的，它处理完之后是 css 内容；
             * css 内容由上一级 css-loader 来处理；
             * webpack 的 loader 就是一层一层往上扔的，每一个 loader 只处理它关心的那一部分
             * 
             * 根据环境来加
             */
            // {
            //     test: /\.styl/,
            //     use: [
            //         'style-loader',
            //         'css-loader',
            //         {
            //             loader: 'postcss-loader',
            //             options: {
            //                 sourceMap: true,
            //             }
            //         },
            //         'stylus-loader'
            //     ]
            // },
            /**
             * 以加载 css 为例，加载图片以类似的方式
             * use 数组中使用对象来写，因为 loader 是可以配置选项的，每一个 loader 都有一些选项可以配置，
             * 使用 options 声明来配置选项，将一些参数传给 loader，来指定它的操作方式，
             * url-loader: 可以将图片转化为 base64 码，直接写在 js 里面，不用新生成一个文件，
             * 指定 limit: 输出文件的大小，
             * 指定 name：输出文件的名字，
             * [name]：图片进来的名字；-byCrystal：名字后添加的内容；.[ext]：图片的扩展名，
             * 记得将相应的 loader 安装一下，url-loader 是依赖 file-loader 的
             */
            {
                test: /\.(gif|jpg|jpeg|png|svg)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 1024,
                            name: '[name]-byCrystal.[ext]'
                        }
                    }
                ]
            }
        ]
    },
    /**
     * 引用 html-webpack-plugin
     * plugins 是一个数组，可以接收很多 plugin
     * new HTMLPlugin()：这样就将 html-webpack-plugin 引入进来了
     * 在使用 vue、react 框架时，一定要使用 webpack.DefinePlugin
     * webpack 在编译过程当中、页面 js 代码判断当前的环境时都可以调用 webpack.DefinePlugin 进行判断
     * 也就是说，process.env.NODE_ENV 是可以在 js 代码中引用到的，
     * 还有就是，现在的 vue、react 会根据不同的环境区分打包，
     * vue 的 dist 目录里面有很多不同版本的源代码，在开发环境中，版本较大，里面会包含很多错误信息的提示和很多其他的功能；
     * 这些功能在正式环境中是没有必要的，它不仅会加大文件的大小，还会降低运行速率。
     * 
     * 定义好了这个之后我们就可以启动 webpack-dev-server
     * 调用的 webpack 插件是在 webpack 上的，所以需要引用 webpack
     */
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: isDev ? '"development"' : '"production"'
            }
        }),
        new HTMLPlugin()
    ]
} 

/**
 * 由于我们的配置文件是要同时用在正式环境和开发环境的，
 * 所以我们的配置是要根据不同的环境去做一些判断的，
 * 如何判断：我们根据跑 npm run dev 的时候设置一个环境变量，来表示我们现在是开发环境还是正式环境；
 * 设置环境变量：安装包 cross-env;
 * 在不同的平台上设置环境变量的方式是不一样的，使用 cross-env 就可以统一设置（见 package.json 文件）;
 * 
 * 设置变量 isDev 来判断是否为开发环境
 * 我们在启动脚本的时候设置的环境变量全部是存在 process.env 对象里面的，
 * 所以可以设置很多的变量然后通过 process.env 读到变量；
 * 
 * 拿到了 isDev 变量之后，如果是在 development 情况下的，就给 webpack.config.js 加一些配置，
 * 将之前的 module.exports 改成 const congif，这样我们才能对配置进行一些修改
 * prot: '8000' -- webpack-dev-server 启动后的服务监听的端口
 * host: '0.0.0.0'：可以通过 localhost 117.0.0.0.1 来进行访问，同时也可以通过本机的内网 ip 进行访问
 * overlay: { error: true } ：编译过程中如果有任何的错误，都全部显示在页面上，方便我们定位错误然后修正错误
 * open: true ：cnpm run dev 之后自动打开浏览器页面
 * 
 * hot: true  
 * hot 的功能：改了一个组件的代码，我们只重新渲染这个页面当前这个组件的效果，而不会让整个页面的数据都重新加载
 * 同时添加一些插件：webpack.HotModuleReplacementPlugin、webpack.NoEmitOnErrorsPlugin
 */
if(isDev) {
    /**
     * 开发环境中我们就是这样用的，直接 push 进去就好
     */
    config.module.rules.push({
        test: /\.styl/,
        use: [
            'style-loader',
            'css-loader',
            {
                loader: 'postcss-loader',
                options: {
                    sourceMap: true,
                }
            },
            'stylus-loader'
        ]
    })
    /**
     * devtool：帮助我们在页面上调试代码
     * 因为我们使用的都是 .vue 文件的开发模式，而且我们写的都是 ES6 的代码，这些代码在浏览器中是不能运行的，
     * 所以我们如果直接在浏览器中去调试代码，这些代码都是经过编译的，我们自己都看不懂
     * 我们使用 source-map 去映射这些代码，这样我们可以发现在浏览器调试的时候看到的就是我们自己所写的代码
     */
    config.devtool = '#cheap-module-eval-source-map',
    config.devServer = {
        port: 8000,
        host: '0.0.0.0',
        overlay: {
            error: true,
        },
        // open: true,
        hot: true
    }
    config.plugins.push(
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin()
    )
} else {
    /**
     * 单独打包类库代码
     */
    config.entry = {
        app: path.join(__dirname, 'src/index.js'),
        vendor: ['vue']
    }

    config.output.filename = '[name].[chunkhash:8].js';
    /**
     * 在正式环境中，我们需要把 css 文件单独打包，而不是放在 js 文件中
     * 所以我们将 'style-loader' 从 use 剔除出来，同时将 css 文件单独打包返回
     */
    config.module.rules.push({
        test: /\.styl/,
        use: ExtractPlugin.extract({
            fallback: 'style-loader',
            use: [
                'css-loader',
                {
                    loader: 'postcss-loader',
                    options: {
                        sourceMap: true,
                    }
                },
                'stylus-loader'
            ]
        })
    })
    /**
     * 指定静态文件输出的名字
     */
    config.plugins.push(
        new ExtractPlugin('styles.[contentHash:8].css'),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor'
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'runtime'
        })
    )
}

module.exports = config