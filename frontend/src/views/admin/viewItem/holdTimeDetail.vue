<template>
	<v-dialog persistent v-model="setdialog.dialog" width="90%">
		<div class="create_wrap">
			<div class="project_title px-5">
				<span style="font-size:15px">배정 현황</span>
				<v-spacer />
				<v-icon @click="setdialog.dialog = false" class="title-icon" color="white">mdi-close</v-icon>
			</div>
			<v-layout class="pt-7 px-10">
				<v-flex xs5 class="mr-12">
					<v-layout align-center>
						<div class="slash mr-1"></div>
						<span style="font-weight:bold">배정 현황</span>
						<span class="table_info ml-3">{{ setdialog.todayTime }} 현재</span>
					</v-layout>
				</v-flex>
			</v-layout>
			<v-layout class="px-10">
				<v-flex xs12>
					<datatable :datatable="setdialog.holdingDashboard" :updateAssignmentAction="updateAssignmentAction"></datatable>
				</v-flex>
			</v-layout>
			<v-layout class="px-10" justify-end>
				<v-btn class="my-4 save_biz" @click="setdialog.dialog = false"><v-icon>mdi-check</v-icon>확인</v-btn>
			</v-layout>
		</div>
	</v-dialog>
</template>

<script>
import { datatable } from '@/components/index.js'

export default {
	components: {
		datatable,
	},
	props: {
		setdialog: Object,
		updateAssignmentAction: Function,
	},
	data() {
		return {}
	},
	methods: {},
}
</script>

<style></style>
