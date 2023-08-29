import gql from 'graphql-tag'

// me 데이터(사용자 정보 || 내 정보)
// admin
export const me = gql`
	query {
		me {
			id
			name
			username
			email
			blocked
			businessNumber
			role {
				name
			}
			bank
			phoneNumber
			salesPhoneNumber
			accountNumber
			businessRegistration {
				name
				url
			}
			profile {
				name
				url
			}
			copyAccount {
				name
				url
			}
			employmentContract {
				name
				url
			}
			ID_Card {
				name
				url
			}
			businessID
			teamID
			company
			rankID
			editLog
		}
	}
`
export const emailDuplicate = gql`
	query($email: String) {
		emailDuplicate(where: { email: $email }) {
			duplicate
		}
	}
`
export const users = gql`
	query users(
		$idArr: [ID]
		$teamID: String
		$username: String
		$roleName: String
		$businessID_null: Boolean
		$workingStatus: Boolean
		$businessID: String
	) {
		usersConnection(where: { role: { name: $roleName }, businessID: $businessID, workingStatus: $workingStatus }) {
			aggregate {
				count
			}
		}
		users(
			where: {
				id: $idArr
				username_contains: $username
				teamID: $teamID
				role: { name: $roleName }
				businessID_null: $businessID_null
				businessID: $businessID
				workingStatus: $workingStatus
			}
		) {
			id
			businessID
			created_at
			updated_at
			username
			email
			blocked
			role {
				id
				name
				description
			}
			salesPhoneNumber
			phoneNumber
			bank
			accountNumber
			teamID
			rankID
			workingStatus
			copyAccount {
				id
				url
				name
			}
			profile {
				id
				url
				name
			}
			employmentContract {
				id
				url
				name
			}
			ID_Card {
				id
				url
				name
			}
			businessRegistration {
				id
				url
				name
			}
		}
	}
`
export const ranks = gql`
	query ranks($idArr: [ID], $useYn: Boolean, $businessID: String) {
		ranks(where: { id: $idArr, useYn: $useYn, businessID: $businessID }) {
			id
			rankName
			useYn
		}
	}
`
export const businessManager = gql`
	query users($id: ID, $username: String, $businessID: String) {
		users(where: { id: $id, username: $username, businessID: $businessID }) {
			id
			businessID
			username
			email
			phoneNumber
		}
	}
`
export const gotoWork = gql`
	query gotoWorks($date: Date, $status_check: JSON, $status: ENUM_GOTOWORKS_STATUS, $userID: [ID!], $date_gte: String, $date_lte: String) {
		gotoworksConnection(where: { date: $date, userID: $userID, status_in: $status_check, date_gte: $date_gte, date_lte: $date_lte }) {
			aggregate {
				count
			}
		}
		gotoworks(where: { date: $date, status: $status, userID: $userID, date_gte: $date_gte, date_lte: $date_lte }) {
			id
			date
			status
			startWork
			endWork
			userID
			vacation {
				id
				vacationType
				created_at
				userID
				date
				rejectComment
				adminInfo
				vacationReason
				vacationStatus
			}
		}
	}
`
export const vacations = gql`
	query vacations($idArr: [ID], $date: Date, $date_gte: Date, $date_lte: Date, $vacationStatus: String) {
		vacations(where: { userID: $idArr, date: $date, date_lte: $date_lte, date_gte: $date_gte, vacationStatus: $vacationStatus }) {
			id
			created_at
			rejectComment
			gotowork {
				id
				startWork
				endWork
				date
				status
				userID
			}
			vacationType
			vacationStatus
			userID
			adminInfo
			vacationReason
			date
		}
	}
`

export const teams = gql`
	query teams($idArr: [ID], $useYn: Boolean, $businessID: String) {
		teams(where: { id: $idArr, useYn: $useYn, businessID: $businessID }) {
			id
			useYn
			title
			businessID
		}
	}
`

export const products = gql`
	query(
		$idArr: [ID]
		$housingType: String
		$dong: String
		$ho: String
		$businessID: String
		$contractStatus: ENUM_PRODUCT_CONTRACTSTATUS
		$start: Int
		$limit: Int
	) {
		products(
			where: {
				id: $idArr
				housingType: $housingType
				dong: $dong
				ho_contains: $ho
				businessID: $businessID
				contractStatus: $contractStatus
			}
			start: $start
			limit: $limit
		) {
			id
			housingType
			dong
			ho
			contractStatus
			choiceYn
			businessID
			editLog
		}
	}
`
export const productsCount = gql`
	query($businessID: String, $contractStatus: ENUM_PRODUCT_CONTRACTSTATUS) {
		productsConnection(where: { businessID: $businessID, contractStatus: $contractStatus }) {
			aggregate {
				totalCount
				count
			}
			values {
				id
				housingType
				dong
				ho
				contractStatus
				choiceYn
				businessID
				editLog
			}
		}
	}
`
export const businesses = gql`
	query($name: String, $idArr: [ID], $code: String) {
		businesses(where: { name_contains: $name, id: $idArr, code: $code }) {
			id
			name
			phoneNumber
			location
			workingHoursStart
			workingHoursEnd
			workCheckURL
			splitHoldingTime
			maximumHoldingTime
			code
			created_at
			product
			location
		}
	}
`
export const businesses_title = gql`
	query businesses {
		businesses {
			id
			name
		}
	}
`
export const notices = gql`
	query($title: String, $businesses: [ID]) {
		notices(where: { title_contains: $title, businesses: $businesses }) {
			id
			title
			created_at
			useYn
			fixYn
			detail
			fileUpload {
				url
				name
			}
			businesses {
				id
				name
			}
		}
	}
`

export const settlements = gql`
	query settlements(
		$id: ID
		$settlementStatus: String
		$userID: String
		$date: DateTime
		$contractDate_lte: DateTime
		$contractDate_gte: DateTime
		$name: String
		$phone: String
		$businessID: String
		$paymentReject: Boolean
	) {
		settlementsConnection(
			where: {
				id: $id
				settlementStatus: $settlementStatus
				created_at_lte: $date
				contractDate_lte: $contractDate_lte
				contractDate_gte: $contractDate_gte
				name_contains: $name
				phone_contains: $phone
				businessID: $businessID
				paymentReject: $paymentReject
			}
		) {
			aggregate {
				count
			}
		}
		settlements(
			where: {
				id: $id
				settlementStatus: $settlementStatus
				userID: $userID
				created_at_lte: $date
				businessID: $businessID
				paymentReject: $paymentReject
			}
		) {
			id
			ProductID
			userID
			contractDate
			settlementStatus
			created_at
			updated_at
			totalPrice
			turn
			degree
			attachment {
				id
				name
				url
			}
			settlement_turn_tables(where: { useYn: true }) {
				id
				turnStatus
				prePaymentDate
				amount
				turnTableDegree
				bank
				bankAccount
				adminName
				PaymentDate
				depositFile {
					id
					url
					name
				}
				useYn
			}
			name
			phone
			birth
			location
			subLocation
			rejectComment
		}
	}
`
export const messages = gql`
	query messages($businessID: ID) {
		messages(where: { businessID: $businessID }) {
			id
			type
			title
			detail
			useYn
		}
	}
`

export const systems = gql`
	query systems($idArr: [ID]) {
		systems(where: { businessID: $idArr }) {
			id
			inputFiles
			businessID
			turn
		}
	}
`
export const usersConnection = gql`
	query usersConnection($teamID: String, $businessID: String, $workingStatus: Boolean, $roleName: String) {
		usersConnection(where: { role: { name: $roleName }, teamID: $teamID, businessID: $businessID, workingStatus: $workingStatus }) {
			aggregate {
				count
				totalCount
			}
			values {
				id
			}
		}
	}
`

export const settlementEditLogs = gql`
	query settlementEditLogs($settlementID: String) {
		settlementEditLogs(where: { settlementID: $settlementID }) {
			id
			created_at
			updated_at
			editDetail
			editStatus
			settlementID
		}
	}
`
export const assignments = gql`
	query assignments(
		$productArr: JSON
		$created_at_lte: DateTime
		$created_at_gte: DateTime
		$status: ENUM_ASSIGNMENT_STATUS
		$businessID: String
		$userID: String
		$sort: String
		$end_gte: Time
	) {
		assignments(
			where: {
				end_gte: $end_gte
				productID: $productArr
				created_at_lte: $created_at_lte
				created_at_gte: $created_at_gte
				useYn: true
				status: $status
				businessID: $businessID
				userID: $userID
			}
			sort: $sort
		) {
			id
			useYn
			userID
			start
			end
			created_at
			updated_at
			type
			orderType
			productID
			status
			holdingTime
		}
	}
`
export const settlementsList = gql`
	query settlementsList(
		$id: ID
		$settlementStatus: String
		$userID: String
		$date: DateTime
		$contractDate_lte: DateTime
		$contractDate_gte: DateTime
		$name: String
		$phone: String
		$ProductID: String
	) {
		settlements(
			where: {
				id: $id
				ProductID: $ProductID
				settlementStatus: $settlementStatus
				created_at_lte: $date
				contractDate_lte: $contractDate_lte
				contractDate_gte: $contractDate_gte
				name_contains: $name
				phone_contains: $phone
				userID: $userID
			}
		) {
			id
			paymentReject
			ProductID
			userID
			contractDate
			settlementStatus
			created_at
			updated_at
			totalPrice
			turn
			degree
			attachment {
				id
				name
				url
			}
			settlement_turn_tables(where: { useYn: true }) {
				id
				turnStatus
				prePaymentDate
				amount
				turnTableDegree
				bank
				bankAccount
				adminName
				PaymentDate
				depositFile {
					id
					url
					name
				}
				useYn
			}
			name
			phone
			birth
			location
			subLocation
			rejectComment
		}
	}
`
