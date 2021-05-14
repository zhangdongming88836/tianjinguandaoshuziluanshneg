<template >
  <div id="TheWholeExperiment">
    <div><i>模拟分析数据</i> ><i>模拟分析数据维护</i></div>
    <div class="material-wrap">
      <div>
        <div>
          <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
            <el-tab-pane :label="PrimaryDataDirectory[0].name" name="first">
              <div style="padding-top: 15px" class="over-auto">
                <div class="LayoutLocation">
                  <div></div>
                  <div style="margin-right: 10px; margin-bottom: 20px">
                    <el-upload
                      class="upload-demo"
                      action="/oss/upload/csp/uploadMaterial"
                      :on-preview="handlePreview"
                      :on-remove="handleRemove"
                      :on-success="DynamicMapupload"
                      :file-list="fileList"
                      :show-file-list="false"
                      list-type="picture"
                      :before-upload="beforeAvatarUpload"
                    >
                      <el-button size="small" type="primary" icon="el-icon-plus">新增动图</el-button>
                    </el-upload>
                  </div>
                </div>
                <div class="DynamicDisplay" v-if="MovingPicture">
                  <template v-for="item in MovingPictureaArray">
                    <div :key="item.id" class="image-div" @click="DeleteTheDynamicGraphPermanently(item.id)">
                      <img :src="item.fileUrl" alt="" class="MovingPicture" />
                      <div class="image-mask">
                        <img src="../../../../../assets/sc.png" alt="" class="iconsc" />
                      </div>
                    </div>
                  </template>
                </div>
                <div class="DividingLine"></div>
                <div class="LayoutFirst">
                  <!-- <el-radio-group v-model="SelectLevelId" @change="SingleChoice">
                    <div v-for="item in secondLvel" :key="item.id"  style="display: inline-block; padding-left:10px;">
                    <el-radio :label="item.id">{{ item.name }}</el-radio>
                   </div>
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
                  <div class="MaintainSearchh">
                    <el-input
                      style="width: 250px"
                      placeholder="请输入内容"
                      size="mini"
                      v-model="fluidName"
                      class="input-with-select"
                      @input="FluidSearch"
                    >
                      <el-button slot="append" icon="el-icon-search" @click="FluidQuery"></el-button>
                    </el-input>
                  </div>
                  <div>
                    <el-button type="success" icon="el-icon-plus" size="mini" @click="FluidAddition">新增</el-button>
                    <el-button type="danger" icon="el-icon-delete" size="mini" @click="FluidAllDelete">批量删除</el-button>
                  </div>
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
                    @idArr="idArr"
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
                      <el-button type="text" size="mini" @click="FluidEditing(data)">编辑</el-button>
                      <el-button type="text" size="mini" @click="FluidDelete(data)">删除</el-button>
                      <el-button type="text" size="mini" @click="DownloadOrBatchDownload(data)">下载</el-button>
                    </template>
                  </tablem>
                </div>
              </div>
            </el-tab-pane>
            <el-tab-pane :label="PrimaryDataDirectory[1].name" name="second">
              <div style="padding-top: 15px" class="over-auto">
                <div class="LayoutLocation">
                  <div></div>
                  <div style="margin-right: 10px; margin-bottom: 20px">
                    <el-upload
                      class="upload-demo"
                      action="http://10.72.66.27:9090/oss/upload/csp/uploadMaterial"
                      :on-preview="handlePreview"
                      :on-remove="handleRemove"
                      :on-success="AddLimitedmotionPicture"
                      :file-list="fileList"
                      :show-file-list="false"
                      list-type="picture"
                      :before-upload="beforeAvatarUpload"
                    >
                      <el-button size="small" type="primary" icon="el-icon-plus">新增动图</el-button>
                    </el-upload>
                  </div>
                </div>
                <div class="DynamicDisplay" v-if="MovingPicture">
                  <template v-for="item in MovingPictureaArray">
                    <div :key="item.id" class="image-div" @click="DeleteTheDynamicGraphPermanentlys(item.id)">
                      <img :src="item.fileUrl" alt="" class="MovingPicture" />
                      <div class="image-mask">
                        <img src="../../../../../assets/sc.png" alt="" class="iconsc" />
                      </div>
                    </div>
                  </template>
                </div>
                <div class="DividingLine"></div>
                <div class="LayoutFirst">
                  <!-- <el-radio-group v-model="SelectLevelId" @change="LimitedSecondary">
                    <el-radio v-for="item in LimitedSecondarydirectory" :key="item.id" :label="item.id">{{ item.name }}</el-radio>
                  </el-radio-group> -->
                  <div>
                    <el-radio-group v-model="SelectLevelId" @change="SingleChoice">
                      <el-radio
                        v-for="item in LimitedSecondarydirectory"
                        :key="item.id"
                        @click.native.prevent="LimitedClick(item.id)"
                        :label="item.id"
                        >{{ item.name }}</el-radio
                      >
                    </el-radio-group>
                  </div>
                  <div class="Drop" v-if="notice">
                    <el-select v-model="LimitedValue" placeholder="全部软件案例资料" size="mini" @change="LimitedThreeLevelChange">
                      <el-option v-for="item in LimitedOption" :key="item.id" :label="item.name" :value="item.id"> </el-option>
                    </el-select>
                  </div>
                  <div class="MaintainSearchh">
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
                  <div>
                    <el-button type="success" icon="el-icon-plus" size="mini" @click="LimitedAddition">新增</el-button>
                    <el-button type="danger" icon="el-icon-delete" size="mini" @click="LimitedTotalDeletion">批量删除</el-button>
                  </div>
                </div>
                <div style="margin-top: 15px" class="over-auto">
                  <tablem
                    :titles="titles"
                    :tableData="tableData"
                    :total="total"
                    :see="see"
                    :pageSize="pageSize"
                    @page="page"
                    @idArr="idArr"
                    :pageNum="pageNum"
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
                      <el-button type="text" size="mini" @click="LimitedEdition(data)">编辑</el-button>
                      <el-button type="text" size="mini" @click="LimitedDeletion(data)">删除</el-button>
                      <el-button type="text" size="mini" @click="DownloadOrBatchDownload(data)">下载 </el-button>
                    </template>
                  </tablem>
                </div>
              </div>
            </el-tab-pane>
            <el-tab-pane :label="PrimaryDataDirectory[2].name" name="third">
              <div style="padding-top: 15px" class="over-auto">
                <div class="LayoutLocation">
                  <div></div>
                  <div style="margin-right: 10px; margin-bottom: 20px">
                    <el-upload
                      class="upload-demo"
                      action="http://10.72.66.27:9090/oss/upload/csp/uploadMaterial"
                      :on-preview="handlePreview"
                      :on-remove="handleRemove"
                      :on-success="FlowMapAdding"
                      :file-list="fileList"
                      :show-file-list="false"
                      list-type="picture"
                      :before-upload="beforeAvatarUpload"
                    >
                      <el-button size="small" type="primary" icon="el-icon-plus">新增动图</el-button>
                    </el-upload>
                  </div>
                </div>
                <div class="DynamicDisplay" v-if="MovingPicture">
                  <template v-for="item in MovingPictureaArray">
                    <div :key="item.id" class="image-div" @click="DeleteTheDynamicGraphPermanentlya(item.id)">
                      <img :src="item.fileUrl" alt="" class="MovingPicture" />
                      <div class="image-mask">
                        <img src="../../../../../assets/sc.png" alt="" class="iconsc" />
                      </div>
                    </div>
                  </template>
                </div>
                <div class="DividingLine"></div>
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
                  <div class="MaintainSearchh">
                    <el-input
                      style="width: 250px"
                      placeholder="请输入内容"
                      size="mini"
                      v-model="fluidName"
                      class="input-with-select"
                      @input="MobileSearch"
                    >
                      <el-button slot="append" icon="el-icon-search" @click="MobileQuery"></el-button>
                    </el-input>
                  </div>
                  <div>
                    <el-button type="success" icon="el-icon-plus" size="mini" @click="NewFlows">新增</el-button>
                    <el-button type="danger" icon="el-icon-delete" size="mini" @click="FlowAllDelete">批量删除</el-button>
                  </div>
                </div>
                <div style="margin-top: 15px" class="over-auto">
                  <tablem
                    :titles="titles"
                    :tableData="tableData"
                    :total="total"
                    :see="see"
                    :pageSize="pageSize"
                    @page="page"
                    @idArr="idArr"
                    :pageNum="pageNum"
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
                      <el-button type="text" size="mini" @click="MobileEditing(data)">编辑</el-button>
                      <el-button type="text" size="mini" @click="FlowDelete(data)">删除</el-button>
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
                  <div style="margin-right: -30%">
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
                  <div>
                    <el-button type="success" icon="el-icon-plus" size="mini" @click="NewExperiences">新增</el-button>
                    <el-button type="danger" icon="el-icon-delete" size="mini" @click="ExperienceAllDeletion">批量删除</el-button>
                  </div>
                </div>
                <div style="margin-top: 15px" class="over-auto">
                  <tablem
                    :titles="titles"
                    :tableData="tableData"
                    :total="total"
                    :see="see"
                    :pageSize="pageSize"
                    @page="page"
                    @idArr="idArr"
                    :pageNum="pageNum"
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
                      <el-button type="text" size="mini" @click="ExperienceEditor(data)">编辑</el-button>
                      <el-button type="text" size="mini" @click="ExperienceDeletion(data)">删除</el-button>
                      <el-button type="text" size="mini" @click="DownloadOrBatchDownload(data)">下载</el-button>
                    </template>
                  </tablem>
                </div>
              </div>
            </el-tab-pane>
          </el-tabs>
        </div>
      </div>
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
  fadSimulationSimulationAnalysisDataSave,
  fadSimulationSimulationAnalysisDataRemove,
  fadSimulationSysAttachmentsSave,
  fadSimulationSysAttachmentsRemove,
  fadSimulationSysAttachmentsattachments,
  download,
  fileDownLoad,
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
      ////////////////////////////////////////////
      //打开预览图片
      centerDialogVisible: false,
      //图片地址
      imgarrUrl: '',
      ////////////////////////////////////////////
      //选项卡导航
      activeName: 'first',
      //动图按钮显示隐藏
      MovingPicture: true,
      //动图整个模块的显示隐藏
      find: 0,
      //单选框
      PublicSecondary: '',
      //显示多选框
      see: true,
      //总页数
      total: 0,
      //流体模拟下拉选择框
      fluidOption: [],
      //流体模拟下拉选择框选中的值
      fluidValue: '',
      //有限下拉框
      LimitedOption: [],
      //有限下拉选中值
      LimitedValue: '',
      //流动下拉框
      flowOption: [],
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
        { lable: '创建时间', field: 'createTime' },
        { lable: '创建人', field: 'createByName' },
        { lable: '附件', typeRow: 'slot', slotName: 'imgName' },
        { lable: '操作', typeRow: 'slot', slotName: 'status' },
      ],
      //有限元表头内容
      temperatureTitle: [
        { lable: '名称', field: 'name' },
        { lable: '二级目录', field: 'secondLevelDirectory' },
        { lable: '三级目录', field: 'thirdLevelDirectory' },
        { lable: '创建时间', field: 'createTime' },
        { lable: '创建人', field: 'createByName' },
        { lable: '附件', typeRow: 'slot', slotName: 'imgName' },
        { lable: '操作', typeRow: 'slot', slotName: 'status' },
      ],
      //流动保障表头内容
      spotTitle: [
        { lable: '名称', field: 'name' },
        { lable: '二级目录', field: 'secondLevelDirectory' },
        { lable: '三级目录', field: 'thirdLevelDirectory' },
        { lable: '创建时间', field: 'createTime' },
        { lable: '创建人', field: 'createByName' },
        { lable: '附件', typeRow: 'slot', slotName: 'imgName' },
        { lable: '操作', typeRow: 'slot', slotName: 'status' },
      ],
      //经验分析表头内容
      quietTitle: [
        { lable: '名称', field: 'name' },
        { lable: '二级目录', field: 'secondLevelDirectory' },
        { lable: '三级目录', field: 'thirdLevelDirectory' },
        { lable: '创建时间', field: 'createTime' },
        { lable: '创建人', field: 'createByName' },
        { lable: '附件', typeRow: 'slot', slotName: 'imgName' },
        { lable: '操作', typeRow: 'slot', slotName: 'status' },
      ],
      //公共表头
      titles: [],
      //公共表格内容
      tableData: [],
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
  mounted() {
    this.handleClick()
  },
  //监听页码变化
  // watch: {
  //   pageNum: function (newVal, oldVal) {
  //     this.handleClick()
  //   },
  // },
  methods: {
    /*******************流体单选框************************ */
    clickitem(e) {
      this.fluidValue = ''
      console.log(e)
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
    ///////////////下载////////////////////
    //流体下载
    FluidDownload(val) {
      //   Api.EmergencyPlanApi.PreplanDownload(val.id).then((response) => {
      //    console.log(response)

      // });
      console.log(val)
      let url = val
      let link = document.createElement('a')
      link.style.display = 'none'
      link.href = url
      link.setAttribute('download', 'res.doc') // 自定义下载文件名（如exemple.txt）
      document.body.appendChild(link)
      link.click()
    },
    /////////////////////////////////////
    /**************************************** */
    //流体单选事件二级目录
    SingleChoice(val) {
      console.log(val, 'qqq')
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
      console.log(val, '1111')
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

    /************************************************ */
    //////////////////////////////////////////
    //新增动图
    handleRemove(file, fileList) {
      console.log(file, fileList)
    },
    handlePreview(file) {
      console.log(file)
    },
    //流体动图成功的钩子
    DynamicMapupload(response, file, fileList) {
      // console.log(response,898989989)
      let obj = {}
      obj.fileSize = response.data[0].byteToStr
      obj.fileId = response.data[0].id
      obj.fileType = response.data[0].objType
      obj.fileUrl = response.data[0].url
      obj.fileName = response.data[0].originalName
      obj.connectionId = this.PrimaryDataDirectory[0].id
      console.log(obj)
      fadSimulationSysAttachmentsSave(obj).then(res => {
        console.log(res)
        if (res.data.code == 200) {
          this.$message({
            type: 'success',
            message: `${res.data.msg}`,
          })
          fadSimulationSimulationanalysisdatadifList({ firstLevelDirectoryId: this.PrimaryDataDirectory[0].id }).then(res => {
            console.log(res, 111111111111111)
            this.MovingPictureaArray = res.data.data
            if (res.data.data.length < 1) {
              this.MovingPicture = false
            } else {
              this.MovingPicture = true
            }
          })
        } else {
          this.$message({
            type: 'info',
            message: `${res.data.msg}`,
          })
        }
      })
    },
    //有限动图成功钩子
    AddLimitedmotionPicture(response, file, fileList) {
      let obj = {}
      obj.fileSize = response.data[0].byteToStr
      obj.fileId = response.data[0].id
      obj.fileType = response.data[0].objType
      obj.fileUrl = response.data[0].url
      obj.fileName = response.data[0].originalName
      obj.connectionId = this.PrimaryDataDirectory[1].id
      console.log(obj)
      fadSimulationSysAttachmentsSave(obj).then(res => {
        console.log(res)
        if (res.data.code == 200) {
          this.$message({
            type: 'success',
            message: `${res.data.msg}`,
          })
          fadSimulationSimulationanalysisdatadifList({ firstLevelDirectoryId: this.PrimaryDataDirectory[1].id }).then(res => {
            console.log(res, 111111111111111)
            this.MovingPictureaArray = res.data.data
            if (res.data.data.length < 1) {
              this.MovingPicture = false
            } else {
              this.MovingPicture = true
            }
          })
        } else {
          this.$message({
            type: 'info',
            message: `${res.data.msg}`,
          })
        }
      })
    },
    //流动动图添加成功钩子
    FlowMapAdding(response, file, fileList) {
      let obj = {}
      obj.fileSize = response.data[0].byteToStr
      obj.fileId = response.data[0].id
      obj.fileType = response.data[0].objType
      obj.fileUrl = response.data[0].url
      obj.fileName = response.data[0].originalName
      obj.connectionId = this.PrimaryDataDirectory[2].id
      console.log(obj)
      fadSimulationSysAttachmentsSave(obj).then(res => {
        console.log(res)
        if (res.data.code == 200) {
          this.$message({
            type: 'success',
            message: `${res.data.msg}`,
          })
          fadSimulationSimulationanalysisdatadifList({ firstLevelDirectoryId: this.PrimaryDataDirectory[2].id }).then(res => {
            console.log(res, 111111111111111)
            this.MovingPictureaArray = res.data.data
            if (res.data.data.length < 1) {
              this.MovingPicture = false
            } else {
              this.MovingPicture = true
            }
          })
        } else {
          this.$message({
            type: 'info',
            message: `${res.data.msg}`,
          })
        }
      })
    },
    //上传文件之前的钩子，参数为上传的文件，若返回 false 或者返回 Promise 且被 reject，则停止上传。
    beforeAvatarUpload(file) {
      this.loading = true
      // const isJPG = file.type === 'image/jpeg';
      // const isPNG = file.type === 'image/png';
      const isGIF = file.type === 'image/gif'
      // const isLt10M = file.size / 1024 / 1024 < 10;
      if (!isGIF) {
        this.$message.error('上传图片只能是 gif格式!')
      }
      // if (!isLt10M) {
      //   this.$message.error('上传图片大小不能超过 10MB!');
      // }
      // return (isJPG || isPNG);
      return isGIF
    },
    /////////////////////////////////////////////

    nSubmit() {
      console.log('submit!')
    },
    //页码
    page(val) {
      this.pageNum = val
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
      this.fluidName = ''
      this.LimitedValue = ''
      this.SelectLevelId = ''
      this.flowValue = ''
      this.fluidValue = ''
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
        await this.FiniteElementInquiry()
        await fadSimulationSimulationanalysisdatadifList({ firstLevelDirectoryId: this.PrimaryDataDirectory[1].id }).then(res => {
          console.log(res, 111111111111111)
          this.MovingPictureaArray = res.data.data
          if (res.data.data.length < 1) {
            this.MovingPicture = false
          } else {
            this.MovingPicture = true
          }
        })
      } else if (this.activeName == 'third') {
        ;(this.SelectLevelId = ''), (this.titles = this.spotTitle)
        this.notice = false
        await fadSimulationDirectoryTableDirectory(this.PrimaryDataDirectory[2].id).then(response => {
          console.log('response=>', response)
          this.MobileSecondary = response.data.data
        })
        await this.MobileQuery()
        await fadSimulationSimulationanalysisdatadifList({ firstLevelDirectoryId: this.PrimaryDataDirectory[2].id }).then(res => {
          console.log(res, 111111111111111)
          this.MovingPictureaArray = res.data.data
          if (res.data.data.length < 1) {
            this.MovingPicture = false
          } else {
            this.MovingPicture = true
          }
        })
      } else if (this.activeName == 'fourth') {
        ;(this.SelectLevelId = ''), (this.titles = this.quietTitle)
        await fadSimulationDirectoryTableDirectory(this.PrimaryDataDirectory[3].id).then(response => {
          console.log('response=>', response)
          this.ExperienceLevelA = response.data.data
        })
        await this.ExperienceInquiry()
      }
    },
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
    //流体新增
    FluidAddition() {
      this.$router.push({
        name: 'FluidAddendum',
        query: {
          titles: '新增案例',
          title: '新增案例',
          titler: '流体模拟',
          btn: '1',
          // firstLevelDirectoryId:this.PrimaryDataDirectory[0].id
        },
      })
    },
    //流体编辑
    FluidEditing(val) {
      this.$router.push({
        name: 'FluidAddendum',
        query: {
          titles: '编辑案例',
          title: '编辑案例',
          titler: '流体模拟',
          btn: '2',
          datas: val,
        },
      })
    },
    //有限新增
    LimitedAddition() {
      this.$router.push({
        name: 'LimitedAddendum',
        query: {
          titles: '新增案例',
          title: '新增案例',
          titler: '有限元分析',
          btn: '1',
        },
      })
    },
    //有限编辑
    LimitedEdition(val) {
      this.$router.push({
        name: 'LimitedAddendum',
        query: {
          titles: '编辑案例',
          title: '编辑案例',
          titler: '有限元分析',
          btn: '2',
          datas: val,
        },
      })
    },
    //流动保障新增
    NewFlows() {
      this.$router.push({
        name: 'NewFlow',
        query: {
          titles: '新增案例',
          title: '新增案例',
          titler: '流动保障',
          btn: '1',
        },
      })
    },
    //流动保障编辑
    MobileEditing(val) {
      this.$router.push({
        name: 'NewFlow',
        query: {
          titles: '编辑案例',
          title: '编辑案例',
          titler: '流动保障',
          btn: '2',
          datas: val,
        },
      })
    },
    //经验分析新增
    NewExperiences() {
      this.$router.push({
        name: 'NewExperience',
        query: {
          titles: '新增案例',
          title: '新增案例',
          titler: '经验分析',
          btn: '1',
        },
      })
    },
    //经验分析编辑
    ExperienceEditor(val) {
      this.$router.push({
        name: 'NewExperience',
        query: {
          titles: '编辑案例',
          title: '编辑案例',
          titler: '经验分析',
          btn: '2',
          datas: val,
        },
      })
    },
    //批量删除
    idArr(val) {
      //  console.log(val)
      this.tableRow.ids = val
    },
    //流体删除
    FluidDelete(val) {
      //  console.log(val)
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(() => {
          let obj = {}
          obj.ids = [val.data.id]
          fadSimulationSimulationAnalysisDataRemove(obj).then(res => {
            if (res.data.code == 200) {
              this.$message({
                type: 'success',
                message: `${res.data.msg}`,
              })
              this.FluidQuery()
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
    //流体批量删除
    FluidAllDelete() {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
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
          fadSimulationSimulationAnalysisDataRemove(this.tableRow).then(res => {
            if (res.data.code == 200) {
              this.$message({
                type: 'success',
                message: `${res.data.msg}`,
              })
              this.FluidQuery()
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
    //有限删除
    LimitedDeletion(val) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(() => {
          console.log('then')
          let obj = {}
          obj.ids = [val.data.id]
          fadSimulationSimulationAnalysisDataRemove(obj).then(res => {
            if (res.data.code == 200) {
              this.$message({
                type: 'success',
                message: `${res.data.msg}`,
              })
              this.FiniteElementInquiry()
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
    //有限批量删除
    LimitedTotalDeletion() {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
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
          fadSimulationSimulationAnalysisDataRemove(this.tableRow).then(res => {
            if (res.data.code == 200) {
              this.$message({
                type: 'success',
                message: `${res.data.msg}`,
              })
              this.FiniteElementInquiry()
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
    //流动删除
    FlowDelete(val) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(() => {
          console.log('then')
          let obj = {}
          obj.ids = [val.data.id]
          fadSimulationSimulationAnalysisDataRemove(obj).then(res => {
            if (res.data.code == 200) {
              this.$message({
                type: 'success',
                message: `${res.data.msg}`,
              })
              this.MobileQuery()
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
    //流动批量删除
    FlowAllDelete() {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
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
          fadSimulationSimulationAnalysisDataRemove(this.tableRow).then(res => {
            if (res.data.code == 200) {
              this.$message({
                type: 'success',
                message: `${res.data.msg}`,
              })
              this.MobileQuery()
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
    //经验分析删除
    ExperienceDeletion(val) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(() => {
          console.log('then')
          let obj = {}
          obj.ids = [val.data.id]
          fadSimulationSimulationAnalysisDataRemove(obj).then(res => {
            if (res.data.code == 200) {
              this.$message({
                type: 'success',
                message: `${res.data.msg}`,
              })
              this.ExperienceInquiry()
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
    //经验分析批量删除
    ExperienceAllDeletion() {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
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
          fadSimulationSimulationAnalysisDataRemove(this.tableRow).then(res => {
            if (res.data.code == 200) {
              this.$message({
                type: 'success',
                message: `${res.data.msg}`,
              })
              this.ExperienceInquiry()
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
    //删除流体动图
    DeleteTheDynamicGraphPermanently(val) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
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
          fadSimulationSysAttachmentsRemove(val).then(res => {
            if (res.data.code == 200) {
              this.$message({
                type: 'success',
                message: `${res.data.msg}`,
              })
              fadSimulationSimulationanalysisdatadifList({ firstLevelDirectoryId: this.PrimaryDataDirectory[0].id }).then(res => {
                console.log(res, 111111111111111)
                this.MovingPictureaArray = res.data.data
                if (res.data.data.length < 1) {
                  this.MovingPicture = false
                } else {
                  this.MovingPicture = true
                }
              })
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
    //删除有限动图
    DeleteTheDynamicGraphPermanentlys(val) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
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
          fadSimulationSysAttachmentsRemove(val).then(res => {
            if (res.data.code == 200) {
              this.$message({
                type: 'success',
                message: `${res.data.msg}`,
              })
              fadSimulationSimulationanalysisdatadifList({ firstLevelDirectoryId: this.PrimaryDataDirectory[1].id }).then(res => {
                console.log(res, 111111111111111)
                this.MovingPictureaArray = res.data.data
                if (res.data.data.length < 1) {
                  this.MovingPicture = false
                } else {
                  this.MovingPicture = true
                }
              })
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
    //删除流动动图
    DeleteTheDynamicGraphPermanentlya(val) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
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
          fadSimulationSysAttachmentsRemove(val).then(res => {
            if (res.data.code == 200) {
              this.$message({
                type: 'success',
                message: `${res.data.msg}`,
              })
              fadSimulationSimulationanalysisdatadifList({ firstLevelDirectoryId: this.PrimaryDataDirectory[2].id }).then(res => {
                console.log(res, 111111111111111)
                this.MovingPictureaArray = res.data.data
                if (res.data.data.length < 1) {
                  this.MovingPicture = false
                } else {
                  this.MovingPicture = true
                }
              })
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
    /******************************************************** */
    //下载或批量下载
    DownloadOrBatchDownload(val) {
      // console.log(val.data.id)
       console.log(val,"************************")
      //  if(val.data.sysAttachments.length >1){
      //    window.href(`http://10.79.34.15:8073/fad/promotion/downLoadFiles/${val.data.id}`)
      //  }
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
        let link = document.createElement('a')
          link.style.display = 'none'
          link.href = val.data.sysAttachments[0].fileUrl 
           link.setAttribute('download', 'exemple') // 自定义下载文件名（如exemple.txt）
          // link.download=res.data.data[0].fileName
          document.body.appendChild(link)
          link.click()
      }
    
        // if (res.data.data.length == 0) {
        //   this.$message({
        //     message: '没有下载的附件',
        //     type: 'warning',
        //   })
        // } else if (res.data.data.length >0) {
        //   console.log('单个下载');
        //   let link = document.createElement('a')
        //   link.style.display = 'none'
        //   link.href = `http://10.79.34.15:8073/fad/promotion/downLoadFiles/${val.data.id}`
        //    console.log(res.data.data[0].fileName)
        //    link.setAttribute('download', 'exemple') // 自定义下载文件名（如exemple.txt）
        //   // link.download=res.data.data[0].fileName
        //   document.body.appendChild(link)
        //   link.click()
        // } else {
        //   // let zip = new jsZip()
        //   // let fileName
        //   // res.data.data.forEach(item => {
        //   //   fileName = item.fileName
        //   //   let url = item.fileUrl.replace('http://10.72.66.27:9999', '')
        //   //   let promise = download(url).then(res => {
        //   //     return res.data
        //   //   })
        //   //   zip.file(fileName, promise)
        //   // })
        //   // zip.generateAsync({ type: 'blob' }).then(result => {
        //   //   if (window.navigator.msSaveBlob) {
        //   //     window.navigator.msSaveBlob(result, fileName + '.zip')
        //   //   } else {
        //   //     let link = document.createElement('a')
        //   //     link.style.display = 'none'
        //   //     link.href = URL.createObjectURL(result)
        //   //     link.setAttribute('download', res.data.data[0].fileName + '.zip') // 自定义下载文件名（如exemple.txt）
        //   //     document.body.appendChild(link)
        //   //     link.click()
        //   //   }
        //   // })
        // }
      //})



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
    } else if (this.activeName == 'second') {
      this.titles = this.temperatureTitle
      this.FiniteElementInquiry()
    } else if (this.activeName == 'third') {
      this.titles = this.spotTitle
      this.MobileQuery()
    } else if (this.activeName == 'fourth') {
      this.titles = this.quietTitle
      this.ExperienceInquiry()
    }
  },
  //路由首位
  // beforeRouteEnter(to, from, next) {
  //   console.log(to)
  //   console.log(from)
  //   // if(from.path == "/PhysicalData/NewWterPressure"){
  //   //       next(vm=>{
  //   //       vm.activeName= "first";
  //   //     })
  //   // }
  //   if (from.path == '/simulation/LimitedAddendum') {
  //     next(vm => {
  //       vm.activeName = 'second'
  //     })
  //   }
  //   if (from.path == '/simulation/NewFlow') {
  //     next(vm => {
  //       vm.activeName = 'third'
  //     })
  //   }
  //   if (from.path == '/simulation/NewExperience') {
  //     next(vm => {
  //       vm.activeName = 'fourth'
  //     })
  //   }
  //   //  if(from.path == "/PhysicalData/HighTemperatureDetails"){
  //   //     next(vm=>{
  //   //       vm.activeName= "second";
  //   //     })
  //   // }
  //   //  if(from.path == "/PhysicalData/BendingDetails"){
  //   //     next(vm=>{
  //   //       vm.activeName= "third";
  //   //     })
  //   // }
  //   //  if(from.path ==  "/PhysicalData/StaticJump"){
  //   //     next(vm=>{
  //   //       vm.activeName= "fourth";
  //   //     })
  //   // }
  //   next()
  // },
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
  margin-top: 20px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
//下拉框位置
.Drop {
  margin-left: -200px;
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
.DividingLine {
  width: 100%;
  height: 1px;
  background-color: #cccccc;
}
.MaintainSearchh {
  // margin-right: -45%; // -784px;
  margin-right: -18%;
}
a {
  color: #606266;
}
</style>