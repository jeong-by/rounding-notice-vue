<!-- https://codepen.io/frankno/pen/jpOxPY -->
<template>

  <div class="container d-flex align-items-center justify-content-center">

    <div :class="anim">
      <div class="mb-3">
        <span style="font-size:1.3rem; color:#ffffff;"><b>{{ message }}</b></span>
        <button class="btn btn-light btn-rounded ps-4 pe-4 pt-2 pb-2 ms-3" style="font-size:0.9rem" @click="doCancel()"><b>취소</b></button> 
      </div>
      <canvas id="example" style="background-color:rgba(0,0,0,1.0);"></canvas>
      <div v-if="this.$store.state.pinauth.patternType != 'register'" style="margin-top:1em;">
        <span style="font-size:1rem; color:#ffffff;" @click="goToPatternRegister()"><b>패턴을 잊었어요</b></span>
      </div>
    </div>

  </div>

  <!-- Modal 2 -->
  <div
    class="modal fade"
    id="myModal2"
    tabindex="-1"
    aria-labelledby="myModalLabel2"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="myModalLabel2">
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
          <div><span style="font-size:1.1rem; color:#0d6efd;"><b>인증 패턴이 정상적으로 등록되었습니다.</b></span></div>
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

import PatternLock from '@phenax/pattern-lock-js';

export default {
    name: "PatternView",
    data() {
      return {
        lock: undefined,
        started: false,
        message: '인증 패턴을 입력하세요.',
        anim:'',
        certPassword: '1q2w3e4r5t',
        deviceId: '6e8a125dac',
        pin: 'MTExMzk4NjU5NA==',
        lock_count : 0,
        compkey: 0,
      };
    },
    mounted() {
	this.lock_count = this.$store.state.pinauth;
	// 세션 없으면 로그인 화면으로 이동
	this.checkSession()
	// 패턴 초기화
	this.initLock()
	
    },
    methods: {

      // 세션 체크
      checkSession() {
          if (typeof(this.$store.state.pinauth.session) == 'undefined' || this.$store.state.pinauth.session.valid != 'Y') {
              this.$router.replace({path: '/rounding-notice/unauthorized', query: {}})

              return false
          } else {
              return true
          }
      },

      // 패턴 화면 초기화
      initLock() {

        // 패턴 화면 초기화
        const myCanvas = document.querySelector('#example')

        myCanvas.addEventListener("mousedown", () => { this.started = true });
        myCanvas.addEventListener("touchstart", () => { this.started = true });
        
        this.lock = PatternLock({
              $canvas: myCanvas,
              grid: [4, 4],
              width: 380, 
              height: 450
        });

        this.lock.setTheme({
          default: {
              colors: {
                  accent: '#1abc9c',     // Accent color for node
                  primary: '#ffffff',    // Primary node and line color
                  bg: '#0d1895',         // Canvas background color
              },
              dimens: {
                  node_radius: 30,       // Radius of the outer ring of a node
                  line_width: 8,         // Thickness of the line joining nodes
                  node_core: 0,          // Radius of the inner circle of a node
                  node_ring: 3,          // Outer ring thickness
              }
          },
          success: {
            colors: {
              accent: '#51e980',     // Green accent on successful match
            },
            dimens: {
                node_radius: 30,       // Increases the node radius
            }
          },
          failure: {
            colors: {
              accent: '#ff5b5e',     // Red accent on an unsuccessful match
            }
          },
          customState: {                 // Your custom state
              dimens: {
                  node_radius: 30,       // Increases the node radius
              }
          },
        });

        // 패턴 입력이 완료되었을 때
        this.lock.onComplete(({ hash }) => {
          if (this.started) {
            this.handlePattern(hash)
          }

        });

        //this.lock.matchHash([ 'MTExMzk4NjU5NA==' ])
        //  .onSuccess(() => { if (this.started) { this.doSuccess() } })
        //  .onFailure(() => { if (this.started) { this.doFailure() } })

      },

      // 패턴 처리
      handlePattern(hash) {
        // console.log(`handlePattern called : ${hash}`)

        const patternType = this.$store.state.pinauth.patternType
        const patternStep = this.$store.state.pinauth.patternStep
        // console.log(`patternType : ${patternType}, patternStep : ${patternStep}`)

        if (patternType == 'register') {    // 패턴 등록 타입
          if (patternStep == '1') {         // 첫번째 입력일 경우
            if (this.lock.selectedNodes.length >= 4) {
              this.patternValue = hash
            
              this.$store.state.pinauth.patternStep = '2'
              this.message = '다시 한 번 입력해주세요.'

              setTimeout(() => {
                this.resetLock()
              }, 500)
            }
            else {
              this.$store.state.pinauth.patternStep = '1'
              this.message = '최소 4개이상의 포인트를 연결해 주세요.'
              setTimeout(() => {
                this.resetLock()
              }, 500)
            }
            
            
          } else if (patternStep == '2') {         // 두번째 입력일 경우

            if (this.patternValue == hash) {       // 두 번의 인증패턴이 일치하는 경우
              
              this.pin = hash
              this.doRegisterSuccess()

            } else {                               // 두 번의 인증패턴이 일치하지 않는 경우
              
              this.message = '인증 패턴을 입력하세요.'
              this.$store.state.pinauth.patternStep = '1'

              this.doFailure()

            }

          }

        } else if (patternType == 'use' || patternType == 'cancel') {  // 패턴 사용 타입

          // pin 값으로 저장
          this.pin = hash

          // 패턴 사용 인증 진행
          this.doUseAuth()


        } else {
          console.error(`Unknown patternType : ${patternType}`)
        }

      },

      doRegisterSuccess() {

        this.message = '인증 패턴이 일치합니다.'

        this.lock.setThemeState('success');
        
        setTimeout(() => {
          this.resetLock()

          // 인증 과정 진행
          this.goToAuth()

        }, 500)

      },

      // 인증 진행
      async goToAuth() {

        // state에 있는 userId, variableCode, accessToken 을 로컬에 복사
        this.userId = this.$store.state.pinauth.userData.userId
        this.variableCode = this.$store.state.pinauth.variableCode
        this.accessToken = this.$store.state.pinauth.accessToken


        // 1. 전자인증서 비밀번호 확인
        
        // console.log(`certPassword: ${this.certPassword}`)


        // 2. 인증해시 생성

        this.createAuthHash()


        // 5. 서버에 인증파라미터 저장 요청

        let response
        try {
            response = await this.$store.dispatch('pinauth/requestSaveHash', {
                requestCode: '1001',
                id: this.userId,
                value: this.authHash,
                code: this.variableCode,
                data: this.tagData
            })
        } catch(err) {
          this.handleNetworkError(`네트워크 요청 중 에러 : ${err}`)
          
        }

        if (response) {
          //console.log(`response : ${JSON.stringify(response.data)}`)

          if (response.data.data.affectedRows > 0) {
            //console.log('인증파라미터 저장 성공')
            try {
                response = await this.$store.dispatch('pinauth/refreshLock', {
                    requestCode: '1001',
                    userId: this.userId,
                   
                })
                const myModal2 = new mdb.Modal(document.getElementById('myModal2'), {})
                myModal2.show()
            } catch(err) {
              this.handleNetworkError(`네트워크 요청 중 에러 : ${err}`)
              
            }
            

          } else {
            //console.log('인증파라미터 저장 실패')

          }

        }
 
      },

      // 모달 대화상자의 OK 클릭 시
      doModalOk() {

        const patternType = this.$store.state.pinauth.patternType
        if (patternType == 'register') {  // 패턴 등록 완료
          // 메인 화면으로 이동
          
          this.goToMain()

        } else if(patternType == 'use') {   // 패턴 사용 완료

        } else {
          //console.error(`Unknown patternType : ${patternType}`)
        }

      },

      // 메인으로 돌아가기
      goToMain() {
        // console.log(`goToMain called : ${this.$store.state.pinauth.backPath}`)
        // console.log(this.$store.state.pinauth.backParams.session)
        this.$router.replace({path: '/rounding-notice/', query: {session:this.$store.state.pinauth.backParams.session}})
      },

      handleNetworkError() {
        // console.error(err)
        // console.log(`backPath : ${this.$route.path}`)
        // console.log(`backParams : ${JSON.stringify(this.$route.query)}`)
        
        this.$store.state.pinauth.backPath = this.$route.path
        this.$store.state.pinauth.backParams = {session : this.$route.query}

        this.$router.replace({path: '/error', 
            query: {
                message: `페이지를 찾을 수 없습니다`
            }
        })
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
        this.tagData = `${this.encodedId}:${this.accessToken}:${this.encodedCertPassword}`

      },

      doUseAuth() {
 
        this.lock.setThemeState('success');
        
        setTimeout(() => {
          this.resetLock()
 
          // 검증 진행
          this.goToVerify()

        }, 500)

      },

      async goToVerify() {
 
        
        // state에 있는 variableCode를 로컬에 복사
        this.variableCode = this.$store.state.pinauth.variableCode


        // 1. 서버에 태그데이터 조회 요청

        let response
        try {
          response = await this.$store.dispatch('pinauth/requestTagDataSelect', {
              requestCode: '1001',
              code: this.variableCode
          })
        } catch(err) {
          this.handleNetworkError(`네트워크 요청 중 에러 : ${err}`)
          
        }

        if (response) {

          if (response.data.data.length > 0) {
            //this.userId = response.data.data[0].id
            this.authHash = response.data.data[0].value
            //this.userId = response.data.data[0].code
            this.tagData = response.data.data[0].data

        
            // 태그 데이터를 : 기호로 분리
            const tokens = this.tagData.split(":")
            this.encodedId = tokens[0]
            this.accessToken = tokens[1]
            this.encodedCertPassword = tokens[2]

            //console.log(`확인한 [encodedId] : ${this.encodedId}`)
            //console.log(`확인한 [accessToken] : ${this.accessToken}`)
            //console.log(`확인한 [encodedCertPassword] : ${this.encodedCertPassword}`)	

            this.authVerify()

          }
           
        }

      },

      async authVerify() {

        // 패턴을 16자리로 맞추기
        this.pinCode = crypto.checkPad(this.pin, 16)    
        // 사용자 ID 복호화
        const secretKey = this.pinCode
	
        this.userId = crypto.decode(secretKey, this.encodedId)
	//console.log(`확인한 [userId] : ${this.userId}`)

        // 빈 값이 나오는 경우 잘못된 패턴임 (인증 실패)
        if (typeof(this.userId) == 'undefined' || this.userId.length < 1) {
          if (this.compkey == 0) {
            
            this.doFailure2()
          }
          return
        }

        // 인증비밀번호 복호화
        const authHashKey = this.authHash.substring(0,16)
        this.certPassword = crypto.decode(authHashKey, this.encodedCertPassword)
        // console.log(`확인한 [certPassword] : ${this.certPassword}`)
        
        const patternType = this.$store.state.pinauth.patternType
        if (patternType == 'use') {  
          
          // BY START
          // 회진알림발송 모드
          let patientsList;
          let response;
          let response2;
          let count = 0;
          try {
              response2 = await this.$store.dispatch('pinauth/reqeustSendNotice', {
                  id: this.userId,
              })

          } catch(err) {
            this.handleNetworkError(`네트워크 요청 중 에러 : ${err}`)
          }
           patientsList = response2.data.data;
          try {
            for(let i =0; i < patientsList.length; i++) {
              let number =2
              patientsList[i].am_roun_strt_hh =  this.$store.state.pinauth.timeData.startTime1;
              patientsList[i].am_roun_fnsh_hh =  this.$store.state.pinauth.timeData.endTime1;
              patientsList[i].pm_roun_strt_hh =  this.$store.state.pinauth.timeData.startTime2;
              patientsList[i].pm_roun_fnsh_hh =  this.$store.state.pinauth.timeData.endTime2;

              if(this.$store.state.pinauth.timeData.startTime2.length <= 1) {
                number = 1;
              }
              response = await this.$store.dispatch('pinauth/requestSendConfirm', {
                  patientInfo:patientsList[i],
                  number: number
              })
              count = count + response.data.affectedRows;
              
            }

          } catch(err) {
            this.handleNetworkError(`네트워크 요청 중 에러 : ${err}`)
          }
          let sendSuccess = true;
          // test
          // if(response.status == 200) {
          //   sendSuccess = true;
          // }
          
          

          // 환자에게 메시지 전송 요청이 성공한 경우
          if (sendSuccess) {
            this.$router.replace({path: '/rounding-notice/confirm', query: {}})
          }
          // BY END

        } else if (patternType == 'cancel') {  // 회진알림취소 모드
      
          // BY START
          // 회진취소알림 발송 모드
          let patientsList;
          let response = {status:200};
          let response2;
          let count = 0;
          try {
              response2 = await this.$store.dispatch('pinauth/reqeustSendNotice', {
                  id: this.userId,
              })
		
          } catch(err) {
            this.handleNetworkError(`네트워크 요청 중 에러 : ${err}`)
          }
          patientsList = response2.data.data;
          
          try {
            for(let i =0; i < patientsList.length; i++) {
              response = await this.$store.dispatch('pinauth/requestSendCancel', {
                  patientInfo:patientsList[i],
                  deptName: this.$store.state.pinauth.userData.deptName
              })
              count = count + response.data.affectedRows;
            }

          } catch(err) {
            this.handleNetworkError(`네트워크 요청 중 에러 : ${err}`)
          }
          let sendSuccess;
          if(response.status == 200) {
            sendSuccess = true;
          }


          // 환자에게 메시지 전송 요청이 성공한 경우
          if (sendSuccess) {
            // 전송결과 화면으로 이동
            this.$router.replace({path: '/rounding-notice/cancel', query: {}})
          

          }

        }


      },

      doSuccess() {

        this.message = '인증 패턴이 일치합니다.'

        this.lock.setThemeState('success');
        
        setTimeout(() => {
          this.resetLock()

          this.$router.replace({path: '/rounding-notice/confirm', query: {data: this.data}})

        }, 2000)

      },

      async doFailure() {
        
        this.message = '인증 패턴이 맞지 않습니다.'
        // 흔들기
        this.addShake()

        this.lock.setThemeState('failure');
        

        setTimeout(() => {
          this.resetLock()
          this.removeShake()
        }, 2000)

      },

      async doFailure2() {
        this.resetLock()
       
        let response;
        // 흔들기
        this.addShake()

        this.lock.setThemeState('failure');
        
        response = await this.$store.dispatch('pinauth/requestSaveLockCount', {
            requestCode:'1002',
            userId: this.$store.state.pinauth.userData.userId
        })
        this.$store.state.pinauth.lockCount = response.data[0].lock_count
        
        if(this.$store.state.pinauth.lockCount < 5) {
          this.message = `(${this.$store.state.pinauth.lockCount}/5) 인증 패턴이 맞지 않습니다.`
        }
        else if (5 < this.$store.state.pinauth.lockCount && this.$store.state.pinauth.lockCount < 8 ) {
          
          this.message = `(${this.$store.state.pinauth.lockCount}/8) 인증 패턴이 맞지 않습니다.`
        }
        else if  (8 <= this.$store.state.pinauth.lockCount ) {
          
          this.message = `(${this.$store.state.pinauth.lockCount}/10) 인증 패턴이 맞지 않습니다.`
        }
        if (response.data[0].lock_count == 5 || response.data[0].lock_count == 8 ) {
          let minute = 1;
          if (response.data[0].lock_count == 8) {
            minute = 3;
          }
          await this.$store.dispatch('pinauth/requestSaveLockTime', {
            count : minute,
            userId: this.$store.state.pinauth.userData.userId
          })
          this.$router.replace({path: '/rounding-notice/lockPattern', query: {}})
        }
        if (response.data[0].lock_count >9) {
          this.goToPatternRegister();
        }

        setTimeout(() => {
          
          this.removeShake()
        }, 2000)

      },

      resetLock() {
        this.lock.setInitialState()
        this.lock.renderGrid()
        this.lock.setThemeState('default');
      
      },

      doCancel() {
        // 메인으로 돌아가기
        this.compkey = 1;
        this.goToMain()

      },
 
      // 패턴을 잊었어요 클릭 시
      goToPatternRegister() {
          
        // 임시로 패턴 등록 화면 띄우기
        this.$router.replace({path: '/rounding-notice/patternregister', query: {}})

      },

      addShake() {
        this.anim = 'shakeAnim'
      },

      removeShake() {
        this.anim = ''
      }

    },

};

</script>

<style scoped>

    @keyframes shake {
      10%, 90% {
        transform: translate3d(-1px, 0, 0);
      }
      
      20%, 80% {
        transform: translate3d(2px, 0, 0);
      }

      30%, 50%, 70% {
        transform: translate3d(-4px, 0, 0);
      }

      40%, 60% {
        transform: translate3d(4px, 0, 0);
      }
    }

    .shakeAnim {
      animation: shake 0.82s cubic-bezier(.36,.07,.19,.97) both;
      transform: translate3d(0, 0, 0);
      backface-visibility: hidden;
      perspective: 1000px;
    }

    .container {

      /* 배경이미지 */
      width: 100vw;
      height: 100%;
      background-image: linear-gradient(to bottom right, #00C0FF, #4218B8);
      background-size: cover;

    }
 
</style>