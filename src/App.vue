<template>
  <div id="app">

    <mt-header fixed title="vue-cli实例">
      <mt-button icon="back" slot="left" @click="goBack" v-show="flag">返回</mt-button>
    </mt-header>


    <router-view class="content">
		
	</router-view>

    <nav class="mui-bar mui-bar-tab">
			<router-link class="mui-tab-item1" to="/home">
				<span class="mui-icon mui-icon-home"></span>
				<span class="mui-tab-label">首页</span>
			</router-link>
			<router-link class="mui-tab-item1" to="/search">
				<span class="mui-icon mui-icon-search"></span>
				<span class="mui-tab-label">搜索</span>
			</router-link>
			<router-link class="mui-tab-item1" to="/shopcart">
				<span class="mui-icon mui-icon-extra mui-icon-extra-cart"><span class="mui-badge" id="badge">{{ this.$store.getters.getAllCount }}</span></span>
				<span class="mui-tab-label">购物车</span>
			</router-link>
			<router-link class="mui-tab-item1" to="/member">
				<span class="mui-icon mui-icon-contact"></span>
				<span class="mui-tab-label">会员</span>
			</router-link>
		</nav>
  </div>
</template>

<script>
export default {
	data() {
		return {
			flag: false
		}
	},
	created() {
		//在页面刷新时将vuex里的信息保存到localStorage里
window.addEventListener("beforeunload",()=>{
  localStorage.setItem("messageStore",JSON.stringify(this.$store.state))
})
 
//在页面加载时读取localStorage里的状态信息
localStorage.getItem("messageStore") && this.$store.replaceState(Object.assign(this.$store.state,JSON.parse(localStorage.getItem("messageStore"))));

		this.flag = this.$route.path === '/' ? false : true
	},
	methods: {
		goBack() {
			this.$router.go(-1)
		}
	},
	watch: {
		'$route.path': function(newval) {
			if(newval === '/home') {
				this.flag = false
			}else {
				this.flag = true
			}
		}
	}

}

</script>

<style lang="less" scoped>

.content {
	 margin: 40px 0 50px;

 }
 
// 该类名，解决 tabbar 点击无法切换的问题
.mui-bar-tab .mui-tab-item1.mui-active {
  color: #007aff;
}

.mui-bar-tab .mui-tab-item1 {
  display: table-cell;
  overflow: hidden;
  width: 1%;
  height: 50px;
  text-align: center;
  vertical-align: middle;
  white-space: nowrap;
  text-overflow: ellipsis;
  color: #929292;
}

.mui-bar-tab .mui-tab-item1 .mui-icon {
  top: 3px;
  width: 24px;
  height: 24px;
  padding-top: 0;
  padding-bottom: 0;
}

.mui-bar-tab .mui-tab-item1 .mui-icon ~ .mui-tab-label {
  font-size: 11px;
  display: block;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
