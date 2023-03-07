<template>

    <div class="home d-flex justify-content-center align-items-center">
  
      <div class="card">
          <div class="card-header">
              <h5 class="card-title mt-3" style="font-size:1.3rem; color:#1d819b;"><b>잘못된 패턴 입력 </b></h5>
          </div>
          <div class="card-body">
   
              <br>
              <span style="font-size:1.1rem; color:#0d6efd;" :key="compKey"><b>{{time}} 초 뒤 다시 시도해주세요</b></span><br/>
              <br>
              <p class="mt-3"><b><span v-html="msg"></span></b></p>
              <br>
              <span style="font-size:1rem; color:#0d6efd;" @click="goToPatternRegister()"><b>패턴을 잊었어요</b></span>
  
          </div>
      </div>
      
    </div>
   
  </template>
  
  <script>
  export default {
    name: 'BlankView',
    data() {
      return {
        time:0,
        compKey:0,
        lock_time:0,
        lock_count:0,
        msg:'5회 이상 인증실패로 1분간 사용이 불가 합니다. <br/>  8회 이상 인증실패 시 3분간 사용이 불가하게 됩니다.'
      }
    },
    methods: {
        forceRefresh() {
            let now = new Date();
            now = Math.ceil(now.getTime()/1000); // 소수점 올림
            this.time = this.lock_time-now
            this.compKey += 1;
            
        },
        goToMain () {
            this.$router.replace({path: '/rounding-notice/', query: {session:this.$store.state.pinauth.backParams.session}})
        },
        goToPatternRegister() {
          
          // 임시로 패턴 등록 화면 띄우기
          this.$router.replace({path: '/rounding-notice/patternregister', query: {}})
  
        },
    },
    async mounted() {
	
        setTimeout(async function(){
		const response = await this.$store.dispatch('pinauth/requestSaveLockCount', {
			requestCode:'1001',
			userId: this.$store.state.pinauth.userData.userId
		})
		console.log(response);
		const lock_time = response.data.body.lock_time;
		const lock_count = response.data.body.lock_count;
		this.lock_time = lock_time;
		this.lock_count = lock_count;
		if (this.lock_count > 5) {
			this.msg = `8회 이상 인증실패로 3분간 사용이 불가 합니다. <br/> 10회 인증실패 시 본인인증이 필요합니다.`
		}
		let timer = setInterval(()=>{
			this.forceRefresh();
			if(this.time < 1 ) {
				clearInterval(timer);  
				this.goToMain()
			} 
		},1000);
	}.bind(this),500);
    }
  }
  </script>
  
  <style scoped>
   
  </style>