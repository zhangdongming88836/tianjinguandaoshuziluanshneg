<template>
  <div>
    <el-dialog
      :modal-append-to-body='false'
      :visible.sync="centerDialogVisible"
      width="30%"
      center
      @close="close"
    >
     <img :src="imgarrUrl" alt="" style="width:100%">
  
    </el-dialog>
  </div>
</template>
<script>
export default {
    props:["centerDialogVisible","imgarrUrl"],
   data() {
    return {
      centerDialogVisible: false,
      imgarrUrl:""
    };
  },
  watch:{
      imgarrUrl: {
    handler(newName, oldName) {
      this.imgarrUrl = newName
    },
    immediate: true,
    deep: true
  }

  },
  methods:{
      close(){
          this.$emit("closes",this.centerDialogVisible)
      }
  }
};
</script>
<style lang="sass">
</style>