import gql from 'graphql-tag'

// me 데이터(사용자 정보 || 내 정보)
// admin
export const me = gql`
	query {
		me {
			id
			username
			email
			teamID
			role {
				name
			}
		}
	}
`
export const users = gql`
	query users($idArr: [ID], $teamID: String, $username: String, $roleName: String, $businessID_null: Boolean, $date: Date) {
		usersConnection(where: { role: { name: $roleName } }) {
			aggregate {
				count
			}
		}
		users(
			where: { date: $date, id: $idArr, username: $username, teamID: $teamID, role: { name: $roleName }, businessID_null: $businessID_null }
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
	query ranks($idArr: [ID], $useYn: Boolean) {
		ranks(where: { id: $idArr, useYn: $useYn }) {
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
	query gotoWorks(
		$date: Date
		$status_check: JSON
		$status: ENUM_GOTOWORKS_STATUS
		$business: ID
		$userID: [ID!]
		$date_gte: String
		$date_lte: String
	) {
		gotoworksConnection(where: { userID: $userID, status_in: $status_check, date_gte: $date_gte, date_lte: $date_lte }) {
			aggregate {
				count
			}
		}
		gotoworks(where: { date: $date, status: $status, business: $business, userID: $userID, date_gte: $date_gte, date_lte: $date_lte }) {
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
				start
				end
				rejectComment
				adminInfo
				vacationReason
				vacationStatus
			}
		}
	}
`
export const vacations = gql`
	query vacations($idArr: [ID], $date: Date) {
		vacations(where: { userID: $idArr, start: $date }) {
			id
			created_at
			rejectComment
			gotoworks {
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
			start
			end
		}
	}
`

export const teams = gql`
	query teams($idArr: [ID], $useYn: Boolean) {
		teams(where: { id: $idArr, useYn: $useYn }) {
			id
			useYn
			title
		}
	}
`

export const products = gql`
	query($idArr: [ID], $housingType: String, $dong: String, $ho: String, $businessID: String, $contractStatus: ENUM_PRODUCT_CONTRACTSTATUS) {
		products(
			where: {
				id: $idArr
				housingType: $housingType
				dong: $dong
				ho_contains: $ho
				businessID: $businessID
				contractStatus: $contractStatus
			}
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
export const businesses = gql`
	query($name: String, $idArr: [ID]) {
		businesses(where: { name_contains: $name, id: $idArr }) {
			id
			name
			phoneNumber
			workingHoursStart
			workingHoursEnd
			workCheckURL
			splitHoldingTime
			maximumHoldingTime
			code
			created_at
			product
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
	query($title: String) {
		notices(where: { title_contains: $title }) {
			id
			title
			created_at
			useYn
			fixYn
			detail
			businesses {
				id
				name
			}
		}
	}
`

export const settlements = gql`
	query settlements($id: ID, $settlementStatus: String, $userID: String, $date: DateTime) {
		settlementsConnection(where: { id: $id, settlementStatus: $settlementStatus, created_at_lte: $date }) {
			aggregate {
				count
			}
		}
		settlements(where: { id: $id, settlementStatus: $settlementStatus, userID: $userID, created_at_lte: $date }) {
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
	query usersConnection($teamID: String) {
		usersConnection(where: { teamID: $teamID, role: 3 }) {
			aggregate {
				count
				totalCount
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
	query assignments($productArr: JSON, $created_at_lte: DateTime, $created_at_gte: DateTime, $status: ENUM_ASSIGNMENT_STATUS) {
		assignments(
			where: { productID: $productArr, created_at_lte: $created_at_lte, created_at_gte: $created_at_gte, useYn: true, status: $status }
		) {
			id
			useYn
			userID
			start
			end
			created_at
			type
			orderType
			productID
			status
		}
	}
`
