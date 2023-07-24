<template>
	<!-- Nav -->
	<v-navigation-drawer v-model="$store.state.leftNavDrawer" color="#2C50EE" width="250" class="nav-left">
		<!-- profile -->
		<template v-slot:prepend>
			<v-list-item two-line>
				<v-list-item-avatar>
					<img src="/image/dummy.png" alt="dummy" />
				</v-list-item-avatar>

				<v-list-item-content>
					<v-list-item-title>OMB</v-list-item-title>
					<v-list-item-subtitle>Logged In</v-list-item-subtitle>
				</v-list-item-content>
			</v-list-item>
		</template>

		<!-- hr -->
		<!-- <v-divider></v-divider> -->

		<!-- 왼쪽 nav -->
		<v-list dark>
			<v-list-item-group>
				<v-list-item @click="$router.push({ name: 'mainBoard' })">
					<v-list-item-icon>
						<v-icon>mdi-monitor-dashboard</v-icon>
					</v-list-item-icon>
					<v-list-item-content>
						<v-list-item-title>대쉬보드</v-list-item-title>
					</v-list-item-content>
				</v-list-item>
			</v-list-item-group>
			<v-list-group v-for="(nav, i) in leftNavs" :key="i" v-model="nav.active" :prepend-icon="nav.action" no-action color="white">
				<template v-slot:activator>
					<v-list-item-content>
						<v-list-item-title v-text="nav.title"></v-list-item-title>
					</v-list-item-content>
				</template>

				<v-list-item v-for="navItem in nav.items" :key="navItem.title" @click="$router.push({ name: navItem.to })">
					<v-list-item-content>
						<v-list-item-title v-text="navItem.title"></v-list-item-title>
					</v-list-item-content>
				</v-list-item>
			</v-list-group>
		</v-list>
	</v-navigation-drawer>
</template>
<script>
export default {
	data() {
		return {
			drawer: true,
			leftNavs: [
				{
					action: 'mdi-account-circle',
					title: '고객 관리',
					items: [{ title: 'Breakfast & brunch' }],
				},
			], // 왼쪽 nav
		};
	},
};
</script>
<style lang="scss" scoped>
.nav-left {
	border-radius: 0 0 30px 0;
}
</style>
