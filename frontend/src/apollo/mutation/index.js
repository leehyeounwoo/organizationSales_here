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
				out
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
// admin
export const createCounselor = gql`
	mutation createCounselor(
		$groupcode: String!
		$counselorid: String!
		$counselorpw: String!
		$phone: String
		$name: String
		$seat: String
		$authority: String
		$stat: Boolean
		$group: ID
		$code: String
	) {
		createCounselor(
			input: {
				data: {
					groupcode: $groupcode
					counselorid: $counselorid
					counselorpw: $counselorpw
					seat: $seat
					stat: $stat
					name: $name
					phone: $phone
					authority: $authority
					group: $group
					code: $code
				}
			}
		) {
			counselor {
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
				group {
					id
					groupcode
					groupname
					constname
				}
			}
		}
	}
`
// admin
export const updateCounselor = gql`
	mutation updateCounselor(
		$id: ID!
		$counselorid: String!
		$counselorpw: String!
		$seat: String
		$stat: Boolean
		$name: String
		$phone: String
		$authority: String
		$code: String
	) {
		updateCounselor(
			input: {
				where: { id: $id }
				data: {
					counselorid: $counselorid
					counselorpw: $counselorpw
					seat: $seat
					stat: $stat
					name: $name
					phone: $phone
					authority: $authority
					code: $code
				}
			}
		) {
			counselor {
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
				group {
					id
					groupcode
					groupname
					constname
				}
			}
		}
	}
`
// admin
export const deleteCounselor = gql`
	mutation deleteCounselor($id: ID!) {
		deleteCounselor(input: { where: { id: $id } }) {
			counselor {
				id
			}
		}
	}
`
// admin
export const createGroup = gql`
	mutation createGroup(
		$constname: String!
		$constcode: String!
		$groupcode: String!
		$groupname: String!
		$phone: String!
		$managerpw: String
		$managername: String!
		$managerphone: String!
		$etc: String
		$isuse: Int
	) {
		createGroup(
			input: {
				data: {
					constname: $constname
					constcode: $constcode
					groupcode: $groupcode
					groupname: $groupname
					phone: $phone
					managerpw: $managerpw
					managername: $managername
					managerphone: $managerphone
					etc: $etc
					isuse: $isuse
				}
			}
		) {
			group {
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
			}
		}
	}
`
// admin
export const updateGroup = gql`
	mutation updateGroup(
		$id: ID!
		$constname: String
		$groupname: String
		$phone: String
		$managerpw: String
		$managername: String
		$managerphone: String
		$etc: String
		$isuse: Int
		$logo: ID
		$color: JSON
	) {
		updateGroup(
			input: {
				where: { id: $id }
				data: {
					constname: $constname
					groupname: $groupname
					phone: $phone
					managerpw: $managerpw
					managername: $managername
					managerphone: $managerphone
					etc: $etc
					isuse: $isuse
					logo: $logo
					color: $color
				}
			}
		) {
			group {
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
			}
		}
	}
`
// admin
export const deleteGroup = gql`
	mutation deleteGroup($id: ID!) {
		deleteGroup(input: { where: { id: $id } }) {
			group {
				id
			}
		}
	}
`
// admin
export const updateCategory = gql`
	mutation updateCategory(
		$id: ID!
		$code: String
		$codename: String!
		$contents: String!
		$stat: Int
		$listorder: Int
		$type: Int
		$input_box: ID
		$explain: String
		$tag: String
	) {
		updateCategory(
			input: {
				where: { id: $id }
				data: {
					code: $code
					codename: $codename
					contents: $contents
					stat: $stat
					listorder: $listorder
					type: $type
					input_box: $input_box
					explain: $explain
					tag: $tag
				}
			}
		) {
			category {
				id
				groupcode
				code
				codename
				contents
				stat
				listorder
				explain
			}
		}
	}
`
// admin
export const updateCategoryListorder = gql`
	mutation updateCategory($id: ID!, $listorder: Int) {
		updateCategory(input: { where: { id: $id }, data: { listorder: $listorder } }) {
			category {
				id
				groupcode
				code
				codename
				contents
				stat
				listorder
			}
		}
	}
`
// admin
export const deleteCategory = gql`
	mutation deleteCategory($id: ID!) {
		deleteCategory(input: { where: { id: $id } }) {
			category {
				id
			}
		}
	}
`
// admin
export const createCategory = gql`
	mutation createCategory(
		$groupcode: String!
		$code: String!
		$codename: String!
		$contents: String!
		$stat: Int
		$listorder: Int
		$type: Int
		$input_box: ID!
		$explain: String
		$tag: String
	) {
		createCategory(
			input: {
				data: {
					groupcode: $groupcode
					code: $code
					codename: $codename
					contents: $contents
					stat: $stat
					listorder: $listorder
					type: $type
					input_box: $input_box
					explain: $explain
					tag: $tag
				}
			}
		) {
			category {
				id
				groupcode
				code
				codename
				contents
				stat
				listorder
				explain
			}
		}
	}
`
// admin
export const createCategoryDetail = gql`
	mutation createCategoryDetail(
		$groupcode: String
		$code: String
		$detailcode: String
		$detailname: String
		$stat: Int
		$listorder: Int
		$category: ID!
	) {
		createCategoryDetail(
			input: {
				data: {
					groupcode: $groupcode
					code: $code
					detailcode: $detailcode
					detailname: $detailname
					stat: $stat
					listorder: $listorder
					category: $category
				}
			}
		) {
			categoryDetail {
				id
				groupcode
				code
				detailcode
				detailname
				stat
				listorder
			}
		}
	}
`
// admin
export const deleteCategoryDetail = gql`
	mutation deleteCategoryDetail($id: ID!) {
		deleteCategoryDetail(input: { where: { id: $id } }) {
			categoryDetail {
				id
			}
		}
	}
`
// admin
export const updateCategoryDetail = gql`
	mutation updateCategoryDetail($id: ID!, $detailcode: String, $detailname: String, $stat: Int, $listorder: Int) {
		updateCategoryDetail(
			input: { where: { id: $id }, data: { detailcode: $detailcode, detailname: $detailname, stat: $stat, listorder: $listorder } }
		) {
			categoryDetail {
				id
				groupcode
				code
				detailcode
				detailname
				stat
				listorder
			}
		}
	}
`
// admin
export const createTerm = gql`
	mutation createTerm($groupcode: String, $title: String, $content: String, $stat: Int, $version: String, $type: Int) {
		createTerm(input: { data: { groupcode: $groupcode, title: $title, content: $content, stat: $stat, version: $version, type: $type } }) {
			term {
				id
				groupcode
				title
				content
				stat
				version
				type
			}
		}
	}
`
// admin
export const updateTerm = gql`
	mutation updateTerm(
		$id: ID!
		$groupcode: String
		$title: String
		$content: String
		$stat: Int
		$version: String
		$type: Int
		$show: Boolean
	) {
		updateTerm(
			input: {
				where: { id: $id }
				data: { groupcode: $groupcode, title: $title, content: $content, stat: $stat, version: $version, type: $type, show: $show }
			}
		) {
			term {
				id
				groupcode
				title
				content
				stat
				version
				type
			}
		}
	}
`
// admin
export const deleteTerm = gql`
	mutation deleteTerm($id: ID!) {
		deleteTerm(input: { where: { id: $id } }) {
			term {
				id
			}
		}
	}
`
// admin
export const createReserveday = gql`
	mutation createReserveday(
		$type: String
		$groupcode: String
		$title: String
		$sdate: DateTime
		$edate: DateTime
		$maxcount: Int
		$companion: Int
		$tplCode: JSON
		$nodays: String
		$notimes: String
		$noservices: String
		$mainimg: ID
		$input_box: ID
		$nodaySetting: JSON
		$timeRange: String
		$duplicate: Boolean
		$status: Int
		$inputBoxType: String
		$directimg: ID
		$endLink: String
		$directInputBoxId: String
		$splitMinute: String
		$population: String
		$AccessPhones: JSON
		$QRlogo: ID
		$commentTag: JSON
		$color: String
		$consultingTitle: String
		$btnText: String
		$area: String
		$openDate: DateTime
		$endDate: DateTime
		$totalMaxcount: Long
		$companionImg: ID
		$business: ID
		$showInfo: Boolean
		$noUserData: Boolean
		$kakaoLogin: Boolean
		$event: ID
		$selfAlert: String
	) {
		createReserveday(
			input: {
				data: {
					type: $type
					groupcode: $groupcode
					title: $title
					sdate: $sdate
					edate: $edate
					maxcount: $maxcount
					companion: $companion
					tplCode: $tplCode
					nodays: $nodays
					notimes: $notimes
					noservices: $noservices
					mainimg: $mainimg
					input_box: $input_box
					nodaySetting: $nodaySetting
					timeRange: $timeRange
					duplicate: $duplicate
					status: $status
					inputBoxType: $inputBoxType
					directimg: $directimg
					endLink: $endLink
					directInputBoxId: $directInputBoxId
					splitMinute: $splitMinute
					population: $population
					accessPhones: $AccessPhones
					QRlogo: $QRlogo
					commentTag: $commentTag
					color: $color
					consultingTitle: $consultingTitle
					btnText: $btnText
					area: $area
					openDate: $openDate
					endDate: $endDate
					totalMaxcount: $totalMaxcount
					companionImg: $companionImg
					business: $business
					showInfo: $showInfo
					noUserData: $noUserData
					kakaoLogin: $kakaoLogin
					event: $event
					selfAlert: $selfAlert
				}
			}
		) {
			reserveday {
				id
			}
		}
	}
`
// admin
export const deleteReserveday = gql`
	mutation deleteReserveday($id: ID!) {
		deleteReserveday(input: { where: { id: $id } }) {
			reserveday {
				id
			}
		}
	}
`
// admin
export const updateReserveday = gql`
	mutation updateReserveday(
		$id: ID!
		$type: String
		$groupcode: String
		$title: String
		$sdate: DateTime
		$edate: DateTime
		$maxcount: Int
		$companion: Int
		$tplCode: JSON
		$nodays: String
		$notimes: String
		$noservices: String
		$mainimg: ID
		$input_box: ID
		$nodaySetting: JSON
		$timeRange: String
		$duplicate: Boolean
		$status: Int
		$inputBoxType: String
		$directimg: ID
		$endLink: String
		$directInputBoxId: String
		$splitMinute: String
		$population: String
		$AccessPhones: JSON
		$QRlogo: ID
		$commentTag: JSON
		$color: String
		$consultingTitle: String
		$btnText: String
		$area: String
		$openDate: DateTime
		$endDate: DateTime
		$totalMaxcount: Long
		$companionImg: ID
		$business: ID
		$showInfo: Boolean
		$noUserData: Boolean
		$kakaoLogin: Boolean
		$event: ID
		$selfAlert: String
	) {
		updateReserveday(
			input: {
				where: { id: $id }
				data: {
					type: $type
					groupcode: $groupcode
					title: $title
					sdate: $sdate
					edate: $edate
					maxcount: $maxcount
					companion: $companion
					tplCode: $tplCode
					nodays: $nodays
					notimes: $notimes
					noservices: $noservices
					mainimg: $mainimg
					input_box: $input_box
					nodaySetting: $nodaySetting
					timeRange: $timeRange
					duplicate: $duplicate
					status: $status
					inputBoxType: $inputBoxType
					directimg: $directimg
					endLink: $endLink
					directInputBoxId: $directInputBoxId
					splitMinute: $splitMinute
					population: $population
					accessPhones: $AccessPhones
					QRlogo: $QRlogo
					commentTag: $commentTag
					color: $color
					consultingTitle: $consultingTitle
					btnText: $btnText
					area: $area
					openDate: $openDate
					endDate: $endDate
					totalMaxcount: $totalMaxcount
					companionImg: $companionImg
					business: $business
					showInfo: $showInfo
					noUserData: $noUserData
					kakaoLogin: $kakaoLogin
					event: $event
					selfAlert: $selfAlert
				}
			}
		) {
			reserveday {
				id
			}
		}
	}
`
// admin
export const createMessage = gql`
	mutation createMessage(
		$groupcode: String
		$tplCode: String
		$tplCodeStr: String
		$plusid: String
		$senderkey: String
		$smssender: String
		$type: Int
		$isuse: Int
		$message: String
		$button: String
	) {
		createMessage(
			input: {
				data: {
					groupcode: $groupcode
					tplCode: $tplCode
					tplCodeStr: $tplCodeStr
					plusid: $plusid
					senderkey: $senderkey
					smssender: $smssender
					type: $type
					isuse: $isuse
					message: $message
					button: $button
				}
			}
		) {
			message {
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
	}
`
// admin, 방문예약, 캠페인
export const createSendMessage = gql`
	mutation createSendMessage(
		$groupcode: String
		$code: String
		$senderkey: String
		$tpl_code: String
		$sender: String
		$receiver_1: String
		$recvname_1: String
		$subject_1: String
		$message_1: String
		$failover: String
		$fsubject_1: String
		$fmessage_1: String
		$button_1: String
		$type: ENUM_SENDMESSAGE_TYPE
	) {
		createSendMessage(
			input: {
				data: {
					groupcode: $groupcode
					code: $code
					senderkey: $senderkey
					tpl_code: $tpl_code
					sender: $sender
					receiver_1: $receiver_1
					recvname_1: $recvname_1
					subject_1: $subject_1
					message_1: $message_1
					failover: $failover
					fsubject_1: $fsubject_1
					fmessage_1: $fmessage_1
					button_1: $button_1
					type: $type
				}
			}
		) {
			sendMessage {
				id
			}
		}
	}
`
// admin
export const createInputBox = gql`
	mutation createInputBox($groupcode: String!, $status: Int, $name: String!, $group: ID!) {
		createInputBox(input: { data: { groupcode: $groupcode, status: $status, name: $name, group: $group } }) {
			inputBox {
				id
				groupcode
				status
				name
				group {
					id
					groupcode
					groupname
					constname
				}
			}
		}
	}
`
// admin
export const updateMessage = gql`
	mutation updateMessage(
		$id: ID!
		$groupcode: String
		$tplCode: String
		$tplCodeStr: String
		$plusid: String
		$senderkey: String
		$smssender: String
		$type: Int
		$isuse: Int
		$message: String
		$button: String
	) {
		updateMessage(
			input: {
				where: { id: $id }
				data: {
					groupcode: $groupcode
					tplCode: $tplCode
					tplCodeStr: $tplCodeStr
					plusid: $plusid
					senderkey: $senderkey
					smssender: $smssender
					type: $type
					isuse: $isuse
					message: $message
					button: $button
				}
			}
		) {
			message {
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
	}
`
// admin
export const updateInputBox = gql`
	mutation updateInputBox($id: ID!, $groupcode: String, $status: Int, $name: String, $group: ID) {
		updateInputBox(input: { where: { id: $id }, data: { groupcode: $groupcode, status: $status, name: $name, group: $group } }) {
			inputBox {
				id
				groupcode
				status
				name
				group {
					id
					groupcode
					groupname
					constname
				}
			}
		}
	}
`
// admin
export const deleteMessage = gql`
	mutation deleteMessage($id: ID!) {
		deleteMessage(input: { where: { id: $id } }) {
			message {
				id
			}
		}
	}
`
// admin
export const deleteInputBox = gql`
	mutation deleteInputBox($id: ID!) {
		deleteInputBox(input: { where: { id: $id } }) {
			inputBox {
				id
			}
		}
	}
`
// 방문예약, 캠페인
export const createReserveuser = gql`
	mutation createReserveuser(
		$date: DateTime
		$groupcode: String
		$phone: String
		$name: String
		$ismarketing: Int
		$ispersonal: Int
		$companion: Int
		$cdate: DateTime
		$rdate: DateTime
		$categories: String
		$tracking_code: ID
		$inputBoxTitle: String
		$inputBoxId: String
		$bigCodes: String
		$checkbox: String
		$checkone: String
		$textfiled: String
		$code: String
		$fileUpload: [ID]
		$title: String
		$status: Int
		$percent: Int
		$type: String
		$area: String
		$etc: String
		$userData: JSON
		$reserveGroupCode: String
		$locationData: String
		$reserveType: ENUM_RESERVEUSERS_RESERVETYPE
		$reserveday: ID
		$product: ID
		$branch: ID
		$reserveName: String
		$visitStatus: ENUM_RESERVEUSERS_VISITSTATUS
		$sub_product: ID
	) {
		createReserveuser(
			input: {
				data: {
					reserveName: $reserveName
					branch: $branch
					reserveday: $reserveday
					product: $product
					reserveGroupCode: $reserveGroupCode
					date: $date
					groupcode: $groupcode
					phone: $phone
					name: $name
					ismarketing: $ismarketing
					ispersonal: $ispersonal
					companion: $companion
					cdate: $cdate
					rdate: $rdate
					categories: $categories
					tracking_code: $tracking_code
					inputBoxTitle: $inputBoxTitle
					inputBoxId: $inputBoxId
					bigCodes: $bigCodes
					checkbox: $checkbox
					checkone: $checkone
					textfiled: $textfiled
					code: $code
					fileUpload: $fileUpload
					title: $title
					status: $status
					percent: $percent
					type: $type
					area: $area
					etc: $etc
					userData: $userData
					reserveType: $reserveType
					locationData: $locationData
					visitStatus: $visitStatus
					sub_product: $sub_product
				}
			}
		) {
			reserveuser {
				id
				updated_at
				rdate
				name
				status
				phone
				tracking_code {
					code
				}
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
			}
		}
	}
`
// 방문예약, 캠페인
export const updateReserveuser = gql`
	mutation updateReserveuser(
		$id: ID!
		$date: DateTime
		$groupcode: String
		$phone: String
		$name: String
		$ismarketing: Int
		$ispersonal: Int
		$companion: Int
		$cdate: DateTime
		$rdate: DateTime
		$categories: String
		$tracking_code: ID
		$inputBoxTitle: String
		$bigCodes: String
		$checkbox: String
		$checkone: String
		$textfiled: String
		$code: String
		$fileUpload: [ID]
		$title: String
		$status: Int
		$etc: String
		$userData: JSON
		$locationData: String
		$reserveType: ENUM_RESERVEUSERS_RESERVETYPE
		$state: ENUM_RESERVEUSERS_STATE
		$reserveday: ID
		$product: ID
		$branch: ID
		$reserveName: String
		$visitStatus: ENUM_RESERVEUSERS_VISITSTATUS
		$sub_product: ID
	) {
		updateReserveuser(
			input: {
				where: { id: $id }
				data: {
					reserveName: $reserveName
					branch: $branch
					reserveday: $reserveday
					product: $product
					reserveType: $reserveType
					date: $date
					groupcode: $groupcode
					phone: $phone
					name: $name
					ismarketing: $ismarketing
					ispersonal: $ispersonal
					companion: $companion
					cdate: $cdate
					rdate: $rdate
					categories: $categories
					tracking_code: $tracking_code
					inputBoxTitle: $inputBoxTitle
					bigCodes: $bigCodes
					checkbox: $checkbox
					checkone: $checkone
					textfiled: $textfiled
					code: $code
					fileUpload: $fileUpload
					title: $title
					status: $status
					etc: $etc
					userData: $userData
					locationData: $locationData
					state: $state
					visitStatus: $visitStatus
					sub_product: $sub_product
				}
			}
		) {
			reserveuser {
				id
				updated_at
				rdate
				name
				status
				phone
				tracking_code {
					code
				}
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
			}
		}
	}
`
// 방문예약
export const deleteReserveuser = gql`
	mutation deleteReserveuser($id: ID!) {
		deleteReserveuser(input: { where: { id: $id } }) {
			reserveuser {
				id
			}
		}
	}
`
// admin
export const register = gql`
	mutation register($email: String!, $username: String!, $password: String!, $groupcode: String, $role: ID, $name: String) {
		register(input: { email: $email, username: $username, password: $password, groupcode: $groupcode, role: $role, name: $name }) {
			jwt
			user {
				email
				username
				id
			}
		}
	}
`
// admin
export const deleteUser = gql`
	mutation deleteUser($id: ID!) {
		deleteUser(input: { where: { id: $id } }) {
			user {
				id
			}
		}
	}
`
// admin
export const updateUser = gql`
	mutation updateUser(
		$id: ID!
		$password: String
		$confirmed: Boolean
		$blocked: Boolean
		$groupcode: String
		$out: Boolean
		$language: String
		$marketing: Boolean
		$phone: String
		$marketingDate: DateTime
		$face: ID
	) {
		updateUser(
			input: {
				where: { id: $id }
				data: {
					password: $password
					confirmed: $confirmed
					blocked: $blocked
					groupcode: $groupcode
					language: $language
					marketing: $marketing
					out: $out
					phone: $phone
					marketingDate: $marketingDate
					face: $face
				}
			}
		) {
			user {
				id
				username
				email
				confirmed
				blocked
				groupcode
				out
				updated_at
				language
				marketing
				phone
			}
		}
	}
`
export const createCampaign = gql`
	mutation createCampaign(
		$groupcode: String
		$groupname: String
		$campaignname: String
		$startdt: Date
		$enddt: Date
		$regdt: Date
		$categories: String
		$messages: String
		$iswaiting: Int
		$agreees: Int
		$trusts: Int
		$linkurls: String
		$isuse: Int
	) {
		createCampaign(
			input: {
				data: {
					groupcode: $groupcode
					groupname: $groupname
					campaignname: $campaignname
					startdt: $startdt
					enddt: $enddt
					regdt: $regdt
					categories: $categories
					messages: $messages
					iswaiting: $iswaiting
					agreees: $agreees
					trusts: $trusts
					linkurls: $linkurls
					isuse: $isuse
				}
			}
		) {
			campaign {
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
				agreees
				trusts
				linkurls
				isuse
			}
		}
	}
`
export const deleteCampaign = gql`
	mutation deleteCampaign($id: ID!) {
		deleteCampaign(input: { where: { id: $id } }) {
			campaign {
				id
			}
		}
	}
`
export const updateCampaign = gql`
	mutation updateCampaign(
		$id: ID!
		$groupcode: String
		$groupname: String
		$campaignname: String
		$startdt: Date
		$enddt: Date
		$regdt: Date
		$categories: String
		$messages: String
		$iswaiting: Int
		$agreees: Int
		$trusts: Int
		$linkurls: String
		$isuse: Int
	) {
		updateCampaign(
			input: {
				where: { id: $id }
				data: {
					groupcode: $groupcode
					groupname: $groupname
					campaignname: $campaignname
					startdt: $startdt
					enddt: $enddt
					regdt: $regdt
					categories: $categories
					messages: $messages
					iswaiting: $iswaiting
					agreees: $agreees
					trusts: $trusts
					linkurls: $linkurls
					isuse: $isuse
				}
			}
		) {
			campaign {
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
				agreees
				trusts
				linkurls
				isuse
			}
		}
	}
`
// admin, 방문예약, 캠페인
export const createTrackingCode = gql`
	mutation createTrackingCode($ip: String, $name: String, $phone: String!) {
		createTrackingCode(input: { data: { ip: $ip, name: $name, phone: $phone } }) {
			trackingCode {
				id
				code
			}
		}
	}
`
// admin
export const updateTrackingCode = gql`
	mutation updateTrackingCode($id: ID!, $ip: String, $name: String, $phone: String!) {
		updateTrackingCode(input: { where: { id: $id }, data: { ip: $ip, name: $name, phone: $phone } }) {
			trackingCode {
				id
			}
		}
	}
`
// 방문예약
export const createWaiting = gql`
	mutation createWaiting(
		$date: DateTime
		$groupcode: String
		$phone: String
		$name: String
		$ismarketing: Int
		$ispersonal: Int
		$stat: Int
		$seat: Int
		$waitingnum: Long
		$cdate: DateTime
		$custlike: String
		$categories: String
		$local: String
		$recomand: String
		$campaignid: Int
		$code: String
		$inputBoxTitle: String
		$bigCodes: String
		$checkbox: String
		$textfiled: String
		$checkone: String
		$rdate: DateTime
		$title: String
		$tracking_code: ID
		$fileUpload: [ID]
		$etc: String
		$userData: JSON
		$locationData: String
		$reserveType: String
	) {
		createWaiting(
			input: {
				data: {
					reserveType: $reserveType
					date: $date
					groupcode: $groupcode
					phone: $phone
					name: $name
					ismarketing: $ismarketing
					ispersonal: $ispersonal
					stat: $stat
					seat: $seat
					waitingnum: $waitingnum
					cdate: $cdate
					custlike: $custlike
					categories: $categories
					local: $local
					recomand: $recomand
					campaignid: $campaignid
					code: $code
					inputBoxTitle: $inputBoxTitle
					bigCodes: $bigCodes
					checkbox: $checkbox
					textfiled: $textfiled
					checkone: $checkone
					rdate: $rdate
					title: $title
					tracking_code: $tracking_code
					fileUpload: $fileUpload
					etc: $etc
					userData: $userData
					locationData: $locationData
				}
			}
		) {
			waiting {
				id
				rdate
				waitingnum
			}
		}
	}
`
// 방문예약
export const updateWaiting = gql`
	mutation updateWaiting(
		$date: DateTime
		$groupcode: String
		$phone: String
		$name: String
		$ismarketing: Int
		$ispersonal: Int
		$stat: Int
		$seat: Int
		$waitingnum: Long
		$cdate: DateTime
		$custlike: String
		$categories: String
		$local: String
		$recomand: String
		$campaignid: Int
		$code: String
		$inputBoxTitle: String
		$bigCodes: String
		$checkbox: String
		$textfiled: String
		$checkone: String
		$rdate: DateTime
		$title: String
		$counselorid: String
		$id: ID!
		$commentTag: String
		$etc: String
		$userData: JSON
		$locationData: String
		$reserveType: String
	) {
		updateWaiting(
			input: {
				where: { id: $id }
				data: {
					reserveType: $reserveType
					date: $date
					groupcode: $groupcode
					phone: $phone
					name: $name
					ismarketing: $ismarketing
					ispersonal: $ispersonal
					stat: $stat
					seat: $seat
					waitingnum: $waitingnum
					cdate: $cdate
					custlike: $custlike
					categories: $categories
					local: $local
					recomand: $recomand
					campaignid: $campaignid
					code: $code
					inputBoxTitle: $inputBoxTitle
					bigCodes: $bigCodes
					checkbox: $checkbox
					textfiled: $textfiled
					checkone: $checkone
					rdate: $rdate
					title: $title
					counselorid: $counselorid
					commentTag: $commentTag
					etc: $etc
					userData: $userData
					locationData: $locationData
				}
			}
		) {
			waiting {
				id
				name
				phone
				rdate
				created_at
				counselorid
			}
		}
	}
`
export const updateWaitingWithCheck = gql`
	mutation updateWaiting(
		$date: DateTime
		$groupcode: String
		$phone: String
		$name: String
		$ismarketing: Int
		$ispersonal: Int
		$stat: Int
		$seat: Int
		$waitingnum: Long
		$cdate: DateTime
		$custlike: String
		$categories: String
		$local: String
		$recomand: String
		$campaignid: Int
		$code: String
		$inputBoxTitle: String
		$bigCodes: String
		$checkbox: String
		$textfiled: String
		$checkone: String
		$rdate: DateTime
		$title: String
		$counselorid: String
		$id: ID!
		$reserveType: String
	) {
		updateWaiting(
			input: {
				where: { id: $id }
				data: {
					reserveType: $reserveType
					date: $date
					groupcode: $groupcode
					phone: $phone
					name: $name
					ismarketing: $ismarketing
					ispersonal: $ispersonal
					stat: $stat
					seat: $seat
					waitingnum: $waitingnum
					cdate: $cdate
					custlike: $custlike
					categories: $categories
					local: $local
					recomand: $recomand
					campaignid: $campaignid
					code: $code
					inputBoxTitle: $inputBoxTitle
					bigCodes: $bigCodes
					checkbox: $checkbox
					textfiled: $textfiled
					checkone: $checkone
					rdate: $rdate
					title: $title
					counselorid: $counselorid
				}
			}
		) {
			waiting {
				id
				name
				phone
				rdate
				created_at
			}
		}
	}
`
// admin
export const createMsgLog = gql`
	mutation createMsgLog($message: String, $groupcode: String, $phones: JSON, $type: String, $tplCode: String) {
		createMsgLog(input: { data: { message: $message, groupcode: $groupcode, phones: $phones, type: $type, tplCode: $tplCode } }) {
			msgLog {
				id
			}
		}
	}
`
// 방문예약
export const createTemperature = gql`
	mutation createTemperature($name: String, $phone: String, $groupcode: String, $code: String, $temperature: Float, $agree: JSON) {
		createTemperature(
			input: { data: { name: $name, phone: $phone, groupcode: $groupcode, code: $code, temperature: $temperature, agree: $agree } }
		) {
			temperature {
				id
				name
				phone
				groupcode
				code
				temperature
				agree
			}
		}
	}
`
export const createSendEmail = gql`
	mutation createSendEmail($type: Int, $useremail: String) {
		createSendEmail(input: { data: { type: $type, useremail: $useremail } }) {
			sendEmail {
				type
				authcode
				useremail
			}
		}
	}
`
// 비밀번호 변경
export const updatePassword = gql`
	mutation updatePassword($email: String!, $authcode: String!, $password: String!) {
		updateUserPassword(input: { email: $email, authcode: $authcode, password: $password }) {
			username
			id
			password
		}
	}
`
// 아이디 unblock
export const unlockUser = gql`
	mutation unlockUser($authcode: String!, $email: String!) {
		unlockUser(input: { authcode: $authcode, email: $email }) {
			message
		}
	}
`
export const updateAlert = gql`
	mutation updateAlert($id: ID!, $groupcode: String, $type: String, $show: Boolean, $content: String, $title: String) {
		updateAlert(
			input: { where: { id: $id }, data: { groupcode: $groupcode, type: $type, show: $show, content: $content, title: $title } }
		) {
			alert {
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
	}
`
/// reivew
export const createContact = gql`
	mutation createContact(
		$rate: Float
		$content: String
		$phone: String
		$email: String
		$name: String
		$company: String
		$price: String
		$start: Date
		$type: Int
	) {
		createContact(
			input: {
				data: {
					rate: $rate
					content: $content
					phone: $phone
					email: $email
					name: $name
					company: $company
					price: $price
					start: $start
					type: $type
				}
			}
		) {
			contact {
				id
			}
		}
	}
`
export const createBusiness = gql`
	mutation createBusiness(
		$title: String
		$phone: String
		$location: String
		$registration: ID
		$reservedays: [ID]
		$companyName: String
		$adLocation: String
		$homepage: String
		$kakaoChannel: String
		$manager: String
		$managerPhone: String
		$houseNumber: String
		$nomalNumber: String
		$adOpenDate: Date
		$specialDate: Date
		$firstDate: Date
		$secondDate: Date
		$comment: String
		$houseType: JSON
		$groupcode: String
		$btnColor: String
		$QRlogo: ID
		$marketingTerm: String
		$privacyTerm: String
		$color: String
	) {
		createBusiness(
			input: {
				data: {
					title: $title
					phone: $phone
					location: $location
					registration: $registration
					reservedays: $reservedays
					companyName: $companyName
					adLocation: $adLocation
					homepage: $homepage
					kakaoChannel: $kakaoChannel
					manager: $manager
					managerPhone: $managerPhone
					houseNumber: $houseNumber
					nomalNumber: $nomalNumber
					adOpenDate: $adOpenDate
					specialDate: $specialDate
					firstDate: $firstDate
					secondDate: $secondDate
					comment: $comment
					houseType: $houseType
					groupcode: $groupcode
					btnColor: $btnColor
					QRlogo: $QRlogo
					marketingTerm: $marketingTerm
					privacyTerm: $privacyTerm
					color: $color
				}
			}
		) {
			business {
				id
			}
		}
	}
`
export const updateBusiness = gql`
	mutation updateBusiness(
		$title: String
		$phone: String
		$location: String
		$registration: ID
		$reservedays: [ID]
		$companyName: String
		$adLocation: String
		$homepage: String
		$kakaoChannel: String
		$manager: String
		$managerPhone: String
		$houseNumber: String
		$nomalNumber: String
		$adOpenDate: Date
		$specialDate: Date
		$firstDate: Date
		$secondDate: Date
		$comment: String
		$houseType: JSON
		$id: ID!
		$btnColor: String
		$QRlogo: ID
		$marketingTerm: String
		$privacyTerm: String
		$color: String
	) {
		updateBusiness(
			input: {
				where: { id: $id }
				data: {
					title: $title
					phone: $phone
					location: $location
					registration: $registration
					reservedays: $reservedays
					companyName: $companyName
					adLocation: $adLocation
					homepage: $homepage
					kakaoChannel: $kakaoChannel
					manager: $manager
					managerPhone: $managerPhone
					houseNumber: $houseNumber
					nomalNumber: $nomalNumber
					adOpenDate: $adOpenDate
					specialDate: $specialDate
					firstDate: $firstDate
					secondDate: $secondDate
					comment: $comment
					houseType: $houseType
					btnColor: $btnColor
					QRlogo: $QRlogo
					marketingTerm: $marketingTerm
					privacyTerm: $privacyTerm
					color: $color
				}
			}
		) {
			business {
				id
			}
		}
	}
`

export const createInquiry = gql`
	mutation createInquiry(
		$name: String
		$company: String
		$html: String
		$email: String
		$phone: String
		$price: String
		$type: String
		$enddate: Date
		$password: String
		$url: String
		$content: String
	) {
		createInquiry(
			input: {
				data: {
					name: $name
					company: $company
					html: $html
					email: $email
					phone: $phone
					price: $price
					type: $type
					enddate: $enddate
					password: $password
					url: $url
					content: $content
				}
			}
		) {
			inquiry {
				id
			}
		}
	}
`
export const updateInquiry = gql`
	mutation updateInquiry(
		$name: String
		$company: String
		$html: String
		$email: String
		$phone: String
		$price: String
		$type: String
		$enddate: Date
		$password: String
		$url: String
		$id: ID!
	) {
		updateInquiry(
			input: {
				data: {
					name: $name
					company: $company
					html: $html
					email: $email
					phone: $phone
					price: $price
					type: $type
					enddate: $enddate
					password: $password
					url: $url
				}
				where: { id: $id }
			}
		) {
			inquiry {
				name
				company
				html
				email
				phone
				price
				type
				enddate
				password
				url
			}
		}
	}
`

export const createSendSm = gql`
	mutation createSendSm($message: String, $receiver: String, $sender: String, $authCode: String) {
		createSendSm(input: { data: { receiver: $receiver, message: $message, sender: $sender, authCode: $authCode } }) {
			sendSm {
				id
			}
		}
	}
`
export const createEventJoin = gql`
	mutation(
		$name: String
		$phone: String
		$event: ID
		$eventTitle: String
		$winner: Boolean
		$winnterTitle: String
		$winnterProduct: String
		$reservedayTitle: String
		$alertTalkmessage: String
		$receipt: String
		$receiptDate: DateTime
		$personalInformation: Boolean
		$userData: JSON
		$code: String
		$locationData: String
		$branch: ID
	) {
		createEventJoin(
			input: {
				data: {
					name: $name
					phone: $phone
					event: $event
					eventTitle: $eventTitle
					winner: $winner
					winnterTitle: $winnterTitle
					winnterProduct: $winnterProduct
					reservedayTitle: $reservedayTitle
					alertTalkmessage: $alertTalkmessage
					receipt: $receipt
					receiptDate: $receiptDate
					personalInformation: $personalInformation
					userData: $userData
					code: $code
					locationData: $locationData
					branch: $branch
				}
			}
		) {
			eventJoin {
				id
			}
		}
	}
`
export const createEvent = gql`
	mutation createEvent(
		$title: String
		$start: DateTime
		$end: DateTime
		$joinList: JSON
		$joinNumber: Long
		$winnerList: JSON
		$type: String
		$status: Int
		$explan: String
		$map: JSON
		$eventImg: ID
		$groupcode: String
		$priceList: JSON
		$winnerMessage: String
		$joinMessage: String
	) {
		createEvent(
			input: {
				data: {
					title: $title
					start: $start
					end: $end
					joinList: $joinList
					joinNumber: $joinNumber
					winnerList: $winnerList
					type: $type
					status: $status
					explan: $explan
					map: $map
					eventImg: $eventImg
					groupcode: $groupcode
					priceList: $priceList
					winnerMessage: $winnerMessage
					joinMessage: $joinMessage
				}
			}
		) {
			event {
				id
			}
		}
	}
`
export const updateEvent = gql`
	mutation updateEvent(
		$id: ID!
		$title: String
		$start: DateTime
		$end: DateTime
		$joinList: JSON
		$joinNumber: Long
		$winnerList: JSON
		$type: String
		$status: Int
		$explan: String
		$map: JSON
		$eventImg: ID
		$groupcode: String
		$priceList: JSON
		$winnerMessage: String
		$joinMessage: String
	) {
		updateEvent(
			input: {
				where: { id: $id }
				data: {
					title: $title
					start: $start
					end: $end
					joinList: $joinList
					joinNumber: $joinNumber
					winnerList: $winnerList
					type: $type
					status: $status
					explan: $explan
					map: $map
					eventImg: $eventImg
					groupcode: $groupcode
					priceList: $priceList
					winnerMessage: $winnerMessage
					joinMessage: $joinMessage
				}
			}
		) {
			event {
				id
			}
		}
	}
`
