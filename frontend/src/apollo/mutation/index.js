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
				role {
					name
				}
				workingStatus
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
	mutation createGotowork($date: Date, $userID: String, $startWork: Time, $endWork: Time, $status: ENUM_GOTOWORKS_STATUS, $vacation: ID) {
		createGotowork(
			input: { data: { date: $date, userID: $userID, startWork: $startWork, endWork: $endWork, status: $status, vacation: $vacation } }
		) {
			gotowork {
				id
				status
				startWork
				endWork
				date
				userID
				vacation {
					id
				}
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
export const updateProduct = gql`
	mutation updateProduct(
		$id: ID!
		$housingType: String
		$dong: String
		$ho: String
		$contractStatus: ENUM_PRODUCT_CONTRACTSTATUS
		$editLog: JSON
	) {
		updateProduct(
			input: {
				where: { id: $id }
				data: { housingType: $housingType, dong: $dong, ho: $ho, contractStatus: $contractStatus, editLog: $editLog }
			}
		) {
			product {
				id
				editLog
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
export const deleteProduct = gql`
	mutation deleteProduct($id: ID!) {
		deleteProduct(input: { where: { id: $id } }) {
			product {
				id
			}
		}
	}
`
export const updateVacation = gql`
	mutation updateVacation(
		$id: ID!
		$gotowork: ID
		$vacationStatus: ENUM_VACATION_VACATIONSTATUS
		$adminInfo: JSON
		$vacationType: ENUM_VACATION_VACATIONTYPE
		$rejectComment: String
	) {
		updateVacation(
			input: {
				where: { id: $id }
				data: {
					vacationStatus: $vacationStatus
					adminInfo: $adminInfo
					gotowork: $gotowork
					vacationType: $vacationType
					rejectComment: $rejectComment
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
export const createVacation = gql`
	mutation createVacation(
		$gotowork: ID
		$vacationStatus: ENUM_VACATION_VACATIONSTATUS
		$vacationType: ENUM_VACATION_VACATIONTYPE
		$userID: String
		$vacationReason: String
		$date: Date
	) {
		createVacation(
			input: {
				data: {
					date: $date
					userID: $userID
					vacationStatus: $vacationStatus
					gotowork: $gotowork
					vacationType: $vacationType
					vacationReason: $vacationReason
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
	mutation(
		$name: String!
		$username: String!
		$email: String!
		$password: String!
		$bank: String
		$phoneNumber: String
		$salesPhoneNumber: String
		$accountNumber: String
		$businessRegistration: ID
		$businessNumber: String
		$profile: ID
		$copyAccount: ID
		$employmentContract: ID
		$ID_Card: ID
		$businessID: String
		$company: String
		$rankID: String
		$editLog: JSON
	) {
		register(
			input: {
				name: $name
				username: $username
				email: $email
				password: $password
				bank: $bank
				businessNumber: $businessNumber
				phoneNumber: $phoneNumber
				salesPhoneNumber: $salesPhoneNumber
				accountNumber: $accountNumber
				businessRegistration: $businessRegistration
				profile: $profile
				copyAccount: $copyAccount
				employmentContract: $employmentContract
				ID_Card: $ID_Card
				businessID: $businessID
				company: $company
				rankID: $rankID
				editLog: $editLog
			}
		) {
			jwt
		}
	}
`
export const updateUser = gql`
	mutation updateUser(
		$username: String!
		$email: String!
		$password: String
		$bank: String
		$phoneNumber: String
		$salesPhoneNumber: String
		$accountNumber: String
		$businessRegistration: ID
		$businessNumber: String
		$profile: ID
		$copyAccount: ID
		$employmentContract: ID
		$ID_Card: ID
		$businessID: String
		$company: String
		$rankID: String
		$editLog: JSON
		$id: ID!
		$teamID: String
		$workingStatus: Boolean
	) {
		updateUser(
			input: {
				where: { id: $id }
				data: {
					username: $username
					email: $email
					password: $password
					bank: $bank
					businessNumber: $businessNumber
					phoneNumber: $phoneNumber
					salesPhoneNumber: $salesPhoneNumber
					accountNumber: $accountNumber
					businessRegistration: $businessRegistration
					profile: $profile
					copyAccount: $copyAccount
					employmentContract: $employmentContract
					ID_Card: $ID_Card
					businessID: $businessID
					company: $company
					rankID: $rankID
					editLog: $editLog
					teamID: $teamID
					workingStatus: $workingStatus
				}
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
		$rejectComment: String
		$totalPrice: Long
		$turn: String
		$degree: String
	) {
		updateSettlement(
			input: {
				where: { id: $id }
				data: {
					attachment: $attachID
					totalPrice: $totalPrice
					turn: $turn
					settlementStatus: $settlementStatus
					adminName: $adminName
					rejectComment: $rejectComment
					degree: $degree
				}
			}
		) {
			settlement {
				id
				rejectComment
				adminName
				updated_at
				settlementStatus
				attachment {
					id
				}
				totalPrice
				turn
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
		$location: String
	) {
		createBusiness(
			input: {
				data: {
					location: $location
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
				product
			}
		}
	}
`
export const updateBusiness = gql`
	mutation updateBusiness(
		$id: ID!
		$name: String
		$phoneNumber: String
		$workingHoursStart: Time
		$workingHoursEnd: Time
		$splitHoldingTime: String
		$maximumHoldingTime: String
		$workCheckURL: String
		$product: JSON
		$location: String
	) {
		updateBusiness(
			input: {
				where: { id: $id }
				data: {
					name: $name
					phoneNumber: $phoneNumber
					workingHoursStart: $workingHoursStart
					workingHoursEnd: $workingHoursEnd
					splitHoldingTime: $splitHoldingTime
					maximumHoldingTime: $maximumHoldingTime
					workCheckURL: $workCheckURL
					product: $product
					location: $location
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
		$useYn: Boolean
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
					useYn: $useYn
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
export const updateSettlementTurnTable = gql`
	mutation updateSettlementTurnTable(
		$id: ID!
		$adminName: String
		$PaymentDate: Date
		$turnStatus: ENUM_SETTLEMENTTURNTABLE_TURNSTATUS
		$depositFile: ID
		$amount: Long
		$prePaymentDate: Date
		$bank: String
		$bankAccount: String
		$settlements: ID
		$turnTableDegree: String
		$useYn: Boolean
	) {
		updateSettlementTurnTable(
			input: {
				where: { id: $id }
				data: {
					PaymentDate: $PaymentDate
					turnStatus: $turnStatus
					adminName: $adminName
					depositFile: $depositFile
					amount: $amount
					prePaymentDate: $prePaymentDate
					bank: $bank
					bankAccount: $bankAccount
					settlement: $settlements
					turnTableDegree: $turnTableDegree
					useYn: $useYn
				}
			}
		) {
			settlementTurnTable {
				PaymentDate
				adminName
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
				depositFile {
					id
					url
					name
				}
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
		$ID_Card: ID
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
				ID_Card: $ID_Card
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

export const createSettlementEditLogs = gql`
	mutation createSettlementEditLogs($settlementID: String, $editStatus: ENUM_SETTLEMENTEDITLOG_EDITSTATUS, $editDetail: String) {
		createSettlementEditLog(input: { data: { settlementID: $settlementID, editStatus: $editStatus, editDetail: $editDetail } }) {
			settlementEditLog {
				id
				created_at
				updated_at
				editDetail
				editStatus
				settlementID
			}
		}
	}
`

export const createAssignment = gql`
	mutation createAssignment(
		$useYn: Boolean
		$userID: String
		$status: ENUM_ASSIGNMENT_STATUS
		$type: ENUM_ASSIGNMENT_TYPE
		$start: Time
		$end: Time
		$productID: String
		$orderType: ENUM_ASSIGNMENT_ORDERTYPE
		$holdingTime: String
		$businessID: String
	) {
		createAssignment(
			input: {
				data: {
					useYn: $useYn
					userID: $userID
					status: $status
					type: $type
					start: $start
					end: $end
					productID: $productID
					orderType: $orderType
					holdingTime: $holdingTime
					businessID: $businessID
				}
			}
		) {
			assignment {
				id
			}
		}
	}
`

export const sendSmsSettlement = gql`
	mutation sendSmsSettlement($phoneNumber: String!, $content: String!) {
		sendSmsSettlement(phoneNumber: $phoneNumber, content: $content) {
			ok
		}
	}
`
export const updateAssignment = gql`
	mutation updateAssignment($id: ID!, $status: ENUM_ASSIGNMENT_STATUS, $useYn: Boolean) {
		updateAssignment(input: { where: { id: $id }, data: { status: $status, useYn: $useYn } }) {
			assignment {
				id
			}
		}
	}
`
export const createTeam = gql`
	mutation createTeam($businessID: String, $title: String, $useYn: Boolean) {
		createTeam(input: { data: { businessID: $businessID, title: $title, useYn: $useYn } }) {
			team {
				id
				title
				useYn
				businessID
			}
		}
	}
`
export const createRank = gql`
	mutation createRank($businessID: String, $rankName: String, $useYn: Boolean) {
		createRank(input: { data: { businessID: $businessID, rankName: $rankName, useYn: $useYn } }) {
			rank {
				id
				rankName
				useYn
				businessID
			}
		}
	}
`
export const createSettlement = gql`
	mutation createSettlement(
		$ProductID: String
		$contractDate: DateTime
		$userID: String
		$attachment: [ID]
		$name: String
		$phone: String
		$birth: String
		$location: String
		$subLocation: String
	) {
		createSettlement(
			input: {
				data: {
					ProductID: $ProductID
					contractDate: $contractDate
					userID: $userID
					attachment: $attachment
					name: $name
					phone: $phone
					birth: $birth
					location: $location
					subLocation: $subLocation
				}
			}
		) {
			settlement {
				id
			}
		}
	}
`
export const updateSettlement_front = gql`
	mutation updateSettlement(
		$ProductID: String
		$contractDate: DateTime
		$userID: String
		$attachment: [ID]
		$name: String
		$phone: String
		$birth: String
		$location: String
		$subLocation: String
		$id: ID!
		$settlementStatus: ENUM_SETTLEMENT_SETTLEMENTSTATUS
	) {
		updateSettlement(
			input: {
				where: { id: $id }
				data: {
					settlementStatus: $settlementStatus
					ProductID: $ProductID
					contractDate: $contractDate
					userID: $userID
					attachment: $attachment
					name: $name
					phone: $phone
					birth: $birth
					location: $location
					subLocation: $subLocation
				}
			}
		) {
			settlement {
				id
			}
		}
	}
`
