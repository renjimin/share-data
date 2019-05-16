<template>
  <div class="app-body">
    <Header />
    <div class="page-govDetail">
      <div class="back-header">
        <el-row>
          <el-col :span="2" @click.native="goBack"><img src="/images/pubilc/icon-back.png">返回</el-col>
          <el-col :span="22">
            <a href="#"  id="btn" @click="downloadexcel">下载</a>
          </el-col>
        </el-row>
      </div>
      <div class="el-content">
        <el-col :span="8"><div class="grid-content bg-purple">政务数据</div></el-col>
        <el-col :span="12">&nbsp;</el-col>
        <el-col :span="4">
          <el-input
            placeholder="请输入关键字查询"
            @input='searchData'
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
import {getDetailData,setdownloadTime} from '@/api/detail/index'
import {searcher} from '@/api/index/index'
import {export_json_to_excel} from '../../excel/Export2Excel';
export default {
    components:{
      Header
    },
    data(){
        return {
          tableData: [],
          totalpage:0,
          pagesize:10,
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
          pageSize:this.pagesize
        }
        let res = await getDetailData(params);
        const { code } = res;
        if (code === '0') {
          this.tableCol =  res.alias;
          this.tableData = res.data.data;
          this.totalpage = res.data.totalCount;
        }
      },
      async searchData () {
        let data = {
          keyword:this.inputvalue,
          code:this.$route.query.code,
          type:this.$route.query.type,
          nowPage:1,
          pageSize:this.pagesize,
        }
        let res = await getDetailData(data);
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
          keyword:this.inputvalue,
          nowPage:val,
          pageSize:this.pagesize
        }
        let res = await getDetailData(params);
        const { code } = res;
        if (code === '0') {
          this.tableCol =  res.alias;
          this.tableData = res.data.data;
          this.totalpage = res.data.totalCount;
        }
      },
      /**
       * 返回按钮
       */
      goBack() {
        this.$router.go(-1);
      },
      /**
       * 导出excel
       */
      async downloadexcel() {
        const tHeader = [];
        const filterVal = [];
        this.tableCol.forEach(element => {
          tHeader.push(element.fieldAlias); // 设置Excel的表格第一行的标题
          filterVal.push(element.fieldName); //tableData里对象的属性
        });
        let param = {
          keyword:this.inputvalue,
          code:this.$route.query.code,
          type:this.$route.query.type,
          nowPage:1,
          pageSize:this.totalpage,
        }
        let res = await getDetailData(param);
        const list = res.data.data;  //把data里的tableData存到list
        const data = this.formatJson(filterVal, list);
        export_json_to_excel(tHeader, data, '政务数据');
        let params = {
          userName:'admin',
          resourceCode:this.$route.query.code,
          resourceType:this.$route.query.type,
          startDownTime:new Date().getTime()
        }
        await setdownloadTime(params);
      },
      formatJson(filterVal, jsonData) {
        return jsonData.map(v => filterVal.map(j => v[j]))
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
    background-color: rgb(127, 132, 148);
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

