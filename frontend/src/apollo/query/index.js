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
	query users($date: Date, $teamID: String, $username: String, $status: String, $date_gte: Date, $date_lte: Date, $role: ID) {
		usersConnection {
			aggregate {
				count
			}
		}
		users(where: { username: $username, teamID: $teamID, role: $role }) {
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
	query teams($id: ID, $useYn: Boolean) {
		teams(where: { id: $id, useYn: $useYn }) {
			id
			useYn
			title
		}
	}
`

export const product = gql`
	query($id: ID!) {
		product(id: $id) {
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
