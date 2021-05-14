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
                <el-form-item label="评定结果" prop="evaluationResults">
                  <el-input v-model="ruleForm.evaluationResults" style="width: 218px"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </div>
          <div style="margin-top: 20px">
            <el-form-item label="完整报告" prop="sysAttachments">
              <el-upload
                class="upload-demo"
                :file-list="zigss"
                :show-file-list="true"
                drag
                :on-preview="handlePreview"
                :on-remove="handleRemove"
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
import { experimentProjectSave, experimentProjectUpdate } from '@/api/index'
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
      /************************** */
      zigss: [],
      sysAttachments: [],
      /************************** */
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
        //评定结果
        evaluationResults: '',
        //时间压力曲线
        //完整报告上传的文件列表
        // fileList:[],
        //爆破失效后的形貌图片上传
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
        evaluationResults: [
          { required: true, message: '请输入评定结果', trigger: 'blur' },
          // { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" },
        ],
        sysAttachments: [
          { required: true, message: '请添加文件', trigger: 'blur' },
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
          this.ruleForm.evaluationResults.length > 0 ||
          this.ruleForm.sysAttachments.length > 0
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
    /////////////////////////////完整报告//////////////////////////////////////
    //文件列表移除文件时的钩子
    handleRemove(file, fileList) {
      this.ruleForm.sysAttachments = fileList
      this.sysAttachments.pop(file)

      this.ids.push(file.id)
      // console.log(this.ruleForm.sysAttachments)
    },
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
      this.ruleForm.sysAttachments = fileList
      this.sysAttachments.push(obj)

      this.$refs.ruleForm.clearValidate('sysAttachments')
    },
    //文件列表移除文件时的钩子
    // handlePreview(file) {
    //   console.log(file);
    //   this.ids.push(file.id)
    // },
    //文件超出限制钩子
    exceed(files, fileList) {
      this.$message.warning(`请最多上传 5 个文件。`)
    },
    //文件格式限制
    fileFormat(file) {
      // console.log(file,"***********")
      let type1 = file.name.substring(file.name.lastIndexOf('.') + 1)
      let type = type1.trim().toLowerCase()
      console.log(type, '***********')
      const isvideo = type === 'pdf' || type === 'doc' || type === 'docx'
      if (!isvideo) {
        this.$message.error('只支持pdf/doc/docx三种格式文件上传')
      }
      return isvideo
      // var testmsg = file.name.substring(file.name.lastIndexOf('.') + 1)
      // const extension = testmsg === 'pdf' || testmsg === 'doc' || testmsg === 'docx'
      // let fileList = this.$refs.uploads.uploadFiles
      // console.log(fileList)

      // if (!extension) {
      //   this.$refs.uploads.uploadFiles.pop()
      //   this.$message({
      //     message: '上传文件只能是pdf、doc、docx格式!',
      //     type: 'warning',
      //   })
      // }
      //  this.ruleForm.fileDate3 = this.$refs.uploads.uploadFiles
      // return extension
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
      this.$refs[formName].validate(valid => {
        console.log(this.onlyMark)
        if (valid) {
          //如果是 1 就请求新增
          if (this.onlyMark.btn == 1) {
            let obj = {
              experimentType: '3',
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
              evaluationResults: this.ruleForm.evaluationResults,
              sysAttachments: this.sysAttachments,
            }
            this.PublicAddition(obj)
          }
          //如果是 2 就编辑请求
          if (this.onlyMark.btn == 2) {
            let datas = {
              experimentType: '3',
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
              evaluationResults: this.ruleForm.evaluationResults,
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
          this.ruleForm.evaluationResults.length > 0 ||
          this.ruleForm.sysAttachments.length > 0
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
    // console.log(this.$route.query);
    this.onlyMark = this.$route.query
    if (this.$route.query.datas) {
      this.ruleForm = this.$route.query.datas
      console.log(this.$route.query.datas.sysAttachments)
      console.log(this.zigss)
      if (this.$route.query.datas.sysAttachments) {
        this.$route.query.datas.sysAttachments.forEach(item => {
          if (item.typeNumber === '4') {
            this.zigss.push({ name: item.fileName, url: item.fileUrl, id: item.id })
          }
        })
      } else {
        this.ruleForm.sysAttachments = []
      }

      // if (this.$route.query.datas.sysAttachments) {
      // this.zigss = this.$route.query.datas.sysAttachments.map(item => {
      //   if (item.typeNumber == '4') {
      //     item.name = item.fileName
      //     item.url = item.fileUrl
      //     return item
      //   }
      // })
      // }
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