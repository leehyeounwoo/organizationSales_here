<template>
	<div style="width:100%;">
		<v-layout align-center class="header_search" justify-end>
			<v-flex>
				<span class="mr-4 ml-4">
					6개팀 / 120명
				</span>
				<span class="mr-2">
					근무:110명
				</span>
				<span class="mr-2">
					휴무:5명
				</span>
				<span>
					미확인:5명
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
			<v-flex xs2>
				<v-layout>
					1팀/20명
				</v-layout>
				<v-layout>
					<v-flex>16명</v-flex>
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

<style></style>
