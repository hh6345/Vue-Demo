// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import axios from 'axios'
Vue.prototype.$axios=axios;

import App from './App'
import router from './router'

import { Button,Cell,Swipe,SwipeItem,Header,Checklist,Search } from 'mint-ui'
Vue.component(Button.name, Button)
Vue.component(Cell.name, Cell)
Vue.component(Swipe.name, Swipe);
Vue.component(SwipeItem.name, SwipeItem);
Vue.component(Header.name, Header);
Vue.component(Checklist.name, Checklist);
Vue.component(Search.name, Search);


import { InfiniteScroll } from 'element-ui';
// Vue.component(InfiniteScroll.name, InfiniteScroll );
Vue.use(InfiniteScroll)


Vue.config.productionTip = false

import './assets/mui/css/mui.min.css'
import './assets/mui/css/icons-extra.css'


/* eslint-disable no-new */
Vue.filter('dataFormat', function (originVal) {
  const dt = new Date(originVal)

  const y = dt.getFullYear()
  const m = (dt.getMonth() + 1 + '').padStart(2, '0')
  const d = (dt.getDate() + '').padStart(2, '0')

  const hh = (dt.getHours() + '').padStart(2, '0')
  const mm = (dt.getMinutes() + '').padStart(2, '0')
  const ss = (dt.getSeconds() + '').padStart(2, '0')
  // yyyy-mm-dd hh:mm:ss
  return `${y}-${m}-${d} ${hh}:${mm}:${ss}`
})

import Vuex from 'vuex'
Vue.use(Vuex)

const store = new Vuex.Store ({
  state: {
    nowParams: '',
    car: []
  },
  mutations: {
    nowParams(state, id) {
      state.nowParams= id
    },
    addShopCar(state, goodsinfo) {
      var flag = false
      state.car.some((item) => {
        if(item.id === goodsinfo.id){
          //增加原购物车商品数量
          item.count += parseInt(goodsinfo.count)
          flag = true
          return true
        }
      })

      if(!flag) {
        state.car.push(goodsinfo)
      }
    },
    updateGoodsSelected(state, id) {
      state.car.some(item => {
        if (item.id == id) {
          item.select = !item.select
          return true
        }
      })
    },
    updateShopCar(state, goodsinfo) {
      state.car.some((item) => {
        if(item.id === goodsinfo.id){
          //增加原购物车商品数量
          item.count = parseInt(goodsinfo.count)
          return true
        }
      })
    },
    checkAll(state,check){
      state.car.forEach(item => {
        item.select =check
      })
    },
    removeCar(state,id){
      
      state.car.some((item,i) => {
        if(item.id === id) {
          state.car.splice(i,1)
          return true
        }
      })
    }
  },
  getters: {
    getAllCount(state) {
      var c = 0
      state.car.forEach(item => c += parseInt(item.count) )
      return c
    },
    getAmount(state) {
      var c = 0
      state.car.forEach(item => {
        if(item.select){
          c +=item.count*item.price
        }

      })
      return c
    },
    getCheckAll(state) {
      var c = 1
      state.car.some(item => {
        if(!item.select)
        c=0
        return
      })
      return c
    }

  }

})

new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
