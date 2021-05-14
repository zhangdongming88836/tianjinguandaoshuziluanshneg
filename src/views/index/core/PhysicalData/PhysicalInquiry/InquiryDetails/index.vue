<template>
  <div id="TheWholeExperiment">
    <div class="FlexibleLayout">
      <div><i>实物试验数据库</i> ><i>水压爆破试验</i>><i>查看详情</i></div>
      <div style="padding-right:50px">
        <el-button type="primary" icon="el-icon-arrow-left" @click="TurnBack"
          >返回</el-button
        >
      </div>
    </div>
    <div class="material-wrap">
      <div class="TableTitle">
        <h1 class="fnt-w">水压爆破试验详情</h1>
      </div>
      <div class="pressure-table">
        <div class="RowLayout">
          <div class="Header-wb">案例编号</div>
          <div class="content-wb">{{dataDetails.code}}</div>
          <div class="Header-wb">产品名称</div>
          <div class="content-wb">{{dataDetails.productionName}}</div>
        </div>
        <div>
          <div class="RowLayout">
            <div class="Header-wb">委托单位</div>
            <div class="content-wb">{{dataDetails.entrustmentOrg}}</div>
            <div class="Header-wb">规格型号</div>
            <div class="content-wb">{{dataDetails.specificationModel}}</div>
          </div>
        </div>
        <div>
          <div class="RowLayout">
            <div class="Header-wb">材质</div>
            <div class="content-wb">{{dataDetails.material}}</div>
            <div class="Header-wb">送检时间</div>
            <div class="content-wb">{{dataDetails.inspectionTime}}</div>
          </div>
        </div>
        <div>
          <div class="RowLayout">
            <div class="Header-wb">依据标准</div>
            <div class="content-wb">{{dataDetails.standard}}</div>
            <div class="Header-wb">爆破最大压力</div>
            <div class="content-wb">{{dataDetails.blastMaxPressure}}</div>
          </div>
        </div>
        <div>
          <div class="RowLayout">
            <div class="Header-wb">爆破口长度</div>
            <div class="content-wb">{{dataDetails.blastHoleLength}}</div>
            <div class="Header-wb">爆破口宽度</div>
            <div class="content-wb">{{dataDetails.blastHoleWidth}}</div>
          </div>
        </div>
        <div>
          <div class="RowLayout">
            <div class="Header-wb">距离管端环焊缝最短距离</div>
            <div class="content-wch">{{dataDetails.minDistance}}</div>
          </div>
        </div>
        <div>
          <div class="RowLayout">
            <div class="Header-wbimgs">爆破失效后形貌</div>
            <div class="content-wbimgs">
              <template v-for="item in imgs">
              <div v-show="item !=null" v-if="item.typeNumber == 1"   :key="item.id" style="padding-left:10px">
                <img class="PictureSorting" :src="item.fileUrl" alt="" @click="getPreview(item.fileUrl)">
              </div>
              </template>
            </div>
          </div>
        </div>
        <div>
          <div class="RowLayout">
            <div class="Header-wbimgs">时间-压力曲线</div>
            <div class="content-wbimgs">
               <template v-for="item in imgs">
              <div v-show="item !=null" v-if="item.typeNumber == 2"   :key="item.id" style="padding-left:10px;">
                <img class="PictureSorting" :src="item.fileUrl" alt=""  @click="getPreview(item.fileUrl)">
              </div>
              </template>
            </div>
          </div>
        </div>
        <div>
          <div class="RowLayout">
            <div class="Header-wbimg">完整报告</div>
            <div class="content-wbimg">
                <template v-for="item in imgs">
               <div v-show="item !=null" v-if="item.typeNumber == 4"   :key="item.id" class="elastic">
                 <div style="padding-left:10px" class="textOVE"> 
                  <a v-if="item.fileType == 'pdf' || 'doc' || 'docx'" :href="item.fileUrl" target="_blank">{{item.fileName}}</a>
                  <a v-else @click="Tips">{{item.fileName}}</a>
                </div>
                 <div style="padding-left:10px"><i>{{item.fileSize}}</i></div>
                 <div style="padding-left:10px">
                   <el-button type="primary" icon="el-icon-download" size="mini" @click="download(item.fileUrl)">下载</el-button>
                 </div>
              </div>
              </template>
            </div>
          </div>
        </div>
      </div>
    </div>
     <preview
      :imgarrUrl="imgarrUrl"
      :centerDialogVisible.sync="centerDialogVisible"
      @closes="closes"
    ></preview>
  </div>
</template>
<script>
import {experimentProjectDetails} from "@/api/index"
//预览图片公共组件
import preview from "@/components/preview/index";
export default {
  components:{
   preview
  },
  data() {
    return {
      dataDetails:{},
      imgs:[],
       //图片地址
      imgarrUrl: "",
      //打开预览图片
      centerDialogVisible: false,
    };
  },
  methods: {
       //下载文件
    download(val) {
      //   Api.EmergencyPlanApi.PreplanDownload(val.id).then((response) => {
      //    console.log(response)

      // });
      let url = val;
      let link = document.createElement("a");
      link.style.display = "none";
      link.href = url;
      link.setAttribute("download", "res.doc"); // 自定义下载文件名（如exemple.txt）
      document.body.appendChild(link);
      link.click();
    },
    //不是pdf的提示
    Tips(){
       this.$message({
          showClose: true,
          message: '该附件不支持在线查看，请下载查看'
        });
    },
    //返回
    TurnBack() {
      this.$router.go(-1);
    },
    //打开预览图片
    getPreview(val) {
      // console.log(val)
      // this.guidePic
      //   ? (this.showViewer = true)
      //   : this.$message.info("当前没有可预览的图片");
      // console.log(val)
      this.imgarrUrl = val;
      this.centerDialogVisible = true;
    },
       //接受子组件关闭图片
    closes(val) {
      this.centerDialogVisible = val;
    },
  },
  beforeMount() {
    // console.log(this.$route.query.id);
    let id = this.$route.query.id
    experimentProjectDetails(id).then( response => {
       console.log(response.data.data)
      this.dataDetails = response.data.data.ep
      this.imgs = response.data.data.fileDate
    })

  },
};
</script>
<style lang="scss" scoped>
#TheWholeExperiment {
  padding: 10px;
}
.material-wrap {
  width: 100%;
  height:650px;
  overflow:auto;
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
  border-top: solid 1px #cccccc;
  border-left: solid 1px #cccccc;
  margin: 0 auto  100px;
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
  height: 250px;
  border-right: 1px solid #cccccc;
  border-bottom: 1px solid #cccccc;
  font-size: 14px;
  text-align: center;
  line-height: 250px;
  background-color: #f9f9f9;
}
.Header-wbimgs{
  width: 20%;
  height:100px;
  border-right: 1px solid #cccccc;
  border-bottom: 1px solid #cccccc;
  font-size: 14px;
  text-align: center;
  line-height:100px;
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
  height: 250px;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  flex-wrap: wrap;
  border-right: 1px solid #cccccc;
  border-bottom: 1px solid #cccccc;
  font-size: 14px;
  text-align: center;
  line-height: 100px;
}
.content-wbimgs {
  width: 80%;
  height:100px;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  flex-wrap: wrap;
  border-right: 1px solid #cccccc;
  border-bottom: 1px solid #cccccc;
  font-size: 14px;
  text-align: center;
  line-height: 100px;
}
.PictureSorting{
  width:100px;
  height:100px;
  text-align:center;
}
.elastic{
  width:350px;
  height:50px;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
}
.textOVE{
width: 170px; 
height: 58px;
overflow:hidden; //超出的文本隐藏
text-overflow:ellipsis; //溢出用省略号显示
white-space:nowrap; //溢出不换行
}
a{
  color: #606266;
}
</style>