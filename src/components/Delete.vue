<template>
    <div>
        <v-btn outline flat icon color="red" @click.prevent="removeTask(indexOfremove)">
            <v-icon>delete</v-icon>
        </v-btn>
    </div>
</template>

<script>
import { taskList, STORAGE_TODO, STORAGE_DATE, STORAGE_DONE } from "../main.js";
 
export default {
    name: 'Delete',
    props: ['indexOfremove'],
    data() {
        return {
            //
        }
    },
    methods: {
        removeTask(index) {
            window["taskList"].splice(index, 1);
            this.$emit('removeTask')

            localStorage.setItem(STORAGE_TODO, JSON.stringify(window["taskList"]));
        },
    },

}
</script>
 