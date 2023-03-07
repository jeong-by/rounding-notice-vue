    <template>

    <!-- <div class="home d-flex justify-content-center align-items-center"> -->
    <div class="home d-flex" style="justify-content: center; align-items: center;">
        <!--<div class="row row-cols-1 row-cols-md-3 g-4 ms-1 me-1" style="margin-top:-6em;">-->
        <div class="row row-cols-1 row-col-lg-1 
        g-4 ms-1 me-1 home2" style="margin-left:0.05rem !important; margin-right:0.05rem !important;">  
        <div class="col">
            <div class="card h-100" style="max-width:450px;">
            <div class="card-header modify-card">
                <h5 class="card-title mt-3" style="font-size:1.3rem; color:#1d819b;"><b>회진 알림</b></h5>
            </div>
            <div class="card-body">

                <div class="row">
                    <div v-if="this.width >= 380" class="col-12" style="text-align:left;padding-left:0 !important; padding-right:0 !important; word-break:keep-all; " >
                        <span>진료과</span> 
                        <div class="form-outline ms-2 align-self-center" style="display:inline-block; width: 8.5rem;">
                            <input
                                class="form-control"
                                id="formControlDisabled"
                                type="text"
                                placeholder="Disabled input"
                                aria-label="disabled input example"
                                disabled
                            />
                            <label class="form-label ms-1" for="formControlDisabled">{{deptName}}</label>
                        </div>
                        <span class="ms-3">지정의</span> 
                        <div class="form-outline ms-2 align-self-center" style="display:inline-block; width: 5rem;">
                            <input
                                class="form-control"
                                id="formControlDisabled"
                                type="text"
                                placeholder="Disabled input"
                                aria-label="disabled input example"
                                disabled
                            />
                            <label class="form-label ms-1" for="formControlDisabled">{{userName}}</label>
                        </div>
                    </div>
                    <div v-else  style="text-align:left;padding-left:0 !important; padding-right:0 !important; word-break:keep-all; " >
                        <div style="margin-bottom:0.5rem;">
                        <span>진료과 &nbsp;</span> 
                        <div class="form-outline ms-2 align-self-center" style="display:inline-block; width: 60vw;">
                            <input
                                class="form-control"
                                id="formControlDisabled"
                                type="text"
                                placeholder="Disabled input"
                                aria-label="disabled input example"
                                disabled
                            />
                            <label class="form-label ms-1" for="formControlDisabled">{{deptName}}</label>
                        </div>
                        </div>  
                        <div>
                        <span>지정의 &nbsp;</span> 
                        <div class="form-outline ms-2 align-self-center" style="display:inline-block; width: 60vw;">
                            <input
                                class="form-control"
                                id="formControlDisabled"
                                type="text"
                                placeholder="Disabled input"
                                aria-label="disabled input example"
                                disabled
                            />
                            <label class="form-label ms-1" for="formControlDisabled">{{userName}}</label>
                        </div>
                        </div>
                        
                    </div>
                    <br>
                    <div class="mt-2" style="text-align:left; padding-left:0 !important; padding-right:0 !important;">
                        <span>회진일자</span> 
                        <div class="form-outline ms-2 align-self-center" style="display:inline-block; width: 9rem;">
                            <input
                                class="form-control"
                                id="formControlDisabled"
                                type="text"
                                placeholder="Disabled input"
                                aria-label="disabled input example"
                                disabled
                            />
                            <label class="form-label ms-2" for="formControlDisabled">{{ today }}</label>
                        </div>
                    </div>
                </div>
                
                <div class="row mt-2" style="padding-left:0 !important; padding-right:0 !important; ">
                    <div class="col-6" style="text-align:center;">
                        <span style="font-size:0.9rem; color:#888888;">시작 시간</span>
                    </div>
                    <div class="col-6" style="text-align:center;">
                        <span style="font-size:0.9rem; color:#888888; ">종료 시간</span>
                    </div>
                </div>
                <div class="row" v-if="this.primary ==='Y'" >
                    <div class="col-12 align-self-center" style="padding-left:0 !important; padding-right:0 !important;" >
                        <span>1차</span>
                        <div class="ms-1" style="display:inline-block;"><vue-timepicker :key="compKey" @change="startTime1HHChange"  v-model="startTime1.HH" format="HH" close-on-complete hide-clear-button auto-scroll :input-width="input_width"></vue-timepicker>시 <vue-timepicker ref="myPicker2" :key="compKey" @change="startTime1mmChange" v-model="startTime1.mm" format="mm"  :minute-interval="5" close-on-complete hide-clear-button auto-scroll :input-width="input_width" ></vue-timepicker>분 </div>
                        <span class="ms-1"> <i class="fas fa-angle-double-right col-1 align-self-center"></i> </span>
                        <div class="ms-1" style="display:inline-block;"><vue-timepicker :key="compKey" @change="endTime1HHChange" v-model="endTime1.HH" format="HH" close-on-complete hide-clear-button auto-scroll :input-width="input_width"></vue-timepicker>시 <vue-timepicker :key="compKey" @change="endTime1mmChange" v-model="endTime1.mm" format="mm" :minute-interval="5" close-on-complete hide-clear-button auto-scroll :input-width="input_width" ></vue-timepicker>분 </div>
                    </div>
                </div>
                
                
                <div v-if="this.secondary ==='Y' ">
                    <!--
                    <div class="row mt-2">
                        <div class="col-2"> </div>
                        <div class="col-4"><span style="font-size:0.9rem; color:#888888;">시작시간</span></div>
                        <div class="col-6"><span style="font-size:0.9rem; color:#888888;">종료시간</span></div>
                    </div>v
                    -->
                    <div class="row mt-2" v-if="this.startTime2.HH.length>0">
                        <div class="col-12 align-self-center" style="padding-left:0 !important; padding-right:0 !important;"  >
                            <span >2차</span>
                            <div class="ms-1" style="display:inline-block;"><vue-timepicker :key="compKey" @change="startTime2HHChange" v-model="startTime2.HH" format="HH" close-on-complete hide-clear-button auto-scroll :input-width="input_width"></vue-timepicker>시 <vue-timepicker :key="compKey" @change="startTime2mmChange" v-model="startTime2.mm" format="mm" :minute-interval="5" close-on-complete hide-clear-button auto-scroll :input-width="input_width"></vue-timepicker>분 </div>
                            <span class="ms-1"> <i class="fas fa-angle-double-right col-1 align-self-center"></i> </span>
                            <div class="ms-1" style="display:inline-block;"><vue-timepicker :key="compKey" @change="endTime2HHChange" v-model="endTime2.HH" format="HH" close-on-complete hide-clear-button auto-scroll :input-width="input_width"></vue-timepicker>시 <vue-timepicker :key="compKey" @change="endTime2mmChange" v-model="endTime2.mm" format="mm" :minute-interval="5" close-on-complete hide-clear-button auto-scroll :input-width="input_width"></vue-timepicker>분 </div>
                        </div>
                    </div>
                </div>

                <div class="row mt-3 ms-3" v-if="this.startTime2.HH.length>0">
                    <div class="form-check checkbox-lg col-6 align-self-center" v-show="this.secondary=='Y'" style="text-align:left !important;"> 
                        <input v-model="primary" true-value="N" false-value="Y" class="form-check-input" type="checkbox" checked  value="" id="flexCheckDefault" />
                        <label class="form-check-label" for="flexCheckDefault">1차 회진 취소</label>
                    </div>
                    <div class="form-check checkbox-lg col-6 align-self-center" v-show="this.primary=='Y'" style="text-align:left !important;">
                        <input v-model="secondary" true-value="N" false-value="Y" class="form-check-input" type="checkbox" value=""  id="flexCheckDefault2"   />
                        <label class="form-check-label" for="flexCheckDefault2">2차 회진 취소</label>
                    </div>
                </div>

                <div class="warning-div" v-if="warning =='Y' ">
                    회진 시간 설정이 잘못되었습니다. 확인해주세요.
                </div>
                
                <div >
                    <button class="btn btn-primary btn-rounded ps-4 pe-4 pt-3 pb-3 mt-4"  @click="goToPattern()"><b>회진 알림 발송</b></button>
                    <button class="btn btn-light btn-rounded ps-4 pe-4 pt-3 pb-3 ms-3 mt-4" @click="doCancel()"><b>회진 취소 발송</b></button> 
                </div>
                
            </div>
            <div class="card-footer">
                <p style="text-align:left;;"><b>※ 회진 시간 변경 <br/> - 등록된 회진 시간이 지난 경우 시간을 변경하여 발송해주시기 바랍니다.</b>
                    <!--<br>&nbsp;&nbsp;&nbsp;&nbsp;- 동 시간대 발송 메시지가 많을 경우 알림 발송이 지연될 수 있습니다.-->
                    <!--<br>&nbsp;&nbsp;&nbsp;&nbsp;- 등록된 회진 시간이 지난 경우 시간을 변경하여 발송 바랍니다.-->
                </p>
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
                <button  type="button" class="btn btn-primary" data-mdb-dismiss="modal">
                    확인
                </button>
                </div>
            </div>
            </div>
        </div>

    </div>

    </template>


    <script>

    import moment from 'moment'
    import VueTimepicker from 'vue3-timepicker'
    import 'vue3-timepicker/dist/VueTimepicker.css'
    import * as mdb from 'mdb-ui-kit';
    export default {
        components: {
            VueTimepicker
        },

        data() {
            return {
                width:0,
                input_width:"12vw",
                compKey: 0,
                warning:'N',
                today: '',
                primary:'Y',
                secondary:'Y',
                userName:'',
                userId:'',
                deptName:'',
                startTime1: {
                    HH:'',
                    mm:''
                },
                endTime1: {
                    HH:'',
                    mm:''
                },
                startTime2: {
                    HH:'',
                    mm:''
                },
                endTime2: {
                    HH:'',
                    mm:''
                },
                startTime1HH: '',
                startTime1mm: '',
                endTime1HH: '',
                endTime1mm: '',
                startTime2HH: '',
                startTime2mm: '',
                endTime2HH: '',
                endTime2mm: '',
                warningMsg:'',
            }
        },

        async mounted() {
            let response
            let response2

            this.width = window.innerWidth;
            if (window.innerWidth >500) {
        
            
            this.input_width = '3.5rem'
            } 
            // moment 초기화
            moment.locale('ko', {
                weekdays: ["일요일","월요일","화요일","수요일","목요일","금요일","토요일"],
                weekdaysShort: ["일","월","화","수","목","금","토"],
            })

            setTimeout(async function () {
                if (this.$route.query.session) {

                // 서버에 세션 유효성 확인 요청
                
                this.$store.state.pinauth.backPath = this.$route.path
                this.$store.state.pinauth.backParams = this.$route.query
		
		//첫번째
                try {
                    response = await this.$store.dispatch('pinauth/requestSessionValid', {
                        requestCode: '1001',
                        sessionId: this.$route.query.session
                    })
			
                    // 세션 없으면 로그인 화면으로 이동
                    this.checkSession()
                    
                } catch(err) {
                    this.handleNetworkError(`네트워크 요청 중 에러 : ${err}`)
                    
                }

                if (typeof(response) != 'undefined' && response.data.body.valid == 'Y') {    // 세션 유효함

                    // 오늘 날짜 설정
                    this.today = moment().format("MM-DD (ddd)")
                    
                    // 스토어에 timeData 설정
                    this.$store.state.pinauth.timeData = {
                        startTime1: response.data.body.startTime1,
                        endTime1: response.data.body.endTime1,
                        startTime2: response.data.body.startTime2,
                        endTime2: response.data.body.endTime2
                    }
                    // 스토어에 의사 데이터 설정
                    this.$store.state.pinauth.userData = {
                        userId: response.data.body.userId,
                        userName: response.data.body.userName,
                        deptName: response.data.body.deptName
                    }
                    

                    // 스토어에 timeData가 있으면 데이터로 설정
                    if (typeof(this.$store.state.pinauth.timeData) != 'undefined') {

                        const timeData = this.$store.state.pinauth.timeData

                        if(timeData.startTime1 == '') {
                            timeData.startTime1 = timeData.startTime2;
                            timeData.endTime1 = timeData.endTime2;
                            timeData.startTime2 = '';
                            timeData.endTime2 = ''; 
                        }

                        this.startTime1.HH = timeData.startTime1.split(':')[0];
                        this.startTime1.mm = timeData.startTime1.split(':')[1];
                        this.endTime1.HH = timeData.endTime1.split(':')[0];
                        this.endTime1.mm = timeData.endTime1.split(':')[1];
			
                        if(timeData.startTime2 != '') {
                            this.secondary = "Y";

                            this.startTime2.HH = timeData.startTime2.split(':')[0];
                            this.startTime2.mm = timeData.startTime2.split(':')[1];
                            this.endTime2.HH = timeData.endTime2.split(':')[0];
                            this.endTime2.mm = timeData.endTime2.split(':')[1];
                        }
                        else {
                            this.secondary = "N";
                        }

                        this.startTime1HH = timeData.startTime1.split(':')[0];
                        this.startTime1mm = timeData.startTime1.split(':')[1];
                        this.endTime1HH = timeData.endTime1.split(':')[0];
                        this.endTime1mm = timeData.endTime1.split(':')[1];
                        
                        if(timeData.startTime2 != '') {
                            this.secondary = "Y";
                            this.startTime2HH = timeData.startTime2.split(':')[0];
                            this.startTime2mm = timeData.startTime2.split(':')[1];
                            this.endTime2HH = timeData.endTime2.split(':')[0];
                            this.endTime2mm = timeData.endTime2.split(':')[1];
                        }
                        else {
                            this.secondary = "N";
                        }

                    }
                    if (typeof(this.$store.state.pinauth.userData) != 'undefined') {
                        const userData = this.$store.state.pinauth.userData

                        this.userId = userData.userId
                        this.userName = userData.userName
                        this.deptName = userData.deptName
                    }

                    try {
			// 두번째
                        const response = await this.$store.dispatch('pinauth/requestSaveLockCount', {
                            requestCode:'1001',
                            userId: this.$store.state.pinauth.userData.userId
                        })
			
                        let now = new Date();
                        now = Math.ceil(now.getTime()/1000);
                        this.$store.state.pinauth.lockCount = response.data.body.lock_count;
                        if (response.data.body.lock_time > now) {
                            if (response.data.body.lock_count == 5 || response.data.body.lock_count == 8) {
                                this.$router.replace({path: '/rounding-notice/lockPattern', query: {}})
                            }
                            
                        }
                        if (response.data.body.lock_count >9) {
                            this.$router.replace({path: '/rounding-notice/patternregister', query: {}})
                        }
                        
                    } catch(err) {
                        this.handleNetworkError(`네트워크 요청 중 에러 : ${err}`)
                        
                    }



                    // 컴포넌트 강제 새로고침 (이렇게 하지 않으면 변경된 데이터값이 반영되지 않음)
                     this.forceRefresh()
                    
                    // 가변 코드 확인
                    const variableCode = response.data.body.variableCode
                    if (typeof(variableCode) != 'undefined' && variableCode.length > 0) {   // 가변 코드가 있는 경우
                        // 패턴 사용 모드로 진행

                        this.$store.state.pinauth.variableCode = variableCode
                        try {
				//3번째
                            response2 = await this.$store.dispatch('pinauth/requestcheckChange', {
                                requestCode: '1001',
                                sessionId: this.$route.query.session
                            })
                            const changeData = response2.data[0];
                            if (changeData.check_send == "y") {
                                // 회진 취소 여부
                    
                                if (changeData.ch_start_time1.length == 0) {
                                    this.modalOk = ''  
                                    this.warningMsg = "<b style='color:red'>회진 취소 </b> 알림이 발송 되었습니다."
                                    const myModal = new mdb.Modal(document.getElementById('myModal'), {})
                                    myModal.show()

                                    return;
                                    
                                } else {
                                    this.modalOk = '' 
                                    if (changeData.ch_start_time2.length == 0) {
                                        this.warningMsg = `입원 환자에게 <br/> <b style='color:blue'>회진 시간 알림이 발송 되었습니다. </b> <br/> <p>[회진시간 : <b> ${changeData.ch_start_time1} ~ ${changeData.ch_end_time1} </b>]</p> `
                                    }
                                    else {
                                        this.warningMsg = `입원 환자에게 <br/> <b style='color:blue'>회진 시간 알림이 발송 되었습니다. </b> <br/> <p>[회진시간 : <b> ${changeData.ch_start_time1} ~ ${changeData.ch_end_time1} / ${changeData.ch_start_time2} ~ ${changeData.ch_end_time2} </b>]</p> `
                                    }
                                    const myModal = new mdb.Modal(document.getElementById('myModal'), {})
                                    myModal.show()

                                    return;
                                }
                            }    
                            
                        } catch(err) {
                            this.handleNetworkError(`네트워크 요청 중 에러 : ${err}`)
                            
                        }

                    } else {    // 가변 코드가 없는 경우
                        // 패턴 등록 모드로 진행

                        // 패턴 등록 화면 띄우기
                        this.$router.replace({path: '/rounding-notice/patternregister', query: {}})

                    }
                    
                    

                }


                } else {
                    
                // 세션 없으면 로그인 화면으로 이동
                this.checkSession()

                }

                
            }.bind(this), 1000)
            // 요청 파라미터의 세션값 체크
            

        },

        methods: {
            // 강제로 새로고침
            forceRefresh() {
                this.compKey += 1;  
            },

            showModal () {
                this.modalOk = ''
                const myModal = new mdb.Modal(document.getElementById('myModal'), {})
                myModal.show()
            },

            startTime1HHChange(event) {
                if(parseInt(event.data.HH + this.startTime1mm) < parseInt(this.endTime1HH+this.endTime1mm)) {
                    this.startTime1.HH = event.data.HH
                    this.startTime1HH = event.data.HH

                    this.startTime1.mm = this.startTime1mm
                }else {
                    this.warningMsg = "종료 시간이 시작 시간보다 빠릅니다.<br/> 종료 시간을 확인하세요."
                    this.showModal();
                    this.startTime1.HH = this.startTime1HH;
                    this.forceRefresh()
                    
                }
                
            },

            startTime1mmChange(event) {
                if(parseInt(this.startTime1.HH +event.data.mm ) < parseInt(this.endTime1HH+this.endTime1mm)) {
                    this.startTime1.mm = event.data.mm
                    this.startTime1mm = event.data.mm
                    
                    this.startTime1.HH = this.startTime1HH
                }else {
                    this.warningMsg = "종료 시간이 시작 시간보다 빠릅니다.<br/> 종료 시간을 확인하세요."
                    this.showModal();
                    this.startTime1.mm = this.startTime1mm;
                    this.forceRefresh()
                }
                
            },

            endTime1HHChange(event) {
                if(parseInt(this.startTime1.HH + this.startTime1.mm ) < parseInt(event.data.HH + this.endTime1mm)) {
                    this.endTime1.HH = event.data.HH
                    this.endTime1HH = event.data.HH

                    this.endTime1.mm = this.endTime1mm
                    
                }else {
                    this.warningMsg = "종료 시간이 시작 시간보다 빠릅니다.<br/> 종료 시간을 확인하세요."
                    this.showModal();
                    this.endTime1.HH = this.endTime1HH;
                    this.forceRefresh()
                }
                
            },

            endTime1mmChange(event) {
                if(parseInt(this.startTime1.HH + this.startTime1.mm ) < parseInt(this.endTime1.HH + event.data.mm)) {
                    this.endTime1.mm = event.data.mm
                    this.endTime1mm = event.data.mm
                    
                    this.endTime1.HH = this.endTime1HH
                }else {
                    this.warningMsg = "종료 시간이 시작 시간보다 빠릅니다.<br/> 종료 시간을 확인하세요."
                    this.showModal();
                    this.endTime1.mm = this.endTime1mm;
                    this.forceRefresh()
                }
                
            },

            startTime2HHChange(event) {
                if(parseInt(event.data.HH + this.startTime2mm) < parseInt(this.endTime2HH+this.endTime2mm)) {
                    if (parseInt(event.data.HH + this.startTime2mm) > parseInt(this.endTime1HH+this.endTime1mm)) {
                        this.startTime2.HH = event.data.HH
                        this.startTime2HH = event.data.HH

                        this.startTime2.mm = this.startTime2mm
                    }else {
                        if (this.primary ==='Y') {
                            this.warningMsg = "2차 시작 시간이 1차 종료 시간보다 빠릅니다.<br/> 회진 시간 변경 후, 회진 알림 발송 부탁 드립니다."
                            this.showModal();
                            this.startTime2.HH = this.startTime2HH;
                            this.forceRefresh()
                        }
                        
                    }
                    
                }else {
                    this.warningMsg = "종료 시간이 시작 시간보다 빠릅니다.<br/> 종료 시간을 확인하세요."
                    this.showModal();
                    this.startTime2.HH = this.startTime2HH;
                    this.forceRefresh()
                    
                }
            },

            startTime2mmChange(event) {
                if(parseInt(this.startTime2.HH +event.data.mm ) < parseInt(this.endTime2HH+this.endTime2mm)) {
                    if (parseInt(this.startTime2.HH +event.data.mm) > parseInt(this.endTime1HH+this.endTime1mm)) {
                        this.startTime2.mm = event.data.mm
                        this.startTime2mm = event.data.mm
                        
                        this.startTime2.HH = this.startTime2HH
                    }else {
                        if(this.primary ==='Y') {
                            this.warningMsg = "2차 시작 시간이 1차 종료 시간보다 빠릅니다. <br/> 회진 시간 변경 후, 회진 알림 발송 부탁 드립니다."
                            this.showModal();
                            this.startTime2.mm = this.startTime2mm;
                            this.forceRefresh()
                        }
                        
                    }
                    
                }else {
                    this.warningMsg = "종료 시간이 시작 시간보다 빠릅니다. <br/> 종료 시간을 확인하세요."
                    this.showModal();
                    this.startTime2.mm = this.startTime2mm;
                    this.forceRefresh()
                }
            },

            endTime2HHChange(event) {
                if(parseInt(this.startTime2.HH + this.startTime2.mm ) < parseInt(event.data.HH + this.endTime2mm)) {
                    this.endTime2.HH = event.data.HH
                    this.endTime2HH = event.data.HH

                    this.endTime2.mm = this.endTime2mm
                    
                }else {
                    this.warningMsg = "종료 시간이 시작 시간보다 빠릅니다.<br/> 종료 시간을 확인하세요."
                    this.showModal();
                    this.endTime2.HH = this.endTime2HH;
                    this.forceRefresh()
                }
            },

            endTime2mmChange(event) {
                if(parseInt(this.startTime2.HH + this.startTime2.mm ) < parseInt(this.endTime2.HH + event.data.mm)) {
                    this.endTime2.mm = event.data.mm
                    this.endTime2mm = event.data.mm
                    
                    this.endTime2.HH = this.endTime2HH
                }else {
                    this.warningMsg = "종료 시간이 시작 시간보다 빠릅니다.<br/> 종료 시간을 확인하세요."
                    this.showModal();
                    this.endTime2.mm = this.endTime2mm;
                    this.forceRefresh()
                }
            },

            handleNetworkError() {
                
                
                this.$store.state.pinauth.backPath = this.$route.path
                this.$store.state.pinauth.backParams = this.$route.query

                this.$router.replace({path: '/error', 
                    query: {
                        message: `페이지를 찾을 수 없습니다`
                    }
                })
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

            // 패턴 입력 화면으로 이동
            goToPattern () {
                
                const now = new Date();
                const time = now.getHours()
                const minute = ("0" + now.getMinutes()).slice(-2)
                
                if (this.primary == 'N') {
                    if (parseInt(this.startTime2.HH +this.startTime2.mm) < parseInt(time.toString() + minute.toString())) {
                        this.modalOk = ''  
                        this.warningMsg = "<b>회진 시작 시간이 경과하였습니다. <br/> 회진 시간 변경 후, 회진 알림 <br/>발송 부탁드립니다. </b> "
                        const myModal = new mdb.Modal(document.getElementById('myModal'), {})
                        myModal.show()
                        return
                    }else {
                        this.$store.state.pinauth.timeData = {
                            startTime1: this.startTime2HH + ':' + this.startTime2mm,
                            endTime1: this.endTime2HH + ':' + this.endTime2mm,
                            startTime2:"",
                            endTime2:"",
                        }
                    }
                    
                }
                else {
                    if (parseInt(this.startTime1.HH +this.startTime1.mm) < parseInt(time.toString() + minute.toString())) {
                        this.modalOk = ''  
                        this.warningMsg = "<b>회진 시작 시간이 경과하였습니다. <br/> 회진 시간 변경 후, 회진 알림 <br/>발송 부탁드립니다. </b> "
                        const myModal = new mdb.Modal(document.getElementById('myModal'), {})
                        myModal.show()
                        return
                    }else {
                        this.$store.state.pinauth.timeData = {
                            startTime1: this.startTime1HH + ':' + this.startTime1mm,
                            endTime1: this.endTime1HH + ':' + this.endTime1mm,
                            startTime2:"",
                            endTime2:"",
                        }

                        if(this.secondary=="Y") {
                            this.$store.state.pinauth.timeData.startTime2 = this.startTime2HH + ':' + this.startTime2mm;
                            this.$store.state.pinauth.timeData.endTime2 = this.endTime2HH + ':' + this.endTime2mm;
                        }
                    }
                    
                }
                // 패턴입력 화면으로 이동
                this.$store.state.pinauth.patternType = 'use'
                this.$store.state.pinauth.patternStep = '1'

                this.$router.replace({path:'/rounding-notice/pattern', query:{}})
                
                
                
            },

            doCancel() {
                // 회진 취소 화면으로 이동
                //this.$router.replace({path: '/cancel', query: {}})

                
                // 패턴입력 화면으로 이동
                this.$store.state.pinauth.patternType = 'cancel'
                this.$store.state.pinauth.patternStep = '1'

                this.$router.replace({path:'/rounding-notice/pattern', query:{}})
                
            },
            
            
        }
    }
    </script>

    <style scoped>
        span {
            font-size: 0.95rem;
        }
        .warning-div {
            color: tomato;
        }

        .checkbox {
            margin-top:3vh;
        }

        .checkbox-lg .form-check-input{
            top: .8rem;
            scale: 1.4;
            margin-right: 0.85rem;
        }

        .checkbox-lg .form-check-label {
            padding-top: 0.8rem;
            margin-left: -0.2rem;
        }


    </style>