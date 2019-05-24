<template>
  <div class="app-body">
    <Header />
    <div class="page-serverDetail">
      <Back></Back>
      <!-- 详情头部 -->
      <el-row class="detail-header">
          <el-col :span="4">
              <img src="/images/detail/图层 8.png">
          </el-col>
          <el-col :span="7">
            <div class="title">全球矢量中文注记服务</div>
            <div class="des"><span>服务简介:{{mapdata.create_date}}</span> </div>
            <div class="des"><span>发布时间:{{renderTime(mapdata.create_date)}}</span></div>
            <div class="des"><span>坐标系:{{detailinfo.CSYS}}</span></div>
            <div class="des"><span>服务URL:{{detailinfo.serverurl}}</span></div>
          </el-col>
          <el-col :span="7">
            <div class="title">&nbsp;</div>
            <div class="des"><span>服务类型:{{detailinfo.servertype}}</span></div>
            <div class="des"><span>主题分类:{{detailinfo.subjectclass}}</span></div>
            <div class="des"><span>投影类型:{{detailinfo.shadowtype}}</span></div>
          </el-col>
          <el-col :span="6">
            <div>
              <el-button @click="toView">查看</el-button>
            </div>
            <div>
              <el-button @click="download">下载</el-button>
            </div>
          </el-col>
      </el-row>
      <!-- 详情主体 -->
      <el-row class="content">
        <!-- <el-col :span="23">图层基本信息</el-col> -->
        <el-col :span="23">
          <div class="content-title">
            <img src="/images/detail/修饰.svg"><span>图层基本信息</span>
          </div>
          <el-form label-width="111px">
            <el-form-item label="图层名称">
              <span>{{mapdata.layerName}}</span>
            </el-form-item>
            <el-form-item label="图层简介">
              <span>{{mapdata.des}}</span>
            </el-form-item>
            <el-form-item label="覆盖区域">
              <span>{{mapdata.area}}</span>
            </el-form-item>
            <el-form-item label="上次更新时间">
              <span>{{renderTime(mapdata.update_date)}}</span>
            </el-form-item>
            <el-form-item label="服务范围">
              <div>{{mapdata.xmax}}</div>
              <div>{{mapdata.xmin}}</div>
              <div>{{mapdata.ymax}}</div>
              <div>{{mapdata.ymin}}</div>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
      <!-- <div>
        <div class="toast">
          <p>服务器错误，请稍后重试</p>
        </div>
      </div> -->
      <el-dialog  title="提示" :visible.sync="dialogTableVisible" top="35vh" width="20%" show-ok='true'	>
        <span>你还没有下载权限,点击按钮去申请权限</span>
        <div slot="footer" class="dialog-footer">
          <el-button type="primary"  @click="innerVisible = true">去申请</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>


<script>
import Back from '@/components/back/index'
import Header from '@/components/header/Header'
import {getDetailData} from '@/api/detail/index'
export default {
    data(){
        return {
            mapdata:{
                name:'img',
                des:'全球影像地图服务',
                area:'全球',
                updatetime:'2015年3月12号',
                servicearea:'左上角 -180'
            },
            detailinfo:{
              serverdes:'全球影像地图服务',
              time:'2014年2月18号',
              CSYS:'CGS2000',
              serverurl:'http://t0.china',
              servertype:'OGC WMTS',
              subjectclass:'基础地理框架数据',
              shadowtype:'经纬度'
            },
            dialogTableVisible:false
        }
    },
    created() {
      this.initData();
    },
    methods:{
      async initData() {
        let params = {
          code:this.$route.query.code,
          type:this.$route.query.type,
        }
        let res = await getDetailData(params);
        const { code, data } = res;
        if (code === '0') {
          this.mapdata =  data;
          console.log(this.mapdata)
        }
      },
      renderTime(date) {
        let dateee = new Date(date).toJSON();
        return new Date(+new Date(dateee) + 8 * 3600 * 1000).toISOString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '')
      },
      toView() {
        this.$router.push({name:'vectorDetail',query:{}})
      },
      download(){
        this.dialogTableVisible = true;
      }
    },
    components:{
      Header,
      Back
    }
}
</script>
<style lang="scss" scoped>
.page-serverDetail{
  background-color: #FFFFFF;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  .detail-header{
    padding-top: 40px;
    margin: 0 2%;
    img{
      vertical-align: middle;
    }
    .el-col-7{
      .title{
        font-size: 24px;
        color: rgb(92, 101, 115);
        line-height: 1;
        margin-bottom: 20px;
      }
      .des{
        font-size: 12px;
        color: rgb(92, 101, 115);
        line-height: 2.667;
      }
    }
    .el-col-6{
      div{
        margin-top: 1.5rem;
        button{
          width: 7rem;
        }
      }
    }
  }
  .content{
    .el-col-23{
      margin: 20px 2%;
      border: 1px solid #E4E6EA;
      .content-title{
        padding: 20px 0 20px 20px;
        border-bottom: 1px dashed #E4E6EA;
        span{
          font-size: 16px;
          color: rgb(92, 101, 115);
          line-height: 1.5;
          margin-left: 11px;
        }
      }
      .el-form{
        .el-form-item{
          margin-bottom:0;
          font-size: 14px;
          color: rgb(92, 101, 115);
          line-height: 2.857;
        }
      }
    }
  }
}
</style>

