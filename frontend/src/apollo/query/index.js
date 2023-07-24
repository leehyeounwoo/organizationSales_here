import gql from 'graphql-tag'

// me 데이터(사용자 정보 || 내 정보)
// admin
export const me = gql`
	query {
		me {
			id
			username
			email
			name
			groupcode
			role {
				id
				name
			}
			group {
				id
				groupcode
				logo {
					id
					url
					name
				}
			}
			face {
				id
				url
				name
			}
			visit
			event
			day
			reserveday {
				title
			}
		}
	}
`
export const realTimeCount = gql`
	query realTimeCount($sdate: String, $edate: String, $code: String) {
		realTimeCount(where: { sdate: $sdate, edate: $edate, code: $code }) {
			count
		}
	}
`

// admin, 방문예약
export const counselors = gql`
	query counselors($counselorid: String, $counselorpw: String, $stat: Boolean, $code: String) {
		counselors(where: { counselorid: $counselorid, counselorpw: $counselorpw, stat: $stat, code: $code }) {
			id
			groupcode
			counselorid
			counselorpw
			seat
			etc
			stat
			name
			phone
			authority
			code
			group {
				id
				groupcode
				groupname
				constname
			}
		}
	}
`
// admin, 방문예약, 캠페인
export const groups = gql`
	query groups($groupcode: String) {
		groups(where: { groupcode: $groupcode }, sort: "updated_at:desc") {
			id
			constname
			constcode
			groupcode
			groupname
			phone
			managerpw
			managername
			managerphone
			etc
			isuse
			input_boxes {
				id
				name
				groupcode
				status
			}
			logo {
				id
				url
				name
			}
			color
		}
	}
`
export const groupsChat = gql`
	query groupsChat($groupcode: String) {
		groups(where: { groupcode: $groupcode }) {
			id
			chat
			groupcode
		}
	}
`
export const categories = gql`
	query categories {
		categories {
			id
			groupcode
			code
			codename
			contents
			stat
			type
			listorder
		}
	}
`
// admin
export const categoryDetails = gql`
	query categoryDetails {
		categoryDetails {
			id
			groupcode
			code
			detailcode
			detailname
			stat
			listorder
		}
	}
`
// admin
export const terms = gql`
	query terms($id: ID, $stat: Int, $type: Int, $show: Boolean) {
		terms(where: { id: $id, show: $show, stat: $stat, type: $type }, sort: "updated_at:desc") {
			id
			groupcode
			title
			content
			stat
			version
			type
			show
		}
	}
`
// admin, 방문예약, 캠페인, 통계
export const reservedays = gql`
	query reservedays($code: String, $sdate: DateTime, $type: String, $status: Int) {
		reservedays(sort: "updated_at:desc", where: { code: $code, sdate_lte: $sdate, edate_gte: $sdate, type: $type, status: $status }) {
			id
			groupcode
			title
			loginType
			countYn
			business {
				id
				term {
					id
				}
				alertTalkEtc {
					url
				}
				alertTalkTalk
				alertTalkHomepage
				alertTalkSalesInformation {
					url
				}
				alertTalkSubscriptionInformation {
					url
				}
			}
			startWaitingNumber
			mainimg {
				id
				url
				name
			}
			sdate
			edate
			maxcount
			companion
			tplCode
			nodays
			notimes
			noservices
			input_box {
				id
				name
				categories(where: { stat: 1 }, sort: "listorder:asc") {
					groupcode
					code
					codename
					musthave
					contents
					stat
					tag
					listorder
					type
					explain
					category_details(where: { stat: 1 }, sort: "listorder:asc") {
						groupcode
						code
						detailcode
						detailname
						stat
						listorder
					}
				}
			}
			code
			nodaySetting
			timeRange
			type
			duplicate
			status
			inputBoxType
			directimg {
				id
				url
				name
			}
			endLink
			directInputBoxId
			splitMinute
			population
			accessPhones
			btnText
			consultingTitle
			commentTag
			business {
				id
				title
				btnColor
				color
				QRlogo {
					id
					name
					url
				}
			}
			companionImg {
				id
				name
				url
			}
			totalMaxcount
			openDate
			endDate
			showInfo
			noUserData
			kakaoLogin
			selfAlert
			event {
				id
				title
				code
				start
				end
				priceList
				maxcount
				duplicate
				joinMessage
				winnerMessage
			}
			branch {
				id
				name
				terms {
					id
					title
					content
				}
			}
			duplicationReserve
			product_types {
				id
				code
				title
			}
			main_categories {
				id
				title
				useYn
				sub_categories {
					id
					title
					useYn
					products {
						id
						title
						useYn
					}
				}
			}
		}
	}
`
export const userApis = gql`
	query userApis {
		userApis(where: { status_ne: 99 }, sort: "created_at:desc") {
			id
			created_at
			updated_at
			main
			socket
			statistics
			etc
			admin
			username
			status
			groupcode
		}
	}
`
// admin
export const reserveday = gql`
	query reserveday($id: ID!) {
		reserveday(id: $id) {
			id
			area
			QRlogo {
				id
				url
				name
			}
			btnText
			consultingTitle
			color
			commentTag
			groupcode
			title
			mainimg {
				id
				url
				name
			}
			sdate
			edate
			maxcount
			companion
			tplCode
			nodays
			notimes
			noservices
			input_box {
				id
			}
			code
			nodaySetting
			timeRange
			duplicate
			inputBoxType
			directimg {
				id
				url
				name
			}
			endLink
			directInputBoxId
			splitMinute
			population
			accessPhones
			openDate
			companionImg {
				id
				name
				url
			}
			totalMaxcount
			business {
				id
				title
			}
			showInfo
			noUserData
			kakaoLogin
			selfAlert
		}
		event {
			id
			title
		}
	}
`
// admin, 방문예약, 캠페인
export const messages = gql`
	query messages($tplCode: String, $stat: Int) {
		messages(where: { tplCode: $tplCode, isuse: $stat }) {
			id
			groupcode
			tplCode
			tplCodeStr
			plusid
			senderkey
			smssender
			type
			isuse
			message
			button
		}
	}
`
// admin
export const inputboxes = gql`
	query inputboxes($id: ID) {
		inputBoxes(where: { id: $id, status_ne: 99 }, sort: "updated_at:desc") {
			id
			groupcode
			status
			name
			categories(sort: "listorder:asc") {
				id
				groupcode
				code
				codename
				contents
				stat
				listorder
				type
				explain
				tag
				category_details(sort: "listorder:asc") {
					id
					groupcode
					code
					detailcode
					detailname
					stat
					listorder
				}
			}
			reservedays {
				id
				type
				title
			}
		}
	}
`
export const reserveusersInputBoxTitle = gql`
	query reserveusersInputBoxTitle($inputBoxTitle: String!) {
		reserveusers(where: { inputBoxTitle: $inputBoxTitle }, limit: 1) {
			id
			name
			inputBoxId
		}
	}
`
export const reserveuser = gql`
	query($id: ID!) {
		reserveuser(id: $id) {
			rdate
			name
			state
			updated_at
			id
			visitStatus
		}
	}
`
// 방문예약, 캠페인
export const findReserveusers = gql`
	query findReserveusers(
		$groupcode: String
		$code: String
		$name: String
		$phone: String
		$redate: String
		$rsdate: String
		$title: String
		$status: Int
		$limit: Int
	) {
		reserveusers(
			limit: $limit
			where: {
				groupcode: $groupcode
				code: $code
				name: $name
				phone: $phone
				rdate_gte: $rsdate
				rdate_lte: $redate
				title: $title
				status: $status
			}
			sort: "updated_at:desc"
		) {
			id
		}
	}
`
////  tracking code 제거 reserveusers
export const simpleReserveusers = gql`
	query reserveusers(
		$id: ID
		$groupcode: String
		$code: String
		$name: String
		$phone: String
		$redate: String
		$rsdate: String
		$title: String
		$status: Int
		$inputBoxTitle: String
	) {
		reserveusers(
			where: {
				id: $id
				groupcode: $groupcode
				code: $code
				name_contains: $name
				phone_contains: $phone
				rdate_gte: $rsdate
				rdate_lte: $redate
				title: $title
				status: $status
				inputBoxTitle: $inputBoxTitle
			}
			sort: "updated_at:desc"
		) {
			updated_at
			id
			date
			groupcode
			phone
			name
			ismarketing
			ispersonal
			companion
			cdate
			rdate
			categories
			title
			inputBoxTitle
			inputBoxId
			bigCodes
			checkbox
			checkone
			textfiled
			code
			title
			locationData
			visitStatus
			sub_product {
				id
				Code
				subCode
				title
			}
			product {
				id
				title
				sub_category {
					title
					main_category {
						title
					}
				}
			}
			fileUpload {
				id
				url
				name
			}
			status
			etc
		}
	}
`
// admin, 방문예약, 캠페인
export const reserveusers = gql`
	query reserveusers(
		$groupcode: String
		$code: String
		$name: String
		$phone: String
		$redate: DateTime
		$rsdate: DateTime
		$title: String
		$status: Int
		$inputBoxTitle: String
		$reserveType: ENUM_RESERVEUSERS_RESERVETYPE
		$branch: ID
		$created_at_gte: String
		$created_at_lte: String
		$visitStatus: ENUM_RESERVEUSERS_VISITSTATUS
	) {
		reserveusers(
			where: {
				groupcode: $groupcode
				code: $code
				name_contains: $name
				phone_contains: $phone
				rdate_gte: $rsdate
				rdate_lte: $redate
				title: $title
				status: $status
				inputBoxTitle: $inputBoxTitle
				reserveType: $reserveType
				branch: $branch
				created_at_gte: $created_at_gte
				created_at_lte: $created_at_lte
				visitStatus: $visitStatus
			}
			sort: "updated_at:desc"
		) {
			visitStatus
			reserveName
			useTime
			useDateList
			reserveList
			updated_at
			created_at
			state
			id
			date
			reserveType
			date
			groupcode
			phone
			name
			ismarketing
			ispersonal
			companion
			cdate
			rdate
			categories
			title
			sub_product {
				id
				title
			}
			product {
				title
				sub_category {
					title
					main_category {
						title
					}
				}
			}
			tracking_code {
				id
			}
			locationData
			inputBoxTitle
			inputBoxId
			bigCodes
			checkbox
			checkone
			textfiled
			code
			title
			fileUpload {
				id
				url
				name
			}
			status
			etc
		}
	}
`
// admin
export const Users = gql`
	query user($email: String) {
		users(where: { email: $email }) {
			id
			username
			email
			provider
			confirmed
			blocked
			groupcode
			role {
				id
				name
			}
			group {
				id
				groupcode
				input_boxes {
					id
					name
					groupcode
					status
				}
			}
			out
			language
			marketing
			phone
			marketingDate
			updated_at
			face {
				id
				url
				name
			}
		}
	}
`
export const campaigns = gql`
	query campaigns {
		campaigns {
			id
			groupcode
			groupname
			campaignname
			startdt
			enddt
			regdt
			categories
			messages
			iswaiting
			mainimg {
				id
				url
				name
			}
			agreees
			trusts
			linkurls
			isuse
		}
	}
`
// admin, 방문예약, 캠페인
export const trackingCodes = gql`
	query trackingCodes($code: String, $phone: String, $namesearch: String, $phonesearch: String) {
		trackingCodes(
			limit: 100
			sort: "created_at:desc"
			where: { code: $code, phone: $phone, name_contains: $namesearch, phone_contains: $phonesearch }
		) {
			id
			name
			phone
			code
			reserveusers(sort: "updated_at:desc") {
				id
				name
				groupcode
				code
				sub_product {
					id
					Code
					subCode
					title
				}
				created_at
				rdate
				status
				title
			}
			waitings(sort: "updated_at:desc") {
				id
				commentTag
				date
				groupcode
				phone
				name
				ismarketing
				ispersonal
				cdate
				rdate
				inputBoxTitle
				bigCodes
				checkbox
				checkone
				textfiled
				code
				rdate
				counselorid
				title
				custlike
				recomand
				stat
				etc
			}
		}
	}
`
export const waiting = gql`
	query waiting($id: ID!) {
		waiting(id: $id) {
			counselorid
		}
	}
`
// admin, 방문예약
export const waitings = gql`
	query waitings(
		$phone: String
		$name: String
		$groupcode: String
		$code: String
		$stat: Int
		$redate: String
		$rsdate: String
		$csdate: String
		$cedate: String
		$waitingnum: Int
		$seat: Int
		$seatcall: Int
		$id: ID
		$inputBoxTitle: String
	) {
		waitings(
			limit: 100000
			sort: "updated_at:desc"
			where: {
				id: $id
				phone_contains: $phone
				name_contains: $name
				groupcode: $groupcode
				code: $code
				stat: $stat
				rdate_gte: $rsdate
				rdate_lte: $redate
				cdate_gte: $csdate
				cdate_lte: $cedate
				waitingnum: $waitingnum
				seat: $seat
				seat_ne: $seatcall
				inputBoxTitle: $inputBoxTitle
			}
		) {
			id
			date
			groupcode
			phone
			name
			ismarketing
			ispersonal
			stat
			seat
			waitingnum
			cdate
			custlike
			categories
			local
			locationData
			recomand
			campaignid
			code
			inputBoxTitle
			bigCodes
			checkbox
			textfiled
			checkone
			etc
			fileUpload {
				id
				name
				url
			}
			rdate
			title
			counselorid
			commentTag
		}
	}
`

export const simpleWaitings = gql`
	query waitings(
		$phone: String
		$groupcode: String
		$code: String
		$stat: Int
		$redate: String
		$rsdate: String
		$csdate: String
		$cedate: String
		$waitingnum: Int
		$seat: Int
		$seatcall: Int
		$id: ID
		$inputBoxTitle: String
	) {
		waitings(
			limit: 100000
			sort: "updated_at:desc"
			where: {
				id: $id
				phone: $phone
				groupcode: $groupcode
				code: $code
				stat: $stat
				rdate_gte: $rsdate
				rdate_lte: $redate
				cdate_gte: $csdate
				cdate_lte: $cedate
				waitingnum: $waitingnum
				seat: $seat
				seat_ne: $seatcall
				inputBoxTitle: $inputBoxTitle
			}
		) {
			id
			name
			phone
			stat
			cdate
			waitingnum
			updated_at
		}
	}
`
// admin
export const msgLogs = gql`
	query msgLogs {
		msgLogs {
			id
			message
			groupcode
			phones
			type
			tplCode
			created_at
		}
	}
`
export const msgLog = gql`
	query msgLog($id: ID!) {
		msgLog(id: $id) {
			message
			groupcode
			phones
			type
			created_at
		}
	}
`
// admin, 방문예약, 캠페인
export const reservedayMaxCount = gql`
	query reservedayMaxCount($code: String, $date: String) {
		reservedayMaxCount(where: { code: $code, date: $date }) {
			count
		}
	}
`
// admin, 방문예약, 캠페인
export const reserveusersCount = gql`
	query reserveusersCount($sdate: String, $edate: String, $code: String) {
		reserveusersRangeCount(where: { sdate: $sdate, edate: $edate, code: $code }) {
			count
		}
	}
`
// 통계
export const reserveusersRangeCount = gql`
	query reserveusersRangeCount($sdate: String, $edate: String, $code: String) {
		reserveusersRangeCount(where: { sdate: $sdate, edate: $edate, code: $code }) {
			count
		}
	}
`
// 통계
export const waitingsCount = gql`
	query waitingsCount($date: String) {
		waitingsCount(where: { date: $date }) {
			count
		}
	}
`
// 통계
export const waitingsRangeCount = gql`
	query waitingsRangeCount($sdate: String, $edate: String) {
		waitingsRangeCount(where: { sdate: $sdate, edate: $edate }) {
			count
		}
	}
`
// admin
export const temperatures = gql`
	query temperatures($name: String, $phone: String, $sdate: DateTime, $edate: DateTime, $code: String) {
		temperatures(
			limit: 1000
			where: {
				name_contains: $name
				phone_contains: $phone
				created_at_gte: $sdate
				created_at_lte: $edate
				groupcode: $groupcode
				code: $code
			}
		) {
			id
			name
			phone
			groupcode
			code
			temperature
			agree
			created_at
		}
	}
`
// admin
export const campainCount = gql`
	query campainCount($sdate: String, $edate: String, $status: Int) {
		campainCount(where: { sdate: $sdate, edate: $edate, status: $status }) {
			count
		}
	}
`
// 통계
export const campainListCount = gql`
	query campainListCount($sdate: String, $edate: String, $code: String) {
		campainListCount(where: { sdate: $sdate, edate: $edate, code: $code }) {
			count
		}
	}
`
// 고객관리
export const visitListCount = gql`
	query visitListCount($sdate: String, $edate: String, $code: String) {
		visitListCount(where: { sdate: $sdate, edate: $edate, code: $code }) {
			count
		}
	}
`
// 이벤트 참여통계(당일)
export const eventCount = gql`
	query eventCount($date: String, $code: String) {
		eventCount(where: { date: $date, code: $code }) {
			count
		}
	}
`
// 이벤트 참여통계(기간)
export const eventCountRange = gql`
	query eventCountRange($sdate: String, $edate: String, $code: String) {
		eventCountRange(where: { sdate: $sdate, edate: $edate, code: $code }) {
			count
		}
	}
`
// 알림톡통계(당일)
export const alertCount = gql`
	query alertCount($date: String, $code: String) {
		alertCount(where: { date: $date, code: $code }) {
			count
		}
	}
`
// 알림톡 통계(기간)
export const alertCountRange = gql`
	query alertCountRange($sdate: String, $edate: String, $code: String) {
		eventCountRange(where: { sdate: $sdate, edate: $edate, code: $code }) {
			count
		}
	}
`
alertCountRange
// 방문예약, 캠페인
export const reservedayMaxCount2 = gql`
	query reservedayMaxCount2($code: String, $date: String, $productId: ID) {
		reservedayMaxCount2(where: { code: $code, date: $date, productId: $productId }) {
			count
		}
	}
`
// 통계
export const visitCount = gql`
	query visitCount($date: String, $title: String) {
		visitCount(where: { date: $date, title: $title }) {
			count
		}
	}
`
// 통계
export const visitRangeCount = gql`
	query visitRangeCount($sdate: String, $edate: String, $title: String) {
		visitRangeCount(where: { sdate: $sdate, edate: $edate, title: $title }) {
			count
		}
	}
`
// 상담 고객 통계
export const counselingCount = gql`
	query counselingCount($date: String, $code: String) {
		counselingCount(where: { date: $date, code: $code }) {
			count
		}
	}
`
// 상담 고객 기간 통계
export const counselingRangeCount = gql`
	query counselingRangeCount($sdate: String, $edate: String, $code: String) {
		counselingRangeCount(where: { sdate: $sdate, edate: $edate, code: $code }) {
			count
		}
	}
`

/// 알림톡 전송 현황
export const messageReport = gql`
	query messageReport($edate: String, $sdate: String, $groupcode: String) {
		messageReport(where: { edate: $edate, sdate: $sdate }) {
			count
		}
	}
`

export const alerts = gql`
	query alerts($show: Boolean) {
		alerts(where: { show: $show }) {
			id
			groupcode
			type
			show
			title
			content
			created_at
			alert_datum {
				content
				title
			}
		}
	}
`
export const realTimeWait = gql`
	query realTimeWait($code: String, $phone: String, $date: String) {
		realTimeWait(where: { code: $code, phone: $phone, date: $date }) {
			count
		}
	}
`

export const businesses = gql`
	query businesses($show: Boolean, $groupcode: String) {
		businesses(where: { show: $show, groupcode: $groupcode }) {
			id
			groupcode
			title
			phone
			location
			registration {
				url
			}
			companyName
			adLocation
			homepage
			kakaoChannel
			manager
			managerPhone
			houseNumber
			nomalNumber
			adOpenDate
			specialDate
			firstDate
			secondDate
			comment
			houseType
			btnColor
			color
			privacyTerm
			marketingTerm
			QRlogo {
				url
				name
			}
		}
	}
`
export const showWeb = gql`
	query webs($show: Boolean) {
		webs(where: { show: $show }, limit: 1) {
			id
			created_at
			updated_at
			name
			url
			show
			type
			active
			html
		}
	}
`
export const eventJoins = gql`
	query($code: String, $phone: String, $event: ID) {
		eventJoins(where: { code: $code, phone: $phone, event: $event }) {
			id
			created_at
			updated_at
			name
			phone
			eventTitle
			winner
			winnterTitle
			winnterProduct
			reservedayTitle
			alertTalkmessage
			receipt
			receiptDate
			personalInformation
			userData
			code
			locationData
		}
	}
`
export const events = gql`
	query($status: Int, $title: String, $code: String) {
		events(where: { status: $status, code: $code, title: $title }) {
			id
			title
			start
			end
			business {
				color
				btnColor
			}
			eventImg {
				id
				name
				url
			}
			priceList
			winnerMessage
			joinMessage
			term {
				id
			}
			message {
				tplCode
				tplCodeStr
				plusid
				senderkey
				smssender
				type
				isuse
				message
				button
			}
			loginType
			input_box {
				categories {
					codename
					contents
					stat
					listorder
					type
					explain
					tag
					musthave
					category_details {
						detailcode
						detailname
						stat
						listorder
						etc
					}
				}
			}
			btnText
			maxcount
			accessPhones
			endLink
			population
			duplicate
		}
	}
`
export const reservedayTotalReport = gql`
	query reservedayTotalReport {
		reservedayTotalReport {
			count
		}
	}
`

export const sendMessages = gql`
	query sendMessages($code: String, $tpl_code: String, $receiver_1: String, $created_at_gte: DateTime) {
		sendMessages(where: { code: $code, tpl_code: $tpl_code, receiver_1: $receiver_1, created_at_gte: $created_at_gte }) {
			tpl_code
			receiver_1
		}
	}
`
export const sendSms = gql`
	query($receiver: String, $sender: String, $authCode: String) {
		sendSms(where: { receiver: $receiver, sender: $sender, authCode: $authCode }, sort: "updated_at:desc", limit: 1) {
			sender
			receiver
		}
	}
`
export const mainCategory = gql`
	query mainCategory($id: ID!) {
		mainCategory(id: $id) {
			id
			title
			useYn
			sub_categories {
				title
				id
				useYn
				products {
					id
					title
					useYn
				}
			}
		}
	}
`
export const subCategory = gql`
	query subCategory($id: ID!) {
		subCategory(id: $id) {
			title
			id
			useYn
			products {
				id
				title
				useYn
				productImg {
					id
					url
					name
				}
			}
		}
	}
`
export const productType = gql`
	query($reserveday: ID) {
		productTypes(where: { reserveday: $reserveday }) {
			id
			title
			code
			subCode
			useYn
			reserveday {
				id
			}
		}
	}
`
export const subProducts = gql`
	query($code: JSON) {
		subProducts(where: { Code: $code }) {
			id
			title
			Code
			subCode
			useYn
			typeName
			productImg {
				id
				name
				url
			}
		}
	}
`
