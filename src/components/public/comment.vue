<template>
    <div class="comment">
        <textarea :placeholder="'请输入要评论的内容(*￣０￣)ノ（最多120字）当前图片地址' + imgurl" maxlength="120" v-model="commsg"></textarea>
        <mt-button type="primary" size="large" @click="postComment">发表评论</mt-button>

        <div class="cmt-list">
            <div class="cmt-item" v-for="(item, i) in commentlist" :key="item.add_time">
                <div class="cmt-title">
                    第{{ i+1 }}楼&nbsp;&nbsp;用户：{{ item.user_name }}&nbsp;&nbsp;发表时间：{{ item.add_time | dataFormat }}
                </div>
                <div class="cmt-body">
                    {{ item.content === 'undefined' ? '此用户很懒，嘛都没说': item.content }}
                </div>
            </div>
        </div>

        <mt-button type="danger" size="large" plain @click="getMore">{{ loading }}</mt-button>

    </div>
</template>

<script>
import { Toast } from 'mint-ui';

export default {
    data() {
        return {
            commsg: '',
            commentlist: [],
            sliceStart: 0,
            sliceEnd: 10,
            loading:'加载更多'
        }
    },
    created() {
        this.getComment()
    },
    methods: {
        postComment() {
            //trim() 方法用于删除字符串的头尾空白符，空白符包括：空格、制表符 tab、换行符等其他空白符等。
            if(this.commsg.trim().length === 0) return Toast('评论不能为空');
            // 拼接字符串
            let postdata = {user_name: "匿名用户",
              add_time: Date.now(),
              imgurl: this.imgurl,
              content: this.commsg.trim() }
             // console.log(postdata)
            /*this.$axios.post(url,data)
            .then(res => console.log(res))
            .catch( (error) => { console.log(error) });*/
            this.commentlist.unshift(postdata)
            this.commsg=''  
        },
        getComment() {
            // this.$axios.get('http://localhost:8080/src/assets/comdata.json')
            // .then(res => console.log(res))
            // .catch( (error) => { console.log(error) });
            const comdata=require('../../assets/comdata.json') //模拟假数据
            const newarr = comdata.data.slice(this.sliceStart,this.sliceEnd)
            this.commentlist=this.commentlist.concat(newarr)
            if(newarr.length < 10) {
                this.loading = '没有更多了~'
            }
        },
        getMore() {
            this.sliceStart += 10
            this.sliceEnd += 10
            this.getComment()
        }
    },
    props: ["imgurl"]
}
</script>

<style lang="less" scoped>
.comment {
    margin-top: 20px;
    textarea {
        height: 150px;
        margin-bottom: 0;
    }
}
.cmt-list {
    margin: 5px 0;
    .cmt-item {
      font-size: 13px;
      .cmt-title {
        line-height: 30px;
        background-color: #ccc;
      }
      .cmt-body {
        line-height: 35px;
        text-indent: 2em;
      }
    }
  }
</style>