import Vue from "vue";
import Vuex from "vuex"
import {reqClassify,reqCarousel,reqAdd_cart,reqDel_cart,reqCart_list} from "@/api";

Vue.use(Vuex)

const actions = {
    //分类获取
    async all_Classify({commit}) {
        const result = await reqClassify();
        if (result.status === 200) {
            commit("all_classify",result.data.data)
        }
    },
//    轮播图获取
    async all_Carousel({commit}) {
        const result = await reqCarousel();
        if(result.status === 200) {
            commit("all_carousel",result.data.data)
        }
    },
//    购物车获取
    async all_Cart_list({commit}) {
        const result = await reqCart_list();
        if(result.status ===200){
            if(result.data.status===0){
                commit("all_cart_list",result.data.data)
            }
        }
    },
//    增加删减操作
    async add_Cart({state},tag) {
        await reqAdd_cart(tag);
        await state.cart_list.forEach(item=>{
            if(item.id==tag) return item.num+=1
        })
    },
    async del_Cart({dispatch},tag) {
        const result = await reqDel_cart(tag);
        await state.cart_list.forEach(item=>{
            if(item.id==tag) return item.num-=1
        })
    }
}

const mutations = {
    //分类获取
    all_classify(state,classify) {
        state.classify = classify
    },
//    轮播图获取
    all_carousel(state,carousel) {
        state.carousel = carousel
    },
//    购物车获取
    all_cart_list(state,cart_list) {
        state.cart_list = cart_list
    }
}

const state = {
    //分类数据
    classify:[],
    //轮播图数据
    carousel:[],
    // search_list:[],
    //购物车数据
    cart_list:[]
}

const store = new Vuex.Store({
    state,
    actions,
    mutations
})

export default store