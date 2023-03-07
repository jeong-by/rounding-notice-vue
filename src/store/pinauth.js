import pinauth from '../api/pinauth'

const state = () => ({
    session: ''
})

const getters = {

}
 
const mutations = {
  setSession(state, data) {
    state.session = data
  }
}

const actions = {

  // 세션 유효성 확인 요청
  async requestSessionValid(context, data) {
    // console.log(`requestSessionValid called : ${JSON.stringify(data)}`)

    const response = await pinauth.requestSessionValid(data);
    if (typeof(response) != 'undefined') {
      // console.log(`응답 : ${JSON.stringify(response.data)}`)
      
      // 세션 유효 여부 확인
      if (response.data.body.valid == 'Y') {    // 세션 유효
        context.commit('setSession', response.data.body)
      }

    }

    return response
  },

  // 사용자 인증 요청
  async requestAuthUser(context, data) {
    // console.log(`requestAuthUser called : ${JSON.stringify(data)}`)

    return await pinauth.requestAuthUser(data);
  },
  
  // 인증파라미터 저장 요청
  async requestSaveHash(context, data) {
    // console.log(`requestSaveHash called : ${JSON.stringify(data)}`)

    return await pinauth.requestSaveHash(data);
  },
  
  // 태그데이터 조회 요청
  async requestTagDataSelect(context, data) {
    // console.log(`requestTagDataSelect called : ${JSON.stringify(data)}`)

    return await pinauth.requestTagDataSelect(data);
  },

  // 휴대폰 본인인증 후 파라미터 비교 요청
  async requestPhoneAuth (context,data) {
    // console.log(`requestTagDataSelect called : ${JSON.stringify(data)}`)

    return await pinauth.requestPhoneAuth(data);
  },

    // 휴대폰 본인인증 성함이 영문일 경우 체크
  async requestPhoneAuth2 (context,data) {
    // console.log(`requestTagDataSelect called : ${JSON.stringify(data)}`)

    return await pinauth.requestPhoneAuth2(data);
  },

  async reqeustSendNotice (context,data) {
    // console.log (`reqeustSendNotice called: ${JSON.stringify(data)}`)
    
    return await pinauth.reqeustSendNotice(data);
  },

  async requestUserSession (context, data) {
    // console.log(`requestUserSession : ${JSON.stringify(data)}`)

    return await pinauth.requestUserSession(data);
  },

  // Pin 등록
  async requestSavePin (context,data) {
    // console.log(`requestSavePin :  ${JSON.stringify(data)}`)
    return await pinauth.requestSavePin(data);
  },

  // 회진 알림 발송
	async requestSendConfirm (context,data) {
    // console.log(`requestSendConfirm :  ${JSON.stringify(data)}`)
    return await pinauth.requestSendConfirm(data);
  },

   // 회진 취소 알림 발송
	async requestSendCancel (context,data) {
    // console.log(`requestSendCancel :  ${JSON.stringify(data)}`)
    return await pinauth.requestSendCancel(data);
  },

  //  회진 변경 여부 확인
  async requestcheckChange (context,data) {
    // console.log(`requestcheckChange :  ${JSON.stringify(data)}`)
    return await pinauth.requestcheckChange(data);
  },

  //  회진 전송 여부 저장
  async requestSaveSendingData (context,data) {
    // console.log(`requestSaveSendingData :  ${JSON.stringify(data)}`)
    return await pinauth.requestSaveSendingData(data);
  },

  async requestSaveLockCount (context,data) {
    // console.log(`requestSaveLockCount :  ${JSON.stringify(data)}`)
    return await pinauth.requestSaveLockCount(data);
  },
  
  async requestSaveLockTime (context,data) {
    // console.log(`requestSaveLockCount :  ${JSON.stringify(data)}`)
    return await pinauth.requestSaveLockTime(data);
  },

  async refreshLock (context,data) {
    // console.log(`refreshLock :  ${JSON.stringify(data)}`)
    return await pinauth.refreshLock(data);
  }


  
}
 
export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
