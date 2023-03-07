import student from '../api/student'

const state = () => ({
    
})

const getters = {

}
 
const mutations = {

}

const actions = {
  async requestStudentList(_, data) {
    // console.log(`requestStudentList called : ${JSON.stringify(data)}`)

    return await student.requestStudentList(data);
  },
}
 
export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
