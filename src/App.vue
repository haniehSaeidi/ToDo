<template>
	<v-app>
		<v-content>
			<Task></Task>
		</v-content>
	</v-app>
</template>

<script>
import HelloWorld from './components/HelloWorld'
import Task from './components/Task'


export default {
	name: 'App',
	components: {
		HelloWorld,
		Task: Task,
	},
	data () {
		return {
		}
	}
}
</script>

<style>
	
</style>
