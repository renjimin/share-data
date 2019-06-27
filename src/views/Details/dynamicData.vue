<template>
  <div class="app-body">
    <Header />
    <div class="page-dynamicData">
      <Back></Back>
      <div class="el-header" v-for="(item,index) in category" :key='index' v-show='item.newcategory.length > 0'>
        <el-row>
          <el-col>
            <el-card class="box-card" @click.native="detailData(item)">
              <div>
                <div class="card-alias">{{item.org_alias}}</div>
                <div class="card-des">{{item.org_alias}}</div>
                <div class="card-time"><span>2019年2月28号</span><span>大小:2.98M</span></div>
              </div>
            </el-card>
          </el-col>
        </el-row>
        <div class="dynamic-content">
          <el-row v-for="(item,index) in item.category" :key='index' v-show="item.categorykey.indexOf(categoryname) > -1" class="dynamic-row">
            <el-col :span="16">
              <el-row>
                <el-col :span='2'><img src="/images/detail/json.png"></el-col>
                <el-col :span='22'>
                  <div class="categortitle">{{item.categoryalias}} </div>
                  <span>{{item.categoryname}}</span>
                </el-col>
              </el-row>
            </el-col>
            <el-col :span="4" class="catelog-des">
              <span>{{item.categoryalias}}</span>
              <span>{{item.categoryname}}</span>
            </el-col>
            <el-col :span="4" class="catelog-btn">
              <el-button @click="toView(item)" size="mini">查看</el-button>
              <el-button size="mini">下载</el-button>
            </el-col>
          </el-row>
        </div>
      </div>
      <div v-show='category == ""' class="no-data">
        <span>暂无数据</span>
      </div>
    </div>
  </div>
</template>
<script>
import {getDynamicData,getListDeviceID} from '@/api/detail/index'
import Back from '@/components/back/index'
import Header from '@/components/header/Header'
export default {
    data(){
        return {
          ruleForm:{

          },
          category:'',
          categoryname:'',
        }
    },
    created() {
      switch(this.$route.query.type) {
        case 'DynamicNodeFixed':
          this.categoryname = 'INSITU';
          break;
        case 'DynamicNodeGPS':
          this.categoryname = 'GPS';
          break;
        case 'DynamicNodeVideo' :
          this.categoryname ='';
          break;
        default:
          break;
      }
      this.initData();
    },
    methods:{
      async initData() {
        let data = '111';
        let res = await getDynamicData(data);

        const { status,responseObj } = res;

        if (res.status === 'SUCCESS') {
          responseObj.data.forEach(element => {
            const {category} = element;
            if (category) {
              let temparr = [];
              category.forEach((item,index) => {
                if (this.categoryname == item.categoryname) {
                  temparr.push(item)
                }
              })
              element.newcategory = temparr;
            }else{
              element.newcategory = [];
            }
          });
        }
        this.category = res.responseObj.data;
        console.log(this.category)
      },
      async toView(item) {
        let params = {
          key:'111',
          categorykey:item.categorykey
        }
        let res = await getListDeviceID(params);
        this.$router.push({name: 'viewDetail', params: {categorykey: item.categorykey}})
      },
      detailData(item) {

      }
    },
    components:{
      Header,
      Back
    }
}
</script>
<style lang="scss">
.page-dynamicData{
  background-color: #FFFFFF;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  .el-header{
    padding: 20px;
    .el-col{
      .el-card{
        margin-bottom: 20px;
        .card-alias{
          font-size: 18px;
          color: rgb(92, 101, 115);
          line-height: 1.333;
        }
        .card-des{
          font-size: 12px;
          color: rgb(164, 167, 172);
          line-height: 2.333;
        }
        .card-time{
          font-size: 12px;
          color: rgb(164, 167, 172);
          line-height: 2.333;
        }
      }
    }
  }
  .dynamic-content{
    margin-top: 20px;
    border: 1px solid rgb(228, 230, 234);
    .dynamic-row{
      padding: 20px 0;
      .el-col-16{
        .el-col-2{
          line-height: 100px;
          height: 50px;
          text-align: right;
        }
        .el-col-22{
          padding: 0 0 0 10px;
          .categortitle{
            font-size: 16px;
            color: rgb(92, 101, 115);
            line-height: 2.5;
          }
          span{
            font-size: 12px;
            color: rgb(164, 167, 172);
            line-height: 1.833;
          }
        }
      }
      .catelog-des{
        margin-top: 45px;
        span:nth-child(2){
          margin-left: 50px;
        }
      }
      .catelog-btn{
        margin-top: 32px;
        button{
          padding: 7px 20px;
          font-size: 14px;
          color: rgb(92, 101, 115);
          border: 1px solid rgb(92, 101, 115);
        }
      }
    }
    .dynamic-row:not(:first-of-type){
      border-top: 1px dashed rgb(228, 230, 234);
    }
  }
  .no-data{
    padding: 50px;
    text-align: center;
  }
}
</style>

