<template>
    <div>
        <div class="task_div">
            <div class="text_feild_div">
                <div class="add_form">
                    <v-flex xs12 sm12 md12>
                        <v-text-field label="ToDo"  v-model="myNewTask" ></v-text-field>
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
                </div>
                <div class="add_btn_div">
                    <v-btn @click.prevent="addTask" v-if="!isEdited" class="mx-2" fab dark color="pink">
                        <v-icon dark>add</v-icon>
                    </v-btn>
                    <v-btn @click="update(indexOfUpdate)" v-else class="mx-2" fab dark color="cyan">
                        <v-icon dark>check</v-icon>
                    </v-btn>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import {taskList, STORAGE_TODO, STORAGE_DATE, STORAGE_DONE} from '../main.js'
import {eventBus} from '../main'

export default {
    name: 'Add',
    props: ['indexOfUpdate', 'addedTask'],
    data() {
        return {
            myNewTask: '',
            date:'',
            modal: false,
            isEdited:false,
            dialog: false,
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
                // this.addedTask.push(task)
                this.$emit('newTask', task)
                this.myNewTask = "";
                this.date = "";

            } else {
                this.$toastr.error('Please fill all the fields ...', 'Error');
            }

            localStorage.setItem(STORAGE_TODO, JSON.stringify(this.addedTask))
        },
        update(index) {
            this.isEdited = false;
            this.addedTask[this.indexOfUpdate].title = this.myNewTask;
            this.addedTask[this.indexOfUpdate].date = this.date;
            this.myNewTask = "";
            this.date = "";

            localStorage.setItem(STORAGE_TODO, JSON.stringify(this.addedTask))
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

