import room from '../api/room'

const state = () => ({
    
})

const getters = {

}
 
const mutations = {

}

const actions = {

  async requestRoomList(_, data) {
    // console.log(`requestRoomList called : ${JSON.stringify(data)}`)

    return await room.requestRoomList(data);
  },

}
 
export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
