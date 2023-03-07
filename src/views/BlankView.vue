<template>

  <div class="home d-flex justify-content-center align-items-center">

    <div class="card">
        <div class="card-header">
            <h5 class="card-title mt-3" style="font-size:1.3rem; color:#1d819b;"><b>회진 알림 안내</b></h5>
        </div>
        <div class="card-body">
 
            <br>
            <span style="font-size:1.1rem; color:#0d6efd;"><b>감사합니다.</b></span><br/>
            <br>
            <p class="mt-3"><b><span>본 회진 알림 시스템은 회진 시간 전에 <br>알림 메시지를 보내드립니다.</span></b></p>
            <br>

        </div>
    </div>
    
  </div>
 
</template>

<script>
export default {
  name: 'BlankView',
  data() {
    return {
          
    }
  },
  methods: {
        
  },
  mounted() {
    
    // 10초 후 블랭크 창으로 이동하기
    setTimeout(() => {
        this.$router.replace({path: '/rounding-notice/blank', query: {}})
    }, 10000)

  }
}
</script>

<style scoped>
 
</style>