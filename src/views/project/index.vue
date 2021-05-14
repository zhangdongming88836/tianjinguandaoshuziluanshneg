<template>
  <div class="home_box">
    <div class="home_header">
      <CommonHeader :routes="routes"></CommonHeader>
      <!-- <div class="hh_bottom">
        <CommonMenu :routes="routes"></CommonMenu>
      </div> -->
    </div>
     <div class="home_body">
      <router-view></router-view>
    </div> 
    <!-- <Core></Core> -->
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import CommonHeader from '@/views/project/components/commonHeader'
import CommonMenu from '@/views/project/components/commonMenu'
import { logout } from '@/api/login'
import { getStore, removeStore } from '@/utils/localStorage'
// //引入首页的子组件
// import Headers from "@/views/index/headers/index"
 import Core from "@/views/index/core/index"
export default {
  data() {
    return {
      userShow: '',
      name: '',
      department: '',
      company: '',
      //  Headers,
         Core

    }
  },
  components: {
    CommonHeader,
    CommonMenu,
  },
  computed: {
    ...mapGetters(['permission_routers']),
    routes() {
      return this.permission_routers
    },
  },
  created() {
    let userData = JSON.parse(getStore('loginUserData'))
    this.name = userData.name
    this.company = userData.company
    this.department = userData.department
  },
  methods: {
    logout() {
      this.$alert('确定退出登录吗？', '', {
        distinguishCancelAndClose: true,
        confirmButtonText: '确定',
      })
        .then(() => {
          logout()
            .then(response => {
              this.$store
                .dispatch('LogOut')
                .then(() => {
                  removeStore('loginUserData')
                  window.location.href = '/newlogin'
                })
                .catch(() => {})
            })
            .catch(error => {
              this.$message({ message: '操作失败，请刷新重试！', type: 'error' })
            })
        })
        .catch(action => {
          console.log(action)
        })
    },
    handleShowUser() {
      if (this.userShow === '') {
        this.userShow = 'userShow'
      } else {
        this.userShow = ''
      }
    },
  },
}
</script>
<style lang="scss">
.home_box {
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: 100vh;
  background: #ffffff;
  .home_header {
    height: 60px;
    background: #ffffff;
    border-bottom: solid 4px #cccccc;
    .hh_bottom{
        z-index: 999;
    }
  }
}
</style>