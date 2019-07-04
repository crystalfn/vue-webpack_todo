<!-- 输入的备忘录事件的显示 -->
<template>
    <!-- 
        整个模块会有不同的状态，通过父组件中传过来的 todo 中的 completed 字段来判断完成与否；
        :class：class 的动态写法，可以写 array 也可以写 object。 
     -->
    <div :class="['todo-item', todo.completed ? 'completed' : '']">
        <!-- 
            type="checkbox"：每个事件之前都有一个可选的小圆圈，代码这当前事件是否完成
            v-model="todo.completed"：双向绑定了一个数据，来控制当前事件是否完成的显示情况
         -->
        <input 
            type="checkbox"
            class="toggle"
            v-model="todo.completed"
        >
        <!-- 显示传入的备忘录事件，也是在父组件传过来的 todo 数组中，这里直接使用 -->
        <label>{{todo.content}}</label>
        <!-- 每一个事件都有删除的功能，以一个 X 的 button 来触发删除操作达到删除效果 -->
        <button class="destory" @click="deleteTodo"></button>
    </div>
</template>

<script>
export default {
    /**
     * 父 -> 子 传输数据，通过 props 来完成，传过来的数据可以直接使用
     */
    props: {
        todo: {
            type: Object,
            required: true,
        }
    },

    methods: {
        /**
         * 触发删除方法，同时向父组件 todo.vue 传递要删除的事件的 id
         * 通过 this.$emit('del', this.todo.id) 方法实现 父 -> 子 传输数据
         * del: 通过子组件触发父组件的 del 事件，同时将执行该事件需要的数据传递出去
         */
        deleteTodo() {
            this.$emit('del', this.todo.id);
        }
    },
}
</script>

<style lang="stylus" scoped>
.todo-item {
    position relative
    background-color #fff
    font-size 24px
    border-bottom 1px solid rgba(0,0,0,0.06)
    &:hover {
        .destory:after {
            content: '×'
        }
    }
    label {
        white-space: pre-line;
        word-break: break-all;
        padding: 15px 60px 15px 15px;
        margin-left: 45px;
        display: block;
        line-height: 1.2;
        transition: color 0.4s;
    }
    &.completed {
        label {
            color: #d9d9d9;
            text-decoration line-through
        }
    }
}
.toggle {
    text-align: center;
    width: 40px;
    height: 40px;
    position: absolute;
    top: 0;
    bottom: 0;
    margin: auto 0;
    border: none;
    appearance: none;
    outline none
    &:after {
        content url('../assets/images/round.svg')
    }
    &:checked:after {
        content url('../assets/images/done.svg')
    }
}
.destory {
    position: absolute;
    top: 0;
    right: 10px;
    bottom: 0;
    width: 40px;
    height: 40px;
    margin: auto 0;
    font-size: 30px;
    color: #cc9a9a;
    margin-bottom: 11px;
    transition: color 0.2s ease-out;
    background-color transparent
    appearance none
    border-width 0
    cursor pointer
    outline none
}
</style>