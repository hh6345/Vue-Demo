<template >
<div class="goodslist"  v-infinite-scroll="load"
      infinite-scroll-disabled="disabled">
    <div class="goods" v-for="item in goodslist" :key="item.id" @click="goDetail(item.id)">
        <!-- <img :src="require(`${item.src}`)" alt=""> -->
        <img :src="require(`../../assets/huawei/${item.id}.jpeg`)" alt="">
        <div class="explain">
        <p>{{ item.name }}</p>
        <p>本店收藏第{{ item.id }}名</p>
        <p><span>￥</span>{{ item.price }}&nbsp;<span>很多人付款</span></p>
        <span class="free" v-if="item.free">&nbsp;3期免息&nbsp;</span>
        </div>      
    </div>
    
    <!-- <mt-button type="primary" size="large" @click="test">测试用</mt-button> -->
    <p v-if="loading">加载中...</p>
    <p class="loading" v-if="nomore">没有更多了~</p>
</div>

</template>
<script>

export default {
    data() {
        return {
            sliceStart: 0,
            sliceEnd: 10,
            goodslist: [],
            count: 10,
            loading: false,
            nomore: false
        }
    },
    created() {
        this.getData()
    },
    computed: {
      disabled () {
        return this.loading || this.nomore
      }
    },
    methods: {
        getData() {
            const goodsdata=require('../../assets/goodsdata.json').data.slice(this.sliceStart,this.sliceEnd)
            this.goodslist=this.goodslist.concat(goodsdata)
            if(goodsdata.length !== 10) { this.nomore=true }
            
            //console.log(this.goodslist)
        },
        load () {
        this.loading = true
        //模拟请求数据加载效果
        setTimeout(() => {
          this.sliceStart += 10
          this.sliceEnd += 10
          this.getData()
          this.loading = false
        }, 3000)
        },
        goDetail(id) {
            this.$store.commit('nowParams', id)
      // 使用JS的形式进行路由导航

      // 注意： 一定要区分 this.$route 和 this.$router 这两个对象，
      // 其中： this.$route 是路由【参数对象】，所有路由中的参数， params, query 都属于它
      // 其中： this.$router 是一个路由【导航对象】，用它 可以方便的 使用 JS 代码，实现路由的 前进、后退、 跳转到新的 URL 地址

      //console.log(this);
      // 1. 最简单的
      // this.$router.push("/home/goodsinfo/" + id);
      // 2. 传递对象
      // this.$router.push({ path: "/home/goodsinfo/" + id });
      // 3. 传递命名的路由
        //this.$router.push({ name: "GoodsInfo", params: { id } });
        this.$router.push({ name: "GoodsInfo", params: { id } });
        }
            
    }
}

</script>
<style lang="less" scoped>
.goodslist {
    overflow:auto;

    display: flex;
    flex-wrap: wrap;
    padding: 7px;
    justify-content: space-between;
// column-count: 2;
// column-gap: 10px;

    .goods{  
        // height: 100%;

        width: 49%;
        background-color: white;
        margin-bottom: 10px;
        border-radius: 7px;
        overflow: hidden;
        img {
            width: 100%;
            
        }
        .explain {
            padding: 10px;
        p {
            overflow: hidden;
            white-space: nowrap; //强制不换行
	        text-overflow:ellipsis;	
            &:first-child {
                color: black;
                font-size: 16px;
            }
            &:nth-child(2) {
                color:#b99561;
                font-size: 14px;
                line-height: 16px;
            }
            &:nth-child(3) {
                font-size: 20px;
                color: red;
                margin-bottom: 0;
            span{
                font-size: 14px;
                &:last-child {
                    color: #9e9a9a;
                }
            }
            }
        }
        
        .free {
            border: solid 1px red;
            border-radius: 5px;
            color: red;
            font-size: 10px;
        }
        }
        
    }
    .loading{
        width: 49%;
        height: 200px;
        text-align: center;
        line-height: 200px;
    }
}

</style>