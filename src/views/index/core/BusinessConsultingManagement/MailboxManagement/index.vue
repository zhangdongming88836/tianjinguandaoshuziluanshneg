<template >
  <div id="TheWholeExperiment">
    <div><i>业务咨询管理</i> ><i>邮箱管理</i></div>
    <div class="DividingLines"></div>
    <div class="material-wrap">
      <div>
        <div>
              <div style="padding-top: 15px" class="over-auto">
                <div class="LayoutLocation">
                  <div></div>
                  <div style="margin-right: 10px">
                      <el-button type="success" icon="el-icon-plus" size="small"  @click="OpenMail({btn:0})">新增</el-button>
                  </div>
                </div>
                <div class="DividingLine"></div>
                <div style="margin-top: 15px" class="over-auto">
                  <tablem :titles="titles" :tableData="tableData" :total="total" :see="see" :pageSize="pageSize" @page="page" @idArr="idArr" :pageNum="pageNum">
                    <template v-slot:status="data">
                      <el-button type="text" size="mini" @click="OpenMail({btn:1,vals:data.data})">编辑</el-button>
                      <el-button type="text" size="mini" @click="FluidDelete(data)">删除</el-button>
                    </template>
                  </tablem>
                </div>
              </div>
        </div>
      </div>
    </div>
    <!-- <preview :imgarrUrl="imgarrUrl" :centerDialogVisible.sync="centerDialogVisible" @closes="closes"></preview> -->
    <newmailbox v-if="EmailDisplay" :EmailDisplay.sync="EmailDisplay" @ReturnToMail="ReturnToMail" @handleClick="handleClick" :btn="btn"></newmailbox>
  </div>
</template>
<script>
import tablem from '@/components/table/index'
import {
 queryByPage,
 deletes
} from '@/api/BusinessConsulting'

import newmailbox from "./NewMailbox/index"
export default {
  components: {
    tablem,
    // preview,
    newmailbox
  },
  data() {
    return {
      //按钮
      btn:{},
      //邮箱组件显示
      EmailDisplay:false,
      //显示多选框
      see: false,
      //总页数
      total: 0,
      only: 1,
      //当前页数
      pageNum: 1,
      //每也条数
      pageSize: 10,
      //公共表头
      titles: [
        { lable: '序号', field: 'tid' },
        { lable: '联系人姓名', field: 'personName' },
        { lable: '邮箱', field: 'personEmail' },
        { lable: '联系电话', field: 'persomPhone' },
        { lable: '操作人', field: 'createByName' },
        { lable: '发布时间', field:"createTime" },
        { lable: '操作', typeRow: 'slot', slotName: 'status' },
      ],
      //公共表格内容
      tableData: [
     
      ],
      //图片的数组
      imgarr: [],
      //保存一级目录数据
      PrimaryDataDirectory: [],
      //获取流体二级目录
      secondLvel: [],
      //有限二级目录
      LimitedSecondarydirectory: [],
      //流动二级目录
      MobileSecondary: [],
      //经验二级目录
      ExperienceLevelA: [],
      //选中的二级id
      SelectLevelId: '',
      //搜索框name
      fluidName: '',
      //动图数组
      MovingPictureaArray: [],
      //请求动图的数据对象
      // MovingObject:{},
      //保存文件的数组
      sysAttachments: [],
      //删除除数组
      tableRow: {
        ids: [],
      },
    }
  },
  created() {
    this.handleClick()
  },
  //监听页码变化
  watch: {
    pageNum: function (newVal, oldVal) {
      this.handleClick()
    },
  },
  methods: {
    //返回邮箱子组件数据
    ReturnToMail(val){
      // console.log(val,2222222222222222)
       this.EmailDisplay = val
      //  console.log(this.EmailDisplay,111111111111)
    },
    //打开邮箱组件
    OpenMail(val){
      // console.log(11111111111111111111111)
      console.log(val)
     this.btn = val
      this.EmailDisplay = true;
      // console.log(this.EmailDisplay)
    },
  nSubmit() {
      console.log('submit!')
    },
    //每页多少条
    page(val) {
      this.pageNum = val
    },
    //删除
    FluidDelete(val) {
        console.log(val.data.id)
      this.$confirm('此操作将永久删除, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(() => {
          let id = val.data.id
          deletes(id).then(res => {
            if (res.data.code == 200) {
              this.$message({
                type: 'success',
                message: `${res.data.msg}`,
              })
              this.handleClick()
            } else {
              this.$message({
                type: 'info',
                message: `${res.data.msg}`,
              })
            }
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除',
          })
        })
    },
    //获取数据
    handleClick(){
      let obj = {
        pageNum:this.pageNum,
        pageSize:this.pageSize,
        type:2
      }
    queryByPage(obj).then(res=>{
     console.log(res.data.data)
     this.tableData = res.data.data.rows.map((item, index) => {
            item.tid =
              this.pageNum > 1 ? `${this.pageSize + index + 1}` : index + 1;
            return item;
          });
     this.total = res.data.data.total
   })
    }
  }
}
</script>
<style lang="scss" scoped>
#TheWholeExperiment {
  padding: 10px;
}
.query-w {
  width: 120px;
}
.material-wrap {
  width: 100%;
  margin-top: 10px;
}
// .Navigation-layout {
//   display: flex;
//   flex-direction: row;
//   justify-content: flex-start;
// }
.LayoutLocation {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.Navigation-butten {
  width: 150px;
  height: 40px;
  background-color: #ffffff;
  border: solid 1px #cccccc;
  color: #0376cb;
  text-align: center;
  line-height: 40px;
}
.Navigation-butten:hover {
  border-top: 2px solid #0376cb;
  border-bottom: 0;
  cursor: pointer;
}
.search {
  width: 16px;
  height: 16px;
}
//动图布局
.DynamicDisplay {
  width: 100%;
  height: 252px;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  flex-wrap: wrap;
  margin-bottom: 50px;
  padding: 5px;
  overflow: auto;
}
//先择框布局
.LayoutFirst {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
//下拉框位置
.Drop {
  margin-left: -200px;
}
.MovingPicture {
  width: 370px;
  height: 252px;
  padding: 5px 10px;
  background-color: #ffffff;
  border-radius: 8px;
  border: solid 1px #707070;
}
// .over-auto {
//   width: 100%;
//   height: 500px;
//   // overflow: auto;
//   overflow-y: scroll;
//   overflow-x: hidden;
// }
//遮罩层
.image-div {
  // width: 370px;
  // height: 252px;
  position: relative;
}
// .image-div img {
// 	width: 370px;
// 	height: 252px;
// 			}
.image-mask {
  position: absolute;
  width: 100%;
  height: 100%;
  bottom: 0;
  background: rgba(101, 101, 101, 0.6);
  color: #ffffff;
  opacity: 0;
  line-height: 370px;
}
.image-div:hover .image-mask {
  opacity: 1;
  border-radius: 8px;
  cursor: default;
}
.iconsc {
  width: 30px;
  height: 30px;
  position: absolute;
  top: 45%;
  left: 45%;
}
.DividingLines{
  width:100%;
	height:1px;
  margin-top:10px;
	background-color: #cccccc;
}
.DividingLine{
  width:100%;
	height:1px;
  margin-top:20px;
	background-color: #cccccc;
}
a{
  color:#606266 ;
}
</style>