<template>
    <div class="detail">
      <el-header>
        <div class="key">
          <div>
            <span>已选择:</span>
            <el-tag
              v-for="tag in tags"
              :key="tag.name"
              @close="handleClose(tag)"
              closable
              :type="tag.type">
              {{tag.name}}
            </el-tag>
          </div>
          <div>
            <span>关键字筛选:</span>
            <span class="keyword">
              <Scale  @messageData="getscaleData"></Scale>
            </span>
            <span class="keyword">
              <Area  @messageData="getareaData"/>
            </span>
          </div>
        </div>
      </el-header>
      <el-row :gutter="12">
          <div v-for="(item,index) in detail" :key="index" class="text item">
              <el-col :span="12">
                  <el-card class="box-card" shadow="hover">
                    <img src="../../assets/images/list.png">
                    <div class="text item">
                      <div class="contain">
                        <div>{{item.name}}</div>
                        <div>数据类型:{{dataType[item.type]}}</div>
                        <div>发布时间:{{item.createData}}</div>
                        <el-button style="padding: 3px 0" type="text" @click="goDetail(item)">详情</el-button>
                      </div>
                    </div>
                  </el-card>
              </el-col>
          </div>
      </el-row>
      <el-pagination
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        layout="prev, pager, next"
        :total="totalpage">
      </el-pagination>
    </div>
</template>
<script>
import Scale from '@/components/scale/index.vue'
import Area from '@/components/area/index.vue'
import {categoryDetail,categoryKey} from '@/api/index/index'
export default {
  data() {
    return {
      nowPage:1,
      pageSize:4,
      totalpage:0,
      detail:'',
      currentkey:'',
      selectkey:'',
      dataType:{
        'DynamicNodeGPS':'动态数据',
        'DynamicNodeVideo':'动态数据',
        'DynamicNodeFixed':'动态数据',
        'WMTSNodeType':'服务数据',
        'WMSNodeType':'服务数据',
        'GovDataNode':'政务数据',
        'DLGDataNode': '矢量数据'
      },
      tags: []
    };
  },
  computed: {

  },
  components: {
    Scale,
    Area
  },
  created() {
      this.initData();
  },
  watch:{
    "$route": "initData"
  },
  methods: {
    async initData (){
      let params = {
        "code": this.$route.query.code,
        "nowPage": this.nowPage,
        "pageSize": this.pageSize
      }
      let res = await categoryDetail(params);
      this.detail = res.data;
      this.totalpage =  res.totalCount;
      let reskey =  await categoryKey(this.$route.query.code);
      this.currentkey = reskey;
    },
    handleClose(tag) {
      this.tags.splice(this.tags.indexOf(tag), 1);
    },
    async handleSizeChange(val){
      let params = {
        "code": this.$route.query.code,
        "nowPage": val,
        "pageSize": this.pageSize
      }
      let res = await categoryDetail(params);
      console.log(res)
      this.detail = res;
      this.totalpage =  res.totalCount;
    },
    async handleCurrentChange(val){
      let params = {
        "code": this.$route.query.code,
        "nowPage": val,
        "pageSize": this.pageSize
      }
      let res = await categoryDetail(params);
      this.detail = res.data;
    },
    goDetail(item){

      console.log(item)
      let routerurl = '';
      switch(item.type){
        case 'DynamicNodeGPS':
        case 'DynamicNodeVideo':
        case 'DynamicNodeFixed': //动态数据类型
          routerurl = '/dynamicData';
          break;
        case 'WMTSNodeType':
        case 'WMSNodeType'://服务数据类型
          routerurl = '/serverdetails';
          break;
        case 'GovDataNode'://栅格/影像数据类型
          routerurl = '/govDetail';
          break;
        case 'DLGDataNode': //矢量数据类型
          routerurl = '/serverdetails';
          break;
        default:
          break;
      }
      // this.$router.push(routerurl);
      this.$router.push({path: routerurl, query: {code: item.code,type:item.type}})
    },
    getareaData(val){
      this.tags.push(val)
    },
    getscaleData(val){
      this.tags.push(val)
    }
  },
};
</script>
<style lang="scss">
.detail{
  .el-header{
    height: auto !important;
    border: 1px solid #E4E6EA;
    margin-bottom: 1rem;
    .el-tag{
      margin-right: 10px;
    }
    .key{
      div{
        line-height: 4rem;
      }
      div:first-child{
        border-bottom: 2px dashed  #E4E6EA;
      }
    }
    .keyword{
      margin-left: 20px;
      .el-button{

      }
    }
  }
  .el-card{
    margin-bottom: 2rem;
    .clearfix{
      font-size: 22px;
      color: #5C6573;
      button span{
        color: #73838F;
        border: 1px solid #73838F;
        padding: 5px 10px;
        border-radius: 5px;
      }
    }
  }
  .el-card__body{
    display: flex;
    align-items: flex-start;
    height: 12.5rem;
    img{
      width: 10rem;
      height: 10rem;
      margin-right: 1rem;
    }
    .text{
      .contain{
        div:first-child{
          height: 5rem;
          font-size: 22px;
          color: #5C6573;
        }
        div:nth-child(2){
          height: 2rem;
        }
        div:nth-child(3){
          height: 2rem;
          span{
            background-color: #8C96B0;
            margin-left: 1rem;
            padding: 2px;
          }
        }
        button span{
          color: #73838F;
          border: 1px solid #73838F;
          padding: 5px 10px;
          border-radius: 5px;
        }
      }
    }
  }
}
</style>
