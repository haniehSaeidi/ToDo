<template>
  <div>
    <Add @newTask="createnew" :indexOfUpdate="indexOfEdit"></Add>

    <div class="task_div header">
      	<h3>To Do List</h3>
    </div>
    <div class="task_div search_div">
      <v-layout row wrap>
			<v-flex xs12 sm12 md6>
				<v-text-field class="search_input" outline v-model="search" placeholder="Search Todo"></v-text-field>
			</v-flex>
			<v-flex xs12 sm12 md6 mt-10>
				<v-btn color="orange" class="clear_btn" @click="clearCompleted" dark>
					<v-icon>done</v-icon>Clear done
				</v-btn>
				<v-btn color="red" class="clear_btn" @click="clearAll" dark>
					<v-icon>delete</v-icon>Clear All
				</v-btn>
			</v-flex>
      </v-layout>
    </div>
    <div class="list_div" v-if="test.length < 1">
		<v-layout row wrap>
			<v-flex text-center pt-10 md12>
				<span>{{ nodata }}</span>
			</v-flex>
		</v-layout>
    </div>
    <div class="list_div" v-for="(todo, index) in filterTodo" :key="index" :todo="todo">
		<div>
			<v-layout row wrap>
				<v-flex pt-10 md6>
					<v-checkbox
					:label="todo.title"
					v-model="todo.done"
					:class="{ completed: todo.done }"
					@change="completeTask()"
					color="red"
					></v-checkbox>
				</v-flex>
				<v-flex pt-10 md4 :class="{ completed: todo.done }">{{ todo.date }}</v-flex>
				<v-flex md1 text-right>
					<Edit :index="index" @indexOfEdit="updateIndex(index)" :indexxx="indexOfEdit" :todoEdit="todo"></Edit>
				</v-flex>
				<v-flex md1 text-right>
					<Delete :indexOfremove="index"></Delete>
				</v-flex>
			</v-layout>
		</div>
    </div>
  </div>
</template>
<script>
import { constants } from "crypto";
import Add from "./Add";
import Delete from './Delete';
import Edit from './Edit'

import { taskList, STORAGE_TODO, STORAGE_DATE, STORAGE_DONE } from "../main.js";

export default {
    components: {
        Add: Add,
        Delete,
        Edit
    },
    data() {
        return {
            nodata: "No To Do",
            editedTodo: null,
            search: "",
            test: [],
            indexOfEdit: ''
        };
    },
    mounted() {
        const todos = JSON.parse(localStorage.getItem(STORAGE_TODO) || "[]");
        window.taskList = todos;
        this.test = window["taskList"];
    },
    methods: {
        createnew(task) {
            window['taskList'].push(task)
        },
        updateIndex(index) {
            this.indexOfEdit = index;
        },
        completeTask() {
            localStorage.setItem(STORAGE_TODO, JSON.stringify(window["taskList"]));
        },
        clearCompleted() {
            var dontCompleted = [];
            return this.test.filter(todo => {
                if (todo.done === false) {
                    dontCompleted.push(todo);
                }
                
                this.test = dontCompleted;
                localStorage.setItem(STORAGE_TODO, JSON.stringify(window["taskList"]));
            });
        },
        clearAll() {
            window["taskList"] = [];
        },
    },
    computed: {
        filterTodo() {
            return this.test.filter(todo => {
                return todo.title.match(this.search);
            });
        }
    }
};
</script>

<style>
.task_div {
  border: 2px solid#80CBC4;
  /* background: #e0f2f1; */
  width: 70%;
  margin: auto;
  margin-top: 20px;
  box-shadow: 3px 3px 3px #aaaaaa;
}

.header {
  background: #4db6ac;
  height: 50px;
  border-bottom: 1px solid #73ccc4;
  color: white;
  text-align: center;
  vertical-align: middle;
  line-height: 45px;
}

.text_feild_div {
  margin: 20px;
}

.list_div {
  border: 2px solid#80CBC4;
  /* background: #e0f2f1; */
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
  text-align: center;
}

.text-right {
  text-align: right;
}

.completed {
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
  background: #e0f2f1 !important;
  height: 50px;
  border-bottom: 1px solid #73ccc4;
  color: white;
  text-align: center;
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

.search_input {
	width: 300px;
    height: 65px;
    margin-top: 5px !important;
    margin-left: 10px !important;
}

.clear_btn {
	height: 40px;
	float: right;
}
</style>

