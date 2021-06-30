<template>
<div class="home">

    <mt-swipe :auto="4000">
        <mt-swipe-item v-for="item in lunbotuList" :key="item.url"><img :src="item.url" alt=""></mt-swipe-item>        
    </mt-swipe>

    <ul class="mui-table-view mui-grid-view mui-grid-9">
		            <li class="mui-table-view-cell mui-media mui-col-xs-4"><router-link to="/news">
                            <img src="../../assets/images/menu1.png" />
		                    <div class="mui-media-body">新闻资讯</div></router-link></li>
		            <li class="mui-table-view-cell mui-media mui-col-xs-4"><router-link to="/news">
		                    <img src="../../assets/images/menu2.png" />
		                    <div class="mui-media-body">图片分享</div></router-link></li>
		            <li class="mui-table-view-cell mui-media mui-col-xs-4"><router-link to="/goods">
		                    <img src="../../assets/images/menu3.png" />
		                    <div class="mui-media-body">商品购买</div></router-link></li>
		            <li class="mui-table-view-cell mui-media mui-col-xs-4"><router-link to="/news">
		                    <img src="../../assets/images/menu4.png" />
		                    <div class="mui-media-body">留言反馈</div></router-link></li>
		            <li class="mui-table-view-cell mui-media mui-col-xs-4"><router-link to="/news">
		                    <img src="../../assets/images/menu5.png" />
		                    <div class="mui-media-body">视频专区</div></router-link></li>
		            <li class="mui-table-view-cell mui-media mui-col-xs-4"><router-link to="/imgshare">
		                    <img src="../../assets/images/menu6.png" />
		                    <div class="mui-media-body">联系我们</div></router-link></li>
		            
		        </ul> 

    <!-- <button @click='getLunbotu'>获取轮播图</button> -->
</div>
</template>

<script>
export default {

    data() {
        return {
            lunbotuList: [],
            popupVisible: false
        }
    },
    created() {
    this.getLunbotu();
    },
    methods: {
        getLunbotu(){
            for (let i=0; i<3; i++) {
                this.$axios({
                method: 'post',
                url: '/api/FjImg',
                data: {
                    format : 'json',
                }}).then((res) => {
                // 状态码 200 表示请求成功
                if(res.data.code == 200){
                     // console.log('ok')
                     this.lunbotuList.push(res.data.data)
                }else{
                        console.log(res.data)
                        }}).catch( (error) => {
                        console.log(error);
                 });
           }
        },
        clearLocalStorage() {
            // window.localStorage.removeItem('messageStore')
            this.popupVisible = true
        }
    }

}

</script>

<style lang="less" scoped>
.mint-swipe {
    height: 200px;
    img {
        height: 100%;
    }
}

.mui-grid-view {
    background-color: #fff;
    img {
        height: 60px;
        width: 60px;
    }
    .mui-media-body {
        font-size: 13px;
    }
}


</style>