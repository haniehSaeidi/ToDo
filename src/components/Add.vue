<template>
    <div>
        <div class="task_div">
            <div class="header">
                <h3>To Do </h3>
            </div>
            <div class="text_feild_div" :key="indexOfEdited">
                <v-flex xs12 sm12 md12 v-if="!isEdited">
                    <v-text-field label="Name" outline v-model="newTask" ></v-text-field>
                </v-flex>
                <v-flex xs12 sm12 md12 v-else>
                    <v-text-field label="Name" outline v-model="newTask" ></v-text-field>
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
                <v-btn color="primary" @click="addTask" v-if="!isEdited"> <v-icon dark>add</v-icon>ADD</v-btn>
                <v-btn color="primary" type="submit" @click="update(indexOfEdited)" v-else>Save</v-btn>
            </div>
        </div>
    </div>
</template>

<script>
import {taskList, STORAGE_TODO, STORAGE_DATE, STORAGE_DONE} from '../main.js'

export default {
    name: 'Add',
    props: {
        newTask: String,
        date: String,
        isEdited: Boolean,
        indexOfEdited: String
        // ['newTask', 'date', 'isEdited', 'indexOfEdited']
        },
    data() {
        return {
            task: {
                title: '',
                date: '',
                done: ''
            },
            modal: false
        }
    },
    methods: {
        addTask() {
            if(this.newTask && this.date) {
                this.task = {
                    title: this.newTask,
                    date: this.date,
                    done: false
                }
                window['taskList'].push(this.task)
                // this.newTask = "";
                // this.date = "";
            } else {
                this.$toastr.error('Please fill all the fields ...', 'Error');
            }

            localStorage.setItem(STORAGE_TODO, JSON.stringify(window['taskList']))
            
        },
        update(index) {
            this.isEdited = false;
            window['taskList'][this.indexOfEdited].title = this.newTask;
            window['taskList'][this.indexOfEdited].date = this.date;
            this.newTask = "";
            this.date = "";
            
            localStorage.setItem(STORAGE_TODO, JSON.stringify(window['taskList']))
        },
    },
}
</script>

<style>

</style>

