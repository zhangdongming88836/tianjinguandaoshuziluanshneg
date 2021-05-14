<template>
  <div>
    <el-dialog
      :visible.sync="dialogVisible"
      width="30%"
      :modal-append-to-body="false"
     close-on-click-modal="false"
      @close="close"
      @open="open"
    >
      <el-tree
        :data="datas"
        :props="defaultProps"
        @node-click="handleNodeClick"
      ></el-tree>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="delivery"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>
<script>
 import {experimentProjectEpOrg} from "@/api/index"
export default {
  props: ["opens"],
  data() {
    return {
      dialogVisible: false,
      dataval:[],
      datas: [
        {
          label: "一级 1",
          children: [
            {
              label: "二级 1-1",
              children: [
                {
                  label: "三级 1-1-1",
                },
              ],
            },
          ],
        },
      ],
      defaultProps: {
        children: "children",
        label: "name",
      },
    };
  },
  methods: {
    //节点被点击时的回调
    handleNodeClick(val) {
      console.log(val);
      this.dataval =val
    },
    // handleClose(done) {
    //   this.$confirm("确认关闭？")
    //     .then((_) => {
    //       done();
    //     })
    //     .catch((_) => {});
    // },
    //确定发送数据给父组件
    delivery(){
     this.$emit("AcceptSelection", this.dataval);
     this.dialogVisible = false
    },
    //关闭窗口
    close() {
      this.$emit("closes", this.dialogVisible);
    },
    //打开窗口的钩子
    open(){
   experimentProjectEpOrg().then( res => {
       console.log(res.data.data.data)
       this.datas = res.data.data.data
   })
    }
  },
  watch: {
    opens: {
      handler(newName, oldName) {
        this.dialogVisible = newName;
      },
      immediate: true,
      deep: true,
    },
  },
};
</script>
<style lang="sass" scoped>
</style>