import { config, request } from './index'

export default {
	
	// 리스트 조회 요청
	requestStudentList: async (data) => {
		return await request('get', `${config.baseUrl}/student`, config.headers, data)
	},

}