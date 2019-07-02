# 一、vue2 核心介绍
## vue2 介绍
- 数据绑定：被 AngularJS 发扬光大，将 JS 中的部分数据直接绑定到 HTML 中，这样一旦数据发生改变，HTML 上的数据就会改变；
- vue 文件开发方式：vue 是组件化的框架，我们书写一个组件，就会包括 HTML、JS、CSS，这给我们书写代码带来很大的方便，也是 vue 的一个优势；
- render 方法：vue 的核心实现是虚拟 DOM，也提供了 render 方法，我们一个组件里面有任何数据变化的时候，都会去重新执行 render 方法，然后产生新的 HTML，以这种方式来更新我们 HTML 的内容。实际上在 vue 组件中，template 部分最终被转换成 JS 中的一个 render 方法。

## 重点的 API
- 生命周期方法；
- computed：vue 是 reactive 的框架（我们声明好的数据，一旦改动他们就会影响到依赖这些数据的地方），computed 是对 reactive 更深度的使用（比如输入姓和名，输出姓名）；

# 二、配置 vue 的 jsx 写法以及 postcss
- 在真正进行开发之前，我们还要配置 webpack，还要添加一些内容；
- 首先安装 postcss-loader、autoprefixer、babel-loader、babel-core;
- 然后在根目录下新建 .babelrc 文件、postcss.config.js 文件；
- 在 postcss.config.js 中：

```
/**
 * 首先 require autoprefixer
 */
const autoprefixer = require('autoprefixer');

/**
 * postcss 是帮助我们后处理 css 的，
 * 也就是 css 已经编译完成了，把 stylus 编译成 css 文件之后，再通过 postcss 来优化 css 代码；
 * 优化的过程就是通过一系列的组件去优化
 * autoprefixer：帮我们自动处理 css 属性，给他们加上浏览器前缀
 */
module.exports = {
    plugins: [
        autoprefixer()
    ]
}
```
- 在 .babelrc 中：

```
/**
 * 如何使用 vue 的 render 方法以及 vue 也可以支持写 jsx 的代码
 */
{
    "presets": [
        "env"
    ],
    "plugins": [
        "transform-vue-jsx"
    ]
}
```
- 安装 .babelrc 中使用的包：babel-preset-env、babel-plugin-transform-vue-jsx;
- 配置好上述的依赖之后，在 webpack.config.js 中加上这部分的配置；

```
/**
 * 对于 .jsx 的文件使用 babel-loader 进行操作
 */
{
    test: /\.jsx$/,
    loader: 'babel-loader'
},
```

```
{
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
},
```

# 三、实现 todo 应用的界面
- 实现页面从 app.vue 文件开始入手；
- 在 src 下新建 todo 文件夹，在里面放 todo 应用；
- 将整个 todo 应用分成三个部分：header.vue、todo.vue、footer.jsx，再将 todo.vue 细分为 tabs.vue、item.vue;
- 在 styles 文件夹中新建一些样式文件，作为全局、局部的样式，引用的时候只需要引用就可以了，全局的样式在 index.js 中引用，局部的样式在某一块儿中引用，引用了之后样式才会生效;
- vue 的组件必须要有一个独立的外部节点，不能在 template 下有两个并列的节点，这样是会报错的；
- 将 todo 应用的三个部分放到 app.vue 中（详细见 app.vue）；
- 分别实现三个部分：header.vue、todo.vue、footer.jsx（详细见代码）；
