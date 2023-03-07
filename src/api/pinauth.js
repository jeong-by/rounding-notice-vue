import { config, request } from './index'

export default {

	// 세션 유효성 확인 요청
	requestSessionValid: async (data) => {
		return await request('post', `${config.baseUrl}/rounding-notice/v1/session-valid`, config.headers, data)
	},

	// 사용자 인증 요청
	requestAuthUser: async (data) => {
		return await request('post', `${config.baseUrl}/rounding-notice/v1/darwin-check`, config.headers, data)
	},

	// 인증파라미터 저장 요청
	requestSaveHash: async (data) => {
		return await request('post', `${config.baseUrl}/pin-auth/v1/save-hash`, config.headers, data)
	},

	// 태그데이터 조회 요청
	requestTagDataSelect: async (data) => {
		return await request('post', `${config.baseUrl}/pin-auth/v1/tagdata-select`, config.headers, data)
	},

	requestPhoneAuth: async (data) => {
		return await request('post', `${config.baseUrl}/rounding-notice/v1/user-check`, config.headers, data)
	},
	requestPhoneAuth2: async (data) => {
		return await request('post', `${config.baseUrl}/rounding-notice/v1/user-check2`, config.headers, data)
	},
	
	reqeustSendNotice: async (data) => {
		return await request('post', `${config.baseUrl}/rounding-notice/v1/request-rounding-patients`,config.headers,data);
	},
	// 휴대폰인증 후 세션데이타가 없어 ID값으로 외부망 DB에서 가져오기
	requestUserSession: async (data) => {
		return await request('post', `${config.baseUrl}/rounding-notice/v1/request-user-session`,config.headers,data);
	},

	//  PIN 등록
	requestSavePin : async (data) => {
		return await request('post', `${config.baseUrl}/rounding-notice/v1/request-save-pin`,config.headers,data)
	},

	// 회진 알림 발송
	requestSendConfirm : async (data) => {
		return await request('post', `${config.baseUrl}/rounding-notice/v1/request-send-confirm`,config.headers,data)
	},
	// 회진 취소 알림 발송
	requestSendCancel : async (data) => {
		return await request('post', `${config.baseUrl}/rounding-notice/v1/request-send-cancel`,config.headers,data)
	},

	// 회진 변경 여부 확인
	requestcheckChange : async (data) => {
		return await request('post', `${config.baseUrl}/rounding-notice/v1/request-check-change`,config.headers,data)
	},

	// 회진 시간 전송 여부 저장
	requestSaveSendingData : async (data) => {
		return await request('post', `${config.baseUrl}/rounding-notice/v1/request-save-sending-data`,config.headers,data)
	},

	// 패턴 오입력 보안 체크
	requestSaveLockCount : async (data) => {
		return await request('post', `${config.baseUrl}/rounding-notice/v1/request-save-lock-count`,config.headers,data)
	},
	// 패턴 오입력 보안 시간 설정
	requestSaveLockTime : async (data) => {
		return await request('post', `${config.baseUrl}/rounding-notice/v1/request-save-lock-time`,config.headers,data)
	},
	// 패턴 오입력 보안 초기화
	refreshLock : async (data) => {
		return await request('post', `${config.baseUrl}/rounding-notice/v1/request-refresh-lock`,config.headers,data)
	},
}