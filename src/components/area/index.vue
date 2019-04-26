<template>
  <el-popover
  placement="bottom"
  width="600"
  popper-class="area"
  trigger="click">
  <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
    <el-menu-item index="1">省份</el-menu-item>
    <el-menu-item index="2">城市</el-menu-item>
    <el-menu-item index="3">行政区</el-menu-item>
  </el-menu>
    <!-- 省 直辖市 -->
    <el-row :gutter="10" v-show="provinceVisible">
      <el-col :span="6" v-for="(item,index) in province_list" :key="index"  :class='{selected:index ==selectIndex}' @click.native="selectProvince(item,index)"><div class="grid-content bg-purple" ></div>{{item}}</el-col>
    </el-row>
    <!-- 市区 -->
    <el-row :gutter="10" v-show="cityVisible">
      <el-col :span="6" v-for="(item,index) in city_list" :key="index" :class='{selected:index ==selectcityIndex}' @click.native="selectCity(item,index)"><div class="grid-content bg-purple"></div>{{item}}</el-col>
    </el-row>
    <!-- 街道 区  县 -->
    <el-row :gutter="10" v-show="countyVisible">
      <el-col :span="6" v-for="(item,index) in county_list" :key="index" :class='{selected:index ==selectcountyIndex}' @click.native="selectCounty(item,index)"><div class="grid-content bg-purple"></div>{{item}}</el-col>
    </el-row>
    <el-button slot="reference" round type="primary" size="mini">行政区划</el-button>
  </el-popover>
</template>
<script>
import Area from '@/localdata/area'
  export default {
    data() {
      return {
        activeIndex:'1',
        selectIndex:'',
        selectcityIndex:'',
        selectcountyIndex:'',
        provinceVisible:true,
        cityVisible:false,
        countyVisible:false,
        province_list: '',
        city_list:'',
        county_list:''
      };
    },
    created(){
      this.initData();
    },
    methods:{
      initData(){
        this.province_list = Area.province_list;
      },
      selectProvince(item,index){
        this.selectIndex = index;
        let tempobj = {};
        for (const key in Area.city_list) {
          if (index.substr(0, 3) === key.substr(0, 3)) {
            tempobj[key] = Area.city_list[key];
          }
        }
        this.city_list = tempobj;
      },
      selectCity(item,index) {
        console.log(index)
        this.selectcityIndex = index;
        let tempobj = {};
        for (const key in Area.county_list) {
          if (index.substr(0, 4) === key.substr(0, 4) ) {
            tempobj[key] = Area.county_list[key];
          }
        }
        this.county_list = tempobj;
      },
      selectCounty(item,index) {
        this.selectcountyIndex = index;
        let temp = {};
        temp.name = item;
        temp.type = '';
        this.$emit('messageData',temp)
      },
      handleSelect(key, keyPath) {
        if (key === '1') {
          this.provinceVisible = true;
          this.cityVisible = false;
          this.countyVisible =  false;
        }else if (key === '2') {
          this.provinceVisible = false;
          this.cityVisible = true;
          this.countyVisible =  false;
        }else if (key === '3'){
          this.provinceVisible = false;
          this.cityVisible = false;
          this.countyVisible =  true;
        }
      }
    }
  };
</script>
<style lang="scss" scoped>
.area{
  .el-menu{
    .el-menu-item{
      height: 30px;
      line-height: 30px;
      width: 33.333%;
      text-align: center;
    }
  }
  .el-row{
    margin: 5px 0;
    .el-col{
      padding: 6px;
      text-align: center;
    }
    .selected,.el-col:active,.el-col:focus,.el-col:hover{
      background-color: #8C96B0;
      border-radius: 8px;
      color: #FFFFFF;
    }
  }
}
</style>
