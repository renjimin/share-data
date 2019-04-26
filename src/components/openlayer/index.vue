<template>
    <div id="map" ref="rootmap">

    </div>
</template>

<script>
import "ol/ol.css";
import { Map, View } from "ol";
import TileLayer from "ol/layer/Tile";
import OSM from "ol/source/OSM";
export default {
  data() {
    return {
      map: null
    };
  },
  created(){
    this.initMap();
  },
  mounted() {
    var mapcontainer = this.$refs.rootmap;
    this.map = new Map({
      target: "map",
      layers: [
        new TileLayer({
          source: new OSM()
        })
      ],
      view: new View({
        projection: "EPSG:4326",    //使用这个坐标系
        center: [114.064839,22.548857],  //深圳
        zoom: 10
      })
    });
  },
  methods:{
    initMap() {
      var projection = ol.proj.get('EPSG:4326');
      var projectionExtent = projection.getExtent();

      var view = new ol.View({
        projection: projection,
        center: [114.32,30.6],
        zoom: 10, // 当前视图级别
        minZoom: 8,
        maxZoom: 18
      });

      drawSource = new ol.source.Vector();
      drawVector = new ol.layer.Vector({
          source: drawSource,
          style: new ol.style.Style({
              fill: new ol.style.Fill({
                  color: 'rgba(255, 255, 255, 0.3)'
              }),
              stroke: new ol.style.Stroke({
                  color: '#9f81c8',
                  width: 2
              }),
              image: new ol.style.Circle({
                  radius: 7,
                  fill: new ol.style.Fill({
                      color: '#9f81c8'
                  })
              })
          })
      });

      drawSource.on("addfeature", function(e) {
        selectCameras(e);
      });

      var projection = ol.proj.get('EPSG:4326');
      var projectionExtent = projection.getExtent();
      //地图声明
      map = new ol.Map({
        controls: ol.control.defaults().extend([
            new ol.control.ScaleLine()
        ]),
        projection: "EPSG:4326",
        target: 'map',
        layers: [
          //getTdtLayer('vec_c'),
          //getTdtLayer("cva_c"),
          new ol.layer.Tile({
              extent: projectionExtent,
              source: new ol.source.TileArcGISRest({
                url: SLDT_URL
              })
            })/*,
            new ol.layer.Tile({
              extent: projectionExtent,
              source: new ol.source.TileArcGISRest({
                url: SLZJ_URL
              })
            })*/,
            drawVector
        ],
        view: view
      });

      // 设置地图点击事件监听
      map.on("click", function(e) {
        var pixel = map.getEventPixel(e.originalEvent);
        var feature = map.forEachFeatureAtPixel(e.pixel, function(feature, layer)
        {
          if (layer == videoLayer) {
            return feature;
          }
        });
        if (feature) {
          let  tempobj = {};
          let resultArr;
          tempobj.devid = feature.id.toString();
          videolist.push(tempobj);
        }
      });
    }
  }
};
</script>

<style>
#map{height:100%;}
/*隐藏ol的一些自带元素*/
.ol-attribution,.ol-zoom { display: none;}
</style>
