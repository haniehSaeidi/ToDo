<template>
    <div>
        <v-btn class="ml-5" @click="editTodo(todoEdit, indexxx)" fab dark outline small color="cyan">
            <v-icon>edit</v-icon>
        </v-btn>
    </div>
</template>

<script>
import {taskList, STORAGE_TODO, STORAGE_DATE, STORAGE_DONE} from '../main.js'
import  {eventBus} from '../main'

export default {
    name: 'Edit',
    props: ['todoEdit', 'indexxx', 'editedTask'],
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

            localStorage.setItem(STORAGE_TODO, JSON.stringify(this.editedTask));
        },
       
    }
}
</script>
<style>
.ml-5 {
    margin-left: 5px !important;
}
</style>


