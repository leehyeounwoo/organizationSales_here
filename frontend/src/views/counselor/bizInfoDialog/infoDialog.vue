<template>
	<v-dialog v-model="dialogInfo.open" persistent content-class="qr-modal" max-width="400">
		<v-layout class="qr-header" :style="`background-color:${$store.state.primary2}`" align-center>
			<div class="main-title">
				{{ dialogInfo.business.title }}
			</div>
			<v-btn icon @click="dialogInfo.open = false" dark class="pr-8">
				<v-icon>mdi-close</v-icon>
			</v-btn>
		</v-layout>
		<div class="biz-card-dialog" style="border:none !important;">
			<v-layout wrap v-for="(card, i) in dialogInfo.bizData" :key="i" class="cardLayouot">
				<v-flex xs3>
					<div class="cardTitle" style="width:70px; font-weight:normal;">
						{{ card.title }}
					</div>
				</v-flex>
				<v-flex xs9>
					<v-layout v-if="i === 5" class="ml-2 business_product_head" wrap style="width:180px;">
						<v-flex xs12>
							<v-layout>
								<div class="product-layout">
									타입
								</div>
								<div class="product-layout">
									세대수
								</div>
								<div class="product-layout">
									잔여세대
								</div>
							</v-layout>
						</v-flex>
						<v-flex xs12>
							<v-layout wrap class="business_product_wrap">
								<v-flex xs12 v-for="(product, i) in dialogInfo.productsList" :key="i" class="mt-2 business_product">
									<v-layout>
										<div class="product-layout">
											{{ product.type }}
										</div>
										<div class="product-layout">{{ product.total }}세대</div>
										<div class="product-layout">{{ product.available }}세대</div>
									</v-layout>
								</v-flex>
							</v-layout>
						</v-flex>
					</v-layout>
					<div class="cardValue ml-2" v-else style="font-weight:300; word-break:break-all;">
						{{ card.value }}
					</div>
				</v-flex>
			</v-layout>
			<div class="mt-5" style="text-align:center">
				<v-btn style="font-weight:bold;" color="primary2" dark depressed rounded width="120" height="40" @click="dialogInfo.open = false">
					확인
				</v-btn>
			</div>
		</div>
	</v-dialog>
</template>
<script>
export default {
	props: {
		dialogInfo: Object,
	},
	created() {},
	methods: {},
}
</script>
<style lang="scss">
.qr-code {
	width: 100%;
}
.qr-text {
	font-size: 14px;
	color: #828282;
}
.qr-modal {
	background-color: white;
	border-radius: 0 0 41px 41px !important;
	padding: 0px;
}
.qr-header {
	height: 50px;
	.main-title {
		padding-left: 30px;
		color: white;
		font-size: 14px;
		font-weight: bold;
		margin-right: auto;
	}
}
</style>
