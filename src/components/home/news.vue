<template >
    <div class="news">
        <img :src="imgurl" alt="">
        <mt-button type="primary" size="large" @click="getDmImgs">刷新图片</mt-button>
        <mt-com :imgurl="imgurl"></mt-com>
    </div>
</template>
<script>
import Comment from '../public/comment.vue';

export default {
    data(){

        return {
            imgurl: ''
        }
    },
    created() {
        this.getDmImgs() 
    },
    methods: {
        getDmImgs() {
            this.$axios({
                method: 'post',
                url: '/api/DmImgS',
                data: {
                    format : 'json',
                }}).then((res) => {
                // 状态码 200 表示请求成功
                if(res.data.code == 200){
                     // console.log('ok')
                     //this.lunbotuList.push(res.data.data)
                     this.imgurl= res.data.data.url
                }else{
                        console.log(res.data)
                        }}).catch( (error) => {
                        console.log(error);
                 });
        }
    },
    components: {
        "mt-com": Comment

    }
}

</script>
<style lang="less" scoped>
.news {
    img {
        // height: 250px;
        width: 100%;
    }
}
</style>