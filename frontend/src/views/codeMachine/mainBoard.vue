<template>
	<div>main</div>
</template>

<script>
// import sha256 from 'crypto-js/sha256'
// import hmacSHA512 from 'crypto-js/hmac-sha512'
// import Base64 from 'crypto-js/enc-base64'
export default {
	data: () => ({}),
	methods: {
		test() {
			// const message, nonce, path, privateKey; // ...
			// const hashDigest = sha256(nonce + message);
			// const hmacDigest = Base64.stringify(hmacSHA512(path + hashDigest, privateKey));
			// console.log(hmacDigest);
			// const body = cryptoJs.AES.encrypt(JSON.stringify({ “test1”:”test1 벨류”}),＂암호화설정된key＂,{iv: cryptoJs.enc.Utf8.parse(＂testIv＂),padding: cryptoJs.pad.Pkcs7,mode: cryptoJs.mode.CBC}).toString()
		},
	},
}
</script>
