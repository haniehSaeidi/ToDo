<template>
    <div>
        <v-btn @click.prevent="removeTask()" fab dark small outline color="pink">
            <v-icon>delete</v-icon>
        </v-btn>
    </div>
</template>

<script>
import { taskList, STORAGE_TODO, STORAGE_DATE, STORAGE_DONE } from "../main.js";
 
export default {
    name: 'Delete',
    props: ['indexOfremove', 'tasks'],
    data() {
        return {
            //
        }
    },
    methods: {
        removeTask() {
            let index = this.tasks.map(item => item.index).indexOf(this.indexOfremove)
            this.tasks.splice(index, 1);
            localStorage.setItem(STORAGE_TODO, JSON.stringify(this.tasks));
        },
    },

}
</script>
 