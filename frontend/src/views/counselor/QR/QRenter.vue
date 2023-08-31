<template>
	<div>
		<meta
			name="viewport"
			content="width=device-width, initial-scale=1.0, maximum-scale=1.0, 
     user-scalable=0"
		/>
		<qrcode-stream
			:key="_uid"
			:track="selected.value"
			:torch="torchActive"
			@init="logErrors"
			@decode="onDecode"
			:camera="camera"
			class="qrReader"
		>
			<!-- 상단 메뉴 -->
			<v-layout :class="$vuetify.breakpoint.xs ? 'qrHeadxs' : 'qrHead'">
				<v-flex class="qrTitle">출/퇴근 QR Reader</v-flex>
				<v-spacer />
				<!-- <v-icon size="3vmax" class="iconBtn" color="white" @click="switchCamera">mdi-camera-flip-outline</v-icon> -->
				<v-icon size="3.5vmax" class="iconBtn" color="white" @click="torchActive = !torchActive" :disabled="torchNotSupported">
					mdi-flash-outline
				</v-icon>
			</v-layout>
			<!-- qr 인증성공 메세지 -->
			<div class="confirmation" justify-center v-show="alertCard1">
				<v-card class="alertCard1" color="yellow"> 출근 되었습니다.</v-card>
			</div>
			<!-- 이미 인증됨 메세지 -->
			<div class="confirmation" justify-center v-show="alertCard2">
				<v-card class="alertCard2" color="error"> 이미 출근 되었습니다.</v-card>
			</div>
			<!-- qr 인증 실패 -->
			<div class="confirmation" justify-center v-show="alertCard3">
				<v-card class="alertCard1" color="yellow"> 퇴근 되었습니다.</v-card>
			</div>
			<!-- 이미 퇴근됨 메세지 -->
			<div class="confirmation" justify-center v-show="alertCard4">
				<v-card class="alertCard2" color="error"> 이미 퇴근 되었습니다.</v-card>
			</div>
			<!-- qr 인증박스 -->
			<v-layout :class="$vuetify.breakpoint.xs ? 'qrMiddlexs' : 'qrMiddle'" align-center justify-center>
				<div :class="nowWidth"></div>
			</v-layout>
			<!-- 촬영 버튼 -->
			<v-btn color="primary2" style="position: fixed; bottom: 60px;" dark @click="switchCamera" block height="50px">
				<span style="font-size: 20px;"> 카메라 전환</span></v-btn
			>
		</qrcode-stream>
		<sweetAlert :dialog="sweetInfo" @close_active="sweetInfo.title === '오류발생' ? windowClose() : ''" />
	</div>
</template>

<script>
import { sweetAlert } from '@/components'
export default {
	components: {
		sweetAlert,
	},
	data() {
		const options = [
			{ text: 'nothing (default)', value: undefined },
			{ text: 'outline', value: this.paintOutline },
			{ text: 'centered text', value: this.paintCenterText },
			{ text: 'bounding box', value: this.paintBoundingBox },
		]

		const selected = options[1]

		return {
			business: {},
			sweetInfo: {
				open: false,
				title: '',
				content: ``,
				modalIcon: 'info',
				cancelBtnText: '확인',
				buttonType: 'oneBtn',
			},
			selected,
			options,
			groupCodes: [],
			//카메라 방향
			camera: 'front',
			//카메라 유무 체크
			noRearCamera: false,
			noFrontCamera: false,
			// flash light
			torchActive: false,
			torchNotSupported: false,
			// 찍은 qr 정보
			result: null,
			// 인증완료 카드 model
			alertCard1: false,
			alertCard2: false,
			alertCard3: false,
			alertCard4: false,
			// 촬영 버튼
			btn: {
				block: true,
				dark: true,
				height: '7%',
				color: '#7DC269',
				class: 'qrCapture',
				icon: true,
				iconSize: '24px',
			},

			// info 다이어로그
			qrinfoDialog: { dialog: false, title: 'Test Business Name' },
			// 음성 재생 데이터
			voiceList: [],
			greetingSpeech: new window.SpeechSynthesisUtterance(),
			synth: window.speechSynthesis,
			/// user 이름
			userData: {},
			greetingUser: '',
			greetingUser2: '이미 인증되었습니다',
			greetingUser1: '예약일시를 확인하세요',
			greetingNum: '',
			windowWidth: window.innerWidth,
			windowHeight: window.innerHeight,
			groupdata: {},
			/// 상담자 reserve user 데이터
			reservedUser: {},

			// 오늘 대기 번호
			waitNum: '',

			title: '', // (reservedays) 사업지명
			tplCode: '', // tplCode
			messageData: {}, // 알림톡 전송 정보
			originMsg: '',
			voiceSystemsList: {
				StartWork: { voice: '', version: 0 },
				LeaveWork: { voice: '', version: 0 },
				AlreadyStartWork: { voice: '', version: 0 },
				AlreadyLeaveWork: { voice: '', version: 0 },
			},
			ourCoords: {
				//서울 시청 좌표
				latitude: 37.5666263, //위도
				longitude: 126.9783924, //경도
			},
		}
	},
	computed: {
		nowWidth() {
			window.addEventListener('resize', () => {
				this.windowWidth = window.innerWidth
			})
			window.addEventListener('resize', () => {
				this.windowHeight = window.innerHeight
			})
			if (this.windowWidth <= 375) {
				return 'middleSquarexxxs'
			} else if (this.windowWidth <= 375) {
				return 'middleSquarexxs'
			} else if (this.windowWidth <= 425) {
				return 'middleSquarexs'
			} else if (this.windowWidth <= 768) {
				return 'middleSquaresm'
			} else if (this.windowWidth <= 1024) {
				return 'middleSquaremd'
			} else {
				return 'middleSquare'
			}
		},
		nowHeight() {
			window.addEventListener('resize', () => {
				this.windowHeight = window.innerHeight
			})
			return this.windowHeight
		},
	},
	created() {
		this.businesses()
		if (!navigator.geolocation) {
			return this.open_disable_dialog({ title: '오류발생', content: '위치정보를 허용해 주세요.' }, 'error')
		}
	},
	methods: {
		windowClose() {
			window.open('', '_self').close()
		},
		degreesToRadians(degrees) {
			let radians = (degrees * Math.PI) / 180
			return radians
		},
		computeDistance(startCoords, destCoords) {
			var startLatRads = this.degreesToRadians(startCoords.latitude)
			var startLongRads = this.degreesToRadians(startCoords.longitude)
			var destLatRads = this.degreesToRadians(destCoords.latitude)
			var destLongRads = this.degreesToRadians(destCoords.longitude)

			var Radius = 6371 //지구의 반경(km)
			var distance =
				Math.acos(
					Math.sin(startLatRads) * Math.sin(destLatRads) +
						Math.cos(startLatRads) * Math.cos(destLatRads) * Math.cos(startLongRads - destLongRads),
				) * Radius
			return distance
		},
		businesses() {
			const data = {
				code: this.$route.params.code,
			}
			this.$store.dispatch('businesses', data).then(res => {
				if (res.businesses.length === 0)
					return this.open_disable_dialog({ title: '오류발생', content: '존재하지 않는 사업지입니다.' }, 'error')
				else {
					this.business = res.businesses[0]
					this.ourCoords.latitude = Number(this.business.location.split('_')[0])
					this.ourCoords.longitude = Number(this.business.location.split('_')[1])
					navigator.geolocation.getCurrentPosition(position => {
						if (this.computeDistance(position.coords, this.ourCoords) > 3) {
							this.open_disable_dialog({ title: '오류발생', content: '지정된 장소의 3km 이내의 위치에서 QR Reader를 켜주세요.' }, 'error')
						}
					})
				}
			})
		},
		open_disable_dialog(data, info) {
			// 불가 팝업 열기

			this.sweetInfo.title = data.title
			this.sweetInfo.content = data.content
			if (!info) this.sweetInfo.modalIcon = `info`
			else this.sweetInfo.modalIcon = info
			this.sweetInfo.open = true
		},
		voice(voice) {
			this.greetingSpeech.text = `${voice}`
			// 한국어 목소리 선택
			let index = this.voiceList.findIndex(e => e.name === 'Google 한국의')
			this.greetingSpeech.voice = this.voiceList[index]

			this.synth.speak(this.greetingSpeech)
		},
		updateUser_NoAuth(users) {
			const data = {
				id: users.id,
				vacationsDays: users.vacationsDays + 1,
			}
			this.$store.dispatch('updateUser_NoAuth', data).then(() => {})
		},
		turnOffAlert() {
			setTimeout(() => {
				this.alertModal4.dialog = false
			}, 2000)
		},
		paintOutline(detectedCodes, ctx) {
			for (const detectedCode of detectedCodes) {
				const [firstPoint, ...otherPoints] = detectedCode.cornerPoints

				ctx.strokeStyle = 'yellow'

				ctx.beginPath()
				ctx.moveTo(firstPoint.x, firstPoint.y)
				for (const { x, y } of otherPoints) {
					ctx.lineTo(x, y)
				}
				ctx.lineTo(firstPoint.x, firstPoint.y)
				ctx.closePath()
				ctx.stroke()
			}
		},

		paintBoundingBox(detectedCodes, ctx) {
			for (const detectedCode of detectedCodes) {
				const {
					boundingBox: { x, y, width, height },
				} = detectedCode

				ctx.lineWidth = 2
				ctx.strokeStyle = '#007bff'
				ctx.strokeRect(x, y, width, height)
			}
		},

		paintCenterText(detectedCodes, ctx) {
			for (const detectedCode of detectedCodes) {
				const { boundingBox, rawValue } = detectedCode

				const centerX = boundingBox.x + boundingBox.width / 2
				const centerY = boundingBox.y + boundingBox.height / 2

				const fontSize = Math.max(12, (50 * boundingBox.width) / ctx.canvas.width)

				ctx.font = `bold ${fontSize}px sans-serif`
				ctx.textAlign = 'center'

				ctx.lineWidth = 3
				ctx.strokeStyle = '#35495e'
				ctx.strokeText(detectedCode.rawValue, centerX, centerY)

				ctx.fillStyle = '#5cb984'
				ctx.fillText(rawValue, centerX, centerY)
			}
		},

		switchCamera() {
			//카메라 변경
			switch (this.camera) {
				case 'front':
					this.camera = 'rear'
					break
				case 'rear':
					this.camera = 'front'
					break
			}
		},
		async logErrors(promise) {
			try {
				//카메라 변경
				await promise
			} catch (error) {
				const triedFrontCamera = this.camera === 'front'
				const triedRearCamera = this.camera === 'rear'

				const cameraMissingError = error.name === 'OverconstrainedError'

				if (triedRearCamera && cameraMissingError) {
					this.noRearCamera = true
				}

				if (triedFrontCamera && cameraMissingError) {
					this.noFrontCamera = true
				}

				console.error(error)
			}
			try {
				//플래시라이트 on off
				const { capabilities } = await promise

				this.torchNotSupported = !capabilities.torch
			} catch (error) {
				console.error(error)
			}
			try {
				//qr 읽기
				await promise
			} catch (e) {
				console.error(e)
			}
		},
		QRUser(content) {
			const time1 = this.$moment(content.split('/')[1])
			const time2 = this.$moment()
			if (this.$moment.duration(time2.diff(time1)).asSeconds() > 10) {
				this.open_disable_dialog({ title: 'QR만료', content: 'QR코드가 유효시간 10초가 만료되었습니다. \n 다시 켜주세요.' }, 'error')
			} else {
				this.$store.dispatch('gotoWork', { date: this.$moment().format('YYYY-MM-DD'), userID: [content.split('/')[0]] }).then(res => {
					if (res.gotoworks.length > 0) {
						const work = res.gotoworks[0]
						if (work.status === 'startWork' || work.status === 'morningVacation' || work.status === 'afternoonVacation') {
							this.$store
								.dispatch('updateGotowork', {
									id: work.id,
									status: 'endWork',
									endWork: this.$moment().format('HH:mm:ss.SSS'),
									userID: content.split('/')[0],
								})
								.then(() => {
									this.open_disable_dialog({ title: '퇴근완료', content: '퇴근 인증되었습니다. \n오늘도 고생하셨습니다.' }, 'success')
								})
								.catch(() => {
									this.open_disable_dialog(
										{ title: '오류발생', content: '오류가 발생하였습니다. \n새로고침후 다시시도해 주세요.' },
										'error',
									)
								})
						} else if (res.gotoworks[0].status === 'endWork')
							this.open_disable_dialog({ title: '이미 퇴근완료', content: '이미 퇴근 인증이 되었습니다.' })
						else if (res.gotoworks[0].status === 'vacation')
							this.open_disable_dialog({ title: '금일휴가', content: '금일 휴가인 인원입니다. \n휴가날짜를 확인해 주세요.' })
						else this.open_disable_dialog({ title: '확인필요', content: '출퇴근에 확인이 필요한 인원입니다. \n관리자에게 문의하세요.' })
					} else {
						this.$store
							.dispatch('createGotowork', {
								status: 'startWork',
								startWork: this.$moment().format('HH:mm:ss.SSS'),
								userID: content.split('/')[0],
								date: this.$moment().format('YYYY-MM-DD'),
							})
							.then(() => {
								this.open_disable_dialog({ title: '출근완료', content: '출근 인증되었습니다. \n오늘도 화이팅입니다.' })
							})
					}
				})
			}
			this.pause()
			setTimeout(() => {
				this.unpause()
			}, 500)
		},
		async onDecode(content) {
			let nowCamera = this.camera
			this.QRUser(content)
			await this.timeout(1000)
			this.camera = await nowCamera
			await this.timeout(1000)
		},
		unpause() {
			this.camera = 'auto'
		},
		pause() {
			this.camera = 'off'
		},
		timeout(ms) {
			return new Promise(resolve => {
				window.setTimeout(resolve, ms)
			})
		},
	},
}
</script>

<style lang="scss">
.qrReader {
	height: 100vh !important;
}
/// 상단 메뉴 css
.qrHead {
	height: 9%;
	padding: 2vh 0px 0vw 2vw;
}
.qrHeadxs {
	height: 7%;
	padding: 2vh 0px 0vw 2vw;
}
// 상단 사업지명
.qrTitle {
	font-size: 4vh;
	font-weight: bold;
	color: white;
	border-radius: 10px;
	padding: 0.2vw 0px 0px 1vw;
}
.qrTitlexs {
	font-size: 3vh;
	font-weight: bold;
	color: white;
	border: 3px solid white;
	border-radius: 10px;
	padding: 0.2vw 0px 0px 1vw;
}
// 상단 버튼
.iconBtn {
	cursor: pointer;
	margin: 0px 5vw 0px 0px;
}
/// 인증완료 메세지 div
.confirmation {
	z-index: 1;
	position: inherit;
	width: 100%;
	text-align: -webkit-center;
	padding-top: 4vh;
}
/// 인증완료 메세지 카드
.alertCard1 {
	opacity: 0.7;
	width: 25vh;
	font-size: 2vh;
	padding: 10px;
	border-radius: 10px !important;
}
.alertCard2 {
	color: white !important;
	opacity: 0.7;
	width: 40vh;
	font-size: 2vh;
	padding: 10px;
	border-radius: 10px !important;
}
/// qr 인식 layout
.qrMiddle {
	z-index: 2;
	height: 84%;
}
.qrMiddlexs {
	z-index: 2;
	height: 86%;
}
// qr 인식 박스
.middleSquare {
	border: 4px dashed yellow;
	width: 30%;
	height: 69.5%;
}
.middleSquaremd {
	border: 4px dashed yellow;
	width: 48vw;
	height: 55vh;
}
.middleSquaresm {
	border: 4px dashed yellow;
	width: 58vw;
	height: 50vh;
}
.middleSquarexs {
	border: 4px dashed yellow;
	width: 63vw;
	height: 30vh;
}
.middleSquarexxs {
	border: 4px dashed yellow;
	width: 71vw;
	height: 30vh;
}
.middleSquarexxxs {
	border: 4px dashed yellow;
	width: 71vw;
	height: 25.5vh;
}
.hideBtn {
	display: none;
}
</style>
