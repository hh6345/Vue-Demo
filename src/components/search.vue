<template>
<div >
  <mt-search
  v-model="value"
  :placeholder="placeholder"
  :show="true"
 @keyup.enter.native="search">
 <br>
 <br>
  <goodslist :goodsresult ="goodsresult"> </goodslist>
  </mt-search>

</div>
</template>

<script>
import goodslist from '../components/public/goodslist.vue'

export default {
    data() {
    return {
      placeholder: '搜索',
      value: '',
      goodsresult: []
      
    }
  },
  mounted(){
    this.goodsresult = JSON.parse(sessionStorage.getItem('key') || '[]')
    this.placeholder = JSON.parse(sessionStorage.getItem('value') || '搜索')
    //console.log(this.goodsresult)
  },
  methods: {
    search() {
      if(!this.value){
        this.placeholder = '搜索'
        //this.goodsresult = []
      }else {
        this.placeholder = this.value
        this.goodsresult.length = 0
      const data = require('../assets/goodsdata.json').data
      this.goodsresult = data.filter(item => {
        return item.name.indexOf(this.value) != -1
      })
      }
      
      sessionStorage.setItem('key',JSON.stringify(this.goodsresult));
      sessionStorage.setItem('value',JSON.stringify(this.value));
      this.value=''
    },
  },
  components: { goodslist }
}

</script>

<style>
input[type=search] {
  margin: 0;
  background-color: transparent;
  height: 0;
}
.mint-search {
  height: 100%;
}

</style>
