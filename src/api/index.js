
import axios from 'axios'

// 서버 접속을 위한 기본 설정
const config = {
    // baseUrl:'https://eboard.samsunghospital.com:40016',
	baseUrl:'http://192.168.145.110:40016',
    headers: {}
}

const request = async (method, url, headers, data) => {
	try {
		return await axios({
			method: method,
			url: url,
            params: data,
			data: data,
			responseType:'json',
            headers: headers,
		})
	} catch (error) {
		// console.log(error);
	}
}

export {
    config,
    request
}
 