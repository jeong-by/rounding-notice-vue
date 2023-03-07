<template>

  <div class="home d-flex justify-content-center align-items-center">

    <div class="card">
        <div class="card-header modify-card">
            <h5 class="card-title" style="font-size:1.3rem; color:#1d819b;"><b>회진 알림 처리</b></h5>
        </div>
        <div class="card-body">
            <br>
            <span class="ms-3 me-3" style="font-size:1.1rem; color:#0d6efd;"><b>회진 알림 처리중입니다...</b></span>
            <br>
            <div class="mt-3 mb-3" style="text-align:center;">
                <div class="spinner-grow text-danger" role="status">
                    <span class="visually-hidden">Loading...</span>
                </div>
                <div class="spinner-grow text-warning ms-2" role="status">
                    <span class="visually-hidden">Loading...</span>
                </div>
                <div class="spinner-grow text-secondary ms-2" role="status">
                    <span class="visually-hidden">Loading...</span>
                </div>
            </div>
            <br>
            <p> </p>
        </div>
    </div>
    
  </div>
 
</template>

<script>
export default {
    name: 'ProgressView',
    data() {
        return {
                
        }
    },
    methods: {
            
    },
    mounted() {
        console.log('ProgressView:mounted 호출됨.')
        
        // 3초 후 취소 창으로 이동하기
        setTimeout(() => {
            this.$router.replace({path: '/cancel', query: {}})
        }, 3000)

    }
}
</script>


<style scoped>
 
</style>