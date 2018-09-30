import Vue from 'vue'
import Router from 'vue-router'
import { isURL } from '@/utils/validate'
import HelloWorld from '@/components/HelloWorld'
import {clearLoginInfo} from '@/utils'

Vue.use(Router)

// 开发环境不使用懒加载, 因为懒加载页面太多的话会造成webpack热更新太慢, 所以只有生产环境使用懒加载
const _import = require('./import-' + process.env.NODE_ENV)

// 全局路由(无需嵌套上左右整体布局)
const globalRoutes = [
  { path: '/404', component: _import('common/404'), name: '404', meta: { title: '404未找到' } },
  { path: '/login', component: _import('common/login'), name: 'login', meta: { title: '登录' } }
]

// 主入口路由（需嵌套上左右整体布局）
const mainRoutes = {
  path: '/',
  components: _import('main'),
  name: 'main',
  redirect: { name: 'home' },
  meta: { title: '主入口整体布局' },
  children: [
    // 通过meta对象设置路由展示方式
    // 1. isTab: 是否通过tab展示内容, true: 是, false: 否
    // 2. iframeUrl: 是否通过iframe嵌套展示内容, '以http[s]://开头': 是, '': 否
    // 提示: 如需要通过iframe嵌套展示内容, 但不通过tab打开, 请自行创建组件使用iframe处理!
    { path: '/home', component: _import('common/home'), name: 'home', meta: { title: '首页' } },
    { path: '/theme', component: _import('common/theme'), name: 'theme', meta: { title: '主题' } }
  ],
  beforeEnter (to, from, next) {
    let token = Vue.cookie.get('token')
    if (!token || /\S/.test(token)) { // 正则：非空白就匹配
      clearLoginInfo()
      next({ name: 'login' })
    }
    next()
  }
}
export default new Router({
  mode: 'hash',
  scrollBehavior: () => ({ y: 0 }), // 每次访问滚动条都置0
  routes: globalRoutes.concat(mainRoutes)
})

/**
 * 判断当前路由类型： global：全局路由，main：主入口路由
 * @param route
 */
function fnCurrentRouteType (route) {
  for (var i = 0)
}
