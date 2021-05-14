<template >
  <div>
    <div id="headerWap">
      <div class="headerBg">
        <!-- <img class="headerBg-img" src="../../../assets/title.png" alt="" /> -->
      </div>
      <div class="headerBg-cent">
        <el-menu
          :default-active="activeIndex"
          class="el-menu-demo"
          mode="horizontal"
          @select="handleSelect"
          background-color="#6db6ff"
          active-text-color="#ffffff"
          text-color="#ffffff"
          router
        >
          <template v-for="(item,index) in routers">
          <el-submenu v-if="item.hideen" :key="index" :index="index +''" >
            <template slot="title">{{item.meta.name}}</template>
            <template v-for="items in item.children " >
            <el-menu-item v-if="items.hideen" :key="items.id" :index="items.path">{{items.meta.name}}</el-menu-item> 
            </template>
          </el-submenu>
          </template>
        </el-menu>
      </div>
      <div class="headerBg-user">
        <div style="padding-top: 2px">
          <img
            class="headPortrait"
            src="../../../assets/headPortrait.png"
            alt=""
          />
        </div>
        <div>
          <p class="user-name">小憨憨</p>
        </div>
        <div>
          <img
            class="instructions"
            src="../../../assets/instructions.png"
            alt=""
          />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
//引入首页的子组件
export default {
  data(){
      return{
          activeIndex: '1',
          routers:[],
      }
  },
  methods:{
       handleSelect(key, keyPath) {
        console.log(key, keyPath);
      },
  
  },
  created(){
    console.log(this.$router.options.routes)
    this.routers = this.$router.options.routes;
  }
};
</script>
<style lang="scss" scoped>
#headerWap {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.headerBg {
  width: 100%;
  height: 80px;
  background-image: url("../../../assets/bg.png");
  background-repeat: no-repeat;
  position: fixed;
  top: 0px;
  left: 0px;
  right: 0px;
  z-index: -1;
}
.headerBg-img {
  padding-left: 50px;
}
.headerBg-user {
  display: flex;
  flex-direction: row;
  justify-content: center;
}
.headPortrait {
  width: 40px;
  height: 40px;
  background-color: #ffffff;
}
.user-name {
  width: 50px;
  height: 20px;
  padding-top: 10px;
  padding-left: 10px;
  font-family: PingFang SC;
  font-size: 14px;
  font-weight: normal;
  font-stretch: normal;
  line-height: 20px;
  letter-spacing: 0px;
  color: #ffffff;
}
.instructions {
  width: 14px;
  height: 7px;
  padding-top: 15px;
  padding-right: 15px;
  color: #ffffff;
}
.headerBg-cent{
  height: 80px;
  margin-top:-9px;
  padding-left:500px;
}
</style>