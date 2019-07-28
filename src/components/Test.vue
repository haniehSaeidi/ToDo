<template>
    <div>
        <Add :newTask="newTask"></Add>

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
        <div class="list_div" v-if="test.length < 1">
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
import Add from '@/components/Add.vue'
import {taskList, STORAGE_TODO, STORAGE_DATE, STORAGE_DONE} from '../main.js'

export default {
    props: ['todo'],
    components: {
		Add: Add
	},
    data(){
        return {
            nodata: 'No To Do',
            editedTodo: null,
            search: '',
            test: [],
            newTask: '',
            date: '',
            indexOfEdited: '',
            isEdited: false
        }
    },
    mounted () {
        const todos = JSON.parse(localStorage.getItem(STORAGE_TODO) || '[]');
        window.taskList = todos
        this.test = window['taskList']
    },
    methods: {
        removeTask(todo, index) {
            window['taskList'].splice(window['taskList'].indexOf(todo), 1)
            
            localStorage.setItem(STORAGE_TODO, JSON.stringify(window['taskList']))
        },
        editTodo(todo, index) {
            this.isEdited = true;
            this.newTask = todo.title;
            this.date = todo.date;
            this.indexOfEdited = index;
            
            localStorage.setItem(STORAGE_TODO, JSON.stringify(window['taskList']))
        },
        completeTask() {
            localStorage.setItem(STORAGE_TODO, JSON.stringify(window['taskList']))
        },

        clearCompleted() {
            var dontCompleted = []
            return this.test.filter((todo) => {
                if(todo.done === false) {
                    dontCompleted.push(todo);
                }
                console.log(dontCompleted)
                this.test = dontCompleted;
                localStorage.setItem(STORAGE_TODO, JSON.stringify(window['taskList']))
            })
            
        },
        clearAll() {
            taskList = []
        }
    },
    computed: {
        filterTodo() {
            return this.test.filter((todo) => {
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

