<template>
	<div
		:class="excelUseYn === 'true' ? datatable.class : `datatablehover2 ${datatable.class}`"
		class="datatablehover"
		style="position:relative"
	>
		<v-data-table
			calculate-widths
			show-current-page
			v-model="datatable.selected"
			:fixed-header="datatable.header_fixed"
			:headers="datatable.headers"
			:items="datatable.items"
			:hide-default-footer="datatable.hidedefaultfooter"
			:page.sync="datatable.page"
			:items-per-page="datatable.itemsPerPage"
			@page-count="datatable.pageCount = $event"
			:show-select="datatable.showselect"
			:search="search"
			:item-key="datatable.itemKey"
			@click:row="$emit('click', $event)"
			@input="$emit('input', $event)"
			:height="datatable.height"
			:mobile-breakpoint="datatable.breakpoint ? '1960' : '600'"
			:disable-sort="datatable.disableSort"
			:class="datatable.disableSort ? 'noSort' : ''"
			:footer-props="{
				['items-per-page-text']: `• Total : ${datatable.total ? datatable.total : datatable.items.length}`,
				['page-text']: ` 1 - ${
					datatable.itemsPerPage === -1
						? 1
						: datatable.total
						? Math.ceil(datatable.total / datatable.itemsPerPage)
						: datatable.itemsPerPage
						? Math.ceil(datatable.items.length / datatable.itemsPerPage)
						: Math.ceil(datatable.items.length / 10)
				} of ${datatable.page ? datatable.page : 1} `,
				['items-per-page-options']: datatable.itemsPerPage !== -1 ? [5, 10, 15, 20, 30] : [5, 10, 15, 20, 30, -1],
			}"
			@pagination="pagination"
			:no-data-text="datatable.noDataText"
			:server-items-length="datatable.total"
		>
			<template v-slot:[`header.team`]="{ header }">
				{{ header.text }}
				<v-icon small style="background-color:white; border: 0.1px solid gray;" @click="teamChoiceClick">mdi-format-list-group-plus</v-icon>
			</template>
			<template v-slot:[`item.visit`]="{}">
				<div>
					현장등록
				</div>
			</template>
			<template v-slot:[`item.kakakoAction`]="{ item }">
				<div>
					<v-btn dark :color="$store.state.PointColor2" @click="editacskey(item)">
						알림톡 생성
					</v-btn>
					<v-btn class="detail_etc_btn ml-3" :color="'#9A9C9B'" @click="previewClick(item)" depressed>
						미리보기
					</v-btn>
				</div>
			</template>

			<template v-slot:[`item.phone`]="{ item }">
				<div v-if="item.phone">
					{{ item.phone.replace(/^(\d{2,3})(\d{3,4})(\d{4})$/, `$1-$2-$3`) }}
				</div>
			</template>
			<template v-slot:[`item.mainPhone`]="{ item }">
				<div>
					{{ mainPhoneMask(item.mainPhone) }}
				</div>
			</template>
			<template v-slot:[`item.reserveGroupCode`]="{ item }">
				<div v-if="item.reserveGroupCode">
					{{ item.groupData[item.groupData.map(x => x.qrcode).indexOf(item.reserveGroupCode)].title }}
				</div>
			</template>
			<template v-slot:[`item.0_reservevisit`]="{ item }">
				<div class="reserveTd">
					<div class="py-1 label">
						{{ item['0_label'] }}
					</div>
					<div class="count py-2 label" v-if="item['0_label']">
						{{ `${item['0']} (${item['0'] > 0 ? ((item['0'] / item['Sum']) * 100).toFixed(0) : 0})%` }}
					</div>
				</div>
			</template>
			<template v-slot:[`item.1_reservevisit`]="{ item }">
				<div class="reserveTd">
					<div class="py-1 label">
						{{ item['1_label'] }}
					</div>
					<div class="count py-2 label" v-if="item['1_label']">
						{{ `${item['1']} (${item['1'] > 0 ? ((item['1'] / item['Sum']) * 100).toFixed(0) : 0})%` }}
					</div>
				</div>
			</template>
			<template v-slot:[`item.2_reservevisit`]="{ item }">
				<div class="reserveTd">
					<div class="py-1 label">
						{{ item['2_label'] }}
					</div>
					<div class="count py-2 label" v-if="item['2_label']">
						{{ `${item['2']} (${item['2'] > 0 ? ((item['2'] / item['Sum']) * 100).toFixed(0) : 0})%` }}
					</div>
				</div>
			</template>
			<template v-slot:[`item.3_reservevisit`]="{ item }">
				<div class="reserveTd">
					<div class="py-1 label">
						{{ item['3_label'] }}
					</div>
					<div class="count py-2 label" v-if="item['3_label']">
						{{ `${item['3']} (${item['3'] > 0 ? ((item['3'] / item['Sum']) * 100).toFixed(0) : 0})%` }}
					</div>
				</div>
			</template>
			<template v-slot:[`item.4_reservevisit`]="{ item }">
				<div class="reserveTd">
					<div class="py-1 label">
						{{ item['4_label'] }}
					</div>
					<div class="count py-2 label" v-if="item['4_label']">
						{{ `${item['4']} (${item['4'] > 0 ? ((item['4'] / item['Sum']) * 100).toFixed(0) : 0})%` }}
					</div>
				</div>
			</template>
			<template v-slot:[`item.5_reservevisit`]="{ item }">
				<div class="reserveTd">
					<div class="py-1 label">
						{{ item['5_label'] }}
					</div>
					<div class="count py-2 label" v-if="item['5_label']">
						{{ `${item['5']} (${item['5'] > 0 ? ((item['5'] / item['Sum']) * 100).toFixed(0) : 0})%` }}
					</div>
				</div>
			</template>
			<template v-slot:[`item.6_reservevisit`]="{ item }">
				<div class="reserveTd">
					<div class="py-1 label">
						{{ item['6_label'] }}
					</div>
					<div class="count py-2 label" v-if="item['6_label']">
						{{ `${item['6']} (${item['6'] > 0 ? ((item['6'] / item['Sum']) * 100).toFixed(0) : 0})%` }}
					</div>
				</div>
			</template>
			<template v-slot:[`item.7_reservevisit`]="{ item }">
				<div class="reserveTd">
					<div class="py-1 label">
						{{ item['7_label'] }}
					</div>
					<div class="count py-2 label" v-if="item['7_label']">
						{{ `${item['7']} (${item['7'] > 0 ? ((item['7'] / item['Sum']) * 100).toFixed(0) : 0})%` }}
					</div>
				</div>
			</template>
			<template v-slot:[`item.8_reservevisit`]="{ item }">
				<div class="reserveTd">
					<div class="py-1 label">
						{{ item['8_label'] }}
					</div>
					<div class="count py-2 label" v-if="item['8_label']">
						{{ `${item['8']} (${item['8'] > 0 ? ((item['8'] / item['Sum']) * 100).toFixed(0) : 0})%` }}
					</div>
				</div>
			</template>
			<template v-slot:[`item.9_reservevisit`]="{ item }">
				<div class="reserveTd">
					<div class="py-1 label">
						{{ item['9_label'] }}
					</div>
					<div class="count py-2 label" v-if="item['9_label']">
						{{ `${item['9']} (${item['9'] > 0 ? ((item['9'] / item['Sum']) * 100).toFixed(0) : 0})%` }}
					</div>
				</div>
			</template>
			<template v-slot:[`item.10_reservevisit`]="{ item }">
				<div class="reserveTd">
					<div class="py-1 label">
						{{ item['10_label'] }}
					</div>
					<div class="count py-2 label" v-if="item['10_label']">
						{{ `${item['10']} (${item['10'] > 0 ? ((item['10'] / item['Sum']) * 100).toFixed(0) : 0})%` }}
					</div>
				</div>
			</template>
			<template v-slot:[`item.11_reservevisit`]="{ item }">
				<div class="reserveTd">
					<div class="py-1 label">
						{{ item['11_label'] }}
					</div>
					<div class="count py-2 label" v-if="item['11_label']">
						{{ `${item['11']} (${item['11'] > 0 ? ((item['11'] / item['Sum']) * 100).toFixed(0) : 0})%` }}
					</div>
				</div>
			</template>
			<template v-slot:[`item.12_reservevisit`]="{ item }">
				<div class="reserveTd">
					<div class="py-1 label">
						{{ item['12_label'] }}
					</div>
					<div class="count py-2 label" v-if="item['12_label']">
						{{ `${item['12']} (${item['12'] > 0 ? ((item['12'] / item['Sum']) * 100).toFixed(0) : 0})%` }}
					</div>
				</div>
			</template>
			<template v-slot:[`item.13_reservevisit`]="{ item }">
				<div class="reserveTd">
					<div class="py-1 label">
						{{ item['13_label'] }}
					</div>
					<div class="count py-2 label" v-if="item['13_label']">
						{{ `${item['13']} (${item['13'] > 0 ? ((item['13'] / item['Sum']) * 100).toFixed(0) : 0})%` }}
					</div>
				</div>
			</template>
			<template v-slot:[`item.14_reservevisit`]="{ item }">
				<div class="reserveTd">
					<div class="py-1 label">
						{{ item['14_label'] }}
					</div>
					<div class="count py-2 label" v-if="item['14_label']">
						{{ `${item['14']} (${item['14'] > 0 ? ((item['14'] / item['Sum']) * 100).toFixed(0) : 0})%` }}
					</div>
				</div>
			</template>
			<template v-slot:[`item.15_reservevisit`]="{ item }">
				<div class="reserveTd">
					<div class="py-1 label">
						{{ item['15_label'] }}
					</div>
					<div class="count py-2 label" v-if="item['15_label']">
						{{ `${item['15']} (${item['15'] > 0 ? ((item['15'] / item['Sum']) * 100).toFixed(0) : 0})%` }}
					</div>
				</div>
			</template>
			<template v-slot:[`item.0_visit`]="{ item }">
				<div class="reserveTd">
					<div class="py-1 label">
						{{ item['0_label'] }}
					</div>
					<div class="count py-2 label" v-if="item['0_label']">
						{{ `${item['0']} (${item['0'] > 0 ? ((item['0'] / item['Sum']) * 100).toFixed(0) : 0})%` }}
					</div>
				</div>
			</template>
			<template v-slot:[`item.1_visit`]="{ item }">
				<div class="reserveTd">
					<div class="py-1 label">
						{{ item['1_label'] }}
					</div>
					<div class="count py-2 label" v-if="item['1_label']">
						{{ `${item['1']} (${item['1'] > 0 ? ((item['1'] / item['Sum']) * 100).toFixed(0) : 0})%` }}
					</div>
				</div>
			</template>
			<template v-slot:[`item.2_visit`]="{ item }">
				<div class="reserveTd">
					<div class="py-1 label">
						{{ item['2_label'] }}
					</div>
					<div class="count py-2 label" v-if="item['2_label']">
						{{ `${item['2']} (${item['2'] > 0 ? ((item['2'] / item['Sum']) * 100).toFixed(0) : 0})%` }}
					</div>
				</div>
			</template>
			<template v-slot:[`item.3_visit`]="{ item }">
				<div class="reserveTd">
					<div class="py-1 label">
						{{ item['3_label'] }}
					</div>
					<div class="count py-2 label" v-if="item['3_label']">
						{{ `${item['3']} (${item['3'] > 0 ? ((item['3'] / item['Sum']) * 100).toFixed(0) : 0})%` }}
					</div>
				</div>
			</template>
			<template v-slot:[`item.4_visit`]="{ item }">
				<div class="reserveTd">
					<div class="py-1 label">
						{{ item['4_label'] }}
					</div>
					<div class="count py-2 label" v-if="item['4_label']">
						{{ `${item['4']} (${item['4'] > 0 ? ((item['4'] / item['Sum']) * 100).toFixed(0) : 0})%` }}
					</div>
				</div>
			</template>
			<template v-slot:[`item.5_visit`]="{ item }">
				<div class="reserveTd">
					<div class="py-1 label">
						{{ item['5_label'] }}
					</div>
					<div class="count py-2 label" v-if="item['5_label']">
						{{ `${item['5']} (${item['5'] > 0 ? ((item['5'] / item['Sum']) * 100).toFixed(0) : 0})%` }}
					</div>
				</div>
			</template>
			<template v-slot:[`item.6_visit`]="{ item }">
				<div class="reserveTd">
					<div class="py-1 label">
						{{ item['6_label'] }}
					</div>
					<div class="count py-2 label" v-if="item['6_label']">
						{{ `${item['6']} (${item['6'] > 0 ? ((item['6'] / item['Sum']) * 100).toFixed(0) : 0})%` }}
					</div>
				</div>
			</template>
			<template v-slot:[`item.7_visit`]="{ item }">
				<div class="reserveTd">
					<div class="py-1 label">
						{{ item['7_label'] }}
					</div>
					<div class="count py-2 label" v-if="item['7_label']">
						{{ `${item['7']} (${item['7'] > 0 ? ((item['7'] / item['Sum']) * 100).toFixed(0) : 0})%` }}
					</div>
				</div>
			</template>
			<template v-slot:[`item.8_visit`]="{ item }">
				<div class="reserveTd">
					<div class="py-1 label">
						{{ item['8_label'] }}
					</div>
					<div class="count py-2 label" v-if="item['8_label']">
						{{ `${item['8']} (${item['8'] > 0 ? ((item['8'] / item['Sum']) * 100).toFixed(0) : 0})%` }}
					</div>
				</div>
			</template>
			<template v-slot:[`item.9_visit`]="{ item }">
				<div class="reserveTd">
					<div class="py-1 label">
						{{ item['9_label'] }}
					</div>
					<div class="count py-2 label" v-if="item['9_label']">
						{{ `${item['9']} (${item['9'] > 0 ? ((item['9'] / item['Sum']) * 100).toFixed(0) : 0})%` }}
					</div>
				</div>
			</template>
			<template v-slot:[`item.10_visit`]="{ item }">
				<div class="reserveTd">
					<div class="py-1 label">
						{{ item['10_label'] }}
					</div>
					<div class="count py-2 label" v-if="item['10_label']">
						{{ `${item['10']} (${item['10'] > 0 ? ((item['10'] / item['Sum']) * 100).toFixed(0) : 0})%` }}
					</div>
				</div>
			</template>
			<template v-slot:[`item.11_visit`]="{ item }">
				<div class="reserveTd">
					<div class="py-1 label">
						{{ item['11_label'] }}
					</div>
					<div class="count py-2 label" v-if="item['11_label']">
						{{ `${item['11']} (${item['11'] > 0 ? ((item['11'] / item['Sum']) * 100).toFixed(0) : 0})%` }}
					</div>
				</div>
			</template>
			<template v-slot:[`item.12_visit`]="{ item }">
				<div class="reserveTd">
					<div class="py-1 label">
						{{ item['12_label'] }}
					</div>
					<div class="count py-2 label" v-if="item['12_label']">
						{{ `${item['12']} (${item['12'] > 0 ? ((item['12'] / item['Sum']) * 100).toFixed(0) : 0})%` }}
					</div>
				</div>
			</template>
			<template v-slot:[`item.13_visit`]="{ item }">
				<div class="reserveTd">
					<div class="py-1 label">
						{{ item['13_label'] }}
					</div>
					<div class="count py-2 label" v-if="item['13_label']">
						{{ `${item['13']} (${item['13'] > 0 ? ((item['13'] / item['Sum']) * 100).toFixed(0) : 0})%` }}
					</div>
				</div>
			</template>
			<template v-slot:[`item.14_visit`]="{ item }">
				<div class="reserveTd">
					<div class="py-1 label">
						{{ item['14_label'] }}
					</div>
					<div class="count py-2 label" v-if="item['14_label']">
						{{ `${item['14']} (${item['14'] > 0 ? ((item['14'] / item['Sum']) * 100).toFixed(0) : 0})%` }}
					</div>
				</div>
			</template>
			<template v-slot:[`item.15_visit`]="{ item }">
				<div class="reserveTd">
					<div class="py-1 label">
						{{ item['15_label'] }}
					</div>
					<div class="count py-2 label" v-if="item['15_label']">
						{{ `${item['15']} (${item['15'] > 0 ? ((item['15'] / item['Sum']) * 100).toFixed(0) : 0})%` }}
					</div>
				</div>
			</template>
			<template v-slot:[`item.noAnswer`]="{ item }">
				<div class="reserveTd">
					<div class="py-1 label">
						무응답
					</div>
					<div class="count py-2 label">
						{{ `${item.noAnswer ? item.noAnswer : 0} (${item.noAnswer > 0 ? ((item.noAnswer / item['Sum']) * 100).toFixed(0) : 0})%` }}
					</div>
				</div>
			</template>
			<template v-slot:[`item.message_1`]="{ item }">
				<div>
					{{ item.message_1.substring(item.message_1.indexOf('[') + 1, item.message_1.indexOf(']')) }}
				</div>
			</template>
			<template v-slot:[`item.systemDate`]="{ item }">
				<div>
					{{ item.sdate | moment('YYYY-MM-DD') }} ~ {{ item.edate | moment('YYYY-MM-DD') }}
					<span class="ml-2">
						{{ Math.abs($moment(item.sdate).diff($moment(item.edate), 'days')) }}
					</span>
					일간
				</div>
			</template>
			<template v-slot:[`item.reserveday`]="{ item }">
				<div>
					{{ item.reservedays.map(x => x.title).join(', ') }}
				</div>
			</template>

			<template v-slot:[`item.cancel_visit`]="{ item }">
				<div v-if="item.status === 2">{{ item.updated_at | moment('YYYY-MM-DD HH:mm') }}</div>
			</template>
			<template v-slot:[`item.state_visit_date`]="{ item }">
				<div v-if="item.state === 'visit'">{{ item.updated_at | moment('YYYY-MM-DD HH:mm') }}</div>
			</template>
			<template v-slot:[`item.state_visit`]="{ item }">
				<div :class="item.state === 'reserve' ? '' : 'success--text'" v-if="item.status !== 2">
					{{ item.state === 'reserve' ? '미방문' : '방문' }}
				</div>
				<div class="error--text" v-else>취소</div>
			</template>
			<template v-slot:[`item.range`]="{ item }">
				<div v-if="item.sdate !== '-'">{{ item.sdate | moment('YYYY-MM-DD') }} ~ {{ item.edate | moment('YYYY-MM-DD') }}</div>
				<div v-else>-</div>
			</template>

			<template v-slot:[`item.range_camapign`]="{ item }">
				<div>
					{{ item.range_camapign }}
				</div>
			</template>

			<template v-slot:[`item.businesses_title`]="{ item }">
				<div>
					{{ item.businesses.map(x => x.title).join(', ') }}
				</div>
			</template>
			<template v-slot:[`item.history_length`]="{ item }">
				<div>{{ item.history ? item.history.length - 1 : '0' }}건</div>
			</template>
			<template v-slot:[`item.showing`]="{ item }">
				<div>
					{{ item.stat === 1 ? '사용' : '미사용' }}
				</div>
			</template>
			<template v-slot:[`item.user_name`]="{ item }">
				<div>
					{{ item.name }}
				</div>
			</template>

			<template v-slot:[`item.winner`]="{ item }">
				<div :class="item.winner ? 'success--text' : 'error--text'">
					{{ item.winner ? '당첨' : '미당첨' }} {{ item.winner ? '(' + item.winnterProduct + ')' : '' }}
				</div>
			</template>
			<template v-slot:[`item.receiptDate`]="{ item }">
				<div>
					{{
						item.receiptDate
							? $moment(item.receiptDate)
									.subtract(9, 'h')
									.format('YYYY-MM-DD HH:mm')
							: ''
					}}
				</div>
			</template>
			<template v-slot:[`item.created_at_time`]="{ item }">
				<div v-if="item.created_at">
					{{ item.created_at | moment('YYYY-MM-DD HH:mm') }}
				</div>
			</template>
			<template v-slot:[`item.updated_at_time`]="{ item }">
				<div>
					{{ item.updated_at | moment('YYYY-MM-DD HH:mm') }}
				</div>
			</template>
			<template v-slot:[`item.created_at`]="{ item }">
				<div>
					{{ item.created_at | moment('YYYY-MM-DD') }}
				</div>
			</template>
			<template v-slot:[`item.updated_at`]="{ item }">
				<div>
					{{ item.updated_at | moment('YYYY-MM-DD') }}
				</div>
			</template>

			<!-- bizCounselor -->
			<!-- <template v-slot:[`item.name`]="{ item }">
				<v-layout class="nomal-input px-2" style=" max-width:200px !important; border:none !important;">
					<div class="bizInput">
						<v-text-field
							maxlength="255"
							v-model="item.name"
							:hide-details="true"
							:outlined="true"
							type="text"
							:autofocus="true"
							:autocomplete="true"
							placeholder="상담사명"
							dense
						>
						</v-text-field>
					</div>
				</v-layout>
			</template> -->
			<!-- bizCounselor -->
			<template v-slot:[`item.seat`]="{ item }">
				<v-layout class="nomal-input px-2" style=" max-width:200px !important; border:none !important;">
					<div class="bizInput">
						<v-text-field
							v-model="item.seat"
							:hide-details="true"
							:outlined="true"
							type="Number"
							:autofocus="true"
							:autocomplete="true"
							placeholder="상담석"
							dense
							:max="99"
							:oninput="
								99
									? 'if(Number(this.value) > Number(this.max)) this.value = this.max'
									: 'if(Number(this.value) > Number(this.max)) this.value = null'
							"
						>
						</v-text-field>
					</div>
				</v-layout>
			</template>
			<template v-slot:[`item.counselorName`]="{ item }">
				<div>
					{{ item.counselorName }}
				</div>
			</template>
			<!-- bizCounselor -->
			<!-- <template v-slot:[`item.counselorid`]="{ item }">
				<v-layout class="nomal-input px-2" style=" max-width:200px !important; border:none !important;">
					<div class="bizInput">
						<v-text-field
							maxlength="255"
							v-model="item.counselorid"
							:hide-details="true"
							:outlined="true"
							type="text"
							:autofocus="true"
							:autocomplete="true"
							placeholder="아이디"
							dense
						>
						</v-text-field>
					</div>
				</v-layout>
			</template> -->
			<!-- bizCounselor -->
			<!-- bizCounselor -->
			<template v-slot:[`item.actionCounselor`]="{ item, index }">
				<v-layout justify-center>
					<div>
						<v-btn @click="apply(item, index)" class="mx-2 applyBtn" color="#F3F3FF" size="small" height="27" elevation="0">적용</v-btn>
						<v-btn @click="applydelete(item, index)" class="mx-2 applyBtn" color="#F3F3FF" size="small" height="27" elevation="0"
							>삭제</v-btn
						>
					</div>
				</v-layout>
			</template>
			<!-- Password -->
			<template v-slot:[`item.Password`]="{ item }">
				<v-layout>
					<!-- {{ item.indexOf(item.id) }} -->
					<div class="password_btn" @click="setIndexNum(item.userId)">
						<v-btn class="" @click="pwchange(item)" depressed>CHANGE</v-btn>
					</div>
				</v-layout>
			</template>

			<!-- Action -->
			<template v-slot:[`item.Action`]="{ item }">
				<v-layout>
					<div v-if="$store.state.meData.id !== item.lgnid" class="action_btn" @click="setIndexNum(item.userId)">
						<v-btn class="" @click="deleteacskey(item)" depressed>Delete</v-btn>
					</div>
				</v-layout>
			</template>

			<!-- Access -->
			<template v-slot:[`item.accessPermission`]="{ item }">
				<v-layout style="height:38;px">
					<div>
						<v-switch
							v-model="item.accessPermission"
							:color="$store.state.PointColor2"
							@change="accessChange(item, item.accessPermission)"
						></v-switch>
					</div>
				</v-layout>
			</template>

			<!-- img FIle -->
			<template v-slot:[`item.imgUpload`]="{ item }">
				<v-layout style="height:38;px " justify-center>
					<div v-for="(img, i) in item.imgUpload" :key="i" class="mr-2">
						<v-img width="40" :src="img" @click="showUsesImg(item.imgUpload)"></v-img>
					</div>
				</v-layout>
			</template>

			<!-- stat -->
			<template v-slot:[`item.stat`]="{ item }">
				<div
					v-if="$route.name == 'counselor-management' && item.stat == false"
					:class="item.stat == false ? ['dt-align-set', 'font-red'] : ['dt-align-set']"
				>
					휴무
				</div>
				<div
					v-else-if="$route.name == 'counselor-management' && item.stat == true"
					:class="item.stat == true ? ['dt-align-set', 'font-green'] : ['dt-align-set']"
				>
					근무
				</div>
				<div
					v-else-if="$route.name == 'businessSiteManagement' && item.stat == false"
					:class="item.stat == false ? ['dt-align-set', 'font-red'] : ['dt-align-set']"
				>
					휴무
				</div>
				<!-- protect 상담사 관리- 상태 -->
				<div
					v-else-if="$route.name == 'businessSiteManagement' && item.stat == true && item.stat !== 1"
					:class="item.stat == true ? ['dt-align-set', 'font-green'] : ['dt-align-set']"
				>
					근무
				</div>
				<div v-else-if="$route.name === 'notification'" :class="item.stat === 0 ? 'success--text' : 'error--text'">
					{{ statText2(item.stat) }}
				</div>
				<!-- protect 알림톡 관리- 사용 -->
				<div v-else-if="$route.name === 'boardNotification'" :class="item.stat === 0 ? 'success--text' : 'error--text'">
					{{ statText2(item.stat) }}
				</div>
				<!-- <div v-else-if="$route.name == 'waiting' && item.stat === 0" :class="item.stat == 0 ? '' : ['dt-align-set']">
					상담중
				</div> -->
				<div v-else-if="($route.name == 'waiting' || $route.name == 'customerManagement') && item.stat === 0">상담 예약</div>
				<div v-else-if="($route.name == 'waiting' || $route.name == 'customerManagement') && item.stat === 1">상담중</div>
				<div
					v-else-if="($route.name == 'waiting' || $route.name == 'customerManagement') && item.stat === 2"
					:class="item.stat == 2 ? ['font-red'] : ['dt-align-set']"
				>
					미처리
				</div>
				<div
					v-else-if="($route.name == 'waiting' || $route.name == 'customerManagement') && item.stat === 9"
					:class="item.stat == 9 ? ['font-green'] : ['dt-align-set']"
				>
					상담 완료
				</div>

				<div v-else :class="item.stat === 1 ? 'success--text' : 'error--text'">
					{{ statText(item.stat) }}
				</div>
			</template>
			<!-- status -->
			<template v-slot:[`item.status`]="{ item }">
				<div
					v-if="item.status === null || item.status === 1"
					:class="item.status == null || 1 ? ['dt-align-set', 'font-green'] : ['dt-align-set']"
				>
					정상
				</div>
				<div v-if="item.status === 2" :class="item.status == 2 ? ['dt-align-set', 'font-red'] : ['dt-align-set']">
					예약취소
				</div>
			</template>
			<!-- No -->
			<template v-slot:[`item.No`]="{ index }">
				<div>
					{{ index + 1 }}
				</div>
			</template>
			<!-- username -->
			<template v-slot:[`item.username`]="{ item }">
				<div
					style="width:60px;
										overflow:hidden;
      						text-overflow:ellipsis;
      						white-space:nowrap;"
				>
					{{ item.username }}
				</div>
			</template>
			<!-- workingStatus -->
			<template v-slot:[`item.workingStatus`]="{ item }">
				<div>
					<!-- {{ item.workingStatus }} -->
					<selectBoxValue
						:sel="workingStatusSelectBox"
						:value="item.workingStatus ? '재직' : '퇴사'"
						class="table_small_sel"
						@change="change_default"
					></selectBoxValue>
				</div>
			</template>
			<!-- team -->
			<template v-slot:[`item.team`]="{ item }">
				<div>
					<v-layout>
						<v-flex xs5 pr-1>
							<selectBoxValueItems
								:sel="teamTileSelectBox"
								:value="item.teamTitle"
								:items="item.teamItems"
								class="table_small_sel"
								@change="change_team($event, item)"
							></selectBoxValueItems>
						</v-flex>
						<v-flex xs5 pl-1>
							<selectBoxValueItems
								:sel="rankNameSelectBox"
								:items="item.rankItems"
								:value="item.rankTitle"
								class="table_small_sel"
								@change="change_rank($event, item)"
							></selectBoxValueItems>
						</v-flex>
						<v-flex xs2>
							<v-btn class="ml-2" small @click="teamRankSave(item)" dark :color="$store.state.PointColor2" depressed>적용</v-btn>
						</v-flex>
					</v-layout>
				</div>
			</template>
			<!-- salesPhoneNumber -->
			<template v-slot:[`item.salesPhoneNumber`]="{ item }">
				<v-layout>
					<v-flex xs8>
						<txtField
							class="bizInput"
							v-mask="'###-####-####'"
							v-model="item.salesPhoneNumber"
							:txtField="item.salesPhoneNumber_txtField.txtfield"
							style="height:27px; margin:auto; background-color:white; border-radius:5px;"
						></txtField>
					</v-flex>
					<v-flex xs4>
						<v-btn class="ml-2" small @click="salesPhoneNumberSave(item)" dark :color="$store.state.PointColor2" depressed>적용</v-btn>
					</v-flex>
				</v-layout>
			</template>
			<template v-slot:[`item.organizationStatusEtc`]="{ item }">
				<v-layout class="dt-align-set" justify-center>
					<v-btn class="ml-2" small @click="editUserData(item)" dark :color="$store.state.PointColor2" depressed>자세히 보기</v-btn>
				</v-layout>
			</template>
			<!-- talk_no -->
			<template v-slot:[`item.talk_no`]="{ index }">
				<div>
					{{ (datatable.items.length = index + 1) }}
				</div>
			</template>

			<!-- 상담항목 관리 페이지 -> 순서 -->
			<template v-slot:[`item.listorder`]="{ item }">
				<div class="dt-align-set">
					{{ item.listorder }}
				</div>
			</template>

			<!-- 상담사 관리페이지 -> 권한 -->
			<template v-slot:[`item.authority`]="{ item }">
				<div class="dt-align-set">{{ authorityText(item.authority) }}</div>
			</template>
			<template v-if="$route.name === 'COUNSELORPAGE'" v-slot:[`item.rdate`]="{ item }">
				<div v-if="item.rdate">
					{{ item.rdate | moment('subtract', '18 hours', 'YYYY-MM-DD HH:mm') }}
				</div>
			</template>
			<template v-else v-slot:[`item.rdate`]="{ item }">
				<div v-if="item.rdate">
					{{ item.rdate | moment('subtract', '9 hours', 'YYYY-MM-DD HH:mm:ss') }}
				</div>
			</template>
			<template v-slot:[`item.cdate`]="{ item }">
				<div>
					{{ item.cdate | moment('subtract', '9 hours', 'YYYY-MM-DD HH:mm:ss') }}
				</div>
			</template>

			<!-- 상담사 관리페이지 -> 상담석 -->
			<!-- <template v-slot:[`item.seat`]="{ item }">
				<div class="dt-align-set">
					{{ item.seat }}
				</div>
			</template> -->

			<!-- 상담사 관리페이지 -> 상담원명 -->
			<!-- <template v-slot:[`item.name`]="{ item }">
				<div
					:style="`color:${$store.state.PointColor2}`"
					class="nameEvent"
					@click="nameClick(item)"
					v-if="$route.name === 'customer' || $route.name === 'trackingCode' || $route.name === 'waiting'"
				>
					{{ item.name }}
				</div>

				<div v-else>
					{{ item.name }}
				</div>
			</template> -->

			<!-- 방문예약 관리 관리페이지 -> 시작일 -->
			<template v-slot:[`item.sdate`]="{ item }">
				<div class="dt-align-set">
					{{ item.sdate }}
				</div>
			</template>

			<!-- 방문예약 관리 관리페이지 -> 종료일 -->
			<template v-slot:[`item.edate`]="{ item }">
				<div class="dt-align-set">
					{{ item.edate }}
				</div>
			</template>

			<!-- 방문예약 관리 관리페이지 -> 최대예약 -->
			<template v-slot:[`item.maxcount`]="{ item }">
				<div class="dt-align-set">
					{{ item.maxcount }}
				</div>
			</template>

			<!-- 방문예약 관리 관리페이지 -> 동행인원 -->
			<template v-slot:[`item.companion`]="{ item }">
				<div class="dt-align-set">
					{{ item.companion }}
				</div>
			</template>

			<!-- ---- issue --- -->
			<template v-slot:[`item.isuse`]="{ item }">
				<div class="dt-align-set" v-if="$route.name == 'campaign'">
					{{ isuseCampaign(item.isuse) }}
				</div>
				<div class="dt-align-set" v-else>
					{{ isuseText(item.isuse) }}
				</div>
			</template>
			<template v-slot:[`item.type_history`]="{ item }">
				<div>
					{{ item.type }}
				</div>
			</template>

			<template v-slot:[`item.typeTerm`]="{ item }">
				<div>
					{{ typeTerm(item.type) }}
				</div>
			</template>
			<!-- ---- 등록고객 관리 -- 개인정보동의 --- -->
			<template v-slot:[`item.ispersonal`]="{ item }">
				<div class="dt-align-set">
					{{ agreeType(item.ispersonal) }}
				</div>
			</template>
			<!-- ---- 등록고객 관리 -- 마케팅동의 --- -->
			<template v-slot:[`item.ismarketing`]="{ item }">
				<div class="dt-align-set">
					{{ agreeType(item.ismarketing) }}
				</div>
			</template>
			<!-- ---- 사용자 관리-- confirmed --- -->
			<template v-slot:[`item.confirmed`]="{ item }">
				<div class="dt-align-set">
					{{ authoredType(item.confirmed) }}
				</div>
			</template>
			<!-- ---- 사용자 관리-- blocked --- -->
			<template v-slot:[`item.blocked`]="{ item }">
				<div class="dt-align-set">
					{{ authoredType(item.blocked) }}
				</div>
			</template>
			<template v-slot:[`item.mainimg`]="{ item }">
				<v-btn
					v-if="item.mainimg"
					x-small
					depressed
					dark
					:color="$store.state.PointColor2"
					@click="backServerClick($store.state.backServer, item)"
					>바로가기</v-btn
				>
			</template>
			<!-- Num -->
			<template v-slot:[`item.Num`]="{ item, index }">
				<div class="dt-align-set" v-show="!item.Num">{{ index + 1 }}</div>
			</template>
			<!-- channelList -->
			<template v-slot:[`item.collect`]="{ item }">
				<btn v-if="item.feedType === 2" :btn="collectBtn" btn_txt="Collect" @click="clickCollectBtn" />
			</template>

			<!-- logo -->
			<template v-slot:[`item.logoUrl`]="{ item }">
				<v-img style="background-color:grey;" max-height="30" max-width="40" :src="item.logoUrl" lazy-src="../assets/image.png"></v-img>
			</template>
			<!-- code -->
			<template v-slot:[`item.code`]="{ item }">
				<a :href="reserveDayHost + item.groupcode + '/' + item.code" target="_blank" v-if="$route.name === 'reservation'">
					{{ item.groupcode + '/' + item.code }}
				</a>
				<a :href="trackingCodeHost + '/myQr/' + item.code" target="_blank" v-if="$route.name === 'trackingCode'">
					{{ item.code }}
				</a>
				<a :href="reserveVisitHost + item.groupcode + '/' + item.code" target="_blank" v-if="$route.name === 'campaign'">
					{{ item.groupcode + '/' + item.code }}
				</a>
				<div v-if="$route.name === 'temperature'">
					{{ item.code }}
				</div>
				<!-- protect 방문예약관리 -  사업지 url -->
				<v-btn
					x-small
					depressed
					dark
					:color="$store.state.PointColor2"
					@click="reservedayClick(reserveDayHost, item)"
					v-if="$route.name === 'reservationManagement'"
					>바로가기</v-btn
				>
			</template>

			<template v-slot:[`item.codeDirect`]="{ item }">
				<a :href="reserveDirectHost + item.groupcode + '/' + item.code" target="_blank" v-if="$route.name === 'reservation'">
					{{ item.groupcode + '/' + item.code }}
				</a>
				<!-- protect 방문예약관리 -  다이렉트 url -->
				<v-btn
					x-small
					depressed
					dark
					:color="$store.state.PointColor2"
					@click="reservedirectClick(reserveDirectHost, item)"
					v-if="$route.name === 'reservationManagement'"
					>바로가기</v-btn
				>
			</template>
			<!-- 캠페인 url -->
			<template v-slot:[`item.campCode`]="{ item }">
				<v-btn x-small depressed dark :color="$store.state.PointColor2" @click="reservevisitClick(reserveVisitHost, item)">바로가기</v-btn>
			</template>
			<!-- enter QR -->
			<template v-slot:[`item.enterQR`]="{ item }">
				<v-btn x-small depressed dark :color="$store.state.PointColor2" @click="enterQRClick(enterQRHost, item)">바로가기</v-btn>
			</template>

			<!-- counsel QR -->
			<template v-slot:[`item.counselQR`]="{ item }">
				<v-btn x-small depressed dark :color="$store.state.PointColor2" @click="counselQRClick(counselQRHost, item)">바로가기</v-btn>
			</template>

			<!-- counsel QR -->
			<template v-slot:[`item.board`]="{ item }">
				<v-btn x-small depressed dark :color="$store.state.PointColor2" @click="boardHostClick(boardHost, item)">바로가기</v-btn>
			</template>

			<template v-slot:[`item.counseler`]="{ item }">
				<v-btn x-small depressed dark :color="$store.state.PointColor2" @click="counselerClick(counselser, item)">바로가기</v-btn>
			</template>
			<!-- image -->
			<template v-slot:[`item.image`]="{ item }">
				<v-img max-height="40" max-width="100" :src="item.image"></v-img>
			</template>

			<template v-slot:[`item.imageUrl`]="{ item }">
				<v-img max-height="40" max-width="100" :src="item.imageUrl"></v-img>
			</template>

			<template v-slot:[`item.startTime`]="{ item }">
				{{ item.startTime | moment('HH:mm.ss.SSS') }}
			</template>

			<template v-slot:[`item.joinStatus`]="{ item }">
				<div :class="item.joinStatus === '꽝' ? '' : 'success--text'">
					{{ item.joinStatus }}
				</div>
			</template>

			<!-- action -->
			<template v-slot:[`item.action`]="{ item }">
				<v-layout class="dt-align-set" justify-center>
					<v-btn
						v-if="$store.state.meData.username !== item.username"
						class="ml-2"
						small
						@click="editacskey(item)"
						dark
						:color="$store.state.PointColor2"
						depressed
						>수정</v-btn
					>
					<v-btn
						v-if="$store.state.meData.username !== item.username"
						class="ml-2"
						small
						@click="deleteacskey(item)"
						dark
						:color="$store.state.PointColor2"
						depressed
						>삭제</v-btn
					>
					<!-- <btn :btn="editBtn" btn_txt="수정" :click="clickEditBtn" /> -->
					<!-- <btn :btn="deleteBtn" btn_txt="삭제" class="right-btn" :click="clickDeleteBtn" /> -->
				</v-layout>
			</template>
			<!-- etc -->
			<template v-slot:[`item.etc`]="{ item }">
				<v-layout class="dt-align-set" justify-center>
					<v-btn class="ml-2" small @click="nameClick(item)" dark :color="$store.state.PointColor2" depressed>이력보기</v-btn>
					<!-- <v-btn class="ml-2" small @click="deleteacskey(item)" dark :color="$store.state.PointColor2" depressed>삭제</v-btn> -->
					<!-- <btn :btn="editBtn" btn_txt="수정" :click="clickEditBtn" /> -->
					<!-- <btn :btn="deleteBtn" btn_txt=right-btn" :click="clickDeleteBtn" /> -->
				</v-layout>
			</template>
			<!-- detailEtc -->
			<template v-slot:[`item.detailEtc`]="{ item }">
				<v-layout class="dt-align-set" justify-center>
					<v-btn class="ml-2" small @click="nameClick(item)" :color="'#f3f3ff'" depressed>자세히 보기</v-btn>
					<!-- <v-btn class="ml-2" small @click="deleteacskey(item)" dark :color="$store.state.PointColor2" depressed>삭제</v-btn> -->
					<!-- <btn :btn="editBtn" btn_txt="수정" :click="clickEditBtn" /> -->
					<!-- <btn :btn="deleteBtn" btn_txt=right-btn" :click="clickDeleteBtn" /> -->
				</v-layout>
			</template>
			<!-- detailEtc2 -->
			<template v-slot:[`item.detailEtc2`]="{ item }">
				<v-layout class="dt-align-set" justify-center>
					<v-icon @click="nameClick(item)" depressed>mdi-text-box-search-outline</v-icon>
				</v-layout>
			</template>
			<template v-slot:[`item.etcQR`]="{ item }">
				<v-layout class="dt-align-set" justify-center>
					<v-btn
						class="ml-2"
						small
						@click=";($store.state.datatableItem = item), $emit('sendQR', $event)"
						dark
						:color="$store.state.PointColor2"
						depressed
						>QR</v-btn
					>
					<v-btn class="ml-2" small @click="nameClick(item)" dark :color="$store.state.PointColor2" depressed>이력보기</v-btn>
					<!-- <v-btn class="ml-2" small @click="deleteacskey(item)" dark :color="$store.state.PointColor2" depressed>삭제</v-btn> -->
					<v-btn class="ml-2" small @click="saveImg(item)" dark :color="$store.state.PointColor2" depressed>이미지</v-btn>
					<!-- <btn :btn="editBtn" btn_txt="수정" :click="clickEditBtn" /> -->
					<!-- <btn :btn="deleteBtn" btn_txt=right-btn" :click="clickDeleteBtn" /> -->
				</v-layout>
			</template>
			<!-- etc1 -->
			<template v-slot:[`item.etc1`]="{ item }">
				<v-layout class="dt-align-set" justify-center>
					<v-btn
						v-if="$store.state.meData.username !== item.username"
						class="ml-2"
						small
						@click="nameClick(item)"
						dark
						:color="$store.state.PointColor2"
						depressed
						>이력보기</v-btn
					>

					<!-- <btn :btn="editBtn" btn_txt="수정" :click="clickEditBtn" /> -->
					<!-- <btn :btn="deleteBtn" btn_txt=click="clickDeleteBtn" /> -->
				</v-layout>
			</template>

			<template v-slot:[`item.actionReservationManagement`]="{ item }">
				<v-layout class="dt-align-set" justify-center>
					<v-btn
						v-if="$store.state.meData.username !== item.username"
						class="ml-2"
						small
						@click="deleteacskey(item)"
						dark
						:color="$store.state.PointColor2"
						depressed
						>Delete</v-btn
					>
				</v-layout>
			</template>
			<!-- Only Edit -->
			<template v-slot:[`item.edit`]="{ item }">
				<v-layout class="dt-align-set" justify-center>
					<v-btn v-if="$store.state.meData.username !== item.username" class="ml-2" small @click="editacskey(item)" depressed>Edit</v-btn>
					<selectBox3 :sel="item.sel" @change="qrChange(item), $emit('changeQR', $event)"></selectBox3>
					<btn :btn="editBtn" btn_txt="QRsend" @click=";($store.state.datatableItem = item), $emit('sendQR', $event)" />
					<!-- <btn :btn="deleteBtn" btn_txt=lickDeleteBtn" /> -->
				</v-layout>
			</template>
			<template v-slot:[`item.etc_edit`]="{ item }">
				<v-layout class="dt-align-set" justify-center>
					<v-btn class="detail_etc_btn" small @click="detailClick(item)" :color="'#9A9C9B'" depressed>수정</v-btn>

					<!-- <btn :btn="editBtn" btn_txt="수정" :click="clickEditBtn" /> -->
					<!-- <btn :btn="deleteBtn" btn_txt=click="clickDeleteBtn" /> -->
				</v-layout>
			</template>
			<!-- 시슴템 관리 - 사용자 관리 - 자세히 보기 -->
			<template v-slot:[`item.etc_detail`]="{ item }">
				<v-layout class="dt-align-set ml-0" justify-center>
					<v-btn class="detail_etc_btn" small @click="detailClick(item)" :color="'#9A9C9B'" depressed>자세히 보기</v-btn>

					<!-- <btn :btn="editBtn" btn_txt="수정" :click="clickEditBtn" /> -->
					<!-- <btn :btn="deleteBtn" btn_txt=click="clickDeleteBtn" /> -->
				</v-layout>
			</template>
			<template v-slot:[`item.preview`]="{ item }">
				<v-layout class="dt-align-set" justify-center>
					<v-btn class="detail_etc_btn mr-2" small @click="previewClick(item)" :color="'#9A9C9B'" depressed>미리보기</v-btn>
				</v-layout>
			</template>
			<!-- 시슴템 관리 - 알림톡 관리 - 미리보기 + 자세히 보기 -->
			<template v-slot:[`item.etc_detail_preview`]="{ item }">
				<v-layout class="dt-align-set ml-0" justify-center>
					<!-- <v-btn class="detail_etc_btn" small @click="previewClick(item)" :color="'#9A9C9B'" depressed>미리보기</v-btn> -->
					<v-btn class="detail_etc_btn mr-2" small @click="previewClick(item)" :color="'#9A9C9B'" depressed>미리보기</v-btn>
					<v-btn class="detail_etc_btn ml-3" small @click="detailClick(item)" :color="'#9A9C9B'" depressed>자세히 보기</v-btn>
				</v-layout>
			</template>

			<!-- 시슴템 관리 - 항목 관리 - 적용 + 항목편집 -->
			<template v-slot:[`item.etc_apply_edit`]="{ item }">
				<v-layout class="dt-align-set ml-0" justify-center>
					<!-- <v-btn class="detail_etc_btn" small @click="previewClick(item)" :color="'#9A9C9B'" depressed>미리보기</v-btn> -->
					<!-- <v-btn class="detail_apply_btn mr-2" small @click="applyclick(item)" :color="'#9A9C9B'" depressed>적용</v-btn> -->
					<v-btn class="detail_apply_btn " small @click="detailClick(item)" :color="'#9A9C9B'" depressed>항목 편집</v-btn>
				</v-layout>
			</template>

			<!-- 시슴템 관리 - 항목 관리 - 적용 + 항목편집 -->
			<template v-slot:[`item.etc_apply`]="{ item }">
				<v-layout class="dt-align-set" justify-center>
					<!-- <v-btn class="detail_etc_btn" small @click="previewClick(item)" :color="'#9A9C9B'" depressed>미리보기</v-btn> -->
					<v-btn class="detail_apply_btn mr-2" small @click="applyclick(item)" :color="'#9A9C9B'" depressed>적용</v-btn>
				</v-layout>
			</template>

			<!-- 시슴템 관리 - 항목 관리 - 적용 + 항목편집 -->
			<template v-slot:[`item.useYn`]="{ item }">
				<v-layout class="dt-align-set ml-0 py-2" justify-center>
					<selectBox :sel="item.useYn" class="table_small_sel" @change="change_default"></selectBox>
					<!-- <btn :btn="deleteBtn" btn_txt=lickDeleteBtn" /> -->
				</v-layout>
			</template>

			<!-- 시슴템 관리 - 유형 관리 - 부서/직급 관리-->
			<template v-slot:[`item.useYn_small`]="{ item }">
				<v-layout class="dt-align-set ml-0 py-2" justify-center>
					<selectBox :sel="item.useYn" class="table_small_sel2" @change="change_default"></selectBox>
					<!-- <btn :btn="deleteBtn" btn_txt=lickDeleteBtn" /> -->
				</v-layout>
			</template>
			<!-- 캠페인 관리 - 거점 캠페인 관리  - 캠페인 URL -->
			<template v-slot:[`item.campaign_url`]="{ item }">
				<v-layout class="dt-align-set ml-0" justify-center v-show="item.id">
					<!-- <v-btn class="detail_etc_btn" small @click="previewClick(item)" :color="'#9A9C9B'" depressed>미리보기</v-btn> -->
					<v-btn class="detail_etc_btn mr-2" small @click="$emit('campaign_url', item, 'QR')" :color="'#9A9C9B'" depressed>QR Code</v-btn>
					<v-btn class="detail_etc_btn mr-2" small @click="$emit('campaign_url', item, 'navigate')" :color="'#9A9C9B'" depressed
						>바로가기</v-btn
					>
					<v-btn class="detail_etc_btn " small @click="$emit('campaign_url', item, 'copy')" :color="'#9A9C9B'" depressed>URL 복사</v-btn>
				</v-layout>
			</template>

			<!-- 캠페인 관리 - 거점 캠페인 관리 - 팝업 - 유형 선택 -->
			<template v-slot:[`item.group_type`]="{ item }">
				<v-layout class="dt-align-set" justify-center style="width: 110px;">
					<selectBox style="min-height:unset;" :sel="item.group_type" @change="qrChange(item)"></selectBox>
				</v-layout>
			</template>

			<!-- 캠페인 관리 - 거점 캠페인 관리 - 팝업 - 그룹명 입력  -->
			<template v-slot:[`item.title_txtField`]="{ item }">
				<v-layout class="dt-align-set" justify-center>
					<txtField
						class="bizInput"
						v-model="item.title_txtField.value"
						:txtField="item.title_txtField.txtfield"
						style="height:27px; margin:auto; background-color:white; border-radius:5px;"
					></txtField>
				</v-layout>
			</template>

			<!-- 캠페인 관리 - 거점 캠페인 관리 - 사용/미사용 라디오 버튼  -->
			<template v-slot:[`item.etc_capmaign`]="{ item }">
				<v-layout class="dt-align-set" justify-center>
					<v-radio-group v-model="item.etc_capmaign" hide-details row class="campaign_radio">
						<v-radio class="mb-0" label="사용" :value="true" color="#FB9C00" :ripple="false"></v-radio>
						<v-radio class="mb-0" label="미사용" :value="false" color="#FB9C00" :ripple="false"></v-radio>
					</v-radio-group>
				</v-layout>
			</template>
			<!-- 캠페인 관리 - 이벤트 관리 - 팝업 - 수량 입력  -->
			<template v-slot:[`item.number_txtField`]="{ item }">
				<v-layout class="dt-align-set" justify-center>
					<txtField
						class="bizInput"
						v-model="item.number_txtField.value"
						:txtField="item.number_txtField.txtfield"
						style="height:27px; margin:auto; background-color:white; border-radius:5px;"
					></txtField>
				</v-layout>
			</template>
			<!-- 캠페인 관리 - 예약 상담 관리 - 상담예약 확인  -->
			<template v-slot:[`item.wating_check`]="{ item }">
				<v-layout class="dt-align-set ml-0" justify-center>
					<v-layout class="dt-align-set ml-0" justify-center>
						<v-btn class="detail_etc_btn mr-2" small @click="$emit('reservation_page', item, 'waiting_QR')" :color="'#9A9C9B'" depressed
							>QR Code</v-btn
						>
						<v-btn
							class="detail_etc_btn mr-2"
							small
							@click="$emit('reservation_page', item, 'wating_check_QR')"
							:color="'#9A9C9B'"
							depressed
							>바로가기</v-btn
						>
						<v-btn class="detail_etc_btn " small @click="$emit('reservation_page', item, 'wating_check_url')" :color="'#9A9C9B'" depressed
							>URL 복사</v-btn
						>
					</v-layout>
				</v-layout>
			</template>
			<!-- 캠페인 관리 - 예약 상담 관리 - 방문등록 확인  -->
			<template v-slot:[`item.reservation_check`]="{ item }">
				<v-layout class="dt-align-set ml-0" justify-center>
					<v-btn class="detail_etc_btn mr-2" small @click="$emit('reservation_page', item, 'reservation_QR')" :color="'#9A9C9B'" depressed
						>QR Code</v-btn
					>
					<v-btn
						class="detail_etc_btn mr-2"
						small
						@click="$emit('reservation_page', item, 'reservation_check_QR')"
						:color="'#9A9C9B'"
						depressed
						>바로가기</v-btn
					>
					<v-btn
						class="detail_etc_btn "
						small
						@click="$emit('reservation_page', item, 'reservation_check_url')"
						:color="'#9A9C9B'"
						depressed
						>URL 복사</v-btn
					>
				</v-layout>
			</template>

			<!-- 캠페인 관리 - 예약 상담 관리 - 상담사 화면  -->
			<template v-slot:[`item.counselor_page`]="{ item }">
				<v-layout class="dt-align-set ml-0" justify-center>
					<v-layout class="dt-align-set ml-0" justify-center>
						<v-btn
							class="detail_etc_btn mr-2"
							small
							@click="$emit('reservation_page', item, 'counselor_page_QR')"
							:color="'#9A9C9B'"
							depressed
							>바로가기</v-btn
						>
						<v-btn class="detail_etc_btn " small @click="$emit('reservation_page', item, 'counselor_page_url')" :color="'#9A9C9B'" depressed
							>URL 복사</v-btn
						>
					</v-layout>
				</v-layout>
			</template>

			<!-- 캠페인 관리 - 예약 상담 관리 - 상담현황판 -->
			<template v-slot:[`item.waiting_board`]="{ item }">
				<v-layout class="dt-align-set ml-0" justify-center>
					<v-layout class="dt-align-set ml-0" justify-center>
						<v-btn
							class="detail_etc_btn mr-2"
							small
							@click="$emit('reservation_page', item, 'waiting_board_QR')"
							:color="'#9A9C9B'"
							depressed
							>바로가기</v-btn
						>
						<v-btn class="detail_etc_btn " small @click="$emit('reservation_page', item, 'waiting_board_url')" :color="'#9A9C9B'" depressed
							>URL 복사</v-btn
						>
					</v-layout>
				</v-layout>
			</template>

			<!-- 캠페인 관리 - 이벤트 관리 - 이벤트 정보 -->
			<template v-slot:[`item.event_url`]="{ item }">
				<v-layout class="dt-align-set ml-0" justify-center>
					<v-layout class="dt-align-set ml-0" justify-center>
						<v-btn class="detail_etc_btn mr-2" small @click="$emit('event_page', item, 'event_QR')" :color="'#9A9C9B'" depressed
							>QR Code</v-btn
						>
						<v-btn class="detail_etc_btn mr-2" small @click="$emit('event_page', item, 'event_url_QR')" :color="'#9A9C9B'" depressed
							>바로가기</v-btn
						>
						<v-btn class="detail_etc_btn " small @click="$emit('event_page', item, 'event_url_url')" :color="'#9A9C9B'" depressed
							>URL 복사</v-btn
						>
					</v-layout>
				</v-layout>
			</template>

			<!-- 친구톡 관리 - 항목 관리 - 적용 + 항목편집 -->
			<!-- 시슴템 관리 - 알림톡 관리 - 미리보기 + 자세히 보기 -->
			<template v-slot:[`item.unsubscribe_change`]="{ item }">
				<v-layout class="dt-align-set ml-0" justify-center>
					<!-- <v-btn class="detail_etc_btn" small @click="previewClick(item)" :color="'#9A9C9B'" depressed>미리보기</v-btn> -->
					<v-btn width="80px" class="detail_etc_btn ml-3" small @click="$emit('unsubscribe_change', item)" :color="'#9A9C9B'" depressed>{{
						item.access ? '거부' : '허용'
					}}</v-btn>
				</v-layout>
			</template>
			<template v-slot:[`item.notice_status`]="{ item }">
				<v-layout class="dt-align-set ml-0 overflow_hidden" justify-center>
					<selectBox class="table_select_box" :sel="item.table_select" @change="tableStatus(item)" style="width:80px"></selectBox>
				</v-layout>
			</template>

			<template v-slot:[`item.business_title`]="{ item }">
				<v-layout wrap>
					<div v-if="datatable.allBiz.length === item.business_title.length">
						전체 지점
					</div>
					<div v-else class="table_title_wrap py-1 px-2 mr-3" v-for="(biz, index) in item.business_title" :key="index">
						{{ biz.title }}
						<v-icon @click="removeBiz(item, biz)" class="table_icon">mdi-close</v-icon>
					</div>
				</v-layout>
			</template>

			<!-- 지점관리 - 상품관리 - 판매건수 -->
			<template v-slot:[`item.priceNum`]="{ item }">
				<div>
					{{ item.priceNum ? item.priceNum : '0' }}
				</div>
			</template>

			<template v-slot:[`item.confirm_radio`]="{ item }">
				<div class="d-flex align-center justify-center">
					<v-radio-group v-model="item.confirmed" hide-details row class="notice_radio">
						<v-radio class="mb-0 mr-3" label="관리자 지정" :value="true" color="#FB9C00" :ripple="false"></v-radio>
						<v-radio class="mb-0" label="해제" :value="false" color="#FB9C00" :ripple="false"></v-radio>
					</v-radio-group>
					<div class="ml-3">
						<v-btn class="notice_btn" color="#F3F3FF" elevation="0" @click="changeConfirm(item)">적용하기</v-btn>
					</div>
				</div>
			</template>

			<!-- 이벤트 관리 - 배너이미지 -->
			<template v-slot:[`item.bannerImg_url`]="{ item }">
				<v-layout justify-center class="py-1">
					<v-img :src="item.bannerImg_url" max-width="150" class="display_inlineFlex" />
				</v-layout>
			</template>

			<!-- 지점관리 - 상품관리 - 상품등록 - file -->
			<template v-slot:[`item.fileName`]="{ item, index }">
				<v-layout style="height:38;px " justify-center align-center>
					<txtField
						:txtField="disabledData"
						v-model="item.fileName"
						class="search_box_admin pa-3"
						style="width:300px"
						@click_clear="$emit('click_clear', index)"
					></txtField>
					<div class="mr-3" style="width:70px;">
						<v-btn class="notice_btn" color="#fff" elevation="0" @click="$emit('file_upload_click', index)">첨부</v-btn>
					</div>
				</v-layout>
			</template>

			<template v-slot:[`item.url_btn`]="{ item }">
				<v-layout class="dt-align-set ml-0" justify-center>
					<v-btn class="detail_etc_btn mr-1" small @click="$emit('urlCopy', item, 'admin')" :color="'#9A9C9B'" depressed>관리자</v-btn>
					<v-btn class="detail_etc_btn ml-1" small @click="$emit('urlCopy', item, 'counselor')" :color="'#9A9C9B'" depressed
						>영업사원</v-btn
					>
					<v-btn class="detail_etc_btn ml-1" small @click="$emit('urlCopy', item, 'gotoWork')" :color="'#9A9C9B'" depressed
						>출/퇴근QR</v-btn
					>
					<!-- <btn :btn="editBtn" btn_txt="수정" :click="clickEditBtn" /> -->
					<!-- <btn :btn="deleteBtn" btn_txt=click="clickDeleteBtn" /> -->
				</v-layout>
			</template>

			<!-- 알림톡 비고 -->
			<template v-slot:[`item.etc_detail_preview_kakao`]="{ item }">
				<v-layout class="dt-align-set" justify-center>
					<v-btn class="detail_etc_btn mr-2" small @click="previewClick(item)" :color="'#9A9C9B'" depressed>미리보기</v-btn>
					<v-btn class="detail_etc_btn ml-3" small @click="detailClick(item)" :color="'#9A9C9B'" depressed>자세히 보기</v-btn>
					<v-btn class="ml-3" small dark @click="deleteClick(item)" color="error" depressed>삭제</v-btn>
				</v-layout>
			</template>

			<!-- 포스트 관리 - 배너이미지 -->
			<template v-slot:[`item.post_bannerImg_url`]="{ item }">
				<v-img :src="item.post_bannerImg_url" max-width="150" class="display_inlineFlex"></v-img>
			</template>

			<!-- 시스템 관리 - 유형 관리 - 타이틀 텍스트필드 -->
			<template v-slot:[`item.title_edit`]="{ item }">
				<v-layout class="dt-align-set" justify-center>
					<txtFieldStyle class="bizInput" v-model="item.value" :txtField="item" style="height:27px; margin:auto"></txtFieldStyle>
				</v-layout>
			</template>
			<!-- 직원 관리 - 근태관리 - 근태 자세히보기 -->
			<template v-slot:[`item.date`]="{ item }">
				<div v-if="item.date.indexOf('토') > -1 || item.date.indexOf('일') > -1" style="color:#FF7700;">
					{{ item.date }}
				</div>
				<div v-else>
					{{ item.date }}
				</div>
			</template>

			<!-- 직원 관리 - 직원 관리 - 지점-->
			<template v-slot:[`item.busienss_selectBox`]="{ item }">
				<v-layout class="dt-align-set ml-0 py-2" justify-center style="width:100%">
					<selectBoxStyle :sel="item.busienss_selectBox" class="table_small_sel" style="max-width: 200px;"></selectBoxStyle>
					<!-- <btn :btn="deleteBtn" btn_txt=lickDeleteBtn" /> -->
				</v-layout>
			</template>

			<!-- 직원 관리 - 직원 관리 - 부서-->
			<template v-slot:[`item.team_selectBox`]="{ item }">
				<v-layout class="dt-align-set ml-0 py-2 d-inline-block" justify-center>
					<selectBoxStyle :sel="item.team_selectBox" class="table_small_sel" style="max-width: 120px;"></selectBoxStyle>
					<!-- <btn :btn="deleteBtn" btn_txt=lickDeleteBtn" /> -->
				</v-layout>
			</template>

			<!-- 직원 관리 - 직원 관리 - 직급-->
			<template v-slot:[`item.rank_selectBox`]="{ item }">
				<v-layout class="dt-align-set ml-0 py-2 d-inline-block" justify-center>
					<selectBoxStyle :sel="item.rank_selectBox" class="table_small_sel" style="max-width: 120px;"></selectBoxStyle>
					<!-- <btn :btn="deleteBtn" btn_txt=lickDeleteBtn" /> -->
				</v-layout>
			</template>

			<!-- 직원 관리 - 직원 관리 - 연락처-->
			<template v-slot:[`item.phone_edit`]="{ item }">
				<v-layout class="dt-align-set" justify-center>
					<txtFieldStyle
						class="bizInput"
						v-model="item.phone_edit.value"
						:txtField="item.phone_edit"
						style="height:27px; margin:auto"
						@keyup="phoneCheck(item)"
					></txtFieldStyle>
				</v-layout>
			</template>

			<!-- 직원 관리 - 직원 관리 - 금일 일정-->
			<template v-slot:[`item.today_reservation_text`]="{ item }">
				<div @click="detailClick(item, 'today_reservation')">
					<span class="count_text">
						{{ item.today_reservation_text }}
					</span>
					<v-icon size="17" class="pb-1 ml-1">mdi-text-box-search-outline</v-icon>
				</div>
			</template>

			<!-- 직원 관리 - 직원 관리 - 등록고객-->
			<template v-slot:[`item.clients_text`]="{ item }">
				<div @click="detailClick(item, 'client')">
					<span class="count_text">
						{{ item.clients_text }}
					</span>
					<v-icon size="17" class="pb-1 ml-1">mdi-text-box-search-outline</v-icon>
				</div>
			</template>

			<!-- 직원 관리 - 직원 관리 - 적용하기-->
			<template v-slot:[`item.etc_apply_employee`]="{ item, index }">
				<v-layout class="dt-align-set ml-0" justify-center>
					<v-btn class="detail_etc_btn2" small @click="applyclick(item, index)" color="#9A9C9B" depressed>적용하기</v-btn>
				</v-layout>
			</template>

			<!-- 직원 관리 - 직원 관리 - 직원명-->
			<template v-slot:[`item.name_detail`]="{ item }">
				<div>
					<span class="count_text" @click="detailClick(item, 'name')">
						{{ item.name_detail }}
					</span>
				</div>
			</template>

			<!-- 직원 관리 - 직원 관리 - 이력정보 - 변경내용-->
			<template v-slot:[`item.content`]="{ item }">
				<div style="white-space: pre-line;">
					{{ item.content }}
				</div>
			</template>
			<!-- 물건배정 담당자 -->
			<template v-slot:[`item.manager`]="{ item }">
				<v-layout>
					<v-flex xs5 class="mr-1">
						<!-- <selectBoxValueItems
							style="font-size:12px"
							:items="datatable.product_manager.items"
							:sel="datatable.product_manager"
							v-model="item.managerChoiceStatus"
							class="table_small_sel"
							@change="managerChoiceStatusChange($event, item)"
						></selectBoxValueItems> -->
						<selectBox
							:sel="item.product_manager"
							:disable="item.product_manager.disabled"
							style="font-size:12px"
							@change="managerChoiceStatusChange($event, item)"
						></selectBox>
					</v-flex>

					<v-flex xs3 class="mr-1">
						<!-- <selectBoxValueItems
							style="font-size:12px"
							:items="item.team.items"
							:sel="item.team"
							:disable="item.team.disabled"
							class="table_small_sel"
							@change="teamChange($event, item)"
						></selectBoxValueItems> -->

						<selectBox :sel="item.team" style="font-size:12px" :disable="item.team.disabled" @change="teamChange($event, item)"></selectBox>
					</v-flex>
					<v-flex xs4>
						<!-- <selectBoxValueItems
							style="font-size:12px"
							:items="item.user.items"
							:sel="item.user"
							v-model="item.managerUser"
							class="table_small_sel"
						></selectBoxValueItems> -->
						<selectBox :sel="item.user" :disable="item.user.disabled" style="font-size:12px"></selectBox>
					</v-flex>
				</v-layout>
			</template>
			<!-- 물건배정 - 배정 -->
			<template v-slot:[`item.holdTime`]="{ item }">
				<div>
					<v-layout>
						<v-flex xs4>
							<v-layout>
								<v-flex class="mr-1">
									<selectBox :sel="item.select_holding" style="font-size:12px" @change="holdingTypeChoice($event, item)"></selectBox>
								</v-flex>
							</v-layout>
						</v-flex>
						<v-flex xs8 v-if="item.select_holding.value !== ''">
							<v-layout v-if="item.select_holding.value === '종일 홀딩' || item.select_holding.value === '시간 홀딩'">
								<v-flex xs5>
									<TimepickerDialog :setdialog="item.holdingTime1" @input="holdingStart($event, item)"></TimepickerDialog>
								</v-flex>
								<div class="px-1">~</div>
								<v-flex xs5>
									<TimepickerDialog :setdialog="item.holdingTime2" @input="holdingEnd($event, item)"></TimepickerDialog>
								</v-flex>
							</v-layout>
							<v-layout v-else>
								<v-flex xs12 class="mx-1">
									<selectBox :sel="item.holdingTime3" style="font-size:12px"></selectBox>
								</v-flex>
							</v-layout>
						</v-flex>
						<v-btn
							class="search_btn product_table"
							elevation="0"
							color="#f0f2f8"
							style="margin:0 !important"
							@click="createAssignmentAction(item)"
							>배정</v-btn
						>
					</v-layout>
				</div>
			</template>
			<!-- 물건배정 - 상태 -->
			<template v-slot:[`item.product_status`]="{ item }">
				<v-layout v-if="item.assingnmentData">
					<div class="d-flex align-center justify-center status_box mr-1">{{ item.assingnmentTeamData.title }}</div>
					<div
						class="d-flex align-center justify-center status_box mr-1"
						:alt="item.assingnmentUserData.username"
						style="white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;"
					>
						{{ item.assingnmentUserData.username }}
					</div>
					<div class="d-flex align-center justify-center status_box mr-1">
						{{ item.assingnmentData.type === 'allday' ? '종일' : item.assingnmentData.type === 'time' ? '시간' : '즉시' }}
					</div>
					<div class="d-flex align-center justify-center status_box mr-1" style="width:110px">
						{{ item.assingnmentData.start.split(':')[0] + ':' + item.assingnmentData.start.split(':')[1] }} ~
						{{ item.assingnmentData.end.split(':')[0] + ':' + item.assingnmentData.end.split(':')[1] }}
					</div>
					<!-- <div class="d-flex align-center justify-center status_box mr-1" style="width:110px">잔여시간 : 10분</div> -->
					<div class="d-flex align-center justify-center status_box mr-1" style="width:110px">
						잔여시간 :
						<!-- {{
							$moment().diff(
								$moment(
									$moment().format(`YYYY-MM-DD`) + item.assingnmentData.end.split(':')[0] + ':' + item.assingnmentData.end.split(':')[1],
								),
								'hours',
							)
						}} -->
						{{ $moment($moment().format(`YYYY-MM-DD`) + ' ' + item.assingnmentData.end.substr(0, 5)).diff($moment(), 'minute') + '분' }}
					</div>
					<v-spacer></v-spacer>
					<v-btn class="search_btn product_table" elevation="0" color="#f0f2f8" style="margin:0 !important">해제</v-btn>
				</v-layout>
				<!-- <v-layout v-else> {{ item.assingnmentData }}</v-layout> -->
			</template>
			<!-- 물건배정 - 상태 -->
			<template v-slot:[`item.business_manager`]="{ item }">
				<div>{{ item.manager }}</div>
			</template>

			<!-- 정산관리 - 상태 -->
			<template v-slot:[`item.settlementStatus`]="{ item }">
				<div>{{ item.settlementStatus === 'waiting' ? '대기' : item.settlementStatus === 'agree' ? '승인' : '반려' }}</div>
			</template>
			<!-- 정산관리 - 차수 -->
			<template v-slot:[`item.degree`]="{ item }">
				<div>{{ item.degree + '차' }}</div>
			</template>
			<!-- 정산금 지급 처리 - 상태 -->
			<template v-slot:[`item.turnStatus`]="{ item }">
				<div>
					{{ item.turnStatus === 'waiting' ? item.turnTableDegree + '차 지급 대기' : item.turnStatus === 'complete' ? '지급 완료' : '-' }}
				</div>
			</template>
			<!-- 정산금 지급 처리 - 지급예정일 -->
			<template v-slot:[`item.paymentDate`]="{ item }">
				<div :style="getPayementDateStyle(item)">
					{{ item.turnStatus === 'waiting' ? item.paymentDate : item.turnStatus === 'complete' ? '지급 완료' : '-' }}
				</div>
			</template>
			<!-- 사업지관리 - 근무시간 -->
			<template v-slot:[`item.workTime`]="{ item }">
				<div>{{ item.startTime }} ~ {{ item.endTime }}</div>
			</template>
			<!-- 사업지관리 - 담당자 -->
			<template v-slot:[`item.businessManager`]="{ item }">
				<div>{{ item.manager ? item.manager.username : '' }}</div>
			</template>
			<!-- 사업지관리 - 연락처 -->
			<template v-slot:[`item.managerPhoneNumber`]="{ item }">
				<div>{{ item.manager ? item.manager.phoneNumber : '' }}</div>
			</template>
			<template v-slot:[`item.workCheckURL`]="{ item }">
				<div>{{ item.code ? item.code : '' }}</div>
			</template>
			<!-- 사업지관리 - 등록상품 -->
			<template v-slot:[`item.select_product`]="{ item }">
				<v-layout class="dt-align-set ml-0" justify-center>
					<v-btn class="detail_etc_btn" small @click="productDetailClick(item)" :color="'#9A9C9B'" depressed>자세히 보기</v-btn>
				</v-layout>
			</template>
			<!-- 사업지관리 - 등록상품 - 자세히보기 -->
			<template v-slot:[`item.product_etc`]="{ item }">
				<v-layout class="dt-align-set ml-0" justify-center>
					<v-btn class="detail_etc_btn" small @click="editProduct(item)" :color="'#9A9C9B'" depressed>상품 편집</v-btn>
				</v-layout>
			</template>
			<!-- 사업지관리 - 공지사항 관리 -->
			<template v-slot:[`item.notice_useYn`]="{ item }">
				<div v-if="item.useYn === true">공개</div>
				<div v-else-if="item.useYn === false">비공개</div>
			</template>
			<template v-slot:[`item.notice_title`]="{ item }">
				<v-layout>
					<div
						class="d-flex align-center notice_table_biz px-2 py-1 mr-1"
						v-for="(biz, index) in item.businesses"
						:key="index"
						@click="deleteNotice(item, biz)"
					>
						{{ biz.name }}
						<v-icon class="ml-1" small>mdi-close-circle-outline</v-icon>
					</div>
				</v-layout>
			</template>
		</v-data-table>

		<!--고객 관리 - 캠페인 고객 관리 - 자세히 보기 -->
		<!-- <template v-slot:[`item.etc_detail`]="{ item }">
			<v-layout class="dt-align-set" justify-center>
				<v-btn class="detail_etc_btn" small @click="detailClick(item)" :color="'#9A9C9B'" depressed>자세히 보기</v-btn>


			</v-layout>
		</template> -->

		<v-layout v-if="excelUseYn === 'true'">
			<!-- freind_talk_tamplate_excel -->
			<txtField
				v-if="excelTextYn === 'true'"
				class="bizInput datatable_excel_text"
				v-model="excel_text.value"
				:txtField="excel_text.txtfield"
				style="height:27px;  background-color:white; border-radius:5px; width:300px;"
			></txtField>
			<v-btn small :class="excelType === 'freind_talk_tamplate_dialog_excel' ? 'btn-style-type2' : 'btn-style'" @click="clickExport()">
				<img src="@/assets/images/excel-img2.png" />
				엑셀파일 다운로드
			</v-btn>
			<download-excel
				class="btn btn-default"
				:id="`excel-down-${excelType}`"
				:data="excel_items"
				style="display:none"
				:fields="json_fields"
				type="text/csv;charset=utf8"
				worksheet="My Worksheet"
				:name="excel_title"
			>
			</download-excel>
			<sweetAlert :dialog="sweetInfo" />
		</v-layout>
	</div>
</template>

<script>
import TimepickerDialog from '../views/admin/viewItem/timePickerDialog.vue'
import btn from './button'
import { selectBoxValueItems, selectBoxValue, selectBox3, selectBox, txtField, txtFieldStyle, selectBoxStyle } from '@/components/index'
// import { sweetAlert } from '@/components/index'

import downloadExcel from 'vue-json-excel'
export default {
	components: {
		btn,
		selectBox3,
		downloadExcel,
		selectBox,
		sweetAlert: () => import('@/components/sweetAlert.vue'),
		txtField,
		txtFieldStyle,
		selectBoxStyle,
		TimepickerDialog,
		selectBoxValue,
		selectBoxValueItems,
	},
	data() {
		return {
			workingStatusSelectBox: {
				items: ['재직', '퇴사'],
				hideDetail: true,
				outlined: true,
				class: 'small_font bizInput',
			},
			teamTileSelectBox: {
				hideDetail: true,
				outlined: true,
				class: 'small_font bizInput',
				itemValue: 'id',
				itemText: 'title',
			},
			rankNameSelectBox: {
				hideDetail: true,
				outlined: true,
				class: 'small_font bizInput',
				itemValue: 'id',
				itemText: 'rankName',
			},
			sweetInfo: {
				open: false,
				title: '',
				content: ``,
				modalIcon: 'info',
				cancelBtnText: '확인',
				buttonType: 'oneBtn',
			},
			excel_text: {
				value: '',
				txtfield: {
					maxlength: '255',
					outlined: true,
					hideDetail: false,
					errorMessage: '',
					placeholder: '엑셀 다운로드 시 사유를 입력해주세요.',
					// disable: true,
				},
			},

			reserveDayHost: '',
			reserveDirectHost: '',
			reserveVisitHost: '',
			trackingCodeHost: '',
			enterQRHost: '',
			counselQRHost: '',
			boardHost: '',
			counselser: '',
			Host: '',
			selUser: {
				value: 'data1',
				items: ['data1', 'data2'],
				label: '사용자',
				outlined: true,
				hideDetail: true,
			},
			full: 100,
			// 패스워드 버튼
			password_btn: {
				color: 'white',

				width: '113',
				class: 'bold',
			},
			password_btn_txt: 'CHANGE',
			// 액션 버튼
			action_btn: {
				color: 'white',
				width: '113',
				class: 'bold',
			},
			action_btn_txt: 'DELETE',
			viewBtn: {
				class: 'whiteBtn',
			},
			collectBtn: {
				class: 'whiteBtn',
			},
			editBtn: {
				small: true,
				class: 'ml-2',
			},
			deleteBtn: {
				class: '',
			},
			excel_title: 'excel 리스트.xls',
			excel_items: [],
			json_fields: {},
			disabledData: {
				clearable: true,
				maxlength: '255',
				outlined: true,
				backCol: 'white',
				readonly: true,
				placeholder: 'pdf, hwp, doc, ppt',
			},
			page_before: {
				page: 1,
				itemsPerPage: 10,
			},
		}
	},
	created() {
		this.reserveDayHost = location.protocol + '//' + location.host + '/reserve_day/'
		this.reserveDirectHost = location.protocol + '//' + location.host + '/reserve_direct/'
		this.reserveVisitHost = location.protocol + '//' + location.host + '/reserve_visit/'
		this.trackingCodeHost = location.protocol + '//' + location.host
		this.enterQRHost = location.protocol + '//' + location.host + '/qrReaderEnter/'
		this.counselQRHost = location.protocol + '//' + location.host + '/qrReaderCounsel/'
		this.boardHost = location.protocol + '//' + location.host + '/board/'
		this.counselser = location.protocol + '//' + location.host + '/counselorlogin/'
		this.Host = location.protocol + '//' + location.host
	},
	computed: {
		// phone_mask_check(val) {
		// 	if (val < 13) {
		// 		return '###-###-####'
		// 	} else {
		// 		return '###-####-####'
		// 	}
		// },
	},
	watch: {
		datatable: {
			deep: true,
			handler() {
				let obj = {}
				if (this.datatable.headers.length > 0) {
					for (let i = 0; i < this.datatable.headers.length; i++) {
						if (i === 5 && this.excelType === 'reservation_customer') {
							obj['동반 인명수(본인포함)'] = 'companion'
						}
						obj[this.datatable.headers[i].text] = this.datatable.headers[i].value
					}
				}
				this.json_fields = obj

				if (this.excelType === 'inputBox') {
					// 문항 관리 excel 정리
					let new_items = JSON.parse(JSON.stringify(this.datatable.items))
					new_items.forEach(el => {
						if (el.reservedays && el.reservedays.length > 0) {
							el['reserveday'] = el.reservedays.map(x => x.title).join(', ')

							el['range'] = `${this.$moment(el.reservedays[0].sdate).format('YYYY-MM-DD')} ~ ${this.$moment(el.reservedays[0].edate).format(
								'YYYY-MM-DD',
							)}`
						}
					})

					this.excel_title = '문항 관리 리스트.xls'
					this.excel_items = new_items
				} else if (this.excelType === 'reservedays') {
					// 거점 캠페인 관리 excel 정리
					let new_items = JSON.parse(JSON.stringify(this.datatable.items))

					new_items.forEach(el => {
						el['campaign_url'] = process.env.VUE_APP_CUSTOMER_URL + '/reserve_visit/' + el.code
					})

					this.excel_title = '거점 홍보 관리 리스트.xls'
					this.excel_items = new_items
				} else if (this.excelType === 'reservation') {
					// 예약 상담 관리 excel 정리

					let new_items = JSON.parse(JSON.stringify(this.datatable.items))

					new_items.forEach(el => {
						el['wating_check'] = process.env.VUE_APP_CUSTOMER_URL + '/reserve_day/' + el.code
						el['reservation_check'] = process.env.VUE_APP_CUSTOMER_URL + '/reserve_direct/' + el.code
						el['counselor_page'] = process.env.VUE_APP_CUSTOMER_URL + '/counselorlogin/' + el.code
						el['waiting_board'] = process.env.VUE_APP_CUSTOMER_URL + '/board/' + el.code
					})

					this.excel_title = '예약 상담 관리 리스트.xls'
					this.excel_items = new_items
				} else if (this.excelType === 'event') {
					// 이벤트 관리 excel 정리
					let new_items = JSON.parse(JSON.stringify(this.datatable.items))

					new_items.forEach(el => {
						el['event_url'] = process.env.VUE_APP_CUSTOMER_URL + '/reserve_visit/' + el.code
					})

					this.excel_title = '이벤트 관리 리스트.xls'
					this.excel_items = new_items
				} else if (this.excelType === 'campaign_customer') {
					// 캠페인 고객 관리 excel 정리
					let new_items = JSON.parse(JSON.stringify(this.datatable.items))

					new_items.forEach(el => {
						el.phone = el.phone.replace(/^(\d{2,3})(\d{3,4})(\d{4})$/, `$1-$2-$3`)
						el['created_at_time'] = this.$moment(el.created_at).format('YYYY-MM-DD HH:mm')
						if (el.groupData && el.reserveGroupCode) {
							el['reserveGroupCode'] = el.groupData[el.groupData.map(x => x.qrcode).indexOf(el.reserveGroupCode)].title
						}

						if (el.userData) {
							this.userData_parsing(el)
						}
					})
					this.excel_title = '거점 홍보 고객 관리 리스트.xls'
					this.excel_items = new_items
				} else if (this.excelType === 'reservation_customer') {
					// 방문예약 고객 관리 excel 정리
					let new_items = JSON.parse(JSON.stringify(this.datatable.items))
					new_items.forEach(el => {
						el.phone = el.phone.replace(/^(\d{2,3})(\d{3,4})(\d{4})$/, `$1-$2-$3`)
						el['rdate'] = this.$moment(el.rdate)
							.subtract(9, 'hours')
							.format('YYYY-MM-DD HH:mm:ss ')
						el['state_visit_date'] = el.state === 'visit' ? this.$moment(el.updated_at).format('YYYY-MM-DD HH:mm') : ''
						el['cancel_visit'] = el.status === 2 ? this.$moment(el.updated_at).format('YYYY-MM-DD HH:mm') : ''
						if (el.status !== 2) {
							if (el.state === 'reserve') {
								el['state_visit'] = '미방문'
							} else {
								el['state_visit'] = '방문'
							}
						} else {
							el['state_visit'] = '취소'
						}
					})

					this.excel_title = '방문예약 고객 관리 리스트.xls'
					this.excel_items = new_items
				} else if (this.excelType === 'visit_customer') {
					// 방문 고객 관리 excel 정리
					let new_items = JSON.parse(JSON.stringify(this.datatable.items))

					new_items.forEach(el => {
						el.phone = el.phone.replace(/^(\d{2,3})(\d{3,4})(\d{4})$/, `$1-$2-$3`)
						el['visit'] = '현장등록'
						el['created_at_time'] = this.$moment(el.created_at).format('YYYY-MM-DD HH:mm')
					})

					this.excel_title = '방문 고객 관리 리스트.xls'
					this.excel_items = new_items
				} else if (this.excelType === 'counselor_customer') {
					// 상담 고객 관리 excel 정리
					let new_items = JSON.parse(JSON.stringify(this.datatable.items))

					new_items.forEach(el => {
						el.phone = el.phone.replace(/^(\d{2,3})(\d{3,4})(\d{4})$/, `$1-$2-$3`)
						el['created_at'] = this.$moment(el.created_at).format('YYYY-MM-DD')
						if (el.stat === 0) {
							el['stat'] = '상담 예약'
						} else if (el.stat === 1) {
							el['stat'] = '상담중'
						} else if (el.stat === 2) {
							el['stat'] = '미처리'
						} else if (el.stat === 9) {
							el['stat'] = '상담 완료'
						}

						el['rdate'] = this.$moment(el.rdate)
							.subtract(9, 'hours')
							.format('YYYY-MM-DD HH:mm:ss')

						if (el.userData) {
							this.userData_parsing(el)
						}
					})

					this.excel_title = '상담 고객 관리 리스트.xls'
					this.excel_items = new_items
				} else if (this.excelType === 'event_customer') {
					// 이벤트 참여 고객 관리 excel 정리
					let new_items = JSON.parse(JSON.stringify(this.datatable.items))

					new_items.forEach(el => {
						el.phone = el.phone.replace(/^(\d{2,3})(\d{3,4})(\d{4})$/, `$1-$2-$3`)
						el['created_at'] = this.$moment(el.created_at).format('YYYY-MM-DD')
						if (el.stat === 0) {
							el['stat'] = '상담 예약'
						} else if (el.stat === 1) {
							el['stat'] = '상담중'
						} else if (el.stat === 2) {
							el['stat'] = '미처리'
						} else if (el.stat === 9) {
							el['stat'] = '상담 완료'
						}

						el['rdate'] = this.$moment(el.rdate)
							.subtract(9, 'hours')
							.format('YYYY-MM-DD HH:mm:ss')

						if (el.userData) {
							this.userData_parsing(el)
						}
					})
					this.excel_title = '이벤트 참여 고객 관리 리스트.xls'
					this.excel_items = new_items
				} else if (this.excelType === 'freind_talk_tamplate_excel') {
					// 친구톡 템플릿 관리 excel 정리
					this.excel_title = '친구톡 템플릿 관리 리스트.xls'

					this.json_fields = {
						'템플릿 제목': 'title',
						'템플릿 유형': 'category_text',
						등록일: 'created_at_detail',
						'템플릿 분류': 'type_text',
						'템플릿 형태': 'form_text',
						버튼정보: 'buttons_text',
						'친구톡 이미지': 'mainImg_url',
						'친구톡 내용': 'content',
						'대체문자 이미지': 'lmsImg_url',
						'대체문자 내용': 'lmsContent',
					}

					this.excel_items = this.datatable.items
				} else if (this.excelType === 'freind_talk_tamplate_dialog_excel') {
					this.excel_title = '친구톡 수신 리스트.xls'

					this.json_fields = {
						No: 'talk_no',
						이름: 'name',
						'수신 번호': 'talk_phone',
						결과: 'talk_status',
					}
					this.excel_items = this.datatable.origin_items
				} else if (this.excelType === 'freind_talk_sent_list_excel') {
					// 친구톡 발송 결과 리스트 excel 정리
					let new_items = JSON.parse(JSON.stringify(this.datatable.items))

					this.excel_title = '친구톡 발송 결과 리스트.xls'
					this.excel_items = new_items
				} else if (this.excelType === 'unsubscribes_excel') {
					// 수신 거부 리스트 excel 정리
					let new_items = JSON.parse(JSON.stringify(this.datatable.items))

					this.excel_title = '수신 거부 리스트.xls'
					this.excel_items = new_items
				} else if (this.excelType === 'ft_report_excel') {
					// 친구톡 발송 통계 리스트 excel 정리
					let new_items = JSON.parse(JSON.stringify(this.datatable.items))

					this.excel_title = '친구톡 발송 통계 리스트.xls'
					this.excel_items = new_items
				} else if (this.excelType === 'business_excel') {
					let new_items = JSON.parse(JSON.stringify(this.datatable.items))
					this.json_fields = {
						지점명: 'title',
						위치: 'address',
						대표번호: 'mainPhone',
						생성일: 'created_at',
						관리자: 'manager',
						관리자연락처: 'managerPhone',
						사용인원: 'working',
					}
					new_items.forEach(x => {
						x.created_at = this.$moment(x.created_at).format('YYYY-MM-DD')
					})
					this.excel_items = new_items
					this.excel_title = '지점관리 리스트.xls'
				} else if (this.excelType === 'goodsList') {
					let new_items = JSON.parse(JSON.stringify(this.datatable.items))
					this.excel_title = '상품관리 리스트.xls'
					new_items.forEach(x => {
						x.created_at = this.$moment(x.created_at).format('YYYY-MM-DD')
					})
					this.excel_items = new_items
				} else if (this.excelType === 'attendanceManagement_detail') {
					// 근태관리 자세히보기  excel 정리
					let new_items = JSON.parse(JSON.stringify(this.datatable.selected))

					this.excel_title = '기간내 근무내역 리스트.xls'
					this.json_fields = {
						일자: 'date',
						출근시간: 'startWork',
						퇴근시간: 'endWork',
						근무시간: 'len',
						상태: 'workStatus',
					}
					this.excel_items = new_items
				} else if (this.excelType === 'clientManagement') {
					// 고객관리   excel 정리
					let new_items = JSON.parse(JSON.stringify(this.datatable.selected))

					new_items.forEach(el => {
						el.phone = el.phone.replace(/^(\d{2,3})(\d{3,4})(\d{4})$/, `$1-$2-$3`)
						el.created_at = this.$moment(el.created_at).format('YYYY-MM-DD')
					})
					this.excel_title = '고객관리 리스트.xls'
					this.json_fields = {
						고객명: 'name',
						연락처: 'phone',
						성별: 'sex',
						연령대: 'age',
						거주지: 'address',
						등록일: 'created_at',
						유입경로: 'inflow',
						고객상태: 'status',
						등록상담사: 'counselorName',
					}
					this.excel_items = new_items
				} else if (this.excelType === 'alert_table') {
					// 근태관리 자세히보기  excel 정리
					let new_items = JSON.parse(JSON.stringify(this.datatable.items))

					this.excel_title = '알림톡 관리.xls'
					this.json_fields = {
						'템플릿 명': 'tplCodeStr',
						템플릿코드: 'tplCode',
						승인일: 'created_at',
						적용일: 'created_at',
						내용: 'message',
					}
					new_items.forEach(el => {
						el.created_at = this.$moment(el.created_at).format('YYYY-MM-DD')
					})
					this.excel_items = new_items
				} else {
					let new_items = JSON.parse(JSON.stringify(this.datatable.items))
					new_items.forEach(el => {
						if (el.phone) {
							el.phone = el.phone.replace(/^(\d{2,3})(\d{3,4})(\d{4})$/, `$1-$2-$3`)
						}
						if (el.created_at) {
							el.created_at = this.$moment(el.created_at).format('YYYY-MM-DD')
						}
					})
					this.excel_items = new_items
				}
			},
		},
	},
	methods: {
		deleteNotice(item, biz) {
			this.$store.state.loading = true
			for (let i = 0; i < item.businesses.length; i++) {
				if (item.businesses[i].id === biz.id) {
					item.businesses.splice(i, 1)
				}
			}
			let editId = { id: item.id }
			let li = []
			item.businesses.forEach(el => {
				li.push(el.id)
			})
			editId.businesses = li
			let edit = editId
			this.$store.dispatch('updateNotice', edit).then(() => {
				this.refreshTable()
			})
		},
		holdingStart(picker, item) {
			item.holdingTime1.dialog = false
			item.holdingTime1.time = picker
		},
		holdingEnd(picker, item) {
			item.holdingTime2.dialog = false
			item.holdingTime2.time = picker
		},
		mainPhoneMask(val) {
			if (val.length === 11) {
				return val.replace(/^(\d{2,3})(\d{3,4})(\d{4})$/, `$1-****-$3`)
			} else if (val.indexOf('-') > -1) {
				if (val.length === 10) {
					let data = val.split('-')
					return '****' + '-' + data[1]
				} else {
					let data = val.split('-')
					return data[0] + '-' + '****' + '-' + data[2]
				}
			}
		},
		comma(val) {
			return val.toLocaleString('ko-KR')
		},
		backServerClick(backServer, item) {
			window.open(backServer + item.mainimg.url)
		},
		boardHostClick(boardHost, item) {
			window.open(boardHost + item.groupcode + '/' + item.code)
		},
		counselQRClick(counselQRHost, item) {
			window.open(counselQRHost + item.groupcode + '/' + item.code)
		},
		enterQRClick(enterQRHost, item) {
			window.open(enterQRHost + item.groupcode + '/' + item.code)
		},
		counselerClick(counselser, item) {
			window.open(counselser + item.groupcode + '/' + item.code)
		},
		reservedayClick(reserveDayHost, item) {
			window.open(reserveDayHost + item.groupcode + '/' + item.code)
		},
		reservedirectClick(reserveDirectHost, item) {
			window.open(reserveDirectHost + item.groupcode + '/' + item.code)
		},
		reservevisitClick(reserveVisitHost, item) {
			window.open(process.env.VUE_APP_CUSTOMER_URL + '/reserve_visit/' + item.groupcode + '/' + item.code)
		},
		accessChange(val, accessPermission) {
			const data = {
				acskey: val.acskey,
				state: accessPermission ? 1 : 2,
			}
			this.$store
				.dispatch('updateAdmin', data)
				.then(() => {})
				.catch(() => {})
		},

		statText(data) {
			if (data === 1) {
				return '공개'
			} else if (data === 2) {
				return '비공개'
			}
		},
		statText2(data) {
			if (data === 0) {
				return '사용'
			} else if (data === 1) {
				return '미사용'
			}
		},
		authorityText(data) {
			if (data === '0') {
				return '분양소장'
			} else if (data === '1') {
				return '상담사'
			}
		},
		isuseText(data) {
			if (data === 0) {
				return '운영중'
			} else if (data === 1) {
				return '휴관'
			} else if (data === 2) {
				return '종료'
			}
		},

		isuseCampaign(data) {
			if (data === 1) {
				return 'Y'
			} else if (data === 2) {
				return 'N'
			}
		},
		typeText(data) {
			if (data === 1) {
				return '신청완료'
			} else if (data === 2) {
				return '내앞대기수'
			} else if (data === 3) {
				return '대기'
			} else if (data === 4) {
				return '상담석'
			} else if (data === 5) {
				return '미처리'
			} else if (data === 6) {
				return '방문예약취소'
			}
		},
		typeTerm(data) {
			if (data === 1) {
				return '개인정보 수집 동의'
			} else if (data === 2) {
				return '마케팅 활용 동의'
			} else if (data === 3) {
				return '미동의'
			}
		},
		agreeType(data) {
			if (data === 1) {
				return 'Y'
			} else if (data === 2) {
				return 'N'
			}
		},
		authoredType(data) {
			if (data) {
				return 'Y'
			} else if (!data) {
				return 'N'
			}
		},
		apply(item, index) {
			item.index = index
			this.$store.state.datatableItem = item
			this.applyclick()
		},
		applydelete(item, index) {
			item.index = index
			this.$store.state.datatableItem = item
			this.applydeleteclick()
		},
		pwchange(item) {
			this.$store.state.datatableItem = item
			this.passwordclick()
		},
		saveImg(item) {
			this.$store.state.datatableItem = item
			this.saveImgBtn()
		},
		deleteacskey(item) {
			this.$store.state.datatableItem = item
			this.clickDeleteBtn()
		},
		editacskey(item) {
			this.$store.state.datatableItem = item
			this.datatable.noweditting = this.datatable.items.indexOf(item)
			this.clickEditBtn()
		},
		nameClick(item) {
			this.$store.state.datatableItem = item
			this.datatable.noweditting = this.datatable.items.indexOf(item)
			this.clickName()
		},
		roleTypeText(data) {
			if (data === 'ROLE_SUPER_ADMIN') {
				return 'Super Admin'
			} else if (data === 'ROLE_ADMIN') {
				return 'Admin'
			} else if (data === 'ROLE_USER') {
				return 'CP member'
			} else {
				return 'No Role'
			}
		},
		setIndexNum(id) {
			this.datatable.setIndex = this.datatable.items.map(v => v.userId).indexOf(id)
		},
		showUsesImg(img) {
			this.$store.commit('usersImg', img)
			this.imgDialogShow()
		},
		qrChange() {},

		async clickExport() {
			if (this.call_excel_data) {
				let excel = await this.call_excel_data()
				this.json_fields = excel.json_fields
				this.excel_items = excel.excel_items
				this.excel_title = excel.excel_title
				if (this.excel_items.length === 0) {
					this.sweetInfo.open = true
					this.sweetInfo.title = '파일 다운로드 에러'
					this.sweetInfo.content = '데이터를 클릭후 엑셀 다운로드를 해주세요'
					return
				}

				setTimeout(() => {
					document.getElementById(`excel-down-${this.excelType}`).click()
				}, 200)
			} else {
				if (this.excel_items.length === 0) {
					this.sweetInfo.open = true
					this.sweetInfo.title = '파일 다운로드 에러'
					this.sweetInfo.content = '데이터를 클릭후 엑셀 다운로드를 해주세요'
					return
				}
				setTimeout(() => {
					document.getElementById(`excel-down-${this.excelType}`).click()
				}, 200)
			}
		},

		change_default() {},
		change_team(val, item) {
			item.teamTitle = val
		},
		change_rank(val, item) {
			item.rankTitle = val
		},
		pagination(item) {
			if (item.page > this.page_before.page) {
				// 다음 페이지
				let range = {
					start: (item.page - 1) * item.itemsPerPage,
					limit: item.itemsPerPage,
					itemsPerPage: item.itemsPerPage,
					page: item.page,
				}
				this.$emit('pagination', range)
			} else if (item.itemsPerPage !== this.page_before.itemsPerPage) {
				// 한페이지에 보여줄 아이템 개수 변경
				let range = {
					start: 0,
					limit: item.itemsPerPage,
					itemsPerPage: item.itemsPerPage,
					page: 1,
				}
				this.$emit('pagination', range)
			} else if (item.page < this.page_before.page) {
				// 이전 페이지
				let range = {
					start: (item.page - 1) * item.itemsPerPage,
					limit: item.itemsPerPage,
					itemsPerPage: item.itemsPerPage,
					page: item.page,
				}
				this.$emit('pagination', range)
			}

			this.page_before = JSON.parse(JSON.stringify(item))
		},

		userData_parsing(el) {
			// 고객 데이터중 userData (설문 응답 데이터) 를 excel 다운로드 시에 연결
			el.userData.forEach(question => {
				if (question.type === 21) {
					if (question.imgFiles) {
						let imgFiles = ''
						for (let index = 0; index < question.imgFiles.length; index++) {
							imgFiles += process.env.VUE_APP_BACKEND_URL + question.imgFiles[index].url + (question.imgFiles.length > 1 ? '\n' : '')
						}

						this.json_fields[question.codename] = question.codename
						el[question.codename] = imgFiles
					}
				} else if (question.type === 10) {
					this.json_fields[question.codename] = question.codename
					el[question.codename] = question.value
				} else if (question.type === 11) {
					const categorydatas = []
					const detailDatas = JSON.parse(JSON.stringify(question.category_details)).sort(function(a, b) {
						return a.listorder - b.listorder
					})
					for (let index = 0; index < detailDatas.length; index++) {
						categorydatas.push({
							value: question.value.indexOf(',') > -1 ? question.value.split(',') : question.value ? [question.value] : [],
							detailcode: detailDatas[index].detailname,
							label: detailDatas[index].detailname,
						})
					}
					this.json_fields[question.codename] = question.codename
					el[question.codename] = question.value
				} else if (question.type === 20) {
					this.json_fields[question.codename] = question.codename
					el[question.codename] = question.value
				}
			})
		},
		tableStatus(item) {
			this.$store.state.loading = true
			let data = {
				id: item.id,
				status: item.table_select.value,
			}

			this.$store.dispatch('updateNotice', data).then(() => {
				this.$store.state.loading = false
				item.status = item.table_select.value
				this.$emit('update', item, 'change')
			})
		},
		removeBiz(item, biz) {
			for (let i = 0; i < item.businesses.length; i++) {
				if (item.businesses[i].id === biz.id) {
					item.businesses.splice(i, 1)
				}
			}
			let editId = { id: item.id }
			let li = []
			item.businesses.forEach(el => {
				li.push(el.id)
			})
			editId.businesses = li
			let edit = editId
			this.$store.dispatch('updateNotice', edit).then(() => {
				this.$emit('update')
			})
		},
		changeConfirm(item) {
			this.$store.state.loading = true
			let data = {
				id: item.id,
				confirmed: item.confirmed,
			}

			this.$store.dispatch('updateUser', data).then(() => {
				this.$store.state.loading = false
			})
		},

		phoneCheck(item) {
			//전화번호 체크
			let value = item.phone_edit.value
				.replace(/[^0-9]/g, '')
				.replace(/(^02|^0505|^1[0-9]{3}|^0[0-9]{2})([0-9]+)?([0-9]{4})$/, '$1-$2-$3')
				.replace('--', '-')
			item.phone_edit.value = value
		},
		getPayementDateStyle(item) {
			const paymentDate = this.$moment(item.paymentDate)
			const currentDate = this.$moment()
			const daysMinusPayment = paymentDate.diff(currentDate, 'days')

			if ((daysMinusPayment <= 5 && daysMinusPayment >= 0) || (daysMinusPayment < 0 && item.turnStatus === 'waiting')) {
				return {
					color: 'red',
				}
			}
		},
	},
	props: {
		search: String,
		teamChoiceClick: Function,
		holdingTypeChoice: Function,
		createAssignmentAction: Function,
		teamChange: Function,
		managerChoiceStatusChange: Function,
		teamRankSave: Function,
		salesPhoneNumberSave: Function,
		editUserData: Function,
		clickrow: Function,
		userheaderselect: Object,
		datatable: Object,
		clickViewBtn: Function,
		passwordclick: Function,
		applyclick: Function,
		applydeleteclick: Function,
		clickDeleteBtn: Function,
		saveImgBtn: Function,
		clickEditBtn: Function,
		clickName: Function,
		changeUser: Function,
		clickCollectBtn: Function,
		imgDialogShow: Function,
		detailClick: Function,
		previewClick: Function,
		excelUseYn: String,
		excelTextYn: String,
		excelType: String,
		call_excel_data: Function,
		deleteClick: Function,
		productDetailClick: Function,
		refreshTable: Function,
		editProduct: Function,
	},
}
</script>

<style lang="scss">
.text-start {
	text-align: center !important;
}
.noSort {
	th {
		height: 0px !important;
	}
}
.dt-align-set {
	// margin-left: -16px;
	text-align: center;
}
.OkBtn {
	cursor: pointer;
	text-decoration: underline;
}
.max-width-table .v-data-table__wrapper {
	th {
		width: 120px !important;
		max-width: 120px !important;
	}
	td {
		overflow: auto;
	}
	margin-top: 20px;
}
.datatablehover .v-data-table__wrapper {
	td {
		overflow: auto;
	}
	margin-top: 20px;
}
.cursorDefalut .v-data-table__wrapper {
	td {
		cursor: default;
	}
}
.overflow_common {
	overflow: auto;
}
.datatablehover .v-data-table__wrapper > table > tbody > tr:hover:not(.v-data-table__expanded__content):not(.v-data-table__empty-wrapper) {
	cursor: pointer !important;
	// background-color: #d1d1d1 !important;
}
.action_btn,
.password_btn {
	border: 1px solid #d1d1d1;
	border-radius: 5px 5px 5px 5px;
	font-weight: bold;
}
.whiteBtn {
	border: 1px solid #d1d1d1 !important;
	background-color: white !important;
	border-radius: 5px;
	font-weight: bold;
	width: 100px;
	height: 36px;
}
.font-green {
	color: #4caf50;
}
.font-red {
	color: #ff5252;
}
.nameEvent {
	// color: #fdc85a;
	cursor: pointer !important;
	text-decoration: underline;
}
.datatablehover > .v-data-table > .v-data-table__wrapper > table {
	border-right: 1px solid #d1d1d1;
	border-left: 1px solid #d1d1d1;
	border-bottom: 1px solid #d1d1d1;
	thead {
		background-color: #e9ecf4 !important;

		tr {
			th:not(:last-of-type) {
				border-right: 1px solid #d1d1d1;
			}
			th {
				background-color: #e9ecf4 !important;
				text-align: center !important;
				color: #333333;
				height: 53px;
				border-top: 1px solid #323153;
			}
		}
	}
}

.datatablehover > .v-data-table > .v-data-table__wrapper > table {
	tbody {
		tr {
			td:not(:last-of-type) {
				border-right: 1px solid #d1d1d1;
			}
			td {
				height: 36px;
				text-align: center !important;
				overflow: hidden;
			}
		}
	}
}
.datatablehover > .v-data-table > .v-data-table__wrapper > table {
	tbody {
		tr:hover {
			background-color: #ffd999 !important;
		}
	}
}
.datatablehover > .v-data-table > .v-data-footer {
	justify-content: end;
	padding-right: 0px;
	.v-data-footer__select {
		margin-left: 0px;
	}
}
.datatablehover4 > .v-data-table > .v-data-footer {
	justify-content: start !important;
	padding-right: 0px;
	.v-data-footer__select {
		margin-left: 0px;
	}
}

.datatablehover2 > .v-data-table > .v-data-footer {
	justify-content: center;
	padding-right: 0px;
	.v-data-footer__select {
		margin-left: 0px;
	}
}

.datatablehover > .v-data-table > .v-data-footer > .v-data-footer__select {
	// color: #e89000;
	font-weight: bold;
}
.datatablehover > .v-data-table > .v-data-footer > .v-data-footer__select > div {
	border: 1px solid #c5c5c5;
	border-radius: 5px;
	padding: 0 5px 0 10px;
}
.datatablehover > .v-data-table > .v-data-footer > .v-data-footer__select > div > div > div::before {
	border: none;
}
.datatablehover > .v-data-table > .v-data-footer > .v-data-footer__select > div > div > div {
	border: none;
}
.datatablehover > .v-data-table > .v-data-footer > .v-data-footer__select > div > div > div > .v-menu {
	border: none;
}
.datatablehover > .v-data-table > .v-data-footer > .v-data-footer__select > div > div > div > .v-menu::after {
	border: none;
}
.datatablehover > .v-data-table > .v-data-footer > .v-data-footer__select > div > div > div > div > .v-select__selections {
	width: 20px;
}
.btn-style {
	box-shadow: none;
	background-color: #ffffff;
	border: 1px solid #9a9c9b;
	border-radius: 5px;
	// margin-top: -3rem !important;
	// margin-left: 92.5rem !important;
	position: absolute;
	bottom: 15px;
	right: 0px;
}
.btn-style-type2 {
	box-shadow: none;
	background-color: #ffffff;
	border: 1px solid #9a9c9b;
	border-radius: 5px;
	position: absolute;
	bottom: 460px;
	right: 0px;
}
.customer_dialog_table .v-data-table--fixed-header > div > table > thead > tr > th {
	background: #f5f5f5 !important;
	height: 53px;
}
.reserveTd {
	.label {
		white-space: nowrap;
		overflow-x: auto;
	}
	font-size: 14px;
	color: #434a5d;
	.count {
		font-weight: bold;
		color: #5d19ff;
	}
}
.datatable_excel_text {
	position: absolute;
	bottom: 15px;
	right: 175px;
}
.table_select_box {
	min-height: 23px !important;
	height: 23px !important;
	align-items: center !important;
	font-size: 12px !important;
	.v-input__control {
		height: 23px !important;
		.v-input__slot {
			padding: 0 0 0 10px !important;
			min-height: 23px !important;
			.v-select__slot {
				.v-select__selections {
					padding: 0 !important;
				}
				.v-input__append-inner {
					margin: 0 !important;
				}
			}
		}
	}
}
.product_table {
	border: 1px solid #cfdcdd !important;
	border-radius: 0;
	.v-btn__content {
		color: black;
	}
}
.status_box {
	width: 60px;
	border: 1px solid #c5c5c5;
	background: #f6f6f6;
	font-size: 13px;
	height: 26px;
}
</style>
