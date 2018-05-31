import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
import LoginView from '@/components/LoginView'
import a from '@/components/a'
import avatar from '@/components/avatar'

Vue.use(Router)

// export default new Router({
//   routes: [
//     {
//       path: '/',
//       redirect: '/login'
//     },
//     {
//       path: '/login',
//       name: 'LoginView',
//       component: LoginView
//     },
//     {
//       path: '/a',
//       name: 'a',
//       component: a
//     },
//     {
//       path: '/avatar',
//       name: 'avatar',
//       component: avatar
//     }
//   ]
// })
var routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    name: 'LoginView',
    component: LoginView
  },
  {
    path: '/a',
    name: 'a',
    component: a
  },
  {
    path: '/avatar',
    name: 'avatar',
    component: avatar
  }
]
const router = new Router({routes})
router.beforeEach((to, from, next) => {
  // console.log(to)
  if (!localStorage.getItem('account')) {
    if (to.name !== 'LoginView') router.push('login')
  }
  next()
})
router.afterEach((to) => {
  console.log(to)
  if (!localStorage.getItem('account')) {
    if (to.name !== 'LoginView') router.push('login')
  }
})
export default router
