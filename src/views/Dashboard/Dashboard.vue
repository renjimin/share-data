<template>
    <div class="detail">
        <el-row :gutter="12">
            <div v-for="(item,index) in detail" :key="index" class="text item">   
                <el-col :span="12">
                    <el-card class="box-card" shadow="hover">
                    <div slot="header" class="clearfix">
                        <span>{{item.name}}</span>
                        <el-button style="float: right; padding: 3px 0" type="text">详情</el-button>
                    </div>
                      <img src="../../assets/images/list.png">
                      <div class="text item">
                        <div class="contain">
                          <div>{{item.name}}</div>
                          <div>发布时间:{{new Date()}}</div>
                          <div>关键字<span>影像地图</span><span>经纬度</span><span>WMTS</span></div>
                        </div>                          
                      </div>                    

                    </el-card> 
                </el-col>
            </div>
        </el-row>
        <el-pagination
          background
          :page-size="20"
          :pager-count="11"
          layout="prev, pager, next"
          :total="1000">
        </el-pagination>        
    </div>
</template>
<script>
import {categoryDetail} from '@/api/index/index'
export default {
  data() {
    return {
      nowPage:1,
      pageSize:4,
      detail:''
    };
  },
  computed: {

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
            this.detail = res;
      }
  },
};
</script>
<style lang="scss">
.detail{
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
    height: 15rem;
    img{
      width: 15rem;
      height: 15rem;
    }
    .text{
      div:first-child{
        height: 10rem;
        // display: -webkit-box;
        // -webkit-box-orient: vertical;
        // -webkit-line-clamp: 4;
        // overflow: hidden;     
      }
      div:nth-child(2){
        height: 2rem;
      }
      div:nth-child(3){
        height: 3rem;
        span{
          background-color: #8C96B0;
          margin-left: 1rem;
          padding: 2px;
        }
      }      
    }
  }
}
</style>