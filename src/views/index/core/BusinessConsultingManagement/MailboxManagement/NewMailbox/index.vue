<template>
  <div id= "MeetEachOther">
    <el-dialog 
    :title=" btns.btn == 0 ? '新增' :'编辑'" 
    :visible.sync="EmailDisplay" width="30%" 
    :modal-append-to-body="false" 
    center 
    @close="close"
     @open="open">
      <div>
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
          <el-form-item label="姓名" prop="personName">
            <el-input v-model="ruleForm.personName" style="width: 200px"></el-input>
          </el-form-item>
          <el-form-item label="邮箱" prop="personEmail">
            <el-input v-model="ruleForm.personEmail" style="width: 200px"></el-input>
          </el-form-item>
          <el-form-item label="电话" prop="persomPhone">
            <el-input v-model.number="ruleForm.persomPhone" style="width: 200px" maxlength="11" oninput = "value=value.replace(/[^\d]/g,'')"></el-input>
          </el-form-item>
          <div class="DividingLines"></div>
          <div style="text-align: center; margin-right:-200px;margin-top:30px;">
            <el-form-item>
              <el-button @click="EmailDisplay = false">取 消</el-button>
              <el-button type="primary" @click="submitForm('ruleForm')">确 定</el-button>
            </el-form-item>
          </div>
        </el-form>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { stripscript, calidateEmail, calidatePhone, calidateUser,chineseName } from '@/utils/validate.js'
import { add,queryById,update } from '@/api/BusinessConsulting.js'
export default {
  props: ['EmailDisplay',"btn"],
  data() {
    var validatePersonName = (rule, value, callback) => {
      //验证里的过滤方法先把用户名过滤
      this.ruleForm.personName = stripscript(value)
      value = this.ruleForm.personName
      if (value === '') {
        callback(new Error('请输入姓名'))
      } else if (!chineseName(value)) {
        callback(new Error('姓名格式错误'))
      } else {
        callback()
      }
    }
    var validatePersonEmail = (rule, value, callback) => {
      //过滤密码
      this.ruleForm.personEmail = stripscript(value)
      value = this.ruleForm.personEmail
      if (value === '') {
        callback(new Error('请输入邮箱'))
      } else if (!calidateEmail(value)) {
        callback(new Error('邮箱格式错误'))
      } else {
        callback()
      }
    }
    // var validatePersonPhone = (rule, value, callback) => {
    //   //过滤密码
    //   this.ruleForm.persomPhone = stripscript(value)
    //   value = this.ruleForm.persomPhone
    //   if (!calidatePhone(value)) {
    //     callback(new Error('手机格式错误'))
    //   } else {
    //     callback()
    //   }
    // }
    return {
        btns:{},
      EmailDisplay: false,
      ruleForm: {
        personName: '',
        personEmail: '',
        persomPhone: '',
        id:""
      },
      rules: {
        personName: [{ required: true, validator: validatePersonName, trigger: 'blur' }],
        personEmail: [{ required: true, validator: validatePersonEmail, trigger: 'blur' }],
        // persomPhone: [{  validator: validatePersonPhone, trigger: 'blur' }],
      },
    }
  },
  watch: {
    EmailDisplay: {
      handler(newName, oldName) {
        //    console.log(newName)
        this.EmailDisplay = newName
      },
      immediate: true,
      deep: true,
    },
    btn: {
      handler(newName, oldName) {
        //    console.log(newName)
        console.log(newName,"**************")
        this.btns = newName
        this.ruleForm.personName = newName.vals.personName
        this.ruleForm.personEmail = newName.vals.personEmail
        this.ruleForm.persomPhone = newName.vals.persomPhone
        this.ruleForm.id = newName.vals.id
      },
      immediate: true,
      deep: true,
    },
  },
  methods: {
      open(){
         if(this.btns.vals){
             console.log(11111111111111)
             let id = this.btns.vals.id
         queryById(id).then( res=>{
             console.log(res.data.data,111111111111111)
          this.ruleForm = res.data.data
         })
         } 
      },
    close() {
      this.$emit('ReturnToMail', this.EmailDisplay)
    },
    // //点击事件X
    // turnOff(){
    //   this
    // },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
            if(this.btns.btn == 0){
                     let obj = {
            persomPhone: this.ruleForm.persomPhone,
            personEmail: this.ruleForm.personEmail,
            personName: this.ruleForm.personName,
            type: 2,
          }
        add(obj).then(res=>{
            console.log(res)
                  if (res.data.code == 200) {
              this.$message({
                message: `${res.data.msg}`,
                type: 'success',
              })
              this.$emit("handleClick");
            this.EmailDisplay = false
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
        }
        if(this.btns.btn == 1){
            console.log(111111111111111)
            let obj = {
            persomPhone: this.ruleForm.persomPhone,
            personEmail: this.ruleForm.personEmail,
            personName: this.ruleForm.personName,
            id:this.ruleForm.id,
            type: 2,
          }
            update(obj).then( res=>{
                console.log(res)
                           if (res.data.code == 200) {
              this.$message({
                message: `${res.data.msg}`,
                type: 'success',
              })
               this.$emit("handleClick");
            this.EmailDisplay = false
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
        }
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
  },
}
</script>
<style lang="scss" >
.DividingLines{
  width:100%;
	height:1px;
  margin-top:10px;
  margin-bottom: 10px;
	background-color: #cccccc;
}
.NewTitle{
  width:111.7%;
	height: 50px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
	background-color: #0786e3;
  position: absolute;
  top:-79px;
  left:-25px;
  right: 0px;
}
.NewTitleTis{
  line-height: 50px;
  padding-left: 10px;
  text-align: right;
    vertical-align: middle;
    float: left;
  width: 32px;
	height: 22px;
	font-family: PingFang SC;
	font-size: 16px;
	font-weight: normal;
	font-stretch: normal;
	letter-spacing: 0px;
	color: #ffffff;
  // -webkit-box-sizing:border-box;
  // box-sizing:border-box;
}
.NewTitleTrt{
  width: 14px;
	height: 13px;
   line-height: 50px;
  padding-right: 10px;
  color: #ffffff;
  cursor: pointer;
}
/*************************** */
#MeetEachOther{
 .el-transfer-panel{
        width: 220px  !important;
        height:435px !important;
    }
    .el-transfer-panel__list.is-filterable{
        height:200px;
    }
.el-dialog__header{
  background-color: #0075cb;
}
.el-dialog__title {
  margin-left:-95%  !important;
	width: 32px;
	height: 22px;
	font-family: PingFang SC;
	font-size: 16px;
	font-weight: normal;
	font-stretch: normal;
	line-height: 22px;
	letter-spacing: 0px;
	color: #ffffff;
} 
.el-icon-close:before {
  color:#e4e4e4 ;
} 
// .el-transfer-panel
}
</style>