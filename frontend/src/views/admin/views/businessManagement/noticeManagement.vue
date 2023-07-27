<template>
	<div class="mt-7">
		<v-layout align-center justify-end class="header_search">
			<txtField class="search_box_type" v-model="search_notice" :txtField="search"></txtField>
			<v-btn class="ml-3 search_btn" color="#009dac"><v-icon>mdi-magnify</v-icon>조회</v-btn>
		</v-layout>
	</div>
</template>

<script>
import { txtField } from '@/components/index.js'

export default {
	components: {
		txtField,
	},
	data() {
		return {
			search_notice: '',
			search: {
				maxlength: '255',
				outlined: true,
				backCol: 'white',
			},
		}
	},
}
</script>

<style></style>
