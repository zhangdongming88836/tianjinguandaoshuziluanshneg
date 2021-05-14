<template>
  <div id="TheWholeExperiment">
    <div class="FlexibleLayout">
      <div>
        <i>实物试验数据库</i> ><i>试验项目数据维护</i>><i>{{ onlyMark.titles }}</i>
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
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="180px" class="demo-ruleForm" :disabled="!onlyMark.seeingBtn">
          <div style="margin-top: 10px">
            <el-row>
              <el-col :span="12">
                <el-form-item label="案例编号" prop="code">
                  <el-input v-model="ruleForm.code" style="width: 218px" maxlength="8"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="产品名称" prop="productionName">
                  <el-input v-model="ruleForm.productionName" style="width: 218px"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </div>
          <div style="margin-top: 20px">
            <el-row>
              <el-col :span="12">
                <el-form-item label="委托单位" prop="entrustmentOrg">
                  <!-- <el-select
                    v-model="ruleForm.entrustmentOrg"
                    placeholder="请选择"
                  >
                    <el-option
                      v-for="item in options"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    >
                    </el-option>
                  </el-select> -->
                  <el-input v-model="ruleForm.entrustmentOrg" style="width: 218px" readonly @focus="GetTree"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="材质" prop="material">
                  <el-input v-model="ruleForm.material" style="width: 218px"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </div>
          <div style="margin-top: 20px">
            <el-row>
              <el-col :span="12">
                <el-form-item label="规格型号" prop="specificationModel">
                  <el-input v-model="ruleForm.specificationModel" style="width: 218px"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="依据标准" prop="standard">
                  <el-input v-model="ruleForm.standard" style="width: 218px"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </div>
          <div style="margin-top: 20px">
            <el-row>
              <el-col :span="12">
                <el-form-item label="送检时间" prop="inspectionTime">
                  <div class="block">
                    <el-date-picker
                      v-model="ruleForm.inspectionTime"
                      type="date"
                      placeholder="选择日期"
                      format="yyyy/MM/dd"
                      value-format="yyyy/MM/dd"
                    >
                    </el-date-picker>
                  </div>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="爆破口长度" prop="blastHoleLength">
                  <el-input v-model="ruleForm.blastHoleLength" style="width: 218px" maxlength="10"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </div>
          <div style="margin-top: 20px">
            <el-row>
              <el-col :span="12">
                <el-form-item label="爆破口宽度" prop="blastHoleWidth">
                  <el-input v-model="ruleForm.blastHoleWidth" style="width: 218px" maxlength="10"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="爆破最大压力" prop="blastMaxPressure">
                  <el-input v-model="ruleForm.blastMaxPressure" style="width: 218px" maxlength="10"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </div>
          <div style="margin-top: 20px">
            <el-row>
              <el-col :span="12"> </el-col>
              <el-col :span="12">
                <el-form-item label="距离管端环焊缝最短距离" prop="minDistance" class="lihwi">
                  <el-input v-model="ruleForm.minDistance" style="width: 218px" maxlength="10"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </div>

          <div class="AcceptLayout">
            <div>
              <el-form-item label="爆破失效后的形貌" prop="fileDate1">
                <el-upload
                  action="http://10.72.66.27:9090/oss/upload/csp/uploadMaterial"
                  list-type="picture-card"
                  multiple
                  :file-list="imgList"
                  :on-preview="handlePictureCardPreview"
                  :on-remove="handleRemove"
                  :on-success="handleAvatarSuccess"
                  :on-exceed="blastExceed"
                  :before-remove="sccsa"
                  :limit="3"
                  :before-upload="beforeAvatarUpload"
                >
                  <i class="el-icon-plus"></i>
                </el-upload>
                <el-dialog :visible.sync="dialogVisible" :modal-append-to-body="false">
                  <img width="100%" :src="dialogImageUrl" alt="" />
                </el-dialog>
                <!-- <el-upload
                  ref="upload"
                  class="avatar-uploader"
                  action="http://10.72.66.27:9090/oss/upload/csp/uploadMaterial"
                  :show-file-list="false"
                  
                  :on-success="handleAvatarSuccess"
                >
                  <img
                    v-if="ruleForm.imageUrl"
                    :src="ruleForm.imageUrl"
                    class="avatar"
                  />
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload> -->
              </el-form-item>
            </div>
            <div></div>
          </div>
          <div style="margin-top: 20px">
            <el-form-item label="时间-压力曲线" prop="fileDate2">
              <el-upload
                list-type="picture-card"
                multiple
                :file-list="ListIG"
                action="http://10.72.66.27:9090/oss/upload/csp/uploadMaterial"
                :on-preview="Preview"
                :on-remove="Remove"
                :on-success="TimePressure"
                :before-remove="sccs"
                :on-exceed="pressureExceed"
                :limit="3"
                :before-upload="TimeBeforePictureUpload"
              >
                <i class="el-icon-plus"></i>
              </el-upload>
              <el-dialog :visible.sync="Visible">
                <img width="100%" :src="ImageUrl" alt="" />
              </el-dialog>
            </el-form-item>
          </div>
          <div style="margin-top: 20px">
            <el-form-item label="完整报告" prop="fileDate3">
              <el-upload
                class="upload-demo"
                drag
                :file-list="zigss"
                :on-preview="handlePreview"
                :on-remove="handleRemoveas"
                :on-success="FileSuccess"
                :before-remove="scc"
                :on-exceed="exceed"
                :before-upload="fileFormat"
                :limit="5"
                accept="pdf,doc,docx"
                action="http://10.72.66.27:9090/oss/upload/csp/uploadMaterial"
                multiple
                ref="uploads"
              >
                <i class="el-icon-upload"></i>
                <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                <div class="el-upload__tip" slot="tip">支持上传pdf、doc、docx文件</div>
              </el-upload>
            </el-form-item>
          </div>
          <div v-if="onlyMark.seeingBtn">
            <el-form-item>
              <el-button style="margin-left: 35%" type="primary" @click="submitForm('ruleForm')">保存</el-button>
              <el-button @click="cancel()">取消</el-button>
            </el-form-item>
          </div>
        </el-form>
      </div>
    </div>
    <tree :opens.sync="opens" @closes="closes" @AcceptSelection="AcceptSelection"></tree>
  </div>
</template>
<script>
import { experimentProjectSave, experimentProjectUpdate, fadSimulationExperimentProjectDetails } from '@/api/index'
import tree from '@/components/Tree/index'
import { stripscript, calidateUser, calidatePhone } from '@/utils/validate.js'
export default {
  components: {
    tree,
  },
  data() {
    var validateCode = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入案例编码'))
      } else if (!calidateUser(value)) {
        callback(new Error('只能输入字母或数字'))
      } else {
        callback()
      }
    }
    var validateLength = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入爆口长度'))
      } else if (!calidateUser(value)) {
        callback(new Error('只能输入字母或数字'))
      } else {
        callback()
      }
    }
    var validatePressure = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入爆破压力'))
      } else if (!calidateUser(value)) {
        callback(new Error('只能输入字母或数字'))
      } else {
        callback()
      }
    }
    var validateminDistance = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入焊缝最短距离'))
      } else if (!calidateUser(value)) {
        callback(new Error('只能输入字母或数字'))
      } else {
        callback()
      }
    }
    var validateName = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入委托单位'))
      } else {
        callback()
      }
    }
    var VblastHoleWidth = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入爆破口宽度'))
      } else if (!calidateUser(value)) {
        callback(new Error('只能输入字母或数字'))
      } else {
        callback()
      }
    }
    var validatorimgList = (rule, value, callback) => {
      console.log(value)
      if (value.length < 1) {
        callback(new Error('请上传图片'))
      } else {
        callback()
      }
    }
    return {
      /////////公共组件/////////
      opens: false,
      /////////////////////
      /////////文件的数据//////////////
      dialogImageUrl: '',
      dialogVisible: false,
      imgList: [],
      ImageUrl: '',
      Visible: false,
      ListIG: [],
      zigss: [],
      fileDate1: [],
      fileDate2: [],
      fileDate3: [],
      ////////////////////////
      ruleForm: {
        //编号
        code: '',
        //产品名称
        productionName: '',
        //委托单位
        entrustmentOrg: '',
        //单位ID
        entrustmentOrgId: '',
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
        //宽度
        blastHoleWidth: '',
        //爆破压力
        blastMaxPressure: '',
        //焊缝最短距离
        minDistance: '',
        //爆破后的形貌
        fileDate: [],
        //时间压力曲线
        //完整报告上传的文件列表
        // fileList:[],
        //爆破失效后的形貌图片上传
        imageUrl: '',
        imageUrlss: '',
        //////////////////
        fileDate1: [],
        fileDate2: [],
        fileDate3: [],
        imgList: [],
        ListIG: [],
        zigss: [],
        //////////////////
      },
      rules: {
        code: [
          { required: true, validator: validateCode, trigger: 'blur' },
          // { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" },
        ],
        productionName: [
          { required: true, message: '请输入产品名称', trigger: 'blur' },
          // { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" },
        ],
        entrustmentOrg: [
          { required: true, validator: validateName },
          // { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" },
        ],
        material: [
          { required: true, message: '请输入材质', trigger: 'blur' },
          // { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" },
        ],
        specificationModel: [
          { required: true, message: '请输入规格型号', trigger: 'blur' },
          // { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" },
        ],
        standard: [
          { required: true, message: '请输入依据标准', trigger: 'blur' },
          // { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" },
        ],
        inspectionTime: [
          { required: true, message: '请输入送检时间', trigger: 'blur' },
          // { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" },
        ],
        blastHoleLength: [
          { required: true, validator: validateLength, trigger: 'blur' },
          // { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" },
        ],
        blastMaxPressure: [
          { required: true, validator: validatePressure, trigger: 'blur' },
          // { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" },
        ],
        minDistance: [
          { required: true, validator: validateminDistance, trigger: 'blur' },
          // { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" },
        ],
        fileDate1: [
          { required: true, message: '请上传图片', trigger: 'change' },
          // { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" },
        ],
        fileDate2: [
          { required: true, message: '请上传图片', trigger: 'change' },
          // { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" },
        ],
        fileDate3: [
          { required: true, message: '请上传文件', trigger: 'change' },
          // { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" },
        ],
        blastHoleWidth: [
          { required: true, validator: VblastHoleWidth, trigger: 'blur' },
          // { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" },
        ],
      },
      //删除文件的的数组
      ids: [],
      //委托单位下拉数据
      options: [
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
        {
          value: '选项4',
          label: '龙须面',
        },
        {
          value: '选项5',
          label: '北京烤鸭',
        },
      ],
      //唯一印记
      onlyMark: {},
    }
  },
  methods: {
    //点击取消返回上一级
    cancel() {
      if (this.onlyMark.btn == 1) {
        if (
          this.ruleForm.code.length > 0 ||
          this.ruleForm.entrustmentOrgId.length > 0 ||
          this.ruleForm.productionName.length > 0 ||
          this.ruleForm.entrustmentOrg.length > 0 ||
          this.ruleForm.material.length > 0 ||
          this.ruleForm.specificationModel.length > 0 ||
          this.ruleForm.standard.length > 0 ||
          this.ruleForm.inspectionTime.length > 0 ||
          this.ruleForm.blastHoleLength.length > 0 ||
          this.ruleForm.blastMaxPressure.length > 0 ||
          this.ruleForm.minDistance.length > 0 ||
          this.ruleForm.fileDate.length > 0
        ) {
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
    /*********************************** */
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
    /********************************* */
    //爆破后的形貌照片//////////////////////////////////////////////////////////////////////////
    // 爆破后形貌图片上传成功时的钩子
    handleAvatarSuccess(res, file, fileList) {
      this.ruleForm.imageUrl = URL.createObjectURL(file.raw)
      let obj = {
        fileSize: res.data[0].byteToStr,
        fileId: res.data[0].id,
        fileType: res.data[0].objType,
        fileUrl: res.data[0].url,
        fileName: res.data[0].originalName,
        typeNumber: '1',
      }
      this.ruleForm.fileDate1 = fileList
      this.fileDate1.push(obj)
      this.$refs.ruleForm.clearValidate('fileDate1')
    },
    //文件列表移除文件时的钩子
    handleRemove(file, fileList) {
      this.fileDate1.pop(file)
      this.ruleForm.fileDate1 = fileList
      this.ids.push(file.id)
    },
    //点击文件列表中已上传的文件时的钩子
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    //上传文件之前的钩子，参数为上传的文件，若返回 false 或者返回 Promise 且被 reject，则停止上传。
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg'
      const isPNG = file.type === 'image/png'

      if (!isJPG && !isPNG) {
        this.$message.error('上传图片只能是 JPG 或者 PNG 格式!')
      }

      return isJPG || isPNG
    },
    blastExceed() {
      this.$message.warning(`最多上传三张图片`)
    },

    ////////////////////////爆破后形貌结束////////////////////////////////////////////////
    /////////////////////////////时间压力曲线//////////////////////////////////////
    // 时间压力曲线图片上传成功时的钩子
    TimePressure(res, file, fileList) {
      this.ruleForm.imageUrlss = URL.createObjectURL(file.raw)
      let obj = {
        fileSize: res.data[0].byteToStr,
        fileId: res.data[0].id,
        fileType: res.data[0].objType,
        fileUrl: res.data[0].url,
        fileName: res.data[0].originalName,
        typeNumber: '2',
      }
      this.ruleForm.fileDate2 = fileList
      this.fileDate2.push(obj)
      this.$refs.ruleForm.clearValidate('fileDate2')
    },
    Remove(file, fileList) {
      this.ruleForm.fileDate2 = fileList
      this.fileDate2.pop(file)
      this.ids.push(file.id)
    },
    Preview(file) {
      this.ImageUrl = file.url
      this.Visible = true
    },
    //上传文件之前的钩子，参数为上传的文件，若返回 false 或者返回 Promise 且被 reject，则停止上传。
    TimeBeforePictureUpload(file) {
      // this.loading = true
      const isJPG = file.type === 'image/jpeg'
      const isPNG = file.type === 'image/png'
      if (!isJPG && !isPNG) {
        this.$message.error('上传图片只能是 JPG 或者 PNG 格式!')
      }
      return isJPG || isPNG
    },
    //图片超出钩子限制图片
    pressureExceed() {
      this.$message.warning(`最多上传三张图片`)
    },
    //文件删除之前的钩子
    /////////////////////////////时间压力曲线//////////////////////////////////////
    /////////////////////////////完整报告//////////////////////////////////////
    //文件成功的回调钩子
    FileSuccess(response, file, fileList) {
      let obj = {
        fileSize: response.data[0].byteToStr,
        fileId: response.data[0].id,
        fileType: response.data[0].objType,
        fileUrl: response.data[0].url,
        fileName: response.data[0].originalName,
        typeNumber: '4',
      }
      this.ruleForm.fileDate3 = fileList
      this.fileDate3.push(obj)
      this.$refs.ruleForm.clearValidate('fileDate3')
    },
    //文件列表移除文件时的钩子
    handleRemoveas(file, fileList) {
      this.ruleForm.fileDate3 = fileList
      this.fileDate3.pop(file)
      this.ids.push(file.id)
    },
    //文件超出限制钩子
    exceed(files, fileList) {
      this.$message.warning(`请最多上传 5 个文件`)
    },
    //文件格式限制
    fileFormat(file) {
      // console.log(file, '***********')
      let type1 = file.name.substring(file.name.lastIndexOf('.') + 1)
      let type = type1.trim().toLowerCase()
      console.log(type, '***********')
      const isvideo = type === 'pdf' || type === 'doc' || type === 'docx'
      if (!isvideo) {
        this.$message.error('只支持pdf/doc/docx三种格式文件上传')
      }
      return isvideo
    },

    /////////////////////////////完整报告//////////////////////////////////////
    //新增确定
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.ruleForm.fileDate = this.fileDate1.concat(this.fileDate2, this.fileDate3)
          //如果是 1 就请求新增
          if (this.onlyMark.btn == 1) {
            let obj = {
              experimentType: '1',
              code: this.ruleForm.code,
              entrustmentOrgId: this.ruleForm.entrustmentOrgId,
              productionName: this.ruleForm.productionName,
              entrustmentOrg: this.ruleForm.entrustmentOrg,
              material: this.ruleForm.material,
              specificationModel: this.ruleForm.specificationModel,
              standard: this.ruleForm.standard,
              inspectionTime: this.ruleForm.inspectionTime,
              blastHoleLength: this.ruleForm.blastHoleLength,
              blastMaxPressure: this.ruleForm.blastMaxPressure,
              minDistance: this.ruleForm.minDistance,
              sysAttachments: this.ruleForm.fileDate,
              blastHoleWidth: this.ruleForm.blastHoleWidth,
            }
            // console.log(obj.sysAttachments)

            this.PublicAddition(obj)
          }
          // console.log(this.inspectionTime)
          //如果是 2 就编辑请求
          if (this.onlyMark.btn == 2) {
            let datas = {
              experimentType: '1',
              entrustmentOrgId: this.ruleForm.entrustmentOrgId,
              ids: this.ids,
              id: this.ruleForm.id,
              code: this.ruleForm.code,
              productionName: this.ruleForm.productionName,
              entrustmentOrg: this.ruleForm.entrustmentOrg,
              material: this.ruleForm.material,
              specificationModel: this.ruleForm.specificationModel,
              standard: this.ruleForm.standard,
              inspectionTime: this.ruleForm.inspectionTime,
              blastHoleLength: this.ruleForm.blastHoleLength,
              blastMaxPressure: this.ruleForm.blastMaxPressure,
              minDistance: this.ruleForm.minDistance,
              sysAttachments: this.ruleForm.fileDate,
              blastHoleWidth: this.ruleForm.blastHoleWidth,
            }
            experimentProjectUpdate(datas).then(res => {
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
          // console.log(this.ruleForm.inspectionTime)
          return false
        }
      })
    },
    //重置
    // resetForm(formName) {
    //   this.$refs[formName].resetFields();
    // },
    //返回上一级
    TurnBack() {
      if (this.onlyMark.btn == 1) {
        if (
          this.ruleForm.code.length > 0 ||
          this.ruleForm.entrustmentOrgId.length > 0 ||
          this.ruleForm.productionName.length > 0 ||
          this.ruleForm.entrustmentOrg.length > 0 ||
          this.ruleForm.material.length > 0 ||
          this.ruleForm.specificationModel.length > 0 ||
          this.ruleForm.standard.length > 0 ||
          this.ruleForm.inspectionTime.length > 0 ||
          this.ruleForm.blastHoleLength.length > 0 ||
          this.ruleForm.blastMaxPressure.length > 0 ||
          this.ruleForm.minDistance.length > 0 ||
          this.ruleForm.fileDate.length > 0
        ) {
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
      experimentProjectSave(obj).then(res => {
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
  //路由传过来的数据
  // beforeMount() {
  //   // console.log(this.$route.query);
  //   this.onlyMark = this.$route.query;
  //   if (this.$route.query.datas) {
  //     this.ruleForm = this.$route.query.datas;
  //     console.log(this.$route.query.datas);
  //     // console.log(this.ruleForm);
  //     this.imgList = this.$route.query.datas.sysAttachments.map(item => {
  //       if (item.typeNumber == "1") {
  //         item.name = item.fileName;
  //         item.url = item.fileUrl;
  //         return item;
  //       }
  //     });
  //     this.ListIG = this.$route.query.datas.sysAttachments.map(item => {
  //       if (item.typeNumber == "2") {
  //         item.name = item.fileName;
  //         item.url = item.fileUrl;
  //         return item;
  //       }
  //     });
  //     this.zigss = this.$route.query.datas.sysAttachments.map(item => {
  //       if (item.typeNumber == "4") {
  //         item.name = item.fileName;
  //         item.url = item.fileUrl;
  //         return item;
  //       }
  //     });
  //   }
  // },
  created() {
    console.log(this.$route.query)
    this.onlyMark = this.$route.query
    fadSimulationExperimentProjectDetails(this.$route.query.datas.id).then(res => {
      console.log(res)
      this.ruleForm = res.data.data.ep
      this.ruleForm.fileDate = res.data.data.fileDate
      this.ruleForm.fileDate1 = []
      this.ruleForm.fileDate2 = []
      this.ruleForm.fileDate3 = []
      console.log(this.ruleForm.fileDate)
      res.data.data.fileDate.forEach(item => {
        if (item.typeNumber === '1') {
          this.imgList.push({ id: item.id, name: item.fileName, url: item.fileUrl })
          this.ruleForm.fileDate1.push(item)
        }
        if (item.typeNumber === '2') {
          this.ListIG.push({ id: item.id, name: item.fileName, url: item.fileUrl })
          this.ruleForm.fileDate2.push(item)
        }
        if (item.typeNumber === '4') {
          this.zigss.push({ id: item.id, name: item.fileName, url: item.fileUrl })
          this.ruleForm.fileDate3.push(item)
        }
      })
      // console.log(this.ruleForm)
    })
  },
}
</script>
<style lang="scss" scoped>
#TheWholeExperiment {
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
  width: 1000px;
  background-color: #f9f9f9;
  border: solid 1px #cccccc;
  margin: 0 auto 200px;
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
.AcceptLayout {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  margin-top: 20px;
}
</style>