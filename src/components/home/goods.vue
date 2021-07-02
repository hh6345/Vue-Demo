<template>
<div >
  <goodslist :goodsresult ="goodsresult"> </goodslist>
</div>
</template>

<script>
import goodslist from '../public/goodslist.vue'

export default {
    data() {
        return {
        goodsresult: []    
        }
    },
    mounted(){
        this.goodsresult = require('../../assets/goodsdata.json').data
        console.log(this.goodsresult)
    },
    components: { goodslist }
}

</script>

<style>

</style>