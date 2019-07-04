<!-- 完成切换、清除功能 -->
<template>
    <div class="helper">
        <!-- 
            通过父组件 todo.vue 传进来的 todos 数据的信息来 computed 出现在未完成的任务条数
         -->
        <span class="left">{{unFinishedTodoLength}} items left</span>
        <span class="tabs">
            <!-- 
                三种不同的状态，用 v-for 进来循环显示出来
                使用 v-for 必须使用 key，必须指定唯一的 key 来表明它，因为循环是一件耗时耗资源的操作，
                如果使用 key，在下一次循环的时候，如果 key 相同，那么就不会重新在生成一个节点，而是会复用这个节点
                :class="[state, filter === state ? 'actived' : '']"：有选中和未选中的状态；
                filter：通过父 -> 子 传过来的，用来判断此时的是否选择的状态

                通过 toggleFilter 切换不同的状态改变显示的事件
             -->
            <span 
                v-for="state in states" 
                :key="state"
                :class="[state, filter === state ? 'actived' : '']"
                @click="toggleFilter(state)"
            >
                {{state}}
            </span>
        </span>
        <!-- 清除事件 -->
        <span class="clear" @click="clearAllCompleted">
            Clear Completed
        </span>
    </div>
</template>

<script>
export default {
    /**
     * 父 -> 子 传输数据，通过 props 来完成，传过来的数据可以直接使用
     */
    props: {
        filter: {
            type: String,
            required: true
        },
        todos: {
            type: Array,
            required: true
        }
    },
    data() {
        return {
            states: ['all', 'active', 'completed']     // 三种不同的状态
        }
    },

    /**
     * 使用计算属性来计算一下现在未完成的任务的条数
     * 运用 filter() 方法，返回所有 !todo.completed 为 true 的项组成的数据
     * 这里我们需要的是这个数组的长度
     * 设置完成后我们就可以直接在 html 中使用 unFinishedTodoLength 来显示现在未完成的任务条数
     */
    computed: {
        unFinishedTodoLength() {
            return this.todos.filter(todo => !todo.completed).length;
        }
    },

    methods: {
        /**
         * 通过子组件触发父组件的 toggle 方法，同时传入此时要显示的事件的状态
         */
        toggleFilter(state) {
            this.$emit('toggle', state);
        },

        /**
         * 清除所有已完成事件
         */
        clearAllCompleted() {
            this.$emit('clearAllCompleted');
        }
    }
}
</script>

<style lang="stylus" scoped>
.helper{
    font-weight 100
    display flex
    justify-content space-between
    padding 5px 0
    line-height 30px
    background-color #fff
    font-size 14px
    font-smoothing: antialiased
}
.left, .clear, .tabs{
    padding 0 10px
    box-sizing border-box
}
.left, .clear{
    width 150px
}
.left{
    text-align left
}
.clear{
    text-align right
    cursor pointer
}
.tabs{
    width 200px
    display flex
    justify-content space-around
    * {
        display inline-block
        padding 0 10px
        cursor pointer
        border 1px solid rgba(175,47,47,0)
        &.actived{
        border-color rgba(175,47,47,0.4)
        border-radius 5px
        }
    }
}
</style>