<template>
        <div class="mui-numbox" data-numbox-min='1'>
					<button class="mui-btn mui-btn-numbox-minus" type="button" >-</button>
					<input class="mui-input-numbox" type="number" @change="countChanged"/>
					<button class="mui-btn mui-btn-numbox-plus" type="button" >+</button>
		</div>
</template>
<script>
import  mui from '../../assets/mui/js/mui.min.js'
export default {
    mounted() {
		mui('.mui-numbox').numbox()     
    },
    data() {
        return {
			numvalue:'1'
        }
    },
    methods: {
		countChanged() {
			this.numvalue = mui(".mui-numbox").numbox().getValue()
            this.$emit("getCount",this.numvalue)
			//console.log(this.numvalue)
		}
    }    
}
</script>