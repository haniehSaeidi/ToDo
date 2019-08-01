<template>
    <div>
        <v-btn @click.prevent="removeTask(indexOfremove)" fab dark small outline color="pink">
            <v-icon>delete</v-icon>
        </v-btn>
    </div>
</template>

<script>
import { taskList, STORAGE_TODO, STORAGE_DATE, STORAGE_DONE } from "../main.js";
 
export default {
    name: 'Delete',
    props: ['indexOfremove', 'deletedTask'],
    data() {
        return {
            //
        }
    },
    methods: {
        removeTask(index) {
            this.deletedTask.splice(index, 1);
            this.$emit('removeTask')

            localStorage.setItem(STORAGE_TODO, JSON.stringify(this.deletedTask));
        },
    },

}
</script>
 