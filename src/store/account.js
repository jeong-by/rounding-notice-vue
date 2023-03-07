import login from '../api/login'

const state = () => ({
    user: {},
    session: '',
    data: {}
})

const getters = {

}
 
const mutations = {
  setUser(state, data) {
    state.user = data
  }
}

const actions = {
  async requestLogin(context, data) {
    // console.log(`requestLogin called : ${JSON.stringify(data)}`)

    const response = await login.requestLogin(data);
    // console.log(`응답 : ${JSON.stringify(response.data)}`)

    // 로그인 성공 여부 확인
    if (response.data.output.header.total > 0) {    // 로그인 성공
      context.commit('setUser', response.data.output.data[0])

      this.state.session = '1001'
    } else {    // 로그인 실패
      
    }

    return response
  },
}
 
export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
