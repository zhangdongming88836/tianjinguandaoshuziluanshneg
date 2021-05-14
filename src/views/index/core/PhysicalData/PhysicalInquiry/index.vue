<template >
  <div id="TheWholeExperiment">
    <div><i>实物试验数据库</i> ><i>试验数据查询</i></div>
    <div class="material-wrap">
      <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
        <el-tab-pane label="水压爆破试验" name="first">
          <div style="padding-top: 15px">
            <el-form :inline="true" :model="formInline" class="demo-form-inline">
              <el-form-item label="规格型号" style="padding-right: 100px">
                <el-input v-model="formInline.specificationModel" placeholder="规格型号" @input="WaterPressureChange"></el-input>
              </el-form-item>
              <el-form-item label="材质">
                <el-input v-model="formInline.material" placeholder="材质" @input="WaterPressureChange"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" icon="el-icon-search" @click="QueryExperimentalData">查询</el-button>
              </el-form-item>
            </el-form>
            <div style="margin-top: 15px" class="over-auto">
              <tablem
                :titles="titles"
                :tableData="tableData"
                :total="total"
                :see="see"
                :pageSize="pageSize"
                :pageNum="pageNum"
                @page="page"
                style="margin-bottom: 10px"
              >
                <!-- <template v-slot:imgName="data"> -->
                <!-- <div>{{ data.data.sysAttachments!= null? data.data.sysAttachments[0].fileName:"" }}</div> -->
                <!-- <div v-show="true"> -->
                <!-- <div v-show="data.data.sysAttachments!= null"> -->
                <!-- <div>{{data.data.sysAttachments[0].fileName}}</div> -->
                <!-- <div v-for="item in data.data.sysAttachments" :key="item.id">{{item.fileName}}</div>
                  </div>
                </template> -->

                <template v-slot:imgName="data">
                  <div v-show="data.data.sysAttachments != null">
                    <template v-for="item in data.data.sysAttachments">
                      <div v-if="item.typeNumber == 1" :key="item.id">
                        <a style="cursor: pointer" type="text" @click="getPreview(item.fileUrl)">{{ item.fileName }}</a>
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
                  <el-button type="text" size="mini" @click="CheckTheWaterPressureDetails(data)">查看详情</el-button>
                </template>
              </tablem>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="高温高压腐蚀模拟" name="second">
          <div style="padding-top: 15px">
            <el-form :inline="true" :model="formInline" class="demo-form-inline">
              <el-form-item label="材质" style="padding-right: 0px">
                <el-input v-model="formInline.material" placeholder="材质" @input="HighTemperatureChange"></el-input>
              </el-form-item>
              <el-form-item label="试验温度">
                <el-input v-model="formInline.experimentTemperature" placeholder="试验温度" @input="HighTemperatureChange"></el-input>
              </el-form-item>
              <el-form-item label="试验时间">
                <el-input v-model="formInline.experimentTimeLength" placeholder="试验时间" @input="HighTemperatureChange"></el-input>
              </el-form-item>
              <el-form-item label="腐蚀性介质">
                <el-input v-model="formInline.corrosiveMedium" placeholder="腐蚀性介质" @input="HighTemperatureChange"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" icon="el-icon-search" @click="HighTemperatureQuery">查询</el-button>
              </el-form-item>
            </el-form>
            <div style="margin-top: 15px" class="over-auto">
              <tablem
                :titles="titles"
                :tableData="tableData"
                :total="total"
                :see="see"
                :pageSize="pageSize"
                :pageNum="pageNum"
                @page="page"
                style="margin-bottom: 10px"
              >
                <template v-slot:imgName="data">
                  <div v-show="data.data.sysAttachments != null">
                    <template v-for="item in data.data.sysAttachments">
                      <div v-if="item.typeNumber == 3" :key="item.id">
                        <a style="cursor: pointer" type="text" @click="getPreview(item.fileUrl)">{{ item.fileName }}</a>
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
                  <el-button type="text" size="mini" @click="JumpToWarm(data)">查看详情</el-button>
                </template>
              </tablem>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="四点弯曲试验" name="third">
          <div style="padding-top: 15px">
            <el-form :inline="true" :model="formInline" class="demo-form-inline">
              <el-form-item label="规格型号" style="padding-right: 100px">
                <el-input v-model="formInline.specificationModel" placeholder="规格型号" @input="FourChanges"></el-input>
              </el-form-item>
              <el-form-item label="材质">
                <el-input v-model="formInline.material" placeholder="材质" @input="FourChanges"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" icon="el-icon-search" @click="FourPointInquiry">查询</el-button>
              </el-form-item>
            </el-form>
            <div style="margin-top: 15px" class="over-auto">
              <tablem
                :titles="titles"
                :tableData="tableData"
                :total="total"
                :see="see"
                :pageSize="pageSize"
                :pageNum="pageNum"
                @page="page"
                style="margin-bottom: 10px"
              >
                <template v-slot:status="data">
                  <el-button type="text" size="mini" @click="BendJump(data)">查看详情</el-button>
                </template>
              </tablem>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="静态弯曲试验" name="fourth">
          <div style="padding-top: 15px">
            <el-form :inline="true" :model="formInline" class="demo-form-inline">
              <el-form-item label="规格型号" style="padding-right: 100px">
                <el-input v-model="formInline.specificationModel" placeholder="规格型号" @input="StaticChange"></el-input>
              </el-form-item>
              <el-form-item label="材质">
                <el-input v-model="formInline.material" placeholder="材质" @input="StaticChange"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" icon="el-icon-search" @click="StaticQuery">查询</el-button>
              </el-form-item>
            </el-form>
            <div style="margin-top: 15px" class="over-auto">
              <tablem
                :titles="titles"
                :tableData="tableData"
                :total="total"
                :see="see"
                :pageSize="pageSize"
                :pageNum="pageNum"
                @page="page"
                style="margin-bottom: 10px"
              >
                <template v-slot:status="data">
                  <el-button type="text" size="mini" @click="StaticJump(data)">查看详情</el-button>
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
</template>
<script>
import tablem from '@/components/table/index'
import { experimentProjectList, experimentProjectDetails } from '@/api/index'
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
      // showViewer: false,
      // guidePic: null, // 预览图片的地址
      //显示多选框
      see: false,
      //总页数
      total: 0,
      formInline: {
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
      //水压爆破实验表格的头部内容
      pressureTitle: [
        { lable: '案例编号', field: 'code' },
        { lable: '产品名称', field: 'productionName' },
        { lable: '规格型号', field: 'specificationModel' },
        { lable: '材质', field: 'material' },
        { lable: '爆破最大压力', field: 'blastMaxPressure' },
        { lable: '爆破失效后形貌', typeRow: 'slot', slotName: 'imgName' },
        { lable: '操作', typeRow: 'slot', slotName: 'status' },
      ],
      //高温高压腐蚀模拟表头内容
      temperatureTitle: [
        { lable: '案例编号', field: 'code' },
        { lable: '产品名称', field: 'productionName' },
        { lable: '材质', field: 'material' },
        { lable: '试验温度', field: 'experimentTemperature' },
        { lable: '试验时间', field: 'experimentTimeLength' },
        { lable: '腐蚀介质', field: 'corrosiveMedium' },
        { lable: '腐蚀速率', field: 'corrosionRate' },
        { lable: '配图', typeRow: 'slot', slotName: 'imgName' },
        { lable: '操作', typeRow: 'slot', slotName: 'status' },
      ],
      //四点弯曲实验表头内容
      spotTitle: [
        { lable: '案例编号', field: 'code' },
        { lable: '产品名称', field: 'productionName' },
        { lable: '规格型号', field: 'specificationModel' },
        { lable: '材质', field: 'material' },
        { lable: '评定结果', field: 'evaluationResults' },
        { lable: '操作', typeRow: 'slot', slotName: 'status' },
      ],
      //静态弯曲实验表头内容
      quietTitle: [
        { lable: '案例编号', field: 'code' },
        { lable: '产品名称', field: 'productionName' },
        { lable: '规格型号', field: 'specificationModel' },
        { lable: '材质', field: 'material' },
        { lable: '评定结果', field: 'evaluationResults' },
        { lable: '操作', typeRow: 'slot', slotName: 'status' },
      ],
      //公共表头
      titles: [],
      //公共表格内容
      tableData: [],
      //图片的数组
      imgarr: [],
    }
  },
  mounted() {
    // this.theWholeExperiment({
    //    pageNum:this.pageNum,
    //    pageSize:this.pageSize,
    //    experimentType: '1'
    // });
    this.handleClick()
  },
  //监听页码变化
  watch: {
    pageNum: function (newVal, oldVal) {},
  },
  methods: {
    //水压值改变搜索
    WaterPressureChange(val) {
      if (val == '') {
        this.QueryExperimentalData()
      }
    },
    //高温值改变搜索
    HighTemperatureChange(val) {
      if (val == '') {
        this.HighTemperatureQuery()
      }
    },
    //四点值改变搜索
    FourChanges(val) {
      if (val == '') {
        this.FourPointInquiry()
      }
    },
    // 静态值改变搜索
    StaticChange(val) {
      if (val == '') {
        this.StaticQuery()
      }
    },
    //当前第几页
    page(val) {
      this.pageNum = val
      console.log(val, '11111111112121')
      if (this.activeName == 'first') {
        let obj = {
          material: this.formInline.material,
          specificationModel: this.formInline.specificationModel,
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
          material: this.formInline.material,
          experimentTemperature: this.formInline.experimentTemperature,
          experimentTimeLength: this.formInline.experimentTimeLength,
          corrosiveMedium: this.formInline.corrosiveMedium,
        }
        this.theWholeExperiment(obj)
      } else if (this.activeName == 'third') {
        let obj = {
          material: this.formInline.material,
          specificationModel: this.formInline.specificationModel,
          pageNum: val,
          pageSize: this.pageSize,
          experimentType: '3',
        }
        this.theWholeExperiment(obj)
      } else if (this.activeName == 'fourth') {
        let obj = {
          material: this.formInline.material,
          specificationModel: this.formInline.specificationModel,
          pageNum: val,
          pageSize: this.pageSize,
          experimentType: '4',
        }
        this.theWholeExperiment(obj)
      }
    },
    //查看水压详情
    CheckTheWaterPressureDetails(val) {
      let dataId = val.data.id
      this.$router.push({
        name: 'InquiryDetails',
        query: {
          id: dataId,
        },
      })
    },
    /////跳转高温详情
    JumpToWarm(val) {
      let dataId = val.data.id
      this.$router.push({
        name: 'HighTemperatureDetails',
        query: {
          id: dataId,
        },
      })
    },
    //四点弯曲详情
    BendJump(val) {
      let dataId = val.data.id
      this.$router.push({
        name: 'BendingDetails',
        query: {
          id: dataId,
        },
      })
    },
    //静态弯曲详情
    StaticJump(val) {
      let dataId = val.data.id
      this.$router.push({
        name: 'StaticJump',
        query: {
          id: dataId,
        },
      })
    },
    ////////////////////////////////////////////////
    showViewerClose() {
      this.showViewer = false
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
    ////////////////////////////////////////////////////////
    nSubmit() {
      console.log('submit!')
    },
    //选项卡导航
    handleClick(tab, event) {
      if (this.activeName == 'first') {
        this.QueryExperimentalData()
        this.titles = this.pressureTitle
        this.formInline.specificationModel = ""
        this.formInline.material = ""
          this.formInline.experimentTemperature= ''
         this.formInline.experimentTimeLength= ''
         this.formInline.corrosiveMedium=''
      } else if (this.activeName == 'second') {
        this.HighTemperatureQuery()
        this.titles = this.temperatureTitle
           this.formInline.specificationModel = ""
          this.formInline.material = ""
          this.formInline.experimentTemperature= ''
         this.formInline.experimentTimeLength= ''
         this.formInline.corrosiveMedium=''
      } else if (this.activeName == 'third') {
        this.titles = this.spotTitle
        this.FourPointInquiry()
           this.formInline.specificationModel = ""
           this.formInline.material = ""
           this.formInline.experimentTemperature= ''
         this.formInline.experimentTimeLength= ''
         this.formInline.corrosiveMedium=''
      } else if (this.activeName == 'fourth') {
        this.titles = this.quietTitle
        this.StaticQuery()
          this.formInline.specificationModel = ""
          this.formInline.material = ""
           this.formInline.experimentTemperature= ''
         this.formInline.experimentTimeLength= ''
         this.formInline.corrosiveMedium=''
      }
    },
    //查询水压实验数据
    QueryExperimentalData() {
      this.pageNum = 1
      let obj = {
        material: this.formInline.material,
        specificationModel: this.formInline.specificationModel,
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
        material: this.formInline.material,
        experimentTemperature: this.formInline.experimentTemperature,
        experimentTimeLength: this.formInline.experimentTimeLength,
        corrosiveMedium: this.formInline.corrosiveMedium,
      }
      this.theWholeExperiment(obj)
    },
    //四点弯曲查询数据
    FourPointInquiry() {
      this.pageNum = 1
      let obj = {
        material: this.formInline.material,
        specificationModel: this.formInline.specificationModel,
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
        material: this.formInline.material,
        specificationModel: this.formInline.specificationModel,
        pageNum: this.pageNum,
        pageSize: this.pageSize,
        experimentType: '4',
      }
      this.theWholeExperiment(obj)
    },
    //获取实验室数据
    theWholeExperiment(obj) {
      experimentProjectList(obj).then(response => {
        console.log(response)
        this.tableData = response.data.rows
        this.imgarr = response.data.rows.map(item => {
          return item.sysAttachments
        })
        this.total = response.data.total
      })
    },
  },
  activated() {
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
  },
  //     //路由首位
  //  beforeRouteEnter(to,from,next){
  //   // console.log(to)
  //   // console.log(from)
  //   if(from.path == "/PhysicalData/InquiryDetails"){
  //       //   next(vm=>{
  //       //   vm.activeName= "first";
  //       //   vm.handleClick();
  //       // })
  //     location.reload();
  //   }
  //   if(from.path == "/PhysicalData/HighTemperatureDetails"){
  //       // next(vm=>{
  //       //   vm.activeName= "second";
  //       //   vm.handleClick();
  //       // })
  //     location.reload();

  //   }
  //    if(from.path == "/PhysicalData/BendingDetails"){
  //       // next(vm=>{
  //       //   vm.activeName= "third";
  //       //   vm.handleClick();
  //       // })
  //      location.reload();
  //   }
  //    if(from.path == "/PhysicalData/StaticJump"){
  //       // next(vm=>{
  //       //   vm.activeName= "fourth";
  //       //   vm.handleClick();
  //       // })
  //      location.reload();
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
.material-wrap {
  width: 100%;
  margin-top: 10px;
}
// .over-auto {
//   width: 100%;
//   height: 500px;
//   // overflow: auto;
//   overflow-y: scroll;
//   overflow-x: hidden;
// }
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
a {
  color: #606266;
}
</style>