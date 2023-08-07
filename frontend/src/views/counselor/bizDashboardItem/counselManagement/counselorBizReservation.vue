<template>
	<div class="counselor_container">
		<div :class="tab === 1 ? 'counselor_content_wrap' : 'counsel_create_wrap'" class="sticky_wrap">
			<div class="top_sticky_header">
				<v-layout justify-center class="tab_name_bar">
					<div class="header_left_btn">
						<v-btn icon x-large @click="to_bizDashboard()">
							<v-icon>
								mdi-chevron-left
							</v-icon>
						</v-btn>
					</div>
					<span>
						상담관리
					</span>
				</v-layout>
				<v-tabs v-model="tab" color="primary2" grow :slider-size="1">
					<v-tab :class="tab === 1 ? 'deactive_tab' : ''">
						상담예약하기
					</v-tab>
					<v-tab :class="tab === 0 ? 'deactive_tab' : ''">
						상담예약관리
					</v-tab>
				</v-tabs>
			</div>

			<v-tabs-items v-model="tab" style="background-color:transparent">
				<!-- 상담예약하기 -->
				<v-tab-item class="create_tab_item">
					<div class="px-5 pb-10 pt-5">
						<div>
							<v-item-group v-model="reservation_step" class="text-center" mandatory>
								<v-item v-for="n in reservation_total" :key="`btn-${n}`" v-slot="{ active }" :class="n < 3 ? 'mr-1' : ''">
									<v-btn :input-value="active" :color="active ? 'primary2' : ''" class="no_ripple_btn" icon :ripple="false" x-small>
										<v-icon x-small>mdi-record</v-icon>
									</v-btn>
								</v-item>
							</v-item-group>

							<v-window v-model="reservation_step" :touchless="true">
								<!-- 고객정보 입력 -->
								<v-window-item>
									<v-layout class="create_reservation_wrap" wrap>
										<!-- 아이콘 -->
										<v-flex xs12>
											<div style="text-align:center">
												<v-img src="@/assets/images/ico/상담고객정보입력.png" width="60" style="display:inline-flex" />
												<p class="tab_title">상담고객 정보{{ create_reservation.edit ? '수정' : '입력' }}</p>
											</div>
										</v-flex>
										<!-- 고객정보 입력 -->
										<!-- 고객명 -->
										<v-flex xs12 class="mb-3">
											<p class="info_title">고객</p>
											<v-text-field
												hideDetails
												dense
												:autofocus="false"
												outlined
												maxlength="255"
												flat
												color="primary2"
												v-model="create_reservation.name"
												autocomplete="off"
											></v-text-field>
										</v-flex>
										<!-- 연락처 -->
										<v-flex xs12>
											<p class="info_title">연락처</p>
											<v-text-field
												hideDetails
												dense
												:autofocus="false"
												outlined
												maxlength="13"
												flat
												color="primary2"
												v-model="create_reservation.phone"
												@keyup="phoneCheck(create_reservation.phone)"
												autocomplete="off"
											></v-text-field>
										</v-flex>
									</v-layout>
								</v-window-item>

								<!-- 상담 물건 선택 -->
								<v-window-item>
									<v-layout class="create_reservation_wrap" wrap>
										<!-- 아이콘 -->
										<v-flex xs12>
											<div style="text-align:center">
												<v-img src="@/assets/images/ico/상담물건선택.png" width="60" style="display:inline-flex" />
												<p class="tab_title">상담물건 {{ create_reservation.edit ? '수정' : '입력' }}</p>
											</div>
										</v-flex>
										<!-- product 셀렉트박스 리스트  -->
										<v-flex xs12 class="mb-3" v-for="(product, index) in create_reservation.product_types" :key="index">
											<p class="info_title display_flex">
												{{
													product.name.indexOf('형') > -1
														? product.name
														: index === create_reservation.product_types.length - 1
														? '물건선택'
														: product.name + '선택'
												}}
												<span
													class="rest_gray"
													v-if="(index === 0 || index === create_reservation.product_types.length - 1) && product.count !== undefined"
												>
													※ 해당 {{ index !== create_reservation.product_types.length - 1 ? product.name + '의' : '' }}
													{{ index !== create_reservation.product_types.length - 1 ? '잔여세대' : '물건' }} 수는
													<span class="rest_black">
														{{ product.count }}{{ index !== create_reservation.product_types.length - 1 ? '세대' : '개' }}
													</span>
													입니다.
												</span>
											</p>
											<v-select
												v-if="index < create_reservation.product_types.length - 1"
												v-model="product.value"
												:items="product.items"
												dense
												hideDetails
												outlined
												flat
												color="primary2"
												@change="productAvailableCounts(index)"
											></v-select>

											<v-layout v-else wrap class="select_product_wrap">
												<v-flex
													xs6
													v-for="(product_item, idx) in product.items"
													:key="`${product_item.text}_${idx}`"
													:class="idx % 2 > 0 ? 'pl-2' : 'pr-2'"
													class="mb-3"
												>
													<v-btn
														color="primary2"
														block
														class="select_product_btn"
														@click="active_product(product_item)"
														dark
														depressed
														height="35"
														:outlined="added_check(product_item)"
													>
														{{ product_item.text }}
													</v-btn>
												</v-flex>
											</v-layout>
										</v-flex>
										<!-- 연락처 -->
									</v-layout>
								</v-window-item>

								<!-- 상담 일시 선택 -->
								<v-window-item>
									<v-layout class="create_reservation_wrap" wrap>
										<!-- 아이콘 -->
										<v-flex xs12>
											<div style="text-align:center">
												<v-img src="@/assets/images/ico/상담일시.png" width="60" style="display:inline-flex" />
												<p class="tab_title">상담일시 {{ create_reservation.edit ? '수정' : '입력' }}</p>
											</div>
										</v-flex>
										<!-- 일자 선택 -->
										<v-flex xs12>
											<p class="info_title display_flex mb-0 pl-2">
												일자선택
											</p>
											<div class="text-center">
												<v-date-picker
													color="primary2"
													class="reserve-datepicker reservation_select"
													width="100%"
													no-title
													locale="ko"
													v-model="selectDatas.date"
													:day-format="dayFormat"
													@change="availableTimes"
													:allowed-dates="allowedDates"
												></v-date-picker>
											</div>
										</v-flex>

										<!-- 시간선택 -->
										<v-flex xs12 v-if="selectDatas.date">
											<p class="info_title display_flex">
												시간선택
												<span class="rest_gray"> ※ 시간은 최대 {{ timeList.reservationTimeMaxSelect }}개 선택할 수 있습니다. </span>
											</p>
										</v-flex>
										<v-layout wrap v-if="selectDatas.date">
											<v-flex xs3 v-for="(time, idx) in timeList.times" :key="`time_${idx}`" :class="'pr-2'" class="mb-2">
												<v-btn
													color="primary2"
													block
													:class="time.active ? 'select_time_btn_active' : 'select_time_btn'"
													@click="click_time(time)"
													:dark="time.available"
													depressed
													height="35"
													:outlined="!time.active && time.available"
													:disabled="!time.available"
												>
													{{ time.time }}
												</v-btn>
											</v-flex>
										</v-layout>
									</v-layout>
								</v-window-item>
							</v-window>
						</div>
					</div>

					<!-- 상담예약하기 푸터 -->
					<div class="counsel_footer">
						<!-- 예약 현황 타이틀 / 버튼 -->
						<v-layout align-center style="height:100%">
							<div class="pa-5 create_title" :class="footer_expand ? 'border_bottom_purple' : ''">
								예약현황
							</div>
							<v-btn icon color="primary2" class="footer_btn" @click="footer_expand = !footer_expand">
								<v-icon>
									{{ footer_expand ? '	mdi-arrow-down-drop-circle-outline' : '	mdi-arrow-up-drop-circle-outline' }}
								</v-icon>
							</v-btn>
						</v-layout>
						<v-layout align-center style="height:100%" wrap v-if="footer_expand">
							<!-- 고객정보 -->
							<v-flex xs12 style="border-bottom:1px solid #dddddd">
								<v-layout wrap>
									<v-flex xs4 class="create_content_title">
										고객정보
									</v-flex>
									<v-flex xs4 class="create_content_info"> {{ create_reservation.name ? create_reservation.name : '-' }}</v-flex>
									<v-flex xs4 class="create_content_info"> {{ create_reservation.phone ? create_reservation.phone : '-' }}</v-flex>
								</v-layout>
							</v-flex>

							<!-- 예약일시 -->
							<v-flex xs12 style="border-bottom:1px solid #dddddd">
								<v-layout wrap>
									<v-flex xs4 class="create_content_title">
										예약일시
									</v-flex>
									<v-flex xs4 class="create_content_info">{{ selectDatas.date ? selectDatas.date : '-' }}</v-flex>
									<v-flex
										xs2
										:offset-xs8="timeIdx > 1 && timeIdx % 2 === 0"
										class="create_content_info"
										v-for="(time, timeIdx) in timeList.times.filter(el => el.active)"
										:key="timeIdx"
										>{{ time.time }}</v-flex
									>
									<v-flex xs2 class="create_content_info" v-if="timeList.times.filter(el => el.active).length === 0"> -</v-flex>
									<v-flex xs2 class="create_content_info" v-if="timeList.times.filter(el => el.active).length < 2"> -</v-flex>
								</v-layout>
							</v-flex>

							<!-- 예약물건 -->
							<v-flex xs12 style="border-bottom:1px solid #dddddd">
								<v-layout wrap>
									<v-flex xs4 class="create_content_title">
										예약물건
									</v-flex>
									<!-- 선택된 물건 -->
									<v-flex
										xs8
										:offset-xs4="index > 0"
										class="create_content_info pr-10"
										v-for="(product, index) in create_reservation.select_products"
										:key="`selected_${index}`"
									>
										<div>
											{{ product.title }}
										</div>
										<v-btn v-if="reservation_step === 1" class="prodcuct_unselect" icon x-small @click="delete_product(index)">
											<v-icon small>
												mdi-close
											</v-icon>
										</v-btn>
									</v-flex>

									<!-- 빈 물건 ( 최대 3개 )-->
									<v-flex
										xs8
										:offset-xs4="empty > 1"
										class="create_content_info pr-10"
										v-for="empty in create_reservation.empty_space"
										:key="`empty_${empty}`"
										v-show="empty > create_reservation.select_products.length"
									>
										-
									</v-flex>
								</v-layout>
							</v-flex>
						</v-layout>

						<!-- 이전/예약하기 버튼 -->
						<v-layout align-center style="height:100%">
							<div style="width:100%" v-if="reservation_step > 0">
								<v-btn class="create_footer_btn" color="primary2" block outlined tile dark depressed height="60" @click="step_back()">
									이전
								</v-btn>
							</div>
							<div style="width:100%">
								<v-btn class="create_footer_btn" color="primary2" block tile dark depressed height="60" @click="step_next()">
									{{ reservation_step === 2 ? '예약하기' : '다음' }}
								</v-btn>
							</div>
						</v-layout>
					</div>
				</v-tab-item>

				<!-- 상담예약관리 -->
				<v-tab-item class="pa-4" style="width:100vw">
					<!-- 이름/번호 검색  -->
					<div class="mb-4">
						<v-text-field
							:autofocus="false"
							class="search-textfiled"
							placeholder="이름/휴대폰번호 검색하세요"
							hideDetails
							maxlength="255"
							append-icon="mdi-magnify"
							flat
							dense
							color="primary2"
							v-model="search"
							@keydown.enter="reservations()"
							@click:append="reservations()"
							autocomplete="off"
						></v-text-field>
					</div>
					<!-- 날짜 선택  -->
					<v-layout align-center class="date_filter mt-6">
						<div style="width:115px">
							<DatepickerDialog
								:picker="startPicker"
								@input="realRangeTimeCount('date_change')"
								class="super_dense"
								:allowed_dates="allowed_datesStart"
							></DatepickerDialog>
						</div>
						<div class="mx-2">
							~
						</div>
						<div style="width:115px" class="mr-1">
							<DatepickerDialog :picker="endPicker" @input="realRangeTimeCount('date_change')" class="super_dense"></DatepickerDialog>
						</div>
						<div style="width:100px" class="ml-auto">
							<v-select
								v-model="day"
								hideDetails
								dense
								:items="days"
								outlined
								@change="dayChange"
								class="super_dense"
								color="primary2"
							></v-select>
						</div>
					</v-layout>

					<!-- 검색결과  -->
					<v-layout class="mt-2 mb-2">
						<div class="manage_table_result">
							검색결과 <span class="ml-2">{{ table_items.length }}</span> 건
						</div>

						<div class="ml-auto" style="width:100px">
							<v-select
								v-model="status_filter.value"
								hideDetails
								dense
								:items="status_filter.items"
								outlined
								@change="reservations()"
								color="primary2"
								class="super_dense"
							></v-select>
						</div>
					</v-layout>
					<!-- 데이터 테이블 -->
					<v-data-table
						mobile-breakpoint="300"
						:headers="headers"
						:items="table_items"
						class="elevation-0 dashboard-table counselor_table table_font"
						:footer-props="{ itemsPerPageText: '' }"
						:options="{ itemsPerPage: 10 }"
						:single-expand="true"
						:expanded.sync="expanded"
						@click:row="exapand_row"
					>
						<!-- 예약물건 -->
						<template v-slot:[`item.products_show`]="{ item }">
							<div style="text-align: start; word-break:break-all;">{{ item.products_show }}</div>
						</template>

						<!-- 예약 일시 -->
						<template v-slot:[`item.times_text`]="{ item }">
							<div style="text-align: start; word-break:break-all;">{{ item.times_text }}</div>
						</template>

						<!-- 확장 -->
						<template v-slot:expanded-item="{ headers, item }">
							<td :colspan="headers.length">
								<v-layout wrap class="expanded_reservation" px-4>
									<!-- 예약물건 -->
									<v-flex xs12 class="expanded_wrap">
										<v-layout>
											<v-flex xs2 class="expanded_title">예약물건</v-flex>
											<v-flex xs10 class="exapanded_content pl-3">
												<div class="reservation_products">
													<!-- 총 물건 -->
													<div>
														<span class="total_products">{{ item.products.length }} </span>
														건
													</div>

													<!-- 물건 리스트 -->
													<div class="products_lists">
														<p>
															{{ item.products.length > 0 ? item.products[0].title : '' }}
														</p>
														<v-expand-transition>
															<div v-show="item.list_expand">
																<p v-for="(product, index) in item.products" :key="index" class="mt-2" v-show="index > 0">
																	{{ product.title }}
																</p>
															</div>
														</v-expand-transition>
													</div>
													<!-- 펼치기 버튼 -->
													<v-btn icon color="primary2" class="expand_btn" @click="item.list_expand = !item.list_expand">
														<v-icon v-if="!item.list_expand">
															mdi-menu-down
														</v-icon>

														<v-icon v-else>
															mdi-menu-up
														</v-icon>
													</v-btn>
												</div>
											</v-flex>
										</v-layout>
									</v-flex>

									<!-- 예약일시 -->
									<v-flex xs12 class="expanded_wrap">
										<v-layout>
											<v-flex xs2 class="expanded_title">예약일시</v-flex>
											<v-flex xs10 class="exapanded_content pl-3 pt-2 display_flex">
												<div>{{ $moment(item.date).format('YY.MM.DD') }}</div>
												<div class="pl-3">{{ item.times ? item.times.split(',').join(' / ') : '' }}</div>
											</v-flex>
										</v-layout>
									</v-flex>

									<!-- 고객명 -->
									<v-flex xs12 class="expanded_wrap">
										<v-layout wrap>
											<v-flex xs2 class="expanded_title">고객명</v-flex>
											<v-flex xs4 class="exapanded_content flex_center pl-3" style="position:relative">
												<span
													:style="item.client && !item.client.birthday ? 'text-decoration: underline;' : ''"
													@click="to_more_info(item)"
												>
													{{ item.name }}
												</span>

												<v-btn
													v-if="item.client && !item.client.birthday"
													icon
													color="primary2"
													x-small
													class="ml-1"
													@click="to_more_info(item)"
												>
													<v-icon>
														mdi-alert-circle-outline
													</v-icon>
												</v-btn>

												<!-- 말풍선 -->
												<div class="ballon" v-if="item.client && !item.client.birthday && item.ballon">
													고객정보를 추가 입력하세요

													<v-btn icon color="white" x-small class="ml-3" @click="item.ballon = false">
														<v-icon>
															mdi-close
														</v-icon>
													</v-btn>
												</div>
											</v-flex>

											<v-flex xs2 class="expanded_title">연락처</v-flex>
											<v-flex xs4 class="exapanded_content flex_center pl-3">
												{{ item.phone }}
											</v-flex>
										</v-layout>
									</v-flex>

									<!-- 상담상태 -->
									<v-flex xs12 class="expanded_wrap" style="border-bottom:none">
										<v-layout>
											<v-flex xs2 class="expanded_title">상담상태</v-flex>
											<v-spacer></v-spacer>
											<v-flex xs10 class="exapanded_content pl-3">
												<v-layout wrap>
													<v-flex xs12>
														<div class="display_flex">
															<v-layout>
																<!-- 상담상태 라디오 -->
																<v-flex xs7>
																	<div>
																		<v-radio-group v-model="item.status" class="small_radio radio_align mt-0" row hideDetails>
																			<v-radio class="mr-1" color="primary2" label="완료" :value="'complete'"></v-radio>
																			<v-radio color="primary2" label="미완료" :value="'incomplete'"></v-radio>
																		</v-radio-group>
																	</div>
																</v-flex>
																<!-- <v-spacer></v-spacer> -->
																<v-flex xs5>
																	<!-- 버튼 -->
																	<div class="ml-auto">
																		<v-layout>
																			<v-flex pr-1>
																				<v-btn outlined color="primary2" rounded width="100%" small @click="to_edit(item)">
																					수정
																				</v-btn>
																			</v-flex>
																			<v-flex>
																				<v-btn outlined color="#707070" rounded width="100%" small @click="to_delete(item)">
																					취소
																				</v-btn>
																			</v-flex>
																		</v-layout>
																	</div>
																</v-flex>
															</v-layout>
														</div>
													</v-flex>
													<v-flex xs12>
														<!-- 미완료 사유 -->
														<v-textarea
															v-if="item.status === 'incomplete' || item.status === 'cancel'"
															filled
															hideDetails
															height="110"
															class="mt-2 small_textarea"
															dense
															no-resize
															v-model="item.reason"
															color="primary2"
															background-color="#f3f3f3"
															placeholder="상담 미완료 사유를 반드시 작성해주세요."
														></v-textarea>
													</v-flex>
													<v-flex xs12>
														<v-layout>
															<v-spacer></v-spacer>
															<v-flex xs5>
																<div style="text-align:end;" class="pt-2">
																	<v-btn dark color="primary2" width="100%" rounded small @click="check_validation(item)">
																		상태저장
																	</v-btn>
																</div>
															</v-flex>
														</v-layout>
													</v-flex>
												</v-layout>
											</v-flex>
										</v-layout>
									</v-flex>
								</v-layout>
							</td>
						</template>
					</v-data-table>
					<v-layout justify-end class="py-3">
						<v-btn small outlined class="btn-style ml-3" style="background-color:white" color="green" @click="excelExport()">
							<img src="@/assets/images/excel-img2.png" />
							엑셀저장
						</v-btn>
					</v-layout>
				</v-tab-item>
			</v-tabs-items>
			<!-- 일반 푸터 -->
			<!-- <counselorFooter v-if="tab === 1" class="bottom_fix" /> -->
		</div>

		<download-excel
			class="btn btn-default"
			id="cunselmangage_Excel"
			:data="table_items"
			style="display:none"
			:fields="json_fields"
			type="text/csv;charset=utf8"
			worksheet="My Worksheet"
			name="상담예약관리 리스트"
		/>

		<sweet-alert :dialog="sweetDialog_info" />
		<!-- 상담관리 저장 -->
		<sweet-alert :dialog="sweetDialog_success" @click="clickSave()" />
		<!-- 상담예약하기 저장 -->
		<sweet-alert :dialog="createDialog_success" @click="click_save()" />
		<deleteDialog :setdialog="cancelDialog" :deleteActive="cancelReservation" />
		<!-- 고객상세 팝업 -->
		<clientUpdateDialog :setdialog="client_dialog" :save_end="edit_client_end" />
	</div>
</template>
<script>
import { DatepickerDialog, sweetAlert, deleteDialog, clientUpdateDialog } from '@/components'
import downloadExcel from 'vue-json-excel'

// import changeTime from '../../../../utils/timeRange2.js'
// import tiems from '../../../../utils/times'
export default {
	components: {
		DatepickerDialog,
		// counselorFooter,
		sweetAlert,
		downloadExcel,
		deleteDialog,
		clientUpdateDialog,
	},
	data() {
		return {
			selectDatas: {
				date: '',
				times: [],
			},
			tab: 0,
			date: '',
			productsList: [],
			datas: {
				data1: '',
				data1Items: [],
				data2: '',
				data2Items: [],
				data3: '',
				data3Items: [],
				data4: '',
				data4Items: [],
			},
			headers: [
				{
					text: '이름',
					align: 'center',
					value: 'name',
					width: '22%',
					sortable: false,
				},
				{ text: '예약물건', value: 'products_show', sortable: false, align: 'center', width: '39%' },
				{ text: '예약일시', value: 'times_text', align: 'center', width: '39%' },
			],
			table_items: [],
			expanded: [], //펼쳐진 테이블 아이템
			json_fields: {
				이름: 'name',
				연락처: 'phone',
				예약물건: 'products_show_excel',
				예약일시: 'times_text',
				상담상태: 'status_excel',
			},
			search: '',
			startPicker: {
				class: 'super_dense',
				date: '',
			},
			endPicker: {
				class: 'super_dense',
				date: '',
			},
			day: '전체',
			days: ['전체', '1주일', '15일', '1개월', '3개월'],
			status_filter: {
				value: 'all',
				items: [
					{
						text: '전체',
						value: 'all',
					},
					{
						text: '상담대기',
						value: 'waiting',
					},
					{
						text: '상담 미완료',
						value: 'incomplete',
					},
					{
						text: '상담취소',
						value: 'cancel',
					},
					{
						text: '상담완료',
						value: 'complete',
					},
				],
			},
			houseDatas: [],
			reserveuser: {
				name: '',
				phone: '',
			},
			sweetDialog_info: {
				// 저장 불가 팝업
				open: false,
				title: '사유 작성',
				content: `미완료 사유를 작성해주세요.`,
				buttonType: 'oneBtn',
				saveBtnText: '저장',
				cancelBtnText: '확인',
				modalIcon: 'info',
			},
			sweetDialog_success: {
				// 상담 예약 저장 확인 팝업
				open: false,
				title: '상담상태 저장',
				content: `상담상태를 저장하시겠습니까?`,
				cancelBtnText: '취소',
				buttonType: 'twoBtn',
				saveBtnText: '저장',
				modalIcon: 'success',
				data: {},
			},
			createDialog_success: {
				// 저장 확인 팝업
				open: false,
				title: '상담예약 저장',
				content: `상담예약 정보를 저장하시겠습니까?`,
				cancelBtnText: '취소',
				buttonType: 'twoBtn',
				saveBtnText: '저장',
				modalIcon: 'success',
				data: {},
			},
			cancelDialog: {
				// 예약 취소 다이어로그
				open: false,
				title: '상담취소',
				subtitle: '상담을 취소하시겠어요?',
				explanation: '상담취소 사유를 작성해주세요',
				content: '',
				data: {},
			},

			reservation_step: 0, // 상담하기 현재 진행 스텝
			reservation_total: 3,

			footer_expand: false, //  예약현황 펼침 / 접힙

			create_reservation: {
				// 상담예약하기 정보
				name: '',
				phone: '',
				product_types: [],
				select_products: [],
				empty_space: 3,
				list_called: false,

				edit: false,
				edit_id: null,
			},

			timeList: { times: [], reservationTimeMaxSelect: 0 },

			client_dialog: {
				dialog: false,
				data: {},
			},

			able_date: {
				// 예약 가능 일자
				start: this.$moment(),
				end: this.$moment(),
			},
		}
	},
	async created() {
		if (this.$route.query && this.$route.query.tab) {
			this.tab = 1
			if (this.$route.query.status === 'waiting') {
				this.status_filter.value = 'waiting'
			}
		}

		if (this.tab === 0) {
			this.$store.state.headerMobileStatus = true
			this.$store.state.footerMobileStatus = false
		} else {
			this.$store.state.headerMobileStatus = true
			this.$store.state.footerMobileStatus = true
		}
		await this.me()
		await this.business()
	},
	watch: {
		tab() {
			if (this.tab === 0) {
				this.$store.state.footerMobileStatus = false
			} else {
				this.$store.state.footerMobileStatus = true
			}
		},
	},

	methods: {
		async me() {
			await this.$store
				.dispatch('me')
				.then(res => {
					if (res.role.name !== 'counselor') {
						this.$router.push({ name: 'block' })
						sessionStorage.removeItem('here-t')
					}
				})
				.catch(err => {
					console.log({ err })
					this.$router.push({ name: 'block' })
				})
		},

		allowedDates(val) {
			if (this.able_date.start <= val && this.able_date.end >= val && this.$moment().format('YYYY-MM-DD') <= val) return val
		},
		reservations(date_change) {
			const data = {
				users_permissions_user: this.$store.state.meData.id,
				business: this.$store.state.business.id,
			}
			if (this.status_filter.value !== 'all') {
				data['status'] = this.status_filter.value
			}

			// 전체기간 조회
			if (this.day !== '전체') {
				data['date_gte'] = this.startPicker.date
				data['date_lte'] = this.$moment(this.endPicker.date).format('YYYY-MM-DD')
			}
			// 데이트피커 변경시 조회
			if (date_change) {
				data['date_gte'] = this.startPicker.date
				data['date_lte'] = this.$moment(this.endPicker.date).format('YYYY-MM-DD')
			}
			this.$store.state.loading = true
			this.$store.dispatch('reservations', data).then(res => {
				let items = res.reservations.filter(item => item.name.indexOf(this.search) > -1 || item.phone.indexOf(this.search) > -1)

				items.forEach(el => {
					// 예약 물건
					if (el.products && el.products.length > 0) {
						el['products_show'] = el.products[0].title
						el['products_show_excel'] = el.products.map(prod => prod.title).join(', ')
					} else {
						el['products_show'] = ''
						el['products_show_excel'] = ''
					}

					// 예약 일시
					el['times_text'] = `${this.$moment(el.date).format('YY.MM.DD')} ${el.times ? el.times.split(',').join(' / ') : ''}`

					// 예약 물건 펼침 상태 세팅
					el['list_expand'] = false

					// 고객정보 추가 입력 여부 세팅
					if (el.client && !el.client.birthday) {
						el['ballon'] = true
					} else {
						el['ballon'] = false
					}

					// 상담상태 엑셀
					if (el.status === 'waiting') {
						el['status_excel'] = '상담대기'
					} else if (el.status === 'complete') {
						el['status_excel'] = '상담완료'
					} else if (el.status === 'incomplete') {
						el['status_excel'] = '상담 미완료' + (el.reason ? ` / ${el.reason}` : '')
					} else if (el.status === 'cancel') {
						el['status_excel'] = '상담취소' + (el.reason ? ` / ${el.reason}` : '')
					}
				})

				this.table_items = items
				this.expanded = []
				this.$store.state.loading = false
			})
		},
		excelExport() {
			document.getElementById('cunselmangage_Excel').click()
		},
		allowed_datesEnd(val) {
			if (this.startPicker.date === '') {
				return val
			} else {
				val = this.$moment().format('YYYY-MM-DD') >= val
			}
			return val
		},
		allowed_datesStart(val) {
			if (this.endPicker.date === '') {
				return val
			} else {
				val = this.endPicker.date >= val
			}
			return val
		},

		realRangeTimeCount(date_change) {
			if (this.startPicker.date > this.endPicker.date) {
				this.startPicker.date = this.$moment(this.endPicker.date)
					.subtract(1, 'day')
					.format('YYYY-MM-DD')
			}
			if (this.startPicker.date && this.endPicker.date) {
				this.reservations(date_change)
			}
		},

		dayChange(val) {
			if (this.days[0] === val) {
				this.startPicker = {
					class: 'super_dense',
					date: '',
				}
				this.endPicker = {
					class: 'super_dense',
					date: '',
				}
			} else if (this.days[1] === val) {
				this.startPicker = {
					class: 'super_dense',
					date: this.$moment()
						.subtract(7, 'days')
						.format('YYYY-MM-DD'),
				}
				this.endPicker = {
					class: 'super_dense',
					date: this.$moment().format('YYYY-MM-DD'),
				}
			} else if (this.days[2] === val) {
				this.startPicker = {
					class: 'super_dense',
					date: this.$moment()
						.subtract(15, 'days')
						.format('YYYY-MM-DD'),
				}
				this.endPicker = {
					class: 'super_dense',
					date: this.$moment().format('YYYY-MM-DD'),
				}
			} else if (this.days[3] === val) {
				this.startPicker = {
					class: 'super_dense',
					date: this.$moment()
						.subtract(1, 'months')
						.format('YYYY-MM-DD'),
				}
				this.endPicker = {
					class: 'super_dense',
					date: this.$moment().format('YYYY-MM-DD'),
				}
			} else if (this.days[4] === val) {
				this.startPicker = {
					class: 'super_dense',
					date: this.$moment()
						.subtract(3, 'months')
						.format('YYYY-MM-DD'),
				}
				this.endPicker = {
					class: 'super_dense',
					date: this.$moment().format('YYYY-MM-DD'),
				}
			}
			if (val !== '전체') {
				this.reservations(true)
			} else {
				this.reservations()
			}
		},
		async business() {
			await this.$store.dispatch('business', { id: this.$route.params.id, type: 'reservationTime' }).then(res => {
				this.selectDatas.date = ''

				this.$store.state.business = res.business

				// 상담물건 세팅
				this.create_reservation.product_types = res.business.product.map(el => {
					return {
						name: el.name,
						value: '',
						items: [],
						type: el.value,
					}
				})

				// 상담 예약 가능 날짜 세팅
				let time_system = res.business.systems[0]
				this.able_date = {
					start: time_system.reservationTimeStartDate,
					end: time_system.reservationTimeEndDate,
				}
				this.reservations()
			})
		},

		exapand_row(item) {
			item['list_expand'] = false
			if (this.expanded.length > 0 && this.expanded[0].id === item.id) {
				this.expanded = []
			} else {
				this.expanded = [item]
			}
		},
		to_bizDashboard() {
			// 뒤로가기 버튼
			this.$router.push({
				name: 'counselorBizDashboard',
				params: { id: this.$route.params.id },
			})
		},
		check_validation(item) {
			// 상담상태 저장 밸리데이션
			if (item.status === 'incomplete') {
				if (!item.reason) {
					this.sweetDialog_info.open = true
					this.sweetDialog_info.title = '사유 작성'
					this.sweetDialog_info.content = '미완료 사유를 작성해주세요.'
				} else {
					this.sweetDialog_success.open = true
					this.sweetDialog_success.data = item
				}
			} else {
				this.sweetDialog_success.open = true
				this.sweetDialog_success.data = item
			}
		},
		clickSave() {
			// 상담상태 수정 저장
			this.sweetDialog_success.open = false

			if (this.sweetDialog_success.data.status === 'complete') {
				this.sweetDialog_success.data.reason = ''
			}

			let data = {
				id: this.sweetDialog_success.data.id,
				status: this.sweetDialog_success.data.status,
				reason: this.sweetDialog_success.data.reason,
			}

			this.$store.state.loading = true

			this.$store.dispatch('updateReservation', data).then(() => {
				this.$store.state.loading = false

				// 고객이 계약완료 가 아닌 경우에만 상담 상태 변경시 함께 변경
				this.update_client_status(this.sweetDialog_success.data)
			})
		},

		async update_client_status(data) {
			// 고객이 계약완료 가 아닌 경우에만 상담 상태 변경시 함께 변경
			let client = data.client

			if (client.contractStatus !== 'contractComplete') {
				let update_client = {
					id: client.id,
					contractStatus: '',
					customDatas: {},
				}

				let reserve_status = data.status

				if (reserve_status === 'complete') {
					update_client.contractStatus = 'consultingComplete'
				} else {
					update_client.contractStatus = 'db'
				}

				// customData 에 add_info의 길이가 0 인 경우
				if (data.client.customDatas.add_info && data.client.customDatas.add_info.length === 0) {
					let inputbox_variable = {
						business: this.$store.state.meData.business.id,
					}
					// 설문데이터 호출
					await this.$store.dispatch('inputBoxes', inputbox_variable).then(res => {
						// 설문데이터의 설문 개수 만큼 빈 답변 세팅
						let empty_add_info = []

						for (let index = 0; index < res.inputBoxes[0].categories.length; index++) {
							if (index > 0) {
								empty_add_info.push({
									type: '',
									codeName: '',
									value: '',
								})
							} else {
								let custom_status = {
									type: 12,
									codeName: '고객상태',
									value: '',
								}

								if (reserve_status === 'complete') {
									custom_status.value = '상담완료'
								} else {
									custom_status.value = 'DB등록'
								}

								empty_add_info.push(custom_status)
							}
						}

						data.client.customDatas.add_info = empty_add_info
					})
				} else {
					// 이미 add_info 가 있어서 고객상태 설문의 위치 찾아서 값 변경
					let status_index = data.client.customDatas.add_info.findIndex(el => el.codeName === '고객상태')

					if (status_index > -1) {
						let status_text = ''
						if (reserve_status === 'complete') {
							status_text = '상담완료'
						} else {
							status_text = 'DB등록'
						}
						data.client.customDatas.add_info[status_index].value = status_text
					}
				}
				update_client.customDatas = data.client.customDatas

				await this.$store.dispatch('updateClient', update_client).then(() => {})
			}
		},
		to_edit(item) {
			// 상담 수정 화면으로 이동

			// 상담물건 셀렉트박스 아이템 호출
			if (!this.create_reservation.list_called) {
				this.productAvailableCounts()
			}

			this.tab = 0
			this.reservation_step = 1
			this.selectDatas.date = ''
			this.footer_expand = true

			this.timeList = { times: [], reservationTimeMaxSelect: 0 }

			this.create_reservation.name = item.name
			this.create_reservation.phone = item.phone
				.replace(/[^0-9.]/g, '')
				.replace(/(^02|^0505|^1[0-9]{3}|^0[0-9]{2})([0-9]+)?([0-9]{4})$/, '$1-$2-$3')
				.replace('--', '-')
			this.create_reservation.select_products = []

			// 예약햇던 상담 물건 세팅
			let selected_products = []

			let completed_prod = [] // 계약 완료된 건들
			item.products.forEach(el => {
				let last = this.create_reservation.product_types[this.create_reservation.product_types.length - 1].type
				if (el.status !== 'contractcompleted') {
					selected_products.push({
						text: el[last],
						title: el.title,
						value: Number(el.id),
					})
				} else {
					completed_prod.push(el.title)
				}
			})

			if (completed_prod.length > 0) {
				this.sweetDialog_info.open = true
				this.sweetDialog_info.title = '계약 완료 건 상담에약 불가'
				this.sweetDialog_info.content = `${completed_prod.join(', \n')}

총 ${completed_prod.length}건은 이미 계약이 완료되어
상담예약이 불가합니다.`
			}
			this.create_reservation.select_products = selected_products

			this.create_reservation.product_types.forEach((el, index) => {
				if (index > 0) {
					el.value = ''
					el.items = []
					el.count = undefined
				} else if (index === 0) {
					el.value = ''
					el.count = undefined
				}
			})
			this.create_reservation.edit = true
			this.create_reservation.edit_id = item.id
		},
		to_delete(item) {
			// 예약 취소 얼러트 열기
			this.cancelDialog.open = true
			this.cancelDialog.content = ''
			this.cancelDialog.data = item
		},
		to_more_info(item) {
			this.client_dialog.data = { id: item.client.id }
			this.client_dialog.dialog = true
		},
		cancelReservation() {
			// 예약취소

			if (!this.cancelDialog.content) {
				this.sweetDialog_info.open = true
				this.sweetDialog_info.title = '사유 작성'
				this.sweetDialog_info.content = '취소 사유를 작성해주세요.'
				return
			}

			let data = {
				id: this.cancelDialog.data.id,
				status: 'cancel',
				reason: this.cancelDialog.content,
			}

			this.$store.state.loading = true
			this.$store.dispatch('updateReservation', data).then(() => {
				this.cancelDialog.data.status = 'cancel'
				this.cancelDialog.data.reason = this.cancelDialog.content

				this.cancelDialog.open = false
				this.$store.state.loading = false

				// 고객이 계약완료 가 아닌 경우에만 상담 상태 변경시 함께 변경
				this.update_client_status(this.cancelDialog.data)
			})
		},
		step_back() {
			this.reservation_step--
		},
		step_next() {
			// 상담 예약하기 - 다음으로 버튼 클릭
			if (this.reservation_step === 0) {
				// 고객명/ 연락처 입력
				if (!this.create_reservation.name) {
					this.sweetDialog_info.open = true
					this.sweetDialog_info.title = '고객명 미입력'
					this.sweetDialog_info.content = '고객명을 입력해주세요.'
					return
				} else if (!this.create_reservation.phone) {
					this.sweetDialog_info.open = true
					this.sweetDialog_info.title = '연락처 미입력'
					this.sweetDialog_info.content = '연락처를 입력해주세요.'
					return
				} else if (this.create_reservation.phone.length < 13) {
					this.sweetDialog_info.open = true
					this.sweetDialog_info.title = '잘못된 연락처'
					this.sweetDialog_info.content = '연락처가 올바르지 않습니다.'
					return
				}

				if (!this.create_reservation.list_called) {
					this.productAvailableCounts()
				}
				this.reservation_step++
			} else if (this.reservation_step === 1) {
				// 상담물건 선택
				if (this.create_reservation.select_products.length === 0) {
					this.sweetDialog_info.open = true
					this.sweetDialog_info.title = '상담물건 미선텍'
					this.sweetDialog_info.content = '상담물건을 선택해주세요.'
					return
				} else {
					this.selectDatas.date = ''
					this.timeList = { times: [], reservationTimeMaxSelect: 0 }
					this.reservation_step++
				}
			} else if (this.reservation_step === 2) {
				if (this.timeList.times.filter(el => el.active).length === 0) {
					this.sweetDialog_info.open = true
					this.sweetDialog_info.title = '상담시간 미선텍'
					this.sweetDialog_info.content = '상담시간을 선택해주세요.'
				} else {
					this.createDialog_success.open = true
				}
			}
		},
		phoneCheck(item) {
			//전화번호 체크
			let value = item
				.replace(/[^0-9.]/g, '')
				.replace(/(^02|^0505|^1[0-9]{3}|^0[0-9]{2})([0-9]+)?([0-9]{4})$/, '$1-$2-$3')
				.replace('--', '-')
			this.create_reservation.phone = value
		},

		async productAvailableCounts(index) {
			this.create_reservation.product_types.forEach((el, idx) => {
				if (idx > index) {
					el.value = ''
					el.items = []
					el.count = undefined
				}
			})

			// 상담물건 선택 리스트 세팅
			const data = {
				business: this.$store.state.business.id,
			}

			this.create_reservation.product_types.forEach((el, idx) => {
				if (el.value) {
					if (idx === this.create_reservation.product_types.length - 2) {
						data[`last_${el.type}`] = el.value
					} else {
						data[el.type] = el.value
					}
				}
			})

			this.$store.state.loading = true
			await this.$store.dispatch('productAvailableCounts', data).then(res => {
				res.productAvailableCounts.count.forEach((el, idx) => {
					this.create_reservation.product_types[idx].items = el.items
					this.create_reservation.product_types[idx]['count'] = el.count
				})

				this.create_reservation.list_called = true
				this.$store.state.loading = false
			})
		},
		active_product(product_item) {
			// 물건 선택 하기
			let exist_check = this.create_reservation.select_products.filter(el => el.value === product_item.value)
			if (exist_check.length === 0) {
				this.create_reservation.select_products.push(product_item)
				this.footer_expand = true
			}
		},
		delete_product(index) {
			// 물건 삭제 하기
			this.create_reservation.select_products.splice(index, 1)
		},
		added_check(product_item) {
			// 선택된 물건 확인하기
			let exist_check = this.create_reservation.select_products.filter(el => el.value === product_item.value)
			if (exist_check.length > 0) {
				return false
			} else {
				return true
			}
		},
		dayFormat(day) {
			// 데이트 피커 날짜 보이는 포맷 변경
			const arr = day.split('-')
			return Number(arr[arr.length - 1])
		},

		async availableTimes() {
			// 날짜별 가능 시간 호출
			let data = {
				business: this.$store.state.business.id,
				products: this.create_reservation.select_products.map(el => el.value),
				date: this.selectDatas.date,
			}
			this.$store.state.loading = true
			await this.$store
				.dispatch('availableTimes', data)
				.then(res1 => {
					console.log(res1)
					const data = {
						id: this.$store.state.meData.id,
					}
					this.$store
						.dispatch('users', data)
						.then(res => {
							if (res1.availableTimes.times.times.length !== 0) {
								console.log(11)
								console.log(res1.availableTimes.times.times.length)
								for (let index = 0; index < res1.availableTimes.times.times.length; index++) {
									const element = res1.availableTimes.times.times[index]

									if (res.users[0].reservations.length !== 0) {
										for (let idx = 0; idx < res.users[0].reservations.length; idx++) {
											const el = res.users[0].reservations[idx]

											if (this.selectDatas.date === el.date) {
												if (el.times.includes(element.time)) {
													element.available = false
												}
											}

											if (res1.availableTimes.times.times.length - 1 === index) {
												this.timeList = res1.availableTimes.times
												this.$store.state.loading = false
											}
										}
									} else {
										this.timeList = res1.availableTimes.times
										this.$store.state.loading = false
									}
								}
							} else {
								this.timeList = res1.availableTimes.times
								this.$store.state.loading = false
							}
						})
						.catch(err => {
							console.log({ err })
						})
				})
				.catch(err => {
					console.log({ err })
				})
		},
		click_time(time) {
			// 선택된 물건 확인하기
			if (!time.active && this.timeList.times.filter(el => el.active).length >= this.timeList.reservationTimeMaxSelect) {
				this.sweetDialog_info.open = true
				this.sweetDialog_info.title = `최대 개수 초과`
				this.sweetDialog_info.content = `시간은 최대 ${this.timeList.reservationTimeMaxSelect}개 선택할 수 있습니다.`
			} else {
				time.active = !time.active
			}
		},
		async click_save() {
			if (this.create_reservation.edit) {
				await this.updateReservation()
			} else {
				await this.createReservation()
			}
		},

		async createReservation() {
			// 상담예약 추가
			this.createDialog_success.open = false
			this.$store.state.loading = true

			let variable = {
				business: this.$store.state.business.id,
				products: this.create_reservation.select_products.map(el => el.value),
				date: this.selectDatas.date,
			}
			// 예약 가능 여부 재확인
			await this.$store.dispatch('availableTimes', variable).then(async res => {
				let selected_times = this.timeList.times.filter(el => el.active)

				let called_times = res.availableTimes.times

				let ok = true
				// 선택한 시간의 예약 가능 여부 확인
				selected_times.forEach(el => {
					let same_time = called_times.times.filter(time => time.time === el.time)
					if (!same_time[0].available) {
						ok = false
					}
				})

				if (ok) {
					// 예약 가능 -> 예약 진행

					let exist_client_variable = {
						business: this.$store.state.business.id,
						phone: this.create_reservation.phone.replace(/-/g, ''),
						users_permissions_user: this.$store.state.meData.id,
						contractStatus_not: 'contractComplete',
					}
					// 기존 고객 정보 있는지 확인
					await this.$store.dispatch('client_check', exist_client_variable).then(async res_phone => {
						let create_data = {
							business: this.$store.state.business.id,
							name: this.create_reservation.name,
							phone: this.create_reservation.phone,

							date: this.selectDatas.date,
							times: this.timeList.times
								.filter(el => el.active)
								.map(el => el.time)
								.join(','),
							status: 'waiting',
							products: this.create_reservation.select_products.map(el => el.value),
							users_permissions_user: this.$store.state.meData.id,
						}

						if (res_phone.clients.length > 0) {
							// 기존 고객 정보 있을 시 연결
							create_data['client'] = res_phone.clients[res_phone.clients.length - 1].id

							// 고객의 관심상품에 상담상품 추가
							let exist = res_phone.clients[res_phone.clients.length - 1].products.map(el => el.id)
							let selected = this.create_reservation.select_products.map(el => String(el.value))
							let concated = exist.concat(selected.filter(item => exist.indexOf(item) < 0))

							let update_client = {
								id: res_phone.clients[res_phone.clients.length - 1].id,
								products: concated,
							}
							await this.$store.dispatch('updateClient', update_client).then(() => {})
						} else {
							// 기존 고객 정보 없을 시 생성
							let create_client_input = {
								business: this.$store.state.business.id,
								name: this.create_reservation.name,
								phone: this.create_reservation.phone.replace(/-/g, ''),
								users_permissions_user: this.$store.state.meData.id,
								agreeDate: new Date(),
								customDatas: {
									contract_product: {
										name: '',
										id: '',
									},
									add_info: [],
								},
								products: this.create_reservation.select_products.map(el => el.value),
								contractStatus: 'consultingWait',
							}

							await this.$store.dispatch('createClient', create_client_input).then(async res => {
								this.$store.state.loading = false
								create_data['client'] = res.createClient.client.id
							})
						}

						await this.$store.dispatch('createReservation', create_data).then(() => {
							this.tab = 1
							this.reservation_step = 0
							this.selectDatas.date = ''
							this.footer_expand = false
							this.timeList = { times: [], reservationTimeMaxSelect: 0 }

							this.create_reservation.name = ''
							this.create_reservation.phone = ''
							this.create_reservation.select_products = []

							this.create_reservation.product_types.forEach((el, index) => {
								if (index > 0) {
									el.value = ''
									el.items = []
									el.count = undefined
								} else if (index === 0) {
									el.value = ''
									el.count = undefined
								}
							})
							this.create_reservation.edit = false
							this.create_reservation.edit_id = null

							this.status_filter.value = 'waiting'
							this.dayChange('전체')

							this.reservations()
						})
					})
				} else {
					// 예약 불가
					this.sweetDialog_info.open = true
					this.sweetDialog_info.title = `상담예약 불가`
					this.sweetDialog_info.content = '현재 상담예약된 물건이 존재합니다.'
				}

				this.$store.state.loading = false
			})
		},
		async updateReservation() {
			// 상담고객 수정
			this.createDialog_success.open = false
			this.$store.state.loading = true

			let variable = {
				business: this.$store.state.business.id,
				products: this.create_reservation.select_products.map(el => el.value),
				date: this.selectDatas.date,
			}
			// 예약 가능 여부 재확인
			await this.$store.dispatch('availableTimes', variable).then(async res => {
				let selected_times = this.timeList.times.filter(el => el.active)

				let called_times = res.availableTimes.times

				let ok = true
				// 선택한 시간의 예약 가능 여부 확인
				selected_times.forEach(el => {
					let same_time = called_times.times.filter(time => time.time === el.time)
					if (!same_time[0].available) {
						ok = false
					}
				})

				if (ok) {
					// 예약 가능 -> 예약 진행

					let create_data = {
						id: this.create_reservation.edit_id,
						name: this.create_reservation.name,
						phone: this.create_reservation.phone,
						date: this.selectDatas.date,
						times: this.timeList.times
							.filter(el => el.active)
							.map(el => el.time)
							.join(','),
						products: this.create_reservation.select_products.map(el => el.value),
					}
					this.$store.dispatch('updateReservation', create_data).then(() => {
						this.tab = 1
						this.reservation_step = 0
						this.selectDatas.date = ''
						this.footer_expand = false
						this.timeList = { times: [], reservationTimeMaxSelect: 0 }

						this.create_reservation.name = ''
						this.create_reservation.phone = ''
						this.create_reservation.select_products = []

						this.create_reservation.product_types.forEach((el, index) => {
							if (index > 0) {
								el.value = ''
								el.items = []
								el.count = undefined
							} else if (index === 0) {
								el.value = ''
								el.count = undefined
							}
						})
						this.create_reservation.edit = false
						this.create_reservation.edit_id = null

						this.reservations()
					})
				} else {
					// 예약 불가
					this.sweetDialog_info.open = true
					this.sweetDialog_info.title = `상담예약 불가`
					this.sweetDialog_info.content = '현재 상담예약된 물건이 존재합니다.'
				}

				this.$store.state.loading = false
			})
		},
		edit_client_end() {
			this.client_dialog.dialog = false
			this.reservations()
		},
	},
}
</script>
<style lang="scss">
.table_font {
	div {
		table {
			thead {
				tr {
					th {
						font-size: 0.9rem !important;
						padding: 0px 10px !important;
					}
				}
			}
			tbody {
				tr {
					td {
						font-size: 0.75rem !important;
						padding: 0px !important;
					}
				}
			}
		}
	}
}
.chipStyle {
	color: white !important;
}
.v-input--radio-group.v-input--radio-group--row .v-radio {
	margin-right: 0px !important;
}
</style>
