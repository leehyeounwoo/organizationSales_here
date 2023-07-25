<template>
	<v-btn
		:class="btn.class"
		depressed
		:dense="btn.dense"
		:width="btn.width"
		:outlined="btn.outlined"
		:fab="btn.fab"
		:small="btn.small"
		:x-small="btn.xsmall"
		:block="btn.block"
		:large="btn.large"
		:x-large="btn.xlarge"
		@click="$emit('click', $event)"
		:height="btn.height"
		:disabled="disabled"
		:icon="btn.icon"
		:dark="btn.dark"
		:ripple="false"
		:text="btn.text"
		:rounded="btn.rounded"
		:color="btn.color !== undefined ? btn.color : $store.state.PointColor1"
	>
		<div :class="btn.classtxt">
			{{ btn_txt }}
		</div>
		<v-icon v-if="btn.iconMdi" :size="btn.iconSize" :color="btn.iconColor">{{ btn_icon }}</v-icon>
	</v-btn>
</template>

<script>
export default {
	props: {
		btn: Object,
		btn_txt: String,
		btn_icon: String,
		click: Function,
		disabled: Boolean,
	},
}
</script>

<style lang="scss">
.radius5vh {
	border-radius: 5vh;
}
.calculator {
	font-size: 1.5rem;
	font-weight: bold;
}
.saveBtn {
	color: white !important;
	font-weight: bold;
	width: 100px;
	height: 38px;
}
.historyBtn {
	color: white !important;
	font-size: 12px !important;
	font-weight: bold;
	width: 90px;
	height: 30px !important;
}
.saveGreenBtn {
	color: white !important;
	font-weight: bold;
	width: 100px;
	height: 38px;
}
.testingBtn {
	color: white !important;
	font-weight: bold;
	width: 100px;
	height: 38px;
}
.cancelBtn {
	color: white !important;
	font-weight: bold;
	width: 100px;
	height: 38px;
}
.selectBtn {
	font-size: 16px !important;
	font-weight: bold !important;
	font-weight: 500 !important;
	width: 100px;
	height: 45px !important;
	background-color: #b2b2b2 !important;
}
.searchBtn {
	color: white !important;
	font-weight: bold !important;
	min-width: 100px;
	height: 38px;
}
.addBtn {
	color: white !important;
	font-weight: bold !important;
	width: 100px;
	height: 38px;
}
.addBtn2 {
	font-weight: bold !important;
	width: 100px;
	height: 38px;
	background-color: white !important;
}

.whiteBtn {
	border: 1px solid #d1d1d1 !important;
	background-color: white !important;
	border-radius: 5px;
	font-weight: bold;
	width: 100px;
	height: 36px;
}

.actionBtn {
	border: 1px solid #d1d1d1 !important;
	border-radius: 5px;
	font-weight: bold;
	width: 130px;
	height: 36px;
}

.connectionBtn {
	border: 1px solid #d1d1d1;
	border-radius: 5px;
	font-weight: bold;
	height: 38px;
}
.bold {
	font-weight: bold;
}
.arrowBtn {
	background-color: white;
	font-weight: bold;
}

.publishBtn {
	color: white !important;
	font-weight: bold !important;
	width: 100px;
	height: 38px;
	background-color: green !important;
}
.nextBtn {
	background-color: #fade0d !important;
	font-size: 16px !important;
	font-weight: bold !important;
}
.resnextBtn {
	background-color: #fade0d !important;
	font-size: 14px !important;
	font-weight: 500 !important;
	height: 45px !important;
}
.samplenextBtn {
	background-color: #202840 !important;
	font-size: 14px !important;
	font-weight: 500 !important;
	height: 45px !important;
}
.disabledBtn {
	background-color: #d1d1d1 !important;
	font-size: 16px !important;
	font-weight: 500 !important;
	height: 45px !important;
	background-color: #b2b2b2 !important;
}
.logoutBtn {
	background-color: #006a8e !important;
	color: white !important;
	font-size: 12px !important;
	font-weight: bold;
	width: 90px;
	height: 30px !important;
}
.sendBtn {
	background-color: #fade0d !important;
	font-size: 16px !important;
	// font-weight: bold !important;
}
.sendBtnSample {
	background-color: #fade0d !important;
	font-size: 16px !important;
	// font-weight: bold !important;
}
.qrCapture {
	// color: white !important;
	font-weight: bold;
	font-size: 1.2rem !important;
}
.backwardBtn {
	background-color: #d1d1d1 !important;
	color: white !important;
	font-weight: bold;
	width: 100px;
	height: 38px;
}
.blueOkBtn {
	background-color: white !important;
	color: #047ee2 !important;
	font-size: 16px !important;
	padding: 0px !important;
	// font-weight: bold !important;
}
.buyBtn {
	background-color: #202840 !important;
	color: #202840 !important;
	font-size: 16px !important;
	height: 40px !important;
}
.moveBtn {
	background-color: #202840 !important;
	font-size: 16px !important;
	height: 40px !important;
}
.askBtn {
	background-color: #202840 !important;
	font-size: 16px !important;
	height: 40px !important;
	padding: 0px !important;
}
.sampleStartBtn {
	background-color: #202840 !important;
	font-size: 16px !important;
	font-weight: 500 !important;
	height: 45px !important;
}
.sampledisabledBtn {
	background-color: #d1d1d1 !important;
	font-size: 16px !important;
	font-weight: 500 !important;
	height: 45px !important;
}
.headerBtn {
	min-width: 0px !important;
}
.customBtn {
	font-size: 16px !important;
	font-weight: bold !important;
	height: 45px !important;
}
</style>
