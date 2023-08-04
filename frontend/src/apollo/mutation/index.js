import gql from 'graphql-tag'

// 로그인 - admin
export const login = gql`
	mutation login($username: String!, $password: String!) {
		login(input: { identifier: $username, password: $password }) {
			jwt
			user {
				id
				username
				blocked
				email
			}
		}
	}
`
// 단일 파일 업로드 - 파일 컨트롤
export const fileUpload = gql`
	mutation upload($ref: String, $field: String, $source: String, $file: Upload!) {
		upload(ref: $ref, field: $field, source: $source, file: $file) {
			id
			name
			width
			height
			formats
			size
			url
		}
	}
`
// 복수 파일 업로드 - 파일 컨트롤
export const multipleUpload = gql`
	mutation multipleUpload($ref: String, $field: String, $source: String, $files: [Upload]!) {
		multipleUpload(ref: $ref, field: $field, source: $source, files: $files) {
			id
			name
			width
			height
			formats
			size
			url
		}
	}
`
export const multifileUpload = gql`
	mutation multipleUpload($refId: ID, $ref: String, $field: String, $source: String, $files: [Upload]!) {
		multipleUpload(refId: $refId, ref: $ref, field: $field, source: $source, files: $files) {
			id
			created_at
			updated_at
			name
			hash
			ext
			mime
			size
			url
			provider
			provider_metadata
			related {
				__typename
			}
		}
	}
`
export const createGotowork = gql`
	mutation createGotowork(
		$date: Date
		$user: ID!
		$startWork: DateTime
		$endWork: DateTime
		$status: ENUM_GOTOWORKS_STATUS
		$vacation: ID
	) {
		createGotowork(
			input: { data: { date: $date, user: $user, startWork: $startWork, endWork: $endWork, status: $status, vacation: $vacation } }
		) {
			gotowork {
				id
				status
				vacation {
					id
					vacationType
					vacationDate
					vacationStatus
					comment
				}
			}
		}
	}
`
export const updateGotowork = gql`
	mutation updateGotowork($id: ID!, $date: Date, $user: ID!, $startWork: DateTime, $endWork: DateTime, $status: ENUM_GOTOWORKS_STATUS) {
		updateGotowork(
			input: { where: { id: $id }, data: { date: $date, user: $user, startWork: $startWork, endWork: $endWork, status: $status } }
		) {
			gotowork {
				id
			}
		}
	}
`
export const deleteGotowork = gql`
	mutation deleteGotowork($id: ID!) {
		deleteGotowork(input: { where: { id: $id } }) {
			gotowork {
				id
			}
		}
	}
`
export const updateVacation = gql`
	mutation updateVacation(
		$id: ID!
		$user: ID
		$gotowork: ID
		$vacationStatus: ENUM_VACATION_VACATIONSTATUS
		$adminId: String
		$viewStatus: Boolean
		$vacationDate: Date
		$vacationType: String
		$comment: String
	) {
		updateVacation(
			input: {
				where: { id: $id }
				data: {
					vacationStatus: $vacationStatus
					adminId: $adminId
					viewStatus: $viewStatus
					user: $user
					gotowork: $gotowork
					vacationDate: $vacationDate
					vacationType: $vacationType
					comment: $comment
				}
			}
		) {
			vacation {
				id
				gotowork {
					id
				}
			}
		}
	}
`
export const updateUser = gql`
	mutation updateUser($id: ID!, $salesPhoneNumber: String, $rankId: String, $teamID: String) {
		updateUser(input: { where: { id: $id }, data: { salesPhoneNumber: $salesPhoneNumber, rankId: $rankId, teamID: $teamID } }) {
			user {
				id
			}
		}
	}
`

export const updateSettlement = gql`
	mutation updateSettlement(
		$id: ID!
		$attachID: [ID]
		$settlementStatus: ENUM_SETTLEMENT_SETTLEMENTSTATUS
		$adminName: String
		$comment: String
	) {
		updateSettlement(
			input: {
				where: { id: $id }
				data: { attachment: $attachID, settlementStatus: $settlementStatus, adminName: $adminName, comment: $comment }
			}
		) {
			settlement {
				id
				comment
				adminName
				updated_at
				settlementStatus
				attachment {
					id
				}
			}
		}
	}
`
export const createBusiness = gql`
	mutation createBusiness(
		$name: String
		$phoneNumber: String
		$workingHoursStart: Time
		$workingHoursEnd: Time
		$splitHoldingTime: String
		$maximumHoldingTime: String
	) {
		createBusiness(
			input: {
				data: {
					name: $name
					phoneNumber: $phoneNumber
					workingHoursStart: $workingHoursStart
					workingHoursEnd: $workingHoursEnd
					splitHoldingTime: $splitHoldingTime
					maximumHoldingTime: $maximumHoldingTime
				}
			}
		) {
			business {
				id
			}
		}
	}
`
