<template >
  <div id="TheWholeExperiment">
    <div><i>模拟分析数据</i> ><i>模拟分析数据查询</i></div>
    <div class="material-wrap">
      <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
        <el-tab-pane :label="PrimaryDataDirectory[0].name" name="first">
          <div style="padding-top: 15px" class="over-auto">
            <div class="DynamicDisplay" v-if="MovingPicture">
              <div v-for="item in MovingPictureaArray" :key="item.id">
                <img :src="item.fileUrl" alt="" class="MovingPicture" />
              </div>
            </div>
            <div class="LayoutFirst">
              <!-- <el-radio-group v-model="SelectLevelId" @change="SingleChoice">
                <el-radio v-for="item in secondLvel" :key="item.id" :label="item.id">{{ item.name }}</el-radio>
              </el-radio-group> -->
              <div>
                <el-radio-group v-model="SelectLevelId" @change="SingleChoice">
                  <el-radio v-for="item in secondLvel" :key="item.id" @click.native.prevent="clickitem(item.id)" :label="item.id">{{
                    item.name
                  }}</el-radio>
                </el-radio-group>
              </div>
              <div class="Drop" v-if="notice">
                <el-select v-model="fluidValue" placeholder="全部软件案例资料" size="mini" @change="ThirdOrderChangeOfFluid">
                  <el-option v-for="item in fluidOption" :key="item.id" :label="item.name" :value="item.id"> </el-option>
                </el-select>
              </div>
              <el-input style="width: 250px" placeholder="请输入内容" size="mini" v-model="fluidName" class="input-with-select" @input="FluidSearch">
                <el-button slot="append" icon="el-icon-search" @click="FluidQuery"></el-button>
              </el-input>
            </div>
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
                      <div style="padding-left: 10px" :key="item.id">
                        <a v-if="item.fileType == 'pdf'" :href="item.fileUrl" target="_blank" style="cursor: pointer">{{ item.fileName }}</a>
                        <a v-else-if="item.fileType == 'jpg'" style="cursor: pointer" @click="getPreview(item.fileUrl)">{{ item.fileName }}</a>
                        <a v-else @click="Tips" style="cursor: pointer">{{ item.fileName }}</a>
                      </div>
                    </template>
                  </div>
                </template>
                <template v-slot:status="data">
                  <el-button type="text" size="mini" @click="DownloadOrBatchDownload(data)">下载</el-button>
                </template>
              </tablem>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane :label="PrimaryDataDirectory[1].name" name="second">
          <div style="padding-top: 15px" class="over-auto">
            <div class="DynamicDisplay" v-if="MovingPicture">
              <div v-for="item in MovingPictureaArray" :key="item.id">
                <img :src="item.fileUrl" alt="" class="MovingPicture" />
              </div>
            </div>
            <div class="LayoutFirst">
              <!-- <el-radio-group v-model="SelectLevelId" @change="LimitedSecondary">
                <el-radio v-for="item in LimitedSecondarydirectory" :key="item.id" :label="item.id">{{ item.name }}</el-radio>
              </el-radio-group> -->
              <div>
                <el-radio-group v-model="SelectLevelId" @change="SingleChoice">
                  <el-radio v-for="item in LimitedSecondarydirectory" :key="item.id" @click.native.prevent="LimitedClick(item.id)" :label="item.id">{{
                    item.name
                  }}</el-radio>
                </el-radio-group>
              </div>
              <div class="Drop" v-if="notice">
                <el-select v-model="LimitedValue" placeholder="全部软件案例资料" size="mini" @change="LimitedThreeLevelChange">
                  <el-option v-for="item in LimitedOption" :key="item.id" :label="item.name" :value="item.id"> </el-option>
                </el-select>
              </div>
              <el-input
                style="width: 250px"
                placeholder="请输入内容"
                size="mini"
                v-model="fluidName"
                class="input-with-select"
                @input="LimitedSearch"
              >
                <el-button slot="append" icon="el-icon-search" @click="FiniteElementInquiry"></el-button>
              </el-input>
            </div>
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
                      <div style="padding-left: 10px" :key="item.id">
                        <a v-if="item.fileType == 'pdf'" :href="item.fileUrl" target="_blank" style="cursor: pointer">{{ item.fileName }}</a>
                        <a v-else-if="item.fileType == 'jpg'" style="cursor: pointer" @click="getPreview(item.fileUrl)">{{ item.fileName }}</a>
                        <a v-else @click="Tips" style="cursor: pointer">{{ item.fileName }}</a>
                      </div>
                    </template>
                  </div>
                </template>
                <template v-slot:status="data">
                  <el-button type="text" size="mini" @click="DownloadOrBatchDownload(data)">下载</el-button>
                </template>
              </tablem>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane :label="PrimaryDataDirectory[2].name" name="third">
          <div style="padding-top: 15px" class="over-auto">
            <div class="DynamicDisplay" v-if="MovingPicture">
              <div v-for="item in MovingPictureaArray" :key="item.id">
                <img :src="item.fileUrl" alt="" class="MovingPicture" />
              </div>
            </div>
            <!-- <div class="DividingLine"></div> -->
            <div class="LayoutFirst">
              <!-- <el-radio-group v-model="SelectLevelId" @change="SecondaryDirectoryOfmMobilesecurity">
                <el-radio v-for="item in MobileSecondary" :key="item.id" :label="item.id">{{ item.name }}</el-radio>
              </el-radio-group> -->
              <div>
                <el-radio-group v-model="SelectLevelId" @change="SingleChoice">
                  <el-radio v-for="item in MobileSecondary" :key="item.id" @click.native.prevent="FlowClick(item.id)" :label="item.id">{{
                    item.name
                  }}</el-radio>
                </el-radio-group>
              </div>
              <div class="Drop" v-if="notice">
                <el-select v-model="flowValue" placeholder="全部软件案例资料" size="mini" @change="ThreeLevelchangeofFlow">
                  <el-option v-for="item in flowOption" :key="item.id" :label="item.name" :value="item.id"> </el-option>
                </el-select>
              </div>
              <el-input style="width: 250px" placeholder="请输入内容" size="mini" v-model="fluidName" class="input-with-select" @input="MobileSearch">
                <el-button slot="append" icon="el-icon-search" @click="MobileQuery"></el-button>
              </el-input>
            </div>
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
                      <div style="padding-left: 10px" :key="item.id">
                        <a v-if="item.fileType == 'pdf'" :href="item.fileUrl" target="_blank" style="cursor: pointer">{{ item.fileName }}</a>
                        <a v-else-if="item.fileType == 'jpg'" style="cursor: pointer" @click="getPreview(item.fileUrl)">{{ item.fileName }}</a>
                        <a v-else @click="Tips" style="cursor: pointer">{{ item.fileName }}</a>
                      </div>
                    </template>
                  </div>
                </template>
                <template v-slot:status="data">
                  <el-button type="text" size="mini" @click="DownloadOrBatchDownload(data)">下载</el-button>
                </template>
              </tablem>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane :label="PrimaryDataDirectory[3].name" name="fourth">
          <div style="padding-top: 15px" class="over-auto">
            <div class="LayoutFirst">
              <!-- <el-radio-group v-model="SelectLevelId" @change="ExperienceLevelASelection">
                <el-radio v-for="item in ExperienceLevelA" :key="item.id" :label="item.id">{{ item.name }}</el-radio>
              </el-radio-group> -->
              <div>
                <el-radio-group v-model="SelectLevelId" @change="SingleChoice">
                  <el-radio v-for="item in ExperienceLevelA" :key="item.id" @click.native.prevent="ExperienceClick(item.id)" :label="item.id">{{
                    item.name
                  }}</el-radio>
                </el-radio-group>
              </div>
              <el-input
                style="width: 250px"
                placeholder="请输入内容"
                size="mini"
                v-model="fluidName"
                class="input-with-select"
                @input="ExperienceSearch"
              >
                <el-button slot="append" icon="el-icon-search" @click="ExperienceInquiry"></el-button>
              </el-input>
            </div>
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
                      <div style="padding-left: 10px" :key="item.id">
                        <a v-if="item.fileType == 'pdf'" :href="item.fileUrl" target="_blank" style="cursor: pointer">{{ item.fileName }}</a>
                        <a v-else-if="item.fileType == 'jpg'" style="cursor: pointer" @click="getPreview(item.fileUrl)">{{ item.fileName }}</a>
                        <a v-else @click="Tips" style="cursor: pointer">{{ item.fileName }}</a>
                      </div>
                    </template>
                  </div>
                </template>
                <template v-slot:status="data">
                  <el-button type="text" size="mini" @click="DownloadOrBatchDownload(data)">下载</el-button>
                </template>
              </tablem>
            </div>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
    <preview :imgarrUrl="imgarrUrl" :centerDialogVisible.sync="centerDialogVisible" @closes="closes"></preview>
  </div>
</template>
<script>
import tablem from '@/components/table/index'
import {
  fadSimulationDirectoryTableParent,
  fadSimulationDirectoryTableDirectory,
  fadSimulationSimulationAnalysisDataList,
  fadSimulationSimulationanalysisdatadifList,
  fadSimulationSysAttachmentsattachments,
  download,
} from '@/api/SimulationAnalysisData'
//预览图片公共组件
import preview from '@/components/preview/index'
import jsZip from 'jszip'
export default {
  components: {
    tablem,
    preview,
  },
  data() {
    return {
      //选项卡导航
      activeName: 'first',
      //单选框
      PublicSecondary: '',
      //打开预览图片
      centerDialogVisible: false,
      //图片地址
      imgarrUrl: '',
      //显示多选框
      see: false,
      //总页数
      total: 0,
      //动图整个模块的显示隐藏
      MovingPicture: false,
      //流体模拟下拉选择框
      fluidOption: [
        {
          value: '选项1',
          label: 'Fluent',
        },
        {
          value: '选项2',
          label: 'OpenFOAM',
        },
        {
          value: '选项3',
          label: 'Comsol',
        },
        {
          value: '选项4',
          label: 'CFX',
        },
        {
          value: '选项5',
          label: '其他',
        },
      ],
      //流体模拟下拉选择框选中的值
      fluidValue: '',
      //有限下拉框
      LimitedOption: [
        {
          value: '选项1',
          label: 'Ansys',
        },
        {
          value: '选项2',
          label: 'Abaqus',
        },
        {
          value: '选项3',
          label: 'Ls-Dyna',
        },
        {
          value: '选项4',
          label: 'Comsol',
        },
        {
          value: '选项5',
          label: '其他',
        },
      ],
      //有限下拉选中值
      LimitedValue: '',
      //流动下拉框
      flowOption: [
        {
          value: '选项1',
          label: 'Olga',
        },
        {
          value: '选项2',
          label: 'Ledaflow',
        },
        {
          value: '选项3',
          label: 'Hysys',
        },
        {
          value: '选项5',
          label: '其他',
        },
      ],
      //流动下拉选中值
      flowValue: '',
      //公共下拉选择框显示隐藏
      notice: false,
      only: 1,
      //当前页数
      pageNum: 1,
      //每也条数
      pageSize: 10,
      //流体模拟表格的头部内容
      pressureTitle: [
        { lable: '名称', field: 'name' },
        { lable: '二级目录', field: 'secondLevelDirectory' },
        { lable: '三级目录', field: 'thirdLevelDirectory' },
        { lable: '附件', typeRow: 'slot', slotName: 'imgName' },
        { lable: '操作', typeRow: 'slot', slotName: 'status' },
      ],
      //有限元表头内容
      temperatureTitle: [
        { lable: '名称', field: 'name' },
        { lable: '二级目录', field: 'secondLevelDirectory' },
        { lable: '三级目录', field: 'thirdLevelDirectory' },
        { lable: '附件', typeRow: 'slot', slotName: 'imgName' },
        { lable: '操作', typeRow: 'slot', slotName: 'status' },
      ],
      //流动保障表头内容
      spotTitle: [
        { lable: '名称', field: 'name' },
        { lable: '二级目录', field: 'secondLevelDirectory' },
        { lable: '三级目录', field: 'thirdLevelDirectory' },
        { lable: '附件', typeRow: 'slot', slotName: 'imgName' },
        { lable: '操作', typeRow: 'slot', slotName: 'status' },
      ],
      //经验分析表头内容
      quietTitle: [
        { lable: '名称', field: 'name' },
        { lable: '二级目录', field: 'secondLevelDirectory' },
        { lable: '三级目录', field: 'thirdLevelDirectory' },
        { lable: '附件', typeRow: 'slot', slotName: 'imgName' },
        { lable: '操作', typeRow: 'slot', slotName: 'status' },
      ],
      //公共表头
      titles: [],
      //公共表格内容
      tableData: [
        {
          secondLevelDirectory: '2016-05-02',
          name: '王小虎',
          thirdLevelDirectory: '上海市普陀区金沙江路 1518 弄',
        },
        {
          secondLevelDirectory: '2016-05-04',
          name: '王小虎',
          thirdLevelDirectory: '上海市普陀区金沙江路 1517 弄',
        },
        {
          secondLevelDirectory: '2016-05-01',
          name: '王小虎',
          thirdLevelDirectory: '上海市普陀区金沙江路 1519 弄',
        },
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
      //保存文件的数组
      sysAttachments: [],
    }
  },
  mounted() {
    this.handleClick()
  },
  //监听页码变化
  watch: {
    pageNum: function (newVal, oldVal) {
      this.handleClick()
    },
  },
  methods: {
    /*******************流体单选框************************ */
    clickitem(e) {
      console.log(e)
      this.fluidValue = ''
      //  e === this.SelectLevelId ? this.SelectLevelId = '' : this.SelectLevelId = e
      if (e === this.SelectLevelId) {
        this.pageNum = 1
        let obj = {
          firstLevelDirectoryId: this.PrimaryDataDirectory[0].id,
          name: this.fluidName,
          secondLevelDirectoryId: '',
          thirdLevelDirectoryId: this.fluidValue,
          pageNum: this.pageNum,
          pageSize: this.pageSize,
        }
        this.simulationAnalysis(obj)
        this.SelectLevelId = ''
      } else {
        this.SelectLevelId = e
        this.pageNum = 1
        let obj = {
          firstLevelDirectoryId: this.PrimaryDataDirectory[0].id,
          name: this.fluidName,
          secondLevelDirectoryId: this.SelectLevelId,
          thirdLevelDirectoryId: this.fluidValue,
          pageNum: this.pageNum,
          pageSize: this.pageSize,
        }
        this.simulationAnalysis(obj)
      }
      if (e == '1369811618714492130') {
        this.notice = true
        fadSimulationDirectoryTableDirectory('1369811618714492130').then(response => {
          //  console.log( response)
          this.fluidOption = response.data.data
        })
      } else {
        this.notice = false
      }
    },
    /********************************************* */
    /************有限单选框************** */
    LimitedClick(e) {
      this.LimitedValue = ''
      if (e === this.SelectLevelId) {
        this.pageNum = 1
        let obj = {
          firstLevelDirectoryId: this.PrimaryDataDirectory[1].id,
          name: this.fluidName,
          secondLevelDirectoryId: '',
          thirdLevelDirectoryId: this.fluidValue,
          pageNum: this.pageNum,
          pageSize: this.pageSize,
        }
        this.simulationAnalysis(obj)
        this.SelectLevelId = ''
      } else {
        this.SelectLevelId = e
        this.pageNum = 1
        let obj = {
          firstLevelDirectoryId: this.PrimaryDataDirectory[1].id,
          name: this.fluidName,
          secondLevelDirectoryId: this.SelectLevelId,
          thirdLevelDirectoryId: this.fluidValue,
          pageNum: this.pageNum,
          pageSize: this.pageSize,
        }
        this.simulationAnalysis(obj)
      }
      if (e == '1369811618714492230') {
        this.notice = true
        fadSimulationDirectoryTableDirectory('1369811618714492230').then(response => {
          //  console.log( response)
          this.LimitedOption = response.data.data
        })
      } else {
        this.notice = false
      }
    },

    /************************** */
    /*********************流动单选************************* */
    FlowClick(e) {
      this.flowValue = ''
      if (e === this.SelectLevelId) {
        this.pageNum = 1
        let obj = {
          firstLevelDirectoryId: this.PrimaryDataDirectory[2].id,
          name: this.fluidName,
          secondLevelDirectoryId: '',
          thirdLevelDirectoryId: this.fluidValue,
          pageNum: this.pageNum,
          pageSize: this.pageSize,
        }
        this.simulationAnalysis(obj)
        this.SelectLevelId = ''
      } else {
        this.SelectLevelId = e
        this.pageNum = 1
        let obj = {
          firstLevelDirectoryId: this.PrimaryDataDirectory[2].id,
          name: this.fluidName,
          secondLevelDirectoryId: this.SelectLevelId,
          thirdLevelDirectoryId: this.fluidValue,
          pageNum: this.pageNum,
          pageSize: this.pageSize,
        }
        this.simulationAnalysis(obj)
      }
      if (e == '1369811618714492330') {
        this.notice = true
        fadSimulationDirectoryTableDirectory('1369811618714492330').then(response => {
          //  console.log( response)
          this.flowOption = response.data.data
        })
      } else {
        this.notice = false
      }
    },
    /******************************************** */
    /****************经验分析***************** */
    ExperienceClick(e) {
      this.fluidValue = ''
      if (e === this.SelectLevelId) {
        this.pageNum = 1
        let obj = {
          firstLevelDirectoryId: this.PrimaryDataDirectory[3].id,
          name: this.fluidName,
          secondLevelDirectoryId: '',
          thirdLevelDirectoryId: this.fluidValue,
          pageNum: this.pageNum,
          pageSize: this.pageSize,
        }
        this.simulationAnalysis(obj)
        this.SelectLevelId = ''
      } else {
        this.SelectLevelId = e
        this.pageNum = 1
        let obj = {
          firstLevelDirectoryId: this.PrimaryDataDirectory[3].id,
          name: this.fluidName,
          secondLevelDirectoryId: this.SelectLevelId,
          thirdLevelDirectoryId: this.fluidValue,
          pageNum: this.pageNum,
          pageSize: this.pageSize,
        }
        this.simulationAnalysis(obj)
      }
    },
    /******************************* */
    //输入框为空的时候流体查询
    FluidSearch(val) {
      if (val == '') {
        this.FluidQuery()
      }
    },
    //输入框为空的时候有限查询
    LimitedSearch(val) {
      if (val == '') {
        this.FiniteElementInquiry()
      }
    },
    //输入框为空的时候流动查询
    MobileSearch(val) {
      if (val == '') {
        this.MobileQuery()
      }
    },
    //输入框为空的时候经验查询
    ExperienceSearch(val) {
      if (val == '') {
        this.ExperienceInquiry()
      }
    },
    /******************************************************** */
    //下载或批量下载
    DownloadOrBatchDownload(val) {
      
        if(val.data.sysAttachments.length >1){
          fadSimulationSysAttachmentsattachments(val.data.id).then(res => {
       // console.log(res.data.data)
          let link = document.createElement('a')
          link.style.display = 'none'
          link.href = `http://10.79.34.15:8073/fad/promotion/downLoadFiles/${val.data.id}`
           link.setAttribute('download', 'exemple') // 自定义下载文件名（如exemple.txt）
          // link.download=res.data.data[0].fileName
          document.body.appendChild(link)
          link.click()
      })
      }else{
        let fileName = decodeURI(val.data.sysAttachments[0].fileName)
        let link = document.createElement('a')
          link.style.display = 'none'
          link.href = val.data.sysAttachments[0].fileUrl 
           //link.setAttribute('download', 'exemple') // 自定义下载文件名（如exemple.txt）
           link.download=fileName
          document.body.appendChild(link)
          link.click()
      }
      // fadSimulationSysAttachmentsattachments(val.data.id).then(res => {
      //   console.log(res.data.data)
      //   if (res.data.data.length == 0) {
      //     this.$message({
      //       message: '没有下载的附件',
      //       type: 'warning',
      //     })
      //   } else if (res.data.data.length == 1) {
      //     let url = res.data.data[0].fileUrl.replace('http://10.72.66.27:9999', '') // console.log(url)
      //     let fileName = res.data.data[0].fileName
      //     console.log(fileName)
      //     if (window.navigator && window.navigator.msSaveOrOpenBlob) {
      //       download(url).then(res => {
      //         console.log(res.data)
      //         let blob = new Blob([res.data], { type: 'text/plain; charset=UTF-8' })
      //         window.navigator.msSaveBlob(blob, fileName)
      //       })
      //     } else {
      //       console.log('chrome')
      //       var eleLink = document.createElement('a')
      //       eleLink.download = fileName
      //       eleLink.style.display = 'none' // 下载内容转变成blob地址
      //       eleLink.href = res.data.data[0].fileUrl // 触发点击
      //       document.body.appendChild(eleLink)
      //       eleLink.click() // 然后移除
      //       document.body.removeChild(eleLink)
      //     }
      //   } else {
      //     let zip = new jsZip()
      //     let fileName
      //     res.data.data.forEach(item => {
      //       console.log(item, 'ITEM')
      //       // fileName = item.fileUrl.slice(item.fileUrl.lastIndexOf('/') + 1)
      //       fileName = item.fileName
      //       let url = item.fileUrl.replace('http://10.72.66.27:9999', '')
      //       let promise = download(url).then(res => {
      //         // console.log(res)
      //         return res.data
      //       })
      //       console.log('111111')
      //       zip.file(fileName, promise)
      //       console.log('222222')
      //     })
      //     zip.generateAsync({ type: 'blob' }).then(result => {
      //       if (window.navigator && window.navigator.msSaveOrOpenBlob) {
      //         // 兼容IE/Edge
      //         window.navigator.msSaveOrOpenBlob(result, fileName + '.zip')
      //       } else {
      //         // 下载的文件名
      //         var filename = fileName + '.zip' // 创建隐藏的可下载链接
      //         var eleLink = document.createElement('a')
      //         eleLink.download = filename
      //         eleLink.style.display = 'none' // 下载内容转变成blob地址
      //         eleLink.href = URL.createObjectURL(result) // 触发点击
      //         document.body.appendChild(eleLink)
      //         eleLink.click() // 然后移除
      //         document.body.removeChild(eleLink)
      //       }
      //     })
      //   }
      // })
    },
    /////////////////////////////////////
    //流体单选事件二级目录
    SingleChoice(val) {
      // console.log(val)
      this.SelectLevelId = val
      this.FluidQuery()
      //调用货期三级API
      if (val == '1369811618714492130') {
        this.notice = true
        fadSimulationDirectoryTableDirectory('1369811618714492130').then(response => {
          //  console.log( response)
          this.fluidOption = response.data.data
        })
      } else {
        this.notice = false
      }
    },
    //流体三级目录改变值触发
    ThirdOrderChangeOfFluid(val) {
      this.FluidQuery()
    },
    //有限单选事件二级目录
    LimitedSecondary(val) {
      console.log(val)
      this.SelectLevelId = val
      this.FluidQuery()
      //调用货期三级API
      if (val == '1369811618714492230') {
        this.notice = true
        fadSimulationDirectoryTableDirectory('1369811618714492230').then(response => {
          //  console.log( response)
          this.LimitedOption = response.data.data
        })
      } else {
        this.notice = false
      }
    },
    //有限元三级目录改变触发
    LimitedThreeLevelChange(val) {
      console.log(val)
      this.FiniteElementInquiry()
    },
    //流动保障二级目录
    SecondaryDirectoryOfmMobilesecurity(val) {
      console.log(val)
      this.SelectLevelId = val
      this.FluidQuery()
      //调用货期三级API
      if (val == '1369811618714492330') {
        this.notice = true
        fadSimulationDirectoryTableDirectory('1369811618714492330').then(response => {
          //  console.log( response)
          this.flowOption = response.data.data
        })
      } else {
        this.notice = false
      }
    },
    //流动三级目录改变触发
    ThreeLevelchangeofFlow(val) {
      this.MobileQuery()
    },
    //经验二级目录选中
    ExperienceLevelASelection(val) {
      console.log(val)
      this.SelectLevelId = val
      this.ExperienceInquiry()
    },
    //每页多少条
    page(val) {
      if (this.activeName == 'first') {
        let obj = {
          firstLevelDirectoryId: this.PrimaryDataDirectory[0].id,
          name: this.fluidName,
          secondLevelDirectoryId: this.SelectLevelId,
          thirdLevelDirectoryId: this.fluidValue,
          pageNum: val,
          pageSize: this.pageSize,
        }
        this.simulationAnalysis(obj)
      } else if (this.activeName == 'second') {
        let obj = {
          firstLevelDirectoryId: this.PrimaryDataDirectory[1].id,
          name: this.fluidName,
          secondLevelDirectoryId: this.SelectLevelId,
          thirdLevelDirectoryId: this.fluidValue,
          pageNum: val,
          pageSize: this.pageSize,
        }
        this.simulationAnalysis(obj)
      } else if (this.activeName == 'third') {
        let obj = {
          firstLevelDirectoryId: this.PrimaryDataDirectory[2].id,
          name: this.fluidName,
          secondLevelDirectoryId: this.SelectLevelId,
          thirdLevelDirectoryId: this.fluidValue,
          pageNum: val,
          pageSize: this.pageSize,
        }
        this.simulationAnalysis(obj)
      } else if (this.activeName == 'fourth') {
        let obj = {
          firstLevelDirectoryId: this.PrimaryDataDirectory[3].id,
          name: this.fluidName,
          secondLevelDirectoryId: this.SelectLevelId,
          thirdLevelDirectoryId: this.fluidValue,
          pageNum: val,
          pageSize: this.pageSize,
        }
        this.simulationAnalysis(obj)
      }
    },
    nSubmit() {
      console.log('submit!')
    },
    //不是pdf的提示
    Tips() {
      this.$message({
        showClose: true,
        message: '该附件不支持在线查看，请下载查看',
      })
    },
    // //打开预览图片
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
    //选项卡导航
    async handleClick(tab, event) {
      if (this.activeName == 'first') {
        ;(this.SelectLevelId = ''), (this.titles = this.pressureTitle)
        this.notice = false
        // await fadSimulationDirectoryTableParent().then(response => {
        //   // console.log(response)
        //   this.PrimaryDataDirectory = response.data.data
        // })
        await fadSimulationDirectoryTableDirectory(this.PrimaryDataDirectory[0].id).then(response => {
          // console.log('response=>', response)
          this.secondLvel = response.data.data
        })
        await fadSimulationSimulationanalysisdatadifList({ firstLevelDirectoryId: this.PrimaryDataDirectory[0].id }).then(res => {
          console.log(res, 111111111111111)
          this.MovingPictureaArray = res.data.data
          if (res.data.data.length < 1) {
            this.MovingPicture = false
          } else {
            this.MovingPicture = true
          }
        })
        await this.FluidQuery()
      } else if (this.activeName == 'second') {
        ;(this.SelectLevelId = ''), (this.titles = this.temperatureTitle)
        this.notice = false
        // await fadSimulationDirectoryTableParent().then(response => {
        //    console.log(response)
        //   this.PrimaryDataDirectory = response.data.data
        // })
        await fadSimulationDirectoryTableDirectory(this.PrimaryDataDirectory[1].id).then(response => {
          //  console.log('response=>', response)
          this.LimitedSecondarydirectory = response.data.data
        })
        await fadSimulationSimulationanalysisdatadifList({ firstLevelDirectoryId: this.PrimaryDataDirectory[1].id }).then(res => {
          console.log(res, 111111111111111)
          this.MovingPictureaArray = res.data.data
          if (res.data.data.length < 1) {
            this.MovingPicture = false
          } else {
            this.MovingPicture = true
          }
        })
        await this.FiniteElementInquiry()
      } else if (this.activeName == 'third') {
        ;(this.SelectLevelId = ''), (this.titles = this.spotTitle)
        this.notice = false
        await fadSimulationDirectoryTableDirectory(this.PrimaryDataDirectory[2].id).then(response => {
          console.log('response=>', response)
          this.MobileSecondary = response.data.data
        })
        await fadSimulationSimulationanalysisdatadifList({ firstLevelDirectoryId: this.PrimaryDataDirectory[2].id }).then(res => {
          console.log(res, 111111111111111)
          this.MovingPictureaArray = res.data.data
          if (res.data.data.length < 1) {
            this.MovingPicture = false
          } else {
            this.MovingPicture = true
          }
        })
        await this.MobileQuery()
      } else if (this.activeName == 'fourth') {
        ;(this.SelectLevelId = ''), (this.titles = this.quietTitle)
        await fadSimulationDirectoryTableDirectory(this.PrimaryDataDirectory[3].id).then(response => {
          console.log('response=>', response)
          this.ExperienceLevelA = response.data.data
        })
        await this.ExperienceInquiry()
      }
    },
    //流体模拟查询
    FluidQuery() {
      this.pageNum = 1
      let obj = {
        firstLevelDirectoryId: this.PrimaryDataDirectory[0].id,
        name: this.fluidName,
        secondLevelDirectoryId: this.SelectLevelId,
        thirdLevelDirectoryId: this.fluidValue,
        pageNum: this.pageNum,
        pageSize: this.pageSize,
      }
      this.simulationAnalysis(obj)
    },
    //有限元分析查询
    FiniteElementInquiry() {
      this.pageNum = 1
      let obj = {
        firstLevelDirectoryId: this.PrimaryDataDirectory[1].id,
        name: this.fluidName,
        secondLevelDirectoryId: this.SelectLevelId,
        thirdLevelDirectoryId: this.LimitedValue,
        pageNum: this.pageNum,
        pageSize: this.pageSize,
      }
      this.simulationAnalysis(obj)
    },
    //流动查询
    MobileQuery() {
      this.pageNum = 1
      let obj = {
        firstLevelDirectoryId: this.PrimaryDataDirectory[2].id,
        name: this.fluidName,
        secondLevelDirectoryId: this.SelectLevelId,
        thirdLevelDirectoryId: this.flowValue,
        pageNum: this.pageNum,
        pageSize: this.pageSize,
      }
      this.simulationAnalysis(obj)
    },
    //经验查询
    ExperienceInquiry() {
      this.pageNum = 1
      let obj = {
        firstLevelDirectoryId: this.PrimaryDataDirectory[3].id,
        name: this.fluidName,
        secondLevelDirectoryId: this.SelectLevelId,
        thirdLevelDirectoryId: this.fluidValue,
        pageNum: this.pageNum,
        pageSize: this.pageSize,
      }
      this.simulationAnalysis(obj)
    },
    //获取列表数据的api公共
    simulationAnalysis(obj) {
      fadSimulationSimulationAnalysisDataList(obj).then(response => {
        // console.log(response)
        this.total = response.data.total
        this.tableData = response.data.rows
        this.sysAttachments = response.data.rows.map(item => {
          return item.sysAttachments
        })
      })
    },
  },
  async created() {
    // this.GetFirstLevelDirectory()
    await fadSimulationDirectoryTableParent().then(response => {
      // console.log(response)
      this.PrimaryDataDirectory = response.data.data
    })
    await fadSimulationDirectoryTableDirectory(this.PrimaryDataDirectory[0].id).then(response => {
      // console.log('response=>', response)
      this.secondLvel = response.data.data
    })
    await this.FluidQuery()
    await fadSimulationSimulationanalysisdatadifList({ firstLevelDirectoryId: this.PrimaryDataDirectory[0].id }).then(res => {
      console.log(res, 111111111111111)
      this.MovingPictureaArray = res.data.data
      if (res.data.data.length < 1) {
        this.MovingPicture = false
      } else {
        this.MovingPicture = true
      }
    })
    // await fadSimulationDirectoryTableDirectory(this.PrimaryDataDirectory[0].id).then(response => {
    //   console.log('response=>', response)
    //   this.secondLvel = response.data.data
    // })
  },
  activated() {
    if (this.activeName == 'first') {
      this.titles = this.pressureTitle
      this.FluidQuery()
      fadSimulationSimulationanalysisdatadifList({ firstLevelDirectoryId: this.PrimaryDataDirectory[0].id }).then(res => {
        console.log(res, 111111111111111)
        this.MovingPictureaArray = res.data.data
        if (res.data.data.length < 1) {
          this.MovingPicture = false
        } else {
          this.MovingPicture = true
        }
      })
    } else if (this.activeName == 'second') {
      this.titles = this.temperatureTitle
      this.FiniteElementInquiry()
      fadSimulationSimulationanalysisdatadifList({ firstLevelDirectoryId: this.PrimaryDataDirectory[0].id }).then(res => {
        console.log(res, 111111111111111)
        this.MovingPictureaArray = res.data.data
        if (res.data.data.length < 1) {
          this.MovingPicture = false
        } else {
          this.MovingPicture = true
        }
      })
    } else if (this.activeName == 'third') {
      this.titles = this.spotTitle
      this.MobileQuery()
      fadSimulationSimulationanalysisdatadifList({ firstLevelDirectoryId: this.PrimaryDataDirectory[0].id }).then(res => {
        console.log(res, 111111111111111)
        this.MovingPictureaArray = res.data.data
        if (res.data.data.length < 1) {
          this.MovingPicture = false
        } else {
          this.MovingPicture = true
        }
      })
    } else if (this.activeName == 'fourth') {
      this.titles = this.quietTitle
      this.ExperienceInquiry()
      fadSimulationSimulationanalysisdatadifList({ firstLevelDirectoryId: this.PrimaryDataDirectory[0].id }).then(res => {
        console.log(res, 111111111111111)
        this.MovingPictureaArray = res.data.data
        if (res.data.data.length < 1) {
          this.MovingPicture = false
        } else {
          this.MovingPicture = true
        }
      })
    }
  },
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
  margin-left: -500px;
}
.MovingPicture {
  width: 350px;
  height: 252px;
  margin: 5px 5px;
  background-color: #ffffff;
  border-radius: 8px;
  border: solid 1px #707070;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  -moz-box-sizing: border-box;
  -webkit-box-sizing: border-box;
  -o-box-sizing: border-box;
  -ms-box-sizing: border-box;
}
// .over-auto {
//   width: 100%;
//   height: 500px;
//   // overflow: auto;
//   overflow-y: scroll;
//   overflow-x: hidden;
// }
.DividingLine {
  width: 100%;
  height: 1px;
  background-color: #cccccc;
}
a {
  color: #606266;
}
</style>