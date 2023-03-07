import { config, request } from './index'

export default {

	// 로그인 요청
	requestLogin: async (data) => {
		return await request('get', `${config.baseUrl}/account/login`, config.headers, data)
	},

}