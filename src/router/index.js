import Vue from "vue";
import VueRouter from "vue-router";
//引入路由页面
import Home from "@/pages/Home";
import Cart from "@/pages/Cart"
import Details from "@/pages/Details"
import Login from "@/pages/Login"
import Search from "@/pages/Search"
import Category from "@/pages/Category"
import Order from "@/pages/Order"
import Activity from "@/pages/Activity"
import Member from "@/pages/Member"
import {reqUserinfo} from "@/api";

const originalPush = VueRouter.prototype.push

VueRouter.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
}


Vue.use(VueRouter)

const router = new VueRouter({
    //    路由信息
    routes:[
        //重定向
        {
            path:'*',
            component:Home,
            meta:{
                isShow:true
            }
        },
        //首页
        {
            name:'home',
            path:'/home',
            component:Home,
            meta:{
                isShow:true
            }
        },
        //登录
        {
            name:'login',
            path:'/Login',
            component:Login
        },
        //购物车
        {
            name:'cart',
            path:'/Cart',
            component:Cart,
            meta:{
                isShow:true
            },
            beforeEnter:(to,from,next)=>{
                reqUserinfo().then(res=>{
                    if(res.data.status === 0) return next()
                    next('login')
                })
            }
        },
        //商品详情
        {
            name:'details',
            path:'/Details',
            component:Details,
            props({params}){
                return {id:params.id}
            },
            meta:{
                isShow:true
            }
        },
        //搜索结果页
        {
            name:'search',
            path:'/Search/:keyword',
            component:Search,
            props({params:{keyword}}){
                return {keyword}
            }
        },
        //分类商品
        {
            name:'category',
            path:'/Category/:keyword',
            component:Category,
            props({params:{keyword}}){
                return {keyword}
            },
            meta:{
                isShow:true
            }
        },
        //会员优选
        {
            name:'member',
            path:'/member',
            component:Member,
        beforeEnter:(to,from,next)=>{
    reqUserinfo().then(res=>{
        if(res.data.status === 0) return next()
        next('login')
    })
}
        },
        //订单确认界面
        {
            name:'order',
            path:'/Order',
            component:Order,
            props({params}){
                return {total_price:params.total_price,ready:params.ready,id:params.id}
            },
        },
        //活动页面
        {
            name:'activity',
            path:'/activity',
            component:Activity,
            meta:{
                isShow:true
            }
        },
    ],
    //跳转页面时处于顶部位置
    scrollBehavior (to, from, savedPosition) {       //添加该方法
        return { x: 0, y: 0}
    }
})

export default router