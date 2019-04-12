<template>
    <div class="detail">
      <el-header>
        <div class="key">
          <div>
            <span>已选择:</span>
            <el-button v-for="(item,index) in selectkey" :key="index">{{item.keyword}}</el-button>          
          </div>
          <div>
            <span>关键字筛选:</span>
            <span class="keyword">
              <Scale></Scale>
            </span>
            <span class="keyword">
              <Area></Area> 
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
                        <div>数据类型:{{item.type}}</div>
                        <div>发布时间:{{item.createData}}</div>
                        <el-button style="padding: 3px 0" type="text">详情</el-button>
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
      selectkey:''
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
        console.log(res)
        this.totalpage =  res.totalCount;
        let reskey =  await categoryKey(this.$route.query.code);
        this.currentkey = reskey;
      },
      async handleSizeChange(val){
        console.log(123123)
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