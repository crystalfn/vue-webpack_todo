# 一、vue-loader + webpack 项目配置
## 1、初始化项目
```
npm init
```
执行完命令之后会出现 package.json 的文件，接下来我们可以安装我们需要的包。

## 2、安装包
```
npm i webpack vue vue-loader
```
根据提示警告信息继续安装一些需要的包。

## 3、创建源码放置的目录
创建一个 src 文件夹，放置项目源码的目录。  
创建文件 app.vue。

## 4、创建 webpack.config.js 文件，让 vue 组件可以在浏览器中运行
- webpack 用来打包前端资源，前端资源有很多不同的类型，这些资源都是需要通过 http 请求加载的内容；
- 在开发 webapp 时，我们是将整个 js 加载到浏览器端，然后将所有的内容渲染出来，所以我们可以以 js 文件作为我们的入口；
- 在 src 下创建 index.js 文件作为入口文件，并在 webpack.config.js 中将该文件设置为入口文件；
- .vue 是一个组件，它不能直接挂载到 html 页面中，要挂载的话必须在 index.js 中的 render 下实现；

## 5、打包项目
- npm run build: 报错 You may need an appropriate loader to handle this file type. 表示要为 .vue 文件类型声明一个 loader；
- 因为 webpack 原生是只支持 js 类型的，并且只支持 ES5 的语法，所以我们在使用超出它理解范围的语法时，要使用一些帮它处理超出语法的工具;
- webpack 所做的工作：将不同的静态资源的类型，打包成一个 js，然后在 html 中引用这个 js 的时候，我们 html 里面的 js 就可以正常的运行然后去执行我们的操作。

# 二、webpack 配置项目加载各种静态资源及 css 预处理器
- webpack 可以加载我们所用到的所有静态资源，比如图片、css，加载时还是配置 loader （详细见 webpack.config.js 文件）；
- 安装完相应的 loader 之后，我们就可以在 index.js 中直接 import 非 js 内容；
- 在 assets 中，我们可以新建存放图片的文件夹 images、新建存放样式的文件夹 styles，然后放入图片、css 样式的文件，然后再在 index.js 中 import 图片以及 css 文件；

```
import './assets/styles/test.css';
import './assets/images/bg.jpeg';
```

- 用 webpack 打包，可以在 dist 文件夹中看到打包好的在 index.js 中 import 的图片，并且图片的名称为 webpack.config.js 中设置的 bg-byCrystal.jpeg，同时还可以在 dist 文件夹中的 bundle.js 中看到，test.css 样式文件中引用的图片，已经被转换成 base64 码；

```
// module
exports.push([module.i, "body {\r\n    color: red;\r\n    background-image: url(" + __webpack_require__(17) + ");\r\n}", ""]);

// exports


/***/ }),
/* 17 */
/***/ (function(module, exports) {

module.exports = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgdmlld0JveD0iLTEwIC0xOCAxMDAgMTM1Ij48Y2lyY2xlIGN4PSI1MCIgY3k9IjUwIiByPSI1MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjYmRkYWQ1IiBzdHJva2Utd2lkdGg9IjMiLz48cGF0aCBmaWxsPSIjNWRjMmFmIiBkPSJNNzIgMjVMNDIgNzEgMjcgNTZsLTQgNCAyMCAyMCAzNC01MnoiLz48L3N2Zz4="
```
- css 预处理器：stylus，详细见 webpack.config.js 文件，注意安装 stylus-loader、stylus 包；
- 可以在 styles 文件夹下新建 test.stylus.styl 文件，在里面书写样式；
- 同样的在 index.js 中 import test-stylus.styl 文件，再进行打包，可以在 bundle.js 中找到在 test-stylus.styl 文件中设置的样式

```
// module
exports.push([module.i, "body {\n  font-size: 20px;\n}\n", ""]);
```

# 三、webpack-dev-server 的配置和使用
webpack-dev-server 实际上是 webpack 的一个包，我们首先要安装这个包；

> 在 cnpm run build 时是使用了 webpack 启动了我们的 webpack.config.js，然后 webpack 就帮助我们打包 js 代码，webpack-dev-server 的使用与之类似。

> 我们使用同一个 webpack.config.js 文件，webpack-dev-server 是专门用在开发环境的，我们还需要修改一些配置来专门配合 webpack-dev-server 的开发者模式。（详细见 webpack.config.js 文件）

1. 在全局中加一个 target: 'web'，因为我们开发的是前端的项目，是跑在浏览器里面的，所以我们 webpack 的编译目标是 web 平台；

2. 判断环境：
 * 由于我们的配置文件是要同时用在正式环境和开发环境的，所以我们的配置是要根据不同的环境去做一些判断的；
 * 如何判断：我们根据跑 npm run dev 的时候设置一个环境变量，来标识我们现在是开发环境还是正式环境；
 * 设置环境变量：安装包 cross-env，在不同的平台上设置环境变量的方式是不一样的，使用 cross-env 就可以统一设置（见 package.json 文件）;
 
3. 设置判断的变量
* 设置变量 isDev 来判断是否为开发环境，
* 我们在启动脚本的时候设置的环境变量全部是存在 process.env 对象里面的，
* 所以可以设置很多的变量然后通过 process.env 读到变量；

4. 修改配置
* 拿到了 isDev 变量之后，如果是在 development 情况下的，就给 webpack.config.js 加一些配置，
* 将之前的 module.exports 改成 const congif，这样我们才能对配置进行一些修改
* prot: 8000 -- webpack-dev-server 启动后的服务监听的端口
* host: '0.0.0.0'：可以通过 localhost 117.0.0.0.1 来进行访问，同时也可以通过本机的内网 ip 进行访问
* overlay: { error: true } ：编译过程中如果有任何的错误，都全部显示在页面上，方便我们定位错误然后修正错误

---
上述配置加完了之后，我们还需要加关于 html 的东西。可以看到我们 build 出来的文件里面只有 js 文件和静态资源图片，没有 html 文件来容纳我们的 js 文件，这样的话项目是跑不起来的，毕竟一个前端项目是必须要有一个 html 作为入口的，如何设置一个 html 且让它自动包含 js 文件呢：

- 在 webpack 中有一个很好用的组件：html-webpack-plugin，首先安装这个组件；
- 在 webpack.config.js 文件中引入这个组件；

```
const HTMLPlugin = require('html-webpack-plugin');
```
- 在 webpack 配置中加上：
```
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
*/
plugins: [
    new webpack.DefinePlugin({
        'process.env': {
            NODE_ENV: isDev ? '"development"' : '"production"'
        }
    }),
    new HTMLPlugin()
]
```

#### 其他配置
1. 
```
if(isDev) {
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
    /**
    * hot: true  
    * hot 的功能：改了一个组件的代码，我们只重新渲染这个页面当前这个组件的效果，而不会让整个页面的数据都重新加载
    * 同时添加一些插件：webpack.HotModuleReplacementPlugin、webpack.NoEmitOnErrorsPlugin
    */
    config.plugins.push(
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin()
    )
}
```