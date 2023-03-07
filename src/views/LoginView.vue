<template>


  <div class="home d-flex justify-content-center align-items-center">
 
    <div class="row row-cols-1 row-cols-md-3 g-4 ms-1 me-1">
      <div class="col">
        <div class="card h-100">
          <div class="card-header modify-card">
            <h5 class="card-title mt-3" style="font-size:1.3rem; color:#1d819b;"><b>로그인</b></h5>
          </div>
          <div class="card-body">
 
            <span style="font-size:1rem; color:#666666;">다윈 사번과 비밀번호로 로그인하세요.</span>
            <br>
            <br>
            
            <!-- username input -->
            <div class="input-group rounded ms-3 mt-3">
              <input v-model="loginId" type="search" class="form-control form-control-lg rounded" placeholder="다윈 사번" aria-label="다윈 사번" aria-describedby="search-addon" />
              <span class="input-group-text border-0" id="search-addon">
                <i class="fas ms-3 me-3"></i>
              </span>
            </div>

            <!-- password input -->
            <div class="input-group rounded ms-3 mt-3">
              <input v-model="loginPassword" type="password" class="form-control form-control-lg rounded" placeholder="비밀번호" aria-label="비밀번호" aria-describedby="search-addon" />
              <span class="input-group-text border-0" id="search-addon">
                <i class="fas fa-eye ms-3 me-3.5 mt-4" style="scale: 1.3;"></i>
              </span>
            </div>
 
            <br>
            <br>
            <div class="card-footer">
              <button class="btn btn-primary btn-rounded ps-5 pe-5 pt-3 pb-3 mt-2" style="font-size:1rem" @click="login()"><b>로그인</b></button>
            </div>

          </div>
        </div>
      </div>
       
    </div>
 
  </div>
 
</template>

<script>
export default {
  name: 'LoginView',
  data() {
    return {
      loginId: '',
      loginPassword: ''
    }
  },
  methods: {
    async login() {
      console.log(`login 호출됨.`)

      // 로그인 요청
      const response = await this.$store.dispatch('account/requestLogin', {
        id: this.loginId,
        password: this.loginPassword
      })

      // 로그인 성공 여부 확인
      if (response.data.output.header.total > 0) {  // 로그인 성공
        console.log(`로그인 성공`)
        
        // 세션 값 설정
        this.$store.state.account.session = '1001'
 

        // 홈 화면으로 이동
        this.$router.replace({path: '/home',query: {}})

      } else {  // 로그인 실패
        console.log(`로그인 실패`)

        alert(`사번 또는 비밀번호가 맞지 않습니다. 확인 후 다시 로그인해주세요.`)
      }

      
    }
  },
  mounted() {
    console.log('LoginView:mounted 호출됨.')

  }
}
</script>

<style scoped>
 
  .form-control-lg {
      top: 0.8rem;
      scale: 1.1;
  }


</style>
