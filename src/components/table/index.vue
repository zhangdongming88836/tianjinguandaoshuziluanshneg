<template>
  <div>
    <el-table
      :data="tableData"
      stripe
      style="width: 100%"
      :header-cell-style="{ background: '#ecf5ff', color: '#606266' }"
      @selection-change="handleSelectionChange"
    >
      >
      <!-- 多选框 -->

      <el-table-column v-if="see" type="selection" width="50"></el-table-column>
      <!--  -->
      <template v-for="item in titles">
        <el-table-column
          v-if="item.typeRow === 'slot'"
          :key="item.id"
          :prop="item.field"
          :label="item.lable"
         
          header-align="center"
          align="center"

        >
          <template slot-scope="scope">
            <slot :name="item.slotName" :data="scope.row"></slot>
          </template>
        </el-table-column>
        <el-table-column
          v-else
          :key="item.id"
          :prop="item.field"
          :label="item.lable"

          header-align="center"
          align="center"
           :show-overflow-tooltip='true'
        >
        </el-table-column>
      </template>
      <!-- <el-table-column prop="name" label="姓名" width="180"> </el-table-column>
      <el-table-column prop="address" label="地址"> </el-table-column> -->
    </el-table>
    <!-- ******************************************************** -->
    <div class="paging">
      <div class="block">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
         :current-page="pageNum"
          :page-size="pageSize"
          background
          layout="total, prev, pager, next, jumper"
          :total="total"
        >
        </el-pagination>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: ["titles", "tableData", "total", "see","pageSize" ,"pageNum"],
  data() {
    return {
      // //显示多选框
      // see: false,
      // //总页数
      // total: "",
      //每页条数
      // pageSize:2,
      // tableHeader: [],
      // tableData: [
      //   // {
      //   //   date: "2016-05-02",
      //   //   name: "王小虎",
      //   //   address: "上海市普陀区金沙江路 1518 弄",
      //   // },
      //   // {
      //   //   date: "2016-05-04",
      //   //   name: "王小虎",
      //   //   address: "上海市普陀区金沙江路 1517 弄",
      //   // },
      //   // {
      //   //   date: "2016-05-01",
      //   //   name: "王小虎",
      //   //   address: "上海市普陀区金沙江路 1519 弄",
      //   // },
      //   // {
      //   //   date: "2016-05-03",
      //   //   name: "王小虎",
      //   //   address: "上海市普陀区金沙江路 1516 弄",
      //   // },
      // ],
      // //多选删除的数组
      multipleSelection: [],
    //  //当前页数
       pageNum:1,
    };
  },
  // watch: {
  //   titles: {
  //     immediate: true,
  //     deep: true,
  //     handler(newName, oldName) {
  //       // console.log(newName);
  //       this.tableHeader = newName;
  //       //  console.log(oldName)
  //     },
  //   },
  //   tableData: {
  //     immediate: true,
  //     deep: true,
  //     handler(newName, oldName) {
  //       // console.log(newName);
  //       this.tableData = newName;
  //       //  console.log(oldName)
  //     },
  //   },
  //   total: {
  //     immediate: true,
  //     deep: true,
  //     handler(newName, oldName) {
  //       // console.log(newName);
  //       this.total = newName;
  //       //  console.log(oldName)
  //     },
  //   },
  //   see: {
  //     immediate: true,
  //     deep: true,
  //     handler(newName, oldName) {
  //       // console.log(newName);
  //       this.see = newName;
  //       //  console.log(oldName)
  //     },
  //   },
  //   pageSize: {
  //     immediate: true,
  //     deep: true,
  //     handler(newName, oldName) {
  //       // console.log(newName);
  //       this.pageSize = newName;
  //       //  console.log(oldName)
  //     },
  //   },
    pageNum: {
      immediate: true,
      deep: true,
      handler(newName, oldName) {
        // console.log(newName);
        this.pageNum = newName;
        //  console.log(oldName)
      },
    },
  //},
  //  created(){
  //    this.GetHeader()
  //    this.Getdata()
  //  },
  methods: {
    //每页多少条
    handleSizeChange(val) {
      // console.log(`每页 ${val} 条`);
      this.$emit('size',val)

    },
    //当前第几页
    handleCurrentChange(val) {
      // console.log(val,"***************")
      //  this.pageNum = val;
       this.$emit("page",val);
    },
    //全选框
    handleSelectionChange(val) {
     this.multipleSelection = val.map(item => {
       return item.id;
     })
     this.$emit("idArr",this.multipleSelection)
    },
  },
};
</script>
<style lang="scss" scoped>
.paging {
  width: 627px;
  height: 32px;
  margin-top: 15px;
  margin-left: 60%;
}
.el-table td div {
   display: flex  !important;
    flex-direction: row  !important;
    justify-content: space-around !important;
    padding-left: 5px !important;
}
</style>
