<template>

  <div class="home d-flex justify-content-center align-items-center">

    <div class="card">
        <div class="card-header">
            <h5 class="card-title mt-3" style="font-size:1.3rem; color:#1d819b;"><b>회진 알림 결과</b></h5>
        </div>
        <div class="card-body">
 
            <b>입원 환자에게</b> <br/><span style="font-size:1.1rem; color:#0d6efd;"><b>회진 시간 알림이 발송되었습니다.</b></span><br/>
            <p class="mt-3">[회진 시간 : <b><span>{{startTime1}} ~ {{endTime1}} </span><span v-if="secondary=='Y'"> / {{startTime2}} ~ {{endTime2}}</span></b>]</p>
 
        </div>
    </div>
    
  </div>

</template>
<script>
export default {
    name: 'ConfirmView',
    data() {
        return {
            userId:this.$store.state.pinauth.userData.userId,
            secondary: "N",
            startTime1: "",
            endTime1: "",
            startTime2: "",
            endTime2: "",
        }
    },
    methods: {
        
    },
    async mounted() {

        // 스토어에 timeData가 있으면 데이터로 설정
        

        if (this.$store.state.pinauth.timeData) {
            this.startTime1 = this.$store.state.pinauth.timeData.startTime1;
            this.endTime1 = this.$store.state.pinauth.timeData.endTime1;
            
            if (this.$store.state.pinauth.timeData.startTime2 !== '' ) {
                this.secondary = "Y";
                this.startTime2 = this.$store.state.pinauth.timeData.startTime2;
                this.endTime2 = this.$store.state.pinauth.timeData.endTime2;
            }

            try {
                            //  내부 DB 쪽에 회진 날짜 저장 (변동있을 시 다시 들어왔을때 알려주기 위함)
                await this.$store.dispatch('pinauth/requestSaveSendingData', {
                    requestCode: '1001',
                    ch_start_time1 : this.startTime1,
                    ch_end_time1: this.endTime1,
                    ch_start_time2 : this.startTime2,
                    ch_end_time2: this.endTime2,
                    check_send : 'y',
                    user_id : this.userId
                })
            } catch(err) {
                this.handleNetworkError(`네트워크 요청 중 에러 : ${err}`)
                
            }
            
        }
        
        

        // 10초 후 블랭크 창으로 이동하기
        setTimeout(() => {
            this.$router.replace({path: '/rounding-notice/blank', query: {}})
        }, 10000)

    }
}
</script>


<style scoped>
 
</style>