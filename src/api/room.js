import { config, request } from './index'

export default {
	
	// 리스트 조회 요청
	requestRoomList: async (data) => {
		return await request('get', `${config.baseUrl}/colabee/v1/room-list`, config.headers, data)
	},

}