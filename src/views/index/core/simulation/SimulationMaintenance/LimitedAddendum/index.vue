<template>
  <div id="TheWholeExperimentc">
    <div class="FlexibleLayout">
      <div>
        <i>模拟分析数据</i> ><i>模拟分析数据维护</i>><i>{{ onlyMark.titler }}<i>></i>{{ onlyMark.titles }}</i>
      </div>
      <div style="padding-right: 50px">
        <el-button type="primary" icon="el-icon-arrow-left" @click="TurnBack">返回</el-button>
      </div>
    </div>
    <div class="material-wrap">
      <div class="TableTitle">
        <h1 class="fnt-w">{{ onlyMark.title }}</h1>
      </div>
      <div class="pressure-table">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="180px" class="demo-ruleForm">
          <div style="margin-top: 10px">
            <el-row>
              <el-col :span="24">
                <el-form-item label="名称" prop="name">
                  <el-input v-model="ruleForm.name" style="width: 218px" maxlength="20"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </div>
          <div style="margin-top: 20px">
            <el-row>
              <el-col :span="24">
                <el-form-item label="一级目录" prop="firstLevelDirectory">
                  <el-select v-model="ruleForm.firstLevelDirectoryId" placeholder="请选择" @change="FirstLeveldirectorychange">
                    <el-option v-for="item in classAOptions" :key="item.id" :label="item.name" :value="item.id"> </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
          </div>
          <div style="margin-top: 20px">
            <el-row>
              <el-col :span="24">
                <el-form-item label="二级目录" prop="secondLevelDirectory">
                  <el-select v-model="ruleForm.secondLevelDirectoryId" placeholder="请选择" @change="SecondaryDirectoryChange">
                    <el-option v-for="item in secondLevelOptions" :key="item.id" :label="item.name" :value="item.id"> </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
          </div>
          <div style="margin-top: 20px">
            <el-row>
              <div v-if="ThreeDisplay">
                <el-col :span="24">
                  <el-form-item label="三级目录" prop="thirdLevelDirectory">
                    <el-select v-model="ruleForm.thirdLevelDirectoryId" placeholder="请选择" @change="ThirdLevelCatalogChange">
                      <el-option v-for="item in LevelOptions" :key="item.id" :label="item.name" :value="item.id"> </el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
              </div>
              <div v-else>
                <el-col :span="24">
                  <el-form-item label="三级目录" prop="thirdLevelDirec">
                    <el-select v-model="ruleForm.thirdLevelDirectoryId" placeholder="请选择" @change="ThirdLevelCatalogChange">
                      <el-option v-for="item in LevelOptions" :key="item.id" :label="item.name" :value="item.id"> </el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
              </div>
            </el-row>
          </div>
          <div style="margin-top: 20px">
            <el-row>
              <el-col :span="24">
                <el-form-item label="是否加密" prop="passwordYn">
                  <el-radio-group v-model="ruleForm.passwordYn">
                    <el-radio :label="0">是</el-radio>
                    <el-radio :label="1">否</el-radio>
                  </el-radio-group>
                  <!-- <el-radio v-model="ruleForm.passwordYn" :label="0">是</el-radio>
                    <el-radio v-model="ruleForm.passwordYn" :label="1">否</el-radio> -->
                </el-form-item>
              </el-col>
            </el-row>
          </div>
          <div style="margin-top: 20px" v-if="ruleForm.passwordYn != 1">
            <el-row>
              <el-col :span="24">
                <div id="jmry" @click="TriggerEncryption">
                  <el-form-item label="选择加密人员" :prop="Receiversra">
                    <el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="ruleForm.Receiversra" style="width: 218px"> </el-input>
                  </el-form-item>
                </div>
                <!-- <div class="EncryptionPersonnelStyle">
                    <div class="EncryptionPersonnelStyle-lab" >
                       <label @click="TriggerEncryption">选择加密人员</label>
                    </div>
                   <el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="Receiversra" style="width: 218px"> </el-input>
                </div> -->
              </el-col>
            </el-row>
          </div>
          <div style="margin-top: 20px">
            <el-form-item label="上传文件" prop="ssss">
              <el-upload
                class="upload-demo"
                :file-list="zigss"
                drag
                :on-preview="handlePreview"
                :on-remove="handleRemove"
                :before-remove="scc"
                :on-success="FileSuccess"
                action="http://10.72.66.27:9090/oss/upload/csp/uploadMaterial"
                multiple
                :on-exceed="exceed"
                :on-change="fileFormat"
                :limit="5"
                :auto-upload="false"
                ref="uploads"
              >
                <i class="el-icon-upload"></i>
                <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                <div class="el-upload__tip" slot="tip">支持上传pdf、doc、docx文件</div>
              </el-upload>
            </el-form-item>
          </div>

          <div>
            <el-form-item>
              <el-button style="margin-left: 35%" type="primary" @click="submitForm('ruleForm')">保存</el-button>
              <el-button @click="resetForm()">取消</el-button>
            </el-form-item>
          </div>
        </el-form>
      </div>
    </div>
    <tree :opens.sync="opens" @closes="closes" @AcceptSelection="AcceptSelection"></tree>
    <Encryption :encryptionOpen.sync="encryptionOpen" @EncryptionPersonnelStyle="EncryptionPersonnelStyle" @Receiver="Receiver"></Encryption>
  </div>
</template>
<script>
import {
  fadSimulationDirectoryTableParent,
  fadSimulationDirectoryTableDirectory,
  fadSimulationSimulationAnalysisDataList,
  fadSimulationSimulationanalysisdatadifList,
  fadSimulationSimulationAnalysisDataUpdate,
  fadSimulationSimulationAnalysisDataSave,
  fadSimulationSimulationAnalysisDataDetails,
} from '@/api/SimulationAnalysisData'
import tree from '@/components/Tree/index'
import Encryption from '@/components/encryption/index'
export default {
  components: {
    tree,
    Encryption,
  },
  data() {
    return {
      /*********************** */
      Receiversra: 'Receiversra',
      //编辑给子组件的人员数据
      PeopleSubcomponent: [],
      //发给后端子组件人员
      Receivers: [],
      //组件加密触发显示
      encryptionOpen: false,
      /****************** */
      /////////公共组件/////////
      opens: false,
      /////////////////////
      /************************** */
      zigss: [],
      /************************** */
      ruleForm: {
        //显示已选人员名字
        Receiversra: [],
        //是否加密选中的数据
        passwordYn: 1,
        //名称
        name: '',
        //一级目录
        firstLevelDirectory: '',
        //一级id
        firstLevelDirectoryId: '',
        //二级目录
        secondLevelDirectory: '',
        //二级id
        secondLevelDirectoryId: '',
        //三级目录
        thirdLevelDirectory: '',
        //三级id
        thirdLevelDirectoryId: '',
        //材质
        material: '',
        //规格型号
        specificationModel: '',
        //依据标准
        standard: '',
        //送检时间
        inspectionTime: '',
        //爆破口长度
        blastHoleLength: '',
        //爆破压力
        blastMaxPressure: '',
        //焊缝最短距离
        minDistance: '',
        //爆破后的形貌
        fileDate: [],
        //评定结果
        evaluationResults: '',
        //时间压力曲线
        //完整报告上传的文件列表
        // fileList:[],
        //爆破失效后的形貌图片上传
        imageUrl: '',
      },
      rules: {
        name: [
          { required: true, message: '请输入名称', trigger: 'blur' },
          // { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" },
        ],
        firstLevelDirectory: [
          { required: true, message: '请输入一级目录', trigger: 'change' },
          // { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" },
        ],
        secondLevelDirectory: [
          { required: true, message: '请输入二级目录', trigger: 'change' },
          // { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" },
        ],
        passwordYn: [
          { required: true, trigger: 'blur' },
          // { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" },
        ],
        thirdLevelDirectory: [
          { required: true, message: '请输入三级目录', trigger: 'change' },
          // { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" },
        ],
        Receiversra: [
          { required: true, message: '请输入加密人员', trigger: 'change' },
          // { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" },
        ],
        res:[{required: true}]
        // // specificationModel: [
        //   { required: true, message: '请输入规格型号', trigger: 'blur' },
        //   // { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" },
        // ],
        // standard: [
        //   { required: true, message: '请输入依据标准', trigger: 'blur' },
        //   // { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" },
        // ],
        // inspectionTime: [
        //   { required: true, message: '请输入送检时间', trigger: 'blur' },
        //   // { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" },
        // ],
        // evaluationResults: [
        //   { required: true, message: '请输入评定结果', trigger: 'blur' },
        //   // { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" },
        // ],
      },
      ThreeDisplay: false,
      //一级目录下拉数据
      classAOptions: [
        {
          value: '选项1',
          label: '黄金糕',
        },
        {
          value: '选项2',
          label: '双皮奶',
        },
        {
          value: '选项3',
          label: '蚵仔煎',
        },
      ],
      //发送过滤后的数据

      //二级目录下拉数据
      secondLevelOptions: [
        {
          value: '选项1',
          label: '话',
        },
        {
          value: '选项2',
          label: '没',
        },
        {
          value: '选项3',
          label: '开',
        },
      ],
      //三级目录下拉数据
      LevelOptions: [
        {
          value: '选项1',
          label: '莫',
        },
        {
          value: '选项2',
          label: '凡',
        },
        {
          value: '选项3',
          label: '天',
        },
      ],
      //删除文件的的数组
      ids: [],
      //唯一印记
      onlyMark: {},
      //一级选中值
      classAObj: {},
      //二级选中值
      secondLevelObj: {},
      //三级选中值
      LevelSObj: {},
    }
  },
  methods: {
    /************************** */
    //弹出加密组件
    TriggerEncryption() {
      console.log(111111111111)
      this.encryptionOpen = true
    },
    //返回加密开关数据
    EncryptionPersonnelStyle(val) {
      // console.log(val)
      this.encryptionOpen = val
    },
    //接受子组件人员方法
    Receiver(val) {
      console.log(val, '************')
      // this.Receivers = val
      console.log(this.Receivers, 'xxxxxxxxxx')
      var arr = val.map(item => {
        return item.empName
      })
      var arr1 = val.map(item => {
        console.log(item)
        let obj = {}
        obj.dataId = item.empId
        obj.dataName = item.empName
        return obj
      })
      this.Receivers = arr1
      console.log(arr1)
      console.log(arr, 'aaaaaaaaaaaaa')
      this.ruleForm.Receiversra = arr
         if (arr.length > 0) {
        this.Receiversra = 'res'
        this.ruleForm.res = arr
      } else {
        this.Receiversra = 'Receiversra'
      }
      console.log(this.ruleForm.Receiversra, 'ccccccccccccc')
    },
    /******************* */
    //一级目录改变
    FirstLeveldirectorychange(val) {
      //二级目录
      ;(this.ruleForm.secondLevelDirectory = ''),
        //二级id
        (this.ruleForm.secondLevelDirectoryId = ''),
        //三级目录
        (this.ruleForm.thirdLevelDirectory = ''),
        //三级id
        (this.ruleForm.thirdLevelDirectoryId = ''),
        console.log(val)
      // this.ruleForm.firstLevelDirectoryId = val.id
      let obj = {}

      obj = this.classAOptions.find(item => {
        //这里的Data就是上面遍历的数据源

        return item.id === val //筛选出匹配数据
      })
      this.ruleForm.firstLevelDirectory = obj.name
      //  console.log(this.ruleForm.firstLevelDirectoryId)
      fadSimulationDirectoryTableDirectory(val).then(response => {
        console.log('response=>', response)
        this.secondLevelOptions = response.data.data
      })
    },
    //二级目录改变
    SecondaryDirectoryChange(val) {
      if (val == '1369811618714492330' || val == '1369811618714492230' || val == '1369811618714492130') {
        this.ThreeDisplay = true
      } else {
        this.ThreeDisplay = false
      }
      //三级目录
      ;(this.ruleForm.thirdLevelDirectory = ''),
        //三级id
        (this.ruleForm.thirdLevelDirectoryId = ''),
        console.log(val)
      let obj = {}

      obj = this.secondLevelOptions.find(item => {
        //这里的Data就是上面遍历的数据源

        return item.id === val //筛选出匹配数据
      })

      this.ruleForm.secondLevelDirectory = obj.name
      fadSimulationDirectoryTableDirectory(val).then(response => {
        console.log('sadada', response)
        this.LevelOptions = response.data.data
      })
    },
    //三级目录改变
    ThirdLevelCatalogChange(val) {
      let obj = {}

      obj = this.LevelOptions.find(item => {
        //这里的Data就是上面遍历的数据源

        return item.id === val //筛选出匹配数据
      })
      this.ruleForm.thirdLevelDirectory = obj.name
      this.$refs.ruleForm.clearValidate('thirdLevelDirectory')
    },
    //接受子组件选中数据
    AcceptSelection(val) {
      console.log(val)
      this.ruleForm.entrustmentOrg = val.name
      this.ruleForm.entrustmentOrgId = val.id
    },
    //打开子组件
    GetTree() {
      this.opens = true
    },
    //接受子组件数据
    closes(val) {
      this.opens = val
    },
    /////////////////////////////完整报告//////////////////////////////////////
    //文件列表移除文件时的钩子
    handleRemove(file, fileList) {
      // console.log(file, fileList,4444444444444444);
      // console.log(file,9999999999999)
      //  console.log(fileList,5555555555555)
      // console.log(this.ruleForm.fileDate)
      this.ids.push(file.id)
    },
    //文件删除之前的钩子
    // scc(file, fileList){
    //    console.log(file,9999999999999)
    //   console.log(fileList,5555555555555)
    //   if(this.onlyMark.btn == 1){
    //      this.$message({
    //       message: '请到编辑页面删除',
    //       type: 'warning'
    //     });
    //     return false
    //   }
    // },
    //文件成功的回调钩子
    FileSuccess(response, file, fileList) {
      console.log(response, 11111111111111)
      console.log(file, 222222222222222)
      console.log(fileList, 33333333333333)
      // this.ruleForm.fileDate.push(fileList)
      let obj = {}
      obj.fileSize = response.data[0].byteToStr
      obj.fileId = response.data[0].id
      obj.fileType = response.data[0].objType
      obj.fileUrl = response.data[0].url
      obj.fileName = response.data[0].originalName
      console.log(obj)
      // this.ruleForm.fileDate = [];
      this.ruleForm.fileDate.push(obj)
    },
    //文件列表移除文件时的钩子
    // handlePreview(file) {
    //   console.log(file);
    //   this.ids.push(file.id)
    // },
    //文件超出限制钩子
    exceed(files, fileList) {
      this.$message.warning(`请最多上传 5 个文件`)
    },
    //文件格式限制
    fileFormat(file) {
      // console.log(file,"***********")
      // let type1 = (file.name).substring((file.name).lastIndexOf(".")+1)
      //   let type = type1.trim().toLowerCase()
      //   console.log(type,"***********")
      //    const isvideo = type === 'pdf' || type === 'doc' || type === 'docx';
      //   if(!isvideo){
      //     this.$message.error('只支持pdf/doc/docx三种格式文件上传');
      //   }
      //  return isvideo
      var testmsg = file.name.substring(file.name.lastIndexOf('.') + 1)
      const extension = testmsg === 'pdf' || testmsg === 'doc' || testmsg === 'docx'
      let fileList = this.$refs.uploads.uploadFiles
      console.log(fileList)

      if (!extension) {
        this.$refs.uploads.uploadFiles.pop()
        this.$message({
          message: '上传文件只能是pdf、doc、docx格式!',
          type: 'warning',
        })
      }
      this.ruleForm.fileDate3 = this.$refs.uploads.uploadFiles
      return extension
    },
    /////////////////////////////完整报告//////////////////////////////////////
    //长传爆破后的图片
    submitUpload() {
      this.$refs.upload.submit()
    },
    submitUploada() {
      this.$refs.uploada.submit()
    },
    submitUploads() {
      this.$refs.uploads.submit()
    },
    //新增确定
    submitForm(formName) {
      this.submitUploads()
      var test1 = setTimeout(() => {
        this.$refs[formName].validate(valid => {
          // console.log(this.onlyMark)
          if (valid) {
            //如果是 1 就请求新增
            if (this.onlyMark.btn == 1) {
              // console.log(111111111111111111111)
              let obj = {
                name: this.ruleForm.name,
                firstLevelDirectory: this.ruleForm.firstLevelDirectory,
                firstLevelDirectoryId: this.ruleForm.firstLevelDirectoryId,
                secondLevelDirectory: this.ruleForm.secondLevelDirectory,
                secondLevelDirectoryId: this.ruleForm.secondLevelDirectoryId,
                thirdLevelDirectory: this.ruleForm.thirdLevelDirectory,
                thirdLevelDirectoryId: this.ruleForm.thirdLevelDirectoryId,
                // entrustmentOrgId: this.ruleForm.entrustmentOrgId,
                // productionName: this.ruleForm.productionName,
                // entrustmentOrg: this.ruleForm.entrustmentOrg,
                // material: this.ruleForm.material,
                // specificationModel: this.ruleForm.specificationModel,
                // standard: this.ruleForm.standard,
                // inspectionTime: this.ruleForm.inspectionTime,
                // blastHoleLength: this.ruleForm.blastHoleLength,
                // blastMaxPressure: this.ruleForm.blastMaxPressure,
                // minDistance: this.ruleForm.minDistance,
                // evaluationResults: this.ruleForm.evaluationResults,
                sysAttachments: this.ruleForm.fileDate,
                passwordYn: this.ruleForm.passwordYn,
                emps: this.Receivers,
              }
              this.PublicAddition(obj)
            }
            //如果是 2 就编辑请求
            if (this.onlyMark.btn == 2) {
              let datas = {
                id: this.ruleForm.id,
                name: this.ruleForm.name,
                ids: this.ids,
                firstLevelDirectory: this.ruleForm.firstLevelDirectory,
                firstLevelDirectoryId: this.ruleForm.firstLevelDirectoryId,
                secondLevelDirectory: this.ruleForm.secondLevelDirectory,
                secondLevelDirectoryId: this.ruleForm.secondLevelDirectoryId,
                thirdLevelDirectory: this.ruleForm.thirdLevelDirectory,
                thirdLevelDirectoryId: this.ruleForm.thirdLevelDirectoryId,
                // code: this.ruleForm.code,
                // entrustmentOrgId: this.ruleForm.entrustmentOrgId,
                // productionName: this.ruleForm.productionName,
                // entrustmentOrg: this.ruleForm.entrustmentOrg,
                // material: this.ruleForm.material,
                // specificationModel: this.ruleForm.specificationModel,
                // standard: this.ruleForm.standard,
                // inspectionTime: this.ruleForm.inspectionTime,
                // blastHoleLength: this.ruleForm.blastHoleLength,
                // blastMaxPressure: this.ruleForm.blastMaxPressure,
                // minDistance: this.ruleForm.minDistance,
                // evaluationResults: this.ruleForm.evaluationResults,
                sysAttachments: this.ruleForm.fileDate,
                passwordYn: this.ruleForm.passwordYn,
                emps: this.Receivers,
              }
              fadSimulationSimulationAnalysisDataUpdate(datas).then(res => {
                console.log(res)
                if (res.data.code == 200) {
                  this.$message({
                    message: `${res.data.msg}`,
                    type: 'success',
                  })
                  this.$router.go(-1)
                } else {
                  this.$message({
                    message: `${res.data.msg}`,
                    type: 'warning',
                  })
                }
              })
            }
          } else {
            console.log('error submit!!')
            return false
          }
        })
      }, 1000)
    },
    //取消
    resetForm() {
      if (this.onlyMark.btn == 1) {
        if (this.ruleForm.name.length > 0 || this.ruleForm.firstLevelDirectory.length > 0) {
          this.$confirm('如果返回将无法保存已填写的内容?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
          })
            .then(() => {
              this.$router.go(-1)
            })
            .catch(() => {
              this.$message({
                type: 'info',
                message: '已取消',
              })
            })
        } else {
          this.$router.go(-1)
        }
      } else {
        this.$router.go(-1)
      }
    },
    //返回上一级
    TurnBack() {
      if (this.onlyMark.btn == 1) {
        if (this.ruleForm.name.length > 0 || this.ruleForm.firstLevelDirectory.length > 0) {
          this.$confirm('如果返回将无法保存已填写的内容?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
          })
            .then(() => {
              this.$router.go(-1)
            })
            .catch(() => {
              this.$message({
                type: 'info',
                message: '已取消',
              })
            })
        } else {
          this.$router.go(-1)
        }
      } else {
        this.$router.go(-1)
      }
    },
    //公共新增数据
    PublicAddition(obj) {
      fadSimulationSimulationAnalysisDataSave(obj).then(res => {
        console.log(res.data)
        if (res.data.code == 200) {
          this.$message({
            message: `${res.data.msg}`,
            type: 'success',
          })
          this.$router.go(-1)
        } else {
          this.$message({
            message: `${res.data.msg}`,
            type: 'warning',
          })
        }
      })
    },
  },
  async created() {
    this.onlyMark = this.$route.query
    console.log(this.$route.query)

    await fadSimulationDirectoryTableParent().then(response => {
      console.log(response, '***********')
      this.classAOptions = response.data.data
    })
    await fadSimulationSimulationAnalysisDataDetails(this.$route.query.datas.data.id).then(res => {
      console.log(res, '//////////////////')
      this.ruleForm = res.data.data.sad
      // this.ruleForm.passwordYn =Number(res.data.data.sad.passwordYn);
      this.ruleForm.passwordYn = 1
      this.ruleForm.fileDate = res.data.data.fileDate
      this.PeopleSubcomponent = res.data.data.emps
      this.zigss = res.data.data.fileDate.map(item => {
        item.name = item.fileName
        item.url = item.fileUrl
        return item
      })
    })
    await fadSimulationDirectoryTableDirectory(this.ruleForm.firstLevelDirectoryId).then(response => {
      console.log('sadada', response)
      this.secondLevelOptions = response.data.data
    })
    await fadSimulationDirectoryTableDirectory(this.ruleForm.secondLevelDirectoryId).then(response => {
      console.log('sadada', response)
      this.LevelOptions = response.data.data
    })
  },
  //路由传过来的数据
  // async beforeMount() {
  //   console.log(this.$route.query)
  // // await fadSimulationSimulationAnalysisDataDetails(this.$route.query.datas.data.id).then( res => {
  // //     console.log(res)
  // //      this.ruleForm = res.data.data.sad
  // //      this.ruleForm.fileDate = res.data.data.fileDate
  // //   })
  // //      await fadSimulationDirectoryTableDirectory(this.ruleForm.firstLevelDirectoryId).then(response => {
  // //        console.log('sadada', response)
  // //        this.secondLevelOptions = response.data.data
  // //      })
  // //      await fadSimulationDirectoryTableDirectory(this.ruleForm.secondLevelDirectoryId).then(response => {
  // //        console.log('sadada', response)
  // //        this.LevelOptions = response.data.data
  // //      })
  //   // this.onlyMark = this.$route.query
  //   // if (this.$route.query.datas) {
  //   //   console.log(this.$route.query.datas)
  //   //     this.ruleForm.firstLevelDirectory = this.$route.query.datas.data.firstLevelDirectory
  //   //     //名称
  //   //     this.ruleForm.name = this.$route.query.datas.data.name
  //   //     //一级id
  //   //   this.ruleForm.firstLevelDirectoryId = this.$route.query.datas.data.firstLevelDirectoryId
  //   //     await fadSimulationDirectoryTableDirectory(this.$route.query.datas.data.firstLevelDirectoryId).then(response => {
  //   //     console.log('sadada', response)
  //   //     this.secondLevelOptions = response.data.data
  //   //   })
  //   //      await fadSimulationDirectoryTableDirectory(this.$route.query.datas.data.secondLevelDirectoryId).then(response => {
  //   //     console.log('sssss', response)
  //   //     this.LevelOptions = response.data.data
  //   //   })
  //   //     //二级目录
  //   //   this.ruleForm.secondLevelDirectory= this.$route.query.datas.data.secondLevelDirectory
  //   //     //二级id
  //   //     this.ruleForm.secondLevelDirectoryId = this.$route.query.datas.data.secondLevelDirectoryId,
  //   //     //三级目录
  //   //     this.ruleForm.thirdLevelDirectory = this.$route.query.datas.data.thirdLevelDirectory
  //   //     //三级id
  //   //     this.ruleForm.thirdLevelDirectoryId = this.$route.query.datas.data.thirdLevelDirectoryId

  //   //     // this.$route.query.datas.data.sysAttachments === null ? this.ruleForm.sysAttachments = [] : this.ruleForm.sysAttachments = this.$route.query.datas.data.sysAttachments;
  //   //    this.ruleForm = this.$route.query.datas.data
  //   //    this.zigss = this.$route.query.datas.data.sysAttachments.map(item => {
  //   //     item.name = item.fileName
  //   //     item.url = item.fileUrl
  //   //     return item
  //   //   })
  //   // }
  // },
}
</script>
<style lang="scss" >
#TheWholeExperimentc {
  padding: 10px;
}
.material-wrap {
  width: 100%;
  height: 650px;
  overflow: auto;
  margin-top: 10px;
}
.FlexibleLayout {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.TableTitle {
  text-align: center;
}
.fnt-w {
  font-weight: bold;
  font-size: 18px;
  padding-top: 10px;
  padding-bottom: 10px;
}
.pressure-table {
  width: 748px;
  background-color: #f9f9f9;
  border: solid 1px #cccccc;
  margin: 0 auto 100px;
}
.RowLayout {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
}
.Header-wb {
  width: 20%;
  border-right: 1px solid #cccccc;
  border-bottom: 1px solid #cccccc;
  font-size: 14px;
  text-align: center;
  line-height: 49px;
  background-color: #f9f9f9;
}
.Header-wbimg {
  width: 20%;
  height: 100px;
  border-right: 1px solid #cccccc;
  border-bottom: 1px solid #cccccc;
  font-size: 14px;
  text-align: center;
  line-height: 100px;
  background-color: #f9f9f9;
}
.content-wb {
  width: 30%;
  border-right: 1px solid #cccccc;
  border-bottom: 1px solid #cccccc;
  font-size: 14px;
  text-align: center;
  line-height: 49px;
}
.content-wch {
  width: 80%;
  border-right: 1px solid #cccccc;
  border-bottom: 1px solid #cccccc;
  font-size: 14px;
  text-align: center;
  line-height: 49px;
}
.content-wbimg {
  width: 80%;
  height: 100px;
  border-right: 1px solid #cccccc;
  border-bottom: 1px solid #cccccc;
  font-size: 14px;
  text-align: center;
  line-height: 100px;
}
.EncryptionPersonnelStyle {
  padding-left: 89px;
  color: #606266;
}
.EncryptionPersonnelStyle-lab {
  display: inline-block;
  // cursor: pointer;
  margin-bottom: 30px;
}
/***************************** */
// .EncryptionPersonnelStyle[data-v-07a225fc]{
//   color: #0060a5;
//   cursor: default;
// }
// .element.style{
//    color: #0060a5;
//    cursor: default;
// }
// .EncryptionPersonnelStyle{
//   color: #0075cb;
//   cursor: default;
// }
#jmry {
  .el-form-item__label {
    color: #0060a5;
  }
}
</style>