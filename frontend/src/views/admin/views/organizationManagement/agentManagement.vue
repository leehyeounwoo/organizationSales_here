<template>
	<div style="width:100%;">
		<v-layout align-center class="header_search" justify-end>
			<v-flex style="font-size:0.75rem;">
				<span class="mr-4 ml-4" style="font-weight:bold;">
					6개팀 / 120명
				</span>
				<span class="mr-2 pa-1 blueBox">
					근무 : 110명
				</span>
				<span class="mr-2 pa-1" style="background-color:rgb(79, 213, 72); color:white; border:1px solid black;">
					휴무 : 5명
				</span>
				<span class="pa-1" style="background-color:rgb(213, 175, 72); color:white; border:1px solid black;">
					미확인 : 5명
				</span>
			</v-flex>
			<v-spacer></v-spacer>
			<v-flex class="search_select ml-3 mr-2 " style="width: 149px !important; max-width:149px !important;">
				<selectBox :sel="searchsel1" :class="'searchSel'" style="font-size:12px"></selectBox>
			</v-flex>
			<v-flex class="search_select ml-3 mr-2 " style="width: 149px !important; max-width:149px !important;">
				<selectBox :sel="searchsel2" :class="'searchSel'" style="font-size:12px"></selectBox>
			</v-flex>
			<v-flex style="max-width:200px;">
				<txtField class="search_box_admin" v-model="search_project" :txtField="search"></txtField>
			</v-flex>
			<v-flex class="ml-3" style="max-width:100px;">
				<v-btn class="search_btn" color="#5d19ff" @click="SearchBiz()" elevation="0"><v-icon>mdi-magnify</v-icon>조회</v-btn>
			</v-flex>
		</v-layout>
		<v-layout>
			<v-flex xs2 mt-1 style="font-size:0.75rem;">
				<v-layout justify-center style="border:1px solid black">
					1팀/20명
				</v-layout>
				<v-layout>
					<v-flex class="blueBox">16명</v-flex>
					<v-flex>2명</v-flex>
					<v-flex>2명</v-flex>
				</v-layout>
				<v-layout>
					<v-flex xs6>
						<v-layout>
							<v-flex xs4>
								사진
							</v-flex>
							<v-flex xs8>
								<v-layout>상담사명</v-layout>
								<v-layout wrap>
									<v-flex xs12>계약수</v-flex>
									<v-flex xs12>12건</v-flex>
								</v-layout>
							</v-flex>
						</v-layout>
					</v-flex>
					<v-flex xs6>
						<v-layout>
							<v-flex xs4>
								사진
							</v-flex>
							<v-flex xs8>
								<v-layout>상담사명</v-layout>
								<v-layout wrap>
									<v-flex xs12>계약수</v-flex>
									<v-flex xs12>12건</v-flex>
								</v-layout>
							</v-flex>
						</v-layout>
					</v-flex>
				</v-layout>
			</v-flex>
		</v-layout>
	</div>
</template>

<script>
import {
	selectBox,
	txtField,
	//  btn
} from '@/components/index.js'
export default {
	components: {
		selectBox,
		txtField,
		// btn,
	},
	data() {
		return {
			searchsel1: {
				value: '',
				errorMessage: '',
				hideDetail: true,
				items: [],
				outlined: true,
				placeholder: '팀선택',
				returnObject: true,
				itemText: 'title',
			},
			searchsel2: {
				value: '',
				errorMessage: '',
				hideDetail: true,
				items: [],
				outlined: true,
				placeholder: '재직상태',
				returnObject: true,
				itemText: 'title',
			},
			search: {
				clearable: false,
				maxlength: '255',
				outlined: true,
				backCol: 'white',
			},
			search_project: '',
		}
	},
	methods: {
		SearchBiz() {},
	},
}
</script>

<style>
.blueBox {
	background-color: rgb(72, 72, 213);
	color: white;
	border: 1px solid black;
}
</style>
