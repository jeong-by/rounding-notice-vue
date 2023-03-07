<template>

  <div class="home d-flex justify-content-center align-items-center">

    <div class="card">
        <div class="card-header modify-card">
            <h5 class="card-title" style="font-size:1.3rem; color:#1d819b;"><b>회진 알림 결과</b></h5>
        </div>
        <div class="card-body">
            <br>
            <span style="font-size:1.1rem; color:#0d6efd;"><b>회진 취소 알림이 발송되었습니다.</b></span>
            <br>
            <p> </p>
        </div>
    </div>
    
  </div>
 
</template>

<script>
export default {
    name: 'CancelView',
    data() {
        return {
                
        }
    },
    methods: {
            
    },
    async mounted() {
        
        
        try {
                        //  내부 DB 쪽에 회진 날짜 저장 (변동있을 시 다시 들어왔을때 알려주기 위함)
            await this.$store.dispatch('pinauth/requestSaveSendingData', {
                requestCode: '1001',
                ch_start_time1 : "",
                ch_end_time1: "",
                ch_start_time2 : "",
                ch_end_time2: "",
                check_send : 'y',
                user_id : this.$store.state.pinauth.userData.userId
            })
        } catch(err) {
            this.handleNetworkError(`네트워크 요청 중 에러 : ${err}`)
            
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