<template>
  	<div class="mb-30">
		
    	<Add @newTask="createnew" 
			 :indexOfUpdate="indexOfEdit"
			 :addedTask="newTask"></Add>

		<div class="search_div">
			<v-layout wrap>
				<v-flex>
					<v-text-field class="search_input" v-model="search" placeholder="Search ToDo"></v-text-field>
				</v-flex>
				<v-flex mt-10>
					<v-btn class="clear_btn" @click="clearCompleted" dark outline  color="pink">
						<v-icon class="delete_icon">delete</v-icon>  done
					</v-btn>
					<v-btn class="clear_btn" @click="clearAll" dark outline  color="pink">
						<v-icon class="delete_icon">delete</v-icon>  All
					</v-btn>
				</v-flex>
			</v-layout>
			
		</div>
		<div class="list_div" v-if="newTask.length < 1">
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
						<Edit :index="index" 
							  @indexOfEdit="updateIndex(todo, index)" 
							  :editIndex="indexOfEdit" 
							  :tasks="todo"
							  :editedTask="newTask"
							  ></Edit>
					</v-flex>
					<v-flex md1 text-right>
						<Delete :indexOfremove="todo.index"
								:tasks="newTask"
								></Delete>
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
            nodata: "No ToDo",
            editedTodo: null,
            search: "",
            newTask: [],
            indexOfEdit: ''
        };
    },
    mounted() {
        const todos = JSON.parse(localStorage.getItem(STORAGE_TODO) || "[]");
		this.newTask = todos;
    },
    methods: {
        createnew(task) {
			this.newTask.push(task)
        },
        updateIndex(todo) {
			let index = this.newTask.map(item => item.index).indexOf(todo.index)
			this.indexOfEdit = index
        },
        completeTask() {
            localStorage.setItem(STORAGE_TODO, JSON.stringify(this.newTask));
		},
        clearCompleted() {
            var dontCompleted = [];
            return this.newTask.filter(todo => {
                if (todo.done === false) {
                    dontCompleted.push(todo);
                }
                
                this.newTask = dontCompleted;
                localStorage.setItem(STORAGE_TODO, JSON.stringify(this.newTask));
            });
        },
        clearAll() {
			this.newTask = [];
			localStorage.setItem(STORAGE_TODO, JSON.stringify(this.newTask));
        },
    },
    computed: {
        filterTodo() {
            return this.newTask.filter(todo => {
                return todo.title.match(this.search);
            });
        }
    }
};
</script>

<style>
.task_div {
	width: 40%;
	margin: auto;
	padding: 20px;
	margin-top: 20px;
	box-shadow:  3px 3px 5px 2px #d8d5d5;
	margin-bottom: 50px;
}

.header {
	background: #92C8C0;
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

.add_form {
	position: relative;
}

.add_btn_div {
	z-index: 10;
	position: absolute;
	left: 47%;
	margin-top: 7px;
}

.list_div {
  width: 40%;
  margin: auto;
  margin-top: 5px;
  box-shadow:  3px 3px 5px 2px #d8d5d5;
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
	width: 40%;
	margin: auto;
	background: #EFF7F5;
	height: 50px;
	color: white;
	text-align: center;
	vertical-align: middle;
	line-height: 45px;
	margin-top: 5px;
	box-shadow:  3px 3px 5px 2px #d8d5d5;
	height: auto;
}
.width-40 {
  width: 40px;
}

.mt-10 {
  margin-top: 10px;
}

.search_input {
    height: 65px;
    margin-top: 5px !important;
    margin-left: 10px !important;
}

.clear_btn {
	height: 40px;
	float: right;
	font-size: 12px;
	border-radius: 20px !important;
}

.mb-30 {
	margin-bottom: 30px;
}

.delete_icon {
	font-size: 19px !important;
    margin-right: 5px;
    margin-top: -6px;
}

</style>

