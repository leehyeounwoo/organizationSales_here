<template>
	<div class="leftNav_wrap">
		<v-layout v-if="$vuetify.breakpoint.xs" class="pa-4" justify-end>
			<v-icon @click="$store.state.drawer = false">mdi-close</v-icon>
		</v-layout>
		<v-layout class="logoLayout" style="">
			<v-img
				v-if="$store.state.logoUrl !== '' && $store.state.logoUrl"
				@click="$router.push({ name: 'businessSiteManagement' }).catch(() => {}), ($store.state.drawer = false)"
				:src="$store.state.logoUrl"
				lazy-src="/image/reserve_lite logo.png"
			></v-img>
			<v-layout
				v-else
				justify-center
				@click="$router.push({ name: 'businessSiteManagement' }).catch(() => {}), ($store.state.drawer = false)"
				style="cursor:pointer;"
			>
				<v-layout justify-center>
					<v-img contain max-width="115.6" max-height="30" src="../../../assets/images/reserve_lite logo.png"></v-img>
				</v-layout>
			</v-layout>
		</v-layout>
		<div v-for="(list, index) in $store.state.dashBoardList" :key="index">
			<v-layout
				:class="index === 0 ? 'active' : 'listNav'"
				justify-center
				align-center
				:style="list.click ? `background-color:${$store.state.PointColor2}; border-radius:1vh; color:white` : `border-radius:1vh;`"
				@click.stop="listClick(list)"
			>
				<v-flex style="text-align:center;">
					<div>{{ list.title }}</div>
				</v-flex>
			</v-layout>
			<v-divider v-if="index === 0" style="width:166px; padding-bottom:6px; margin:0 auto"></v-divider>
		</div>
	</div>
</template>

<script>
export default {
	data() {
		return {}
	},

	created() {},
	methods: {
		listClick(list) {
			this.$store.state.drawer = false
			if (list.title !== '방문예약 생성') {
				this.$router.push({ name: list.name }).catch(() => {})
				this.$store.state.dashBoardList.forEach(element => {
					element.click = false
				})
				list.click = true
			} else {
				this.createDialog.dialog = true
			}
			this.closeRight()
		},
		closeRight() {
			this.$store.state.bellStatus = false
			this.$store.state.chatStatus = false
		},
	},
}
</script>

<style lang="scss" scoped>
.active {
	cursor: pointer;
	margin: 14px 14px 20px !important;
	background: #ffae28;
	color: white;
	width: 166px;
	height: 40px;
}
.active:hover {
	background-color: var(--point2-color);
	color: white;
	border-radius: 1vh;
	transition: 0.5s;
}
.listNav {
	cursor: pointer;
	margin: 14px !important;
	background: #e4e4eb;
	width: 166px;
	height: 40px;
}
.listNav:hover {
	background-color: var(--point2-color);
	color: white;
	border-radius: 1vh;
	transition: 0.5s;
}
</style>

<style lang="scss">
:root {
	--point1-color: rgb(222, 222, 222);
	--point2-color: #323153;
	--point3-color: #ffae28;
	--info-color: blue;
}
.leftNav_wrap {
	width: 200px;
}
.logoLayout {
	padding-top: 22px;
	padding-bottom: 31px;
}
</style>
