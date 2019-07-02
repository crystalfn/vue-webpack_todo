<template>
    <div id="app">
        <div id="cover"></div>
        <!-- 直接使用在 components 声明过的组件 -->
        <Header></Header>
        <Todo></Todo>
        <Footer></Footer>
    </div>
</template>

<script>
/**
 * 在 app.vue 中引用各个部分的组件
 */
import Header from './todo/header.vue'
import Todo from './todo/todo.vue'
import Footer from './todo/footer.jsx'

export default {
    /**
     * 在 components 中声明在 app.vue 中要使用的组件
     */
    components: {
        Header,
        Todo,
        Footer,
    }
}
</script>

<style lang="stylus" scoped>
#app{
    position absolute
    left 0
    right 0
    top 0
    bottom 0
}
#cover{
    position absolute
    left 0
    top 0
    right 0
    bottom 0
    background-color #999
    opacity .9
    z-index -1
}
</style>