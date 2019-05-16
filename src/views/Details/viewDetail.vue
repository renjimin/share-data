<template>
  <div class="page-viewDetail">
    <Header />
    <OMap :viewConfig='this.viewConfig'></OMap>
    <div class="select-category">
      <span v-for="(item,index) in currentSelect" :key='index' @click="setCurrent(item.type)">{{item.title}}</span>
    </div>
    <el-main>
      <el-row>
        <el-col :span='5'>行政区要素属性表  (3142 要素，已选择 1 要素)</el-col>
        <el-col :span='2'>
          <el-button size="mini">下载</el-button>
        </el-col>
        <el-col :span='7'>
          <i class="el-icon-info"></i>勾选要素或者在地图上框选范围进行下载</el-col>
        <el-col :span='10'>收起</el-col>
      </el-row>,
      <el-table
        :data="tableData"
        style="width: 100%">
        <el-table-column
          label="ID"
          type="selection"
          width="55">
        </el-table-column>
        <el-table-column
          prop="date"
          label="日期"
          width="180">
        </el-table-column>
        <el-table-column
          prop="name"
          label="姓名"
          width="180">
        </el-table-column>
        <el-table-column
          prop="address"
          label="地址">
        </el-table-column>
      </el-table>
    </el-main>
  </div>
</template>


<script>
import Header from '@/components/header/Header'
import OMap from "@/components/openlayer/index";
import {URL_CFG} from '@/config/index'
export default {
    data(){
        return {
          viewConfig:{
            wmsLayer: {
                source: {
                    type: 'ImageWMS',
                    url: URL_CFG + '/wms',
                    params: {
                        'LAYERS': 'heatmap',
                        'TILED': false,
                        'DATETIME': '',
                        'CATEGORY': 'GPS_D_2'
                    },
                    projection: 'EPSG:4326',
                    serverType: 'geoserver'
                }
            },
            trackLayer: {
                source: {
                    type: 'ImageWMS',
                    url: URL_CFG + '/wms',
                    params: {
                        'LAYERS': 'track',
                        'TILED': false,
                        'STARTTIME': '',
                        'ENDTIME': '',
                        'DEVICEID': '0085001E2D,37106',
                        'STYLES': 'Line;278190335,2,1;55,1,2'
                    },
                    projection: 'EPSG:4326',
                    serverType: 'geoserver'
                }
            },
            flightLayer: {
                source: {
                    type: 'ImageWMS',
                    url: URL_CFG + '/wms',
                    params: {
                        'LAYERS': 'FLIGHT',
                        'TILED': false,
                        'STARTTIME': '',
                        'ENDTIME': '',
                        'CATEGORY': 'GPS_D_2',
                        'INTERVALS': '2.5'
                    },
                    projection: 'EPSG:4326',
                    serverType: 'geoserver'
                }
            },
            vehicleLayer: {
                source: {
                    type: 'ImageWMS',
                    url: URL_CFG + '/wms',
                    params: {
                        'LAYERS': 'DISTRIBUTION',
                        'TILED': false,
                        'DATETIME': '20171221141020',
                        'CATEGORY': 'GPS_D_2',
                        'STYLES': 'poi'
                    },
                    projection: 'EPSG:4326',
                    tilePixelRatio: '2',
                    serverType: 'geoserver'
                }
            },
          },
          currentSelect:[
            {
            type:'heatmap',
            title:'热力图'
            },{
              type:'DISTRIBUTION',
              title:'分布图'
            },{
              type:'track',
              title:'轨迹图'
            },{
              type:'FLIGHT',
              title:'迁移图'
            }
          ],
          tableData: [{
            date: '2016-05-02',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1518 弄'
          }, {
            date: '2016-05-04',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1517 弄'
          }, {
            date: '2016-05-01',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1519 弄'
          }, {
            date: '2016-05-03',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1516 弄'
          }]
        }
    },
    methods:{
      setCurrent(type) {
        console.log(this.viewConfig.vehicleLayer.source.params.CATEGORY)
        switch (type) {
          case 'heatmap':
              this.viewConfig.wmsLayer.source.params.DATETIME = this.getDatetime(new Date());
              this.viewConfig.type = 'wmsLayer';
              // this.viewConfig.wmsLayer.source.params.CATEGORY = CATEGORY;
              break;

          case 'track':
              this.viewConfig.trackLayer.source.params.STARTTIME = this.getDatetime(new Date());
              this.viewConfig.trackLayer.source.params.ENDTIME = this.getDatetime(new Date());
              this.viewConfig.type = 'trackLayer';
              // this.viewConfig.trackLayer.source.params.DEVICEID = DEVICEID
              break;

          case 'DISTRIBUTION':
              this.viewConfig.vehicleLayer.source.params.DATETIME = this.getDatetime(new Date());
              this.viewConfig.type = 'vehicleLayer';
              // this.viewConfig.vehicleLayer.source.params.CATEGORY = CATEGORY;
              break;

          case 'FLIGHT':
              this.viewConfig.flightLayer.source.params.STARTTIME = this.getDatetime(new Date());
              this.viewConfig.flightLayer.source.params.ENDTIME = this.getDatetime(new Date());
              this.viewConfig.type = 'flightLayer';
              break;
          default:
                break;
        }
      },
      getDatetime(time) {
        var d = new Date(time)
        var tf = function (i) { return (i < 10 ? '0' : '') + i };
        var DATETIME = '' + d.getFullYear() + tf(d.getMonth() + 1) + tf(d.getDate()) + tf(d.getHours()) + tf(d.getMinutes()) + tf(d.getSeconds())
        return DATETIME
      }
    },
    components: {
      Header,
      OMap
    },
}
</script>
<style lang="scss">
.page-viewDetail{
  background-color: #FFFFFF;
  position: relative;
  .select-category{
    position: absolute;
    top: 80px;
    right: 20px;
    span{
      padding: 10px;
    }
  }
  #map{
    height: calc(100vh - 120px);
  }
  .el-main{
    width: 98%;
    background-color: #FFFFFF;
    margin: 20px 20px 0 20px;
    padding: 5px;
    border: 1px solid #EAEAEA;
    position: absolute;
    bottom: 0;
    .el-row{
      height: 40px;
      line-height: 40px;
      border-bottom: 1px solid #EAEAEA;
      .el-col-10{
        text-align: right;
      }
    }
  }
}
</style>

