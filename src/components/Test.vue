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
         
        <div class="task_div header">
            <h3>To Do List </h3>
        </div>
        <div class="task_div search_div">
            <v-layout row wrap>
                <v-flex xs12 sm12 md6>
                   <v-text-field outline v-model="search" placeholder="Search Todo"></v-text-field>
                </v-flex>
                <v-flex xs12 sm12 md6 mt-10>
                    <v-btn color="orange" @click="clearCompleted" dark><v-icon >done</v-icon>Clear done</v-btn>
                    <v-btn color="red" @click="clearAll" dark><v-icon >delete</v-icon>Clear All</v-btn>
                </v-flex>
            </v-layout>
        </div>
        <div class="list_div" v-if="taskList.length < 1">
            <v-layout row wrap>
                <v-flex text-center pt-10 md12>
                    <span> {{ nodata }} </span>
                </v-flex>
            </v-layout>
        </div>
        <div class="list_div" v-for="(todo, index) in filterTodo" :key="index" :todo="todo">
            <div>
                <v-layout row wrap>
                    <v-flex pt-10 md5>
                        <v-checkbox :label="todo.title"
                                    v-model="todo.done" 
                                    :class="{ completed: todo.done }"
                                    @change="completeTask()"
                                    color="red" ></v-checkbox>
                    </v-flex>
                    <v-flex pt-10 md4 :class="{ completed: todo.done }">
                        {{ todo.date }}
                    </v-flex>
                    <v-flex md3 text-right>
                        <v-btn outline flat icon color="purple" @click="editTodo(todo, index)">
                            <v-icon>edit</v-icon>
                        </v-btn>
                        <v-btn outline flat icon color="red" @click="removeTask(todo, index)">
                            <v-icon>delete</v-icon>
                        </v-btn>
                    </v-flex>
                </v-layout>
            </div>
        </div>
    </div>
</template>
<script>
import { constants } from 'crypto';

const STORAGE_TODO = 'todo-storage';
const STORAGE_DATE = 'date-storage';
const STORAGE_DONE = 'done-storage';

export default {
    props: ['todo'],
    data(){
        return {
            taskList: [],
            task: {
                title: '',
                date: '',
                done: ''
            },
            indexOfEdited: '',
            date: '',
            modal: false,
            newTask: '',
            nodata: 'No To Do',
            editedTodo: null,
            isEdited: false,
            search: ''
        }
    },
    mounted () {
        const todos = JSON.parse(localStorage.getItem(STORAGE_TODO) || '[]');
        this.taskList = todos
        // localStorage.clear()
    },
    methods: {
        addTask() {
            if(this.newTask && this.date) {
                this.task = {
                    title: this.newTask,
                    date: this.date,
                    done: false
                }
                this.taskList.push(this.task)
                this.newTask = "";
                this.date = "";
            } else {
                this.$toastr.error('Please fill all the fields ...', 'Error');
            }
            
            localStorage.setItem(STORAGE_TODO, JSON.stringify(this.taskList))
        },
        removeTask(todo, index) {
            this.taskList.splice(this.taskList.indexOf(todo), 1)
            
            localStorage.setItem(STORAGE_TODO, JSON.stringify(this.taskList))
        },
        editTodo(todo, index) {
            this.isEdited = true;
            this.newTask = todo.title;
            this.date = todo.date;
            this.indexOfEdited = index;
            
            localStorage.setItem(STORAGE_TODO, JSON.stringify(this.taskList))
        },
        update(index) {
            this.isEdited = false;
            this.taskList[this.indexOfEdited].title = this.newTask;
            this.taskList[this.indexOfEdited].date = this.date;
            this.newTask = "";
            this.date = "";
            
            localStorage.setItem(STORAGE_TODO, JSON.stringify(this.taskList))
        },
        completeTask() {
            localStorage.setItem(STORAGE_TODO, JSON.stringify(this.taskList))
        },

        clearCompleted() {
            var a = []
            return this.taskList.filter((todo) => {
                if(todo.done === false) {
                    a.push(todo);
                    console.log(a)
                }
                this.taskList = a;
                localStorage.setItem(STORAGE_TODO, JSON.stringify(this.taskList))
            })
            
        },
        clearAll() {
            this.taskList = []
        }
    },
    computed: {
        filterTodo() {
            return this.taskList.filter((todo) => {
                return todo.title.match(this.search);
            })
        }
    }
}
</script>

<style>
    .task_div {
        border: 1px solid#80CBC4;
        background: #E0F2F1 ;
        width: 70%;
        margin: auto;
        margin-top: 20px;
        box-shadow: 3px 3px 3px #aaaaaa;
    }

    .header {
        background: #4DB6AC;
        height: 50px;
        border-bottom: 1px solid #73ccc4;
        color: white;text-align: center;
        vertical-align: middle;
        line-height: 45px;
    }

    .text_feild_div {
        margin: 20px;

    }

    .list_div {
        border: 1px solid#80CBC4;
        background: #E0F2F1 ;
        width: 70%;
        margin: auto;
        margin-top: 5px;
        box-shadow: 3px 3px 3px #aaaaaa;
        padding: 15px;
        height: 70px;
        min-height: 70px;
    }

    .action_btn {
        min-width: 35px !important;
        height: 30px;
    }

    .action_icon {
        font-size: 20px !important;
    }

    .pt-10 {
        padding-top: 10px;
    }

    .text-center {
        text-align: center
    }

    .text-right {
        text-align: right;
    }

    .completed{
        text-decoration: line-through;
    }

    .theme--light.v-label {
        color: #333;
    }

    .v-input--selection-controls {
        margin-top: 0px;
        padding-top: 0px;
    }

    .required {
        border-color: red !important;
    }

    .search_div {
        background: #4DB6AC;
        height: 50px;
        border-bottom: 1px solid #73ccc4;
        color: white;text-align: center;
        vertical-align: middle;
        line-height: 45px;
        margin-top: 5px;
        background: whitesmoke;
        height: auto;
    }
    .width-40 {
        width: 40px;
    }

    .mt-10 {
        margin-top: 10px;
    }
</style>

