import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Layout',
    redirect:'/home',
    component: ()=>import('../components/layout'),
    children:[{
      path:'home',
      name:'Home',
      component:()=>import('@/views/Home'),
      meta: {title:'首页',icon:'el-icon-menu'}
    }]
    
  },  
  {
    path:'/users',
    name:'Users',
    component: ()=>import('../components/layout'),
    redirect:'/users/admin',
    meta: {title:'用户管理',icon:'el-icon-menu'},
    children:[
      {
        path:'admin',
        name:'Admin',
        component: ()=>import('@/views/users/admin'),
        meta: {title:'用户管理',icon:'el-icon-menu'},
      }
    ]
  },
  {
    path:'/product',
    name:'Product',
    redirect:'/product/attr',
    component: ()=>import('../components/layout'),
    meta: {title:'商品管理',icon:'el-icon-menu'},
    children:[
      {
        path:'attr',
        name:'Attr',
        component:()=>import('@/views/product/attr'),
        meta: {title:'品牌管理',icon:'el-icon-menu'}
      },
      {
        path:'trademark',
        name:'Trademark',
        component:()=>import('@/views/product/tradeMark'),
        meta: {title:'平台属性管理',icon:'el-icon-menu'}
      },
      {
        path:'spu',
        name:'Spu',
        component:()=>import('@/views/product/spu'),
        meta: {title:'Spu管理',icon:'el-icon-menu'}
      },
      {
        path:'sku',
        name:'Sku',
        component:()=>import('@/views/product/sku'),
        meta: {title:'Sku管理',icon:'el-icon-menu'}
      }
    ]
  }

]
//重写push和replace方法(解决多次执行相同的push问题)
//先把VueRouter原型对象的push保存一份
let orginPush = VueRouter.prototype.push;
let orginReplace = VueRouter.prototype.replace;
//第一个参数：告诉原来push方法，你往哪里跳转（传递哪些参数）
VueRouter.prototype.push = function(location, resolve, reject){
    if(resolve && reject) {
        orginPush.call(this, location, resolve, reject)
    }else{
        orginPush.call(this, location, ()=>{ }, ()=>{ })
    }
    
}
VueRouter.prototype.replace = function(location, resolve, reject){
    if(resolve && reject) {
        orginReplace.call(this, location, resolve, reject)
    }else{
        orginReplace.call(this, location, ()=>{ }, ()=>{ })
    }
    

}


const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
