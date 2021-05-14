<template >
  <div>
    <div id="content">
      <keep-alive >
        <router-view v-if="$route.meta.keepAlive" />
      </keep-alive>
      <router-view v-if="!$route.meta.keepAlive" />
      <!-- <router-view></router-view> -->
    </div>
  </div>
</template>
<script>
//引入首页的子组件

export default {}
</script>
<style lang="scss" scoped>
// #content{
//   position: fixed;
//   top:80px;
//   left:0px;
//   right:0px;
// }
</style>