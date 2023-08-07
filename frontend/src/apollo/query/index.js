import gql from 'graphql-tag'

// me 데이터(사용자 정보 || 내 정보)
// admin
export const me = gql`
	query {
		me {
			id
			username
			email
		}
	}
`
export const users = gql`
	query users($idArr: [ID], $date: Date, $teamID: String, $username: String, $status: String, $date_gte: Date, $date_lte: Date, $role: ID) {
		usersConnection {
			aggregate {
				count
			}
		}
		users(where: { id: $idArr, username: $username, teamID: $teamID, role: $role }) {
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
			gotoworks(where: { date: $date, status: $status, date_gte: $date_gte, date_lte: $date_lte }) {
				id
				status
				startWork
				date
				endWork
				business {
					phoneNumber
				}
			}
			vacations(where: { vacationDate: $date }) {
				id
				vacationStatus
				created_at
				vacationDate
				vacationReason
				viewStatus
				vacationType
				comment
			}
			bank
			accountNumber
			rankId
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
export const gotoWork = gql`
	query gotoWorks(
		$date: Date
		$status_check: JSON
		$status: ENUM_GOTOWORKS_STATUS
		$business: ID
		$user: ID
		$date_gte: String
		$date_lte: String
	) {
		gotoworksConnection(where: { user: $user, status_in: $status_check, date_gte: $date_gte, date_lte: $date_lte }) {
			aggregate {
				count
			}
		}
		gotoworks(where: { date: $date, status: $status, business: $business, user: $user, date_gte: $date_gte, date_lte: $date_lte }) {
			id
			date
			status
			startWork
			endWork
			user {
				id
				username
			}
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
	query($idArr: [ID], $housingType: String, $dong: String, $ho: String) {
		products(where: { id: $idArr, housingType: $housingType, dong: $dong, ho: $ho }) {
			id
			housingType
			dong
			ho
			contractStatus
			choiceYn
			assignmentID
		}
	}
`
export const businesses = gql`
	query($name: String) {
		businesses(where: { name_contains: $name }) {
			id
			name
			phoneNumber
			workingHoursStart
			workingHoursEnd
			manager
			managerPhoneNumber
			workCheckURL
			splitHoldingTime
			maximumHoldingTime
			created_at
			managerID
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
	query settlements($id: ID, $settlementStatus: String, $userID: String) {
		settlementsConnection(where: { id: $id, settlementStatus: $settlementStatus }) {
			aggregate {
				count
			}
		}
		settlements(where: { id: $id, settlementStatus: $settlementStatus, userID: $userID }) {
			id
			ProductID
			userID
			contractDate
			settlementStatus
			created_at
			updated_at
			paymentDate
			degree
			attachment {
				id
				name
				url
			}
		}
	}
`
