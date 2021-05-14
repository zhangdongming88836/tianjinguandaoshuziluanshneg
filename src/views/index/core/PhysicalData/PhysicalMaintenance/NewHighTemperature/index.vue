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
                <el-form-item label="试验温度" prop="experimentTemperature">
                  <el-input v-model="ruleForm.experimentTemperature" style="width: 218px"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="腐蚀性介质" prop="corrosiveMedium">
                  <el-input v-model="ruleForm.corrosiveMedium" style="width: 218px"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </div>
          <div style="margin-top: 20px">
            <el-row>
              <el-col :span="12">
                <el-form-item label="试验时间" prop="experimentTimeLength">
                  <div class="block">
                    <el-date-picker
                      v-model="ruleForm.experimentTimeLength"
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
                <el-form-item label="总压力" prop="totalPressure">
                  <el-input v-model="ruleForm.totalPressure" style="width: 218px"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </div>
          <div style="margin-top: 20px">
            <el-row>
              <el-col :span="12">
                <el-form-item label="腐蚀性气体类型" prop="corrosiveGasType">
                  <el-input v-model="ruleForm.corrosiveGasType" style="width: 218px"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="腐蚀性气体含量" prop="corrosiveGasContent" class="lihwi">
                  <el-input v-model="ruleForm.corrosiveGasContent" style="width: 218px"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </div>
          <div style="margin-top: 20px">
            <el-row>
              <el-col :span="12">
                <el-form-item label="转速" prop="rotaingSpeed">
                  <el-input v-model="ruleForm.rotaingSpeed" style="width: 218px"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="腐蚀速率" prop="corrosionRate" class="lihwi">
                  <el-input v-model="ruleForm.corrosionRate" style="width: 218px"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </div>
          <div style="margin-top: 20px">
            <el-form-item label="配图" prop="sysAttachments">
              <el-upload
                action="http://10.72.66.27:9090/oss/upload/csp/uploadMaterial"
                list-type="picture-card"
                multiple
                :file-list="imgList"
                :show-file-list="true"
                :on-preview="handlePictureCardPreview"
                :on-remove="handleRemove"
                :on-success="handleAvatarSuccess"
                :on-exceed="pressureExceed"
                :limit="3"
                :before-upload="beforeAvatarUpload"
                ref="upload"
              >
                <i class="el-icon-plus"></i>
              </el-upload>
              <el-dialog :visible.sync="dialogVisible" :modal-append-to-body="false">
                <img width="100%" :src="dialogImageUrl" alt="" />
              </el-dialog>
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
import { experimentProjectSave, experimentProjectUpdate } from '@/api/index'
import tree from '@/components/Tree/index'
import { stripscript, calidateUser, calidatePhone, RegularSign } from '@/utils/validate.js'
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
    var validateTemperature = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入试验温度'))
      } else if (!RegularSign(value)) {
        callback(new Error('只能输入字母或数字'))
      } else {
        callback()
      }
    }
    var validatetotalPressure = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入总压力'))
      } else if (!RegularSign(value)) {
        callback(new Error('只能输入字母或数字'))
      } else {
        callback()
      }
    }
    var validatetotalrotaingSpeed = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入转速'))
      } else if (!RegularSign(value)) {
        callback(new Error('只能输入字母或数字'))
      } else {
        callback()
      }
    }
    var validatetotalcorrosionRate = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入速率'))
      } else if (!RegularSign(value)) {
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
    return {
      /////////公共组件/////////
      opens: false,
      /////////////////////
      /**************************** */
      dialogImageUrl: '',
      dialogVisible: false,
      imgList: [],
      sysAttachments: [],
      /**************************** */
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
        //爆破压力
        blastMaxPressure: '',
        //焊缝最短距离
        minDistance: '',
        //爆破后的形貌
        sysAttachments: [],
        //时间压力曲线
        //完整报告上传的文件列表
        // fileList:[],
        //爆破失效后的形貌图片上传
        //实验温度
        experimentTemperature: '',
        //腐蚀性介质
        corrosiveMedium: '',
        //实验时间
        experimentTimeLength: '',
        //总压力
        totalPressure: '',
        //腐蚀性气体类型
        corrosiveGasType: '',
        //腐蚀性气体含量
        corrosiveGasContent: '',
        //转速
        rotaingSpeed: '',
        //腐蚀速率
        corrosionRate: '',
        imageUrl: '',
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
        experimentTemperature: [
          { required: true, validator: validateTemperature, trigger: 'blur' },
          // { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" },
        ],
        corrosiveMedium: [
          { required: true, message: '请输入腐蚀性介质', trigger: 'blur' },
          // { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" },
        ],
        experimentTimeLength: [
          { required: true, message: '请输入试验时间', trigger: 'blur' },
          // { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" },
        ],
        totalPressure: [
          { required: true, validator: validatetotalPressure, trigger: 'blur' },
          // { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" },
        ],
        corrosiveGasType: [
          { required: true, message: '请输入腐蚀性气体类型', trigger: 'blur' },
          // { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" },
        ],
        corrosiveGasContent: [
          { required: true, message: '请输入腐蚀性气体含量', trigger: 'blur' },
          // { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" },
        ],
        rotaingSpeed: [
          { required: true, validator: validatetotalrotaingSpeed, trigger: 'blur' },
          // { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" },
        ],
        corrosionRate: [
          { required: true, validator: validatetotalcorrosionRate, trigger: 'blur' },
          // { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" },
        ],
        sysAttachments: [
          { required: true, message: '请添加配图', trigger: 'blur' },
          // { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" },
        ],
      },
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
      //删除文件的的数组
      ids: [],
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
          this.ruleForm.sysAttachments > 0
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
        typeNumber: '3',
      }
      // this.ruleForm.sysAttachments.push(obj)
      this.ruleForm.sysAttachments = fileList
      this.sysAttachments.push(obj)
      console.log('sysAttachments')
      this.$refs.ruleForm.clearValidate('sysAttachments')
    },
    //文件列表移除文件时的钩子
    handleRemove(file, fileList) {
      this.ruleForm.sysAttachments = fileList
      this.sysAttachments.pop(file)
      this.ids.push(file.id)
      console.log(this.ruleForm.sysAttachments)
    },
    //点击文件列表中已上传的文件时的钩子
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.fileUrl
      this.dialogVisible = true
      // console.log(file)
    },
    //上传文件之前的钩子，参数为上传的文件，若返回 false 或者返回 Promise 且被 reject，则停止上传。
    beforeAvatarUpload(file) {
      // this.loading = true
      const isJPG = file.type === 'image/jpeg'
      const isPNG = file.type === 'image/png'
      // const isLt10M = file.size / 1024 / 1024 < 10;
      if (!isJPG && !isPNG) {
        this.$message.error('上传图片只能是 JPG 或者 PNG 格式!')
      }
      // if (!isLt10M) {
      //   this.$message.error('上传图片大小不能超过 10MB!');
      // }
      return isJPG || isPNG
      //     var testmsg = file.name.substring(file.name.lastIndexOf('.') + 1)
      // const extension = testmsg === 'png' || testmsg === 'jpg'
      // let fileList = this.$refs.upload.uploadFiles
      // console.log(fileList)

      // if (!extension) {
      //   this.$refs.upload.uploadFiles.pop()
      //   this.$message({
      //     message: '上传图片只能是png、jpg格式!',
      //     type: 'warning',
      //   })
      // }
      // this.ruleForm.fileDate1 = this.$refs.upload.uploadFiles
      // return extension
    },
    //限制图片个数
    pressureExceed() {
      this.$message.warning(`最多上传三张图片`)
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
    ////////////////////////爆破后形貌结束////////////////////////////////////////////////
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
      this.$refs[formName].validate(valid => {
        if (valid) {
          //如果是 1 就请求新增
          if (this.onlyMark.btn == 1) {
            let obj = {
              experimentType: '2',
              code: this.ruleForm.code,
              entrustmentOrgId: this.ruleForm.entrustmentOrgId,
              productionName: this.ruleForm.productionName,
              entrustmentOrg: this.ruleForm.entrustmentOrg,
              material: this.ruleForm.material,
              experimentTemperature: this.ruleForm.experimentTemperature,
              //腐蚀性介质
              corrosiveMedium: this.ruleForm.corrosiveMedium,
              //实验时间
              experimentTimeLength: this.ruleForm.experimentTimeLength,
              //总压力
              totalPressure: this.ruleForm.totalPressure,
              //腐蚀性气体类型
              corrosiveGasType: this.ruleForm.corrosiveGasType,
              //腐蚀性气体含量
              corrosiveGasContent: this.ruleForm.corrosiveGasContent,
              //转速
              rotaingSpeed: this.ruleForm.rotaingSpeed,
              //腐蚀速率
              corrosionRate: this.ruleForm.corrosionRate,
              specificationModel: this.ruleForm.specificationModel,
              standard: this.ruleForm.standard,
              inspectionTime: this.ruleForm.inspectionTime,
              blastHoleLength: this.ruleForm.blastHoleLength,
              blastMaxPressure: this.ruleForm.blastMaxPressure,
              minDistance: this.ruleForm.minDistance,
              sysAttachments: this.sysAttachments,
            }
            this.PublicAddition(obj)
          }
          //如果是 2 就编辑请求
          if (this.onlyMark.btn == 2) {
            let datas = {
              experimentType: '2',
              ids: this.ids,
              id: this.ruleForm.id,
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
              //实验时间
              experimentTimeLength: this.ruleForm.experimentTimeLength,
              sysAttachments: this.sysAttachments,
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
          this.ruleForm.sysAttachments > 0
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
  beforeMount() {
    console.log(this.$route.query, '***********')
    this.onlyMark = this.$route.query
    if (this.$route.query.datas) {
      this.ruleForm = this.$route.query.datas

      if (this.$route.query.datas.sysAttachments) {
        this.$route.query.datas.sysAttachments.forEach(item => {
          if (item.typeNumber === '3') {
            this.imgList.push({ name: item.fileName, url: item.fileUrl, id: item.id })
          }
        })
      } else {
        this.ruleForm.sysAttachments = []
      }
    }
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
</style>