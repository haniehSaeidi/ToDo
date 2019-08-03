<template>
	<v-app>
		<v-content>
			<Task></Task>
		</v-content>
	</v-app>
</template>

<script>
import Task from './components/Task'


export default {
	name: 'App',
	components: {
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
