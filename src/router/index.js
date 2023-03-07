import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes = [
  
  // 회진 알림 화면
  {
    path: '/rounding-notice/',
    name: 'modify',
    component: () => import('../views/ModifyView.vue')
  },

  // 홈 화면
  {
    path: '/rounding-notice/home',
    name: 'home',
    component: HomeView
  },

  // 예정대로 회진 화면
  {
    path: '/rounding-notice/confirm',
    name: 'confirm',
    component: () => import('../views/ConfirmView.vue')
  },

  // 회진 취소 화면
  {
    path: '/rounding-notice/cancel',
    name: 'cancel',
    component: () => import('../views/CancelView.vue')
  },

  // 패턴 화면
  {
    path: '/rounding-notice/pattern',
    name: 'pattern',
    component: () => import('../views/PatternView.vue')
  },

  // 패턴 등록 화면
  {
    path: '/rounding-notice/patternregister',
    name: 'patternregister',
    component: () => import('../views/PatternRegisterView.vue')
  },

  // 진행중 화면
  {
    path: '/rounding-notice/progress',
    name: 'progress',
    component: () => import('../views/ProgressView.vue')
  },

  // 빈 화면
  {
    path: '/rounding-notice/blank',
    name: 'blank',
    component: () => import('../views/BlankView.vue')
  },

  // 미허가 화면
  {
    path: '/rounding-notice/unauthorized',
    name: 'unauthorized',
    component: () => import('../views/UnauthorizedView.vue')
  },

  // 로그인 화면
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/LoginView.vue')
  },
 
  // 에러 화면
  {
    path: '/404',
    component: () => import('../views/ErrorView.vue')
  },
  {
    path: '/rounding-notice/lockPattern',
    component: () => import('../views/LockView.vue')
  },
  // {
  //   path: '/:pathMatch(.*)*',
  //   redirect: '/404'
  // }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
