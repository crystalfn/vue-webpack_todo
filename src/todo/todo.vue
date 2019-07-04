// 实现中间部分
<template>
    <section class="real-app">
        <!-- 实现 input 部分 -->
        <!-- 
            autofocus="autofocus"：页面一进来就会自动选中
            @keyup.enter="addTodo"：事件，输入完之后敲击 enter 才会触发此事件
         -->
        <input 
            type="text"
            class="add-input"
            autofocus="autofocus"
            placeholder="备忘录，请输入事件！"
            @keyup.enter="addTodo"
        >

        <!-- 直接使用在 components 声明过的组件 -->
        <!-- 
            :todo="todo"：父 -> 子 传递 todo 数据
            这一部分肯定是要根据循环才能显示出来的

            filteredTodos, 通过 computed 计算出当前应该显示在页面上的事件

            del 事件是通过子组件 item.vue 来触发的，触发同时传入事件的 id
         -->
        <Item 
            :todo="todo"
            v-for="todo in filteredTodos"
            :key="todo.id"
            @del="deleteTodo"
        />
        <!-- 
            :filter="filter"、:todos="todos"：父 -> 子 传递 todo 数据
            toggle 事件是通过自组件 tabs.vue 来触发的，触发同时传入要显示的事件的状态 state
            toggleFilter 事件完成对切换后要显示的事件的状态的更换
         -->
        <Tabs 
            :filter="filter" 
            :todos="todos" 
            @toggle="toggleFilter"
            @clearAllCompleted="clearAllCompleted"
        />
    </section>
</template>

<script>
/**
 * 在 todo.vue 中引用各个部分的组件
 */
import Item from './item.vue'
import Tabs from './tabs.vue'
// todos 数组中每个对象的 id，从 0 开始计数
let id = 0;
export default {
    data() {
        /**
         * 未完成的任务肯定不止一个，所以设置 todos 数组
         * 每一次触发 addTodo 事件后会对 todos 数组进行相关的操作
         */
        return {
            todos: [],
            filter: 'all'
        }
    },

    /**
     * 在 components 中声明在 todo.vue 中要使用的组件
     */
    components: {
        Item,
        Tabs
    },

    computed: {
        /**
         * computed 中的 filteredTodos，根据切换后更换的要显示的事件的状态，控制显示的事件
         */
        filteredTodos() {
            // 如果状态是 all，显示所有的事件
            if(this.filter === 'all') {
                return this.todos;
            }
            // 如果状态不是 all，挑出符合条件的显示
            const completed = this.filter === 'completed';
            return this.todos.filter(todo => completed === todo.completed);
        }
    },

    methods: {
        /**
         * 添加事件
         * addTodo 是一个 input 事件，每次触发这个事件后都会传入一个 event 对象；
         * 每次使用 unshift 将 event 对象插入到 todos 的第一项
         * 因为每次插入的时候我们都是在第一行插入的；
         * id 我们模拟一下，并且每次给它 +1；
         * content 的值就是我们在 input 框中输入的值，trim() 一下去掉前后空格；
         * completed: 任务完成的状态，刚开始肯定是未完成的状态，所以设置成 false
         * 
         * e.target.value = '';
         * 每次完成 addTodo 事件之后都需要将 input 框清空，
         * 否则前一次输入的内容会一直在那里，影响后面的输入
         */
        addTodo(e) {
            if(e.target.value === '') {
                alert('输入事件不能为空！');
            } else {
                this.todos.unshift({
                    id: id++,
                    content: e.target.value.trim(),
                    completed: false,
                });
            }
            e.target.value = '';
        },

        /**
         * 删除事件
         * 仅仅通过 todo.vue 组件是完成不了这个功能的，这个地方涉及到父子组件的交互
         * 在 item.vue 组件中出发删除事件的方法，同时将要删除事件的 id 传过来，
         * 在 todo.vue 组件中完成删除事件的功能
         * 如果 todo.id === id，返回 todo，通过 findIndex() 方法找到它在 todos 中的位置
         * 最后通过 splice() 方法实现删除功能
         */
        deleteTodo(id) {
            this.todos.splice(this.todos.findIndex(todo => todo.id === id), 1);
        },

        /**
         * toggleFilter 事件完成对切换后要显示的事件的状态的更换
         */
        toggleFilter(state) {
            this.filter = state;
        },
        clearAllCompleted() {
            this.todos = this.todos.filter(item => !item.completed);
        }
    }
}
</script>

<style lang="stylus" scoped>
.real-app{
    width 600px
    margin 0 auto
    box-shadow 0 0 5px #666
}
.add-input{
    position: relative;
    margin: 0;
    width: 100%;
    font-size: 24px;
    font-family: inherit;
    font-weight: inherit;
    line-height: 1.4em;
    border: 0;
    outline: none;
    color: inherit;
    padding: 6px;
    border: 1px solid #999;
    box-shadow: inset 0 -1px 5px 0 rgba(0, 0, 0, 0.2);
    box-sizing: border-box;
    font-smoothing: antialiased;
    padding: 16px 16px 16px 60px;
    border: none;
    box-shadow: inset 0 -2px 1px rgba(0,0,0,0.03);
}
</style>
