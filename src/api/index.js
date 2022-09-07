import request from "@/api/request";

//登录
//post 参数一：账户名 参数二：密码
export const reqLogin = (username,password) =>{
    return request({
        url:'api/login',
        method:'post',
        data:{
            username:username,
            password:password
    }
    })
}
//注册
//post
export const reqRegister = (username,password) =>{
    return request({
        url:'api/register',
        method:'post',
        data:{
            username:username,
            password:password
        }
    })
}
//热门分类接口
// get 无参数
export const reqClassify = () => {
    return request({
        url:'api/classify',
        method:'get'
    })
}
//轮播图
// get 无参数
export const reqCarousel = () => {
    return request({
        url:'api/carousel',
        method:'get'
    })
}
//上周畅销
//get
export  const reqGoods_hot = () => {
    return request({
        url:'api/goods',
        method:'get'
    })
}
//本周折扣
//get
export const reqGoods_vip = ()=>{
    return request({
        url:'api/vip',
        method:'get'
    })
}
//搜索功能
//post 参数一：search_goods
export const reqSearch_goods = (keyword)=>{
    return request({
        url:'api/search',
        method:'post',
        data:{
            search_goods:keyword
        }
    })
}
//商品id查询
//post 参数一：shop_id
export const reqSearch_id = (shop_id)=>{
    return request({
        url:'api/search_id',
        method:'post',
        data:{
            shop_id:shop_id
        }
    })
}
//分类商品
//post 参数一：goods_category
export const reqGoods_category = (keyword)=>{
    return request({
        url:'api/search_classify',
        method:'post',
        data:{
            goods_category:keyword
        }
    })
}
//用户信息
//get
export const reqUserinfo = ()=>{
    return request({
        url:'my/userinfo',
        method:'get'
    })
}
//修改密码
//post 参数一:old_password 参数二:new_password
export const reqRevise_password = (o,n)=>{
    return request({
        url:'my/revise_password',
        method:'post',
        data:{
            old_password:o,
            password:n
        }
    })
}
//充值记录
//get
export const reqSkype = ()=>{
    return request({
        url:'my/skype',
        method:'get'
    })
}
//用户优惠卷
//get
export const reqKfc = ()=>{
    return request({
        url:'my/kfc_receive',
        method:'get'
    })
}
//购物车商品
//get
export const reqCart_list = () =>{
    return request({
        url:'my/cart_list',
        method:'get'
    })
}
//购物车添加
//post 参数一：tag
export const reqAdd_cart =(tag)=>{
    return request({
        url:'my/add_cart',
        method:'post',
        data:{
            tag:tag
        }
    })
}
//购物车删除
//post 参数一：tag
export const reqDel_cart =(tag)=>{
    return request({
        url:'my/del_cart',
        method:'post',
        data:{
            tag:tag
        }
    })
}
//查询订单
//get 无参数
export const reqSearch_order =(order)=>{
    return request({
        url:'pay/search_order',
        method:'get'
    })
}
//生成订单
//post 参数一:订单id
export const reqDel_order = (id) =>{
    return request({
        url:'pay/del_order',
        method:'post',
        data:{
            id:id
        }
    })
}
//生成未支付订单
//post 参数一：blurb 参数二：money 参数三：time
export const reqPay_no_order =(order)=>{
    return request({
        url:'pay/add_order',
        method:'post',
        data:{
            blurb:order.blurb,
            money:order.money,
            time:order.time
        }
    })
}
//支付订单
export const reqPay_order = (order) =>{
    return request({
        url:'pay/pay_order',
        method:'post',
        data:{
            id:order.id,
            balance:order.balance,
            courier:order.courier,
            site:order.site,
            note:order.note,
            name:order.name,
            tel:order.tel,
            coupon:order.coupon,
            create_time:order.create_time
        }
    })
}