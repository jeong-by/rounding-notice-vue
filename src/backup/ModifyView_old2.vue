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
	import axios from 'axios';
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

            handleNetworkError(err) {
                console.error(err)
                
                this.$store.state.pinauth.backPath = this.$route.path
                this.$store.state.pinauth.backParams = this.$route.query

                this.$router.replace({path: '/error', 
                    query: {
                        message: `네트워크 요청 중 에러 : ${err}`
                    }
                })
            },

            // 세션 체크
            checkSession() {
                if (typeof(this.$store.state.pinauth.session) == 'undefined' || this.$store.state.pinauth.session.valid != 'Y') {
                    this.$router.replace({path: '/unauthorized', query: {}})

                    return false
                } else {
                    return true
                }
            },

            // 패턴 입력 화면으로 이동
            doCancel() {
                // 회진 취소 화면으로 이동
                //this.$router.replace({path: '/cancel', query: {}})

                
                // 패턴입력 화면으로 이동
                this.$store.state.pinauth.patternType = 'cancel'
                this.$store.state.pinauth.patternStep = '1'

                this.$router.replace({path:'/pattern', query:{}})
                
            },
		async goToPattern() {
			let response = await axios({
				method:'post',
				url:'http://211.45.4.14:40003/rounding-notice/v1/session-valid',
				data:{requestCode:1001,sessionId:this.$route.query.session},
				responseType:'json',
				header:{}
			})
			console.log(response);
			console.log("hohoho");
		}
            
            
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