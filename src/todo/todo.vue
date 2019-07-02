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
        <!-- :todo="todo"：父 -> 子 传递 todo 数据 -->
        <Item 
            :todo="todo"
            v-for="todo in filteredTodos"
            :key="todo.id"
            @del="deleteTodo"
        />
        <!-- :filter="filter"、:todos="todos"：父 -> 子 传递 todo 数据 -->
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
let id = 0;
export default {
    data() {
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
        filteredTodos() {
            if(this.filter === 'all') {
                return this.todos;
            }
            const completed = this.filter === 'completed';
            return this.todos.filter(todo => completed === todo.completed);
        }
    },

    methods: {
        /**
         * 输入备忘录事件
         */
        addTodo(e) {
            this.todos.unshift({
                id: id++,
                content: e.target.value.trim(),
                completed: false,
            });
            e.target.value = '';
        },
        deleteTodo(id) {
            this.todos.splice(this.todos.findIndex(todo => todo.id === id), 1);
        },
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
