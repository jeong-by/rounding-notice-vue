<template>
  <div class="home d-flex justify-content-center align-items-center">
 
    <div class="row row-cols-1 row-col-lg-1  g-4 ms-1 me-1">
      <div class="col">
        <div class="card h-100">
          <div class="card-header modify-card">
            <h5 class="card-title mt-3" style="font-size:1.3rem; color:#1d819b;"><b>인증패턴 등록</b></h5>
          </div>
          <div class="card-body">
 
            <span style="font-size:1.2rem;margin-bottom:0 !important;"><b>최초 사용 시 또는 패턴을 잊었을 때는<br>인증을 위해 패턴을 새로 등록해야<br>사용하실 수 있습니다.</b></span> <br/>
            <br>
            <span style="font-size:1rem; color:#666666;">DARWIN 사번과 비밀번호를 입력하시고<br>휴대폰 본인인증 후 패턴을 등록하세요.</span>
            <br>
            <br>
            
            <!-- username input -->
            <div class="input-group rounded ms-3 mt-3">
              <input v-model="userId" type="search" class="form-control form-control-lg rounded" placeholder="DARWIN 사번" aria-label="DARWIN 사번" aria-describedby="search-addon" />
              <span class="input-group-text border-0" id="search-addon">
                <i class="fas ms-3 me-3"></i>
              </span>
            </div>

            <!-- password input -->
            <div class="input-group rounded ms-3 mt-3">
              <input v-model="userPassword" type="password" class="form-control form-control-lg rounded" placeholder="비밀번호" aria-label="비밀번호" aria-describedby="search-addon" />
              <span class="input-group-text border-0" id="search-addon">
                <i class="fas fa-eye ms-3 me-3.5 mt-4" style="scale: 1.3;"></i>
              </span>
            </div>
 
            <br>
            <br>
            <div class="card-footer" style="padding-top: 0 !important">
              <button class="btn btn-primary btn-rounded ps-4 pe-4 pt-3 pb-3 mt-2" style="font-size:1rem" @click="doAuth()"><b>휴대폰 본인인증</b></button>
              <button class="btn btn-light btn-rounded ps-4 pe-4 pt-2 pb-2 ms-4" style="font-size:0.9rem" @click="doCancel()"><b>취소</b></button> 
            </div>
            <span style="font-size:0.8rem;">통신사 가입자명과 다윈 계정명 이 다른경우 <br/> 본인인증이 제한 될 수 있습니다. <br/> 
              <a href="mailto:aneju.lee@partner.samsung.com?cc=jb_yun93.jeong@partner.samsung.com&subject=[SMC 회진알림톡 VOC]&body=통신사 가입자명과 다윈 계정명이 다른 경우 %0D%0A 아래 내용을 입력하여 보내주세요. 예외처리 후 회신 드리겠습니다.%0D%0A  %0D%0A 통신사 가입자명:%0D%0A다윈 계정명:%0D%0A다윈 사번:%0D%0A휴대폰 번호: ">문의하기</a>
            </span>

          </div>
        </div>
      </div>
       
    </div>
 
  </div>

  <!-- Modal 1 -->
  <div
    class="modal fade"
    id="myModal"
    tabindex="-1"
    aria-labelledby="myModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="myModalLabel">
            알림
          </h5>
          <button
            type="button"
            class="btn-close"
            data-mdb-dismiss="modal"
            aria-label="확인"
          ></button>
        </div>
        <div class="modal-body">
          <br>
          <p v-html="warningMsg"> </p>
          <br>
        </div>
        <div class="modal-footer">
          <button @click="doModalOk()" type="button" class="btn btn-primary" data-mdb-dismiss="modal">
            확인
          </button>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
import * as mdb from 'mdb-ui-kit';
import moment from 'moment';

import crypto from '../api/crypto'

// 날짜 포맷
const dateFormat = 'YYYY-MM-DD HH:mm:ss'

export default {
  name: 'PatternRegisterView',
  data() {
    return {
       presetUserId:'',
       modelMessage: '',
       modalOk: '',
       userId: '',
       userPassword: '',
       certPassword: '1q2w3e4r5t',
       deviceId: '6e8a125dac',
       pin: 'MTExMzk4NjU5NA==',
       warningMsg:'DARWIN 사번과 비밀번호를 먼저 입력하세요.'
    }
  },
  methods: {
    async requestPhoneAuth(id,decodeName,sBirthDate,sResponseNumber) {
      try {
          
          let response = await this.$store.dispatch('pinauth/requestPhoneAuth', {
            
            id:id,
            name:decodeName,
            birth:sBirthDate,
            responseNumber:sResponseNumber

          })
          
          return response.data.code
      } catch(err) {
        return err
      }
    },

    // 모달 대화상자의 OK 클릭 시
    doModalOk() {

        // 메인 화면으로 이동
        this.$router.replace({path: '/rounding-notice/patternregister', query: {}});
      

    },

    // 인증 처리 진행
    async doAuth() {

      // 1. 사번, 비밀번호 입력 체크
      if (this.userId.length < 1 || this.userPassword.length < 1) {
        this.modalOk = ''
        this.userId = this.userId.toLowerCase();
        this.userPassword = this.userPassword.toLowerCase();
        const myModal = new mdb.Modal(document.getElementById('myModal'), {})
        myModal.show()

        return;
      }

      if( this.presetUserId !== this.userId) {
        this.modalOk = ''
        this.warningMsg = "해당 URl에 유효한 DARWIN 사번이 아닙니다. <br/> 확인 후 다시 시도해주세요. "
        const myModal = new mdb.Modal(document.getElementById('myModal'), {})
        myModal.show()

        return;
      }

      // pinauth 쪽에 userId 설정
      this.$store.state.pinauth.userData.userId = this.userId

      // 2. 단말고유번호 가져오기
      // console.log(`deviceId : ${this.deviceId}`)

      // 3. 서버에 사용자 인증 요청
      let response
      try {
          //  내부 DB 쪽 으로 확인하는 테스트용 store에서 url 변경 필요 "-darwin" 추가 필요
          response = await this.$store.dispatch('pinauth/requestAuthUser', {
              requestCode: '1001',
              id: this.userId,
              password: this.userPassword,
              device_id: this.deviceId
          })
      } catch(err) {
        this.handleNetworkError(`네트워크 요청 중 에러 : ${err}`)
        
      }

      if (response) {
        // console.log(`response : ${JSON.stringify(response.data)}`)
        if (response.data.code == 200 ) {
          this.$store.state.pinauth.variableCode = response.data.data.variableCode
          this.$store.state.pinauth.accessToken = response.data.data.accessToken

          // 본인인증 진행
          this.goToMobileAuth()
        }
        else {
          this.warningMsg = "DARWIN 사번 혹은 비밀번호를 <br/> 다시 확인해 주세요."
          const myModal = new mdb.Modal(document.getElementById('myModal'), {})
          myModal.show()
        }
        

      }

    },

    handleNetworkError(err) {
      // console.error(err)
      
      this.$store.state.pinauth.backPath = this.$route.path
      this.$store.state.pinauth.backParams = this.$route.query

      this.$router.replace({path: '/error', 
          query: {
              message: `네트워크 요청 중 에러 : ${err}`
          }
      })
    },
 
    // 본인인증 화면으로 이동
    goToMobileAuth() {
      // TODO : 본인인증 진행
      
      // BY START 2022-11-23                                                                                                      
      window.location.href = `http://unsnetworks.cafe24.com/authservice/smc_rounding_notice_checkplus_main.jsp?param_r1=https://eboard.samsunghospital.com:40016/rounding-notice/patternregister&param_r2=${this.userId}&param_r3=`;
      //window.location.href = `http://unsnetworks.cafe24.com/authservice/smc_rounding_notice_checkplus_main.jsp?param_r1=http://192.168.145.110:8080/rounding-notice/patternregister&param_r2=${this.userId}&param_r3=`;

      // mounted 에서 쿼리가 있을 경우 로 처리
      
      // BY END 2022-11-23W
    },

    // 패턴입력 화면으로 이동
    goToPattern() {

      this.$router.replace({path:'/rounding-notice/pattern', query:{}})
    },

    doCancel() {

      // 메인 화면으로 이동
      this.goToMain()

      // 블랭크 창으로 이동하기
      //this.$router.replace({path: '/blank', query: {}})

      //console.log(`doCancel called : ${this.$store.state.pinauth.backPath}`)  
      this.$router.replace({path: this.$store.state.pinauth.backPath, query: this.$store.state.pinauth.backParams})
    },

    // 세션 체크
    checkSession() {
        if (typeof(this.$store.state.pinauth.session) == 'undefined' || this.$store.state.pinauth.session.valid != 'Y') {
            this.$router.replace({path: '/rounding-notice/unauthorized', query: {}})

            return false
        } else {
            return true
        }
    },

    // 인증해시 생성
    createAuthHash() {

      // 패턴을 16자리로 맞추기
      const pinCode = crypto.checkPad(this.pin, 16)

      // 패턴을 키로 사용
      const secretKey = pinCode
      
      // 현재 날짜로 문자열 생성
      const curDateStr = moment().format(dateFormat)
      const payload = `${this.userId}:${this.deviceId}:${curDateStr}`

      this.authHash = crypto.encode(secretKey, payload)

      // 3. 인증비밀번호 암호화
      const authHashKey = this.authHash.substring(0,16)
      this.encodedCertPassword = crypto.encode(authHashKey, this.certPassword)



      // 4. 서버에 저장할 태그 데이터 생성 :   패턴으로 암호화된 사번, 인증토큰, (암호화된) 인증비밀번호
      this.encodedId = crypto.encode(secretKey, this.userId)
      

    },

    // 메인으로 돌아가기
    goToMain() {
      
      this.$router.replace({path: this.$store.state.pinauth.backPath, query: this.$store.state.pinauth.backParams})
    },

  },
  async mounted() {
    
    
    let response2;
    // BY START 2022-11-23
    // 본인인증 확인 후 돌아온 페이지
    if(this.$route.query.sName) {
      try {
        response2 = await this.$store.dispatch('pinauth/requestUserSession', {
            userId:this.$route.query.userId
        })
      } catch(err) {
        this.handleNetworkError(`네트워크 요청 중 에러 : ${err}`)
      } 
      this.$store.state.pinauth.userData = { 
        userId: this.$route.query.userId,
        userName: this.$route.query.userName,
        deptName: response2.data.body.dept_name
      }
      this.$store.state.pinauth.variableCode = response2.data.body.variableCode;
      this.$store.state.pinauth.backParams = {session: response2.data.body.sessionId } ;
      this.$store.state.pinauth.backPath = this.$route.path
      this.$store.state.pinauth.userName = this.$route.query.userName;
      try {
            await this.$store.dispatch('pinauth/requestSessionValid', {
              requestCode: '1002',
              sessionId: response2.data.body.sessionId
          })
              
          // 세션 없으면 로그인 화면으로 이동
          this.checkSession()
          
      } catch(err) {
          this.handleNetworkError(`네트워크 요청 중 에러 : ${err}`)
          
      }
      const decodeName = decodeURI(decodeURIComponent(this.$route.query.sName));
      const sBirthDate = this.$route.query.sBirthDate.substring(2,8);
      const sResponseNumber = this.$route.query.sResponseNumber
      
      // console.log("본인인증 결과// 이름 = " + decodeName +"// 생년월일 = "+ sBirthDate +"// 인증고유번호 = " + sResponseNumber);
      
      let response = await this.requestPhoneAuth(this.$store.state.pinauth.userData.userId,decodeName,sBirthDate,sResponseNumber);
      
      let response3;
      

      if (response == 200) {
        // response.data.data.body[0]의 값은 userId:"ssz017"
        
        console.log('mobileAuth success.')

        // 패턴입력 화면으로 이동
        this.$store.state.pinauth.patternType = 'register'
        this.$store.state.pinauth.patternStep = '1'
        this.goToPattern()

      }
      else if(response == 400) {
        
        try {
          response3 = await this.$store.dispatch('pinauth/requestPhoneAuth2', {
            
            id:this.$store.state.pinauth.userData.userId,
            name:decodeName,
            birth:sBirthDate,
          })
        }catch (err) {
          this.handleNetworkError(`네트워크 요청 중 에러 : ${err}`)
        }
        if(response3.data.code == 200) {
          response = await this.requestPhoneAuth(this.$store.state.pinauth.userData.userId,response3.data.data[0].user_name,sBirthDate,sResponseNumber);
          if (response == 200) {
            // response.data.data.body[0]의 값은 userId:"ssz017"
            
            console.log('mobileAuth success.')

            // 패턴입력 화면으로 이동
            this.$store.state.pinauth.patternType = 'register'
            this.$store.state.pinauth.patternStep = '1'
            this.goToPattern()

          }
          else {
            this.warningMsg = '본인인증에 실패하였습니다 <br/> 확인 후 다시 시도해 주세요.'
            const myModal = new mdb.Modal(document.getElementById('myModal'), {})
            myModal.show()
          }
        }
        else {
          // 본인인증 실패
          this.warningMsg = '본인인증에 실패하였습니다 <br/> 확인 후 다시 시도해 주세요.'
          const myModal = new mdb.Modal(document.getElementById('myModal'), {})
          myModal.show()
        }
        
      }
      else {
        this.handleNetworkError(`네트워크 요청 중 에러 : `);
      }
    }
    const userData = this.$store.state.pinauth.userData;
    if (this.$store.state.pinauth.userData) {
      this.presetUserId = userData.userId;
    }
    
    // BY END 2022-11-23
    
    
    // 서버에 세션 유효성 확인 요청
      
    // 세션 없으면 로그인 화면으로 이동
    this.checkSession();
    
  },
  computed: {
    subTitle() {
        return this.propsData.subTitle.replace("\n", "<br />")
    }
  }
}
</script>

<style scoped>
 
  .form-control-lg {
      top: 0.8rem;
      scale: 1.1;
  }

  span {
    word-break: keep-all;
  }


</style>
