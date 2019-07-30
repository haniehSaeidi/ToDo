<template>
    <div>
        <v-btn outline flat icon color="purple" @click="editTodo(todoEdit, indexxx)">
            <v-icon>edit</v-icon>
        </v-btn>
    </div>
</template>

<script>
import {taskList, STORAGE_TODO, STORAGE_DATE, STORAGE_DONE} from '../main.js'
import  {eventBus} from '../main'

export default {
    name: 'Edit',
    props: ['todoEdit', 'indexxx'],
    data() {
        return {
            
        }
    },
    methods: {
        editTodo(todo, index) {
            this.$emit('indexOfEdit', index)
            eventBus.$emit('edit', true)
            eventBus.$emit('editTask', todo.title)
            eventBus.$emit('editDate', todo.date)

            localStorage.setItem(STORAGE_TODO, JSON.stringify(window["taskList"]));
        },
       
    }
}
</script>

