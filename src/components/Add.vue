<template>
    <div>
        <div class="task_div">
            <div class="header">
                <h3>To Do </h3>
            </div>
            <div class="text_feild_div">
                <v-flex xs12 sm12 md12>
                    <v-text-field label="Name" outline v-model="myNewTask" ></v-text-field>
                </v-flex>
                <v-flex xs12 sm12 md12>
                    <v-dialog ref="dialog" v-model="modal" :return-value.sync="date" persistent lazy full-width width="290px">
                        <template v-slot:activator="{ on }">
                            <v-text-field v-model="date" label="Date" prepend-icon="event" readonly v-on="on">
                            </v-text-field>
                        </template>
                        <v-date-picker v-model="date" scrollable>
                            <v-spacer></v-spacer>
                            <v-btn flat color="primary" @click="modal = false">Cancel</v-btn>
                            <v-btn flat color="primary" @click="$refs.dialog.save(date)">OK</v-btn>
                        </v-date-picker>
                    </v-dialog>
                </v-flex>
                <v-btn @click.prevent="addTask" color="success" v-if="!isEdited">add</v-btn>
                <v-btn color="primary" type="submit" @click="update(indexOfUpdate)" v-else>Save</v-btn>
            </div>
        </div>
    </div>
</template>

<script>
import {taskList, STORAGE_TODO, STORAGE_DATE, STORAGE_DONE} from '../main.js'
import {eventBus} from '../main'

export default {
    name: 'Add',
    props: ['indexOfUpdate'],
    data() {
        return {
            myNewTask: '',
            date:'',
            modal: false,
            isEdited:false,
        }
    },
    methods: {
        addTask() {
            if(this.myNewTask && this.date) {
                let task = {
                    title: this.myNewTask,
                    date: this.date,
                    done: false
                }
                this.$emit('newTask', task)
                this.myNewTask = "";
                this.date = "";

            } else {
                this.$toastr.error('Please fill all the fields ...', 'Error');
            }

            localStorage.setItem(STORAGE_TODO, JSON.stringify(window['taskList']))
        },
        update(index) {
            this.isEdited = false;
            window['taskList'][this.indexOfUpdate].title = this.myNewTask;
            window['taskList'][this.indexOfUpdate].date = this.date;
            this.myNewTask = "";
            this.date = "";

            localStorage.setItem(STORAGE_TODO, JSON.stringify(window['taskList']))
        },
        
    },
    created(){
        eventBus.$on('edit',(edit)=>{
            this.isEdited = edit
        })

        eventBus.$on('editTask',(task)=>{
            this.myNewTask = task
        })

        eventBus.$on('editDate',(date)=>{
            this.date = date
        })
    }
}
</script>

<style>

</style>

