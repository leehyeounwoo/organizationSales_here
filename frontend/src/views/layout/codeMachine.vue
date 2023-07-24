<template>
	<div class="admin">
		<left-nav />
		<!-- Dashboard -->
		<v-main class="dashboard pl-6">
			<v-container>
				<!-- Content -->
				<v-row wrap class="dashboard-content">
					<v-col>
						<app-main />
					</v-col>
				</v-row>
			</v-container>
		</v-main>
	</div>
</template>
<script>
import { AppMain, leftNav } from '../codeMachine'
export default {
	components: {
		AppMain,
		leftNav,
	},
}
</script>
<style lang="scss" scoped>
.dashboard {
	max-width: 87% !important;
}
</style>
