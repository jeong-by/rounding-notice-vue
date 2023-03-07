///
/// 암호화
/// 

import CryptoJS from 'crypto-js'

// iv 바이트 (16바이트)
const ivBytes = CryptoJS.enc.Hex.parse('0000000000000000') 

export default {
 
	// AES 256 인코딩
	encode: (secretKey, payload) => {
		// console.log(`encode called.`)

		
		// console.log(`[ivBytes] : ${ivBytes}`)
		console.log(`[payload] : ${payload}`)	

		// AES cipher 객체 생성
		const cipher = CryptoJS.AES.encrypt(payload, CryptoJS.enc.Utf8.parse(secretKey), {
			iv: CryptoJS.enc.Utf8.parse(ivBytes),   // IV 바이트 설정
			padding: CryptoJS.pad.Pkcs7,    // PKCS5 패딩
			mode: CryptoJS.mode.CBC         // CBC 모드
		})

		// cipher를 이용해 AES 암호화
		return cipher.toString()

	},

	// AES 256 디코딩
	decode: (secretKey, payload) => {
		// AES cipher 객체 생성
		const cipher = CryptoJS.AES.decrypt(payload, CryptoJS.enc.Utf8.parse(secretKey),{
			iv: CryptoJS.enc.Utf8.parse(ivBytes), // IV 바이트 설정
			padding: CryptoJS.pad.Pkcs7, // PKCS5 패딩
			mode: CryptoJS.mode.CBC  // CBC 모드
		})

		
		

		// cipher를 이용해 AES 암호화
		
		return cipher.toString(CryptoJS.enc.Utf8)
	},

	// 길이값 맞추기
	checkPad: (data, size) => {
		let paddedData = data
		if (data.length < size) {
			paddedData = data.padEnd(size, '0')
		} else if (data.length > size) {
			paddedData = data.substring(0, size)
		}
		
		return paddedData
	}


}