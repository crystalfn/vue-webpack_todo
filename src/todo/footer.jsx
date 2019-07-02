/**
 * 实现尾部部分
 * footer 是 jsx 文件，jsx 就是将 html 直接写在 js 代码中；
 * 缺点：使用 jsx 无法在文件中直接写 css 样式，所以涉及到的样式我们只能拆分出去，然后再引用进来
 * 优点：可以在 render() 中做任何 js 的运算，比如可以通过 js 的方式来循环出 html 节点，而不用 v-for 这种方式
 *      v-for 是基于 template 来写的，它的功能是固定的，但是 js 的功能是有非常多的，
 * 使用 jsx 功能会更强大，使用 vue 结构更清晰，用起来更方便一些。
 */
import '../assets/styles/footer.styl';

export default {
    data() {
        return {
            author: 'Crystal'
        }
    },
    render() {
        return (
            <div id="footer">
                <span>Written By {this.author}</span>
            </div>
        )  
    }
}