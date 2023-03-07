<template>
  <router-view/>
</template>

<script>
export default {
    data() {
        return {
             
        }
    },
    methods: {
         
    },
    mounted() {
         
    }
}
</script>
 
<style>

  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;

    /* 화면 크기와 배경이미지 설정 */
    width: 100vw;
    height: 100%;   /* 모바일 단말의 브라우저에서는 높이 값이 % 단위이어야 함. vh이면 영역을 넘어감. */
    background: url(./assets/smc-bg1.png) no-repeat center center fixed;
    background-size: cover;

  }

  /* 각 화면의 전체 크기를 100%로 설정 */
  .home {
     height: 100%;
     
  }
  .home2 {
	text-align: center;
  }
  @media (min-width: 768px) {
	.row-cols-md-3 {
		flex: 0 0 auto;
		width:100% !important;
	}
  }

</style>
