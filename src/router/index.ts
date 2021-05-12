import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Layout from '@/layout/Layout.vue'
import store from '@/store'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: 'login' */'@/views/login/index.vue')
  },
  {
    path: '/',
    component: Layout,
    meta: { requiresAuth: true, title: '首页' }, // 限制父路由和子路由都需要验证才能访问
    children: [
      {
        path: '',
        name: 'home',
        component: () => import(/* webpackChunkName: 'home' */'@/views/home/index.vue')
      },
      {
        path: '/menu',
        name: 'menu',
        component: () => import(/* webpackChunkName: 'menu' */'@/views/menu/index.vue'),
        meta: {
          title: '菜单列表'
        }
      }, {
        path: '/menu/create',
        name: 'menu-create',
        component: () => import(/* webpackChunkName: 'menu-create-edit' */'@/views/menu/components/createOrEdit.vue')
      }, {
        path: '/menu/edit/:id',
        name: 'menu-edit',
        component: () => import(/* webpackChunkName: 'menu-create-edit' */'@/views/menu/components/createOrEdit.vue')
      },
      {
        path: '/role',
        name: 'role',
        component: () => import(/* webpackChunkName: 'role' */'@/views/role/index.vue'),
        meta: {
          title: '角色列表'
        }
      }, {
        path: '/role/alloc-menu/:roleId',
        name: 'alloc-menu',
        component: () => import(/* webpackChunkName: 'alloc-menu' */'@/views/role/alloc-menu.vue'),
        props: true
      }, {
        path: '/role/alloc-resource/:roleId',
        name: 'alloc-resource',
        component: () => import(/* webpackChunkName: 'alloc-resource' */'@/views/role/alloc-resource.vue'),
        props: true
      },
      {
        path: '/user',
        name: 'user',
        component: () => import(/* webpackChunkName: 'user' */'@/views/user/index.vue'),
        meta: {
          title: '用户管理'
        }
      },
      {
        path: '/resource',
        name: 'resource',
        component: () => import(/* webpackChunkName: 'resource' */'@/views/resource/index.vue'),
        meta: {
          title: '资源列表'
        }
      },
      {
        path: '/resourceCategory',
        name: 'resourceCategory',
        component: () => import(/* webpackChunkName: 'resourceCategory' */'@/views/resource/components/resourceCategory.vue'),
        meta: {
          title: '资源分类'
        }
      },
      {
        path: '/course',
        name: 'course',
        component: () => import(/* webpackChunkName: 'course' */'@/views/course/index.vue'),
        meta: {
          title: '课程管理'
        }
      }, {
        path: '/createCourse',
        name: 'createCourse',
        component: () => import(/* webpackChunkName: 'createCourse' */'@/views/course/createCourse.vue'),
        meta: {
          title: '课程管理'
        }
      }, {
        path: '/editCourse/:courseId',
        name: 'editCourse',
        component: () => import(/* webpackChunkName: 'editCourse' */'@/views/course/editCourse.vue'),
        props: true
      }, {
        path: '/editSection/:courseId',
        name: 'editSection',
        component: () => import(/* webpackChunkName: 'editSection' */'@/views/course/editSection.vue'),
        props: true
      }, {
        path: '/editSection/:courseId/addVideo',
        name: 'addVideo',
        component: () => import(/* webpackChunkName: 'addVideo' */'@/views/course/addVideo.vue'),
        props: true
      },
      {
        path: '/advert',
        name: 'advert',
        component: () => import(/* webpackChunkName: 'advert' */'@/views/advert/index.vue'),
        meta: {
          title: '广告列表'
        }
      }, {
        path: '/advert/create',
        name: 'createAdvert',
        component: () => import(/* webpackChunkName: 'advert-create-edit' */'@/views/advert/components/createOrUpdate.vue')
      }, {
        path: '/advert/:advertId',
        name: 'editAdvert',
        component: () => import(/* webpackChunkName: 'advert-create-edit' */'@/views/advert/components/createOrUpdate.vue'),
        props: true
      },
      {
        path: '/advert-space',
        name: 'advert-space',
        component: () => import(/* webpackChunkName: 'advert-space' */'@/views/advert-space/index.vue'),
        meta: {
          title: '广告位列表'
        }
      }
    ]
  },
  {
    path: '*',
    name: '404',
    component: () => import(/* webpackChunkName: '404' */'@/views/error-page/404.vue')
  }
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    if (!store.state.user) {
      next({
        name: 'login',
        query: { redirect: to.fullPath }
      })
    } else {
      next()
    }
  } else {
    next() // 确保一定要调用 next()
  }
})

export default router
