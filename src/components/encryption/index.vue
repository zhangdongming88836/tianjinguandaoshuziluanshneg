<template>
  <div>
    <el-dialog title="选择人员" :visible.sync="encryptionOpen" width="70%" center :modal-append-to-body="false" @close="close" @open="open">
      <el-row>
        <el-col :span="8">
          <div>
            <!-- <div class="treeTitle">人员</div> -->
            <div class="treeCengteneb">
              <div style="height: 500px; padding-top: 10px">
                <el-tree :data="tree" :props="defaultProps" @node-click="handleNodeClick"></el-tree>
              </div>
            </div>
          </div>
        </el-col>
        <el-col :span="16">
          <div>
            <el-transfer
              :titles="['待选列表', '已选列表']"
              filterable
              :filter-method="filterMethod"
              filter-placeholder="请选择"
              v-model="value"
              :data="dialogList"
              :props="{ key: 'empId', label: 'empName' }"
              @change="handleChange"
            >
            </el-transfer>
          </div>
        </el-col>
      </el-row>
      <span slot="footer" class="dialog-footer">
        <el-button @click="encryptionOpen = false">取 消</el-button>
        <el-button type="primary" @click="encryptionOpenss">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import { queryCompany, queryEmpByOrgId } from '@/api/SimulationAnalysisData'
export default {
  props: ['encryptionOpen'],
  data() {
    /**********穿梭框************ */
    // const generateData = _ => {
    //     const data = [];
    //     const cities =this.dataaa
    //     const pinyin = ['shanghai', 'beijing', 'guangzhou', 'shenzhen', 'nanjing', 'xian', 'chengdu'];
    //     cities.forEach((city, index) => {
    //       data.push({
    //         label: city,
    //         key: index,
    //         pinyin: pinyin[index]
    //       });
    //     });
    //     return data;
    //   };

    /********************** */
    return {
      encryptionOpen: false,
      //已选公司的id
      CompanyID: {},
      //树数据
      tree: [
        {
          label: '一级 1',
          children: [
            {
              label: '二级 1-1',
              children: [
                {
                  label: '三级 1-1-1',
                },
              ],
            },
          ],
        },
      ],
      //穿梭框
      dialogList: [],
      value: [],
      valuess: [],
    }
  },
  methods: {
    //打开窗口钩子
    async open() {
      await queryCompany().then(res => {
        //console.log(res.data.data)
        this.tree = res.data.data
        this.CompanyID = res.data.data[0].id
      })
      await queryEmpByOrgId(this.CompanyID).then(res => {
        console.log(res, 'ssssssssssss')
        this.dialogList = res.data.data
      })
    },
    //关闭窗口
    close() {
      this.$emit('EncryptionPersonnelStyle', this.encryptionOpen)
      this.$emit('Receiver', this.valuess)
    },
    //获取当前树节点信息
    handleNodeClick(data) {
      this.CompanyID = data.id
      console.log(data)
      queryEmpByOrgId(this.CompanyID).then(res => {
        console.log(res, 'ssssssssssss')
        this.dialogList = res.data.data
        //  console.log(this.dialogList)
      })
      //   console.log( this.CompanyID,)
    },
    /*********************************** */
    //  handleChange(val){
    //    console.log(val)
    //  var arr=this.dialogList.map( item =>{
    //        item.empId == val
    //        return item
    //    })

    //  },
    //确定添加
    encryptionOpenss() {
      //  console.log(1111111111)
      //      var arr=this.dialogList.map( (item,index) =>{
      //        console.log(item)
      //      item.empId == this.value[index]
      //      return item
      //  })
      let arr = []
      this.value.forEach(item => {
        this.dialogList.forEach(item2 => {
          if (item == item2.empId) {
            arr.push(item2)
          }
        })
      })
      this.valuess = arr

      //  this.valuess = arr
      this.encryptionOpen = false
    },
  },
  //编辑
  //   watch:{
  //     PeopleSubcomponent:{
  //     handler(newName, oldName) {
  //       var arr = newName.map(item =>{
  //            return item.dataId
  //       })
  //       this.value = arr;
  //     },
  //     immediate: true,
  //     deep: true
  //   }
  // }
}
</script>
<style lang="scss" >
.treeTitle {
  width: 270px;
  height: 40px;
  background-color: #f7f7f7;
  border: solid 1px #cccccc;
  line-height: 40px;
  padding-left: 10px;
}
.treeCengteneb {
  width: 280px;
  height: 391px;
  background-color: #ffffff;
  border: solid 1px #cccccc;
  overflow: auto;
  // overflow-y:scroll
}
/*************************** */
.el-transfer-panel {
  width: 220px !important;
  height: 393px !important;
}
.el-transfer-panel__list.is-filterable {
  height: 200px;
}
.el-dialog__header {
  background-color: #0075cb;
}
.el-dialog__title {
  margin-left: -95%;
  color: #e4e4e4;
}
.el-icon-close:before {
  color: #e4e4e4;
}
// .el-transfer-panel
</style>