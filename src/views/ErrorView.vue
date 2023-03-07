<template>

  <div class="home d-flex justify-content-center align-items-center">

    <div class="card">
        <div class="card-header">
            <h5 class="card-title mt-3" style="font-size:1.3rem; color:#1d819b;"><b>에러</b></h5>
        </div>
        <div class="card-body">
 
            <br>
            <span style="font-size:1.1rem; color:#0d6efd;"><b>{{ message }}</b></span><br/>
            <br>
            <p class="mt-3"><b><span>확인 후 다시 시도해주세요.</span></b></p>
            <br>

        </div>
        <!-- <div class="card-footer">
          <button class="btn btn-primary btn-rounded ps-5 pe-5 pt-3 pb-3 mt-2" style="font-size:1rem" @click="goBack()"><b>돌아가기</b></button>
        </div> -->
    </div>
    
  </div>
 
</template>

<script>
export default {
  name: 'ErrorView',
  data() {
    return {
      message: '페이지를 찾을 수 없습니다.',
    }
  },

  mounted() {

    if (typeof(this.$route.query.message) != 'undefined') {
      this.message = this.$route.query.message
    }

  },
  
  methods: {

      // 돌아가기
      goBack() {
        
        
        this.$router.replace({path: this.$store.state.pinauth.backPath, query: this.$store.state.pinauth.backParams})
      },
 
  }

}
</script>