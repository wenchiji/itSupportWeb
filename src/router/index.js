import Vue from 'vue'
import VueRouter from 'vue-router'
import ItOrder from '../views/ItOrder.vue'
import User from '../views/User'
import Index from '../views/Index'
import Login from '../views/Login'
import App from '../App'
import Record from "../views/Record";
import QuestionType from "../views/QuestionType";
import Statistics from "../views/Statistics";
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: "/ItOrder",
  },
  {
    path: '/login',
    name: 'login',
    component: Login,
  },
  {
    path: '/page',
    name: '工单管理',
    component: Index,
    show: true,
    children:[
      {
        path: '/ItOrder',
        name: '工单列表',
        component: ItOrder
      },
      {
        path: '/listAllItOrder',
        name: '历史工单',
        component: Record
      },
      {
        path: '/statistics',
        name: '数据统计',
        component: Statistics
      }
    ]
  },
  {
    path: '/page1',
    name: '设置',
    component: Index,
    show:true,
    children:[
      {
        path: '/editQType',
        name: '问题类型编辑',
        component: QuestionType
      },
      {
        path: '/listUser',
        name: '用户列表',
        component: User
      }
    ]
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

// 使用 router.beforeEach 注册一个全局前置守卫，判断用户是否登陆
router.beforeEach((to, from, next) => {
  if (to.path === '/login') {
    next();
  } else {
    let token = localStorage.getItem('eleToken');
    if (token === null || token === '') {
      // next('/login');
      next();
    } else {
      next();
    }
  }
});

