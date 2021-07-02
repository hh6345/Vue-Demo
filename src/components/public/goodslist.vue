<template >
<div class="goodslist"  v-infinite-scroll="load"
      infinite-scroll-disabled="disabled">
    <div class="goods" v-for="item in goodslist" :key="item.id" @click="goDetail(item.id)">
        <img :src="require(`../../assets/huawei/${item.id}.jpeg`)" alt="">
        <div class="explain">
        <p>{{ item.name }}</p>
        <p>本店收藏第{{ item.id }}名</p>
        <p><span>￥</span>{{ item.price }}&nbsp;<span>很多人付款</span></p>
        <span class="free" v-if="item.free">&nbsp;3期免息&nbsp;</span>
        </div>      
    </div>
    <div class="loading">
    <p v-if="loading">加载中...</p>
    <p v-if="nomore">没有更多了~</p>
    </div>
</div>

</template>
<script>

export default {
    data() {
        return {
            sliceStart: 0,
            sliceEnd: 10,
            goodsdata: [],
            goodslist: [],
            loading: false,
            nomore: false
        }
    },
    computed: {
      disabled () {
        return this.loading || this.nomore
      }
    },
    methods: {
        getData() {
            const datas = this.goodsdata.slice(this.sliceStart,this.sliceEnd)
            this.goodslist=this.goodslist.concat(datas)
            if(datas.length !== 10) { this.nomore=true }     
        },
        load() {
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
        this.$router.push({ name: "GoodsInfo", params: { id } });

        }
            
    },
    watch: {
            goodsresult: function(newVal,oldVal){
                this.goodsdata = newVal;
                this.goodslist.length = 0
                this.sliceStart = 0;
                this.sliceEnd = 10;
                this.loading = false
                this.nomore= false
                newVal && this.getData(); 
            }
        },
    props: ["goodsresult"]
}

</script>
<style lang="less" scoped>
.goodslist {
    // overflow:auto;

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