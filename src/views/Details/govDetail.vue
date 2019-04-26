<template>
  <div>
    <Header />
    <div class="page-govDetail">
      <div class="back-header">
        <el-row>
          <el-col :span="2" @click.native="goBack"><img src="/images/pubilc/icon-back.png">返回</el-col>
          <el-col :span="22">
            <a href="" download="政务数据.csv" id="btn" @click="downloadexcel">下载</a>
            <!-- <el-button size="mini" round @click="downloadexcel">下载</el-button> -->
          </el-col>
        </el-row>
      </div>
      <div class="el-content">
        <el-col :span="8"><div class="grid-content bg-purple">政务数据</div></el-col>
        <el-col :span="12">&nbsp;</el-col>
        <el-col :span="4">
          <el-input
            placeholder="请输入关键字查询"
            v-model="inputvalue">
            <i slot="prefix" class="el-input__icon el-icon-search"></i>
          </el-input>
        </el-col>
      </div>
      <el-main>
        <el-table
          :data="tableData"
          stripe
          style="width: 100%">
          <el-table-column
            label="序号"
            type="index"
            width="100">
          </el-table-column>
          <el-table-column
          v-for="(item,index) in tableCol"
          :key='index'
            :prop="item.fieldName"
            :label="item.fieldAlias"
            >
          </el-table-column>
        </el-table>
      </el-main>
      <el-pagination
        background
        @current-change="handleCurrentChange"
        layout="prev, pager, next"
        :total="totalpage">
      </el-pagination>
    </div>
  </div>
</template>
<script>
import Header from '@/components/header/Header'
import {getDetailData} from '@/api/detail/index'
export default {
    components:{
      Header
    },
    data(){
        return {
          tableData: [],
          totalpage:0,
          tableCol:[],
          inputvalue:''
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
          nowPage:1,
          pageSize:10
        }
        let res = await getDetailData(params);
        const { code } = res;
        if (code === '0') {
          this.tableCol =  res.alias;
          this.tableData = res.data.data;
          this.totalpage = res.data.totalCount;
        }
      },
      async handleCurrentChange(val) {
        let params = {
          code:this.$route.query.code,
          type:this.$route.query.type,
          nowPage:val,
          pageSize:10
        }
        let res = await getDetailData(params);
        const { code } = res;
        if (code === '0') {
          this.tableCol =  res.alias;
          this.tableData = res.data.data;
          this.totalpage = res.data.totalCount;
        }
      },
      goBack() {
        this.$router.go(-1);
      },
      downloadexcel() {
        var html = document.getElementsByTagName("table")[0].outerHTML;
        // 实例化一个Blob对象，其构造函数的第一个参数是包含文件内容的数组，第二个参数是包含文件类型属性的对象

        var blob = new Blob([this.tableData], { type: "application/vnd.ms-excel " });
        var a = document.getElementsByTagName("a")[0];
        // 利用URL.createObjectURL()方法为a元素生成blob URL
        a.href = URL.createObjectURL(blob);
        // 设置文件名，目前只有Chrome和FireFox支持此属性
        a.download = "政务数据.xls";
      }
    }
}
</script>
<style lang="scss">
.page-govDetail{
  background-color: #FFFFFF;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  .back-header{
    border-bottom: 1px solid #E4E6EA;
    height: 50px;
    line-height: 50px;
    color: #3E84D6;
    font-size: 14px;
    img{
      margin: 0 5px 0 15px;
      vertical-align: middle;
    }
    .el-col-22{
      a{
        padding: 7px 15px;
        display: inline-block;
        line-height: 1;
        white-space: nowrap;
        cursor: pointer;
        background: #FFF;
        border: 1px solid #DCDFE6;
        color: #5C6573;
        text-align: center;
        box-sizing: border-box;
        outline: 0;
        margin: 0;
        transition: .1s;
        font-weight: 500;
        padding: 4px 15px;
        font-size: 14px;
        border: 1px solid #7F8494;
        border-radius: 5px;
        position: absolute;
        top: 12px;
        right: 30px;
      }
    }
  }
  .el-content{
    line-height: 44px;
    height: 44px;
    background-color: #7F8494;
    color: #FFFFFF;
    .el-col-8{
      div{
        margin-left: 2rem;
      }
    }
    .el-col-4{
      div{
        right: 2rem;
      }
    }
    .el-input{
      input{
        background-color: rgba(0, 0, 0, 0);
        height: 30px;
        line-height: 30px;
      }
    }
  }
  .el-content{
    margin: 20px 2% 0 2%;
  }
  .el-main{
    margin: 0 2% 20px 2%;
    padding: 0 ;
    .el-table{
      border: 1px solid #E4E6EA;
    }
  }
  .el-pagination{
    text-align: right;
    .el-pager li:not(.disabled).active{
      background-color: #929CB4;
      color: #FFF;
    }
  }
  .detail-header{
    padding-top: 40px;
    margin: 0 2%;
    img{
      vertical-align: middle;
    }
    .el-col-7{
      div{
        padding: 6px;
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
      }
    }
  }
}
</style>

