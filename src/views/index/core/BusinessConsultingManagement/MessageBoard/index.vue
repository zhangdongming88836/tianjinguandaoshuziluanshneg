<template >
  <div>
    <div class="TheWholeExperiment">
      <img src="../../../../../assets/banner.png" alt="" />
    </div>
    <div class="material-wrap">
      <div class="materialWrapX">
        <div class="content">
        <div class="DividingLineLeft"></div>
        <div class="DividingLineRight"></div>
        <div class="materialWrapX-titel">
          <div style="position: relative">
            <img src="../../../../../assets/rectangle.png" alt="" />
            <i class="LocationChange">留言板</i>
          </div>
        </div>
        <div class="consultingService">
          <div class="PictureLocations">
            <img src="../../../../../assets/image.png" alt="" />
          </div>
          <div class="formlayout">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
              <div>
                <div class="title-attribute">
                  <label class="font-i">我要咨询：</label>
                </div>
                <div class="wby">
                  <el-form-item prop="textarea">
                    <el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="ruleForm.textarea" :autosize="{ minRows: 8 }"></el-input>
                  </el-form-item>
                </div>
              </div>
              <div style="padding-top: 60px">
                <el-row :gutter="20">
                  <el-col :span="12">
                    <el-form-item label="填写邮箱" prop="mailbox">
                      <el-input v-model="ruleForm.mailbox" ></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="座机号码" prop="Landline">
                      <el-input v-model="ruleForm.Landline" oninput="value=value.replace(/[^\d]/g,'')" maxlength="8"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row :gutter="20">
                  <el-col :span="12">
                    <el-form-item label="手机号码" prop="phone">
                      <el-input v-model="ruleForm.phone" maxlength="11" oninput="value=value.replace(/[^\d]/g,'')"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="姓名" prop="uname">
                      <el-input v-model="ruleForm.uname" maxlength="8"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row :gutter="20">
                  <el-col :span="12">
                    <el-form-item label="所在单位" prop="Company">
                      <el-input v-model="ruleForm.Company" maxlength="20"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12"> </el-col>
                </el-row>
                <el-form-item>
                  <el-button type="primary" @click="submitForm('ruleForm')">发送</el-button>
                </el-form-item>
              </div>
            </el-form>
          </div>
          <!-- <div class="InputLayout">
            <div class="title-attribute">
              <i class="font-i">我要咨询：</i>
            </div>
            <div style="margin-top: 5px">
              <el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="ruleForm.textarea" style="width: 640px; min-height: 138px">
              </el-input>
            </div>
          </div> -->
        </div>
        <!-- <div class="formlayout">
          <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
            
            <el-row :gutter="20">
              <el-col :span="12">
                <el-form-item label="填写邮箱" prop="mailbox">
                  <el-input v-model="ruleForm.mailbox"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="座机号码" prop="Landline">
                  <el-input v-model="ruleForm.Landline" oninput = "value=value.replace(/[^\d]/g,'')" maxlength="8"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="12">
                <el-form-item label="手机号码" prop="phone">
                  <el-input v-model="ruleForm.phone" maxlength="11" oninput = "value=value.replace(/[^\d]/g,'')"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="姓名" prop="uname">
                  <el-input v-model="ruleForm.uname" maxlength="8" ></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="12">
                <el-form-item label="所在单位" prop="Company">
                  <el-input v-model="ruleForm.Company" maxlength="15"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12"> </el-col>
            </el-row>
            <el-form-item>
              <el-button type="primary" @click="submitForm('ruleForm')">发送</el-button>
            </el-form-item>
          </el-form>
        </div> -->
      </div>
      </div>
    </div>
  </div>
</template>
<script>
import { sendMail } from '@/api/BusinessConsulting.js'
import { stripscript, calidateEmail, calidatePhone, chineselin } from '@/utils/validate.js'
export default {
  data() {
    var validateMailbox = (rule, value, callback) => {
      //验证里的过滤方法先把用户名过滤
      this.ruleForm.mailbox = stripscript(value)
      value = this.ruleForm.mailbox
      if (value === '') {
        callback(new Error('请输入邮箱'))
      } else if (!calidateEmail(value)) {
        callback(new Error('邮箱格式错误'))
      } else {
        callback()
      }
    }
    var validatePhone = (rule, value, callback) => {
      //过滤密码
      this.ruleForm.phone = stripscript(value)
      value = this.ruleForm.phone
      if (value === '') {
        callback(new Error('请输入手机号'))
      } else if (!calidatePhone(value)) {
        callback(new Error('手机号格式错误'))
      } else {
        callback()
      }
    }
    var validatetextarea = (rule, value, callback) => {
      // //过滤密码
      // this.ruleForm.textarea = stripscript(value)
      // value = this.ruleForm.phone
      if (value === '') {
        callback(new Error('请输内容'))
      } else {
        callback()
      }
    }
    return {
      ruleForm: {
        mailbox: '',
        Landline: '',
        phone: '',
        uname: '',
        Company: '',
        textarea: '',
      },
      rules: {
        mailbox: [{ required: true, validator: validateMailbox, trigger: 'blur' }],
        phone: [{ required: true, validator: validatePhone, trigger: 'blur' }],
        textarea: [{ required: true, validator: validatetextarea, trigger: 'blur' }],
      },
    }
  },
  methods: {
    //固定电话验证
    LandlineVerification() {
      console.log(1111111111)
      // if(!chineselin(this.Landline)){
      //    this.$message({
      //     message: '格式错误',
      //     type: 'warning'
      //   });
      // }
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          const loading = this.$loading({
            lock: true,
            text: '正在发送',
            spinner: 'el-icon-loading',
            background: 'rgba(0, 0, 0, 0.7)',
          })

          let obj = {
            email: this.ruleForm.mailbox,
            telphone: this.ruleForm.phone,
            phone: this.ruleForm.Landline,
            text: this.ruleForm.textarea,
            orgName: this.ruleForm.Company,
            type: 2,
            name: this.ruleForm.uname,
          }
          sendMail(obj).then(res => {
            loading.close()
            console.log(res)
            if (res.data.code == 200) {
              this.$message({
                message: `${res.data.msg}`,
                type: 'success',
              })
              this.ruleForm.mailbox = ''
              this.ruleForm.phone = ''
              this.ruleForm.Landline = ''
              this.ruleForm.textarea = ''
              this.ruleForm.Company = ''
              this.ruleForm.uname = ''
            } else {
              this.$message({
                message: `${res.data.msg}`,
                type: 'warning',
              })
            }
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
  },
}
</script>
<style lang="scss" scoped>
.TheWholeExperiment {
  margin-top: -3px;
}
.material-wrap {
  width: 100%;
  // height: 100vh;
  // overflow: auto;
  background-color: #f9f9f9;
}
.materialWrapX {
  width: 1100px;
  height: 820px;
  margin: auto;
  padding: 100px 0;
  position: relative;
  text-align: center;
  background-color: #ffffff;
}
.materialWrapX-titel {
  position: absolute;
  top: 5%;
  left: 43%;
}
.fon-i {
  width: 48px;
  height: 22px;
  position: absolute;
  top: 10px;
  left: 524px;
  font-family: PingFang SC;
  font-size: 14px;
  font-weight: normal;
  font-stretch: normal;
  line-height: 22px;
  letter-spacing: 0px;
  color: #606266;
}
.consultingService {
  display: flex;
  flex-direction: row;
  justify-content: center;
}
.InputLayout {
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  justify-content: center;
}
.title-attribute {
  padding-right: 279px;
}
.font-i {
  width: 70px;
  height: 20px;
  font-size: 14px;
  font-weight:bolde;
  font-stretch: normal;
  vertical-align:middle;
  text-align:right;
  line-height: 20px;
  letter-spacing: 0px;
   color: #606266;
}
.formlayout {
  width: 900px;
  // margin-top:60px;
  margin: 50px auto;
}
.wby {
  padding-left: 176px;
}
.LocationChange {
  width: 48px;
  height: 22px;
  position: absolute;
  top: 10px;
  left: 524px;
  font-family: PingFang SC;
  font-size: 16px;
  font-weight: normal;
  font-stretch: normal;
  line-height: 22px;
  letter-spacing: 0px;
  color: #ffffff;
  position: absolute;
  top: 10px;
  left: 26px;
}
.PictureLocations {
  position: absolute;
  top: 118px;
  left: 110px;
}
.DividingLineLeft {
  width: 429px;
  height: 0px;
  border: solid 1px #cccccc;
  position: absolute;
  top: 74px;
  left: 35px;
}
.DividingLineRight {
  width: 469px;
  height: 0px;
  border: solid 1px #cccccc;
  position: absolute;
  top: 74px;
  right: 38px;
}
.content{
  width:900px;
  margin: 0 auto;
}
a{
  color:#606266 ;
}
</style>