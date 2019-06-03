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