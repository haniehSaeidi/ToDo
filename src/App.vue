<template>
	<v-app>
		<v-content>
			<Test></Test>
		</v-content>
	</v-app>
</template>

<script>
import HelloWorld from './components/HelloWorld'
import Test from './components/Test'
import Add from './components/Add'

export default {
	name: 'App',
	components: {
		HelloWorld,
		Test: Test,
		Add: Add
	},
	data () {
		return {
		}
	}
}
</script>

<style>
	
</style>
