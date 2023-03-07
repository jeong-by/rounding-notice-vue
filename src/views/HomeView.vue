<template>

  <div class="home d-flex justify-content-center align-items-center">
 
    <div class="row row-cols-1 row-cols-md-3 g-4 ms-1 me-1">
      <div class="col">
        <div class="card h-100">
          <img src="@/assets/images/rounding3.png" class="card-img-top" alt="회진알림"/>
          <div class="card-body">

            <h5 class="card-title" style="font-size:1.3rem; color:#1d819b; margin-top:-0.5em;"><b>회진 알림</b></h5>
             
            <span style="font-size:1.3rem;margin-bottom:0 !important;"><b>김은미 교수님, 안녕하세요?</b></span> <br/>
            오늘 회진 시간은 <b>
                <span style="font-size:1.1rem;color:#0000ff;">{{data.startTime1}} ~ {{data.endTime1}} </span>
                <span v-if="secondary=='Y'" style="font-size:1.1rem;color:#0000ff;"> / {{data.startTime2}} ~ {{data.endTime2}}</span></b>
            입니다.
            <p style="margin-top:2vh;">아래 버튼을 눌러 오늘 회진 시간 / 취소 정보를 <br/> 환자에게 메시지로 알릴 수 있습니다.</p>
        
            <div>
              <button class="btn btn-primary btn-rounded p-3" style="font-size:1rem" @click="goToConfirm()"><b>예정대로 회진</b></button>
              <button class="btn btn-warning btn-rounded ps-3 pe-3 pt-2 pb-2 ms-3" style="font-size:0.9rem" @click="goToModify()"><b>회진 변경</b></button> 
              <button class="btn btn-danger btn-rounded ps-3 pe-3 pt-2 pb-2 ms-3" style="font-size:0.9rem" @click="goToCancel()"><b>회진 취소</b></button> 
            </div>
          </div>
          <div class="card-footer">
            <div style="text-align:left; margin-left:1.5em;">
              <p>※ 이 메시지는 당일만 사용 가능합니다.
                <br>※ DARWIN '병동환자 선택' 화면에서도 회진
                <br>&nbsp;&nbsp;&nbsp;&nbsp;알림이 가능합니다.
              </p>
            </div>
          </div>
        </div>
      </div>
       
    </div>
 
  </div>

</template>

<script>
export default {
  name: 'HomeView',

  data() {
    return {
      secondary: 'N',
      data: {
        startTime1:'08:10',
        endTime1:'09:00',
        startTime2:'14:00',
        endTime2:'15:00'
      }
    }
  },

  methods: {
    // 예정대로 회진 클릭 시
    goToConfirm() {
 
        this.$store.state.timeData = this.data
        this.$router.replace({path: '/confirm', query: {data: this.data}})

    },

    // 회진 변경 클릭 시
    goToModify() {
 
        this.$store.state.timeData = this.data
        this.$router.replace({path: '/modify', query: {data: this.data}})

    },

    // 회진 취소 클릭 시
    async goToCancel() {
      
      // 취소 화면으로 이동
      //this.$router.replace({path: '/cancel', query: {}})

      // 임시로 진행중 화면으로 이동
      this.$router.replace({path: '/progress', query: {}})

      // 임시로 패턴 등록 화면 띄우기
      //this.$router.replace({path: '/patternregister', query: {}})

    },

    // 로그아웃
    async logout() {
      console.log(`logout 호출됨.`)

      // 세션 삭제
      this.removeSession()

      // 로그인 화면으로 이동
      this.$router.replace({path: '/',query: {}})
    },

    // 세션 속성값 삭제
    async removeSession() {
      console.log(`removeSession 호출됨.`)

      this.$store.state.account.session = ''

    },

    // 세션 체크
    checkSession() {
      if (this.$store.state.account.session == '') {
        console.log(`세션이 없어서 로그인 화면으로 이동합니다.`)
        this.$router.replace({path: '/login',query: {}})
      }
    },

  },

  mounted() {
    console.log('HomeView:mounted 호출됨.')

    console.log(`query : ${JSON.stringify(this.$route.query)}`) // 요청 파라미터

    // 요청 파라미터의 세션값 체크
    if (this.$route.query.session) {
      // TODO : 웹서버로 세션 유효성 확인


      // store의 변수에 세션 정보 설정
      this.$store.state.account.session = this.$route.query.session
    }

    // 세션 없으면 로그인 화면으로 이동
    this.checkSession()
    
    // 2차 회진이 있는지 확인
    if (this.data.startTime2) {
      this.secondary = "Y";
    }
    
  }
}
</script>

<style scoped>
 
</style>
