<template >
  <div id="TheWholeExperiment">
    <div>
      <div><i>实物试验数据库</i> ><i>试验项目数据维护</i></div>
      <div class="material-wrap">
        <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
          <el-tab-pane label="水压爆破试验" name="first">
            <div style="padding-top: 15px" class="over-auto">
              <div class="LayoutFirst">
                <el-form :inline="true" :model="formInline" class="demo-form-inline">
                  <el-input
                    placeholder="请输入产品名称、委托单位"
                    prefix-icon="el-icon-search"
                    v-model="formInline.productionName"
                    style="width: 300px"
                    @input="changeAValue"
                  >
                  </el-input>
                  <el-form-item>
                    <el-button style="margin-left: 10px" type="primary" icon="el-icon-search" @click="QueryExperimentalData">查询</el-button>
                  </el-form-item>
                </el-form>
                <div>
                  <el-button type="success" icon="el-icon-plus" @click="NewWaterPressure()">新增</el-button>

                  <el-button type="danger" icon="el-icon-delete" @click="DeleteDatas()">批量删除</el-button>
                </div>
              </div>
              <div style="margin-top: 15px">
                <tablem
                  :titles="titles"
                  :tableData="tableData"
                  :total="total"
                  :see="see"
                  :pageSize="pageSize"
                  :pageNum="pageNum"
                  @page="page"
                  @idArr="idArr"
                       style="margin-bottom: 10px"
                >
                  <template v-slot:imgName="data">
                    <div v-show="data.data.sysAttachments != null">
                      <template v-for="item in data.data.sysAttachments">
                        <div v-if="item.typeNumber == 1" :key="item.id">
                          <a type="text" style="cursor: pointer" @click="getPreview(item.fileUrl)">{{ item.fileName }}</a>
                          <!-- <el-image-viewer
                    v-if="showViewer"
                    on:close="showViewerClose"
                    :url-list="[item.fileUrl]"
                  ></el-image-viewer> -->
                        </div>
                      </template>
                    </div>
                  </template>
                  <template v-slot:TimePicture="data">
                    <div v-show="data.data.sysAttachments != null">
                      <template v-for="item in data.data.sysAttachments">
                        <div v-if="item.typeNumber == 2" :key="item.id">
                          <a type="text" style="cursor: pointer" @click="getPreview(item.fileUrl)">{{ item.fileName }}</a>
                          <!-- <el-image-viewer
                    v-if="showViewer"
                    on:close="showViewerClose"
                    :url-list="[item.fileUrl]"
                  ></el-image-viewer> -->
                        </div>
                      </template>
                    </div>
                  </template>
                  <template v-slot:status="data">
                    <el-button type="text" size="mini" @click="WaterPressureCheck(data)">查看</el-button>
                    <el-button type="text" size="mini" @click="HydraulicEiting(data.data)">编辑</el-button>
                    <el-button type="text" size="mini" @click="DeleteData(data.data)">删除</el-button>
                  </template>
                </tablem>
              </div>
            </div>
          </el-tab-pane>
          <el-tab-pane label="高温高压腐蚀模拟" name="second">
            <div style="padding-top: 15px">
              <div class="LayoutFirst">
                <el-form :inline="true" :model="formInline" class="demo-form-inline">
                  <el-input
                    placeholder="请输入产品名称、委托单位"
                    prefix-icon="el-icon-search"
                    v-model="formInline.productionName"
                    style="width: 300px"
                    @input="HighTemperatureChangeValue"
                  >
                  </el-input>
                  <el-form-item>
                    <el-button style="margin-left: 10px" type="primary" icon="el-icon-search" @click="HighTemperatureQuery">查询</el-button>
                  </el-form-item>
                </el-form>
                <div>
                  <el-button type="success" icon="el-icon-plus" @click="NewCorrosion()">新增</el-button>

                  <el-button type="danger" icon="el-icon-delete" @click="HighTemperatureDeletes()">批量删除</el-button>
                </div>
              </div>
              <div style="margin-top: 15px">
                <tablem
                  :titles="titles"
                  :tableData="tableData"
                  :total="total"
                  :see="see"
                  :pageSize="pageSize"
                  :pageNum="pageNum"
                  @page="page"
                  @idArr="idArr"
                      style="margin-bottom: 10px"
                >
                  <template v-slot:imgName="data">
                    <div v-show="data.data.sysAttachments != null">
                      <template v-for="item in data.data.sysAttachments">
                        <div v-if="item.typeNumber == 3" :key="item.id">
                          <a type="text" style="cursor: pointer" @click="getPreview(item.fileUrl)">{{ item.fileName }}</a>
                          <!-- <el-image-viewer
                    v-if="showViewer"
                    on:close="showViewerClose"
                    :url-list="[item.fileUrl]"
                  ></el-image-viewer> -->
                        </div>
                      </template>
                    </div>
                  </template>
                  <template v-slot:status="data">
                    <el-button type="text" size="mini" @click="ViewCorrosion(data)">查看</el-button>
                    <el-button type="text" size="mini" @click="EditorialCorrosion(data.data)">编辑</el-button>
                    <el-button type="text" size="mini" @click="HighTemperatureDelete(data.data)">删除</el-button>
                  </template>
                </tablem>
              </div>
            </div>
          </el-tab-pane>
          <el-tab-pane label="四点弯曲试验" name="third">
            <div style="padding-top: 15px">
              <div class="LayoutFirst">
                <el-form :inline="true" :model="formInline" class="demo-form-inline">
                  <el-input
                    placeholder="请输入产品名称、委托单位"
                    prefix-icon="el-icon-search"
                    v-model="formInline.productionName"
                    style="width: 300px"
                    @input="FourChanges"
                  >
                  </el-input>
                  <el-form-item>
                    <el-button style="margin-left: 10px" type="primary" icon="el-icon-search" @click="FourPointInquiry">查询</el-button>
                  </el-form-item>
                </el-form>
                <div>
                  <el-button type="success" icon="el-icon-plus" @click="FourNewPoints">新增</el-button>

                  <el-button type="danger" icon="el-icon-delete" @click="FourPointDeletions()">批量删除</el-button>
                </div>
              </div>
              <div style="margin-top: 15px">
                <tablem
                  :titles="titles"
                  :tableData="tableData"
                  :total="total"
                  :see="see"
                  :pageSize="pageSize"
                  :pageNum="pageNum"
                  @page="page"
                  @idArr="idArr"
                     style="margin-bottom: 10px"
                >
                  <template v-slot:status="data">
                    <el-button type="text" size="mini" @click="LookAtFour(data)">查看</el-button>
                    <el-button type="text" size="mini" @click="EditFourPoints(data.data)">编辑</el-button>
                    <el-button type="text" size="mini" @click="FourPointDeletion(data.data)">删除</el-button>
                  </template>
                </tablem>
              </div>
            </div>
          </el-tab-pane>
          <el-tab-pane label="静态弯曲试验" name="fourth">
            <div style="padding-top: 15px">
              <div class="LayoutFirst">
                <el-form :inline="true" :model="formInline" class="demo-form-inline">
                  <el-input
                    placeholder="请输入产品名称、委托单位"
                    prefix-icon="el-icon-search"
                    v-model="formInline.productionName"
                    style="width: 300px"
                    @input="StaticChangeValue"
                  >
                  </el-input>
                  <el-form-item>
                    <el-button style="margin-left: 10px" type="primary" icon="el-icon-search" @click="StaticQuery">查询</el-button>
                  </el-form-item>
                </el-form>
                <div>
                  <el-button type="success" icon="el-icon-plus" @click="NewStatic">新增</el-button>

                  <el-button type="danger" icon="el-icon-delete" @click="StaticDeletes()">批量删除</el-button>
                </div>
              </div>
              <div style="margin-top: 15px">
                <tablem
                  :titles="titles"
                  :tableData="tableData"
                  :total="total"
                  :see="see"
                  :pageSize="pageSize"
                  :pageNum="pageNum"
                  @page="page"
                  @idArr="idArr"
                   style="margin-bottom: 10px"
                >
                  <template v-slot:status="data">
                    <el-button type="text" size="mini" @click="ViewStatic(data)">查看</el-button>
                    <el-button type="text" size="mini" @click="EditStatic(data.data)">编辑</el-button>
                    <el-button type="text" size="mini" @click="StaticDelete(data.data)">删除</el-button>
                  </template>
                </tablem>
              </div>
            </div>
          </el-tab-pane>
        </el-tabs>
        <!-- ************************************************************** -->
      </div>
      <preview :imgarrUrl="imgarrUrl" :centerDialogVisible.sync="centerDialogVisible" @closes="closes"></preview>
    </div>
  </div>
</template>
<script>
import tablem from '@/components/table/index'
import { experimentProjectList, experimentProjectDetails, experimentProjectSave, experimentProjectRemove } from '@/api/index'
//预览图片公共组件
import preview from '@/components/preview/index'
export default {
  components: {
    tablem,
    preview,
  },
  data() {
    return {
      //选项卡导航
      activeName: 'first',
      //打开预览图片
      centerDialogVisible: false,
      //图片地址
      imgarrUrl: '',
      // //图片
      // showViewer: false,
      // guidePic: null, // 预览图片的地址
      //显示多选框
      see: true,
      //总页数
      total: 0,
      formInline: {
        productionName: '',
        specificationModel: '',
        material: '',
        experimentTemperature: '',
        experimentTimeLength: '',
        corrosiveMedium: '',
      },
      only: 1,
      //当前页数
      pageNum: 1,
      //每也条数
      pageSize: 10,
      //删除除数组
      tableRow: {
        ids: [],
      },
      //水压爆破实验表格的头部内容
      pressureTitle: [
        { lable: '案例编号', field: 'code' },
        { lable: '产品名称', field: 'productionName' },
        { lable: '委托单位', field: 'entrustmentOrg' },
        { lable: '规格型号', field: 'specificationModel' },
        { lable: '材质', field: 'material' },
        { lable: '送检时间', field: 'inspectionTime' },
        { lable: '依据标准', field: 'standard' },
        { lable: '爆破最大压力', field: 'blastMaxPressure' },
        { lable: '爆破口长度', field: 'blastHoleLength' },
        { lable: '爆破口宽度', field: 'blastHoleWidth' },
        { lable: '距管端环焊缝最短距离', field: 'minDistance' },
        { lable: '爆破失效后形貌', typeRow: 'slot', slotName: 'imgName' },
        { lable: '时间-压力曲线', typeRow: 'slot', slotName: 'TimePicture' },
        { lable: '操作', typeRow: 'slot', slotName: 'status' },
      ],
      //高温高压腐蚀模拟表头内容
      temperatureTitle: [
        { lable: '案例编号', field: 'code' },
        { lable: '产品名称', field: 'productionName' },
        { lable: '委托单位', field: 'entrustmentOrg' },
        { lable: '材质', field: 'material' },
        { lable: '试验温度', field: 'experimentTemperature' },
        { lable: '试验时间', field: 'experimentTimeLength' },
        { lable: '腐蚀介质', field: 'corrosiveMedium' },
        { lable: '总压力', field: 'totalPressure' },
        { lable: '腐蚀性气体类型', field: 'corrosiveGasType' },
        { lable: '腐蚀性气体含量', field: 'corrosiveGasContent' },
        { lable: '转速', field: 'rotaingSpeed' },
        { lable: '腐蚀速率', field: 'corrosionRate' },
        { lable: '操作', typeRow: 'slot', slotName: 'status' },
      ],
      //四点弯曲实验表头内容
      spotTitle: [
        { lable: '案例编号', field: 'code' },
        { lable: '产品名称', field: 'productionName' },
        { lable: '委托单位', field: 'entrustmentOrg' },
        { lable: '规格型号', field: 'specificationModel' },
        { lable: '材质', field: 'material' },
        { lable: '送检时间', field: 'inspectionTime' },
        { lable: '依据标准', field: 'standard' },
        { lable: '评定结果', field: 'evaluationResults' },
        { lable: '操作', typeRow: 'slot', slotName: 'status' },
      ],
      //静态弯曲实验表头内容
      quietTitle: [
        { lable: '案例编号', field: 'code' },
        { lable: '产品名称', field: 'productionName' },
        { lable: '委托单位', field: 'entrustmentOrg' },
        { lable: '规格型号', field: 'specificationModel' },
        { lable: '材质', field: 'material' },
        { lable: '送检时间', field: 'inspectionTime' },
        { lable: '依据标准', field: 'standard' },
        { lable: '评定结果', field: 'evaluationResults' },
        { lable: '操作', typeRow: 'slot', slotName: 'status' },
      ],
      //公共表头
      titles: [],
      //水压爆破实验表格的内容
      pressureData: [],
      //高温高压腐蚀模拟表格内容
      temperatureData: [],
      //四点弯曲实验表格内容
      spotData: [],
      //静态弯曲实验表格内容
      quietData: [],
      //公共表格内容
      tableData: [],
      //图片的数组
      imgarr: [],
    }
  },
  mounted() {
    this.handleClick()
  },
  //   //路由首位
  //  beforeRouteEnter(to,from,next){
  //   console.log(to)
  //   console.log(from)
  //   console.log(next)
  //  },
  //监听页码变化
  // watch: {
  //   pageNum: function (newVal, oldVal) {
  //     this.handleClick();
  //   },
  // },
  methods: {
    //水压搜索框值改变
    changeAValue(val) {
      // console.log(val)
      if (val == '') {
        this.QueryExperimentalData()
      }
    },
    //高温搜索值改变
    HighTemperatureChangeValue(val) {
      if (val == '') {
        this.HighTemperatureQuery()
      }
    },
    //四点搜索框值改变
    FourChanges(val) {
      if (val == '') {
        this.FourPointInquiry()
      }
    },
    //静态搜索框值改变
    StaticChangeValue(val) {
      if (val == '') {
        this.StaticQuery()
      }
    },
    //每页多少条
    page(val) {
      this.pageNum = val
      if (this.activeName == 'first') {
        let obj = {
          productionName: this.formInline.productionName,
          pageNum: val,
          pageSize: this.pageSize,
          experimentType: '1',
        }
        this.theWholeExperiment(obj)
      } else if (this.activeName == 'second') {
        let obj = {
          pageNum: val,
          pageSize: this.pageSize,
          experimentType: '2',
          productionName: this.formInline.productionName,
        }
        this.theWholeExperiment(obj)
      } else if (this.activeName == 'third') {
        let obj = {
          productionName: this.formInline.productionName,
          pageNum: val,
          pageSize: this.pageSize,
          experimentType: '3',
        }
        this.theWholeExperiment(obj)
      } else if (this.activeName == 'fourth') {
        let obj = {
          productionName: this.formInline.productionName,
          pageNum: val,
          pageSize: this.pageSize,
          experimentType: '4',
        }
        this.theWholeExperiment(obj)
      }
    },
    //新增静态弯曲
    NewStatic() {
      this.$router.push({
        name: 'NewStatic',
        query: {
          title: '新增静态弯曲试验',
          titles: '新增',
          btn: 1,
          seeingBtn: true,
        },
      })
    },
    //编辑静态弯曲
    EditStatic(val) {
      this.$router.push({
        name: 'NewStatic',
        query: {
          title: '编辑静态弯曲试验',
          titles: '编辑',
          btn: 2,
          datas: val,
          seeingBtn: true,
        },
      })
    },
    //查看静态弯曲
    ViewStatic(val) {
      let dataId = val.data.id
      this.$router.push({
        name: 'StaticJump',
        query: {
          id: dataId,
        },
      })
    },
    //查看四点弯曲
    LookAtFour(val) {
      let dataId = val.data.id
      this.$router.push({
        name: 'BendingDetails',
        query: {
          id: dataId,
        },
      })
    },
    //编辑四点弯曲
    EditFourPoints(val) {
      this.$router.push({
        name: 'FourNewPoints',
        query: {
          title: '编辑四点弯曲试验',
          titles: '编辑',
          btn: 2,
          datas: val,
          seeingBtn: true,
        },
      })
    },
    //四点弯曲新增
    FourNewPoints() {
      this.$router.push({
        name: 'FourNewPoints',
        query: {
          title: '新增四点弯曲试验',
          titles: '新增',
          btn: 1,
          seeingBtn: true,
        },
      })
    },
    //高温腐蚀新增
    NewCorrosion() {
      this.$router.push({
        name: 'NewHighTemperature',
        query: {
          title: '新增高温高压腐蚀模拟试验',
          titles: '新增',
          btn: 1,
          seeingBtn: true,
        },
      })
    },
    //高温腐蚀查看
    ViewCorrosion(val) {
      let dataId = val.data.id
      this.$router.push({
        name: 'HighTemperatureDetails',
        query: {
          id: dataId,
        },
      })
    },
    //高温腐蚀编辑
    EditorialCorrosion(val) {
      this.$router.push({
        name: 'NewHighTemperature',
        query: {
          title: '编辑高温高压腐蚀模拟试验',
          titles: '编辑',
          btn: 2,
          datas: val,
          seeingBtn: true,
        },
      })
    },
    //水压查看
    WaterPressureCheck(val) {
      let dataId = val.data.id
      this.$router.push({
        name: 'InquiryDetails',
        query: {
          id: dataId,
        },
      })
    },
    //水压编辑
    HydraulicEiting(val) {
      // console.log(val)
      this.$router.push({
        name: 'NewWterPressure',
        query: {
          title: '编辑水压爆破试验',
          titles: '编辑',
          btn: 2,
          datas: val,
          seeingBtn: true,
        },
      })
    },
    //水压新增
    NewWaterPressure() {
      this.$router.push({
        name: 'NewWterPressure',
        query: {
          title: '新增水压爆破试验',
          titles: '新增',
          btn: 1,
          seeingBtn: true,
        },
      })
    },
    ////////////////////////////////////////////////////////////////
    //静态批量删除
    StaticDeletes() {
      this.$confirm('此操作将永久删除, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(() => {
          //  let userid = this.tableRow.ids
          //    if(!userid || userid.length === 0){
          //    context.root.$message({
          //      message:"请勾选需要删除的用户",
          //      type:"error"
          //    })
          //    return false
          //  }
          // console.log(this.tableRow)
          experimentProjectRemove(this.tableRow).then(res => {
            if (res.data.code == 200) {
              this.$message({
                type: 'success',
                message: `${res.data.msg}`,
              })
              this.StaticQuery()
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
    //静态删除
    StaticDelete(val) {
      this.$confirm('此操作将永久删除, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(() => {
          console.log('then')
          let obj = {}
          obj.ids = [val.id]
          experimentProjectRemove(obj).then(res => {
            if (res.data.code == 200) {
              this.$message({
                type: 'success',
                message: `${res.data.msg}`,
              })
              this.StaticQuery()
            } else {
              this.$message({
                type: 'info',
                message: `${res.data.msg}`,
              })
            }
          })
          console.log('then')
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除',
          })
        })
    },

    /////////////////////////////////////////////////////////////////
    //四点批量删除
    FourPointDeletions() {
      this.$confirm('此操作将永久删除, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(() => {
          //  let userid = this.tableRow.ids
          //    if(!userid || userid.length === 0){
          //    context.root.$message({
          //      message:"请勾选需要删除的用户",
          //      type:"error"
          //    })
          //    return false
          //  }
          // console.log(this.tableRow)
          experimentProjectRemove(this.tableRow).then(res => {
            if (res.data.code == 200) {
              this.$message({
                type: 'success',
                message: `${res.data.msg}`,
              })
              this.FourPointInquiry()
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
    //四点删除
    FourPointDeletion(val) {
      this.$confirm('此操作将永久删除, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(() => {
          console.log('then')
          let obj = {}
          obj.ids = [val.id]
          experimentProjectRemove(obj).then(res => {
            if (res.data.code == 200) {
              this.$message({
                type: 'success',
                message: `${res.data.msg}`,
              })
              this.FourPointInquiry()
            } else {
              this.$message({
                type: 'info',
                message: `${res.data.msg}`,
              })
            }
          })
          console.log('then')
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除',
          })
        })
    },

    //////////////////////////////////////////////////////
    //高温批量删除
    HighTemperatureDeletes() {
      this.$confirm('此操作将永久删除, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(() => {
          //  let userid = this.tableRow.ids
          //    if(!userid || userid.length === 0){
          //    context.root.$message({
          //      message:"请勾选需要删除的用户",
          //      type:"error"
          //    })
          //    return false
          //  }
          // console.log(this.tableRow)
          experimentProjectRemove(this.tableRow).then(res => {
            if (res.data.code == 200) {
              this.$message({
                type: 'success',
                message: `${res.data.msg}`,
              })
              this.HighTemperatureQuery()
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
    //高温删除
    HighTemperatureDelete(val) {
      this.$confirm('此操作将永久删除, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(() => {
          console.log('then')
          let obj = {}
          obj.ids = [val.id]
          experimentProjectRemove(obj).then(res => {
            if (res.data.code == 200) {
              this.$message({
                type: 'success',
                message: `${res.data.msg}`,
              })
              this.HighTemperatureQuery()
            } else {
              this.$message({
                type: 'info',
                message: `${res.data.msg}`,
              })
            }
          })
          console.log('then')
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除',
          })
        })
    },

    //水压批量删除
    DeleteDatas() {
      this.$confirm('此操作将永久删除, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(() => {
          //  let userid = this.tableRow.ids
          //    if(!userid || userid.length === 0){
          //    context.root.$message({
          //      message:"请勾选需要删除的用户",
          //      type:"error"
          //    })
          //    return false
          //  }
          // console.log(this.tableRow)
          experimentProjectRemove(this.tableRow).then(res => {
            if (res.data.code == 200) {
              this.$message({
                type: 'success',
                message: `${res.data.msg}`,
              })
              this.QueryExperimentalData()
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
    //水压删除
    DeleteData(val) {
      this.$confirm('此操作将永久删除, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(() => {
          console.log('then')
          let obj = {}
          obj.ids = [val.id]
          experimentProjectRemove(obj).then(res => {
            if (res.data.code == 200) {
              this.$message({
                type: 'success',
                message: `${res.data.msg}`,
              })
              this.QueryExperimentalData()
            } else {
              this.$message({
                type: 'info',
                message: `${res.data.msg}`,
              })
            }
          })
          console.log('then')
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除',
          })
        })
    },
    //打开预览图片
    getPreview(val) {
      // this.guidePic
      //   ? (this.showViewer = true)
      //   : this.$message.info("当前没有可预览的图片");
      // console.log(val)
      this.imgarrUrl = val
      this.centerDialogVisible = true
    },
    //接受子组件关闭图片
    closes(val) {
      this.centerDialogVisible = val
    },
    nSubmit() {
      console.log('submit!')
    },
    //批量删除
    idArr(val) {
      //  console.log(val)
      this.tableRow.ids = val
    },
    //选项卡导航
    handleClick(tab, event) {
      if (this.activeName == 'first') {
        this.QueryExperimentalData()
        this.titles = this.pressureTitle
        this.formInline.productionName = ""
      } else if (this.activeName == 'second') {
        this.HighTemperatureQuery()
        this.titles = this.temperatureTitle
        this.formInline.productionName = ""
      } else if (this.activeName == 'third') {
        this.titles = this.spotTitle
        this.FourPointInquiry()
        this.formInline.productionName = ""
      } else if (this.activeName == 'fourth') {
        this.titles = this.quietTitle
        this.StaticQuery()
        this.formInline.productionName = ""
      }
    },
    //查询水压实验数据
    QueryExperimentalData() {
      this.pageNum = 1
      let obj = {
        productionName: this.formInline.productionName,
        pageNum: this.pageNum,
        pageSize: this.pageSize,
        experimentType: '1',
      }
      this.theWholeExperiment(obj)
    },
    //高温查询数据
    HighTemperatureQuery() {
      this.pageNum = 1
      let obj = {
        pageNum: this.pageNum,
        pageSize: this.pageSize,
        experimentType: '2',
        productionName: this.formInline.productionName,
      }
      this.theWholeExperiment(obj)
    },
    //四点弯曲查询数据
    FourPointInquiry() {
      this.pageNum = 1
      let obj = {
        productionName: this.formInline.productionName,
        pageNum: this.pageNum,
        pageSize: this.pageSize,
        experimentType: '3',
      }
      this.theWholeExperiment(obj)
    },
    //静态弯曲查询数据
    StaticQuery() {
      this.pageNum = 1
      let obj = {
        productionName: this.formInline.productionName,
        pageNum: this.pageNum,
        pageSize: this.pageSize,
        experimentType: '4',
      }
      this.theWholeExperiment(obj)
    },
    //获取实验室维护数据
    theWholeExperiment(obj) {
      experimentProjectList(obj).then(response => {
        console.log(response, 11111111111111111111111)
        this.tableData = response.data.rows
        this.imgarr = response.data.rows.map(item => {
          return item.sysAttachments
        })
        this.total = response.data.total
      })
    },
  },
  activated(){
       if (this.activeName == 'first') {
        this.QueryExperimentalData()
        this.titles = this.pressureTitle
      } else if (this.activeName == 'second') {
        this.HighTemperatureQuery()
        this.titles = this.temperatureTitle
      } else if (this.activeName == 'third') {
        this.titles = this.spotTitle
        this.FourPointInquiry()
      } else if (this.activeName == 'fourth') {
        this.titles = this.quietTitle
        this.StaticQuery()
      }
  }
  //       //路由首位
  //  beforeRouteEnter(to,from,next){
  //   console.log(to)
  //   console.log(from)
  //   if(from.path == "/PhysicalData/NewWterPressure"){
  //       //   next(vm=>{
  //       //   vm.activeName= "first";
  //       // })
  //       location.reload(); 
  //   }
  //   if(from.path == "/PhysicalData/NewHighTemperature"){
  //       // next(vm=>{
  //       //   vm.activeName= "second";
  //       // })
  //       location.reload(); 
  //       this.activeName= "second"
  //   }
  //    if(from.path == "/PhysicalData/FourNewPoints"){
  //       next(vm=>{
  //         vm.activeName= "third";
  //       })
  //   }
  //    if(from.path == "/PhysicalData/NewStatic"){
  //       next(vm=>{
  //         vm.activeName= "fourth";
  //       })
  //   }
  //    if(from.path == "/PhysicalData/HighTemperatureDetails"){
  //       next(vm=>{
  //         vm.activeName= "second";
  //       })
  //   }
  //    if(from.path == "/PhysicalData/BendingDetails"){
  //       next(vm=>{
  //         vm.activeName= "third";
  //       })
  //   }
  //    if(from.path ==  "/PhysicalData/StaticJump"){
  //       next(vm=>{
  //         vm.activeName= "fourth";
  //       })
  //   }
  //     next()

  //  },
}
</script>
<style lang="scss" scoped>
#TheWholeExperiment {
  padding: 10px;
}
.query-w {
  width: 120px;
}
// .over-auto {
//   height: 500px;
//   // overflow: auto;
//   overflow-y:scroll;
//    overflow-x:hidden;
// }
.material-wrap {
  width: 100%;
  margin-top: 10px;
  // border: 1px solid #000000;
}
.Navigation-layout {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
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
//先择框布局
.LayoutFirst {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
</style>