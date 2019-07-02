<!-- 完成切换、清除功能 -->
<template>
    <div class="helper">
        <span class="left">{{unFinishedTodoLength}} items left</span>
        <span class="tabs">
            <!-- 
                三种不同的状态，用 v-for 进来循环显示出来
                使用 v-for 必须使用 key，必须指定唯一的 key 来表明它，因为循环是一件耗时耗资源的操作，
                如果使用 key，在下一次循环的时候，如果 key 相同，那么就不会重新在生成一个节点，而是会复用这个节点
                :class="[state, filter === state ? 'actived' : '']"：有选中和未选中的状态；
                filter：通过父 -> 子 传过来的，用来判断此时的是否选择的状态
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

    computed: {
        unFinishedTodoLength() {
            return this.todos.filter(todo => !todo.completed).length;
        }
    },

    methods: {
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