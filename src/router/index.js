import Vue from 'vue'
import Router from 'vue-router'
import Home from '../components/home/home.vue'
import Member from '../components/member .vue'
import ShopCart from '../components/shopcart.vue'
import Search from '../components/search.vue'
import News from '../components/home/news.vue'
import ImgShare from '../components/home/imgshare.vue'
import Goods from '../components/home/goods.vue'
import GoodsInfo from '../components/public/goodsinfo.vue'

Vue.use(Router)

export default new Router({
  routes: [
    { path: '/', redirect: '/home' },
    { path: '/home', name: 'Home', component: Home },
    { path: '/member', name: 'Member', component: Member },
    { path: '/shopcart', name: 'ShopCart', component: ShopCart },
    { path: '/search', name: 'Search', component: Search },
    { path: '/news', name: 'News', component: News },
    { path: '/imgshare', name: 'ImgShare', component: ImgShare },
    { path: '/goods', name: 'Goods', component: Goods },
    { path: '/goods/goodsinfo/:id', name: 'GoodsInfo', component: GoodsInfo }
  ],
  linkActiveClass: 'mui-active' // 覆盖默认的路由高亮的类，默认的类叫做 router-link-active
})
