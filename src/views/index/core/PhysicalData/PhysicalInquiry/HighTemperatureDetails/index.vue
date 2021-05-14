<template>
  <div id="TheWholeExperiment">
    <div class="FlexibleLayout">
      <div><i>实物试验数据库</i> ><i>高温高压腐蚀模拟</i>><i>查看详情</i></div>
      <div style="padding-right:50px">
        <el-button type="primary" icon="el-icon-arrow-left" @click="TurnBack"
          >返回</el-button
        >
      </div>
    </div>
    <div class="material-wrap">
      <div class="TableTitle">
        <h1 class="fnt-w">高温高压腐蚀模拟详情</h1>
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
            <div class="Header-wb">材质</div>
            <div class="content-wb">{{dataDetails.material}}</div>
          </div>
        </div>
        <div>
          <div class="RowLayout">
            <div class="Header-wb">试验温度</div>
            <div class="content-wb">{{dataDetails.experimentTemperature}}</div>
            <div class="Header-wb">试验时间</div>
            <div class="content-wb">{{dataDetails.experimentTimeLength}}</div>
          </div>
        </div>
        <div>
          <div class="RowLayout">
            <div class="Header-wb">腐蚀性介质</div>
            <div class="content-wb">{{dataDetails.corrosiveMedium}}</div>
            <div class="Header-wb">总压力</div>
            <div class="content-wb">{{dataDetails.totalPressure}}</div>
          </div>
        </div>
        <div>
          <div class="RowLayout">
            <div class="Header-wb">腐蚀性气体类型</div>
            <div class="content-wb">{{dataDetails.corrosiveGasType}}</div>
            <div class="Header-wb">腐蚀性气体含量</div>
            <div class="content-wb">{{dataDetails.corrosiveGasContent}}</div>
          </div>
        </div>
        <div>
          <div class="RowLayout">
            <div class="Header-wb">转速</div>
            <div class="content-wb">{{dataDetails.rotaingSpeed}}</div>
            <div class="Header-wb">腐蚀速率</div>
            <div class="content-wb">{{dataDetails.corrosionRate}}</div>
          </div>
        </div>
        <div>
          <div class="RowLayout">
            <div class="Header-wbimg">配图</div>
            <div class="content-wbimg">
              <template v-for="item in imgs">
              <div v-show="item !=null" v-if="item.typeNumber == 3"   :key="item.id" style="padding-left:10px">
                <img class="PictureSorting" :src="item.fileUrl" alt="" @click="getPreview(item.fileUrl)">
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
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  border-right: 1px solid #cccccc;
  border-bottom: 1px solid #cccccc;
  font-size: 14px;
  text-align: center;
  line-height: 100px;
}
.PictureSorting{
  width:100px;
  height: 100px;
}
.elastic{
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
</style>