<template>
    <div>
        <router-view></router-view>
         <!-- <Headers></Headers>
        <Core></Core> -->
    </div>
    
</template>
<script>
//引入首页的子组件
import Headers from "@/views/index/headers/index"
import Core from "@/views/index/core/index"
    export default { 
        components:{
          Headers,
          Core
        },
        data() {
            return {
            	
            }
        }
    }
</script>
<style lang="scss">
   
</style>