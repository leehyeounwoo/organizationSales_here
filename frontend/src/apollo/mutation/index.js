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
				workingStatus
				role {
					name
				}
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
	mutation createGotowork($date: Date, $userID: String, $startWork: Time, $endWork: Time, $status: ENUM_GOTOWORKS_STATUS) {
		createGotowork(input: { data: { date: $date, userID: $userID, startWork: $startWork, endWork: $endWork, status: $status } }) {
			gotowork {
				id
				status
				startWork
				endWork
				date
				userID
			}
		}
	}
`
export const createNotice = gql`
	mutation createNotice($title: String, $detail: String, $useYn: Boolean, $fixYn: Boolean, $fileUpload: [ID], $businesses: [ID]) {
		createNotice(
			input: { data: { title: $title, detail: $detail, useYn: $useYn, fixYn: $fixYn, fileUpload: $fileUpload, businesses: $businesses } }
		) {
			notice {
				id
				businesses {
					id
					name
				}
			}
		}
	}
`
export const updateGotowork = gql`
	mutation updateGotowork($id: ID!, $date: Date, $userID: String!, $startWork: Time, $endWork: Time, $status: ENUM_GOTOWORKS_STATUS) {
		updateGotowork(
			input: { where: { id: $id }, data: { date: $date, userID: $userID, startWork: $startWork, endWork: $endWork, status: $status } }
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
export const register = gql`
	mutation register($email: String!, $password: String!, $username: String!, $phoneNumber: String) {
		register(input: { email: $email, password: $password, username: $username, phoneNumber: $phoneNumber }) {
			jwt
			user {
				id
			}
		}
	}
`
export const updateUser = gql`
	mutation updateUser($id: ID!, $salesPhoneNumber: String, $rankID: String, $teamID: String, $businessID: String) {
		updateUser(
			input: {
				where: { id: $id }
				data: { salesPhoneNumber: $salesPhoneNumber, rankID: $rankID, teamID: $teamID, businessID: $businessID }
			}
		) {
			user {
				id
				businessID
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
export const updateNotice = gql`
	mutation updateNotice($id: ID!, $businesses: [ID], $title: String, $detail: String, $useYn: Boolean, $fixYn: Boolean, $fileUpload: [ID]) {
		updateNotice(
			input: {
				where: { id: $id }
				data: { businesses: $businesses, title: $title, detail: $detail, useYn: $useYn, fixYn: $fixYn, fileUpload: $fileUpload }
			}
		) {
			notice {
				id
				businesses {
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
		$workCheckURL: String
		$product: JSON
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
					workCheckURL: $workCheckURL
					product: $product
				}
			}
		) {
			business {
				id
			}
		}
	}
`
export const createProduct = gql`
	mutation createProduct(
		$housingType: String
		$dong: String
		$ho: String
		$businessID: String
		$contractStatus: ENUM_PRODUCT_CONTRACTSTATUS
	) {
		createProduct(
			input: { data: { housingType: $housingType, dong: $dong, ho: $ho, businessID: $businessID, contractStatus: $contractStatus } }
		) {
			product {
				id
			}
		}
	}
`

export const createSettlementTurnTable = gql`
	mutation createSettlementTurnTable(
		$prePaymentDate: Date
		$turnStatus: ENUM_SETTLEMENTTURNTABLE_TURNSTATUS
		$amount: Long
		$settlements: ID!
		$turnTableDegree: String
		$bank: String
		$bankAccount: String
	) {
		createSettlementTurnTable(
			input: {
				data: {
					prePaymentDate: $prePaymentDate
					settlement: $settlements
					turnStatus: $turnStatus
					amount: $amount
					turnTableDegree: $turnTableDegree
					bank: $bank
					bankAccount: $bankAccount
				}
			}
		) {
			settlementTurnTable {
				prePaymentDate
				turnStatus
				amount
				settlement {
					id
					userID
				}
				turnTableDegree
				bank
				bankAccount
			}
		}
	}
`
export const createMessage = gql`
	mutation createMessage($title: String, $detail: String, $useYn: Boolean, $type: ENUM_MESSAGE_TYPE, $businessID: String) {
		createMessage(input: { data: { title: $title, detail: $detail, useYn: $useYn, type: $type, businessID: $businessID } }) {
			message {
				id
				created_at
				detail
				useYn
				type
				title
				businessID
			}
		}
	}
`

export const updateMessage = gql`
	mutation updateMessage($id: ID!, $title: String, $detail: String, $useYn: Boolean, $type: ENUM_MESSAGE_TYPE, $businessID: String) {
		updateMessage(
			input: { where: { id: $id }, data: { title: $title, detail: $detail, useYn: $useYn, type: $type, businessID: $businessID } }
		) {
			message {
				id
				created_at
				detail
				useYn
				type
				title
				businessID
			}
		}
	}
`
export const userInfoEdit = gql`
	mutation userInfoEdit(
		$businessRegistration: ID
		$profile: ID
		$copyAccount: ID
		$employmentContract: ID
		$iD_Card: ID
		$teamID: String
		$rankID: String
		$phoneNumber: String
		$bank: String
		$accountNumber: String
		$salesPhoneNumber: String
		$businessNumber: String
		$businessID: String
	) {
		userInfoEdit(
			input: {
				businessRegistration: $businessRegistration
				profile: $profile
				copyAccount: $copyAccount
				employmentContract: $employmentContract
				iD_Card: $iD_Card
				teamID: $teamID
				rankID: $rankID
				phoneNumber: $phoneNumber
				bank: $bank
				accountNumber: $accountNumber
				salesPhoneNumber: $salesPhoneNumber
				businessNumber: $businessNumber
				businessID: $businessID
			}
		) {
			user {
				id
			}
		}
	}
`

export const createSystem = gql`
	mutation systems($inputFiles: JSON, $turn: String, $businessID: String) {
		createSystem(input: { data: { inputFiles: $inputFiles, turn: $turn, businessID: $businessID } }) {
			system {
				id
				inputFiles
				businessID
				turn
			}
		}
	}
`
